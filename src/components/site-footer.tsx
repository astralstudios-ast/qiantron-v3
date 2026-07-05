import { Link } from "@tanstack/react-router";
import dragon from "@/assets/dragon.asset.json";
import wordmark from "@/assets/wordmark.asset.json";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-ink text-white/70">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <div className="flex items-center gap-2">
            <img src={dragon.url} alt="" className="h-9 w-9" />
            <img src={wordmark.url} alt="QianTron" className="h-4 invert" />
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/50">
            QianTron sources, ships, clears and delivers premium construction and mining
            machinery across Africa and beyond — engineered end-to-end.
          </p>
          <div className="mt-6 font-mono-brand text-[10px] uppercase tracking-[0.24em] text-white/40">
            Lagos · Mombasa · Durban · Shanghai
          </div>
        </div>
        {[
          { h: "Company", l: [["About", "/about"], ["Contact", "/contact"]] },
          { h: "Platform", l: [["Equipment", "/equipment"], ["Logistics", "/logistics"], ["Client portal", "/login"]] },
          { h: "Legal", l: [["Terms", "/about"], ["Privacy", "/about"], ["Compliance", "/about"]] },
        ].map((col) => (
          <div key={col.h}>
            <div className="mb-4 font-mono-brand text-[10px] uppercase tracking-[0.24em] text-white/40">
              {col.h}
            </div>
            <ul className="space-y-2 text-sm">
              {col.l.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-white/70 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-3 px-6 py-6 font-mono-brand text-[10px] uppercase tracking-[0.24em] text-white/40 sm:flex-row sm:items-center lg:px-10">
          <span>© {new Date().getFullYear()} QianTron Global · All rights reserved.</span>
          <span>Engineered in Lagos & Shanghai</span>
        </div>
      </div>
    </footer>
  );
}
