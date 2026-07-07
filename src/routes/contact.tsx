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
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:px-10 lg:pb-24 lg:pt-40">
          <div>
            <div className="eyebrow mb-3 sm:mb-4">§ Get in touch</div>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.25rem,7vw,5rem)] leading-[1] tracking-tight text-balance">
              One team.
              <br />
              <span className="italic text-primary">One</span> point of contact.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:mt-6 sm:text-lg">
              Tell us about the machinery, destination and timeline. An operations lead will
              respond within one business day with a scoped quote and shipping plan.
            </p>
            <ul className="mt-8 space-y-4 text-sm sm:mt-10">
              <li className="flex items-center gap-3 break-all sm:break-normal">
                <Mail className="h-4 w-4 shrink-0 text-primary" /> ops@qiantron.com
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" /> +234 (0) 803 000 0000
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" /> Lagos · Mombasa · Shanghai
              </li>
            </ul>
          </div>
          <form
            className="rounded-2xl border hairline bg-card p-5 sm:p-6 lg:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-4">
              <label className="grid gap-1.5">
                <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Name</span>
                <input required autoComplete="name" className="h-12 rounded-md border hairline bg-background px-3 text-base outline-none focus:border-primary sm:h-11 sm:text-sm" />
              </label>
              <label className="grid gap-1.5">
                <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email</span>
                <input required type="email" autoComplete="email" inputMode="email" className="h-12 rounded-md border hairline bg-background px-3 text-base outline-none focus:border-primary sm:h-11 sm:text-sm" />
              </label>
              <label className="grid gap-1.5">
                <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Company</span>
                <input autoComplete="organization" className="h-12 rounded-md border hairline bg-background px-3 text-base outline-none focus:border-primary sm:h-11 sm:text-sm" />
              </label>
              <label className="grid gap-1.5">
                <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-muted-foreground">What are you shipping?</span>
                <textarea rows={5} className="rounded-md border hairline bg-background p-3 text-base outline-none focus:border-primary sm:text-sm" />
              </label>
              <button className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 sm:h-11">
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

