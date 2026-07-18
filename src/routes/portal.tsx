import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { openContactChoice } from "@/components/ContactChoiceDialog";
import { SiteShell } from "@/components/layout/SiteShell";
import { useSession } from "@/lib/auth-hooks";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, User, LogOut } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/portal")({
  component: Portal,
  head: () => ({ meta: [{ title: "Patient Portal — Life Care Medical" }] }),
});

function Portal() {
  const { user, loading } = useSession();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [user, loading]);

  const { data: appointments = [] } = useQuery({
    enabled: !!user,
    queryKey: ["my-appts", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("appointments")
        .select("*, doctors(name, specialty), departments(name)")
        .eq("patient_id", user!.id)
        .order("appointment_date", { ascending: false });
      return data ?? [];
    },
  });

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    nav({ to: "/" });
  }

  if (loading || !user) return null;

  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-aurora opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-white">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur"><User className="h-7 w-7" /></div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-white/80">Patient portal</div>
                <h1 className="font-display text-3xl font-semibold">Hi, {user.user_metadata?.full_name ?? user.email?.split("@")[0]}</h1>
              </div>
            </div>
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur px-4 py-2 text-sm font-medium hover:bg-white/20">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">Your appointments</h2>
          <button type="button" onClick={() => openContactChoice("appointment")} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            <Calendar className="h-4 w-4" /> Book new
          </button>
        </div>
        <div className="mt-6 rounded-3xl border border-border bg-card divide-y shadow-soft">
          {appointments.length === 0 && <div className="p-8 text-center text-muted-foreground text-sm">No appointments yet. Book your first visit above.</div>}
          {appointments.map((a: any) => (
            <div key={a.id} className="p-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{a.doctors?.name ?? "First available doctor"} <span className="text-sm text-muted-foreground">· {a.doctors?.specialty ?? a.departments?.name ?? "General"}</span></div>
                <div className="text-sm text-muted-foreground mt-0.5">{a.appointment_date} at {a.appointment_time?.slice(0, 5)}</div>
                {a.reason && <div className="mt-1 text-xs text-muted-foreground">Reason: {a.reason}</div>}
              </div>
              <StatusPill status={a.status} />
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-emerald-100 text-emerald-800",
    completed: "bg-slate-100 text-slate-700",
    cancelled: "bg-rose-100 text-rose-800",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${map[status] ?? "bg-slate-100 text-slate-700"}`}>{status}</span>;
}
