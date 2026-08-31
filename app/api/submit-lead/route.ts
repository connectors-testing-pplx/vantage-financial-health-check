import { NextRequest, NextResponse } from "next/server";

// Lead capture endpoint.
// Stores the submission locally (render/data folder) and forwards to HubSpot
// when HUBSPOT_PORTAL_ID + HUBSPOT_FORM_ID are configured.

interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  meetingType: string;
  overall: number;
  pillars: { name: string; score: number; band: string }[];
  recommendations: string[];
  submittedAt?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LeadPayload;

    // Basic server-side validation
    if (!body.name || !body.email) {
      return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 });
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);
    if (!emailOk) {
      return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
    }

    const payload: LeadPayload = {
      ...body,
      submittedAt: new Date().toISOString(),
    };

    // 1) Persist locally (advisors can review results before meetings).
    // On Render/production, set LEADS_DIR to a persistent volume.
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const leadsDir = process.env.LEADS_DIR || path.join(process.cwd(), "data");
      await fs.mkdir(leadsDir, { recursive: true });
      const fname = `lead-${Date.now()}-${sanitize(body.email)}.json`;
      await fs.writeFile(
        path.join(leadsDir, fname),
        JSON.stringify(payload, null, 2)
      );
    } catch {
      /* local persistence is best-effort */
    }

    // 2) Forward to HubSpot (public form API — no secret required to POST,
    //    but portal + form id are needed).
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_FORM_ID;
    if (portalId && formId) {
      try {
        const [firstName, ...rest] = body.name.split(" ");
        const lastName = rest.join(" ") || "";
        const fields = [
          { name: "firstname", value: firstName },
          { name: "lastname", value: lastName },
          { name: "email", value: body.email },
          { name: "phone", value: body.phone },
          { name: "preferred_meeting_type", value: body.meetingType },
          { name: "financial_health_score", value: String(body.overall) },
          {
            name: "pillar_scores",
            value: body.pillars.map((p) => `${p.name}: ${p.score} (${p.band})`).join(" | "),
          },
          {
            name: "recommendations",
            value: body.recommendations.join(" | "),
          },
        ];
        await fetch(
          `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fields, legalConsentOptions: { consent: { consentToProcess: true, text: "User consented via Financial Health Check lead form." } } }),
          }
        );
      } catch {
        /* don't fail the user if HubSpot hiccups — we stored locally */
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}

function sanitize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 24);
}
