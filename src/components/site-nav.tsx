import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import wordmark from "@/assets/wordmark.asset.json";
import dragon from "@/assets/dragon.asset.json";

const LINKS = [
  { to: "/equipment", label: "Equipment" },
  { to: "/logistics", label: "Logistics" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav({ variant = "auto" }: { variant?: "auto" | "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isDark = variant === "dark" || (variant === "auto" && !scrolled);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled || open ? "bg-background/80 backdrop-blur-xl border-b hairline" : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-2" aria-label="QianTron home" onClick={() => setOpen(false)}>
          <img src={dragon.url} alt="" className="h-7 w-7 sm:h-8 sm:w-8" />
          <img
            src={wordmark.url}
            alt="QianTron"
            className={`hidden h-4 sm:block ${isDark && !open ? "invert" : ""}`}
          />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-[13px] font-medium transition-colors ${
                isDark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
              }`}
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className={`hidden text-[13px] font-medium transition-colors sm:inline ${
              isDark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign in
          </Link>
          <Link
            to="/login"
            className="group hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-all hover:brightness-110 sm:inline-flex"
          >
            Client portal
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`ml-1 grid h-10 w-10 place-items-center rounded-full border hairline md:hidden ${
              (isDark && !open) ? "text-white border-white/20" : "text-foreground"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto border-t hairline bg-background/98 backdrop-blur-xl md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-6 sm:px-6">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b hairline py-4 font-display text-2xl text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Client portal
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

