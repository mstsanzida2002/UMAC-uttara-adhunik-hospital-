'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Clock,
  Calendar,
  MapPin,
  User,
  Search,
  Download,
} from 'lucide-react'

// Tab definitions for Notice Board
const NOTICE_TABS = [
  { id: 'general', label: 'General Notice' },
  { id: 'admission', label: 'Admission Notice' },
  { id: 'reports', label: 'Reports' },
  { id: 'job', label: 'Job Circular' },
]

// Tab definitions for Publication
const PUBLICATION_TABS = [
  { id: 'journal', label: 'Journal' },
  { id: 'tenders', label: 'Tenders' },
]

// 1. News Cards Data (6 cards across 3 rows, matching Figma Node 346:3536)
const NEWS_CARDS = [
  {
    id: 1,
    tag: 'Education',
    tagColor: '#FECD2F',
    title: 'Those inequalities are inequalities',
    snippet: '10 Effective Study Tips for College Success Welcome...',
    author: 'admin',
    date: 'August 6, 2024',
    img: '/assets/notice/9b4f4dc2bc7f0c8577fe54a60b30f9989f88759c.png',
  },
  {
    id: 2,
    tag: 'University',
    tagColor: '#FECD2F',
    title: 'After Decades Of Improvement,',
    snippet: '10 Effective Study Tips for College Success Welcome...',
    author: 'admin',
    date: 'July 4, 2024',
    img: '/assets/notice/c0550106b0a7e4a2a0da946c8e480631917c5787.png',
  },
  {
    id: 3,
    tag: 'Education',
    tagColor: '#FECD2F',
    title: 'Those inequalities are inequalities',
    snippet: '10 Effective Study Tips for College Success Welcome...',
    author: 'admin',
    date: 'August 6, 2024',
    img: '/assets/notice/9b4f4dc2bc7f0c8577fe54a60b30f9989f88759c.png',
  },
  {
    id: 4,
    tag: 'University',
    tagColor: '#FECD2F',
    title: 'After Decades Of Improvement,',
    snippet: '10 Effective Study Tips for College Success Welcome...',
    author: 'admin',
    date: 'July 4, 2024',
    img: '/assets/notice/c0550106b0a7e4a2a0da946c8e480631917c5787.png',
  },
  {
    id: 5,
    tag: 'Education',
    tagColor: '#FECD2F',
    title: 'Those inequalities are inequalities',
    snippet: '10 Effective Study Tips for College Success Welcome...',
    author: 'admin',
    date: 'August 6, 2024',
    img: '/assets/notice/9b4f4dc2bc7f0c8577fe54a60b30f9989f88759c.png',
  },
  {
    id: 6,
    tag: 'University',
    tagColor: '#FECD2F',
    title: 'After Decades Of Improvement,',
    snippet: '10 Effective Study Tips for College Success Welcome...',
    author: 'admin',
    date: 'July 4, 2024',
    img: '/assets/notice/c0550106b0a7e4a2a0da946c8e480631917c5787.png',
  },
]

// 2. Notice Board Items (10 cards in 2 columns, matching Figma Frame 346:3244)
const NOTICE_BOARD_ITEMS = [
  { id: 1, day: '12', month: 'Mar 25', category: 'general', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 2, day: '12', month: 'Mar 25', category: 'general', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 3, day: '12', month: 'Mar 25', category: 'general', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 4, day: '12', month: 'Mar 25', category: 'general', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 5, day: '12', month: 'Mar 25', category: 'general', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 6, day: '12', month: 'Mar 25', category: 'general', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 7, day: '12', month: 'Mar 25', category: 'general', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 8, day: '12', month: 'Mar 25', category: 'general', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 9, day: '12', month: 'Mar 25', category: 'general', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 10, day: '12', month: 'Mar 25', category: 'general', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
]

// 3. Publication Items (10 cards in 2 columns, matching Figma Frame 346:3338)
const PUBLICATION_ITEMS = [
  { id: 101, day: '12', month: 'Mar 25', category: 'journal', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 102, day: '12', month: 'Mar 25', category: 'journal', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 103, day: '12', month: 'Mar 25', category: 'journal', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 104, day: '12', month: 'Mar 25', category: 'journal', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 105, day: '12', month: 'Mar 25', category: 'journal', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 106, day: '12', month: 'Mar 25', category: 'journal', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 107, day: '12', month: 'Mar 25', category: 'journal', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 108, day: '12', month: 'Mar 25', category: 'journal', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 109, day: '12', month: 'Mar 25', category: 'journal', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
  { id: 110, day: '12', month: 'Mar 25', category: 'journal', title: '"BCPS e-Logbook: Modernizing the Monitoring of FCPS 1stPhase Training"', time: '3.40 PM' },
]

// 4. Alumni Events Data (matching Figma Node 346:3464)
const ALUMNI_EVENTS = [
  {
    num: '01',
    title: 'Bridging Cultures: Global Perspectives in',
    date: 'August 20, 2024',
    time: '4:27 am',
    location: 'Yarra Park, UK',
  },
  {
    num: '02',
    title: 'Literary Voices: Celebrating Diverse Narratives',
    date: 'August 20, 2024',
    time: '4:27 am',
    location: 'Yarra Park, UK',
  },
  {
    num: '03',
    title: 'Cultural Exchange: Building Global Connections',
    date: 'August 20, 2024',
    time: '4:27 am',
    location: 'Yarra Park, UK',
  },
]

// 5. Event Gallery Data (12 cards in 4 rows of 3 columns, matching Figma Frame 346:3677)
const GALLERY_ITEMS = [
  { id: 1, title: 'বঙ্গবন্ধুর স্বদেশ প্রত্যাবর্তন...', img: '/assets/notice/fa9555be58d6b507b370ad21d949a82fe519856a.png' },
  { id: 2, title: 'স্বাধীনতা দিবস & সুবর্ণজয়ন্তী', img: '/assets/notice/5c524402ab64b518f91e567cc902c6da7e1c5ac4.png' },
  { id: 3, title: 'স্বাধীনতা দিবস & সুবর্ণজয়ন্তী', img: '/assets/notice/5c524402ab64b518f91e567cc902c6da7e1c5ac4.png' },
  { id: 4, title: 'বঙ্গবন্ধুর স্বদেশ প্রত্যাবর্তন...', img: '/assets/notice/fa9555be58d6b507b370ad21d949a82fe519856a.png' },
  { id: 5, title: 'স্বাধীনতা দিবস & সুবর্ণজয়ন্তী', img: '/assets/notice/5c524402ab64b518f91e567cc902c6da7e1c5ac4.png' },
  { id: 6, title: 'স্বাধীনতা দিবস & সুবর্ণজয়ন্তী', img: '/assets/notice/5c524402ab64b518f91e567cc902c6da7e1c5ac4.png' },
  { id: 7, title: 'বঙ্গবন্ধুর স্বদেশ প্রত্যাবর্তন...', img: '/assets/notice/fa9555be58d6b507b370ad21d949a82fe519856a.png' },
  { id: 8, title: 'স্বাধীনতা দিবস & সুবর্ণজয়ন্তী', img: '/assets/notice/5c524402ab64b518f91e567cc902c6da7e1c5ac4.png' },
  { id: 9, title: 'স্বাধীনতা দিবস & সুবর্ণজয়ন্তী', img: '/assets/notice/5c524402ab64b518f91e567cc902c6da7e1c5ac4.png' },
  { id: 10, title: 'বঙ্গবন্ধুর স্বদেশ প্রত্যাবর্তন...', img: '/assets/notice/fa9555be58d6b507b370ad21d949a82fe519856a.png' },
  { id: 11, title: 'স্বাধীনতা দিবস & সুবর্ণজয়ন্তী', img: '/assets/notice/5c524402ab64b518f91e567cc902c6da7e1c5ac4.png' },
  { id: 12, title: 'স্বাধীনতা দিবস & সুবর্ণজয়ন্তী', img: '/assets/notice/5c524402ab64b518f91e567cc902c6da7e1c5ac4.png' },
]

function NoticeInner() {
  const searchParams = useSearchParams()
  const [activeNoticeTab, setActiveNoticeTab] = useState<string>('general')
  const [activePubTab, setActivePubTab] = useState<string>('journal')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Sync category from URL param e.g. ?tab=admission, ?tab=job, etc.
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam) {
      const lower = tabParam.toLowerCase()
      if (['general', 'admission', 'reports', 'job'].includes(lower)) {
        setActiveNoticeTab(lower)
      } else if (['journal', 'tenders', 'publication'].includes(lower)) {
        setActivePubTab(lower === 'publication' ? 'journal' : lower)
      }
    }
  }, [searchParams])

  // Filter notices based on active tab and search query
  const filteredNotices = NOTICE_BOARD_ITEMS.filter((item) => {
    const matchesCategory = activeNoticeTab === 'general' || item.category === activeNoticeTab || true
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans antialiased text-[#444444]">
      {/* =========================================================================
          1. HERO BANNER: Matching Figma Node 346:2924 (1600x500 ratio)
          ========================================================================= */}
      <section className="relative w-full bg-[#eaf5ed] py-10 md:py-14 px-4 sm:px-8 lg:px-20 flex items-center justify-center min-h-[380px] lg:min-h-[440px]">
        {/* Medical Doodle Vector Strip Background (Exact Figma Cropped 1600x350 asset) */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/assets/hero-doodle-bg.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Centered Mint Box Container: Figma Node 346:2925 (height: 250px, bg-[#A2CDB0], blur(7.5px), padding: 20px 50px) */}
        <div className="relative z-10 w-full max-w-[1440px] min-h-[250px] bg-[#A2CDB0]/40 md:bg-[rgba(1,136,55,0.2)] backdrop-blur-[7.5px] rounded-2xl md:rounded-3xl px-8 md:px-14 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-[#018837]/20">
          <div className="flex flex-col justify-center space-y-4 max-w-2xl">
            {/* Breadcrumb: HOME > Notice & Media (Notice & Media in #018837) */}
            <nav aria-label="Breadcrumb">
              <p className="text-base md:text-xl font-medium tracking-wide">
                <Link href="/" className="text-black hover:text-[#018837] transition font-sans">
                  HOME
                </Link>
                <span className="text-black mx-2">&gt;</span>
                <span className="text-[#018837] font-semibold font-sans">
                  Notice &amp; Media
                </span>
              </p>
            </nav>

            {/* Headline: Notice UAMC ("Notice" in light serif weight 300 #262626, "UAMC" in bold serif weight 700 #018837) */}
            <h1 className="text-5xl md:text-6xl lg:text-[70px] font-serif tracking-tight leading-tight">
              <span className="font-light text-[#262626] font-serif" style={{ fontWeight: 300 }}>
                Notice{" "}
              </span>
              <span className="font-bold text-[#018837] font-serif" style={{ fontWeight: 700 }}>
                UAMC
              </span>
            </h1>
          </div>

          {/* Right Side: Official circular college seal (ESTD - 2007) with proper right padding inside the mint container */}
          <div className="hidden lg:flex items-center justify-center shrink-0 pr-6 lg:pr-14">
            <div className="relative w-[180px] h-[207px] drop-shadow-md">
              <Image
                src="/assets/college-emblem.png"
                alt="Uttara Adhunik Medical College Crest"
                width={180}
                height={207}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SECTION 1: "Read Our Latest News" (Figma Node 346:3536)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
        {/* Section Header */}
        <div className="flex flex-col space-y-2 mb-12">
          <h2 className="text-3xl md:text-[42.9px] font-serif font-bold text-[#018837]">
            Read Our Latest News
          </h2>
          <p className="text-sm md:text-base text-[#444444]">
            You&apos;ll find something to spark your curiosity and enhance
          </p>
        </div>

        {/* 2-Column Grid of 6 News Cards (3 rows of 2 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {NEWS_CARDS.map((card) => (
            <div
              key={card.id}
              className="border border-[#018837] rounded-2xl overflow-hidden p-5 flex flex-col sm:flex-row gap-6 hover:shadow-md transition bg-white"
            >
              {/* Left Image */}
              <div className="relative w-full sm:w-[246px] h-[246px] shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Content Area */}
              <div className="flex flex-col justify-between py-1 flex-1">
                <div className="space-y-3">
                  {/* Yellow Badge */}
                  <span className="inline-block bg-[#FECD2F] text-black text-xs font-semibold px-3 py-1 rounded-sm">
                    {card.tag}
                  </span>
                  {/* Article Headline */}
                  <h3 className="text-lg md:text-[18.3px] font-bold text-[#110C2D] leading-snug">
                    {card.title}
                  </h3>
                  {/* Snippet */}
                  <p className="text-xs md:text-sm text-[#737477] line-clamp-2">
                    {card.snippet}
                  </p>
                </div>

                {/* Author and Date Meta */}
                <div className="flex items-center gap-4 text-xs text-[#737477] pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#018837]" />
                    {card.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#018837]" />
                    {card.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. SECTION 2: "Notice Board" (Figma Node 346:2931)
          ========================================================================= */}
      <section className="bg-white max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-20 border-t border-gray-100">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#018837]">
              Notice Board
            </h2>

            {/* Optional Search filter */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search circulars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-[#018837] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Tab Bar: "General Notice" (Active with green underline/border), "Admission Notice", "Reports", "Job Circular" */}
          <div className="bg-[#E8E8F4] p-2 rounded-xl flex items-center flex-wrap gap-2">
            {NOTICE_TABS.map((tab) => {
              const isActive = activeNoticeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveNoticeTab(tab.id)}
                  className={`px-6 py-3 rounded-lg text-xs md:text-sm font-serif transition font-medium ${
                    isActive
                      ? 'bg-white text-[#018837] border-b-2 border-[#018837] font-bold shadow-xs'
                      : 'text-black hover:text-[#018837]'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* 2-Column Notice Cards: Square date pill ("12", green "Mar 25"), title, clock icon + time "3.40 PM" */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotices.map((item) => (
              <div
                key={item.id}
                className="bg-[#E8E8F4] p-5 rounded-2xl flex items-center gap-4 hover:bg-[#dfe0ee] transition group"
              >
                {/* Square Date Pill */}
                <div className="w-[90px] shrink-0 rounded-xl overflow-hidden border border-gray-300 text-center shadow-xs">
                  <div className="bg-[#E8E8F4] py-1 text-2xl font-extrabold text-[#444444]">
                    {item.day}
                  </div>
                  <div className="bg-[#018837] py-1 text-xs md:text-sm font-bold text-white tracking-wider uppercase">
                    {item.month}
                  </div>
                </div>

                {/* Title and Time */}
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-sm md:text-base font-medium text-[#444444] group-hover:text-black line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-[#737477]">
                    <Clock className="w-3.5 h-3.5 text-[#018837]" />
                    <span>{item.time}</span>
                  </div>
                </div>

                {/* Action button */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    title="Download"
                    className="w-9 h-9 rounded-full bg-white hover:bg-[#018837] text-[#018837] hover:text-white flex items-center justify-center transition shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            4. SECTION 3: "Publication" (Figma Node 346:3097)
            ========================================================================= */}
        <div className="space-y-8 mt-20 pt-16 border-t border-gray-200">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#018837]">
            Publication
          </h2>

          {/* Tab Bar: "Journal" (Active) and "Tenders" */}
          <div className="bg-[#E8E8F4] p-2 rounded-xl flex items-center gap-2 max-w-sm">
            {PUBLICATION_TABS.map((tab) => {
              const isActive = activePubTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePubTab(tab.id)}
                  className={`flex-1 py-3 text-center rounded-lg text-xs md:text-sm font-serif transition font-medium ${
                    isActive
                      ? 'bg-white text-[#018837] border-b-2 border-[#018837] font-bold shadow-xs'
                      : 'text-black hover:text-[#018837]'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* 2-Column Cards matching the same date-pill + title + timestamp structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PUBLICATION_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-[#E8E8F4] p-5 rounded-2xl flex items-center gap-4 hover:bg-[#dfe0ee] transition group"
              >
                {/* Square Date Pill */}
                <div className="w-[90px] shrink-0 rounded-xl overflow-hidden border border-gray-300 text-center shadow-xs">
                  <div className="bg-[#E8E8F4] py-1 text-2xl font-extrabold text-[#444444]">
                    {item.day}
                  </div>
                  <div className="bg-[#018837] py-1 text-xs md:text-sm font-bold text-white tracking-wider uppercase">
                    {item.month}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-sm md:text-base font-medium text-[#444444] group-hover:text-black line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-[#737477]">
                    <Clock className="w-3.5 h-3.5 text-[#018837]" />
                    <span>{item.time}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    title="Download Publication"
                    className="w-9 h-9 rounded-full bg-white hover:bg-[#018837] text-[#018837] hover:text-white flex items-center justify-center transition shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SECTION 4: "Alumni Event" (Light Mint Background Container #E6F3EB)
             (Figma Node 346:3464)
          ========================================================================= */}
      <section className="bg-[#E6F3EB] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-[42.9px] font-serif font-bold text-[#018837]">
              Alumni Event
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Side: Cards with outline numbers ("01", "02", "03"), event title, date, time, location */}
            <div className="lg:col-span-7 space-y-4">
              {ALUMNI_EVENTS.map((event) => (
                <div
                  key={event.num}
                  className="bg-[#F6F6F6] p-6 rounded-2xl flex items-center gap-6 shadow-xs border border-gray-100"
                >
                  <span className="text-6xl md:text-8xl font-serif text-[#018837] font-normal leading-none shrink-0 w-24">
                    {event.num}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-base md:text-lg font-bold text-[#018837] leading-snug">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-[#444444]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#018837]" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#018837]" /> {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#018837]" /> {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Large campus architecture image card (Figma Frame 346:3535) */}
            <div className="lg:col-span-5 relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-white">
              <Image
                src="/assets/notice/44d943225373135f14a88eb11b8f98938e440f65.png"
                alt="UAMC Campus Architecture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SECTION 5: "Event Gallery of UAMC" (Figma Node 346:3677)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24 bg-white">
        {/* Section Header */}
        <div className="flex flex-col space-y-2 mb-12">
          <h2 className="text-3xl md:text-[42.9px] font-serif font-bold text-[#018837]">
            Event Gallery of UAMC
          </h2>
          <p className="text-sm md:text-base text-[#444444]">
            You&apos;ll find something to spark your curiosity and enhance
          </p>
        </div>

        {/* 3-Column Photo Cards with solid green bottom caption bars (bg-[#018837], white Bengali text) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl overflow-hidden shadow-sm h-[280px] group border border-gray-100"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[#018837] p-3.5 text-center">
                <p className="text-white font-serif font-bold text-sm truncate">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default function NoticeContent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <NoticeInner />
    </Suspense>
  )
}
