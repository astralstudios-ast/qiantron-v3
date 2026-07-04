import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Ship,
  Search,
  ClipboardCheck,
  Anchor,
  Truck,
  MapPin,
  ChevronRight,
  Globe2,
  ShieldCheck,
  Radio,
  Package,
  Boxes,
  Cpu,
  Play,
} from "lucide-react";

import wordmark from "@/assets/wordmark.asset.json";
import dragon from "@/assets/dragon.asset.json";
import excavator from "@/assets/excavator.asset.json";
import loader from "@/assets/loader.asset.json";
import hauler from "@/assets/hauler.asset.json";
import crane from "@/assets/crane.asset.json";
import drill from "@/assets/drill.asset.json";
import roller from "@/assets/roller.asset.json";
import truck from "@/assets/truck.asset.json";
import factory from "@/assets/factory.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QianTron — Premium Machinery. Seamless Logistics. Delivered." },
      {
        name: "description",
        content:
          "QianTron sources, inspects, ships, clears and delivers heavy machinery to sites across Africa. Engineered end-to-end.",
      },
      { property: "og:image", content: excavator.url },
    ],
  }),
  component: QianTronExperience,
});

/* ---------------------------------- Nav --------------------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b hairline" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <a href="#" className="flex items-center gap-2">
          <img src={dragon.url} alt="QianTron" className="h-8 w-8" />
          <img src={wordmark.url} alt="QianTron" className="hidden h-4 sm:block" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {["Equipment", "Logistics", "Platform", "Ecosystem", "About"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline">
            Sign in
          </button>
          <button className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-all hover:bg-primary">
            Client portal
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------- Hero --------------------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-ink text-white grain">
      {/* image layer */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img
          src={excavator.url}
          alt="Industrial excavator at scale"
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30" />
      </motion.div>

      {/* grid overlay */}
      <div className="absolute inset-0 grid-lines opacity-40" />

      {/* animated route line */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M -50 620 Q 400 500 720 560 T 1500 420"
          fill="none"
          stroke="url(#g1)"
          strokeWidth="1"
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#B71C1C" />
            <stop offset="1" stopColor="#D6A800" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-end px-6 pb-16 lg:px-10 lg:pb-24"
      >
        <div className="mb-8 flex items-center gap-3 text-[11px] font-mono-brand uppercase tracking-[0.24em] text-white/60">
          <span className="h-px w-8 bg-primary" />
          Global Machinery · Est. 2019
        </div>
        <h1 className="max-w-[16ch] font-display text-[clamp(2.75rem,7vw,6.5rem)] font-normal leading-[0.95] tracking-tight text-balance">
          Premium Machinery.
          <br />
          <span className="italic text-white/70">Seamless</span> Logistics.
          <br />
          Delivered to your <span className="text-primary">doorstep</span>.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70 lg:text-lg">
          From global sourcing to final delivery, QianTron manages every stage of your
          machinery acquisition journey — engineered as one continuous system.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_60px_-10px_oklch(0.48_0.19_27_/_0.6)] transition-all hover:brightness-110">
            Explore equipment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/15">
            <Play className="h-3.5 w-3.5 fill-current" /> Client login
          </button>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.2em] text-white/50 font-mono-brand">
          <span className="text-white/40">Trusted by</span>
          {["Contractors", "Miners", "Infrastructure Devs", "Fleet Operators", "Port Authorities"].map(
            (t) => (
              <span key={t}>{t}</span>
            ),
          )}
        </div>
      </motion.div>

      {/* corner meta */}
      <div className="absolute right-6 top-24 hidden text-right font-mono-brand text-[10px] uppercase tracking-[0.2em] text-white/40 lg:block">
        <div>N 6.5244° · E 3.3792°</div>
        <div className="mt-1">Lagos ▸ Mombasa ▸ Durban</div>
      </div>
    </section>
  );
}

/* --------------------------- Section: Difference ------------------------ */
const journey = [
  { n: "01", t: "Source", d: "Verified factories across China, Japan and the EU.", i: Search },
  { n: "02", t: "Inspect", d: "Multi-point QC before a single container is sealed.", i: ClipboardCheck },
  { n: "03", t: "Ship", d: "RoRo, container and break-bulk optimized per unit.", i: Ship },
  { n: "04", t: "Clear", d: "In-house customs across every African corridor.", i: Anchor },
  { n: "05", t: "Transport", d: "Escorted inland haulage with live telemetry.", i: Truck },
  { n: "06", t: "Deliver", d: "Commissioned on-site and handed over — one contact.", i: MapPin },
];

function Difference() {
  return (
    <section id="logistics" className="relative border-t hairline bg-background py-24 lg:py-36">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="mb-16 grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-end">
          <div>
            <div className="eyebrow mb-3">§ 02 — The QianTron difference</div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-tight text-balance">
              One system,
              <br />
              <span className="italic text-primary">six deliberate</span> steps.
            </h2>
          </div>
          <p className="max-w-lg text-base text-muted-foreground md:justify-self-end">
            Most brokers hand you off at every border. We don't. QianTron owns each leg of
            the journey — so accountability, timelines and cost never fracture.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
            {journey.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative"
              >
                <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-full border hairline bg-background transition-colors group-hover:border-primary group-hover:bg-primary/5">
                  <s.i className="h-5 w-5 text-graphite transition-colors group-hover:text-primary" strokeWidth={1.5} />
                </div>
                <div className="font-mono-brand text-[11px] tracking-[0.2em] text-muted-foreground">
                  {s.n}
                </div>
                <div className="mt-1 font-display text-2xl">{s.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ Section: Equipment Portfolio ------------------ */
const categories = [
  { name: "Excavators", spec: "20t – 90t · Hydraulic", img: excavator.url, count: "24 models" },
  { name: "Wheel Loaders", spec: "3.0 – 6.5 m³ bucket", img: loader.url, count: "18 models" },
  { name: "Haulage Trucks", spec: "40t – 100t payload", img: hauler.url, count: "12 models" },
  { name: "Cranes", spec: "50t – 750t lift", img: crane.url, count: "9 models" },
  { name: "Mining Drills", spec: "Track · Rotary · Down-hole", img: drill.url, count: "7 models" },
  { name: "Compaction Rollers", spec: "Tandem · Single · Pneumatic", img: roller.url, count: "11 models" },
  { name: "Prime Movers", spec: "6×4 · 8×4 · Heavy tractor", img: truck.url, count: "15 models" },
  { name: "Bulldozers", spec: "D6 – D11 class", img: factory.url, count: "8 models" },
];

function Portfolio() {
  const [active, setActive] = useState(0);
  return (
    <section id="equipment" className="relative border-t hairline bg-ink text-white py-24 lg:py-36">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-3 text-white/50">§ 03 — Equipment portfolio</div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-tight text-balance">
              A curated fleet,
              <br />
              <span className="italic text-white/60">built for</span> continents.
            </h2>
          </div>
          <a href="#" className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            View full catalogue
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Feature */}
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 lg:aspect-auto lg:h-[600px]"
          >
            <img
              src={categories[active].img}
              alt={categories[active].name}
              className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
              <div className="mb-3 flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[0.24em] text-white/50">
                <span className="h-px w-6 bg-primary" />
                Category · {String(active + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
              </div>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h3 className="font-display text-4xl lg:text-5xl">{categories[active].name}</h3>
                  <p className="mt-2 text-sm text-white/60">{categories[active].spec}</p>
                </div>
                <div className="hidden text-right sm:block">
                  <div className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Available
                  </div>
                  <div className="font-display text-2xl">{categories[active].count}</div>
                </div>
              </div>
            </div>
            {/* technical overlay */}
            <div className="pointer-events-none absolute right-6 top-6 rounded border border-white/20 bg-black/40 px-3 py-2 backdrop-blur">
              <div className="font-mono-brand text-[9px] uppercase tracking-[0.24em] text-white/50">
                QT-SPEC
              </div>
              <div className="font-mono-brand text-xs">
                {(active + 1) * 137}.{active}A
              </div>
            </div>
          </motion.div>

          {/* List */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {categories.map((c, i) => (
              <button
                key={c.name}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden rounded-lg border p-4 text-left transition-all ${
                  active === i
                    ? "border-primary/50 bg-primary/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 font-display text-lg leading-tight">{c.name}</div>
                <div className="mt-1 text-[11px] text-white/50">{c.count}</div>
                <ChevronRight
                  className={`absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-all ${
                    active === i ? "text-primary opacity-100" : "opacity-0 group-hover:opacity-40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------- Section: Global Logistics Map -------------------- */
const routes = [
  { from: "Shanghai", to: "Lagos", d: "M 720 320 Q 500 460 380 560" },
  { from: "Yokohama", to: "Mombasa", d: "M 830 340 Q 620 520 520 620" },
  { from: "Rotterdam", to: "Durban", d: "M 400 240 Q 420 460 480 700" },
  { from: "Jebel Ali", to: "Djibouti", d: "M 560 420 Q 500 480 470 540" },
];

function GlobalLogistics() {
  return (
    <section id="platform" className="relative border-t hairline bg-background py-24 lg:py-36">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <div className="eyebrow mb-3">§ 04 — Global logistics intelligence</div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-tight text-balance">
              Trade lanes,
              <br />
              <span className="italic text-primary">orchestrated</span> in real time.
            </h2>
          </div>
          <p className="max-w-md text-base text-muted-foreground md:justify-self-end">
            RoRo shipping, port clearance, freight forwarding and inland trucking —
            unified under a single operations layer.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border hairline bg-gradient-to-br from-[oklch(0.16_0.005_260)] to-[oklch(0.22_0.005_260)] p-6 lg:p-10">
          <div className="absolute inset-0 grid-lines opacity-25" />
          <svg viewBox="0 0 1000 700" className="relative w-full">
            {/* stylized continents */}
            <g fill="oklch(1 0 0 / 0.06)" stroke="oklch(1 0 0 / 0.1)" strokeWidth="0.5">
              <path d="M 60 200 Q 140 160 220 200 T 380 220 L 420 300 L 380 400 L 300 460 L 220 440 L 160 380 L 100 300 Z" />
              <path d="M 380 460 Q 440 500 480 580 L 520 700 L 420 700 L 380 620 Z" />
              <path d="M 460 200 Q 620 160 780 220 T 940 260 L 900 360 L 820 400 L 720 380 L 620 340 L 520 300 Z" />
              <path d="M 560 420 Q 640 460 680 540 L 640 620 L 560 580 Z" />
            </g>
            {/* routes */}
            {routes.map((r, i) => (
              <g key={i}>
                <motion.path
                  d={r.d}
                  fill="none"
                  stroke="#B71C1C"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: i * 0.3 }}
                />
              </g>
            ))}
            {/* nodes */}
            {[
              [720, 320, "Shanghai"],
              [830, 340, "Yokohama"],
              [400, 240, "Rotterdam"],
              [560, 420, "Jebel Ali"],
              [380, 560, "Lagos"],
              [520, 620, "Mombasa"],
              [480, 700, "Durban"],
              [470, 540, "Djibouti"],
            ].map(([x, y, name], i) => (
              <g key={i as number}>
                <motion.circle
                  cx={x as number}
                  cy={y as number}
                  r="4"
                  fill="#D6A800"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + (i as number) * 0.08 }}
                />
                <circle cx={x as number} cy={y as number} r="10" fill="#D6A800" opacity="0.15">
                  <animate attributeName="r" values="4;14;4" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
                <text
                  x={(x as number) + 10}
                  y={(y as number) + 4}
                  fill="white"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                  opacity="0.7"
                >
                  {name}
                </text>
              </g>
            ))}
          </svg>

          {/* stats overlay */}
          <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 text-white sm:grid-cols-4">
            {[
              ["42", "Active corridors"],
              ["1,280+", "Units shipped"],
              ["18", "Port partners"],
              ["9.4d", "Avg. transit"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-3xl">{v}</div>
                <div className="mt-1 font-mono-brand text-[10px] uppercase tracking-[0.2em] text-white/50">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Section: Client Dashboard Preview ----------------- */
function Dashboard() {
  return (
    <section className="relative border-t hairline bg-muted/40 py-24 lg:py-36">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="mb-14 max-w-3xl">
          <div className="eyebrow mb-3">§ 05 — Client platform</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-tight text-balance">
            Track your machinery
            <br />
            from <span className="italic text-primary">factory to site.</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-2xl border hairline bg-card shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)]"
        >
          {/* Chrome */}
          <div className="flex items-center justify-between border-b hairline bg-background/60 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
            </div>
            <div className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              portal.qiantron.com / shipments / QT-88214
            </div>
            <div className="w-10" />
          </div>

          <div className="grid gap-0 md:grid-cols-[220px_1fr]">
            {/* Side */}
            <aside className="border-r hairline p-5">
              <div className="mb-6 flex items-center gap-2">
                <img src={dragon.url} alt="" className="h-6 w-6" />
                <span className="font-display text-sm">QianTron</span>
              </div>
              <nav className="space-y-1 text-[13px]">
                {[
                  ["Overview", Boxes],
                  ["Shipments", Ship],
                  ["Orders", Package],
                  ["Documents", ClipboardCheck],
                  ["Tracking", Radio],
                  ["Projects", Cpu],
                ].map(([l, I], i) => {
                  const Icon = I as typeof Ship;
                  return (
                    <div
                      key={l as string}
                      className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 ${
                        i === 1 ? "bg-primary/10 text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      {l as string}
                    </div>
                  );
                })}
              </nav>
            </aside>

            {/* Main */}
            <div className="p-6 lg:p-8">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Shipment · QT-88214
                  </div>
                  <div className="mt-1 font-display text-2xl">Komatsu HD605 · 2 units</div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  In transit · Indian Ocean
                </span>
              </div>

              {/* KPI */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["ETA", "07 Aug"],
                  ["Vessel", "MV Höegh Trapper"],
                  ["Customs", "Pre-cleared"],
                  ["Escrow", "$1.24M"],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-lg border hairline bg-background/50 p-3">
                    <div className="font-mono-brand text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {l}
                    </div>
                    <div className="mt-1 text-sm font-medium">{v}</div>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-medium">Shipping milestones</div>
                  <div className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    62% complete
                  </div>
                </div>
                <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "62%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2 text-[10px] font-mono-brand uppercase tracking-[0.14em] text-muted-foreground">
                  {["Factory", "Port", "Sea", "Clearance", "Delivered"].map((s, i) => (
                    <div key={s} className={i < 3 ? "text-foreground" : ""}>
                      <div className={`mb-1.5 h-1 w-1 rounded-full ${i < 3 ? "bg-primary" : "bg-muted-foreground/40"}`} />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Docs */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["Bill of Lading", "Commercial Invoice", "Inspection Report"].map((d, i) => (
                  <div
                    key={d}
                    className="group flex items-center justify-between rounded-lg border hairline bg-background/50 p-3 text-sm transition-colors hover:border-primary/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded bg-primary/10 text-primary">
                        <ClipboardCheck className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium">{d}</div>
                        <div className="font-mono-brand text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          Verified · {i + 2}h ago
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- Section: Powering Africa (editorial) -------------- */
function PoweringAfrica() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  return (
    <section ref={ref} className="relative overflow-hidden bg-ink text-white">
      <motion.img
        style={{ y }}
        src={factory.url}
        alt="Machinery assembly line"
        className="absolute inset-0 h-[120%] w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
      <div className="relative mx-auto grid w-full max-w-[1440px] gap-16 px-6 py-32 lg:grid-cols-12 lg:px-10 lg:py-48">
        <div className="lg:col-span-2">
          <div className="eyebrow text-white/50">§ 06</div>
        </div>
        <div className="lg:col-span-10">
          <blockquote className="font-display text-[clamp(2rem,5vw,5rem)] leading-[1.02] tracking-tight text-balance">
            <span className="text-white/40">"</span>
            We move the machines that
            <br />
            move the <span className="italic">continent forward</span> —
            <br />
            from quarry to port,
            <br />
            from harbour to horizon.
            <span className="text-white/40">"</span>
          </blockquote>
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-4">
            {[
              ["Construction", "Roads · bridges · vertical builds"],
              ["Mining", "Surface · underground · haulage"],
              ["Ports & marine", "Cargo handling · reach stackers"],
              ["Industrial", "Cement · steel · energy"],
            ].map(([t, d]) => (
              <div key={t}>
                <div className="font-display text-lg">{t}</div>
                <div className="mt-1 text-[13px] text-white/50">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------- Section: Partner Ecosystem ----------------------- */
function Ecosystem() {
  const nodes = [
    { x: 20, y: 30, l: "Manufacturers", d: "China · Japan · EU" },
    { x: 80, y: 30, l: "Shipping Partners", d: "RoRo · Container · Break-bulk" },
    { x: 20, y: 80, l: "Clients", d: "Contractors · Miners · Fleets" },
    { x: 80, y: 80, l: "Ports & Customs", d: "West · East · Southern Africa" },
  ];
  return (
    <section id="ecosystem" className="relative border-t hairline bg-background py-24 lg:py-36">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <div className="eyebrow mb-3">§ 07 — Partner ecosystem</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-tight text-balance">
            Four sides,
            <br />
            <span className="italic text-primary">one gearbox.</span>
          </h2>
          <p className="mt-6 text-base text-muted-foreground">
            Manufacturers submit equipment. Partners move it. Clients purchase it.
            QianTron orchestrates every handoff.
          </p>
        </div>

        <div className="relative mx-auto aspect-[16/10] max-w-4xl rounded-2xl border hairline bg-gradient-to-br from-muted/50 to-background p-6 lg:p-10">
          {/* connections */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            {[
              [20, 30, 50, 55],
              [80, 30, 50, 55],
              [20, 80, 50, 55],
              [80, 80, 50, 55],
              [20, 30, 80, 30],
              [20, 80, 80, 80],
              [20, 30, 20, 80],
              [80, 30, 80, 80],
            ].map(([x1, y1, x2, y2], i) => (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.15"
                strokeDasharray="0.6 0.4"
                className="text-primary/50"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: i * 0.1 }}
              />
            ))}
          </svg>
          {/* center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.32_0.15_25)] shadow-[0_0_60px_-10px_oklch(0.48_0.19_27_/_0.6)]">
              <img src={dragon.url} alt="QianTron" className="h-14 w-14 brightness-0 invert" />
            </div>
            <div className="mt-3 text-center font-mono-brand text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Orchestration layer
            </div>
          </div>
          {/* nodes */}
          {nodes.map((n) => (
            <div
              key={n.l}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border hairline bg-card">
                <Globe2 className="h-5 w-5 text-graphite" strokeWidth={1.5} />
              </div>
              <div className="mt-2 font-display text-sm">{n.l}</div>
              <div className="text-[10px] font-mono-brand uppercase tracking-[0.14em] text-muted-foreground">
                {n.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------- Section: Future Platform ------------------------ */
const modules = [
  ["Q1", "Client Portal", "Live ops for buyers."],
  ["Q2", "Manufacturer Portal", "Direct factory inventory."],
  ["Q3", "Partner Portal", "Shipping & customs collab."],
  ["Q3", "Logistics Tracking", "Vessel + inland telemetry."],
  ["Q4", "Smart Procurement", "Auto-matched sourcing."],
  ["Q4", "Equipment Marketplace", "Verified secondary market."],
  ["Q1'27", "Shipping Intelligence", "Predictive routing engine."],
];

function FuturePlatform() {
  return (
    <section id="about" className="relative border-t hairline bg-muted/40 py-24 lg:py-36">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-3">§ 08 — Platform vision</div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-tight text-balance">
              A machinery OS,
              <br />
              <span className="italic text-primary">module by module.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono-brand uppercase tracking-[0.2em] text-muted-foreground">
            <ShieldCheck className="h-4 w-4" /> Roadmap · Rolling 18 months
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {modules.map(([q, t, d], i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex items-center justify-between gap-6 rounded-xl border hairline bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]"
            >
              <div className="flex items-center gap-5">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 font-mono-brand text-[11px] font-medium tracking-wider text-primary">
                  {q}
                </span>
                <div>
                  <div className="font-display text-xl">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Section: Final CTA ------------------------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-white grain">
      <img
        src={dragon.url}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[900px] w-[900px] -translate-y-1/2 opacity-[0.06]"
      />
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-32 lg:px-10 lg:py-48">
        <div className="max-w-4xl">
          <div className="eyebrow mb-6 text-white/50">§ 09 — Begin</div>
          <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] tracking-tight text-balance">
            Engineering trust.
            <br />
            <span className="italic text-primary">Delivering power.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-white/60">
            Open a QianTron account to source, ship and track your next machine —
            with a single team accountable end-to-end.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_0_60px_-10px_oklch(0.48_0.19_27_/_0.6)] transition-all hover:brightness-110">
              Create client account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="rounded-full glass px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/15">
              Sign in
            </button>
          </div>
        </div>

        <div className="mt-24 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
          <div>
            <img src={dragon.url} alt="QianTron" className="h-10 w-10" />
            <div className="mt-3 text-sm text-white/50">
              Premium machinery, engineered logistics.
            </div>
          </div>
          {[
            ["Contact", ["ops@qiantron.com", "+86 21 000 000", "+234 1 000 0000"]],
            ["Corridors", ["Shanghai HQ", "Rotterdam", "Lagos · Mombasa · Durban"]],
            ["Compliance", ["ISO 9001", "AEO Certified", "IMO RoRo"]],
          ].map(([h, arr]) => (
            <div key={h as string}>
              <div className="eyebrow mb-3 text-white/50">{h}</div>
              <ul className="space-y-1.5 text-sm text-white/70">
                {(arr as string[]).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono-brand text-[10px] uppercase tracking-[0.24em] text-white/40">
          <span>© {new Date().getFullYear()} QianTron Global Ltd.</span>
          <span>Est. Shanghai · Operating Worldwide</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Page --------------------------------- */
function QianTronExperience() {
  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <Hero />
      <Difference />
      <Portfolio />
      <GlobalLogistics />
      <Dashboard />
      <PoweringAfrica />
      <Ecosystem />
      <FuturePlatform />
      <FinalCTA />
    </main>
  );
}
