import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Calendar, MessageCircle, User as UserIcon } from "lucide-react";
import { useSession, useIsAdmin } from "@/lib/auth-hooks";
import { supabase } from "@/integrations/supabase/client";
import logoUrl from "@/assets/lifecare-logo-v2.png";
import { openContactChoice } from "@/components/ContactChoiceDialog";


const nav = [
  { to: "/", label: "Home" },
  { to: "/doctors", label: "Doctors" },
  { to: "/departments", label: "Departments" },
  { to: "/laboratory", label: "Laboratory" },
  { to: "/pharmacy", label: "Pharmacy" },
  { to: "/products", label: "Products" },
  { to: "/team", label: "Our Team" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];


// Nav link: white on teal, invert on hover
const navBase =
  "rounded-full px-3 py-1.5 text-sm text-white/90 transition-colors hover:bg-white hover:text-[color:var(--teal)]";
const navActive = "bg-white text-[color:var(--teal)]";

export function Header() {
  const [open, setOpen] = useState(false);
  const [logoTaps, setLogoTaps] = useState(0);
  const navigate = useNavigate();
  const { user } = useSession();
  const { isAdmin } = useIsAdmin(user);

  const handleLogoClick = (e: React.MouseEvent) => {
    const now = Date.now();
    void now;
    const next = logoTaps + 1;
    setLogoTaps(next);
    setTimeout(() => setLogoTaps(0), 800);
    if (next >= 3) {
      e.preventDefault();
      setLogoTaps(0);
      navigate({ to: "/admin" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[color:var(--teal)] text-white border-b border-white/10 shadow-soft">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-2 px-4 py-2 sm:gap-3 lg:gap-4">
        <Link to="/" onClick={handleLogoClick} className="group flex shrink-0 items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white px-1.5 py-1 shadow-sm sm:h-13 sm:w-13">
            <img src={logoUrl} alt="Life Care Polyclinic & Day Care Centre" className="h-8 w-auto max-w-[110px] object-contain sm:h-9 md:h-10" />
          </div>
        </Link>


        <nav className="ml-6 hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={navBase}
              activeProps={{ className: `${navBase} ${navActive}` }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="hidden sm:inline-flex rounded-full px-3 py-1.5 text-sm text-white/90 hover:bg-white hover:text-[color:var(--teal)] transition-colors">Admin</Link>
              )}
              <Link to="/portal" className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-white/90 hover:bg-white hover:text-[color:var(--teal)] transition-colors">
                <UserIcon className="h-4 w-4" /> Portal
              </Link>
              <button
                onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }}
                className="hidden sm:inline-flex rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white hover:text-[color:var(--teal)] transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link to="/auth" className="hidden sm:inline-flex rounded-full px-3 py-1.5 text-sm text-white/90 hover:bg-white hover:text-[color:var(--teal)] transition-colors">
              Sign in
            </Link>
          )}
          <button
            type="button"
            onClick={() => openContactChoice("pharmacy")}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2.5 py-2 text-xs font-medium text-white transition-colors hover:bg-white hover:text-[color:var(--teal)] whitespace-nowrap sm:px-3.5 sm:text-sm"
          >
            <MessageCircle className="h-4 w-4" /> Order Medicine
          </button>
          <button
            type="button"
            onClick={() => openContactChoice("appointment")}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-medium text-[color:var(--teal)] border border-white transition-colors hover:bg-[color:var(--teal)] hover:text-white sm:px-4 sm:text-sm"
          >
            <Calendar className="h-4 w-4" /> Book
          </button>
          <button className="lg:hidden ml-1 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/15 bg-[color:var(--teal)]">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-white hover:bg-white hover:text-[color:var(--teal)] transition-colors">
                {n.label}
              </Link>
            ))}
            {!user && <Link to="/auth" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-white hover:bg-white hover:text-[color:var(--teal)]">Sign in</Link>}
            {user && <Link to="/portal" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-white hover:bg-white hover:text-[color:var(--teal)]">Patient Portal</Link>}
          </div>
        </div>
      )}
    </header>
  );
}
