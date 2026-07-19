import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import chairman from "@/assets/chairmen.jpg";
import director from "@/assets/chairmen_1.jpg";
import md from "@/assets/managing_director.jpg";
import ceo from "@/assets/ceo.jpg";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({
    meta: [
      { title: "Our Team — Life Care Medical Polyclinic and Laboratory" },
      { name: "description", content: "Meet the leadership team behind Life Care Medical Polyclinic and Laboratory — Chairman, Managing Director, CEO and Director." },
      { property: "og:title", content: "Our Team — Life Care Medical" },
      { property: "og:description", content: "Leadership driving compassionate healthcare at Life Care." },
    ],
  }),
});

export const TEAM = [
  { role: "Chairman", name: "Muzammil Abdul Khader", img: director },
  { role: "Chairman", name: "Zulman Saeed", img: chairman },
  { role: "CEO", name: "T.K Muhammad Safeem", img: ceo },
  { role: "Managing Director", name: "Mansoor Ahmad", img: md },
];

function TeamPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Leadership" title="Our Team" subtitle="The people guiding Life Care's mission of accessible, compassionate and modern healthcare." />
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <div key={m.name} className="card-lift rounded-3xl border border-border bg-card shadow-soft overflow-hidden">
              <div className="img-zoom relative aspect-[3/4] bg-muted">
                <img src={m.img} alt={`${m.name} — ${m.role} — Life Care`} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[oklch(0.15_0.03_230/0.75)] to-transparent" />
                <div className="absolute inset-x-5 bottom-4 text-white">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/80">Life Care</div>
                  <div className="font-display text-lg font-semibold leading-tight">{m.name}</div>
                  <div className="text-xs text-white/85">{m.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
