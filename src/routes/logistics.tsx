import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Anchor, Ship, Truck, ClipboardCheck, MapPin, Search } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/logistics")({
  head: () => ({
    meta: [
      { title: "Global Logistics Intelligence — QianTron" },
      {
        name: "description",
        content:
          "RoRo shipping, port clearance, freight forwarding and inland trucking — orchestrated under one operations layer.",
      },
      { property: "og:title", content: "Global Logistics Intelligence — QianTron" },
      { property: "og:description", content: "QianTron's global corridors: Shanghai, Yokohama, Rotterdam, Jebel Ali → Lagos, Mombasa, Durban, Djibouti." },
      { property: "og:url", content: "https://qiantron-next.lovable.app/logistics" },
    ],
    links: [{ rel: "canonical", href: "https://qiantron-next.lovable.app/logistics" }],
  }),
  component: LogisticsPage,
});

const STAGES = [
  { i: Search, t: "Source", d: "Vetted OEM contracts across China, Japan and the EU." },
  { i: ClipboardCheck, t: "Inspect", d: "Multi-point QC before container sealing." },
  { i: Ship, t: "Ship", d: "RoRo, containerized and break-bulk optimized per unit." },
  { i: Anchor, t: "Clear", d: "In-house customs at every major African port." },
  { i: Truck, t: "Transport", d: "Escorted inland haulage with live telemetry." },
  { i: MapPin, t: "Deliver", d: "Commissioned on-site and handed over." },
];

const LANES = [
  { from: "Shanghai", to: "Lagos", d: "M 720 320 Q 500 460 380 560", days: "26d" },
  { from: "Yokohama", to: "Mombasa", d: "M 830 340 Q 620 520 520 620", days: "31d" },
  { from: "Rotterdam", to: "Durban", d: "M 400 240 Q 420 460 480 700", days: "22d" },
  { from: "Jebel Ali", to: "Djibouti", d: "M 560 420 Q 500 480 470 540", days: "6d" },
];

function LogisticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="relative border-b hairline bg-ink text-white grain">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-32 lg:px-10 lg:pb-24 lg:pt-40">
          <div className="eyebrow mb-4 text-white/50">§ Global logistics intelligence</div>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] tracking-tight text-balance">
            Trade lanes,
            <br />
            <span className="italic text-primary">orchestrated</span> in real time.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/60 lg:text-lg">
            One operations layer unifies factory dispatch, port handoffs, customs and
            escorted final-mile delivery — with a single accountable contact.
          </p>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-xl border hairline bg-card p-5"
              >
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-full border hairline">
                  <s.i className="h-4 w-4 text-primary" strokeWidth={1.6} />
                </div>
                <div className="font-mono-brand text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-1 font-display text-xl">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl border hairline bg-gradient-to-br from-[oklch(0.16_0.005_260)] to-[oklch(0.22_0.005_260)] p-6 lg:p-10">
            <div className="absolute inset-0 grid-lines opacity-25" />
            <svg viewBox="0 0 1000 700" className="relative w-full">
              <g fill="oklch(1 0 0 / 0.06)" stroke="oklch(1 0 0 / 0.1)" strokeWidth="0.5">
                <path d="M 60 200 Q 140 160 220 200 T 380 220 L 420 300 L 380 400 L 300 460 L 220 440 L 160 380 L 100 300 Z" />
                <path d="M 380 460 Q 440 500 480 580 L 520 700 L 420 700 L 380 620 Z" />
                <path d="M 460 200 Q 620 160 780 220 T 940 260 L 900 360 L 820 400 L 720 380 L 620 340 L 520 300 Z" />
                <path d="M 560 420 Q 640 460 680 540 L 640 620 L 560 580 Z" />
              </g>
              {LANES.map((r, i) => (
                <motion.path
                  key={i}
                  d={r.d}
                  fill="none"
                  stroke="#B71C1C"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: i * 0.25 }}
                />
              ))}
            </svg>
            <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 text-white sm:grid-cols-4">
              {LANES.map((l) => (
                <div key={l.from}>
                  <div className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {l.from} → {l.to}
                  </div>
                  <div className="mt-1 font-display text-2xl">{l.days}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
