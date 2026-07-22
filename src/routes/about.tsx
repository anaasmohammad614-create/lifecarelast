import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import { Award, HeartPulse, Users, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Life Care Polyclinic & Day Care Centre | Surathkal" },
      { name: "description", content: "Learn about Life Care Medical Polyclinic & Day Care Centre, a patient-focused clinic and diagnostic laboratory serving Surathkal, Mangalore and nearby areas with reliable consultations and lab services." },
      { name: "keywords", content: "best doctors in Surathkal, best polyclinic in Surathkal, family healthcare centre, medical centre in Surathkal, affordable clinic in Surathkal" },
      { property: "og:title", content: "About Life Care Medical" },
      { property: "og:description", content: "A modern polyclinic built around trust, expertise and compassionate community care." },
    ],
  }),
});

const values = [
  { icon: HeartPulse, title: "Compassionate care", desc: "We treat every patient like family — with dignity, empathy and attention." },
  { icon: ShieldCheck, title: "Clinical excellence", desc: "Evidence-based practice, modern equipment and rigorous quality standards." },
  { icon: Users, title: "Accessible for all", desc: "Transparent pricing, insurance support and no-hidden-charges billing." },
  { icon: Award, title: "Trusted for 15+ years", desc: "Serving families in our community with consistent, reliable care." },
];

function About() {
  return (
    <SiteShell>
      <PageHero eyebrow="About us" title="Care that feels personal, delivered with precision" subtitle="Life Care Medical Polyclinic and Laboratory brings expert doctors, advanced diagnostics and pharmacy together — so you never have to run between clinics again." />
      <section className="mx-auto max-w-4xl px-4 py-16 prose prose-slate">
        <h2 className="font-display text-3xl font-semibold">Our story</h2>
        <p className="text-muted-foreground">
          Founded with the vision of accessible, high-quality neighborhood healthcare, Life Care has grown into a trusted <strong>polyclinic in Surathkal</strong> and <strong>medical centre in Surathkal</strong> serving families across the region. Our multi-specialty team, pathology lab and pharmacy work together so patients can receive doctor consultation, diagnostics and medication support in one place.
        </p>
        <p className="text-muted-foreground">
          Whether you need a routine check-up, a specialist consultation, a blood test, an ECG, a health package, or follow-up care for a chronic condition, our clinicians focus on clarity, convenience and compassionate treatment. Families from Surathkal, Mangalore, Kulai, Katipalla, Mulki, Baikampady and nearby areas choose Life Care for reliable care and a calm, professional environment.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Why choose Life Care</div>
          <h2 className="mt-2 font-display text-3xl font-semibold">A dependable choice for families looking for the best doctors in Surathkal</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-5">
              <h3 className="font-display text-lg font-semibold">Quick answer: what services are available?</h3>
              <p className="mt-2 text-sm text-muted-foreground">We provide general physician care, pediatrics, gynecology, orthopedics, ENT, dermatology, neurosurgery support, physiotherapy, Hijama therapy, day care services and computerized laboratory testing.</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-5">
              <h3 className="font-display text-lg font-semibold">Quick answer: is Life Care good for preventive care?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Yes. Our preventive health checkups, women’s wellness packages, diabetic profiles and other routine screenings help patients stay informed about their health and plan timely follow-up care.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-24 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div key={v.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-primary"><v.icon className="h-5 w-5" /></div>
            <div className="mt-3 font-display text-lg font-semibold">{v.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
