"use client";

import { useState } from "react";
import Link from "next/link";

interface NoticeItem {
  id: string;
  day: string;
  month: string;
  title: string;
  time: string;
  category: "general" | "admission" | "reports" | "job";
}

interface PublicationItem {
  id: string;
  day: string;
  month: string;
  title: string;
  time: string;
  category: "journal" | "tenders";
}

const NOTICES_DATA: NoticeItem[] = [
  {
    id: "1",
    day: "12",
    month: "Mar 25",
    title: "BCPS e-Logbook: Modernizing the Monitoring of FCPS 1st Phase Training",
    time: "3.40 PM",
    category: "general",
  },
  {
    id: "2",
    day: "10",
    month: "Mar 25",
    title: "MBBS 1st Professional Examination May 2026 Routine Published",
    time: "11.15 AM",
    category: "admission",
  },
  {
    id: "3",
    day: "04",
    month: "Mar 25",
    title: "Clinical Clerkship & Ward Placement Schedule for 4th Year MBBS",
    time: "1.20 PM",
    category: "general",
  },
  {
    id: "4",
    day: "28",
    month: "Feb 25",
    title: "Annual Quality Assurance Cell (IQAC) Evaluation Report 2025-2026",
    time: "4.00 PM",
    category: "reports",
  },
  {
    id: "5",
    day: "22",
    month: "Feb 25",
    title: "Recruitment Notice: Assistant Professor & Medical Officer Openings",
    time: "10.30 AM",
    category: "job",
  },
  {
    id: "6",
    day: "15",
    month: "Feb 25",
    title: "Distribution of Admit Cards for Final Professional MBBS Exam",
    time: "2.45 PM",
    category: "general",
  },
];

const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    id: "p1",
    day: "12",
    month: "Mar 25",
    title: "BCPS e-Logbook: Modernizing the Monitoring of FCPS 1st Phase Training",
    time: "3.40 PM",
    category: "journal",
  },
  {
    id: "p2",
    day: "08",
    month: "Mar 25",
    title: "Uttara Adhunik Medical Journal Vol. 14 Issue 1 (Peer-Reviewed)",
    time: "12.30 PM",
    category: "journal",
  },
  {
    id: "p3",
    day: "01",
    month: "Mar 25",
    title: "Tender Notice: Supply of Advanced Hematology & Bio-Chemistry Analyzers",
    time: "4.15 PM",
    category: "tenders",
  },
  {
    id: "p4",
    day: "25",
    month: "Feb 25",
    title: "Research Paper: Prevalence of Antimicrobial Resistance in ICU Patients",
    time: "2.10 PM",
    category: "journal",
  },
  {
    id: "p5",
    day: "18",
    month: "Feb 25",
    title: "Tender Invitation for Procurement of Hospital Ward Furniture & ICU Beds",
    time: "11.00 AM",
    category: "tenders",
  },
  {
    id: "p6",
    day: "10",
    month: "Feb 25",
    title: "Clinical Study on Early Intervention in Neonatal Sepsis Outcomes",
    time: "3.20 PM",
    category: "journal",
  },
];

export default function NoticeBoard() {
  const [activeNoticeTab, setActiveNoticeTab] = useState<string>("all");
  const [activePubTab, setActivePubTab] = useState<string>("all");

  const filteredNotices = activeNoticeTab === "all"
    ? NOTICES_DATA
    : NOTICES_DATA.filter((n) => n.category === activeNoticeTab);

  const filteredPublications = activePubTab === "all"
    ? PUBLICATIONS_DATA
    : PUBLICATIONS_DATA.filter((p) => p.category === activePubTab);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Column 1: Notice Board */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E8F4]">
              <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#018837] tracking-tight">
                Notice Board
              </h2>
              <Link
                href="/notice"
                className="inline-flex items-center gap-1.5 text-[#018837] font-semibold text-sm sm:text-base hover:text-[#016f2c] transition group"
              >
                <span>View All</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 mt-5 bg-[#E8E8F4]/60 rounded-xl">
              {[
                { id: "all", label: "All Notices" },
                { id: "general", label: "General Notice" },
                { id: "admission", label: "Admission Notice" },
                { id: "reports", label: "Reports" },
                { id: "job", label: "Job Circular" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveNoticeTab(tab.id)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    activeNoticeTab === tab.id
                      ? "bg-white text-[#018837] shadow-sm"
                      : "text-neutral-700 hover:text-neutral-900 hover:bg-white/40"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="mt-6 flex flex-col gap-3 max-h-[560px] overflow-y-auto pr-1">
              {filteredNotices.map((notice) => (
                <Link
                  key={notice.id}
                  href={`/notice/${notice.id}`}
                  className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl border border-[#E8E8F4] bg-white hover:border-[#018837]/40 hover:shadow-md transition group"
                >
                  {/* Date badge */}
                  <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] rounded-lg overflow-hidden border border-[#E8E8F4] flex-shrink-0">
                    <div className="w-full bg-[#E8E8F4]/60 py-1 text-center">
                      <span className="text-xl sm:text-2xl font-bold text-[#444444] leading-none">
                        {notice.day}
                      </span>
                    </div>
                    <div className="w-full bg-[#018837] py-1 text-center">
                      <span className="text-xs sm:text-[13px] font-semibold text-white tracking-wide">
                        {notice.month}
                      </span>
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-[#333333] group-hover:text-[#018837] transition leading-snug line-clamp-2">
                      &ldquo;{notice.title}&rdquo;
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-[#737477]">
                      <svg className="w-3.5 h-3.5 text-[#018837]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                      </svg>
                      <span className="font-semibold">{notice.time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Publication */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E8F4]">
              <h2 className="font-bitter text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#018837] tracking-tight">
                Publication
              </h2>
              <Link
                href="/notice?tab=publication"
                className="inline-flex items-center gap-1.5 text-[#018837] font-semibold text-sm sm:text-base hover:text-[#016f2c] transition group"
              >
                <span>View All</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 mt-5 bg-[#E8E8F4]/60 rounded-xl">
              {[
                { id: "all", label: "All Publications" },
                { id: "journal", label: "Journal" },
                { id: "tenders", label: "Tenders" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePubTab(tab.id)}
                  className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    activePubTab === tab.id
                      ? "bg-white text-[#018837] shadow-sm"
                      : "text-neutral-700 hover:text-neutral-900 hover:bg-white/40"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="mt-6 flex flex-col gap-3 max-h-[560px] overflow-y-auto pr-1">
              {filteredPublications.map((pub) => (
                <Link
                  key={pub.id}
                  href={`/notice/${pub.id}`}
                  className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl border border-[#E8E8F4] bg-white hover:border-[#018837]/40 hover:shadow-md transition group"
                >
                  {/* Date badge */}
                  <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] rounded-lg overflow-hidden border border-[#E8E8F4] flex-shrink-0">
                    <div className="w-full bg-[#E8E8F4]/60 py-1 text-center">
                      <span className="text-xl sm:text-2xl font-bold text-[#444444] leading-none">
                        {pub.day}
                      </span>
                    </div>
                    <div className="w-full bg-[#018837] py-1 text-center">
                      <span className="text-xs sm:text-[13px] font-semibold text-white tracking-wide">
                        {pub.month}
                      </span>
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-[#333333] group-hover:text-[#018837] transition leading-snug line-clamp-2">
                      &ldquo;{pub.title}&rdquo;
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-[#737477]">
                      <svg className="w-3.5 h-3.5 text-[#018837]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                      </svg>
                      <span className="font-semibold">{pub.time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
