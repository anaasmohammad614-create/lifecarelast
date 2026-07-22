import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import { FlaskConical, Droplet, HeartPulse, Microscope, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { media } from "@/lib/media";
import { openContactChoice } from "@/components/ContactChoiceDialog";

export const Route = createFileRoute("/laboratory")({
  component: Lab,
  head: () => ({
    meta: [
      { title: "Diagnostic Laboratory & Blood Tests in Surathkal | Life Care" },
      { name: "description", content: "Computerized diagnostic laboratory in Surathkal for CBC, HbA1c, thyroid, lipid, liver and kidney tests, ECG, urine analysis and free home blood sample collection." },
      { property: "og:title", content: "Laboratory Services — Life Care Medical" },
      { property: "og:description", content: "Accredited diagnostic laboratory with rapid, reliable results." },
      { property: "og:image", content: media.laboratory },
    ],
  }),
});

const packages = [
  { name: "Basic Health Check", price: 999, tests: ["CBC", "Blood Sugar", "Lipid Profile", "Urine Analysis"], icon: HeartPulse },
  { name: "Full Body Check-up", price: 2499, tests: ["CBC", "Liver Function", "Kidney Function", "Thyroid Panel", "HbA1c", "Lipid Profile", "ECG"], icon: FlaskConical, popular: true },
  { name: "Cardiac Care Package", price: 3999, tests: ["ECG", "Echo", "Lipid Profile", "hs-CRP", "Homocysteine", "Physician Review"], icon: HeartPulse },
  { name: "Women's Wellness", price: 3499, tests: ["CBC", "Thyroid", "Vitamin D & B12", "Iron Panel", "PAP Smear", "Ultrasound Pelvis"], icon: Microscope },
];

const features = [
  { icon: Clock, title: "Same-day reports", desc: "Most routine reports ready within hours." },
  { icon: ShieldCheck, title: "NABL-standard quality", desc: "Certified pathologists and calibrated equipment." },
  { icon: Droplet, title: "Home sample collection", desc: "Phlebotomist visits your home at your slot." },
  { icon: Microscope, title: "Comprehensive testing", desc: "500+ tests across pathology, biochemistry & serology." },
];

function Lab() {
  return (
    <SiteShell>
      <PageHero eyebrow="Diagnostics" title="Advanced laboratory & diagnostics" subtitle="Reliable, fast and comprehensive testing supported by expert pathologists — all reports available online." />

      {/* Feature banner with real lab imagery */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] items-center">
          <div className="img-zoom relative overflow-hidden rounded-[2rem] shadow-lift">
            <img src={media.laboratory} alt="Life Care pathology laboratory with technician at microscope" loading="lazy" width={1600} height={1000} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.15_0.03_230/0.35)] to-transparent" />
            <div className="absolute left-6 bottom-6 glass rounded-2xl p-4 text-white">
              <div className="text-[11px] uppercase tracking-widest text-white/70">Turnaround</div>
              <div className="font-display text-2xl">Same-day reports</div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="card-lift rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-primary"><f.icon className="h-5 w-5" /></div>
                <div className="mt-3 font-display text-lg font-semibold">{f.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Health packages</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold">Curated packages for every stage of life</h2>
          </div>
          <div className="hidden md:block img-zoom relative w-72 rounded-2xl overflow-hidden shadow-soft">
            <img src={media.healthPackage} alt="Family receiving preventive health checkup" loading="lazy" width={1400} height={900} className="h-40 w-full object-cover" />
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => (
            <div key={p.name} className={`card-lift relative rounded-3xl border bg-card p-6 shadow-soft flex flex-col ${p.popular ? "border-primary/50 ring-1 ring-primary/20" : "border-border"}`}>
              {p.popular && <span className="absolute -top-3 left-6 rounded-full bg-[color:var(--gold)] px-3 py-1 text-[11px] font-semibold text-brand-deep shadow-soft">Most popular</span>}
              <p.icon className="h-6 w-6 text-primary" />
              <div className="mt-3 font-display text-lg font-semibold">{p.name}</div>
              <div className="mt-1 font-display text-3xl font-semibold text-brand-deep">₹{p.price}</div>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground flex-1">
                {p.tests.map((t) => <li key={t} className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />{t}</li>)}
              </ul>
              <button type="button" onClick={() => openContactChoice("appointment")} className="mt-5 inline-flex justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95">Book test</button>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
