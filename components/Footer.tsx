import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-navy/60">
              Helping business owners and families near Kitchener–Waterloo turn a
              clear strategy into confident decisions.
            </p>
          </div>
          <div className="text-sm text-navy/60">
            <p className="mb-2 font-semibold uppercase tracking-[0.14em] text-navy/75">Visit Us</p>
            <p>Suite 500, 151 Frederick St.</p>
            <p>Kitchener, ON, CA N2H 2M2</p>
            <p className="mt-3">
              <a href="tel:+15198861353" className="hover:text-navy">519-886-1353</a>
              <span className="mx-2 text-navy/30">|</span>
              <a href="mailto:info@vantagewealth.ca" className="hover:text-navy">info@vantagewealth.ca</a>
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-navy/10 pt-6 text-xs leading-relaxed text-navy/45">
          <p className="mb-2">
            This Financial Health Check is for informational purposes only and does not
            constitute financial, tax, or legal advice. Results are based solely on your
            self-reported answers. Mutual funds are provided by Worldsource Financial
            Management Inc.
          </p>
          <p>© {new Date().getFullYear()} Vantage Wealth Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
