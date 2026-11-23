import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Privacy", href: "/#privacy" },
  { label: "Reporting Options", href: "/report" },
  { label: "Support & Resources", href: "/#support" },
  { label: "About the Project", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-calm-200/80 bg-white pt-12 pb-24 text-calm-700 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Brand & Mission Brief */}
          <div className="max-w-md text-center md:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-bold text-calm-900 tracking-tight text-lg group"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <span>NEST</span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-calm-600">
              A privacy-preserving, client-side digital navigator helping survivors
              of AI-generated intimate image abuse document evidence, prepare
              DSA notices, and track follow-ups safely.
            </p>
          </div>

          {/* Core Navigation Links */}
          <div className="flex flex-col items-center gap-4 text-center md:items-end md:text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
              Navigation
            </span>
            <nav aria-label="Footer Navigation">
              <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-medium text-calm-700 md:justify-end">
                {FOOTER_LINKS.map((link, i) => (
                  <li key={link.href} className="inline-flex items-center">
                    <a
                      href={link.href}
                      className="transition-colors hover:text-accent focus-visible:outline-none"
                    >
                      {link.label}
                    </a>
                    {i < FOOTER_LINKS.length - 1 && (
                      <span className="ml-3 text-calm-300 select-none" aria-hidden="true">
                        |
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

