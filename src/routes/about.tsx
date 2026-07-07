import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — QianTron" },
      {
        name: "description",
        content:
          "QianTron is where machinery, logistics, engineering and global trade converge. Learn about our mission and continental footprint.",
      },
      { property: "og:title", content: "About — QianTron" },
      { property: "og:description", content: "The people, principles and infrastructure behind QianTron's end-to-end machinery delivery." },
      { property: "og:url", content: "https://qiantron-next.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://qiantron-next.lovable.app/about" }],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  { t: "Own the full chain", d: "One accountable operator from factory floor to jobsite." },
  { t: "Engineering rigor", d: "Every unit inspected against a QianTron QC checklist." },
  { t: "Continental scale", d: "Corridors, ports and yards operated as one network." },
  { t: "Software-native", d: "Live telemetry, documents and milestones — one portal." },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="relative border-b hairline bg-background">
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-40">
          <div className="eyebrow mb-3 sm:mb-4">§ About QianTron</div>
          <h1 className="max-w-[18ch] font-display text-[clamp(2.25rem,7vw,5.5rem)] leading-[1] tracking-tight text-balance">
            Where <span className="italic text-primary">machinery, logistics</span> and
            engineering converge.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:mt-8 sm:text-lg">
            QianTron was founded to end the fractured, broker-heavy experience of importing
            heavy machinery. We operate every leg of the journey — sourcing, inspection,
            shipping, customs, inland transport and commissioning — as one continuous system.
          </p>
        </div>
      </section>

      <section className="border-b hairline bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 sm:gap-10 sm:px-6 lg:grid-cols-2 lg:px-10">
          {PRINCIPLES.map((p, i) => (
            <div key={p.t} className="border-t hairline pt-5 sm:pt-6">
              <div className="font-mono-brand text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")} · Principle
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl">{p.t}</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-8 px-5 sm:px-6 lg:grid-cols-4 lg:gap-10 lg:px-10">
          {[
            ["1,280+", "Units delivered"],
            ["42", "Active corridors"],
            ["18", "Port partners"],
            ["9.4d", "Avg. transit"],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl">{v}</div>
              <div className="mt-2 font-mono-brand text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

