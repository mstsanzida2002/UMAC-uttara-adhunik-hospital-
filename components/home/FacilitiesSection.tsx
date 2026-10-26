"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteContent, useSiteImages } from "@/hooks/useSiteContent";

interface FacilityData {
  id: string;
  nameKey: string;
  titleKey: string;
  subtitleKey: string;
  descKey: string;
  imageKey?: string;
  image: string;
  link: string;
}

const FACILITIES_META: FacilityData[] = [
  { id: "hostel",       nameKey: "facility.hostel.name",       titleKey: "facility.hostel.title",       subtitleKey: "facility.hostel.subtitle",       descKey: "facility.hostel.description",       imageKey: "facility-hostel",   image: "/images/facility-hostel.jpg",     link: "/facilities" },
  { id: "laboratory",  nameKey: "facility.laboratory.name",   titleKey: "facility.laboratory.title",   subtitleKey: "facility.laboratory.subtitle",   descKey: "facility.laboratory.description",   imageKey: "about-1",          image: "/images/about-1.jpg",             link: "/facilities" },
  { id: "hospital",    nameKey: "facility.hospital.name",     titleKey: "facility.hospital.title",     subtitleKey: "facility.hospital.subtitle",     descKey: "facility.hospital.description",     imageKey: "metrics-bg",        image: "/images/metrics-bg.jpg",          link: "/facilities" },
  { id: "cafeteria",   nameKey: "facility.cafeteria.name",    titleKey: "facility.cafeteria.title",    subtitleKey: "facility.cafeteria.subtitle",    descKey: "facility.cafeteria.description",    imageKey: "finddept-student1", image: "/images/finddept-student1.jpg",   link: "/facilities" },
  { id: "training",    nameKey: "facility.training.name",     titleKey: "facility.training.title",     subtitleKey: "facility.training.subtitle",     descKey: "facility.training.description",     imageKey: "about-2",          image: "/images/about-2.jpg",             link: "/facilities" },
  { id: "meu",         nameKey: "facility.meu.name",          titleKey: "facility.meu.title",          subtitleKey: "facility.meu.subtitle",          descKey: "facility.meu.description",          imageKey: "finddept-student2", image: "/images/finddept-student2.jpg",   link: "/facilities" },
  { id: "departments", nameKey: "facility.departments.name",  titleKey: "facility.departments.title",  subtitleKey: "facility.departments.subtitle",  descKey: "facility.departments.description",  imageKey: "finddept-doctor",   image: "/images/finddept-doctor.jpg",     link: "/departments" },
  { id: "publications",nameKey: "facility.publications.name", titleKey: "facility.publications.title", subtitleKey: "facility.publications.subtitle", descKey: "facility.publications.description", imageKey: "metrics-bg",        image: "/images/metrics-bg.jpg",          link: "/notice?tab=publication" },
  { id: "seminar",     nameKey: "facility.seminar.name",      titleKey: "facility.seminar.title",      subtitleKey: "facility.seminar.subtitle",      descKey: "facility.seminar.description",      imageKey: "hero-bg",           image: "/images/hero-bg.jpg",             link: "/facilities" },
];

const FALLBACKS: Record<string, string> = {
  "facility.hostel.name": "Hostel", "facility.hostel.title": "Hostel Facilities", "facility.hostel.subtitle": "Ladies hostel:", "facility.hostel.description": "Hostel accommodations for female students are available with limited number of seats. Safe, secured, and equipped with modern amenities, study rooms, and hygienic dining.",
  "facility.laboratory.name": "Laboratory", "facility.laboratory.title": "Modern Laboratories", "facility.laboratory.subtitle": "Advanced Diagnostic Labs:", "facility.laboratory.description": "Fully equipped pathology, biochemistry, microbiology, and histology laboratories designed for rigorous medical diagnostics and student practical sessions.",
  "facility.hospital.name": "Hospital Service", "facility.hospital.title": "500-Bed Hospital Services", "facility.hospital.subtitle": "Comprehensive Care:", "facility.hospital.description": "24/7 emergency care, specialized ICUs, CCU, modern operation theaters, and outpatient departments catering to thousands of patients daily.",
  "facility.cafeteria.name": "Cafeteria", "facility.cafeteria.title": "Hygienic Campus Cafeteria", "facility.cafeteria.subtitle": "Nutrition & Well-being:", "facility.cafeteria.description": "Serving balanced, fresh, and nutritious meals for doctors, medical students, and staff in a clean and comfortable dining environment.",
  "facility.training.name": "Training", "facility.training.title": "Clinical Skill Training", "facility.training.subtitle": "Postgraduate & Intern Training:", "facility.training.description": "Hands-on internship programs accredited by BMDC and BCPS FCPS training, led by senior professors and clinical supervisors.",
  "facility.meu.name": "Medical Education Unit", "facility.meu.title": "Medical Education Unit (MEU)", "facility.meu.subtitle": "Pedagogical Excellence:", "facility.meu.description": "Dedicated to enhancing teaching methodologies, faculty development workshops, curriculum design, and assessment modernizations.",
  "facility.departments.name": "Departments", "facility.departments.title": "28+ Specialized Departments", "facility.departments.subtitle": "Pre-clinical & Clinical:", "facility.departments.description": "Anatomy, Physiology, Pharmacology, Forensic Medicine, Community Medicine, Surgery, Medicine, Pediatrics, Gynae & Obs, and more.",
  "facility.publications.name": "Publications", "facility.publications.title": "Medical Research Publications", "facility.publications.subtitle": "Peer-Reviewed Research:", "facility.publications.description": "Bi-annual peer-reviewed journal publishing original medical investigations, clinical trials, case reports, and epidemiological research.",
  "facility.seminar.name": "Seminar", "facility.seminar.title": "Auditoriums & Seminar Halls", "facility.seminar.subtitle": "Conferences & Symposia:", "facility.seminar.description": "Centrally air-conditioned audiovisual-equipped seminar halls hosting national and international medical symposiums and clinical meets.",
};

export default function FacilitiesSection() {
  const { c } = useSiteContent(FALLBACKS);
  const { img } = useSiteImages();
  const [selectedId, setSelectedId] = useState("hostel");
  const selected = FACILITIES_META.find(f => f.id === selectedId) || FACILITIES_META[0];
  const imageSrc = selected.imageKey ? img(selected.imageKey, selected.image) : selected.image;

  return (
    <section className="py-20 lg:py-28 bg-[#FAF6F6] relative overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#018837]" />
            <span className="text-[#018837] font-semibold text-sm sm:text-base tracking-wide capitalize">knowledge meets innovation</span>
          </div>
          <h2 className="font-bitter text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">Our Facilities</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Facility Selector */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {FACILITIES_META.map((facility) => {
              const isActive = selectedId === facility.id;
              return (
                <button
                  key={facility.id}
                  onClick={() => setSelectedId(facility.id)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border transition-all text-left ${isActive ? "bg-white border-[#018837] shadow-md shadow-[#018837]/10" : "bg-white border-[#E8E8F4] hover:border-[#018837]/40 hover:bg-white/80"}`}
                >
                  <span className={`text-base sm:text-lg font-bold transition-colors ${isActive ? "text-[#018837]" : "text-black"}`}>
                    {c(facility.nameKey)}
                  </span>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${isActive ? "bg-[#018837] text-white scale-105" : "bg-[#018837]/10 text-[#018837]"}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Preview Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E8E8F4] shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-md">
                <Image src={imageSrc} alt={c(selected.titleKey)} fill className="object-cover" sizes="(max-width: 768px) 100vw, 380px" />
              </div>
              <div className="flex flex-col justify-between h-full py-2">
                <div>
                  <h3 className="font-bitter text-2xl sm:text-3xl font-bold text-[#018837] leading-tight">{c(selected.titleKey)}</h3>
                  <div className="mt-4">
                    <p className="text-base sm:text-lg font-semibold text-[#4A4A4A]">{c(selected.subtitleKey)}</p>
                    <p className="mt-2 text-sm sm:text-base text-[#4A4A4A] leading-relaxed">{c(selected.descKey)}</p>
                  </div>
                  <div className="mt-4">
                    <Link href={selected.link} className="inline-flex items-center gap-1.5 text-[#0094D3] font-semibold text-xs sm:text-sm hover:underline">
                      <span>View Details</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-[#E8E8F4]">
                  <Link href="/facilities" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#018837] text-white font-semibold text-base shadow-lg shadow-[#018837]/20 hover:bg-[#016f2c] transition group">
                    <span>View Our Program</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
