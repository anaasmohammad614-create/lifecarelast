import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteShell } from "@/components/layout/SiteShell";
import { motion } from "framer-motion";
import { media, departmentImage, doctorImage, namedDoctorPhoto } from "@/lib/media";
import {
  Calendar, Phone, MessageCircle, ShieldCheck, HeartPulse, FlaskConical,
  Pill, Sparkles, Stethoscope, Award, Users, Clock, ArrowRight, Star, MapPin, Navigation,
} from "lucide-react";
import { openContactChoice } from "@/components/ContactChoiceDialog";
import { TEAM } from "./team";
import heroImage from "@/assets/publiclifecare-heroo.jpg.png";


export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Life Care Medical Polyclinic and Laboratory — Advanced Healthcare" },
      { name: "description", content: "Trusted doctors, advanced diagnostics, laboratory, pharmacy and online consultations. Book an appointment in seconds." },
    ],
  }),
});

const stats = [
  { icon: Users, value: "50k+", label: "Patients Cared For" },
  { icon: Stethoscope, value: "7+", label: "Experienced Doctors" },
  { icon: Award, value: "15+ yrs", label: "Trusted Service" },
  { icon: HeartPulse, value: "Free", label: "Home Sample Collection" },
  { icon: Pill, value: "Free", label: "Home Delivery" },
];


const services = [
  { icon: Stethoscope, title: "OPD Consultations", desc: "General medicine & specialist care with same-day appointments." },
  { icon: FlaskConical, title: "Diagnostic Laboratory", desc: "Full pathology, blood work, imaging and rapid reports." },
  { icon: Pill, title: "In-house Pharmacy", desc: "Authentic medicines, digital prescription refills, home delivery." },
  { icon: HeartPulse, title: "Cardiac Care", desc: "ECG, echo, stress tests and preventive heart programs." },
  { icon: Sparkles, title: "Preventive Health", desc: "Curated packages for annual check-ups and executive wellness." },
  { icon: ShieldCheck, title: "Insurance & Cashless", desc: "Support with major insurers and transparent billing." },
];

function Home() {
  const { data: doctors = [] } = useQuery({
    queryKey: ["home-doctors"],
    queryFn: async () => {
      const { data } = await supabase
        .from("doctors")
        .select("id, name, specialty, qualifications, experience_years, photo_url")
        .eq("is_active", true)
        .order("sort_order");
      return data ?? [];
    },
  });

  const { data: departments = [] } = useQuery({
    queryKey: ["home-departments"],
    queryFn: async () => {
      const { data } = await supabase
        .from("departments")
        .select("id, name, slug, description, icon")
        .eq("is_active", true)
        .order("sort_order")
        ;
      return data ?? [];
    },
  });

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-aurora opacity-70" />
        <EcgBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 md:pt-28 md:pb-32 grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-white/90">
              <span className="grid h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] animate-pulse" />
              Now accepting new patients · Open today until 9pm
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl font-semibold leading-[1.05] text-white">
              Advanced healthcare with a <span className="text-[color:var(--gold)]">human touch.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-white/80">
              Trusted doctors, advanced diagnostics, laboratory services, pharmacy and compassionate care —
              all under one roof at Life Care Medical Polyclinic and Laboratory.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={() => openContactChoice("appointment")} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-deep shadow-lift hover:opacity-95 sm:w-auto">
                <Calendar className="h-4 w-4" /> Book Appointment
              </button>
              <button type="button" onClick={() => openContactChoice("appointment")} className="inline-flex w-full items-center justify-center gap-2 rounded-full glass px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 sm:w-auto">
                <Phone className="h-4 w-4" /> Call now
              </button>
              <button type="button" onClick={() => openContactChoice("pharmacy")} className="inline-flex w-full items-center justify-center gap-2 rounded-full glass px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 sm:w-auto">
                <MessageCircle className="h-4 w-4" /> Order Medicine
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 max-w-4xl sm:grid-cols-3 md:grid-cols-5">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4">
                  <s.icon className="h-5 w-5 text-white/80" />
                  <div className="mt-2 font-display text-2xl font-semibold text-white">{s.value}</div>
                  <div className="text-xs text-white/70">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white/20">
              <img src={heroImage} alt="Life Care storefront" width={1024} height={1024} className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[520px]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.15_0.03_230/0.55)] via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 flex items-center gap-3 animate-float">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-primary"><FlaskConical className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/70">Available</div>
                <div className="text-sm font-semibold text-white">✓ Free Home Sample Collection</div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 flex items-center gap-3 animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--gold)] text-white"><Award className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/70">Trusted by</div>
                <div className="text-sm font-semibold text-white">50,000+ patients</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <Section eyebrow="What we do" title="Comprehensive care, thoughtfully delivered">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <motion.div key={s.title} whileHover={{ y: -4 }} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* DEPARTMENTS */}
      {/* OUR TEAM */}
      <Section eyebrow="Leadership" title="Meet Our Team" subtitle="The leaders behind Life Care's commitment to compassionate, modern healthcare." action={<Link to="/team" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">Full team <ArrowRight className="h-4 w-4" /></Link>}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <Link key={m.role} to="/team" className="card-lift group rounded-3xl border border-border bg-card shadow-soft overflow-hidden block">
              <div className="img-zoom relative aspect-[3/4] bg-muted">
                <img src={m.img} alt={`${m.role} — Life Care`} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[oklch(0.15_0.03_230/0.75)] to-transparent" />
                <div className="absolute inset-x-4 bottom-3 text-white">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/80">Life Care</div>
                  <div className="font-display text-lg font-semibold">{m.role}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* DEPARTMENTS */}
      <Section eyebrow="Departments" title="Specialists across every major area" subtitle="From primary care to specialist consultations, our team is here for every step of your journey." action={<Link to="/departments" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">All departments <ArrowRight className="h-4 w-4" /></Link>}>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((d) => (
            <Link key={d.id} to="/departments" className="group card-lift rounded-3xl border border-border bg-card shadow-soft overflow-hidden">
              <div className="img-zoom relative aspect-[4/3]">
                <img src={departmentImage(d.slug, d.name)} alt={`${d.name} department at Life Care`} loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[oklch(0.15_0.03_230/0.75)] to-transparent" />
                <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/85 backdrop-blur text-primary shadow-glow">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div className="absolute inset-x-4 bottom-3 text-white">
                  <div className="font-display text-lg font-semibold">{d.name}</div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground line-clamp-2">{d.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* DOCTORS */}
      <Section eyebrow="Our doctors" title="Meet the team you can trust" action={<Link to="/doctors" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">All doctors <ArrowRight className="h-4 w-4" /></Link>}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doc: any) => (
            <div key={doc.id} className="card-lift rounded-3xl border border-border bg-card shadow-soft overflow-hidden">
              <Link to="/doctors" className="img-zoom relative aspect-[3/4] block bg-muted">
                <img src={namedDoctorPhoto(doc.name) || doc.photo_url || doctorImage(doc.name)} alt={`Portrait of ${doc.name}`} loading="lazy" width={900} height={1200} className="h-full w-full object-contain" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[oklch(0.15_0.03_230/0.6)] to-transparent" />
                <span className="absolute left-3 top-3 rounded-full glass px-2.5 py-1 text-[11px] font-medium text-white">{doc.specialty}</span>
              </Link>
              <div className="p-5">
                <div className="font-display text-lg font-semibold">{doc.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{doc.qualifications}</div>
                <div className="mt-3 flex items-center justify-end">
                  <button type="button" onClick={() => openContactChoice("appointment")} className="text-xs font-semibold text-primary hover:underline">Book →</button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS + GOOGLE RATING */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Patient stories</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold">Loved by families across Surathkal &amp; Mangalore</h2>
          </div>
          <a href="https://www.google.com/search?q=Life+Care+Medical+Polyclinic+Surathkal+reviews" target="_blank" rel="noopener"
             className="card-lift inline-flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-3 shadow-soft hover:shadow-lift">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary font-bold">G</div>
            <div>
              <div className="flex items-center gap-1">
                {[0,1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-[color:var(--gold)] text-[color:var(--gold)]" />)}
                <span className="ml-2 font-display text-lg font-semibold">4.8/5</span>
              </div>
              <div className="text-xs text-muted-foreground">from <strong>2,300+</strong> Google reviews</div>
            </div>
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <motion.figure key={t.name} whileHover={{ y: -4 }} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-1 text-[color:var(--gold)]">
                {[0,1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-3 text-sm md:text-[15px] leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.5_0.11_195)] to-[oklch(0.26_0.06_230)] text-white font-semibold">
                  {t.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location} · {t.service}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-soft">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Why Life Care</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold">The Best Polyclinic &amp; Diagnostic Laboratory in Surathkal for Quality Healthcare</h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Looking for the <strong>best polyclinic in Surathkal</strong> or a <strong>trusted diagnostic laboratory near Mangalore</strong>? <strong>Life Care Polyclinic &amp; Day Care Centre</strong> provides comprehensive healthcare services with experienced specialist doctors, advanced computerized laboratory facilities, preventive health checkups, physiotherapy, and compassionate patient care—all under one roof.
            </p>
            <p>
              Our <strong>multi-specialty clinic in Surathkal</strong> offers expert consultations in <strong>General Medicine, Pediatrics, Gynecology, Orthopedics, ENT, Dermatology, and Neurosurgery</strong>. We also provide nursing care, ECG, nebulization, dressing, first aid, day care services, physiotherapy, and Hijama cupping therapy. Patients from Surathkal, Mangalore, Kulai, Katipalla, Mulki, NITK, and surrounding areas trust Life Care for quality treatment, affordable consultation, and personalized medical care.
            </p>
            <p>
              Our <strong>computerized diagnostic laboratory</strong> delivers accurate and timely results for a wide range of medical tests, including <strong>CBC, Blood Sugar, HbA1c, Lipid Profile, Liver Function Test, Kidney Function Test, Thyroid Profile, Iron Profile, Vitamin Tests, ECG, Urine Analysis, Dengue, Widal, Malaria, and other routine investigations</strong>. We also provide <strong>free home blood sample collection in Surathkal and Mangalore</strong>, making healthcare more convenient for patients.
            </p>
            <p>
              Life Care offers <strong>affordable health checkup packages</strong> including <strong>Mini Health Checkup, Executive Health Checkup, Diabetic Profile, Fever Package, and Women's Wellness (PCOD) Package</strong>. With experienced doctors, modern diagnostic facilities, transparent pricing, and patient-focused healthcare, Life Care Polyclinic &amp; Day Care Centre is committed to helping individuals and families achieve better health through trusted, accessible, and high-quality medical services.
            </p>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <Section eyebrow="FAQs" title="Frequently asked questions" subtitle="Everything you need to know before your visit to Life Care Medical Polyclinic.">
        <FaqList />

        {/* Contact CTA */}
        <div className="mt-12 relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[color:var(--teal)] to-[color:var(--teal)]/85 text-white p-8 md:p-12 shadow-soft">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" aria-hidden />
          <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">Still have questions?</div>
              <h3 className="mt-2 font-display text-3xl md:text-4xl font-semibold leading-tight">Talk to our care team today</h3>
              <p className="mt-3 text-white/85 max-w-xl">Call us, message on WhatsApp, or schedule a visit — our reception replies within the hour during working times.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="tel:+918147360437"
                   className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[color:var(--teal)] shadow-soft hover:bg-white/95 sm:w-auto">
                  <Phone className="h-4 w-4" /> Call +91 81473 60437
                </a>
                <a href="https://wa.me/918147360437" target="_blank" rel="noopener"
                   className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-95 sm:w-auto">
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
                <button onClick={() => openContactChoice("appointment")}
                   className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 sm:w-auto">
                  <Calendar className="h-4 w-4" /> Schedule an appointment
                </button>
              </div>
            </div>
            <div className="grid gap-3 text-sm">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur px-4 py-3">
                <Clock className="h-5 w-5 shrink-0" />
                <div><div className="font-semibold">Mon–Sat</div><div className="text-white/80">6:30 am – 8:30 pm</div></div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur px-4 py-3">
                <Clock className="h-5 w-5 shrink-0" />
                <div><div className="font-semibold">Sunday</div><div className="text-white/80">6:30 am – 1:00 pm</div></div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur px-4 py-3">
                <MapPin className="h-5 w-5 shrink-0" />
                <div><div className="font-semibold">Surathkal, Mangalore</div><div className="text-white/80">Master Complex, near MJM Hall</div></div>
              </div>
            </div>
          </div>
        </div>
      </Section>


      {/* LOCATION + MAP */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Visit us</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold">Find Life Care in Surathkal</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Centrally located and easy to reach — get directions in one click.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><MapPin className="h-5 w-5" /></div>
              <div>
                <div className="font-display text-lg font-semibold">Our address</div>
                <p className="text-sm text-muted-foreground mt-1">Life Care Medical Polyclinic and Laboratory,<br/>NH-66, Surathkal, Mangalore, Karnataka 575014</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Clock className="h-5 w-5" /></div>
              <div>
                <div className="font-display text-lg font-semibold">Hours</div>
                <p className="text-sm text-muted-foreground mt-1">Mon–Sat: 8:00 AM – 9:00 PM<br/>Sunday: Emergency only (24×7)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="font-display text-lg font-semibold">Contact</div>
                <p className="text-sm text-muted-foreground mt-1">+91 81473 60437<br/>lifecarepolyclinic415@gmail.com</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              <a href="https://www.google.com/maps/dir/?api=1&destination=Surathkal+Mangalore+Karnataka" target="_blank" rel="noopener"
                 className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95">
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
              <a href="tel:+911234567890" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">
                <Phone className="h-4 w-4" /> Call clinic
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft min-h-[380px]">
            <iframe
              title="Life Care Medical Polyclinic location on Google Maps"
              src="https://www.google.com/maps?q=Surathkal+Mangalore+Karnataka&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative overflow-hidden rounded-[2rem] gradient-hero p-8 md:p-14 shadow-lift">
          <div className="absolute inset-0 gradient-aurora opacity-70" />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">
                Your health, one click away.
              </h2>
              <p className="mt-3 text-white/80 max-w-xl">
                Book an appointment, get lab reports online, refill prescriptions and consult top doctors — all from your phone.
              </p>
            </div>
            <button type="button" onClick={() => openContactChoice("appointment")} className="inline-flex items-center gap-2 self-start md:self-auto rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-deep shadow-lift">
              <Calendar className="h-4 w-4" /> Book now
            </button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

const FAQS = [
  { q: "Do you accept walk-ins?", a: "Yes. Life Care welcomes walk-in patients during clinic hours (Mon–Sat, 8am–9pm). For zero waiting time and to see your preferred specialist, we recommend booking an appointment online or by phone." },
  { q: "How long does it take to get lab reports?", a: "Most routine blood tests and pathology reports are ready the same day, usually within 4–6 hours. Specialized tests (hormone panels, biopsies, cultures) may take 24–72 hours. Reports are shared digitally via email and WhatsApp, and printed copies are available on request." },
  { q: "Do you provide home sample collection?", a: "Yes. We offer home sample collection across Surathkal, Mangalore, Mulki and surrounding areas. A trained phlebotomist visits at your chosen time slot. Book via phone, WhatsApp, or the appointment form on our website." },
  
  { q: "Are doctors available on Sundays and holidays?", a: "Our emergency and pharmacy services run 24×7. Select outpatient departments operate on Sundays with limited hours — please call ahead or check the doctor's schedule on our Doctors page." },
  { q: "How do I book an appointment online?", a: "Click 'Book Appointment' from any page, choose your department, doctor, preferred date and time slot. You'll get instant confirmation via SMS and email. Guest bookings (no account required) are supported." },
];

const TESTIMONIALS: { name: string; location: string; service: string; quote: string }[] = [
  { name: "Ramesh K.", location: "Mangalore", service: "Lab tests", quote: "Very quick diagnosis and friendly doctors. Lab reports came the same day and were shared on WhatsApp — super convenient." },
  { name: "Anitha Shenoy", location: "Surathkal", service: "Pediatrics", quote: "The pediatrician was patient and gentle with my daughter. Clean clinic, short wait, and honest advice — no unnecessary tests." },
  { name: "Prakash Rao", location: "NITK Campus", service: "Cardiology", quote: "Got my ECG and echo done in a single visit. The cardiologist explained everything clearly. Genuinely the best polyclinic in Surathkal." },
  { name: "Sowmya B.", location: "Mulki", service: "Home sample", quote: "Home sample collection was on time and very professional. Reports came by email in a few hours. Highly recommend for seniors." },
  { name: "Imran Sheikh", location: "Katipalla", service: "Pharmacy", quote: "Uploaded my prescription on WhatsApp — medicines delivered the same evening at a fair price. Refill reminders are a lifesaver." },
  { name: "Deepa Nayak", location: "Mangalore", service: "Health check-up", quote: "Booked the family package online. Smooth experience end to end, with clear reports and a follow-up call from the doctor." },
];


function FaqList() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-4 md:grid-cols-2">
        {FAQS.map((f) => (
          <details key={f.q} className="group card-lift rounded-2xl border border-border bg-card p-5 shadow-soft open:shadow-lift">
            <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
              <span className="font-display text-base md:text-lg font-semibold text-foreground">{f.q}</span>
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-primary transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}

function Section({
  eyebrow, title, subtitle, action, children,
}: {
  eyebrow: string; title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">{eyebrow}</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-white">{title}</h2>
          {subtitle && <p className="mt-2 max-w-2xl text-white/85">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function EcgBackdrop() {
  return (
    <svg className="absolute bottom-0 left-0 right-0 w-full h-32 opacity-30 pointer-events-none" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none">
      <path
        className="animate-ecg"
        d="M0,60 L200,60 L230,60 L245,20 L260,100 L275,40 L290,80 L305,60 L520,60 L545,20 L560,100 L575,40 L590,80 L605,60 L820,60 L845,20 L860,100 L875,40 L890,80 L905,60 L1200,60"
        stroke="oklch(0.88 0.08 180)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
