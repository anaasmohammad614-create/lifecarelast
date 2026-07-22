import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Life Care Medical Polyclinic and Laboratory" },
      { name: "description", content: "Reach Life Care Medical Polyclinic. Call, WhatsApp or send us a message — we usually reply within an hour." },
      { property: "og:title", content: "Contact Life Care Medical" },
      { property: "og:description", content: "Get in touch with our reception team." },
    ],
  }),
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Please add a short message").max(2000),
});

function Contact() {
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setBusy(false);
    if (error) return toast.error("Could not send. Please try again.");
    toast.success("Thanks! We'll get back to you shortly.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <SiteShell>
      <PageHero eyebrow="Contact" title="We'd love to hear from you" subtitle="Book, ask a question or share feedback — our reception replies within the hour during working times." />
      <section className="mx-auto max-w-7xl px-4 pb-24 grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft space-y-4 text-sm">
          <InfoRow icon={MapPin} title="Address" value="Master Complex, Near MJM Hall, Chokkabettu, Surathkal, Mangalore - 575 014" />
          <InfoRow icon={Phone} title="Appointments" value="+91 81473 60437" />
          <InfoRow icon={Phone} title="Pharmacy" value="+91 96326 16501" />
          <InfoRow icon={Clock} title="Pharmacy hours" value="Daily: 5:30 am – 12:00 midnight" />
          <InfoRow icon={Mail} title="Email" value="lifecarepolyclinic415@gmail.com" />
          <InfoRow icon={Clock} title="Hours" value="Mon–Sat: 6:30 am – 8:30 pm · Sun: 6:30 am – 1:00 pm" />
          <div className="rounded-2xl bg-[color:var(--teal)]/10 text-[color:var(--teal)] px-4 py-3 text-sm font-semibold">
            ✓ Free home sample collection service available
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden bg-secondary mt-4">
            <iframe
              title="Map"
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps?q=Master+Complex+MJM+Hall+Chokkabettu+Surathkal+Mangalore&output=embed"
            />
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-soft space-y-4">
          <Field name="name" label="Full name" required />
          <Field name="email" label="Email" type="email" required />
          <Field name="phone" label="Phone" />
          <Field name="subject" label="Subject" />
          <label className="block">
            <span className="text-sm font-medium">Message *</span>
            <textarea name="message" rows={5} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
          </label>
          <button disabled={busy} className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-60">
            {busy ? "Sending…" : "Send message"}
          </button>
        </form>
      </section>
    </SiteShell>
  );
}

function InfoRow({ icon: Icon, title, value }: { icon: any; title: string; value: string }) {
  return (
    <div className="flex gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-primary shrink-0"><Icon className="h-4 w-4" /></div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}{required && " *"}</span>
      <input name={name} type={type} required={required} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
    </label>
  );
}
