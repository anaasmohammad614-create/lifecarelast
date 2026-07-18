import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logoUrl from "@/assets/lifecare-logo-v2.png";
import { openContactChoice } from "@/components/ContactChoiceDialog";


export function Footer() {
  const linkCls = "text-white/80 hover:text-white hover:underline underline-offset-4 transition-colors";
  return (
    <footer className="mt-24 bg-[color:var(--teal)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="inline-flex items-center rounded-lg bg-white px-3 py-2">
            <img src={logoUrl} alt="Life Care Polyclinic & Day Care Centre" className="h-12 w-auto object-contain" />
          </div>
          <p className="mt-4 text-sm text-white/80 max-w-xs">
            Trusted doctors, advanced diagnostics, pharmacy and compassionate healthcare under one roof.
          </p>
        </div>


        <div>
          <div className="text-sm font-semibold text-white">Services</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/doctors" className={linkCls}>Find a Doctor</Link></li>
            <li><Link to="/departments" className={linkCls}>Departments</Link></li>
            <li><Link to="/laboratory" className={linkCls}>Laboratory</Link></li>
            <li><Link to="/pharmacy" className={linkCls}>Pharmacy</Link></li>
            <li><button type="button" onClick={() => openContactChoice("appointment")} className={linkCls}>Book Appointment</button></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-white">Company</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className={linkCls}>About Us</Link></li>
            <li><Link to="/contact" className={linkCls}>Contact</Link></li>
            <li><Link to="/auth" className={linkCls}>Patient Portal</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-white">Reach us</div>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Master Complex, Near MJM Hall, Chokkabettu, Surathkal, Mangalore - 575 014</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> Appointments: +91 81473 60437</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> Pharmacy: +91 87227 03415</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> lifecarepolyclinic415@gmail.com</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0" /> Mon–Sat: 6:30 am – 8:30 pm · Sun: 6:30 am – 1:00 pm</li>
            <li className="mt-1 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white">✓ Free home sample collection available</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-white/70 flex flex-wrap justify-between gap-2">
          <div>© {new Date().getFullYear()} Life Care Medical Polyclinic and Laboratory. All rights reserved.</div>
          <div>Emergency 24×7 · Licensed under local health authority</div>
        </div>
      </div>
    </footer>
  );
}
