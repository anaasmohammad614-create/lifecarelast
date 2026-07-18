import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import { Pill, FlaskConical, HeartPulse, Stethoscope, ShieldCheck, Sparkles } from "lucide-react";
import { openContactChoice } from "@/components/ContactChoiceDialog";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Our Products — Life Care Medical Polyclinic and Laboratory" },
      { name: "description", content: "Medicines, diagnostic panels, health packages and wellness products offered by Life Care Polyclinic and Laboratory." },
      { property: "og:title", content: "Our Products — Life Care Medical" },
      { property: "og:description", content: "Explore medicines, lab panels and health packages available at Life Care." },
    ],
  }),
});

const PRODUCTS = [
  { icon: Pill, title: "Prescription Medicines", desc: "Authentic branded and generic medicines dispensed by our licensed in-house pharmacy." },
  { icon: FlaskConical, title: "Diagnostic Test Panels", desc: "CBC, lipid, thyroid, HbA1c, liver & kidney function, vitamin D and more — same-day reports." },
  { icon: HeartPulse, title: "Preventive Health Packages", desc: "Curated annual check-up, executive wellness, cardiac and diabetes screening packages." },
  { icon: Stethoscope, title: "Home Sample Collection", desc: "Free trained phlebotomist visits at your home — early morning slots available across Surathkal." },
  { icon: ShieldCheck, title: "Chronic Care Refills", desc: "Monthly refill programs with reminders for BP, diabetes, thyroid and cardiac patients." },
  { icon: Sparkles, title: "Wellness & OTC", desc: "Vitamins, supplements, mother & baby care, first-aid and daily wellness essentials." },
];

function ProductsPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Catalogue" title="Our Products" subtitle="Everything your family needs for prevention, diagnosis and recovery — all under one roof." />
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <div key={p.title} className="card-lift rounded-3xl border border-border bg-card p-6 shadow-soft flex flex-col">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground flex-1">{p.desc}</p>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => openContactChoice("pharmacy")} className="rounded-full bg-[color:var(--teal)] px-4 py-2 text-xs font-semibold text-white hover:opacity-95">Order / Enquire</button>
                <button type="button" onClick={() => openContactChoice("appointment")} className="rounded-full border border-input px-4 py-2 text-xs font-semibold hover:bg-secondary">Book consult</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
