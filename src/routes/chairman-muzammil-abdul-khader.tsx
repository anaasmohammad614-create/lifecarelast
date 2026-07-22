import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import director from "@/assets/chairmen_1.jpg";

export const Route = createFileRoute("/chairman-muzammil-abdul-khader")({
  component: MuzammilPage,
  head: () => ({
    meta: [
      { title: "Muzammil Abdul Khader | Chairman of Life Care Medical Polyclinic & Day Care Centre" },
      { name: "description", content: "Learn about Muzammil Abdul Khader, Chairman of Life Care Medical Polyclinic & Day Care Centre, and his role in guiding compassionate healthcare services in Surathkal and Mangalore." },
      { name: "keywords", content: "Muzammil Abdul Khader, Chairman of Life Care, Life Care chairman, Life Care leadership" },
    ],
  }),
});

function MuzammilPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muzammil Abdul Khader",
    jobTitle: "Chairman",
    worksFor: {
      "@type": "Organization",
      name: "Life Care Medical Polyclinic & Day Care Centre",
    },
    description: "Chairman of Life Care Medical Polyclinic & Day Care Centre, contributing to the organization’s long-term healthcare vision and community-focused service standards.",
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <PageHero eyebrow="Leadership profile" title="Muzammil Abdul Khader" subtitle="Chairman of Life Care Medical Polyclinic & Day Care Centre" />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <img src={director} alt="Muzammil Abdul Khader — Chairman of Life Care" loading="lazy" className="h-[420px] w-full rounded-2xl object-cover" />
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Search-focused profile</div>
            <h1 className="mt-2 font-display text-3xl font-semibold">Chairman of Life Care Medical Polyclinic & Day Care Centre</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Muzammil Abdul Khader is recognized as the <strong>Chairman of Life Care</strong>, helping shape the clinic’s services, community presence and patient-first values. This page is designed to make it easier for people searching for the <strong>Chairman of Life Care</strong> to find authoritative, clearly structured information about the leadership role.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Life Care continues to grow as a trusted healthcare destination in Surathkal, Mangalore and surrounding areas through leadership that emphasizes quality care, dependable diagnostics and transparent service.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/team" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Back to leadership team</Link>
              <Link to="/contact" className="rounded-full border border-border px-4 py-2 text-sm font-semibold">Contact Life Care</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
