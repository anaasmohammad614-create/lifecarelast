// Central asset registry — resolves department/doctor imagery to real photography.
import heroTeam from "@/assets/lifecare-storefront.jpg";
import doctorFemale from "@/assets/doctor-female.jpg";
import doctorMale from "@/assets/doctor-male.jpg";
import drDeepalakshmiTanthry from "@/assets/doctor-deepalakshmi-tanthry.jpg";
import drVarshaShetty from "@/assets/doctor-varsha-shetty.jpg";
import drSukaniyaV from "@/assets/doctor-sukaniya-v.jpg";
import drPradyumnaBhandary from "@/assets/doctor-pradyumna-bhandary.jpg";
import drSagarBallal from "@/assets/doctor-sagar-ballal.jpg";
import laboratory from "@/assets/laboratory.jpg";
import pharmacy from "@/assets/pharmacy.jpg";
import reception from "@/assets/reception.jpg";
import healthPackage from "@/assets/health-package.jpg";
import cardiology from "@/assets/dept-cardiology.jpg";
import pediatrics from "@/assets/dept-pediatrics.jpg";
import neurology from "@/assets/dept-neurology.jpg";
import orthopedics from "@/assets/dept-orthopedics.jpg";
import dental from "@/assets/dept-dental.jpg";
import dermatology from "@/assets/dept-dermatology.jpg";
import gynecology from "@/assets/dept-gynecology.jpg";
import ent from "@/assets/dept-ent.jpg";
import general from "@/assets/dept-general.jpg";

export const media = {
  heroTeam, doctorFemale, doctorMale, laboratory, pharmacy, reception, healthPackage,
};

const deptMap: Record<string, string> = {
  cardiology,
  pediatrics,
  neurology,
  neurosurgery: neurology,
  neurosurgeon: neurology,
  orthopedics,
  dental,
  dentistry: dental,
  dermatology,
  gynecology,
  ent,
  "general-medicine": general,
  laboratory,
  "diagnostics-laboratory": laboratory,
};

// Real named doctor portraits. Keys are lowercased for lenient matching.
const namedDoctorPhotos: Record<string, string> = {
  "dr. mohd. aquib shakeel": doctorMale,
  "dr. niyaf n.a.": doctorFemale,
  "dr. deepalakshmi tanthry": drDeepalakshmiTanthry,
  "dr. varsha shetty": drVarshaShetty,
  "dr. sukaniya v.": drSukaniyaV,
  "dr. pradyumna r. bhandary": drPradyumnaBhandary,
  "dr. sagar ballal": drSagarBallal,
};

export function namedDoctorPhoto(name?: string | null): string | undefined {
  if (!name) return undefined;
  return namedDoctorPhotos[name.trim().toLowerCase()];
}

export function departmentImage(slug?: string | null, name?: string | null) {
  if (slug && deptMap[slug]) return deptMap[slug];
  const key = (name ?? "").toLowerCase();
  for (const k of Object.keys(deptMap)) if (key.includes(k.replace(/-/g, " "))) return deptMap[k];
  return general;
}

// Deterministic doctor portrait selection based on name/id.
export function doctorImage(seed: string, hintFemale?: boolean) {
  if (hintFemale) return doctorFemale;
  const lower = seed.toLowerCase();
  const femaleHints = ["priya", "anita", "meera", "kavita", "sara", "aisha", "ritu", "sneha", "dr. p", "dr. a", "dr. m", "dr. s"];
  if (femaleHints.some((h) => lower.includes(h))) return doctorFemale;
  // Hash pick
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % 2 === 0 ? doctorMale : doctorFemale;
}
