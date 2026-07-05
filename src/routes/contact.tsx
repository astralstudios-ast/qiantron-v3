import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — QianTron" },
      { name: "description", content: "Talk to QianTron about sourcing, shipping or clearing heavy machinery." },
      { property: "og:title", content: "Contact — QianTron" },
      { property: "og:description", content: "One team, one point of contact — reach QianTron's operations desk." },
      { property: "og:url", content: "https://qiantron-next.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://qiantron-next.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="relative border-b hairline bg-background">
        <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 pb-24 pt-32 lg:grid-cols-[1.2fr_1fr] lg:px-10 lg:pt-40">
          <div>
            <div className="eyebrow mb-4">§ Get in touch</div>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-tight text-balance">
              One team.
              <br />
              <span className="italic text-primary">One</span> point of contact.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Tell us about the machinery, destination and timeline. An operations lead will
              respond within one business day with a scoped quote and shipping plan.
            </p>
            <ul className="mt-10 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" /> ops@qiantron.com
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" /> +234 (0) 803 000 0000
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" /> Lagos · Mombasa · Shanghai
              </li>
            </ul>
          </div>
          <form
            className="rounded-2xl border hairline bg-card p-6 lg:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-4">
              <label className="grid gap-1.5">
                <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Name</span>
                <input required className="h-11 rounded-md border hairline bg-background px-3 text-sm outline-none focus:border-primary" />
              </label>
              <label className="grid gap-1.5">
                <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email</span>
                <input required type="email" className="h-11 rounded-md border hairline bg-background px-3 text-sm outline-none focus:border-primary" />
              </label>
              <label className="grid gap-1.5">
                <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Company</span>
                <input className="h-11 rounded-md border hairline bg-background px-3 text-sm outline-none focus:border-primary" />
              </label>
              <label className="grid gap-1.5">
                <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">What are you shipping?</span>
                <textarea rows={5} className="rounded-md border hairline bg-background p-3 text-sm outline-none focus:border-primary" />
              </label>
              <button className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:brightness-110">
                Request a quote
              </button>
            </div>
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
