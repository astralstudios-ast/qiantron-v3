import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Client Portal — QianTron" },
      { name: "description", content: "Sign in to the QianTron client portal to track shipments, documents and deliveries in real time." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen bg-ink text-white grain">
      <SiteNav variant="dark" />
      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] items-center gap-16 px-6 pb-16 pt-32 lg:grid-cols-2 lg:px-10 lg:pt-40">
        <div>
          <div className="eyebrow mb-4 text-white/50">§ Client portal</div>
          <h1 className="max-w-[14ch] font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-tight text-balance">
            Track your fleet
            <br />
            from <span className="italic text-primary">anywhere.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base text-white/60 lg:text-lg">
            Live shipment tracking, customs status, document vault and delivery milestones
            — unified in one workspace.
          </p>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-2xl glass p-6 backdrop-blur-xl lg:p-8"
        >
          <div className="grid gap-4">
            <label className="grid gap-1.5">
              <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-white/50">Email</span>
              <input
                type="email"
                required
                className="h-11 rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-primary"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-white/50">Password</span>
              <input
                type="password"
                required
                className="h-11 rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-primary"
              />
            </label>
            <button className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:brightness-110">
              Sign in <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-white/50">
              No account yet?{" "}
              <Link to="/contact" className="text-white underline underline-offset-4">
                Request access
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
