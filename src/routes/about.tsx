import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import { Award, HeartPulse, Users, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Life Care Polyclinic & Day Care Centre | Surathkal" },
      { name: "description", content: "Learn about Life Care Medical Polyclinic & Day Care Centre, a patient-focused clinic and diagnostic laboratory serving Surathkal, Mangalore and nearby areas." },
      { property: "og:title", content: "About Life Care Medical" },
      { property: "og:description", content: "A modern polyclinic built around trust, expertise and compassion." },
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
          Founded with the vision of accessible, high-quality neighborhood healthcare, Life Care has grown into a
          trusted polyclinic serving thousands of families. Our multi-specialty team, in-house pathology lab and
          full-service pharmacy are designed to make quality care simple, transparent and truly patient-first.
        </p>
        <p className="text-muted-foreground">
          Whether you're here for a routine check-up, a specialist consultation, urgent lab work or a chronic-care
          follow-up, our team is committed to giving you the time, clarity and results you deserve.
        </p>
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
