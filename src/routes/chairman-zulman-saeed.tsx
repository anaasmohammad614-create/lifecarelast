import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import chairman from "@/assets/chairmen.jpg";

export const Route = createFileRoute("/chairman-zulman-saeed")({
  component: ZulmanPage,
  head: () => ({
    meta: [
      { title: "Zulman Saeed | Chairman of Life Care Medical Polyclinic & Day Care Centre" },
      { name: "description", content: "Learn about Zulman Saeed, a Chairman of Life Care Medical Polyclinic & Day Care Centre, and his role in supporting trusted healthcare service in Surathkal and Mangalore." },
      { name: "keywords", content: "Zulman Saeed, Chairman of Life Care, Life Care chairman, Life Care leadership" },
    ],
  }),
});

function ZulmanPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Zulman Saeed",
    jobTitle: "Chairman",
    worksFor: {
      "@type": "Organization",
      name: "Life Care Medical Polyclinic & Day Care Centre",
    },
    description: "Chairman of Life Care Medical Polyclinic & Day Care Centre, supporting the organization’s growth, service quality and community healthcare commitment.",
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <PageHero eyebrow="Leadership profile" title="Zulman Saeed" subtitle="Chairman of Life Care Medical Polyclinic & Day Care Centre" />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <img src={chairman} alt="Zulman Saeed — Chairman of Life Care" loading="lazy" className="h-[420px] w-full rounded-2xl object-cover" />
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Search-focused profile</div>
            <h1 className="mt-2 font-display text-3xl font-semibold">Chairman of Life Care Medical Polyclinic & Day Care Centre</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Zulman Saeed is associated with Life Care as a <strong>Chairman</strong> and plays an important role in the organization’s leadership and long-term healthcare vision. This profile helps people searching for <strong>Zulman Saeed</strong> or the <strong>Chairman of Life Care</strong> discover credible and relevant information about the leadership team.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Life Care’s leadership works to keep care accessible, reliable and compassionate for residents of Surathkal, Mangalore and nearby communities.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/team" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Back to leadership team</Link>
              <Link to="/about" className="rounded-full border border-border px-4 py-2 text-sm font-semibold">About Life Care</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
