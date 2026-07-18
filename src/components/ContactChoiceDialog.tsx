import { useEffect, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

export type ContactPurpose = "appointment" | "pharmacy";

const NUMBERS: Record<ContactPurpose, { label: string; phone: string; wa: string; businessWa: string; note: string }> = {
  appointment: {
    label: "Book an Appointment",
    phone: "+918147360437",
    wa: "918147360437",
    businessWa: "918147360437",
    note: "Talk to our reception to book your consultation.",
  },
  pharmacy: {
    label: "Order Medicines",
    phone: "+918722703415",
    wa: "918722703415",
    businessWa: "918722703415",
    note: "Send your prescription or place an order with our pharmacy.",
  },
};

export function openContactChoice(purpose: ContactPurpose) {
  window.dispatchEvent(new CustomEvent("lc:contact", { detail: { purpose } }));
}

export function ContactChoiceDialog() {
  const [purpose, setPurpose] = useState<ContactPurpose | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { purpose: ContactPurpose };
      setPurpose(detail.purpose);
    };
    window.addEventListener("lc:contact", handler as EventListener);
    return () => window.removeEventListener("lc:contact", handler as EventListener);
  }, []);

  if (!purpose) return null;
  const info = NUMBERS[purpose];
  const close = () => setPurpose(null);
  const normalizeWhatsAppNumber = (value: string) => value.replace(/\D/g, "");
  const normalWhatsAppUrl = `https://wa.me/${normalizeWhatsAppNumber(info.wa)}`;
  const businessWhatsAppUrl = `https://wa.me/${normalizeWhatsAppNumber(info.businessWa)}`;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 backdrop-blur-sm p-4" onClick={close}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-fade-up"
      >
        <button onClick={close} aria-label="Close" className="absolute right-4 top-4 rounded-full p-1.5 text-slate-500 hover:bg-slate-100">
          <X className="h-5 w-5" />
        </button>
        <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--teal)]">Life Care</div>
        <h3 className="mt-1 font-display text-2xl font-semibold text-slate-900">{info.label}</h3>
        <p className="mt-2 text-sm text-slate-600">{info.note}</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">{info.phone}</p>
        <p className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
          Choose the chat option that suits your preferred app.
        </p>

        <div className="mt-6 grid gap-3">
          <a
            href={normalWhatsAppUrl}
            target="_self"
            rel="noopener noreferrer"
            onClick={close}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            <MessageCircle className="h-4 w-4" /> Open WhatsApp
          </a>
          <a
            href={businessWhatsAppUrl}
            target="_self"
            rel="noopener noreferrer"
            onClick={close}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[color:var(--teal)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            <MessageCircle className="h-4 w-4" /> Open WhatsApp Business
          </a>
          <a
            href={`tel:${info.phone}`}
            onClick={close}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Phone className="h-4 w-4" /> Call clinic
          </a>
        </div>
      </div>
    </div>
  );
}
