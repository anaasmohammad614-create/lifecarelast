import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useSession } from "@/lib/auth-hooks";
import { Calendar, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/book-appointment")({
  component: Book,
  head: () => ({
    meta: [
      { title: "Book Appointment — Life Care Medical Polyclinic" },
      { name: "description", content: "Book an in-person or online consultation with a Life Care doctor. Choose your specialist, date and time." },
    ],
  }),
});

const schema = z.object({
  patient_name: z.string().trim().min(2).max(100),
  patient_phone: z.string().trim().min(6).max(20),
  patient_email: z.string().trim().email().max(255).optional().or(z.literal("")),
  department_id: z.string().uuid().optional().or(z.literal("")),
  doctor_id: z.string().uuid().optional().or(z.literal("")),
  appointment_date: z.string().min(10),
  appointment_time: z.string().min(4),
  reason: z.string().trim().max(500).optional().or(z.literal("")),
});

function Book() {
  const nav = useNavigate();
  const { user } = useSession();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [dept, setDept] = useState("");

  const { data: departments = [] } = useQuery({
    queryKey: ["book-depts"],
    queryFn: async () => (await supabase.from("departments").select("id,name").eq("is_active", true).order("sort_order")).data ?? [],
  });
  const { data: doctors = [] } = useQuery({
    queryKey: ["book-doctors", dept],
    queryFn: async () => {
      let q = supabase.from("doctors").select("id,name,specialty,department_id").eq("is_active", true);
      if (dept) q = q.eq("department_id", dept);
      return (await q.order("sort_order")).data ?? [];
    },
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const payload: any = { ...parsed.data };
    if (!payload.department_id) delete payload.department_id;
    if (!payload.doctor_id) delete payload.doctor_id;
    if (!payload.patient_email) delete payload.patient_email;
    if (!payload.reason) delete payload.reason;
    if (user) payload.patient_id = user.id;
    const { error } = await supabase.from("appointments").insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    setDone(true);
    toast.success("Appointment request received!");
  }

  if (done) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold">You're booked!</h1>
          <p className="mt-3 text-muted-foreground">
            Our reception will call you shortly to confirm your slot. You'll also receive a confirmation on WhatsApp.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <button onClick={() => nav({ to: "/" })} className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground font-semibold">Back to home</button>
            {user && <button onClick={() => nav({ to: "/portal" })} className="rounded-full border border-input px-5 py-2.5 text-sm font-semibold">View my portal</button>}
          </div>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PageHero eyebrow="Appointments" title="Book with a Life Care doctor" subtitle="Choose your specialist, date and preferred time. No account required — sign in later to see your history." />
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-soft space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="patient_name" label="Full name" required defaultValue={user?.user_metadata?.full_name} />
            <Field name="patient_phone" label="Phone" required />
            <Field name="patient_email" label="Email" type="email" defaultValue={user?.email ?? ""} />
            <div>
              <label className="block text-sm font-medium">Department</label>
              <select name="department_id" value={dept} onChange={(e) => setDept(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
                <option value="">Any</option>
                {departments.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Doctor</label>
              <select name="doctor_id" className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
                <option value="">First available</option>
                {doctors.map((d: any) => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
              </select>
            </div>
            <Field name="appointment_date" label="Preferred date" type="date" required />
            <Field name="appointment_time" label="Preferred time" type="time" required />
          </div>
          <label className="block">
            <span className="text-sm font-medium">Reason for visit</span>
            <textarea name="reason" rows={3} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" placeholder="Brief description of symptoms or concerns" />
          </label>
          <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
            <Calendar className="h-4 w-4" /> {busy ? "Booking…" : "Confirm appointment"}
          </button>
        </form>
      </section>
    </SiteShell>
  );
}

function Field({ name, label, type = "text", required, defaultValue }: { name: string; label: string; type?: string; required?: boolean; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}{required && " *"}</span>
      <input name={name} type={type} required={required} defaultValue={defaultValue} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
    </label>
  );
}
