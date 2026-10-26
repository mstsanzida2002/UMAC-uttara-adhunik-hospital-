'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSiteContent, useSiteImages } from '@/hooks/useSiteContent';
import {
  Building2,
  Clock,
  Calendar,
  BookOpen,
  GraduationCap,
  FileText,
  Presentation,
  Home,
  FlaskConical,
  Utensils,
  ChevronRight,
  ArrowRight,
  Stethoscope,
  Activity,
  Heart,
  Baby,
  Shield,
  Search,
  ExternalLink,
  Layers,
  Award,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

// Tab Definitions from Figma Node 7:1101
type TabKey =
  | 'hospital-service'
  | 'departments'
  | 'library'
  | 'meu'
  | 'training'
  | 'publications'
  | 'seminar'
  | 'hostel'
  | 'laboratory'
  | 'cafeteria';

interface TabItem {
  key: TabKey;
  label: string;
}

const TABS: TabItem[] = [
  { key: 'hospital-service', label: 'Hospital Service' },
  { key: 'departments', label: 'Departments' },
  { key: 'library', label: 'Library' },
  { key: 'meu', label: 'Medical Education Unit' },
  { key: 'training', label: 'Training' },
  { key: 'publications', label: 'Publications' },
  { key: 'seminar', label: 'Seminar' },
  { key: 'hostel', label: 'Hostel' },
  { key: 'laboratory', label: 'Laboratory' },
  { key: 'cafeteria', label: 'Cafeteria' },
];

function FacilitiesContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabKey) || 'hospital-service';
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  // Sync state if URL search param changes
  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabKey;
    if (tabParam && TABS.some((t) => t.key === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const currentTabLabel = TABS.find((t) => t.key === activeTab)?.label || 'Hospital Service';

  return (
    <div className="min-h-screen bg-white text-[#000000] font-sans antialiased selection:bg-[#018837] selection:text-white">
      {/* =========================================================================
          HERO BANNER (Figma Frame 1261155624)
          ========================================================================= */}
      <section className="relative w-full h-[460px] md:h-[500px] overflow-hidden bg-black flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/facilities/facilites___cafeteria_frame_1261155624_9032fc.jpg"
            alt="UAMC Facilities Campus"
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/80" />
        </div>

        {/* Banner Content Container (Frame 1261155625: px-[50px] py-[20px], bg-[#018837]/30 backdrop) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:max-w-[850px] text-white">
            {/* Breadcrumb (Inter 20px, font-medium) */}
            <div className="flex items-center gap-2 text-[14px] sm:text-[18px] md:text-[20px] font-medium tracking-wide text-white/90 mb-4 uppercase">
              <Link href="/" className="hover:text-[#FECD2F] transition-colors">
                HOME
              </Link>
              <span className="text-[#018837] font-bold">&gt;</span>
              <span className="text-white/80">FACILITIES</span>
              <span className="text-[#018837] font-bold">&gt;&gt;</span>
              <span className="text-[#FECD2F] font-semibold">{currentTabLabel}</span>
            </div>

            {/* Title (Figma: Heading 2 -> Canela / Serif 70px) */}
            <h1 className="font-serif text-[42px] sm:text-[56px] md:text-[70px] leading-[1.05] font-light tracking-tight text-white uppercase drop-shadow-md">
              FACILITES UAMC
            </h1>
          </div>

          {/* UAMC Crest Watermark / Emblem on Right */}
          <div className="hidden md:block relative w-[220px] h-[250px] lg:w-[250px] lg:h-[287px] opacity-90 drop-shadow-2xl">
            <Image
              src="/images/facilities/facilites___cafeteria_asset_1_4x_1_1301ba.jpg"
              alt="UAMC Seal"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          DYNAMIC NAVIGATION BAR (Figma Node 7:1101 & Frame 1261155664)
          Pill Buttons: Active is #018837, Inactive is #737477, hover:bg-[#018837]
          ========================================================================= */}
      <nav aria-label="Facilities Sub-navigation" className="w-full bg-white border-b border-neutral-200/80 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-7">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 sm:px-[26px] md:px-[30px] py-2 sm:py-3 md:py-[15px] rounded-[5px] text-[11px] sm:text-[12px] md:text-[13px] font-medium tracking-wide transition-all duration-200 cursor-pointer shadow-sm select-none ${
                    isActive
                      ? 'bg-[#018837] text-white shadow-md shadow-[#018837]/20 font-semibold ring-2 ring-[#018837]/30'
                      : 'bg-[#737477] text-white hover:bg-[#018837] hover:shadow'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* =========================================================================
          CONDITIONAL CONTENT VIEW (Dynamic Swap via React State)
          ========================================================================= */}
      <main className="w-full">
        {activeTab === 'hospital-service' && <HospitalServiceTab />}
        {activeTab === 'departments' && <DepartmentsTab />}
        {activeTab === 'library' && <LibraryTab />}
        {activeTab === 'meu' && <MEUTab />}
        {activeTab === 'training' && <TrainingTab />}
        {activeTab === 'publications' && <PublicationsTab />}
        {activeTab === 'seminar' && <SeminarTab />}
        {activeTab === 'hostel' && <HostelTab />}
        {activeTab === 'laboratory' && <LaboratoryTab />}
        {activeTab === 'cafeteria' && <CafeteriaTab />}
      </main>
    </div>
  );
}

export default function FacilitiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-[#018837] font-semibold text-lg">
          Loading Facilities...
        </div>
      }
    >
      <FacilitiesContent />
    </Suspense>
  );
}

/* ===============================================================================
   TAB 1: HOSPITAL SERVICE (Figma Node 286:2050)
   =============================================================================== */
function HospitalServiceTab() {
  const [activeUnit, setActiveUnit] = useState<'icu' | 'ccu' | 'nicu'>('icu');
  const { c } = useSiteContent();

  const unitDetails = {
    icu: {
      title: 'Intensive Care Unit (ICU)',
      desc: c('facilities.hospital.icu_desc', 'Equipped with ventilators and advanced life support. A 20-bed unit on the 10th floor equipped with 17 ventilators, providing continuous care and life support for critically ill adult patients.'),
      image: '/images/facilities/facilites___hospital_service_frame_1261155739_1cfa5d.jpg',
    },
    ccu: {
      title: 'Critical Care Unit or Coronary Care Unit (CCU)',
      desc: c('facilities.hospital.ccu_desc', 'A dedicated 17-bed unit located on the 3rd floor equipped with high-tech cardiac monitors, defibrillators, and specialized life support systems for acute coronary syndromes, post-cardiac arrest, and heart failures.'),
      image: '/images/facilities/facilites___hospital_service_frame_1261155739_1cfa5d.jpg',
    },
    nicu: {
      title: 'Neonatal Intensive Care Unit (NICU)',
      desc: c('facilities.hospital.nicu_desc', 'A state-of-the-art sterile intensive care environment specially designed for premature infants and critically ill neonates, featuring modern infant warmers, incubators, phototherapy units, and specialized neonatal ventilators.'),
      image: '/images/facilities/facilites___hospital_service_frame_1261155739_1cfa5d.jpg',
    },
  };

  const medicalServices = [
    {
      title: 'General Medicine',
      desc: 'Diagnosis and treatment of a wide range of adult diseases and conditions.',
      featured: true,
    },
    {
      title: 'Surgery',
      desc: 'Operative procedures for treating injuries, deformities, and diseases.',
      featured: false,
    },
    {
      title: 'Obstetrics & Gynecology',
      desc: 'Care for women’s reproductive health, pregnancy, and childbirth.',
      featured: false,
    },
    {
      title: 'Pediatrics',
      desc: 'Specialized medical care for infants, children, and adolescents.',
      featured: false,
    },
    {
      title: 'Anesthesiology',
      desc: 'Administration of anesthesia and pain management during surgeries.',
      featured: false,
    },
    {
      title: 'Radiology & Imaging',
      desc: 'Diagnostic services including X-rays, CT scans, and ultrasound.',
      featured: false,
    },
    {
      title: 'Dentistry',
      desc: 'Oral health services including diagnosis and treatment of dental conditions.',
      featured: false,
    },
    {
      title: 'Blood Transfusion',
      desc: 'Safe and reliable blood and component transfusion services.',
      featured: false,
    },
  ];

  const emergencyServicesCol1 = [
    '24/7 Emergency Services',
    'Ambulance Services',
    'ICU (Intensive Care Unit) – 20 beds, 17 ventilators (10th floor)',
    'CCU (Coronary Care Unit) – 17 beds (3rd floor)',
  ];

  const emergencyServicesCol2 = [
    'NICU (Neonatal Intensive Care Unit) – For critical neonatal cases',
    'Ambulance Services',
    'Haemodialysis Unit',
  ];

  const diagnosticCol1 = [
    'Modern Diagnostic Facilities',
    'CT Scan',
    'Ultrasound',
    'Digital X-Ray',
  ];

  const diagnosticCol2 = [
    'Reference Pathology & Laboratory',
    'Cardiac Non-Invasive Lab',
    'Gastroenterology: Video Endoscopy & Colonoscopy',
  ];

  const additionalCol1 = [
    'Blood Bank',
    'Oral Rehydration Therapy',
    'Vaccination Services for Children',
  ];

  const additionalCol2 = ['Outpatient Department (OPD)', 'Laparoscopic Surgery'];

  return (
    <div className="w-full">
      {/* Section 1: About the Hospital (Figma Frame About Hospital: bg-[#e6f4eb], p: 80px) */}
      <section className="w-full bg-[#e6f4eb] py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Header row: LEFT is icon + heading, RIGHT is intro paragraph */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            {/* Left box */}
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-white rounded-[5px] flex items-center justify-center shadow-sm shrink-0">
                <Building2 className="w-14 h-14 sm:w-16 sm:h-16 text-[#018837]" />
              </div>
              <h2 className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold text-[#000000] leading-tight tracking-tight">
                About the <br className="hidden sm:inline" />
                Hospital
              </h2>
            </div>

            {/* Right paragraph */}
            <div className="max-w-[680px]">
              <p className="text-[#444444] text-[15px] sm:text-[16px] leading-[1.65]">
                Uttara Adhunik Medical College Hospital (UAMCH) is the teaching and training hospital of
                the college. It is a 500-bedded, multidisciplinary tertiary care facility located in
                Uttara, Dhaka. The hospital serves patients from all over the country, particularly
                from Uttara, Tongi, Gazipur, and Savar.
              </p>
            </div>
          </div>

          {/* Hospital Campus Hero Image (1420x533 in Figma) */}
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[533px] rounded-[5px] overflow-hidden shadow-lg mb-12">
            <Image
              src="/images/facilities/facilites___hospital_service_2f49a432_a6a2_458a_9c3e_7b83a7bffcf2_1_23b9c7.jpg"
              alt="UAMCH Hospital Campus"
              fill
              className="object-cover"
            />
          </div>

          {/* Key Metrics Row (Figma Frame 1261155704) */}
          <div className="max-w-[971px] flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-10">
              {/* Stat 1 */}
              <div>
                <div className="text-[28px] sm:text-[34px] font-bold text-[#000000] leading-tight">
                  87,260.035 sq. ft. (5 Bighas)
                </div>
                <div className="text-[14px] sm:text-[15px] font-medium text-[#444444] mt-1">
                  Total Land Area
                </div>
              </div>

              {/* Vertical divider */}
              <div className="hidden sm:block w-[1px] h-[60px] bg-black/40" />

              {/* Stat 2 */}
              <div>
                <div className="text-[28px] sm:text-[34px] font-bold text-[#000000] leading-tight">
                  17 Storied
                </div>
                <div className="text-[14px] sm:text-[15px] font-medium text-[#444444] mt-1">
                  Main Building
                </div>
              </div>
            </div>

            {/* Additional Structures Badge */}
            <div className="text-[#444444] text-[14px] sm:text-[15px] font-medium bg-white/70 py-2.5 px-4 rounded-[5px] border border-[#018837]/20">
              <strong className="text-[#000000]">Additional Structures:</strong> Separate buildings
              for Radiology, Orthopedics, ENT, Dental &amp; Emergency Departments
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: ICU / CCU / NICU Showcase (Figma Frame 1261155743) */}
      <section className="w-full bg-white py-16 md:py-20 px-4 sm:px-8 lg:px-12 border-b border-neutral-100">
        <div className="max-w-[1440px] mx-auto">
          {/* Section Heading */}
          <div className="mb-10">
            <h2 className="text-[30px] sm:text-[38px] font-bold text-[#000000] leading-tight mb-2">
              UAMCH Facilities &amp; Services
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#444444]">
              Patients requiring intensive care receive specialized attention in
            </p>
          </div>

          {/* Interactive Unit Switcher Layout (Figma Frame 1261155745: LEFT 433px, RIGHT 808px) */}
          <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
            {/* LEFT: 3 Tab Selectors */}
            <div className="w-full lg:w-[430px] flex flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setActiveUnit('icu')}
                className={`w-full text-left p-5 rounded-[5px] text-[15px] sm:text-[16px] font-semibold transition-all cursor-pointer ${
                  activeUnit === 'icu'
                    ? 'bg-gradient-to-r from-[#018837] to-[#01682a] text-white shadow-md'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-[#444444] border border-neutral-200/80'
                }`}
              >
                Intensive Care Unit (ICU)
              </button>

              <button
                type="button"
                onClick={() => setActiveUnit('ccu')}
                className={`w-full text-left p-5 rounded-[5px] text-[15px] sm:text-[16px] font-semibold transition-all cursor-pointer ${
                  activeUnit === 'ccu'
                    ? 'bg-gradient-to-r from-[#018837] to-[#01682a] text-white shadow-md'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-[#444444] border border-neutral-200/80'
                }`}
              >
                Critical Care Unit or Coronary Care Unit (CCU)
              </button>

              <button
                type="button"
                onClick={() => setActiveUnit('nicu')}
                className={`w-full text-left p-5 rounded-[5px] text-[15px] sm:text-[16px] font-semibold transition-all cursor-pointer ${
                  activeUnit === 'nicu'
                    ? 'bg-gradient-to-r from-[#018837] to-[#01682a] text-white shadow-md'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-[#444444] border border-neutral-200/80'
                }`}
              >
                Neonatal Intensive Care Unit (NICU)
              </button>
            </div>

            {/* RIGHT: Active Unit Card (Figma Frame 1261155744: 808x365, border stroke:#000000) */}
            <div className="flex-1 bg-white border border-neutral-300 rounded-[5px] overflow-hidden flex flex-col md:flex-row shadow-sm">
              <div className="relative w-full md:w-[320px] lg:w-[350px] h-[260px] md:h-auto shrink-0">
                <Image
                  src={unitDetails[activeUnit].image}
                  alt={unitDetails[activeUnit].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-[#000000] mb-3">
                    {unitDetails[activeUnit].title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#444444] leading-relaxed mb-6">
                    {unitDetails[activeUnit].desc}
                  </p>
                </div>
                <div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-[21px] py-[10.5px] bg-[#018837] hover:bg-[#01702e] text-white text-[13px] font-medium rounded-[5px] transition-colors shadow-sm"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 01 Medical Services (Figma Frame 1261155717) */}
      <section className="w-full bg-white py-16 md:py-20 px-4 sm:px-8 lg:px-12 border-b border-neutral-100">
        <div className="max-w-[1440px] mx-auto">
          {/* Section Number & Heading */}
          <div className="flex items-center gap-4 mb-10">
            <span className="font-serif text-[72px] sm:text-[90px] font-bold text-transparent text-stroke-green leading-none select-none text-[#018837]/20">
              01
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-bold text-[#000000] leading-tight">
              Medical <br /> Services
            </h2>
          </div>

          {/* 8 Medical Services Grid (2 rows of 4 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {medicalServices.map((srv, idx) => (
              <div
                key={idx}
                className={`p-[30px] rounded-[5px] flex flex-col justify-between transition-all duration-200 ${
                  srv.featured
                    ? 'bg-[#018837] text-white shadow-md'
                    : 'bg-white border border-[#018837]/20 hover:border-[#018837] hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Icon Box */}
                  <div
                    className={`w-[60px] h-[60px] rounded-[5px] flex items-center justify-center mb-6 ${
                      srv.featured ? 'bg-white text-[#018837]' : 'bg-[#018837]/10 text-[#018837]'
                    }`}
                  >
                    <Stethoscope className="w-7 h-7" />
                  </div>
                  <h3
                    className={`text-[17px] font-bold mb-2.5 ${
                      srv.featured ? 'text-white' : 'text-[#018837]'
                    }`}
                  >
                    {srv.title}
                  </h3>
                  <p
                    className={`text-[13px] leading-relaxed ${
                      srv.featured ? 'text-white/90' : 'text-[#444444]'
                    }`}
                  >
                    {srv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: 02 Clinical Departments (Figma Frame 1261155718) */}
      <section className="w-full bg-[#f9fbf9] py-16 md:py-20 px-4 sm:px-8 lg:px-12 border-b border-neutral-100">
        <div className="max-w-[1440px] mx-auto">
          {/* Section Number & Heading */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-[72px] sm:text-[90px] font-bold text-[#018837]/20 leading-none select-none">
              02
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-bold text-[#000000] leading-tight">
              Clinical <br /> Departments
            </h2>
          </div>

          {/* Row 1: Medicine Related (LEFT is green badge, RIGHT is 7 cards) */}
          <div className="bg-white border border-[#018837]/20 rounded-[5px] p-6 sm:p-10 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row items-stretch gap-8">
              {/* LEFT Column: Medicine Related Feature Card */}
              <div className="w-full lg:w-[280px] bg-[#018837] text-white p-8 rounded-[5px] flex flex-col items-center justify-center text-center shrink-0 shadow-md">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#018837] mb-5 shadow-sm">
                  <Activity className="w-10 h-10" />
                </div>
                <h3 className="text-[24px] font-bold tracking-tight">Medicine Related</h3>
                <p className="text-white/80 text-[13px] mt-2">Comprehensive internal medicine specialties</p>
              </div>

              {/* RIGHT Column: 7 Cards Grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: 'Neuromedicine',
                    desc: 'Treatment of brain, spine, and nervous system disorders.',
                    highlight: true,
                  },
                  {
                    name: 'Gastroenterology',
                    desc: 'Care for digestive system and gastrointestinal tract issues.',
                    highlight: false,
                  },
                  {
                    name: 'Cardiology',
                    desc: 'Diagnosis and treatment of heart and circulatory system diseases.',
                    highlight: false,
                  },
                  {
                    name: 'Nephrology',
                    desc: 'Management of kidney diseases and renal disorders.',
                    highlight: false,
                  },
                  {
                    name: 'Radiation Oncology',
                    desc: 'Cancer treatment using high-energy radiation therapy.',
                    highlight: false,
                  },
                  {
                    name: 'Psychiatry',
                    desc: 'Mental health diagnosis and therapeutic treatment.',
                    highlight: false,
                  },
                  {
                    name: 'Dermatology',
                    desc: 'Care for skin, hair, and nail disorders.',
                    highlight: false,
                  },
                ].map((dept, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-[5px] border transition-all ${
                      dept.highlight
                        ? 'bg-[#018837] text-white border-[#018837]'
                        : 'bg-white border-neutral-200 hover:border-[#018837]/50'
                    }`}
                  >
                    <h4
                      className={`font-bold text-[15px] mb-1.5 ${
                        dept.highlight ? 'text-white' : 'text-[#018837]'
                      }`}
                    >
                      {dept.name}
                    </h4>
                    <p
                      className={`text-[12px] leading-relaxed ${
                        dept.highlight ? 'text-white/90' : 'text-[#444444]'
                      }`}
                    >
                      {dept.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Surgical Related (Figma Frame 1261155723: LEFT is cards, RIGHT is Surgical badge) */}
          <div className="bg-white border border-[#018837]/20 rounded-[5px] p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col-reverse lg:flex-row items-stretch gap-8">
              {/* LEFT Column: 5 Cards Grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: 'Otolaryngology (ENT)',
                    desc: 'Surgical and medical treatment of ear, nose, and throat conditions.',
                    highlight: true,
                  },
                  {
                    name: 'Ophthalmology',
                    desc: 'Eye care including surgeries and vision correction.',
                    highlight: false,
                  },
                  {
                    name: 'Neurosurgery',
                    desc: 'Surgical treatment of disorders related to the brain and spinal cord.',
                    highlight: false,
                  },
                  {
                    name: 'Urology',
                    desc: 'Surgical care for urinary tract and male reproductive organs.',
                    highlight: false,
                  },
                  {
                    name: 'Orthopedics',
                    desc: 'Treatment of bone, joint, and musculoskeletal system problems.',
                    highlight: false,
                  },
                ].map((dept, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-[5px] border transition-all ${
                      dept.highlight
                        ? 'bg-[#018837] text-white border-[#018837]'
                        : 'bg-white border-neutral-200 hover:border-[#018837]/50'
                    }`}
                  >
                    <h4
                      className={`font-bold text-[15px] mb-1.5 ${
                        dept.highlight ? 'text-white' : 'text-[#018837]'
                      }`}
                    >
                      {dept.name}
                    </h4>
                    <p
                      className={`text-[12px] leading-relaxed ${
                        dept.highlight ? 'text-white/90' : 'text-[#444444]'
                      }`}
                    >
                      {dept.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* RIGHT Column: Surgical Related Feature Card (Figma exact order!) */}
              <div className="w-full lg:w-[280px] bg-[#018837] text-white p-8 rounded-[5px] flex flex-col items-center justify-center text-center shrink-0 shadow-md">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-5 border-2 border-white/60 shadow-sm">
                  <Image
                    src="/images/facilities/facilites___hospital_service_surgery_1_76a67b.jpg"
                    alt="Surgical Related"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[24px] font-bold tracking-tight">Surgical Related</h3>
                <p className="text-white/80 text-[13px] mt-2">Specialized modern operative disciplines</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Emergency & Specialized Care (Figma Frame 298:2613) */}
      <section className="w-full bg-white py-14 md:py-18 px-4 sm:px-8 lg:px-12 border-b border-neutral-100">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-8">
            Emergency &amp; Specialized Care
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3.5">
              {emergencyServicesCol1.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#018837]/10 p-5 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15 hover:border-[#018837]/40 transition"
                >
                  <span className="text-[#444444] font-medium text-[15px] sm:text-[16px]">{item}</span>
                  <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3.5">
              {emergencyServicesCol2.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#018837]/10 p-5 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15 hover:border-[#018837]/40 transition"
                >
                  <span className="text-[#444444] font-medium text-[15px] sm:text-[16px]">{item}</span>
                  <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Diagnostic & Imaging Services (Figma Frame 298:2900) */}
      <section className="w-full bg-white py-14 md:py-18 px-4 sm:px-8 lg:px-12 border-b border-neutral-100">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-8">
            Diagnostic &amp; Imaging Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3.5">
              {diagnosticCol1.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#018837]/10 p-5 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15 hover:border-[#018837]/40 transition"
                >
                  <span className="text-[#444444] font-medium text-[15px] sm:text-[16px]">{item}</span>
                  <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3.5">
              {diagnosticCol2.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#018837]/10 p-5 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15 hover:border-[#018837]/40 transition"
                >
                  <span className="text-[#444444] font-medium text-[15px] sm:text-[16px]">{item}</span>
                  <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Additional Services (Figma Frame 298:2948) */}
      <section className="w-full bg-white py-14 md:py-18 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-8">
            Additional Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3.5">
              {additionalCol1.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#018837]/10 p-5 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15 hover:border-[#018837]/40 transition"
                >
                  <span className="text-[#444444] font-medium text-[15px] sm:text-[16px]">{item}</span>
                  <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3.5">
              {additionalCol2.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#018837]/10 p-5 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15 hover:border-[#018837]/40 transition"
                >
                  <span className="text-[#444444] font-medium text-[15px] sm:text-[16px]">{item}</span>
                  <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===============================================================================
   TAB 2: DEPARTMENTS (Figma Node 304:2019)
   =============================================================================== */
function DepartmentsTab() {
  const departmentsList = [
    'College and Hospital Administration',
    'Department of Physiology',
    'Department of Microbiology',
    'Dept. of Community Medicine & Hospital Admin',
    'Department of Pathology',
    'Department of Dermatology',
    'Department of Otolaryngology (ENT – Head & Neck)',
    'Department of Orthopedics',
    'Department of Urology',
    'Department of Neurosurgery',
    'Department of Gynaecology & Obstetrics',
    'Department of Anatomy',
    'Department of Respiratory Medicine',
    'Department of Gastroenterology',
    'Department of Nephrology',
    'Department of Medicine',
    'Department of Ophthalmology',
    'Department of Biochemistry',
    'Department of Anesthesiology',
    'Department of Forensic Medicine',
    'Department of Neuro Medicine',
    'Department of Cardiology',
    'Department of Pharmacology',
    'Department of Paediatrics',
    'Department of Surgery',
    'Department of Radiology & Imaging',
    'Department of Psychiatry',
    'Department of Transfusion Medicine',
  ];

  return (
    <div className="w-full bg-white py-14 md:py-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-[34px] sm:text-[44px] font-bold text-[#000000] leading-tight mb-2">
            Departments
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#444444]">
            List of academic and clinical departments with their establishment dates.
          </p>
        </div>

        {/* 4-Column Department Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {departmentsList.map((dept, idx) => (
            <div
              key={idx}
              className="bg-white border border-neutral-200 rounded-[5px] overflow-hidden p-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-[220px] rounded-[5px] overflow-hidden mb-4">
                  <Image
                    src="/images/facilities/facilites___departments_frame_1261155749_5a418e.jpg"
                    alt={dept}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-[15px] font-semibold text-[#444444] mb-1.5 line-clamp-2 min-h-[44px]">
                  {dept}
                </h3>
                <p className="text-[12px] text-[#737477] mb-4">Established: February 19, 2025</p>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="inline-block px-[24px] py-[9px] bg-[#018837] hover:bg-[#01702e] text-white text-[12px] font-medium rounded-[5px] transition-colors shadow-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===============================================================================
   TAB 3: LIBRARY (Figma Node 306:3161)
   =============================================================================== */
function LibraryTab() {
  const { c } = useSiteContent();
  return (
    <div className="w-full">
      {/* Top Section with Light Green BG */}
      <section className="w-full bg-[#e6f4eb] py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Working Hours Badge (Frame 1261155769) */}
          <div className="inline-flex flex-wrap items-center gap-6 sm:gap-10 bg-white/80 border border-[#018837]/20 px-6 py-2.5 rounded-[5px] mb-8">
            <div className="flex items-center gap-2.5 text-[14px] sm:text-[15px] font-semibold text-[#000000]">
              <Clock className="w-4 h-4 text-[#018837]" />
              <span>Open: 8:00 AM – 9:00 PM</span>
            </div>
            <div className="hidden sm:block w-[1px] h-4 bg-black/30" />
            <div className="flex items-center gap-2.5 text-[14px] sm:text-[15px] font-semibold text-[#000000]">
              <Calendar className="w-4 h-4 text-[#018837]" />
              <span>Days: All working days</span>
            </div>
          </div>

          {/* Header Row: Left is icon + heading, Right is intro */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-white rounded-[5px] flex items-center justify-center shadow-sm shrink-0">
                <BookOpen className="w-14 h-14 sm:w-16 sm:h-16 text-[#018837]" />
              </div>
              <h2 className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold text-[#000000] leading-tight tracking-tight">
                About the <br className="hidden sm:inline" />
                Library
              </h2>
            </div>

            <div className="max-w-[680px]">
              <p className="text-[#444444] text-[15px] sm:text-[16px] leading-[1.65]">
                <strong className="text-[#000000] block mb-1">
                  A Modern Hub for Academic Excellence
                </strong>
                {c('facilities.library.description', 'The College Library is a fully air-conditioned, modern facility located on the 12th floor of the academic building, designed to support students and faculty with rich academic resources and a comfortable study environment.')}
              </p>
            </div>
          </div>

          {/* Library Hero Image */}
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[533px] rounded-[5px] overflow-hidden shadow-lg mb-12">
            <Image
              src="/images/facilities/facilites___library_2f49a432_a6a2_458a_9c3e_7b83a7bffcf2_1_47331b.jpg"
              alt="UAMC Central Library"
              fill
              className="object-cover"
            />
          </div>

          {/* Key Library Stats */}
          <div className="max-w-[913px] flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-10">
              <div>
                <div className="text-[28px] sm:text-[34px] font-bold text-[#000000] leading-tight">
                  3,371 + latest editions
                </div>
                <div className="text-[14px] sm:text-[15px] font-medium text-[#444444] mt-1">
                  Books
                </div>
              </div>

              <div className="hidden sm:block w-[1px] h-[60px] bg-black/40" />

              <div>
                <div className="text-[28px] sm:text-[34px] font-bold text-[#000000] leading-tight">
                  1,187 + 367 Foreign journals
                </div>
                <div className="text-[14px] sm:text-[15px] font-medium text-[#444444] mt-1">
                  Journals
                </div>
              </div>
            </div>

            <div className="text-[#444444] text-[14px] sm:text-[15px] font-medium bg-white/70 py-2.5 px-4 rounded-[5px] border border-[#018837]/20">
              <strong className="text-[#000000]">Digital Catalog:</strong> All resources are indexed
              and catalogued in a computerized database for easy access.
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Services Grid */}
      <section className="w-full bg-white py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <h3 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-8">
            Library Facilities &amp; Services
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Reading Space:</strong> Accommodation for 105
                  students and teachers at a time in a quiet, focused environment.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Book Lending:</strong> Textbooks can be borrowed
                  for on-campus or at-home use.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Internet Access:</strong> High-speed internet is
                  available for research and study.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Photocopying:</strong> A photocopy machine is
                  available for quick access to academic materials.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===============================================================================
   TAB 4: MEDICAL EDUCATION UNIT (MEU) (Figma Node 306:3798)
   =============================================================================== */
function MEUTab() {
  const { c } = useSiteContent();
  return (
    <div className="w-full">
      {/* Top Banner & About MEU */}
      <section className="w-full bg-[#e6f4eb] py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-white rounded-[5px] flex items-center justify-center shadow-sm shrink-0">
                <GraduationCap className="w-14 h-14 sm:w-16 sm:h-16 text-[#018837]" />
              </div>
              <h2 className="text-[30px] sm:text-[40px] lg:text-[46px] font-bold text-[#018837] leading-tight tracking-tight">
                Medical Education <br className="hidden sm:inline" />
                Unit (MEU)
              </h2>
            </div>

            <div className="max-w-[680px]">
              <p className="text-[#444444] text-[15px] sm:text-[16px] leading-[1.65]">
                <strong className="text-[#000000] block mb-1">
                  Enhancing Learning Through Technology &amp; Collaboration
                </strong>
                {c('facilities.meu.description', 'The Medical Education Unit (MEU) is a vital academic support center of the college, situated adjacent to the library. It is designed to enhance the quality of medical education by offering digital resources, training facilities, and collaborative opportunities.')}
              </p>
            </div>
          </div>

          {/* MEU Image */}
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[533px] rounded-[5px] overflow-hidden shadow-lg">
            <Image
              src="/images/facilities/facilites___medical_education_unit_2f49a432_a6a2_458a_9c3e_7b83a7bffcf2_1_5581cb.jpg"
              alt="Medical Education Unit at UAMC"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Facilities & Resources */}
      <section className="w-full bg-white py-14 md:py-20 px-4 sm:px-8 lg:px-12 border-b border-neutral-100">
        <div className="max-w-[1440px] mx-auto">
          <h3 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-8">
            Facilities &amp; Resources
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="flex flex-col gap-4">
              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Computer Access:</strong> Multiple modern
                  computers equipped with webcams, digital cameras, and necessary peripherals.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Peripheral Devices:</strong> Printers and scanners
                  available for both students and faculty.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15 h-full">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Connectivity Tools:</strong> Fax, internet, and
                  email services are freely available and extensively used.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Databases */}
          <div className="mb-14">
            <h3 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-6">
              Academic Databases
            </h3>
            <div className="bg-[#018837]/10 p-6 sm:p-7 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
              <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                <strong className="text-[#000000]">Hinari &amp; Medline:</strong> Students and teachers
                enjoy online access to internationally recognized medical databases such as Hinari
                and Medline, supporting evidence-based education and research.
              </p>
              <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Events & Activities */}
          <div>
            <h3 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-6">
              Events &amp; Programs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              {['Clinical Seminars', 'Workshops', 'Symposia'].map((event, i) => (
                <div
                  key={i}
                  className="bg-[#018837]/10 p-5 rounded-[5px] flex items-center justify-between border border-[#018837]/15"
                >
                  <span className="font-semibold text-[#000000] text-[16px]">{event}</span>
                  <div className="w-8 h-8 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[#444444] text-[14px] sm:text-[15px] italic bg-neutral-50 p-4 rounded-[5px] border border-neutral-200">
              These activities are regularly organized under MEU, promoting interdisciplinary
              collaboration and continuous professional development among faculty and students.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===============================================================================
   TAB 5: TRAINING (Figma Node 308:4155)
   =============================================================================== */
function TrainingTab() {
  return (
    <div className="w-full">
      {/* Top Banner & Header */}
      <section className="w-full bg-[#e6f4eb] py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-white rounded-[5px] flex items-center justify-center shadow-sm shrink-0">
                <Award className="w-14 h-14 sm:w-16 sm:h-16 text-[#018837]" />
              </div>
              <h2 className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold text-[#018837] leading-tight tracking-tight">
                Training <br className="hidden sm:inline" />
                Facilities
              </h2>
            </div>

            <div className="max-w-[680px]">
              <p className="text-[#444444] text-[15px] sm:text-[16px] leading-[1.65]">
                <strong className="text-[#000000] block mb-1">
                  Building Future Healthcare Professionals
                </strong>
                Uttara Adhunik Medical College &amp; Hospital (UAMCH) is a proud institution under
                Bangladesh Medical Studies and Research Institute (BMSRI), offering high-standard
                training and learning opportunities for both undergraduate and postgraduate medical
                students.
              </p>
            </div>
          </div>

          {/* Training Hero Image */}
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[533px] rounded-[5px] overflow-hidden shadow-lg">
            <Image
              src="/images/facilities/facilites___training_2f49a432_a6a2_458a_9c3e_7b83a7bffcf2_1_2c6b54.jpg"
              alt="Medical Training Facilities"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Facilities & Services */}
      <section className="w-full bg-white py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-5">
              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-start justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Undergraduate &amp; Postgraduate Programs:</strong>{' '}
                  Structured programs tailored to nurture knowledge, skills, and professional
                  growth across medical disciplines.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-start justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Clinical Training System:</strong> A
                  well-organized system involving: Clinical Meetings; Ward Rounds; Hands-on Classes.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-start justify-between gap-4 border border-[#018837]/15 h-full">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Professional Roles Covered:</strong> Training is
                  provided for: Indoor Medical Officers; Assistant Registrars; Registrars; Registrars
                  in Training Positions.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-[#000000] text-[14px] sm:text-[15px] font-medium bg-[#f9fbf9] p-4 rounded-[5px] border border-neutral-200">
            More detailed scopes and training outlines are available in the Academic Activities
            section.
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===============================================================================
   TAB 6: PUBLICATIONS (Figma Node 308:4709)
   =============================================================================== */
function PublicationsTab() {
  const [subTab, setSubTab] = useState<'journal' | 'tenders'>('journal');

  const journalNotices = [
    {
      day: '12',
      monthYear: 'Mar 25',
      title: 'BCPS e-Logbook: Modernizing the Monitoring of FCPS 1st Phase Training',
      time: '3.40 PM',
    },
    {
      day: '18',
      monthYear: 'Feb 25',
      title: 'Clinical Outcomes of Laparoscopic Cholecystectomy: A 5-Year Retrospective Review at UAMCH',
      time: '11.15 AM',
    },
    {
      day: '04',
      monthYear: 'Jan 25',
      title: 'Antimicrobial Resistance Patterns in Tertiary Care ICUs: Insights and Protocols',
      time: '2.00 PM',
    },
    {
      day: '22',
      monthYear: 'Dec 24',
      title: 'Ethical Dimensions in Undergraduate Medical Research: Guidelines for Trainees',
      time: '4.30 PM',
    },
    {
      day: '10',
      monthYear: 'Nov 24',
      title: 'Cardiovascular Risk Stratification in Diabetic Patients: UAMCH Cohort Study',
      time: '10.00 AM',
    },
  ];

  const tenderNotices = [
    {
      day: '15',
      monthYear: 'Mar 25',
      title: 'Tender Notice: Procurement of High-Resolution Diagnostic Ultrasound System for Radiology',
      time: '2.30 PM',
    },
    {
      day: '28',
      monthYear: 'Feb 25',
      title: 'Invitation for Bids: Annual Maintenance Contract for Multi-Slice CT Scanner and MRI Units',
      time: '1.00 PM',
    },
    {
      day: '14',
      monthYear: 'Jan 25',
      title: 'Tender for Supply and Installation of Automated Hematology Analyzers for Central Lab',
      time: '11.45 AM',
    },
  ];

  const currentList = subTab === 'journal' ? journalNotices : tenderNotices;

  return (
    <div className="w-full bg-white py-14 md:py-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Title */}
        <h2 className="text-[38px] sm:text-[54px] font-bold text-[#018837] mb-8 font-serif">
          Publication
        </h2>

        {/* Sub-tabs: Journal & Tenders (Figma Frame 1261155540: bg-[#e8e8f4]) */}
        <div className="w-full bg-[#e8e8f4] p-2.5 rounded-[5px] flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setSubTab('journal')}
            className={`flex-1 py-3 text-center rounded-[5px] text-[16px] font-semibold transition-all cursor-pointer ${
              subTab === 'journal'
                ? 'bg-white text-[#018837] border-2 border-[#018837] shadow-sm'
                : 'bg-transparent text-[#000000] hover:text-[#018837]'
            }`}
          >
            Journal
          </button>
          <button
            type="button"
            onClick={() => setSubTab('tenders')}
            className={`flex-1 py-3 text-center rounded-[5px] text-[16px] font-semibold transition-all cursor-pointer ${
              subTab === 'tenders'
                ? 'bg-white text-[#018837] border-2 border-[#018837] shadow-sm'
                : 'bg-transparent text-[#000000] hover:text-[#018837]'
            }`}
          >
            Tenders
          </button>
        </div>

        {/* Notice Items List (Figma Frame 1261155549) */}
        <div className="flex flex-col gap-4">
          {currentList.map((item, idx) => (
            <div
              key={idx}
              className="w-full bg-[#e8e8f4] p-5 sm:p-6 rounded-[5px] flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:bg-[#e0e0f0] transition-colors"
            >
              {/* Date Box: Top Day, Bottom Month (Figma Frame 1261155544) */}
              <div className="w-[85px] sm:w-[90px] h-[86px] rounded-[5px] overflow-hidden shrink-0 flex flex-col shadow-sm text-center">
                <div className="h-1/2 bg-[#dcdcf0] flex items-center justify-center text-[#444444] text-[20px] font-bold">
                  {item.day}
                </div>
                <div className="h-1/2 bg-[#018837] flex items-center justify-center text-white text-[13px] font-medium uppercase tracking-wide">
                  {item.monthYear}
                </div>
              </div>

              {/* Title and Time Meta */}
              <div className="flex-1">
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#444444] mb-2 hover:text-[#018837] transition-colors cursor-pointer">
                  &ldquo;{item.title}&rdquo;
                </h3>
                <div className="flex items-center gap-1.5 text-[13px] text-[#737477]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.time}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 self-end sm:self-center">
                <Link
                  href="/notice"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#018837] hover:bg-[#018837] hover:text-white border border-[#018837]/30 rounded-[5px] text-[13px] font-medium transition-colors shadow-sm"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===============================================================================
   TAB 7: SEMINAR (Figma Node 308:5304)
   =============================================================================== */
function SeminarTab() {
  return (
    <div className="w-full">
      {/* Top Banner & Header */}
      <section className="w-full bg-[#e6f4eb] py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-white rounded-[5px] flex items-center justify-center shadow-sm shrink-0">
                <Presentation className="w-14 h-14 sm:w-16 sm:h-16 text-[#018837]" />
              </div>
              <h2 className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold text-[#018837] leading-tight tracking-tight">
                Scientific <br className="hidden sm:inline" />
                Seminars
              </h2>
            </div>

            <div className="max-w-[680px]">
              <p className="text-[#444444] text-[15px] sm:text-[16px] leading-[1.65]">
                <strong className="text-[#000000] block mb-1">
                  Promoting Knowledge Through Shared Clinical Experiences
                </strong>
                At Uttara Adhunik Medical College (UAMC), Scientific Seminars are held every
                Saturday, playing a key role in enhancing academic exchange and clinical insight.
                These sessions are coordinated by the Medical Education Unit (MEU).
              </p>
            </div>
          </div>

          {/* Seminar Hero Image */}
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[533px] rounded-[5px] overflow-hidden shadow-lg">
            <Image
              src="/images/facilities/facilites___seminar_2f49a432_a6a2_458a_9c3e_7b83a7bffcf2_1_24100e.jpg"
              alt="Scientific Seminars at UAMC"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Facilities & Services */}
      <section className="w-full bg-white py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Weekly Academic Presentations */}
          <div className="mb-12">
            <h3 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-6">
              Weekly Academic Presentations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Rotational Participation:</strong> All
                  departments of UAMC actively participate on a rotating basis, ensuring diverse
                  medical insights across specialties.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Case-Based Learning:</strong> Focus on real
                  clinical cases of academic interest to sharpen diagnostic and treatment skills.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Guest Speakers & Collaboration */}
          <div className="mb-12">
            <h3 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-6">
              Guest Speakers &amp; Collaboration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">National &amp; International Experts:</strong>{' '}
                  Distinguished speakers from other medical institutions in Bangladesh and abroad
                  are invited to share their expertise.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Cross-disciplinary Learning:</strong>{' '}
                  Encourages open dialogue and collaboration among specialties, fostering a
                  holistic medical education environment.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Activities */}
          <div>
            <h3 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-6">
              Academic Activities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {['Clinical Seminars', 'Workshops', 'Symposia'].map((act, i) => (
                <div
                  key={i}
                  className="bg-[#018837]/10 p-5 rounded-[5px] flex items-center justify-between border border-[#018837]/15"
                >
                  <span className="font-semibold text-[#000000] text-[16px]">{act}</span>
                  <div className="w-8 h-8 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===============================================================================
   TAB 8: HOSTEL (Figma Node 308:5764)
   =============================================================================== */
function HostelTab() {
  const { c } = useSiteContent();
  return (
    <div className="w-full">
      {/* Top Banner & Header */}
      <section className="w-full bg-[#e6f4eb] py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-5 sm:gap-6 mb-8">
            <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-white rounded-[5px] flex items-center justify-center shadow-sm shrink-0">
              <Home className="w-14 h-14 sm:w-16 sm:h-16 text-[#018837]" />
            </div>
            <div>
              <h2 className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold text-[#000000] leading-tight tracking-tight">
                Hostel Services
              </h2>
              <p className="text-[#444444] text-[15px] sm:text-[16px] mt-2">
                {c('facilities.hostel.description', 'Safe, supportive, and conducive living spaces for UAMC medical students.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Services */}
      <section className="w-full bg-white py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <h3 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-8">
            Accommodation &amp; Living Amenities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-5">
              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-start justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Secure &amp; Comfortable:</strong> Hostel
                  accommodations are available for female students with a limited number of seats.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-start justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Dedicated Environment:</strong> Separate living
                  quarters with quiet study halls, round-the-clock power backup, and disciplined
                  warden supervision.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-start justify-between gap-4 border border-[#018837]/15 h-full">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Essential Amenities:</strong> Basic facilities
                  such as furnished rooms, electricity, water, and security are provided to ensure a
                  safe and supportive environment for learning.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===============================================================================
   TAB 9: LABORATORY (Figma Node 309:2411)
   =============================================================================== */
function LaboratoryTab() {
  const labCol1 = [
    'Hematology',
    'Clinical Chemistry',
    'Urinalysis',
    'Therapeutic Drug Monitoring',
    'Bacteriology',
  ];

  const labCol2 = [
    'Mycology',
    'Parasitology',
    'Diagnostic Serology',
    'Surgical Pathology',
    'Cytopathology',
  ];

  return (
    <div className="w-full">
      {/* Top Banner & Header */}
      <section className="w-full bg-[#e6f4eb] py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Header Row: Left is icon + heading, Right is intro */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-white rounded-[5px] flex items-center justify-center shadow-sm shrink-0">
                <FlaskConical className="w-14 h-14 sm:w-16 sm:h-16 text-[#018837]" />
              </div>
              <h2 className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold text-[#000000] leading-tight tracking-tight">
                Laboratory <br className="hidden sm:inline" />
                Services
              </h2>
            </div>

            <div className="max-w-[680px]">
              <p className="text-[#444444] text-[15px] sm:text-[16px] leading-[1.65]">
                <strong className="text-[#000000] block mb-1">
                  Accuracy. Efficiency. Around-the-Clock Support.
                </strong>
                At Uttara Adhunik Medical College &amp; Hospital (UAMCH), we prioritize precision and
                speed in delivering diagnostic test results, ensuring optimal care for every
                patient.
              </p>
            </div>
          </div>

          {/* Laboratory Hero Image */}
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[457px] rounded-[5px] overflow-hidden shadow-lg">
            <Image
              src="/images/facilities/facilites___laboratory_2f49a432_a6a2_458a_9c3e_7b83a7bffcf2_1_e4feba.jpg"
              alt="Diagnostic Laboratories at UAMC"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Facilities & Services Grid */}
      <section className="w-full bg-white py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <h3 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-8">
            Diagnostic &amp; Pathological Disciplines
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3.5">
              {labCol1.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#018837]/10 p-5 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15 hover:border-[#018837]/40 transition"
                >
                  <span className="text-[#444444] font-medium text-[15px] sm:text-[16px]">{item}</span>
                  <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3.5">
              {labCol2.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#018837]/10 p-5 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15 hover:border-[#018837]/40 transition"
                >
                  <span className="text-[#444444] font-medium text-[15px] sm:text-[16px]">{item}</span>
                  <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===============================================================================
   TAB 10: CAFETERIA (Figma Node 309:2756)
   =============================================================================== */
function CafeteriaTab() {
  return (
    <div className="w-full">
      {/* Top Banner & Header */}
      <section className="w-full bg-[#e6f4eb] py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Header Row: Left is icon + heading, Right is intro */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-white rounded-[5px] flex items-center justify-center shadow-sm shrink-0">
                <Utensils className="w-14 h-14 sm:w-16 sm:h-16 text-[#018837]" />
              </div>
              <h2 className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold text-[#000000] leading-tight tracking-tight">
                Cafeteria <br className="hidden sm:inline" />
                Services
              </h2>
            </div>

            <div className="max-w-[680px]">
              <p className="text-[#444444] text-[15px] sm:text-[16px] leading-[1.65]">
                <strong className="text-[#000000] block mb-1">
                  Nourishing Meals in a Relaxed Setting
                </strong>
                Located on the 3rd floor, the UAMCH cafeteria offers a variety of balanced,
                nutritious, and hygienic meals at subsidized prices for students, staff, and
                visitors.
              </p>
            </div>
          </div>

          {/* Cafeteria Hero Image */}
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[457px] rounded-[5px] overflow-hidden shadow-lg">
            <Image
              src="/images/facilities/facilites___cafeteria_2f49a432_a6a2_458a_9c3e_7b83a7bffcf2_1_e34bb6.jpg"
              alt="UAMCH Campus Cafeteria"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Facilities & Services */}
      <section className="w-full bg-white py-14 md:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <h3 className="text-[26px] sm:text-[34px] font-bold text-[#000000] mb-8">
            Cafeteria Features &amp; Quality Standards
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Healthy Food Options:</strong> Carefully
                  selected menus focused on wellness and nutrition.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Extended Hours:</strong> Services are available
                  until late to accommodate busy academic and clinical schedules.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[#018837]/10 p-6 rounded-[5px] flex items-center justify-between gap-4 border border-[#018837]/15 h-full">
                <p className="text-[#444444] text-[15px] sm:text-[16px] leading-relaxed">
                  <strong className="text-[#000000]">Hygiene &amp; Quality:</strong> Cleanliness and
                  food safety are strictly maintained under regular quality inspections.
                </p>
                <div className="w-9 h-9 rounded-full bg-white text-[#018837] flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
