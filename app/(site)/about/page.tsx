"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSiteContent, useSiteImages } from "@/hooks/useSiteContent";

interface TabItem {
  id: string;
  name: string;
}

const ABOUT_TABS: TabItem[] = [
  { id: "overview", name: "Overview" },
  { id: "history", name: "History of UAMC" },
  { id: "vision", name: "Vision & Mission" },
  { id: "aim", name: "Aim & Objective" },
  { id: "structure", name: "Organizational Structure" },
  { id: "founders", name: "Founder Member" },
  { id: "ec", name: "EC Members" },
  { id: "gb", name: "GB Members" },
];

function AboutPageContent() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { img } = useSiteImages();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const hashParam = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const targetTab = tabParam || hashParam;

    if (targetTab && ABOUT_TABS.some((t) => t.id === targetTab)) {
      setActiveTab(targetTab);
    } else if (!targetTab) {
      setActiveTab("overview");
    }

  }, [searchParams]);

  const currentTabObj = ABOUT_TABS.find((t) => t.id === activeTab) || ABOUT_TABS[0];

  return (
    <div className="bg-white min-h-screen">
      {/* =========================================================================
          1. BANNER SECTION (Node 62:1969)
          - Height: 500px, Background: about-banner.jpg
          - Title: "About UAMC" (70px font-normal)
          - Breadcrumb: HOME > ABOUT UAMC >> {Active Tab Name}
          - Right Seal: Asset 1@4x 1 (uamc-logo-round.png)
      ========================================================================= */}
      <section className="relative w-full h-[380px] sm:h-[440px] lg:h-[500px] overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src={img("about-banner", "/images/about-banner.jpg")}
            alt="About UAMC Campus Banner"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        </div>

        <div className="relative z-10 max-w-[1450px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="max-w-2xl">
            {/* Breadcrumbs */}
            <div className="text-white/80 text-xs sm:text-sm lg:text-[18px] font-medium font-sans uppercase tracking-wider mb-3">
              <span>HOME</span>
              <span className="mx-2 text-[#FECD2F]">&gt;</span>
              <span>ABOUT UAMC</span>
              <span className="mx-2 text-[#FECD2F]">&gt;&gt;</span>
              <span className="text-white font-semibold">{currentTabObj.name}</span>
            </div>

            {/* Page Header */}
            <h1 className="text-4xl sm:text-5xl lg:text-[70px] font-normal text-white font-sans leading-none tracking-tight">
              About UAMC
            </h1>
          </div>

          {/* Decorative Seal / Watermark Emblem */}
          <div className="hidden md:flex relative w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0 opacity-80">
            <Image
              src={img("logo", "/images/uamc-logo-round.png")}
              alt="UAMC Seal Watermark"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SECONDARY SUB-NAVIGATION TABS (Node 66:1455 / Component 54)
          - Dynamic Tabbed Interface: Click tab to swap content
          - Active: Brand Green (#018837)
          - Inactive: Neutral Gray (#737477)
          - No anchor links, no href="#...", no scrolling logic
      ========================================================================= */}
      <section className="bg-[#FAFBFB] border-b border-neutral-200 py-6 sm:py-8 sticky top-20 z-30 shadow-sm">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
            {ABOUT_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    router.push(tab.id === "overview" ? "/about" : `/about?tab=${tab.id}`);
                  }}
                  className={`px-4 sm:px-5 py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 flex-shrink-0 font-sans cursor-pointer ${
                    isActive
                      ? "bg-[#018837] text-white shadow-md shadow-[#018837]/20"
                      : "bg-[#737477] text-white hover:bg-[#018837]"
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. DYNAMIC TAB CONTENT AREA
          - Render ONLY the section belonging to activeTab
      ========================================================================= */}
      <main>
        {activeTab === "overview" && <OverviewContent />}
        {activeTab === "history" && <HistoryContent />}
        {activeTab === "vision" && <VisionContent />}
        {activeTab === "aim" && <AimContent />}
        {activeTab === "structure" && <StructureContent />}
        {activeTab === "founders" && <FoundersContent />}
        {activeTab === "ec" && <ECMembersContent />}
        {activeTab === "gb" && <GBMembersContent />}
      </main>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AboutPageContent />
    </Suspense>
  );
}

// Small sub-components so client hooks work inside the large client page
function OverviewParagraphs() {
  const { c } = useSiteContent({
    "about.paragraph1": "Uttara Adhunik Medical College (UAMC) is a prestigious medical institution located in Uttara Model Town, Dhaka, Bangladesh. Established in 2003.",
    "about.paragraph2": "UAMC offers a Bachelor of Medicine and Bachelor of Surgery (MBBS) program, designed to equip students with the knowledge, skills, and hands-on clinical training needed to excel in the medical profession.",
  });
  return (
    <div className="mt-6">
      <p className="text-[#737477] text-base sm:text-lg leading-relaxed font-sans">{c("about.paragraph1")}</p>
      <p className="mt-4 text-[#737477] text-base sm:text-lg leading-relaxed font-sans">{c("about.paragraph2")}</p>
    </div>
  );
}

function VisitUamcContent() {
  const { c } = useSiteContent({
    "about.visit_description": "Use the search bar below to explore our comprehensive MBBS program and discover the perfect path to kickstart your medical career. Join UAMC and embark on a journey of academic excellence, hands-on clinical training, and cutting-edge medical research!",
    "about.campus_address": "House - 34, Road - 4, Sector - 9, Sonargaon Janapath, Uttara Model Town, Dhaka-1230, Bangladesh",
    "about.visiting_hours": "Visiting Hours: 8:00 AM - 8:00 PM",
  });
  return (
    <>
      <p className="mt-5 text-[#737477] text-base sm:text-lg leading-relaxed font-sans">{c("about.visit_description")}</p>
      <div className="mt-8 p-6 rounded-2xl bg-white border border-[#E8E8F4] shadow-md space-y-4 font-sans">
        <div className="flex items-start gap-3 text-neutral-800">
          <div className="w-9 h-9 rounded-full bg-[#018837]/10 flex items-center justify-center text-[#018837] flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-base text-neutral-900">Campus &amp; Hospital Location</h4>
            <p className="text-sm text-[#737477] mt-1">{c("about.campus_address")}</p>
          </div>
        </div>
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#018837]">{c("about.visiting_hours")}</span>
          <Link href="/contact" className="text-xs font-bold text-neutral-900 underline hover:text-[#018837]">Get Directions &rarr;</Link>
        </div>
      </div>
    </>
  );
}

{/* =========================================================================
    TAB 1: OVERVIEW CONTENT (Node 62:933)
========================================================================= */}
function OverviewContent() {
  const { img } = useSiteImages();
  const { c } = useSiteContent();

  return (
    <>
      {/* 1. About UAMC Core Section */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Compound Dual-Photo Layout with Central Seal */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-[540px] lg:max-w-none">
                <div className="relative w-[85%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src={img("about-1", "/images/about-1.jpg")}
                    alt="UAMC Medical Laboratory"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 85vw, 450px"
                  />
                </div>

                <div className="absolute -bottom-8 -right-2 sm:right-4 w-[62%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src={img("about-2", "/images/about-2.jpg")}
                    alt="UAMC Doctors in Clinical Discussion"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 320px"
                  />
                </div>

                {/* Central Floating Round Seal Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-2 shadow-2xl border-4 border-[#018837] flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={img("logo", "/images/uamc-logo-round.png")}
                      alt="UAMC Seal"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Overview */}
            <div className="lg:col-span-6 flex flex-col justify-center pt-8 lg:pt-0">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#018837]" />
                <span className="text-[#018837] font-semibold text-sm sm:text-base tracking-wide capitalize font-sans">
                  knowledge meets innovation
                </span>
              </div>

              <h2 className="font-bitter text-3xl sm:text-4xl lg:text-5xl font-bold text-[#262626] leading-tight tracking-tight">
                About UAMC
              </h2>

              <OverviewParagraphs />

              {/* Mission & Vision Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#018837]/20 bg-[#e6f4ec]/30">
                  <div className="w-12 h-12 rounded-lg bg-[#018837] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#018837] text-base leading-tight font-sans">
                      College Mission
                    </h4>
                    <p className="text-xs text-[#737477] font-medium mt-0.5 font-sans">
                      Statement
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#018837]/20 bg-[#e6f4ec]/30">
                  <div className="w-12 h-12 rounded-lg bg-[#018837] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#018837] text-base leading-tight font-sans">
                      College Vision
                    </h4>
                    <p className="text-xs text-[#737477] font-medium mt-0.5 font-sans">
                      Achievement
                    </p>
                  </div>
                </div>
              </div>

              {/* View Our Program CTA */}
              <div className="mt-8">
                <Link
                  href="/facilities?tab=departments"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#018837] text-white font-semibold text-base shadow-lg shadow-[#018837]/20 hover:bg-[#016f2c] transition-all group font-sans"
                >
                  <span>View Our Program</span>
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. Visit UAMC Section (Node 69:2669)
          - STRICT LAYOUT: Text & Call info on LEFT side, Images + 28+ badge on RIGHT side
      ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#FBFBFE] relative overflow-hidden">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT SIDE: Text and Call / Location info */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h2 className="font-bitter text-3xl sm:text-4xl lg:text-5xl font-bold text-[#018837] tracking-tight leading-tight">
                Visit UAMC
              </h2>
              <VisitUamcContent />
            </div>

            {/* RIGHT SIDE: Hospital Images and 28+ Department Green Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-[520px] lg:max-w-none">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                    <Image
                      src="/images/finddept-student1.jpg"
                      alt="UAMC Medical Student"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-2 border-white mt-8">
                    <Image
                      src="/images/finddept-student2.jpg"
                      alt="UAMC Campus Life"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Floating 28+ badge */}
                <div className="absolute -bottom-6 -left-4 sm:left-4 bg-[#018837] text-white rounded-2xl p-4 sm:p-5 shadow-2xl flex items-center gap-4 max-w-[320px] border-4 border-white">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-[#FECD2F]">
                    <Image
                      src="/images/finddept-doctor.jpg"
                      alt="UAMC Doctor"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white leading-none font-bitter">
                      28+
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-white/90 leading-tight mt-1 font-sans">
                      Department Available For Student
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Key Metrics Counter Banner */}
      <KeyMetricsBanner />

      {/* =========================================================================
          4. Admission & Aid Section (Node 69:2719)
          - STRICT LAYOUT: Image Grid MUST be on the LEFT side.
          - Text and the 3 buttons ('Process Overview', etc.) MUST be on the RIGHT side.
      ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT SIDE: Image Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/about-1.jpg"
                  alt="Medical Student in Lab"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/about-2.jpg"
                    alt="Clinical Discussion"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/facility-hostel.jpg"
                    alt="Campus Facilities"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Text and the 3 action buttons */}
            <div className="lg:col-span-6">
              <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#018837] tracking-tight leading-tight">
                Admission &amp; Aid
              </h2>
              <p className="mt-4 text-[#737477] text-base sm:text-lg leading-relaxed font-sans">
                {c("about.admission_aid_desc", "At UAMC, we prepare you to launch your career by providing a supportive, creative, and professional environment from which to learn practical skills. Founded by visionary social leaders and medical practitioners.")}
              </p>

              {/* 3 Navigational Action Cards */}
              <div className="mt-8 space-y-3 font-sans">
                {[
                  { title: "Process Overview", href: "/admissions" },
                  { title: "Fees & Financial Information", href: "/admissions#fees" },
                  { title: "How To Apply", href: "/admissions#apply" },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="flex items-center justify-between p-4 sm:p-5 rounded-xl border border-[#E8E8F4] bg-white hover:border-[#018837] hover:bg-[#e6f4ec]/30 transition group shadow-sm"
                  >
                    <span className="text-lg sm:text-[21px] font-medium text-neutral-800 group-hover:text-[#018837] transition">
                      {item.title}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#018837]/10 flex items-center justify-center text-[#018837] group-hover:bg-[#018837] group-hover:text-white transition">
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. Sustainability at UAMC (Node 69:2817)
          - STRICT LAYOUT: Text and green checklist MUST be on the LEFT side.
          - Images (female student with blue background shape) MUST be on the RIGHT side.
      ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#FBFBFE] border-t border-neutral-100">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT SIDE: Text and green checklist */}
            <div className="lg:col-span-7">
              <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#018837] tracking-tight leading-tight">
                Sustainability at UAMC
              </h2>

              <p className="mt-4 text-[#737477] text-base sm:text-lg leading-relaxed font-sans">
                {c("about.sustainability_intro", "Uttara Adhunik Medical College (UAMC) is committed to sustainability by integrating innovative solutions in healthcare and education while minimizing its environmental impact.")}
              </p>

              <div className="mt-8 space-y-6 font-sans">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#018837] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                      Eco-Friendly Campus
                    </h4>
                    <p className="mt-1 text-sm sm:text-base text-[#737477] leading-relaxed">
                      UAMC integrates energy-efficient infrastructure and waste management to promote a greener learning environment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#018837] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                      Sustainable Healthcare Practices
                    </h4>
                    <p className="mt-1 text-sm sm:text-base text-[#737477] leading-relaxed">
                      The institution adopts responsible resource management to reduce environmental impact in medical education and patient care.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#018837] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                      Innovation &amp; Collaboration
                    </h4>
                    <p className="mt-1 text-sm sm:text-base text-[#737477] leading-relaxed">
                      UAMC explores partnerships and modern solutions to enhance long-term sustainability in healthcare and education.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Dual Sustainability Images */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src={img("sustainability-1", "/images/sustainability-1.jpg")}
                  alt="Green Campus Infrastructure"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white mt-8">
                <Image
                  src={img("sustainability-2", "/images/sustainability-2.jpg")}
                  alt="Responsible Medical Research"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. Message from the Principal (Figma Node 308:4650)
          - STRICT LAYOUT: Text, signature image, and 'Honorable...' on LEFT side.
          - Signature image placed directly above 'Honorable' as in Figma Node 308:4664.
          - Large portrait photo of Principal (695x573) on RIGHT side.
      ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#e6f4ec]/40 border-y border-[#018837]/15">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#018837]" />
              <span className="text-[#018837] font-medium text-base sm:text-[19.5px] tracking-wide font-sans">
                knowledge meets innovation
              </span>
            </div>
            <h2 className="font-bitter text-4xl sm:text-5xl lg:text-[60px] font-bold text-black tracking-tight leading-tight">
              Message from the Principal
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT SIDE: Signature above Honorable, Details & CTA */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full font-sans">
              <div>
                {/* Principal Official Signature Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img("principal-signature", "/images/principal-signature.png")}
                  alt="Principal Signature"
                  className="h-auto w-[180px] mb-4 object-contain"
                />

                <h4 className="font-bitter text-xl sm:text-2xl font-bold text-black leading-snug">
                  Honorable
                </h4>
                <h3 className="font-bitter text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#018837] mt-1 leading-tight">
                  {c("about.principal_name", "Prof. Dr. Mohammad Mohibur Rahman")}
                </h3>
                <span className="text-base sm:text-lg font-medium text-[#444444] block mt-1">
                  {c("about.principal_title", "Principal (In Charge)")}
                </span>

                <div className="mt-6 pt-6 border-t border-[#018837]/20">
                  <h4 className="text-lg sm:text-xl font-bold text-[#444444] leading-snug font-sans">
                    {c("about.principal_heading", "Ensuring Quality Healthcare & Medical Education")}
                  </h4>
                  <p className="mt-4 text-base sm:text-[15px] text-[#444444] leading-relaxed font-sans">
                    {c("about.principal_message_para1", "Bangladesh faces significant challenges in delivering healthcare nationwide. To support government efforts, Uttara Adhunik Medical College Hospital (UAMCH) has been providing comprehensive health services since 2003, evolving into a tertiary-level multidisciplinary hospital.")}
                  </p>
                  <p className="mt-4 text-base sm:text-[15px] text-[#444444] leading-relaxed font-sans">
                    {c("about.principal_message_para2", "We remain dedicated to nurturing knowledgeable, ethical, and empathetic physicians who will lead clinical practice and biomedical research worldwide.")}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#018837] text-white font-medium text-base shadow-lg shadow-[#018837]/20 hover:bg-[#016f2c] transition group cursor-pointer"
                >
                  <span>Read More</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

            </div>

            {/* RIGHT SIDE: Large Portrait Photo of Principal */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[695/573] max-w-[695px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={img("principal-photo", "/images/principal-photo.jpg")}
                  alt={c("about.principal_name", "Prof. Dr. Mohammad Mohibur Rahman")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 695px"
                  priority
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Admission Banner */}
      <AdmissionHeroBanner />

      {/* =========================================================================
          8. My Students Feedback / Testimonials (Node 62:1655)
          - EXACT FIGMA: Large Brand Green Quote icons (“”) placed inside cards
      ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#262626] tracking-tight">
              My Students Feedback
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#737477] font-sans">
              You’ll find something to spark your curiosity and enhance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emma Elizabeth",
                role: "Assistant Teacher",
                img: "/images/author-1.webp",
                quote: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
              },
              {
                name: "Zent Ekizie",
                role: "Assistant Teacher",
                img: "/images/author-2.webp",
                quote: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
              },
              {
                name: "Samantha Willow",
                role: "Teacher",
                img: "/images/author-1.webp",
                quote: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border border-[#E8E8F4] bg-white shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between font-sans relative overflow-hidden group"
              >
                <div>
                  {/* 5 Gold Stars */}
                  <div className="flex items-center gap-1 text-[#FECD2F] mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-[#4A4A4A] text-base leading-relaxed italic">
                    &ldquo;{card.quote}&rdquo;
                  </p>
                </div>

                {/* Bottom Row: Author details on left, Large Brand Green Quote icon (“”) on right (Component 1) */}
                <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-neutral-100">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-neutral-200">
                      <Image
                        src={card.img}
                        alt={card.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bitter text-base font-bold text-neutral-900 leading-tight">
                        {card.name}
                      </h4>
                      <span className="text-xs text-[#737477] font-medium block mt-0.5">
                        {card.role}
                      </span>
                    </div>
                  </div>

                  {/* Large Green Quote Icon (Node 62:1671 Component 1 in Figma: #018837, 71x56px) */}
                  <div className="flex-shrink-0 text-[#018837] opacity-85 group-hover:opacity-100 transition-opacity">
                    <svg className="w-12 h-10 fill-current" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

{/* =========================================================================
    TAB 2: HISTORY CONTENT (Node 69:1604)
========================================================================= */}
function HistoryContent() {
  const { img } = useSiteImages();
  const { c } = useSiteContent();

  const TIMELINE_EVENTS = [
    { year: "1984", title: "The Vision Begins", desc: c("about.timeline.1984.desc", "The initiative to pioneer high standard private healthcare and medical education in Bangladesh was conceived by visionary physicians.") },
    { year: "1986", title: "The First Private Medical College", desc: c("about.timeline.1986.desc", "Establishment of pioneering medical institutions under BMSRI, creating a precedent for excellence in the country.") },
    { year: "2003", title: "Foundation of Uttara Adhunik Hospital", desc: c("about.timeline.2003.desc", "Uttara Adhunik Medical College Hospital commenced operations in Uttara Model Town, catering to healthcare needs in Northern Dhaka.") },
    { year: "2005", title: "Expansion of Indoor Services", desc: c("about.timeline.2005.desc", "Rapid expansion into advanced clinical inpatient care, critical care facilities, and multidisciplinary diagnostic services.") },
    { year: "2007", title: "Birth of Uttara Adhunik Medical College (UAMC)", desc: c("about.timeline.2007.desc", "Formal academic establishment of UAMC under BMSRI, affiliated with the University of Dhaka and recognized by BMDC.") },
    { year: "2008", title: "UAMC’s Academic Journey Begins", desc: c("about.timeline.2008.desc", "First MBBS batch admitted, marking the start of a storied journey in medical undergraduate training and clinical education.") },
    { year: "Present", title: "Advancing Healthcare & Education", desc: c("about.timeline.present.desc", "A prestigious 500-bed tertiary hospital providing world-class patient care and educating hundreds of compassionate physicians annually.") },
    { year: "Future", title: "Continuous Global Innovation", desc: c("about.timeline.future.desc", "Expanding biomedical research, postgraduate fellowships, digital healthcare integration, and international medical collaborations.") },
  ];

  return (
    <>
      <section className="py-20 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Compound Dual-Photo Layout */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-[540px] lg:max-w-none">
                <div className="relative w-[85%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src={img("about-1", "/images/about-1.jpg")}
                    alt="UAMC Campus History"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 85vw, 450px"
                  />
                </div>

                <div className="absolute -bottom-8 -right-2 sm:right-4 w-[62%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src={img("about-2", "/images/about-2.jpg")}
                    alt="UAMC Medical Heritage"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 320px"
                  />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-2 shadow-2xl border-4 border-[#018837] flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={img("logo", "/images/uamc-logo-round.png")}
                      alt="UAMC Seal"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: History Overview */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#018837]" />
                <span className="text-[#018837] font-semibold text-sm sm:text-base tracking-wide capitalize font-sans">
                  knowledge meets innovation
                </span>
              </div>

              <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#262626] leading-tight tracking-tight">
                History of Uttara Adhunik Medical College (UAMC)
              </h2>

              <h3 className="text-lg sm:text-xl font-semibold text-[#018837] mt-3 font-sans">
                A Journey of Excellence in Medical Education &amp; Healthcare
              </h3>

              <p className="mt-5 text-[#737477] text-base sm:text-lg leading-relaxed font-sans">
                {c("about.history_para1", "Uttara Adhunik Medical College (UAMC) has a rich history of dedication, innovation, and excellence in medical education and healthcare services. Rooted in the vision of advancing private medical education in Bangladesh, UAMC has grown into a leading institution in a short span of time.")}
              </p>

              <p className="mt-4 text-[#737477] text-base sm:text-lg leading-relaxed font-sans">
                {c("about.history_para2", "Founded under Bangladesh Medical Studies and Research Institute (BMSRI), the college is proudly affiliated with the University of Dhaka and recognized by the Bangladesh Medical and Dental Council (BMDC), nurturing ethical healthcare leaders.")}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <KeyMetricsBanner />

      {/* Timeline Section */}
      <section className="py-20 lg:py-24 bg-[#FAFBFB]">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-bitter text-3xl sm:text-4xl lg:text-5xl font-bold text-[#262626] tracking-tight">
              Timeline of UAMC’s Evolution Since - 1984
            </h2>
            <p className="mt-4 text-[#737477] text-base sm:text-lg leading-relaxed font-sans">
              {c("about.history_timeline_desc", "Founded in 2007, UAMC, under BMSRI, is a leading medical institution affiliated with Dhaka University. With a 500-bed hospital, it excels in medical education, research, and patient care, shaping the future of healthcare in Bangladesh.")}
            </p>
          </div>

          {/* Timeline Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E8E8F4] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="w-12 h-1 bg-[#018837] mb-4 group-hover:w-full transition-all duration-300" />
                <span className="text-2xl sm:text-3xl font-extrabold text-[#018837] font-bitter block">
                  {event.year}
                </span>
                <h4 className="text-lg font-bold text-neutral-900 mt-2 font-bitter">
                  {event.title}
                </h4>
                <p className="text-sm text-[#737477] mt-2 leading-relaxed font-sans">
                  {event.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Admission Banner */}
      <AdmissionHeroBanner />
    </>
  );
}

{/* =========================================================================
    TAB 3: VISION & MISSION CONTENT (Node 84:1656)
========================================================================= */}
function VisionContent() {
  const { c } = useSiteContent();
  return (
    <>
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#018837]" />
              <span className="text-[#018837] font-semibold text-sm sm:text-base tracking-wide capitalize font-sans">
                knowledge meets innovation
              </span>
            </div>
            <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[50px] font-bold text-[#262626] tracking-tight">
              Vision &amp; Mission of UAMC
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Vision Box */}
            <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#018837] to-[#016f2c] text-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-[#FECD2F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-bitter text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Vision of UAMC
                </h3>
                <p className="mt-6 text-white/95 text-base sm:text-lg lg:text-xl leading-relaxed font-sans">
                  {c("about.vision_para", "To be a leading center of excellence in medical education, healthcare, and research, producing skilled, compassionate, and ethical medical professionals who contribute to national and global healthcare advancements.")}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#FECD2F]">
                Institutional Vision Statement
              </div>
            </div>

            {/* Mission Box */}
            <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-[#FAFBFB] border-2 border-[#018837]/20 text-neutral-900 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#018837]/10 flex items-center justify-center text-[#018837] mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bitter text-2xl sm:text-3xl lg:text-4xl font-bold text-[#018837] leading-tight">
                  Mission of UAMC
                </h3>
                <p className="mt-6 text-[#737477] text-base sm:text-lg lg:text-xl leading-relaxed font-sans">
                  {c("about.mission_para", "To provide comprehensive, state-of-the-art medical education and hands-on clinical training, instilling empathy, ethical values, and clinical mastery in physicians dedicated to serving humanity with excellence.")}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#018837]">
                Core Strategic Mission
              </div>
            </div>
          </div>

          {/* 4 Supporting Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                title: "Excellence in Training",
                desc: "Delivering a comprehensive MBBS curriculum aligned with DU and BMDC guidelines.",
              },
              {
                title: "Compassionate Care",
                desc: "Blending scientific excellence with human empathy in high-volume tertiary clinical care.",
              },
              {
                title: "Biomedical Research",
                desc: "Fostering evidence-based medical research and clinical innovations for modern challenges.",
              },
              {
                title: "Global Standards",
                desc: "Equipping graduates to excel in international medical licensing examinations and clinical careers.",
              },
            ].map((pillar, i) => (
              <div key={i} className="p-6 rounded-2xl border border-[#E8E8F4] bg-white shadow-sm">
                <span className="w-8 h-8 rounded-full bg-[#018837] text-white flex items-center justify-center text-sm font-bold font-sans mb-3">
                  0{i + 1}
                </span>
                <h4 className="font-bitter font-bold text-lg text-neutral-900">{pillar.title}</h4>
                <p className="text-sm text-[#737477] mt-2 font-sans leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Admission Banner */}
      <AdmissionHeroBanner />
    </>
  );
}

{/* =========================================================================
    TAB 4: AIM & OBJECTIVE CONTENT (Node 72:1116)
========================================================================= */}
function AimContent() {
  const { c } = useSiteContent();
  const OBJECTIVES = [
    {
      title: "Academic Excellence",
      desc: c("about.objective1.desc", "Deliver a comprehensive MBBS curriculum aligned with Bangladesh Medical & Dental Council (BMDC) and Dhaka University (DU) guidelines. Equip students with a deep understanding of medical sciences, human anatomy, disease mechanisms, and healthcare practices."),
    },
    {
      title: "Clinical & Professional Skills Development",
      desc: c("about.objective2.desc", "Train students in patient history-taking, clinical examinations, and emergency management. Ensure proficiency in diagnostic procedures, laboratory investigations, and therapeutic decision-making. Promote effective communication skills for patient care and interprofessional collaboration."),
    },
    {
      title: "Ethical & Holistic Medical Practice",
      desc: c("about.objective3.desc", "Instill a strong sense of medical ethics, integrity, and responsibility towards patient welfare. Encourage a humanitarian approach in medical practice by blending scientific knowledge with empathy."),
    },
    {
      title: "Research & Continuous Learning",
      desc: c("about.objective4.desc", "Foster critical thinking, research skills, and evidence-based medical practice. Cultivate a lifelong learning mindset to adapt to evolving medical advancements and healthcare needs."),
    },
    {
      title: "Community Health & Global Standards",
      desc: c("about.objective5.desc", "Enhance healthcare accessibility by training graduates to serve diverse populations, particularly in underserved regions. Align education and healthcare practices with international standards to prepare graduates for global medical opportunities."),
    },
  ];

  return (
    <>
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-[#FAFBFB] border border-[#018837]/20 shadow-md mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#018837]" />
              <span className="text-[#018837] font-semibold text-sm sm:text-base tracking-wide uppercase font-sans">
                Foundational Purpose
              </span>
            </div>
            <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#018837] tracking-tight">
              Aim
            </h2>
            <p className="mt-5 text-[#4A4A4A] text-base sm:text-lg lg:text-xl leading-relaxed font-sans">
              {c("about.aim_para", "Uttara Adhunik Medical College (UAMC) is committed to producing competent, compassionate, and dedicated healthcare professionals equipped with the knowledge and skills to serve the community, particularly in rural areas. The institution strives to provide a solid foundation for future training, service, and research at both national and international levels while fostering continuous professional development.")}
            </p>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#262626] tracking-tight">
              Objective
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#737477] font-sans">
              Strategic pillars guiding our academic curricula and clinical governance
            </p>
          </div>

          <div className="space-y-6">
            {OBJECTIVES.map((obj, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl border border-[#E8E8F4] bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-start gap-5 sm:gap-6"
              >
                <div className="w-12 h-12 rounded-xl bg-[#018837] text-white flex items-center justify-center text-lg font-bold flex-shrink-0 font-bitter">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="font-bitter text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
                    {obj.title}
                  </h3>
                  <p className="mt-2 text-base text-[#737477] leading-relaxed font-sans whitespace-pre-line">
                    {obj.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-[#e6f4ec]/40 border border-[#018837]/20 text-center font-sans">
            <p className="text-base sm:text-lg font-semibold text-[#018837]">
              {c("about.objective_summary", "With a structured five-year MBBS program followed by a one-year internship, UAMC ensures that graduates are well-prepared to contribute meaningfully to the medical field and society.")}
            </p>
          </div>

        </div>
      </section>

      <AdmissionHeroBanner />
    </>
  );
}

{/* =========================================================================
    TAB 5: ORGANIZATIONAL STRUCTURE CONTENT (Node 127:1284)
========================================================================= */}
function StructureContent() {
  const STRUCTURE_TIERS = [
    {
      level: "Level 1: Apex Governance",
      role: "Board of Trustees & Executive Committee (BMSRI)",
      desc: "Formulates overall institutional policy, approves major capital investments, and ensures compliance with national healthcare regulations.",
      bg: "bg-[#018837] text-white",
    },
    {
      level: "Level 2: Institutional Authority",
      role: "Governing Body (GB) - UAMC",
      desc: "Chaired by prominent medical educationists with representatives from the University of Dhaka, BMDC, and government authorities.",
      bg: "bg-[#FAFBFB] text-neutral-900 border-2 border-[#018837]",
    },
    {
      level: "Level 3: Executive Academic & Clinical Leadership",
      role: "Principal & Director of UAMC Hospital",
      desc: "Supervises academic curricula, faculty development, clinical training, residency programs, and hospital healthcare administration.",
      bg: "bg-[#FAFBFB] text-neutral-900 border border-neutral-200",
    },
    {
      level: "Level 4: Academic & Clinical Operations",
      role: "Heads of Departments (HoDs) & Medical Superintendents",
      desc: "28+ Specialized Pre-clinical, Para-clinical, and Clinical Departments managing daily student lectures, labs, and inpatient care.",
      bg: "bg-white text-neutral-900 border border-neutral-200",
    },
  ];

  return (
    <>
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#018837]" />
              <span className="text-[#018837] font-semibold text-sm sm:text-base tracking-wide capitalize font-sans">
                knowledge meets innovation
              </span>
            </div>
            <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#262626] tracking-tight">
              Organizational Structure
            </h2>
            <p className="mt-4 text-[#737477] text-base sm:text-lg leading-relaxed font-sans">
              The administrative hierarchy of Uttara Adhunik Medical College ensures smooth academic operation, clinical excellence, and robust institutional governance.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {STRUCTURE_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-2xl shadow-sm transition-all duration-200 ${tier.bg}`}
              >
                <span className="text-xs uppercase tracking-wider font-bold block mb-1 opacity-80 font-sans">
                  {tier.level}
                </span>
                <h3 className="font-bitter text-xl sm:text-2xl font-bold leading-tight">
                  {tier.role}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed opacity-90 font-sans">
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <AdmissionHeroBanner />
    </>
  );
}

{/* =========================================================================
    TAB 6: FOUNDER MEMBERS CONTENT (Node 127:1568)
========================================================================= */}
function FoundersContent() {
  const { c } = useSiteContent();
  const FOUNDERS = [
    {
      name: "Late Prof. Mohammad Yousuf Ali",
      role: "Ex-Chairman, EC, BMSRI",
      desc: c("about.founder.1.desc", "Late Prof. Mohammad Yousuf Ali was a visionary leader and the Ex-Chairman of the Executive Committee, BMSRI, whose dedication laid the foundation for quality medical education in Bangladesh. His relentless efforts in establishing Bangladesh Medical College and UAMC have transformed the landscape of private medical education."),
    },
    {
      name: "Late Prof. Abu Ahmed",
      role: "Ex-Co-Chairman, EC, BMSRI",
      desc: c("about.founder.2.desc", "Late Prof. Abu Ahmed, Ex-Co-Chairman of the Executive Committee, BMSRI, was a visionary leader dedicated to enhancing medical education in Bangladesh. His contributions were instrumental in the growth of Bangladesh Medical College and UAMC, fostering excellence in healthcare and medical research."),
    },
    {
      name: "Late Mr. M.M. Zaman",
      role: "Ex-Co-Chairman, EC, BMSRI",
      desc: c("about.founder.3.desc", "A prominent philanthropist and organizer whose strategic vision helped secure the infrastructure and organizational strength necessary to pioneer the institution."),
    },
    {
      name: "Late Prof. M.I. Chowdhury",
      role: "Ex-Member, EC, BMSRI",
      desc: c("about.founder.4.desc", "Late Prof. M.I. Chowdhury, Ex-Member of the Executive Committee, BMSRI, was a distinguished academic and a passionate advocate for medical education. His dedication and contributions helped shape the foundation of Bangladesh Medical College and UAMC."),
    },
    {
      name: "Late Prof. C. H. Kabir",
      role: "Ex-Hony. Secretary, EC, BMSRI",
      desc: c("about.founder.5.desc", "Served with exemplary dedication to build robust academic curricula, international accreditations, and high ethical standards across all BMSRI medical faculties."),
    },
    {
      name: "Late Mr. Sirajul Islam",
      role: "Ex-Managing Director (SIT)",
      desc: c("about.founder.6.desc", "Late Mr. Sirajul Islam, Ex-Managing Director of SIT, was a remarkable leader whose dedication and vision played a crucial role in shaping the future of Uttara Adhunik Medical College. His leadership and commitment to excellence continue to inspire the institution’s progress."),
    },
    {
      name: "Late Mr. Abdul Barik",
      role: "Ex-Managing Director (CSL)",
      desc: c("about.founder.7.desc", "Played an essential role in the establishment and development of modern healthcare facilities and community outreach programs at UAMC."),
    },
  ];

  return (
    <>
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#018837]" />
              <span className="text-[#018837] font-semibold text-sm sm:text-base tracking-wide capitalize font-sans">
                knowledge meets innovation
              </span>
            </div>
            <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#262626] tracking-tight">
              Founder Members
            </h2>
            <p className="mt-4 text-[#737477] text-base sm:text-lg leading-relaxed font-sans">
              We honor the visionary pioneers whose relentless dedication and philanthropic foresight laid the foundation for private medical education and healthcare excellence under BMSRI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FOUNDERS.map((founder, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8E8F4] p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between font-sans"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#018837]/10 flex items-center justify-center text-[#018837] mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bitter text-xl font-bold text-[#262626] leading-tight">
                    {founder.name}
                  </h3>
                  <span className="text-sm font-semibold text-[#018837] block mt-1">
                    {founder.role}
                  </span>
                  <p className="mt-4 text-sm text-[#737477] leading-relaxed">
                    {founder.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <AdmissionHeroBanner />
    </>
  );
}

{/* =========================================================================
    TAB 7: EC MEMBERS CONTENT (Node 136:2003)
========================================================================= */}
function ECMembersContent() {
  const { c } = useSiteContent();
  const EC_MEMBERS = [
    {
      name: "Engr. Kh. Mesbahuddin Ahmed",
      role: "Co-Chairman, EC, BMSRI",
      desc: c("about.ec.1.desc", "Engr. Kh. Mesbahuddin Ahmed, Co-Chairman, EC, BMSRI, is a visionary leader committed to advancing medical education and healthcare services. His dedication and strategic guidance have significantly contributed to the growth of Uttara Adhunik Medical College & Hospital. Under his leadership, the institution continues to uphold excellence in medical training and patient care."),
    },
    {
      name: "Maj. Gen. Md. Rafiqul Islam (Retd.)",
      role: "Honorary Secretary, EC, BMSRI",
      desc: c("about.ec.2.desc", "Maj. Gen. Md. Rafiqul Islam (Retd.), Honorary Secretary, EC, BMSRI, is a distinguished leader dedicated to enhancing medical education and healthcare services. His strategic vision and disciplined approach have played a crucial role in the development of Uttara Adhunik Medical College & Hospital. Through his leadership, the institution continues to thrive as a center of excellence in medical education and patient care."),
    },
    {
      name: "Engr. G.M. Jainal Abedin Bhuiya",
      role: "Honorary Treasurer, EC, BMSRI",
      desc: c("about.ec.3.desc", "Engr. G.M. Jainal Abedin Bhuiya, Honorary Treasurer, EC, BMSRI, is a committed leader ensuring financial stability and growth for Uttara Adhunik Medical College & Hospital. His expertise in financial management has significantly contributed to the institution’s development and sustainability. Under his guidance, the college continues to expand its educational and healthcare services efficiently."),
    },
  ];

  return (
    <>
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#018837]" />
              <span className="text-[#018837] font-semibold text-sm sm:text-base tracking-wide capitalize font-sans">
                knowledge meets innovation
              </span>
            </div>
            <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#262626] tracking-tight">
              Executive Committee (EC) Members
            </h2>
            <p className="mt-4 text-[#737477] text-base sm:text-lg leading-relaxed font-sans">
              The Executive Committee of BMSRI provides dynamic leadership, fiscal governance, and administrative oversight to UAMC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EC_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8E8F4] p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between font-sans"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#018837]/10 flex items-center justify-center text-[#018837] mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bitter text-xl font-bold text-[#262626] leading-tight">
                    {member.name}
                  </h3>
                  <span className="text-sm font-semibold text-[#018837] block mt-1">
                    {member.role}
                  </span>
                  <p className="mt-4 text-sm text-[#737477] leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <AdmissionHeroBanner />
    </>
  );
}

{/* =========================================================================
    TAB 8: GB MEMBERS CONTENT (Node 138:2339)
========================================================================= */}
function GBMembersContent() {
  const { c } = useSiteContent();
  return (
    <>
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#018837]" />
              <span className="text-[#018837] font-semibold text-sm sm:text-base tracking-wide capitalize font-sans">
                knowledge meets innovation
              </span>
            </div>
            <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#262626] tracking-tight">
              Governing Body (GB) Members
            </h2>
            <p className="mt-4 text-[#737477] text-base sm:text-lg leading-relaxed font-sans">
              The Governing Body of Uttara Adhunik Medical College is responsible for institutional strategy, academic integrity, and clinical standards.
            </p>
          </div>

          {/* Chairman Spotlight Card */}
          <div className="max-w-4xl mx-auto bg-[#FAFBFB] rounded-3xl border-2 border-[#018837]/20 p-8 sm:p-12 shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#018837]/10 flex items-center justify-center text-[#018837] flex-shrink-0 border-4 border-[#018837]/20">
                <svg className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#018837] font-sans">
                  Chairman, Governing Body
                </span>
                <h3 className="font-bitter text-2xl sm:text-3xl font-bold text-[#262626] mt-1">
                  Professor Dr. Farhad Haleem
                </h3>
                <span className="text-sm sm:text-base font-semibold text-[#737477] block mt-1 font-sans">
                  Chairman, Governing Body, UAMC
                </span>
                <p className="mt-4 text-[#4A4A4A] text-base sm:text-lg leading-relaxed font-sans">
                  {c("about.gb.chairman.desc", "Professor Dr. Farhad Haleem, Chairman, Governing Body, UAMC, is a visionary leader dedicated to advancing medical education and healthcare excellence. Under his guidance, Uttara Adhunik Medical College continues to uphold high academic standards and innovative healthcare practices. His leadership ensures the institution's commitment to producing skilled medical professionals for the future.")}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <AdmissionHeroBanner />
    </>
  );
}

{/* =========================================================================
    SHARED SUB-COMPONENTS (Metrics Counter & Admission Hero Banner)
========================================================================= */}
function KeyMetricsBanner() {
  const { img } = useSiteImages();
  const { c } = useSiteContent();

  return (
    <section className="relative w-full bg-[#018837] overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <Image
          src={img("metrics-bg", "/images/metrics-bg.jpg")}
          alt="UAMC Research Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-center">
          
          <div className="text-center md:px-8">
            <div className="font-bitter text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              {c("metrics.stat1.value", "90%")}
            </div>
            <p className="mt-2 text-base sm:text-lg font-bold text-[#FECD2F] uppercase tracking-wide font-bitter">
              {c("metrics.stat1.label", "Post-Graduation Success Rate")}
            </p>
          </div>

          <div className="text-center md:px-8 md:border-x md:border-white/20">
            <div className="font-bitter text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              {c("metrics.stat2.value", "Top 10")}
            </div>
            <p className="mt-2 text-base sm:text-lg font-bold text-[#FECD2F] uppercase tracking-wide font-bitter">
              {c("metrics.stat2.label", "Colleges That Create Futures")}
            </p>
          </div>

          <div className="text-center md:px-8">
            <div className="font-bitter text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              {c("metrics.stat3.value", "No. 1")}
            </div>
            <p className="mt-2 text-base sm:text-lg font-bold text-[#FECD2F] uppercase tracking-wide font-bitter">
              {c("metrics.stat3.label", "In The Nation For Materials R&D")}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

function AdmissionHeroBanner() {
  const { img } = useSiteImages();
  const { c } = useSiteContent();

  return (
    <section className="relative w-full py-20 sm:py-28 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src={img("admission-bg", "/images/admission-bg.jpg")}
          alt="UAMC Medical College Campus"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/60" />
      </div>

      <div className="relative z-10 max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-bitter text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            UAMC Admission
          </h2>

          <p className="mt-6 text-white/90 text-base sm:text-lg leading-relaxed font-sans">
            {c(
              "admission.banner_desc",
              "Uttara Adhunik Medical College (UAMC) was established in 2003 with a vision to provide quality medical education and healthcare services. Founded through the dedicated efforts of medical professionals and social leaders, UAMC is committed to training future doctors while ensuring affordable healthcare for the community."
            )}
          </p>

          <div className="mt-8">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#018837] text-white font-semibold text-base sm:text-lg shadow-xl hover:bg-[#016f2c] transition-all group font-sans"
            >
              <span>Learn More</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
