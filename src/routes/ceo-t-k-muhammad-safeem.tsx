import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import ceo from "@/assets/ceo.jpg";

export const Route = createFileRoute("/ceo-t-k-muhammad-safeem")({
  component: SafeemPage,
  head: () => ({
    meta: [
      { title: "T.K Muhammad Safeem | CEO of Life Care Medical Polyclinic & Day Care Centre" },
      { name: "description", content: "Learn about T.K Muhammad Safeem, CEO of Life Care Medical Polyclinic & Day Care Centre, and his role in leading patient-focused healthcare services in Surathkal and Mangalore." },
      { name: "keywords", content: "T.K Muhammad Safeem, CEO of Life Care, Life Care CEO, Life Care leadership" },
    ],
  }),
});

function SafeemPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "T.K Muhammad Safeem",
    jobTitle: "CEO",
    worksFor: {
      "@type": "Organization",
      name: "Life Care Medical Polyclinic & Day Care Centre",
    },
    description: "CEO of Life Care Medical Polyclinic & Day Care Centre, leading operational excellence and patient-focused healthcare delivery.",
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <PageHero eyebrow="Leadership profile" title="T.K Muhammad Safeem" subtitle="CEO of Life Care Medical Polyclinic & Day Care Centre" />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <img src={ceo} alt="T.K Muhammad Safeem — CEO of Life Care" loading="lazy" className="h-[420px] w-full rounded-2xl object-cover" />
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Search-focused profile</div>
            <h1 className="mt-2 font-display text-3xl font-semibold">CEO of Life Care Medical Polyclinic & Day Care Centre</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              T.K Muhammad Safeem serves as the <strong>CEO of Life Care</strong> and helps guide day-to-day operations with focus on service quality, patient care and dependable healthcare delivery. This profile is intended to support people searching for <strong>T.K Muhammad Safeem</strong> or the <strong>CEO of Life Care</strong> to find accurate, structured leadership information.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Under the leadership team, Life Care continues to strengthen its position as a trusted polyclinic and diagnostic center for families across Surathkal, Mangalore and nearby communities.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/team" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Back to leadership team</Link>
              <Link to="/contact" className="rounded-full border border-border px-4 py-2 text-sm font-semibold">Book a visit</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
