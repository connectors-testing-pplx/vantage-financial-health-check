// Vantage Wealth Management — recreated brand mark as inline SVG
// Deep navy "V" with gold right stroke, matched to existing site logo.

export default function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const navy = "#0D2F52";
  const gold = "#CA902F";
  const textColor = variant === "light" ? "#FFFFFF" : navy;
  const subColor = variant === "light" ? gold : gold;

  return (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-label="Vantage Wealth Management">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <path d="M6 8 L18 36 L22 28 L16 12 Z" fill={navy} />
        <path d="M38 8 L26 36 L22 28 L28 12 Z" fill={gold} />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-serif font-semibold tracking-tight"
          style={{ color: textColor, fontSize: "1.35rem", letterSpacing: "0.04em" }}
        >
          VANTAGE
        </span>
        <span
          className="font-sans font-medium"
          style={{ color: subColor, fontSize: "0.5rem", letterSpacing: "0.32em", marginTop: "2px" }}
        >
          WEALTH MANAGEMENT
        </span>
      </span>
    </span>
  );
}
