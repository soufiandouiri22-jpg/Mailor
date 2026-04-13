import { MailorLogo } from "./icons";

const columns = [
  {
    title: "Product",
    links: [
      "AI Personalization",
      "Mailor Agent",
      "Mailor Templates",
      "Integrations",
      "API",
    ],
  },
  {
    title: "Use Cases",
    links: [
      "Cold Outreach",
      "Lead Generation",
      "Agency Outreach",
      "Recruiting",
      "Partnerships",
    ],
  },
  {
    title: "Resources",
    links: [
      "Documentation",
      "API Reference",
      "Blog",
      "Changelog",
      "Help Center",
    ],
  },
  {
    title: "Company",
    links: [
      "About",
      "Careers",
      "Enterprise",
      "Contact Sales",
      "Privacy",
      "Terms",
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] pt-14 pb-8 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-14">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 mb-2 lg:mb-0">
            <MailorLogo className="text-[16px] text-black/60 mb-5" />
            <p className="text-[13px] text-black/25 max-w-[220px] leading-relaxed">
              AI powered personalized email outreach at scale.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-medium text-black/40 mb-3.5 uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-black/25 hover:text-black/50 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/[0.04]">
          <p className="text-[11px] text-black/20">
            © 2026 Mailor. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="https://instagram.com/mailor_ai" target="_blank" rel="noopener noreferrer" className="text-[11px] text-black/20 hover:text-black/40 transition-colors">Instagram</a>
            <a href="#" className="text-[11px] text-black/20 hover:text-black/40 transition-colors">𝕏</a>
            <a href="#" className="text-[11px] text-black/20 hover:text-black/40 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
