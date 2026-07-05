import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers, MapPin, Wrench } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { productsQueryOptions } from "@/lib/products-query";

export const Route = createFileRoute("/equipment")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
  head: () => ({
    meta: [
      { title: "Equipment Portfolio — QianTron" },
      {
        name: "description",
        content:
          "Excavators, loaders, cranes, haulers, drills, rollers, prime movers and dozers — curated for continental-scale projects.",
      },
      { property: "og:title", content: "Equipment Portfolio — QianTron" },
      {
        property: "og:description",
        content: "A curated fleet, built for continents. Explore QianTron's premium machinery catalogue.",
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
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="relative border-b hairline bg-ink text-white grain">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-32 lg:px-10 lg:pb-24 lg:pt-40">
          <div className="eyebrow mb-4 text-white/50">§ Catalogue · {data.count} categories</div>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] tracking-tight text-balance">
            A curated fleet,
            <br />
            <span className="italic text-white/60">built for</span> continents.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/60 lg:text-lg">
            Every unit is sourced from vetted OEMs, inspected against QianTron's QC checklist,
            and delivered site-ready. Data below is served from <span className="font-mono-brand text-white/80">/api/products</span>.
          </p>
        </div>
      </section>

      <section className="relative bg-background py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.products.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border hairline bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 rounded border border-white/20 bg-black/40 px-2 py-1 font-mono-brand text-[9px] uppercase tracking-[0.24em] text-white/80 backdrop-blur">
                    QT-{String(i + 1).padStart(3, "0")}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="font-display text-2xl leading-tight">{p.name}</h3>
                    <p className="mt-1 text-xs text-white/70">{p.spec}</p>
                  </div>
                </div>
                <div className="space-y-3 p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t hairline pt-3 font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3 w-3" /> {p.tonnage}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" /> {p.origin}
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5">
                      <Wrench className="h-3 w-3" />
                      <span className="truncate">{p.applications.join(" · ")}</span>
                    </div>
                  </dl>
                  <button className="group/btn inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
                    Request quote
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
