import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useSession, useIsAdmin } from "@/lib/auth-hooks";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { Users, Calendar, MessageSquare, Building2, Stethoscope, LogOut, Plus, Trash2, Shield } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Admin — Life Care Medical" }, { name: "robots", content: "noindex, nofollow" }] }),
});

type Tab = "overview" | "appointments" | "doctors" | "departments" | "messages";

function Admin() {
  const { user, loading } = useSession();
  const { isAdmin, checked } = useIsAdmin(user);
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [user, loading]);

  if (loading || !checked) return <FullScreen>Loading…</FullScreen>;
  if (!user) return null;
  if (!isAdmin) return <NotAllowed />;

  return (
    <div className="min-h-screen bg-secondary/40">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-card lg:block">
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Shield className="h-4 w-4" /></div>
            <div>
              <div className="font-display font-semibold">Life Care</div>
              <div className="text-xs text-muted-foreground">Admin console</div>
            </div>
          </Link>
        </div>
        <nav className="p-3 space-y-1 text-sm">
          <NavBtn icon={Users} label="Overview" active={tab === "overview"} onClick={() => setTab("overview")} />
          <NavBtn icon={Calendar} label="Appointments" active={tab === "appointments"} onClick={() => setTab("appointments")} />
          <NavBtn icon={Stethoscope} label="Doctors" active={tab === "doctors"} onClick={() => setTab("doctors")} />
          <NavBtn icon={Building2} label="Departments" active={tab === "departments"} onClick={() => setTab("departments")} />
          <NavBtn icon={MessageSquare} label="Messages" active={tab === "messages"} onClick={() => setTab("messages")} />
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border">
          <button
            onClick={async () => { await supabase.auth.signOut(); nav({ to: "/" }); }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <h1 className="font-display text-xl font-semibold capitalize">{tab}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden sm:inline">Signed in as</span>
              <span className="font-medium text-foreground">{user.email}</span>
            </div>
          </div>
          <div className="lg:hidden flex gap-1 overflow-x-auto px-4 pb-3 text-xs">
            {(["overview", "appointments", "doctors", "departments", "messages"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`shrink-0 rounded-full px-3 py-1.5 capitalize ${tab === t ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{t}</button>
            ))}
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {tab === "overview" && <Overview />}
          {tab === "appointments" && <Appointments />}
          {tab === "doctors" && <Doctors />}
          {tab === "departments" && <Departments />}
          {tab === "messages" && <Messages />}
        </main>
      </div>
    </div>
  );
}

function NavBtn({ icon: Icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 ${active ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}

function FullScreen({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen grid place-items-center text-muted-foreground">{children}</div>;
}

function NotAllowed() {
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="max-w-md text-center rounded-3xl border border-border bg-card p-8 shadow-soft">
        <Shield className="h-10 w-10 mx-auto text-primary" />
        <h1 className="mt-3 font-display text-2xl font-semibold">Admin access required</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your account doesn't have admin permissions. Please contact the super-admin to be granted access.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground font-semibold">Back to site</Link>
      </div>
    </div>
  );
}

function Overview() {
  const { data } = useQuery({
    queryKey: ["admin-counts"],
    queryFn: async () => {
      const [a, d, dep, m] = await Promise.all([
        supabase.from("appointments").select("id", { count: "exact", head: true }),
        supabase.from("doctors").select("id", { count: "exact", head: true }),
        supabase.from("departments").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      ]);
      return { appts: a.count ?? 0, doctors: d.count ?? 0, deps: dep.count ?? 0, msgs: m.count ?? 0 };
    },
  });
  const cards = [
    { label: "Appointments", value: data?.appts ?? "—", icon: Calendar },
    { label: "Doctors", value: data?.doctors ?? "—", icon: Stethoscope },
    { label: "Departments", value: data?.deps ?? "—", icon: Building2 },
    { label: "Messages", value: data?.msgs ?? "—", icon: MessageSquare },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <c.icon className="h-5 w-5 text-primary" />
          <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
          <div className="mt-1 font-display text-3xl font-semibold">{c.value}</div>
        </div>
      ))}
    </div>
  );
}

function Appointments() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({
    queryKey: ["admin-appts"],
    queryFn: async () => (await supabase.from("appointments").select("*, doctors(name), departments(name)").order("created_at", { ascending: false })).data ?? [],
  });
  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Updated");
    qc.invalidateQueries({ queryKey: ["admin-appts"] });
  }
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr>{["Patient", "Contact", "Doctor / Dept", "When", "Status", "Actions"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y">
            {data.map((a: any) => (
              <tr key={a.id}>
                <td className="px-4 py-3">
                  <div className="font-medium">{a.patient_name}</div>
                  {a.reason && <div className="text-xs text-muted-foreground line-clamp-1">{a.reason}</div>}
                </td>
                <td className="px-4 py-3">
                  <div>{a.patient_phone}</div>
                  <div className="text-xs text-muted-foreground">{a.patient_email}</div>
                </td>
                <td className="px-4 py-3">{a.doctors?.name ?? a.departments?.name ?? "—"}</td>
                <td className="px-4 py-3">{a.appointment_date} · {a.appointment_time?.slice(0, 5)}</td>
                <td className="px-4 py-3 capitalize">{a.status}</td>
                <td className="px-4 py-3">
                  <select value={a.status} onChange={(e) => setStatus(a.id, e.target.value)} className="rounded-lg border border-input bg-background px-2 py-1 text-xs">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No appointments yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const doctorSchema = z.object({
  name: z.string().trim().min(2).max(100),
  specialty: z.string().trim().min(2).max(100),
  qualifications: z.string().trim().max(200).optional().or(z.literal("")),
  experience_years: z.coerce.number().int().min(0).max(80),
  consultation_fee: z.coerce.number().min(0).max(100000),
  bio: z.string().trim().max(1000).optional().or(z.literal("")),
  department_id: z.string().uuid().optional().or(z.literal("")),
});

function Doctors() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data = [] } = useQuery({
    queryKey: ["admin-doctors"],
    queryFn: async () => (await supabase.from("doctors").select("*, departments(name)").order("sort_order")).data ?? [],
  });
  const { data: deps = [] } = useQuery({
    queryKey: ["admin-deps-list"],
    queryFn: async () => (await supabase.from("departments").select("id,name").order("sort_order")).data ?? [],
  });
  async function remove(id: string) {
    if (!confirm("Delete this doctor?")) return;
    const { error } = await supabase.from("doctors").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-doctors"] });
    toast.success("Deleted");
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as any;
    const parsed = doctorSchema.safeParse(raw);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    const payload: any = { ...parsed.data };
    if (!payload.department_id) delete payload.department_id;
    const { error } = await supabase.from("doctors").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Doctor added");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["admin-doctors"] });
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> Add doctor
        </button>
      </div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>{["Name", "Specialty", "Department", "Exp", "Fee", ""].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y">
              {data.map((d: any) => (
                <tr key={d.id}>
                  <td className="px-4 py-3 font-medium">{d.name}</td>
                  <td className="px-4 py-3">{d.specialty}</td>
                  <td className="px-4 py-3">{d.departments?.name ?? "—"}</td>
                  <td className="px-4 py-3">{d.experience_years} yrs</td>
                  <td className="px-4 py-3">₹{Number(d.consultation_fee).toFixed(0)}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove(d.id)} className="text-rose-600 hover:bg-rose-50 rounded-lg p-1.5"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)} title="Add doctor">
          <form onSubmit={submit} className="space-y-3">
            <Input name="name" label="Full name" required />
            <Input name="specialty" label="Specialty" required />
            <Input name="qualifications" label="Qualifications" />
            <div className="grid grid-cols-2 gap-3">
              <Input name="experience_years" label="Experience (yrs)" type="number" defaultValue="5" required />
              <Input name="consultation_fee" label="Fee (₹)" type="number" defaultValue="500" required />
            </div>
            <label className="block">
              <span className="text-sm font-medium">Department</span>
              <select name="department_id" className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
                <option value="">None</option>
                {deps.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium">Bio</span>
              <textarea name="bio" rows={3} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            </label>
            <button className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Save doctor</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

const depSchema = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/, "Slug must be lowercase, digits, dashes"),
  description: z.string().trim().max(500).optional().or(z.literal("")),
});

function Departments() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data = [] } = useQuery({
    queryKey: ["admin-deps"],
    queryFn: async () => (await supabase.from("departments").select("*").order("sort_order")).data ?? [],
  });
  async function remove(id: string) {
    if (!confirm("Delete department?")) return;
    const { error } = await supabase.from("departments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-deps"] });
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as any;
    const parsed = depSchema.safeParse(raw);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    const { error } = await supabase.from("departments").insert(parsed.data);
    if (error) return toast.error(error.message);
    toast.success("Department added");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["admin-deps"] });
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> Add department
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((d: any) => (
          <div key={d.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-lg font-semibold">{d.name}</div>
                <div className="text-xs text-muted-foreground">/{d.slug}</div>
              </div>
              <button onClick={() => remove(d.id)} className="text-rose-600 hover:bg-rose-50 rounded-lg p-1.5"><Trash2 className="h-4 w-4" /></button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{d.description}</p>
          </div>
        ))}
      </div>
      {open && (
        <Modal onClose={() => setOpen(false)} title="Add department">
          <form onSubmit={submit} className="space-y-3">
            <Input name="name" label="Name" required />
            <Input name="slug" label="Slug" required placeholder="cardiology" />
            <label className="block">
              <span className="text-sm font-medium">Description</span>
              <textarea name="description" rows={3} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            </label>
            <button className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Messages() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({
    queryKey: ["admin-msgs"],
    queryFn: async () => (await supabase.from("contact_messages").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  async function toggleRead(id: string, is_read: boolean) {
    await supabase.from("contact_messages").update({ is_read }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-msgs"] });
  }
  return (
    <div className="space-y-3">
      {data.length === 0 && <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground text-sm">No messages yet</div>}
      {data.map((m: any) => (
        <div key={m.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold">{m.name} <span className="text-xs text-muted-foreground">· {m.email} {m.phone && `· ${m.phone}`}</span></div>
              {m.subject && <div className="text-sm text-primary">{m.subject}</div>}
              <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{m.message}</p>
              <div className="mt-2 text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</div>
            </div>
            <button onClick={() => toggleRead(m.id, !m.is_read)} className={`rounded-full px-3 py-1 text-xs font-semibold ${m.is_read ? "bg-slate-100 text-slate-700" : "bg-amber-100 text-amber-800"}`}>
              {m.is_read ? "Read" : "Mark read"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-lift max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Input({ name, label, type = "text", required, defaultValue, placeholder }: any) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}{required && " *"}</span>
      <input name={name} type={type} required={required} defaultValue={defaultValue} placeholder={placeholder} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
    </label>
  );
}
