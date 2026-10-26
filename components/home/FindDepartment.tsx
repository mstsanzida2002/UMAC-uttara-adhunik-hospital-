"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteContent, useSiteImages } from "@/hooks/useSiteContent";

export default function FindDepartment() {
  const [searchQuery, setSearchQuery] = useState("");
  const { img } = useSiteImages();
  const { c } = useSiteContent({
    "finddept.heading": "Find Your Department",
    "finddept.description":
      "Use the search bar below to explore our comprehensive MBBS program and discover the perfect path to kickstart your medical career. Join UAMC and embark on a journey of academic excellence, hands-on clinical training, and cutting-edge medical research!",
    "finddept.popular_tag1": "Department of Microbiology",
    "finddept.popular_tag2": "Department of Community Medicine",
    "finddept.popular_tag3": "Department of Pathology",
    "finddept.dept_count": "28+",
    "finddept.featured_dept": "Department of Microbiology",
  });

  const popularTags = [
    c("finddept.popular_tag1"),
    c("finddept.popular_tag2"),
    c("finddept.popular_tag3"),
  ].filter(Boolean);

  return (
    <section className="py-20 lg:py-28 bg-[#FBFBFE] relative overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Content & Interactive Search */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-bitter text-3xl sm:text-4xl lg:text-5xl font-bold text-[#018837] tracking-tight leading-tight">
              {c("finddept.heading")}
            </h2>

            <p className="mt-5 text-[#737477] text-base sm:text-lg leading-relaxed">
              {c("finddept.description")}
            </p>

            {/* Search Input Bar */}
            <div className="mt-8 relative">
              <div className="flex items-center bg-[#E8E8F4]/80 rounded-2xl p-2 sm:p-2.5 border border-[#E8E8F4] focus-within:border-[#018837] focus-within:bg-white transition-all shadow-sm">
                <div className="pl-3 pr-2 text-[#737477]">
                  <svg className="w-5 h-5 text-[#018837]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Find your program like "Department of Phycology"'
                  className="w-full bg-transparent text-sm sm:text-base text-neutral-800 placeholder-[#9191A6] focus:outline-none px-2 py-2"
                />
                <Link
                  href={`/departments?search=${encodeURIComponent(searchQuery)}`}
                  className="px-5 py-2.5 rounded-xl bg-[#018837] text-white font-semibold text-sm hover:bg-[#016f2c] transition flex-shrink-0 shadow-sm"
                >
                  Search
                </Link>
              </div>

              {/* Popular Searches */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#737477]">
                <span className="font-bold text-neutral-800">Popular Search:</span>
                {popularTags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(tag)}
                    className="underline hover:text-[#018837] transition text-left cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Department Card */}
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E8F4] shadow-md flex items-center justify-between gap-4 group hover:border-[#018837]/50 transition">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#e6f4ec]">
                  <Image
                    src={img("metrics-bg", "/images/metrics-bg.jpg")}
                    alt={c("finddept.featured_dept")}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                    sizes="64px"
                  />
                </div>
                <div>
                  <span className="inline-block bg-[#FECD2F] text-neutral-900 font-bold text-[11px] px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1">
                    Popular Program
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#018837] group-hover:text-[#016f2c] transition">
                    {c("finddept.featured_dept")}
                  </h4>
                </div>
              </div>
              <Link
                href="/departments"
                className="w-10 h-10 rounded-full bg-[#018837] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#016f2c] group-hover:scale-105 transition shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Collage with Doctor & Departments Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-[520px] lg:max-w-none">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                  <Image src={img("finddept-student1", "/images/finddept-student1.jpg")} alt="Medical Student Studying at UAMC" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 300px" />
                </div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-2 border-white mt-8">
                  <Image src={img("finddept-student2", "/images/finddept-student2.jpg")} alt="Medical Practical Lab Session" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 300px" />
                </div>
              </div>
              <div className="absolute -bottom-8 -left-4 sm:left-4 bg-[#018837] text-white rounded-2xl p-4 sm:p-5 shadow-2xl flex items-center gap-4 max-w-[320px] border-4 border-white">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-[#FECD2F]">
                  <Image src={img("finddept-doctor", "/images/finddept-doctor.jpg")} alt="Senior Doctor UAMC" fill className="object-cover" sizes="80px" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white leading-none">{c("finddept.dept_count")}</div>
                  <div className="text-xs sm:text-sm font-medium text-white/90 leading-tight mt-1">Department Available For Student</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
