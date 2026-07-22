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
      { title: "Chairman of Life Care | CEO of Life Care | Leadership Team" },
      { name: "description", content: "Learn about the leadership of Life Care Medical Polyclinic & Day Care Centre, including the Chairman of Life Care, CEO of Life Care and the management team guiding patient care." },
      { name: "keywords", content: "Chairman of Life Care, CEO of Life Care, Muzammil Abdul Khader, Zulman Saeed, T.K Muhammad Safeem, Managing Director of Life Care" },
      { property: "og:title", content: "Chairman of Life Care | CEO of Life Care | Leadership Team" },
      { property: "og:description", content: "Leadership driving compassionate healthcare at Life Care." },
    ],
  }),
});

export const TEAM = [
  { role: "Chairman", name: "Muzammil Abdul Khader", img: director, bio: "Muzammil Abdul Khader serves as Chairman of Life Care Medical Polyclinic & Day Care Centre and helps shape the clinic's long-term healthcare vision." },
  { role: "Chairman", name: "Zulman Saeed", img: chairman, bio: "Zulman Saeed is recognized as a Chairman of Life Care and supports the organization’s growth, service quality and community healthcare commitment." },
  { role: "CEO", name: "T.K Muhammad Safeem", img: ceo, bio: "T.K Muhammad Safeem serves as CEO of Life Care and leads daily operations with focus on patient care, service standards and trusted medical delivery." },
  { role: "Managing Director", name: "Mansoor Ahmad", img: md, bio: "Mansoor Ahmad supports Life Care as Managing Director and helps coordinate leadership priorities across clinical and operational functions." },
];

function TeamPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Life Care Medical Polyclinic & Day Care Centre",
    url: "https://lifecarepolyclinic.com",
    founder: [
      {
        "@type": "Person",
        name: "Muzammil Abdul Khader",
        jobTitle: "Chairman",
        worksFor: "Life Care Medical Polyclinic & Day Care Centre",
      },
      {
        "@type": "Person",
        name: "Zulman Saeed",
        jobTitle: "Chairman",
        worksFor: "Life Care Medical Polyclinic & Day Care Centre",
      },
      {
        "@type": "Person",
        name: "T.K Muhammad Safeem",
        jobTitle: "CEO",
        worksFor: "Life Care Medical Polyclinic & Day Care Centre",
      },
    ],
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <PageHero eyebrow="Leadership" title="Our Team" subtitle="The people guiding Life Care's mission of accessible, compassionate and modern healthcare." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Search-focused leadership content</div>
          <h2 className="mt-2 font-display text-3xl font-semibold">Chairman of Life Care and CEO of Life Care profiles for better discoverability</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            People searching for <strong>Muzammil Abdul Khader</strong>, <strong>Zulman Saeed</strong>, <strong>T.K Muhammad Safeem</strong> or the <strong>Chairman of Life Care</strong> and <strong>CEO of Life Care</strong> can now find clearly structured leadership information on this website. The content ties each name to the organization with descriptive, search-friendly text that is easier for Google to understand and index.
          </p>
        </div>
      </section>
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
              {m.bio && <p className="p-5 text-sm text-muted-foreground">{m.bio}</p>}
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
