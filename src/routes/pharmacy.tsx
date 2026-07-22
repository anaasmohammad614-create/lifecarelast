import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import { Pill, Truck, ShieldCheck, Clock, MessageCircle } from "lucide-react";
import { media } from "@/lib/media";
import { openContactChoice } from "@/components/ContactChoiceDialog";

export const Route = createFileRoute("/pharmacy")({
  component: Pharmacy,
  head: () => ({
    meta: [
      { title: "In-house Pharmacy — Life Care Medical Polyclinic" },
      { name: "description", content: "Authentic medicines, prescription refills, home delivery and insurance-friendly pricing." },
      { property: "og:title", content: "Pharmacy — Life Care Medical" },
      { property: "og:description", content: "Authentic medicines with home delivery, refill reminders and expert pharmacists." },
      { property: "og:image", content: media.pharmacy },
    ],
  }),
});

const features = [
  { icon: ShieldCheck, title: "100% Authentic", desc: "Sourced directly from licensed manufacturers." },
  { icon: Truck, title: "Home delivery", desc: "Free delivery on orders above ₹499 within city limits." },
  { icon: Clock, title: "Pharmacy hours", desc: "Open daily from 5:30 am to 12:00 midnight." },
  { icon: Pill, title: "Refill reminders", desc: "Automatic reminders for chronic prescriptions." },
];

function Pharmacy() {
  return (
    <SiteShell>
      <PageHero eyebrow="Pharmacy" title="Your neighborhood pharmacy — reimagined" subtitle="Authentic medicines, expert pharmacists, and doorstep delivery. Refill prescriptions in seconds." />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] items-center">
          <div className="grid gap-4 sm:grid-cols-2 order-2 lg:order-1">
            {features.map((f) => (
              <div key={f.title} className="card-lift rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-primary"><f.icon className="h-5 w-5" /></div>
                <div className="mt-3 font-display text-lg font-semibold">{f.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="img-zoom relative overflow-hidden rounded-[2rem] shadow-lift order-1 lg:order-2">
            <img src={media.pharmacy} alt="Modern in-house pharmacy at Life Care" loading="lazy" width={1600} height={1000} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-bl from-[oklch(0.15_0.03_230/0.35)] to-transparent" />
            <div className="absolute right-6 bottom-6 glass rounded-2xl p-4 text-white">
              <div className="text-[11px] uppercase tracking-widest text-white/70">Delivery</div>
              <div className="font-display text-2xl">Same-day at home</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="rounded-3xl gradient-hero p-8 md:p-12 text-white shadow-lift relative overflow-hidden">
          <div className="absolute inset-0 gradient-aurora opacity-60" />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] items-center">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold">Upload a prescription, we'll do the rest</h2>
              <p className="mt-3 text-white/80">Send your prescription on WhatsApp and get medicines delivered the same day — with your medical history at hand.</p>
            </div>
            <button type="button" onClick={() => openContactChoice("pharmacy")} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-deep shadow-lift">
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp / Call
            </button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
