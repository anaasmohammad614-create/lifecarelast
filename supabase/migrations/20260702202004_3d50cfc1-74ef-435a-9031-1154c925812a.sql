
-- Roles enum + user_roles table (separate from profiles, per security best practice)
CREATE TYPE public.app_role AS ENUM ('admin', 'doctor', 'staff', 'patient');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  gender TEXT,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_self_select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_self_upsert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_self_update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_roles_self_read" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Admins can read/manage all roles
CREATE POLICY "user_roles_admin_all" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile + patient role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), NEW.raw_user_meta_data->>'phone')
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'patient')
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Departments
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.departments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.departments TO authenticated;
GRANT ALL ON public.departments TO service_role;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "departments_public_read" ON public.departments FOR SELECT USING (true);
CREATE POLICY "departments_admin_write" ON public.departments FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_departments_updated BEFORE UPDATE ON public.departments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Doctors
CREATE TABLE public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  qualifications TEXT,
  bio TEXT,
  experience_years INT DEFAULT 0,
  consultation_fee NUMERIC(10,2) DEFAULT 0,
  photo_url TEXT,
  languages TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.doctors TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.doctors TO authenticated;
GRANT ALL ON public.doctors TO service_role;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "doctors_public_read" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "doctors_admin_write" ON public.doctors FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_doctors_updated BEFORE UPDATE ON public.doctors
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Appointments
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE SET NULL,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.appointments TO authenticated;
GRANT INSERT ON public.appointments TO anon;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
-- Anyone (including guests) can book
CREATE POLICY "appointments_public_insert" ON public.appointments FOR INSERT WITH CHECK (true);
-- Patients see their own
CREATE POLICY "appointments_patient_select" ON public.appointments FOR SELECT TO authenticated
  USING (patient_id = auth.uid());
CREATE POLICY "appointments_patient_update" ON public.appointments FOR UPDATE TO authenticated
  USING (patient_id = auth.uid());
-- Admin sees/manages all
CREATE POLICY "appointments_admin_all" ON public.appointments FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_appointments_updated BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Contact messages
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contact_public_insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_admin_all" ON public.contact_messages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed departments and doctors
INSERT INTO public.departments (name, slug, description, icon, sort_order) VALUES
  ('General Medicine', 'general-medicine', 'Comprehensive primary care for adults and families.', 'Stethoscope', 1),
  ('Cardiology', 'cardiology', 'Heart care, ECG, echocardiography and consultations.', 'HeartPulse', 2),
  ('Pediatrics', 'pediatrics', 'Newborn, infant and child healthcare specialists.', 'Baby', 3),
  ('Gynecology', 'gynecology', 'Women''s health, prenatal and reproductive care.', 'Flower2', 4),
  ('Orthopedics', 'orthopedics', 'Bone, joint and musculoskeletal treatment.', 'Bone', 5),
  ('Dermatology', 'dermatology', 'Skin, hair and cosmetic care.', 'Sparkles', 6),
  ('ENT', 'ent', 'Ear, nose and throat specialists.', 'Ear', 7),
  ('Diagnostics & Laboratory', 'laboratory', 'Full-service pathology and diagnostic testing.', 'FlaskConical', 8);

INSERT INTO public.doctors (name, specialty, department_id, qualifications, bio, experience_years, consultation_fee, languages, sort_order)
SELECT 'Dr. Anjali Sharma', 'General Physician', id, 'MBBS, MD (Internal Medicine)', 'Compassionate primary care with 15+ years of hospital experience.', 15, 500, 'English, Hindi', 1
FROM public.departments WHERE slug = 'general-medicine';
INSERT INTO public.doctors (name, specialty, department_id, qualifications, bio, experience_years, consultation_fee, languages, sort_order)
SELECT 'Dr. Rajesh Verma', 'Cardiologist', id, 'MBBS, MD, DM (Cardiology)', 'Interventional cardiologist specializing in preventive heart care.', 18, 900, 'English, Hindi', 2
FROM public.departments WHERE slug = 'cardiology';
INSERT INTO public.doctors (name, specialty, department_id, qualifications, bio, experience_years, consultation_fee, languages, sort_order)
SELECT 'Dr. Priya Nair', 'Pediatrician', id, 'MBBS, MD (Pediatrics)', 'Gentle, evidence-based care for children from birth to adolescence.', 12, 600, 'English, Hindi, Malayalam', 3
FROM public.departments WHERE slug = 'pediatrics';
INSERT INTO public.doctors (name, specialty, department_id, qualifications, bio, experience_years, consultation_fee, languages, sort_order)
SELECT 'Dr. Meera Iyer', 'Gynecologist & Obstetrician', id, 'MBBS, MS (OBG)', 'Prenatal, fertility and women''s wellness expert.', 14, 800, 'English, Hindi, Tamil', 4
FROM public.departments WHERE slug = 'gynecology';
INSERT INTO public.doctors (name, specialty, department_id, qualifications, bio, experience_years, consultation_fee, languages, sort_order)
SELECT 'Dr. Kabir Malhotra', 'Orthopedic Surgeon', id, 'MBBS, MS (Orthopedics)', 'Joint replacement and sports injury specialist.', 20, 900, 'English, Hindi, Punjabi', 5
FROM public.departments WHERE slug = 'orthopedics';
INSERT INTO public.doctors (name, specialty, department_id, qualifications, bio, experience_years, consultation_fee, languages, sort_order)
SELECT 'Dr. Sana Qureshi', 'Dermatologist', id, 'MBBS, MD (Dermatology)', 'Medical, cosmetic and laser skin care specialist.', 10, 700, 'English, Hindi, Urdu', 6
FROM public.departments WHERE slug = 'dermatology';
