import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Layers, MapPin, Wrench, Gauge, Ship, Factory, ChevronRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { FlowLine } from "@/components/flow-line";
import { productsQueryOptions } from "@/lib/products-query";
import type { Category } from "@/lib/catalog";

export const Route = createFileRoute("/equipment")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
  head: () => ({
    meta: [
      { title: "Equipment Portfolio — QianTron" },
      {
        name: "description",
        content:
          "An immersive catalogue of excavators, loaders, cranes, haulers, drills, rollers, prime movers and dozers — engineered for continental-scale infrastructure.",
      },
      { property: "og:title", content: "Equipment Portfolio — QianTron" },
      {
        property: "og:description",
        content: "Machinery presented as capability. Explore the QianTron industrial fleet.",
      },
      { property: "og:url", content: "https://qiantron-next.lovable.app/equipment" },
    ],
    links: [{ rel: "canonical", href: "https://qiantron-next.lovable.app/equipment" }],
  }),
  component: EquipmentPage,
  errorComponent: ({ error }) => (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <p role="alert">Couldn't load equipment: {error.message}</p>
    </div>
  ),
  notFoundComponent: () => <p>Not found.</p>,
});

function EquipmentPage() {
  const { data } = useSuspenseQuery(productsQueryOptions);
  const [activeIdx, setActiveIdx] = useState(0);
  const active = data.products[activeIdx];

  return (
    <div className="min-h-screen bg-ink text-white">
      <SiteNav variant="dark" />

      <HeroChapter total={data.count} />

      <ShowcaseChapter
        products={data.products}
        activeIdx={activeIdx}
        onSelect={setActiveIdx}
        active={active}
      />

      <FlowInterlude label="Sourced · Inspected · Shipped · Cleared · Delivered" />

      <FleetGrid products={data.products} onSelect={setActiveIdx} />

      <CtaChapter />

      <SiteFooter />
    </div>
  );
}

/* ────────────────────────────  HERO  ──────────────────────────── */

function HeroChapter({ total }: { total: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });
  const tX = useTransform(px, (v) => v * 20);
  const tY = useTransform(py, (v) => v * 12);

  return (
    <section
      className="relative isolate overflow-hidden border-b border-white/10 grain"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      {/* atmospheric layers */}
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,oklch(0.16_0.004_260)_70%)]" />
      <motion.div
        style={{ x: tX, y: tY }}
        className="pointer-events-none absolute -right-40 top-24 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
      >
        <div className="h-full w-full rounded-full forge-bg" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-32 lg:pt-44">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="eyebrow mb-4 flex items-center gap-3 text-white/50 sm:mb-6">
              <span className="inline-block h-px w-6 bg-white/40 sm:w-8" />
              <span className="truncate">§ Vol. I · {String(total).padStart(2, "0")} disciplines</span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,10vw,7.5rem)] leading-[0.94] tracking-tight text-balance">
              Machinery,
              <br />
              <span className="italic text-white/50">presented as</span>
              <br />
              <span className="relative inline-block">
                capability.
                <motion.span
                  layoutId="hero-underline"
                  className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-[oklch(0.48_0.19_27)] to-[oklch(0.78_0.14_82)]"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
                />
              </span>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-6">
            <p className="max-w-md text-sm leading-relaxed text-white/60 sm:text-base lg:text-lg">
              Every unit is sourced from vetted OEMs, inspected against QianTron's QC
              checklist, and delivered site-ready. This catalogue is served live from
              <span className="mx-1 font-mono-brand text-white/80">/api/products</span>
              — the same pipeline that powers our client operations dashboard.
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 font-mono-brand text-[9px] uppercase tracking-[0.18em] text-white/45 sm:mt-8 sm:gap-6 sm:pt-6 sm:text-[10px] sm:tracking-[0.22em]">
              {[
                { k: "OEM Partners", v: "42" },
                { k: "Corridors", v: "18" },
                { k: "Ports", v: "27" },
              ].map((s) => (
                <div key={s.k}>
                  <dt>{s.k}</dt>
                  <dd className="mt-1 font-display text-2xl text-white sm:text-3xl">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <FlowLine className="absolute inset-x-0 bottom-0 w-full" height={140} />
    </section>
  );
}


/* ───────────────────────  IMMERSIVE SHOWCASE  ─────────────────── */

function ShowcaseChapter({
  products,
  activeIdx,
  onSelect,
  active,
}: {
  products: Category[];
  activeIdx: number;
  onSelect: (i: number) => void;
  active: Category;
}) {
  // subtle parallax on hero image
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 80, damping: 22 });
  const py = useSpring(my, { stiffness: 80, damping: 22 });
  const imgX = useTransform(px, (v) => v * 24);
  const imgY = useTransform(py, (v) => v * 16);

  return (
    <section className="relative border-b border-white/10 bg-ink py-14 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-10">

        <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow text-white/45">Chapter 01 · Disciplines</div>
            <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl">
              Choose a discipline.
              <br />
              <span className="italic text-white/50">Enter the machine.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/50">
            Every category is a specialised industrial capability — matched to project,
            terrain and duty cycle by QianTron engineers before a single container is
            booked.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Rail — horizontal chips on mobile, vertical list on lg */}
          <ol className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:px-0 lg:col-span-4 lg:block lg:snap-none lg:overflow-visible lg:border-r lg:border-white/10 lg:pr-6">
            {products.map((p, i) => {
              const isActive = i === activeIdx;
              return (
                <li key={p.slug} className="shrink-0 snap-start lg:shrink lg:snap-align-none">
                  <button
                    type="button"
                    onMouseEnter={() => onSelect(i)}
                    onFocus={() => onSelect(i)}
                    onClick={() => onSelect(i)}
                    className={`group relative flex h-full w-40 items-start gap-3 rounded-xl border p-3 text-left transition-colors sm:w-52 lg:w-full lg:items-center lg:gap-4 lg:rounded-none lg:border-0 lg:border-b lg:border-white/10 lg:p-0 lg:py-5 ${
                      isActive
                        ? "border-white/25 bg-white/[0.04] lg:border-transparent lg:bg-transparent"
                        : "border-white/10 bg-white/[0.02] lg:bg-transparent"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span
                      className={`font-mono-brand text-[10px] tracking-[0.24em] transition-colors ${
                        isActive ? "text-[oklch(0.78_0.14_82)]" : "text-white/35"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span
                        className={`block truncate font-display text-lg leading-tight transition-colors sm:text-2xl lg:text-3xl ${
                          isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                        }`}
                      >
                        {p.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-white/40 sm:text-xs">{p.spec}</span>
                    </span>
                    <ChevronRight
                      className={`hidden h-4 w-4 shrink-0 transition-all lg:block ${
                        isActive ? "translate-x-1 text-[oklch(0.78_0.14_82)]" : "text-white/30"
                      }`}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="rail-marker"
                        className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-gradient-to-r from-[oklch(0.48_0.19_27)] to-[oklch(0.78_0.14_82)] lg:-right-[1px] lg:bottom-auto lg:left-auto lg:top-0 lg:h-full lg:w-[2px] lg:bg-gradient-to-b"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>


          {/* Cinema */}
          <div className="lg:col-span-8">
            <div
              ref={wrapRef}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-[oklch(0.12_0.004_260)]"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                mx.set((e.clientX - r.left) / r.width - 0.5);
                my.set((e.clientY - r.top) / r.height - 0.5);
              }}
              onMouseLeave={() => {
                mx.set(0);
                my.set(0);
              }}
            >
              <div className="relative aspect-[16/11] w-full">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active.slug}
                    src={active.img}
                    alt={active.name}
                    style={{ x: imgX, y: imgY, scale: 1.08 }}
                    initial={{ opacity: 0, scale: 1.14 }}
                    animate={{ opacity: 1, scale: 1.08 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
                {/* blueprint overlay */}
                <BlueprintOverlay />

                {/* top-left index */}
                <div className="absolute left-6 top-6 flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[0.24em] text-white/60">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[oklch(0.78_0.14_82)]" />
                  QT · {String(activeIdx + 1).padStart(3, "0")} / {String(products.length).padStart(3, "0")}
                </div>

                {/* content */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.slug}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                    >
                      <div className="eyebrow mb-3 text-[oklch(0.78_0.14_82)]">
                        Discipline · {active.slug.replace(/-/g, " ")}
                      </div>
                      <h3 className="font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl">
                        {active.name}
                      </h3>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 lg:text-base">
                        {active.blurb}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* spec bar */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug + "-specs"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 sm:grid-cols-4"
                >
                  <SpecCell icon={<Gauge className="h-3.5 w-3.5" />} label="Class" value={active.spec} />
                  <SpecCell icon={<Layers className="h-3.5 w-3.5" />} label="Tonnage" value={active.tonnage} />
                  <SpecCell icon={<MapPin className="h-3.5 w-3.5" />} label="Origin" value={active.origin} />
                  <SpecCell icon={<Wrench className="h-3.5 w-3.5" />} label="Fleet" value={active.count} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* applications + CTA */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-2">
                {active.applications.map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 font-mono-brand text-[10px] uppercase tracking-[0.2em] text-white/70"
                  >
                    {a}
                  </li>
                ))}
              </ul>
              <button className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-ink transition-all hover:bg-[oklch(0.78_0.14_82)]">
                Request specification pack
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="px-3 py-3 sm:px-5 sm:py-4">
      <div className="flex items-center gap-1.5 font-mono-brand text-[8px] uppercase tracking-[0.2em] text-white/45 sm:text-[9px] sm:tracking-[0.24em]">
        {icon}
        {label}
      </div>
      <div className="mt-1 font-display text-sm leading-tight text-white sm:mt-1.5 sm:text-lg">{value}</div>
    </div>

  );
}

function BlueprintOverlay() {
  // ambient technical overlay
  const lines = useMemo(() => Array.from({ length: 6 }, (_, i) => i), []);
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
      aria-hidden
    >
      {lines.map((i) => (
        <motion.line
          key={i}
          x1="0"
          x2="1000"
          y1={100 + i * 100}
          y2={100 + i * 100}
          stroke="oklch(0.78 0.14 82)"
          strokeOpacity="0.08"
          strokeWidth="0.6"
          strokeDasharray="4 8"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: i * 0.08 }}
        />
      ))}
      <circle cx="820" cy="180" r="60" fill="none" stroke="oklch(0.78 0.14 82 / 0.3)" strokeDasharray="2 4" />
      <circle cx="820" cy="180" r="4" fill="oklch(0.78 0.14 82)" />
      <text x="890" y="184" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="oklch(0.78 0.14 82 / 0.7)">
        Ø PIVOT
      </text>
    </svg>
  );
}

/* ────────────────────────  FLOW INTERLUDE  ────────────────────── */

function FlowInterlude({ label }: { label: string }) {
  const stops = [
    { icon: Factory, k: "Source" },
    { icon: Wrench, k: "Inspect" },
    { icon: Ship, k: "Ship" },
    { icon: MapPin, k: "Clear" },
    { icon: Layers, k: "Deliver" },
  ];
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[oklch(0.13_0.005_260)] py-24">
      <FlowLine className="absolute inset-x-0 top-1/2 -translate-y-1/2" height={200} />
      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="eyebrow mb-8 text-white/45">Industrial Flow Engine™</div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {stops.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <s.icon className="h-4 w-4 text-[oklch(0.78_0.14_82)]" />
              <div className="mt-3 font-mono-brand text-[10px] uppercase tracking-[0.24em] text-white/45">
                Stage {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-1 font-display text-2xl text-white">{s.k}</div>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-white/40">{label}</p>
      </div>
    </section>
  );
}

/* ────────────────────────  FLEET GRID  ────────────────────────── */

function FleetGrid({
  products,
  onSelect,
}: {
  products: Category[];
  onSelect: (i: number) => void;
}) {
  return (
    <section className="relative bg-ink py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow text-white/45">Chapter 02 · Full Fleet</div>
            <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl">
              Every discipline,
              <br />
              <span className="italic text-white/50">at a glance.</span>
            </h2>
          </div>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p, i) => (
            <FleetCard key={p.slug} product={p} index={i} onSelect={() => onSelect(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FleetCard({
  product,
  index,
  onSelect,
}: {
  product: Category;
  index: number;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, (v) => v * -6), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, (v) => v * 6), { stiffness: 150, damping: 18 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.14_0.004_260)]"
    >
      <button
        type="button"
        onClick={onSelect}
        className="absolute inset-0 z-20"
        aria-label={`View ${product.name}`}
      />
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute left-4 top-4 rounded border border-white/20 bg-black/50 px-2 py-1 font-mono-brand text-[9px] uppercase tracking-[0.24em] text-white/80 backdrop-blur">
          QT-{String(index + 1).padStart(3, "0")}
        </div>
        <div className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 backdrop-blur transition-all group-hover:bg-[oklch(0.78_0.14_82)]">
          <ArrowUpRight className="h-3.5 w-3.5 text-white transition-colors group-hover:text-ink" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="font-display text-2xl leading-tight">{product.name}</h3>
          <p className="mt-1 text-xs text-white/60">{product.spec}</p>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <p className="line-clamp-2 text-sm leading-relaxed text-white/60">{product.blurb}</p>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/10 pt-3 font-mono-brand text-[10px] uppercase tracking-[0.2em] text-white/45">
          <div className="flex items-center gap-1.5">
            <Layers className="h-3 w-3" /> {product.tonnage}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" /> {product.origin}
          </div>
        </dl>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────  CTA  ──────────────────────────── */

function CtaChapter() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-ink py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.48_0.19_27_/_0.25),transparent_60%)]" />
      <div className="relative mx-auto w-full max-w-[1440px] px-6 text-center lg:px-10">
        <div className="eyebrow mb-6 text-white/45">Chapter 03 · Engage</div>
        <h2 className="mx-auto max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
          Tell us what you're building.
          <br />
          <span className="italic text-white/60">We'll bring the machine.</span>
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-all hover:bg-[oklch(0.78_0.14_82)]"
          >
            Start a procurement brief
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="/logistics"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:border-white/40 hover:text-white"
          >
            See the logistics engine
          </a>
        </div>
      </div>
      <FlowLine className="absolute inset-x-0 bottom-0 w-full" height={120} reverse />
    </section>
  );
}

