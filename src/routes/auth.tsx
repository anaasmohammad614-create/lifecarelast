import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth-hooks";
import { toast } from "sonner";
import { z } from "zod";
import { HeartPulse } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: Auth,
  head: () => ({ meta: [{ title: "Sign in — Life Care Medical" }, { name: "robots", content: "noindex, nofollow" }] }),
});

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(72),
});

function Auth() {
  const nav = useNavigate();
  const { user, loading } = useSession();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) nav({ to: "/portal" });
  }, [user, loading]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(form));
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    const fullName = (form.get("full_name") as string) || undefined;
    setBusy(true);
    try {
      if (mode === "signup") {
        const redirectUrl = `${window.location.origin}/portal`;
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: redirectUrl, data: { full_name: fullName } },
        });
        if (error) throw error;
        toast.success("Account created! Check your email if confirmation is enabled.");
      } else {
        const { error } = await supabase.auth.signInWithPassword(parsed.data);
        if (error) throw error;
        toast.success("Welcome back!");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/portal` },
    });
    if (error) toast.error(error.message);
  }

  return (
    <SiteShell>
      <section className="relative min-h-[calc(100vh-160px)] grid place-items-center px-4 py-16 overflow-hidden">
        <div className="absolute inset-0 gradient-aurora opacity-40" />
        <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-lift">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground"><HeartPulse className="h-5 w-5" /></div>
            <div className="font-display text-lg font-semibold">Life Care Patient Portal</div>
          </div>
          <h1 className="mt-6 font-display text-2xl font-semibold">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Access your appointments, reports and prescriptions.</p>

          <button onClick={google} type="button" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-input bg-background px-4 py-2.5 text-sm font-medium hover:bg-secondary">
            <GoogleIcon /> Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            {mode === "signup" && (
              <input name="full_name" placeholder="Full name" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm" />
            )}
            <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm" />
            <input name="password" type="password" required minLength={6} placeholder="Password" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm" />
            <button disabled={busy} className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60">
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>New to Life Care? <button onClick={() => setMode("signup")} className="text-primary font-medium hover:underline">Create an account</button></>
            ) : (
              <>Already have an account? <button onClick={() => setMode("signin")} className="text-primary font-medium hover:underline">Sign in</button></>
            )}
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:underline">← Back to website</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h6c-.3 1.4-1 2.5-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-7.8z" />
      <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.7l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8C4.1 20.7 7.8 23 12 23z" />
      <path fill="#FBBC05" d="M6 14.3c-.2-.7-.4-1.4-.4-2.3s.1-1.6.4-2.3V6.9H2.3C1.5 8.4 1 10.2 1 12s.5 3.6 1.3 5.1L6 14.3z" />
      <path fill="#EA4335" d="M12 5.5c1.6 0 3 .5 4.1 1.6l3.1-3.1C17.4 2.2 14.9 1 12 1 7.8 1 4.1 3.3 2.3 6.9L6 9.7c.9-2.5 3.2-4.2 6-4.2z" />
    </svg>
  );
}
