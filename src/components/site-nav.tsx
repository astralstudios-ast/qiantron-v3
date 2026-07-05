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

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b hairline" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-2" aria-label="QianTron home">
          <img src={dragon.url} alt="" className="h-8 w-8" />
          <img
            src={wordmark.url}
            alt="QianTron"
            className={`hidden h-4 sm:block ${isDark ? "invert" : ""}`}
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
            className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            Client portal
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`ml-1 grid h-9 w-9 place-items-center rounded-full border hairline md:hidden ${
              isDark ? "text-white border-white/20" : "text-foreground"
            }`}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t hairline bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
