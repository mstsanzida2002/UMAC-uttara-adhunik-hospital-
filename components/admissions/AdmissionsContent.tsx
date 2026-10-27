'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSiteImages } from '@/hooks/useSiteImages'
import {
  Download,
  Share2,
  Building2,
  ExternalLink,
} from 'lucide-react'

// Tab definitions matching Figma Node 325:2849
const TABS = [
  { id: 'procedure', label: 'Admission Procedure & Fees', hash: 'fees' },
  { id: 'papers', label: 'Admission Papers', hash: 'papers' },
  { id: 'form', label: 'Application Form', hash: 'form' },
  { id: 'results', label: 'Admission Results', hash: 'results' },
  { id: 'online', label: 'Online Registration', hash: 'registration' },
]

type AdmissionInfo = {
  id: string
  title: string
  slug: string
  content: string
  downloadUrl: string | null
}

function resolveTab(raw: string | null | undefined): string | null {
  if (!raw) return null
  const cleaned = raw.replace(/^[#?]/, '').trim().toLowerCase()
  if (cleaned === 'fees' || cleaned === 'procedure') return 'procedure'
  if (cleaned === 'papers') return 'papers'
  if (cleaned === 'form' || cleaned === 'forms') return 'form'
  if (cleaned === 'results' || cleaned === 'result') return 'results'
  if (cleaned === 'registration' || cleaned === 'online') return 'online'
  return null
}

function AdmissionsInner() {
  const { img } = useSiteImages()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>('procedure')
  const [managedInfo, setManagedInfo] = useState<AdmissionInfo[]>([])

  useEffect(() => {
    fetch('/api/admin/admissions', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Failed to load admission information')
        return response.json()
      })
      .then(({ items }) => {
        if (Array.isArray(items)) setManagedInfo(items)
      })
      .catch((error) => console.error('[admissions page]', error))
  }, [])

  // Sync activeTab with URL (both searchParams and hash)
  useEffect(() => {
    const handleUrlSync = () => {
      // 1. Check query parameter: ?tab=...
      const paramTab = resolveTab(searchParams.get('tab'))
      if (paramTab) {
        setActiveTab(paramTab)
        return
      }

      // 2. Check URL hash: #fees, #papers, etc.
      if (typeof window !== 'undefined') {
        const hashTab = resolveTab(window.location.hash)
        if (hashTab) {
          setActiveTab(hashTab)
        }
      }
    }

    handleUrlSync()

    // Listen to hashchange events
    window.addEventListener('hashchange', handleUrlSync)
    window.addEventListener('popstate', handleUrlSync)

    return () => {
      window.removeEventListener('hashchange', handleUrlSync)
      window.removeEventListener('popstate', handleUrlSync)
    }
  }, [searchParams])

  // Update URL shallowly when clicking pill tabs
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    const matchedTab = TABS.find((t) => t.id === tabId)
    const targetHash = matchedTab ? matchedTab.hash : tabId
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/admissions#${targetHash}`)
    }
  }

  const activeTabObj = TABS.find((t) => t.id === activeTab) || TABS[0]

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans antialiased text-[#444444]">
      {/* 1. HERO BANNER: Light pastel green with medical doodle strip background */}
      <section className="relative w-full h-[380px] md:h-[500px] overflow-hidden bg-[#eaf5ed]">
        {/* Exact Figma medical doodle illustration background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero-doodle-bg.png"
            alt="Medical Doodle Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl h-full mx-auto px-6 md:px-16 flex items-center justify-between">
          <div className="flex flex-col justify-center space-y-4 max-w-2xl">
            {/* Dynamic Breadcrumb: HOME > FACILITIES >> [Active Tab Name] */}
            <nav aria-label="Breadcrumb">
              <p className="text-base md:text-xl font-medium tracking-wide">
                <Link href="/" className="text-black hover:text-[#018837] transition">
                  HOME
                </Link>
                <span className="text-black mx-1.5">&gt;</span>
                <span className="text-black">FACILITIES</span>
                <span className="text-black mx-1.5">&gt;&gt;</span>
                <span className="text-[#018837] font-semibold">
                  {activeTabObj.label}
                </span>
              </p>
            </nav>

            {/* Title: Admission (#262626) UAMC (#018837) */}
            <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-tight">
              <span className="font-light text-[#262626]">Admission </span>
              <strong className="font-bold text-[#018837]">UAMC</strong>
            </h1>
          </div>

          {/* Right Hero Asset: Official round college crest emblem (Asset 1@4x 1, 250px) */}
          <div className="hidden lg:flex items-center justify-center shrink-0">
            <div className="relative w-[240px] h-[276px] drop-shadow-md">
              <Image
                src={img("college-emblem", "/assets/college-emblem.png")}
                alt="Uttara Adhunik Medical College Crest"
                width={250}
                height={287}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUB-NAVIGATION TABS (PILL BUTTONS) */}
      <section className="bg-[#FBFBFB] py-8 px-4 md:px-12 border-b border-gray-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-4 md:gap-6">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-7 py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-sm ${
                  isActive
                    ? 'bg-[#018837] text-white ring-2 ring-[#018837]/30 ring-offset-2'
                    : 'bg-[#737477] text-white hover:bg-[#5f6063]'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* 3. DYNAMIC CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16">
        {managedInfo.filter((item) => item.slug === activeTab).map((item) => (
          <section key={item.id} className="mb-12 rounded-3xl border border-[#018837]/20 bg-[#E6F4EB] p-6 md:p-10">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#018837]">{item.title}</h2>
            <p className="mt-5 whitespace-pre-wrap text-base md:text-lg leading-relaxed text-[#444444]">{item.content}</p>
            {item.downloadUrl && (
              <a
                href={item.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#018837] px-5 py-3 font-semibold text-white hover:bg-[#016f2c]"
              >
                <Download className="h-4 w-4" />
                Open document or application link
              </a>
            )}
          </section>
        ))}
        {activeTab === 'procedure' && <ProcedureTabContent />}
        {activeTab === 'papers' && <PapersTabContent />}
        {activeTab === 'form' && <FormsTabContent />}
        {activeTab === 'results' && <ResultsTabContent />}
        {activeTab === 'online' && <OnlineRegistrationContent />}
      </main>
    </div>
  )
}

export default function AdmissionsContent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AdmissionsInner />
    </Suspense>
  )
}

// =========================================================================
// TAB 1: ADMISSION PROCEDURE & FEES
// =========================================================================
function ProcedureTabContent() {
  return (
    <div className="space-y-12">
      {/* Top Card: About Hospital Highlight (Figma Node 322:2642) */}
      <div className="bg-[#E6F4EB] p-8 md:p-14 rounded-3xl border border-[#018837]/20 shadow-sm space-y-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left: Hospital Icon + Title */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#018837]/15 flex items-center justify-center shrink-0">
              <Building2 className="w-8 h-8 text-[#018837]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-black leading-tight">
              Admission Procedure <br />& Fees
            </h2>
          </div>

          {/* Right: Description text */}
          <div className="lg:max-w-xl">
            <p className="text-[#444444] text-base md:text-lg leading-relaxed">
              <strong className="text-black">Uttara Adhunik Medical College (UAMC)</strong> is the teaching and training hospital of the college. It is a 500-bedded, multidisciplinary tertiary care facility located in Uttara, Dhaka. The hospital serves patients from all over the country, particularly from Uttara, Tongi, Gazipur, and Savar.
            </p>
          </div>
        </div>

        {/* Doctor group image spanning container with solid yellow badge */}
        <div className="relative w-full h-[320px] md:h-[450px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/assets/admission-banner-hospital.png"
            alt="UAMC Medical Team and Facilities"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <div className="bg-[#FECD2F] text-black px-8 md:px-12 py-4 md:py-6 shadow-xl inline-block">
              <span className="text-4xl md:text-7xl font-serif font-bold tracking-tight block">
                Admission
              </span>
              <div className="h-1.5 w-full bg-black mt-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Breakdown Section (Figma Node 322:2666) */}
      <div className="bg-white p-6 md:p-12 rounded-3xl border border-gray-200 shadow-sm">
        {/* SECTION A: FOR BD/NATIONAL STUDENTS */}
        <div>
          <h3 className="text-2xl md:text-4xl font-serif font-bold text-[#444444] border-l-4 border-[#018837] pl-3 mb-6">
            For BD/National Student
          </h3>

          <div className="space-y-6 text-[#444444]">
            {/* Eligibility: Clean left green border with direct text (NO card box container) */}
            <div>
              <h4 className="text-xl font-serif font-bold text-black border-l-4 border-[#018837] pl-3 mb-2">
                Eligibility
              </h4>
              <p className="text-base md:text-lg leading-relaxed pl-3">
                Applicants must meet the criteria set by the Directorate General of Medical Education (DGME) under the Ministry of Health and Family Welfare, Government of Bangladesh.
              </p>
            </div>

            {/* Selection & Admission: Clean left green border */}
            <div>
              <h4 className="text-xl font-serif font-bold text-black border-l-4 border-[#018837] pl-3 mb-3">
                Selection & Admission
              </h4>
              <ul className="space-y-2 text-base list-disc list-inside pl-3">
                <li>Admission is based on the results of the DGHS national medical admission test.</li>
                <li>Selection follows candidate preference and merit list as per DGHS guidelines.</li>
                <li>Final selection is done by the admission committee formed by DGME.</li>
              </ul>
            </div>

            {/* Student Quotas: Clean left green border */}
            <div>
              <h4 className="text-xl font-serif font-bold text-black border-l-4 border-[#018837] pl-3 mb-3">
                Student Quotas
              </h4>
              <ul className="space-y-2 text-base text-[#525271] list-disc list-inside pl-3">
                <li><strong className="text-black">Total Seats:</strong> 90 for 1st Year MBBS (since 2013-2014).</li>
                <li><strong className="text-black">Poor Quota:</strong> 5% seats (free studentship) based on merit & financial need.</li>
                <li><strong className="text-black">Freedom Fighter Quota:</strong> Available under DGHS rules.</li>
              </ul>
            </div>

            {/* Alert / Important Quote box */}
            <div className="border-l-4 border-[#018837] pl-4 py-2">
              <p className="text-black text-base md:text-lg font-medium leading-relaxed">
                Selected students must complete admission within the declared deadline. Failure to do so will result in cancellation, and seats will be filled from the waiting list.
              </p>
            </div>

            {/* Fee Table (National) */}
            <div className="pt-4">
              <h4 className="text-xl md:text-2xl font-serif font-bold text-[#444444] mb-4">
                Fee Structure (Session 2024-2025)
              </h4>
              <div className="overflow-x-auto rounded-xl border border-[#444444]/30">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#E6F4EB] border-y border-[#444444]/50">
                      <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] w-24">No.</th>
                      <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px]">Particulars</th>
                      <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] text-right">Amount (BDT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#444444]/20 text-sm md:text-base">
                    <tr className="hover:bg-slate-50">
                      <td className="py-4 px-6 font-medium text-[#444444]">01</td>
                      <td className="py-4 px-6 text-[#444444]">Admission Fee</td>
                      <td className="py-4 px-6 text-right font-medium text-[#444444]">19,44,000/-</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-4 px-6 font-medium text-[#444444]">02</td>
                      <td className="py-4 px-6 text-[#444444]">Internship Fee</td>
                      <td className="py-4 px-6 text-right font-medium text-[#444444]">1,80,000/-</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold border-t-2 border-[#444444]/40">
                      <td className="py-4 px-6 text-black">Total</td>
                      <td className="py-4 px-6 text-black font-serif">Total Payable</td>
                      <td className="py-4 px-6 text-right text-black font-serif text-lg">21,24,000/-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Monthly Tuition Note */}
              <div className="mt-4 border-l-4 border-[#018837] pl-3 py-1 text-sm md:text-base text-black">
                <p><strong>Monthly Tuition Fee:</strong> ৳10,000 until course completion.</p>
                <p className="mt-0.5"><strong>VAT:</strong> Applicable as per government rules.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Missing Divider 1: Exact thin horizontal divider between National and Foreign */}
        <div className="border-t border-[#444444]/30 my-12" />

        {/* SECTION B: FOR FOREIGN STUDENTS */}
        <div>
          <h3 className="text-2xl md:text-4xl font-serif font-bold text-[#444444] border-l-4 border-[#018837] pl-3 mb-6">
            For Foreign Students
          </h3>

          <div className="space-y-6 text-[#444444]">
            {/* Eligibility: Clean left green border with direct text (NO card box container) */}
            <div>
              <h4 className="text-xl font-serif font-bold text-black border-l-4 border-[#018837] pl-3 mb-2">
                Eligibility
              </h4>
              <ul className="space-y-1 text-base md:text-lg list-disc list-inside pl-3">
                <li>Must hold a non-Bangladeshi passport.</li>
                <li>Must follow foreign student admission policy set by the Government of Bangladesh.</li>
              </ul>
            </div>

            {/* Required Documents: Clean left green border */}
            <div>
              <h4 className="text-xl font-serif font-bold text-black border-l-4 border-[#018837] pl-3 mb-3">
                Required Documents
              </h4>
              <ul className="space-y-2 text-base list-disc list-inside pl-3">
                <li>Attested copies of O & A level or equivalent certificates (attested by respective Foreign Ministry).</li>
                <li>Application form from the Bangladesh Embassy of the candidate&apos;s home country.</li>
                <li>UAMC&apos;s Foreign Student Application Form (available at the college office).</li>
                <li>Photocopies of passport & verified academic transcripts.</li>
                <li>Documents must be submitted to DGHS via the Foreign Ministry of Bangladesh.</li>
              </ul>
            </div>

            {/* Fee Table (Foreign) */}
            <div className="pt-4">
              <h4 className="text-xl md:text-2xl font-serif font-bold text-[#444444] mb-4">
                Fee Structure (Session 2024-2025)
              </h4>
              <div className="overflow-x-auto rounded-xl border border-[#444444]/30">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#E6F4EB] border-y border-[#444444]/50">
                      <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] w-24">No.</th>
                      <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px]">Particulars</th>
                      <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] text-right">Amount (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#444444]/20 text-sm md:text-base">
                    <tr className="hover:bg-slate-50">
                      <td className="py-4 px-6 font-medium text-[#444444]">01</td>
                      <td className="py-4 px-6 text-[#444444]">Admission & Tuition (5 Years)</td>
                      <td className="py-4 px-6 text-right font-medium text-[#444444]">$40,000</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold border-t-2 border-[#444444]/40">
                      <td className="py-4 px-6 text-black">Total</td>
                      <td className="py-4 px-6 text-black font-serif">Total Payable</td>
                      <td className="py-4 px-6 text-right text-black font-serif text-lg">$40,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Foreign Fee Note */}
              <div className="mt-4 border-l-4 border-[#018837] pl-3 py-1 text-sm md:text-base text-black">
                <p>VAT & university fees are applicable as per government and university regulations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Missing Divider 2: Exact thin horizontal divider between Foreign and Contact */}
        <div className="border-t border-[#444444]/30 my-12" />

        {/* SECTION C: CONTACT FOR ADMISSION (Unboxed text with border-l-4) */}
        <div>
          <h3 className="text-2xl md:text-4xl font-serif font-bold text-[#444444] border-l-4 border-[#018837] pl-3 mb-4">
            Contact for Admission
          </h3>
          <div className="pl-3 space-y-1.5 text-base md:text-lg text-[#444444]">
            <p className="font-bold text-black">Uttara Adhunik Medical College</p>
            <p className="leading-relaxed">
              House # 34, Road # 4, Sector # 9, Sonargaon Janapath, Uttara Model Town, Dhaka-1230, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// =========================================================================
// TAB 2: ADMISSION PAPERS
// =========================================================================
function PapersTabContent() {
  const notices = [
    { no: '01', date: 'April 9, 2025', title: 'Necessary Documents for MBBS Admission (Session: 2024–2025)' },
    { no: '02', date: 'April 5, 2025', title: 'Admission Notice in MBBS Course (Session: 2024–2025) for Private Medical Colleges' },
    { no: '03', date: 'Jan 25, 2025', title: 'Necessary Documents for Admission in MBBS Course (Session: 2023–2024)' },
    { no: '04', date: 'Feb 19, 2024', title: 'Admission Notice in MBBS Course (Session: 2023–2024)' },
    { no: '05', date: 'Feb 16, 2024', title: 'Notice of MBBS Admission (Session: 2022–2023)' },
    { no: '06', date: 'June 30, 2023', title: 'Necessary Documents for Admission in MBBS Course (Session: 2023–2024)' },
    { no: '07', date: 'June 25, 2023', title: 'Govt. Circular for MBBS Admission 2023 in Private Medical Colleges' },
    { no: '08', date: 'June 6, 2023', title: 'Necessary Documents to Submit Application' },
    { no: '09', date: 'June 5, 2021', title: 'Admission Circular (Govt. Notice)' },
  ]

  return (
    <div className="bg-white p-6 md:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-8">
      <div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black">
          Admission Papers & Notices
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2">
          MBBS Admission – Session 2024–2025
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#444444]/30">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E6F4EB] border-y border-[#444444]/50">
              <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] w-20">No.</th>
              <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] w-36">Date</th>
              <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px]">Title</th>
              <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] text-center w-36">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#444444]/20 text-sm md:text-base">
            {notices.map((n) => (
              <tr key={n.no} className="hover:bg-slate-50 transition">
                <td className="py-4 px-6 font-medium text-[#444444]">{n.no}</td>
                <td className="py-4 px-6 text-[#737477] whitespace-nowrap">{n.date}</td>
                <td className="py-4 px-6 font-medium text-slate-800">{n.title}</td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      title="Download"
                      className="w-10 h-10 rounded-full bg-[rgba(1,136,55,0.1)] hover:bg-[#018837] text-[#018837] hover:text-white flex items-center justify-center transition"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      title="Share"
                      className="w-10 h-10 rounded-full bg-[rgba(1,136,55,0.1)] hover:bg-[#018837] text-[#018837] hover:text-white flex items-center justify-center transition"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note box */}
      <div className="border-l-4 border-[#018837] bg-[#E6F4EB]/40 p-5 rounded-r-xl text-black text-sm md:text-base">
        <p>
          <strong>Note:</strong> All applicants are advised to check the latest official notices on the Directorate General of Medical Education (DGME) website for up-to-date admission instructions and required documents.
        </p>
      </div>
    </div>
  )
}

// =========================================================================
// TAB 3: APPLICATION FORM
// =========================================================================
function FormsTabContent() {
  const forms = [
    { no: '01', date: 'June 22, 2022', title: 'Application Form for MBBS Admission (Poor & Meritorious Quota)' },
    { no: '02', date: 'June 5, 2021', title: 'General Application Form for MBBS Admission' },
  ]

  return (
    <div className="bg-white p-6 md:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-8">
      <div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black">
          Admission Forms
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2">
          MBBS Admission Forms
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#444444]/30">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E6F4EB] border-y border-[#444444]/50">
              <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] w-20">No.</th>
              <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] w-36">Date</th>
              <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px]">Title</th>
              <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] text-center w-36">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#444444]/20 text-sm md:text-base">
            {forms.map((f) => (
              <tr key={f.no} className="hover:bg-slate-50 transition">
                <td className="py-4 px-6 font-medium text-[#444444]">{f.no}</td>
                <td className="py-4 px-6 text-[#737477] whitespace-nowrap">{f.date}</td>
                <td className="py-4 px-6 font-medium text-slate-800">{f.title}</td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      title="Download Form"
                      className="w-10 h-10 rounded-full bg-[rgba(1,136,55,0.1)] hover:bg-[#018837] text-[#018837] hover:text-white flex items-center justify-center transition"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      title="Share"
                      className="w-10 h-10 rounded-full bg-[rgba(1,136,55,0.1)] hover:bg-[#018837] text-[#018837] hover:text-white flex items-center justify-center transition"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-l-4 border-[#018837] bg-[#E6F4EB]/40 p-5 rounded-r-xl text-black text-sm md:text-base">
        <p>
          <strong>Note:</strong> Applicants are advised to fill out the appropriate form as per their eligibility criteria and submit it along with required documents to the college office within the notified deadlines.
        </p>
      </div>
    </div>
  )
}

// =========================================================================
// TAB 4: ADMISSION RESULTS
// =========================================================================
function ResultsTabContent() {
  const results = [
    { no: '01', date: 'July 18, 2022', title: 'Final Selected Candidates for MBBS Admission' },
    { no: '02', date: 'July 7, 2022', title: 'Selected Candidates under General Quota Merit List' },
    { no: '03', date: 'July 7, 2022', title: 'Selected Candidates under Freedom Fighter Quota Merit List' },
    { no: '04', date: 'July 6, 2022', title: 'Total Merit List (A–Z) for MBBS Admission' },
    { no: '05', date: 'July 6, 2022', title: 'Total Applications (A–Z) – Freedom Fighter Quota' },
    { no: '06', date: 'July 6, 2022', title: 'Total Applications – Poor & Meritorious Quota' },
    { no: '07', date: 'July 6, 2022', title: 'Waiting List of Candidates for MBBS Admission' },
  ]

  return (
    <div className="bg-white p-6 md:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-8">
      <div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black">
          Admission Results
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2">
          MBBS Admission (Session: 2021–2022)
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#444444]/30">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E6F4EB] border-y border-[#444444]/50">
              <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] w-20">No.</th>
              <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] w-36">Date</th>
              <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px]">Title</th>
              <th className="py-4 px-6 font-serif font-bold text-[#444444] text-[15px] text-center w-36">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#444444]/20 text-sm md:text-base">
            {results.map((r) => (
              <tr key={r.no} className="hover:bg-slate-50 transition">
                <td className="py-4 px-6 font-medium text-[#444444]">{r.no}</td>
                <td className="py-4 px-6 text-[#737477] whitespace-nowrap">{r.date}</td>
                <td className="py-4 px-6 font-medium text-slate-800">{r.title}</td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      title="Download"
                      className="w-10 h-10 rounded-full bg-[rgba(1,136,55,0.1)] hover:bg-[#018837] text-[#018837] hover:text-white flex items-center justify-center transition"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      title="Share"
                      className="w-10 h-10 rounded-full bg-[rgba(1,136,55,0.1)] hover:bg-[#018837] text-[#018837] hover:text-white flex items-center justify-center transition"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-l-4 border-[#018837] bg-[#E6F4EB]/40 p-5 rounded-r-xl text-black text-sm md:text-base">
        <p>
          <strong>Note:</strong> Selected candidates must complete admission within the declared timeline. Failure to report within the specified dates will lead to vacancy re-allotment from the waiting list.
        </p>
      </div>
    </div>
  )
}

// =========================================================================
// TAB 5: ONLINE REGISTRATION
// =========================================================================
function OnlineRegistrationContent() {
  return (
    <div className="bg-white p-6 md:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-8">
      <div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black">
          Online Registration
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2">
          DGHS / DGME Centralized MBBS Admission Portal
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="text-3xl font-extrabold text-[#018837]">01</span>
          <h4 className="text-lg font-bold text-black mt-2 mb-2 font-serif">Check DGHS Notice</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Verify eligibility, pass marks, and schedule on the official DGHS/DGME admission portal.
          </p>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="text-3xl font-extrabold text-[#018837]">02</span>
          <h4 className="text-lg font-bold text-black mt-2 mb-2 font-serif">Submit Online Choice</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Select <strong>Uttara Adhunik Medical College (UAMC)</strong> as your preferred medical college choice.
          </p>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="text-3xl font-extrabold text-[#018837]">03</span>
          <h4 className="text-lg font-bold text-black mt-2 mb-2 font-serif">College Verification</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            After allotment, visit our admission office with original documents and admission slip to complete enrollment.
          </p>
        </div>
      </div>

      <div className="p-8 bg-[#E6F4EB] rounded-2xl border border-[#018837]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold text-black font-serif">Apply Online via DGME Official Portal</h4>
          <p className="text-slate-700 text-sm mt-1">
            Access the national central admission system for medical colleges.
          </p>
        </div>
        <a
          href="http://dgme.teletalk.com.bd"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3.5 bg-[#018837] text-white font-bold rounded-xl hover:bg-[#016f2c] transition shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          <span>Open DGME Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
