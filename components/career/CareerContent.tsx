'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSiteImages } from '@/hooks/useSiteImages'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react'

// Current Job Circulars & Faculty Openings data
type CareerOpening = {
  id: string | number
  title: string
  department: string
  type: string
  deadline: string
  requirements: string[]
}

const DEFAULT_CAREER_OPENINGS: CareerOpening[] = [
  {
    id: 1,
    title: 'Professor / Associate Professor',
    department: 'Pathology / Anatomy / Pharmacology',
    type: 'Full-time',
    deadline: 'November 15, 2026',
    requirements: [
      'MBBS with FCPS / MD / Ph.D in relevant subject from recognized institution',
      'Minimum 5 years teaching experience as Associate Professor / Assistant Professor',
      'BMDC registration with indexed publications',
    ],
  },
  {
    id: 2,
    title: 'Assistant Professor / Lecturer',
    department: 'Community Medicine / Physiology',
    type: 'Full-time',
    deadline: 'November 20, 2026',
    requirements: [
      'MBBS with post-graduate diploma or degree (M.Phil / MPH / FCPS Part-1)',
      'Minimum 2 years clinical / teaching experience preferred',
      'Valid BMDC registration',
    ],
  },
  {
    id: 3,
    title: 'Registrar / Resident Medical Officer (RMO)',
    department: 'Medicine & Allied / Surgery / ICU',
    type: 'Full-time / Shift',
    deadline: 'Rolling Admission',
    requirements: [
      'MBBS from a recognized medical college with completed internship',
      'Minimum 1 year clinical hospital experience in Emergency / Critical Care',
      'Current BMDC full registration',
    ],
  },
]

export default function CareerContent() {
  const { img } = useSiteImages();
  const [careerOpenings, setCareerOpenings] = useState(DEFAULT_CAREER_OPENINGS)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agreePrivacy: true,
  })

  const [submitted, setSubmitted] = useState(false)
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/jobs', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Failed to load job postings')
        return response.json()
      })
      .then(({ jobs }) => {
        if (!Array.isArray(jobs) || jobs.length === 0) return
        setCareerOpenings(jobs.filter((job: { isPublished: boolean }) => job.isPublished).map((job: {
          id: string
          title: string
          department: string
          type: string
          deadline: string
          requirements: string
        }) => ({
          id: job.id,
          title: job.title,
          department: job.department,
          type: job.type,
          deadline: job.deadline,
          requirements: job.requirements.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
        })))
      })
      .catch((error) => console.error('[career page]', error))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.firstName || !formData.email || !formData.message) {
      alert('Please fill in all required fields.')
      return
    }
    setSubmitted(true)
  }

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle)
    setFormData((prev) => ({
      ...prev,
      message: `Dear Recruitment Team,\n\nI am applying for the position of "${jobTitle}" at Uttara Adhunik Medical College. Please consider my application and contact me regarding the recruitment process.\n\nThank you.`,
    }))
    // Scroll to the contact/application form smoothly
    const formElem = document.getElementById('application-form')
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans antialiased text-[#444444]">
      {/* =========================================================================
          1. HERO BANNER: Matching Figma Node 346:3991 (1600x500 ratio)
          ========================================================================= */}
      <section className="relative w-full bg-[#eaf5ed] py-10 md:py-14 px-4 sm:px-8 lg:px-20 flex items-center justify-center min-h-[380px] lg:min-h-[440px]">
        {/* Medical Doodle Vector Strip Background (Exact Figma Cropped 1600x350 asset) */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/assets/hero-doodle-bg.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Centered Mint Box Container: Figma Node 346:3992 (height: 250px, rgba(1, 136, 55, 0.3), padding: 20px 50px) */}
        <div className="relative z-10 w-full max-w-[1440px] min-h-[250px] bg-[#A2CDB0]/40 md:bg-[rgba(1,136,55,0.25)] backdrop-blur-[7.5px] rounded-2xl md:rounded-3xl px-8 md:px-14 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-[#018837]/20">
          <div className="flex flex-col justify-center space-y-4 max-w-2xl">
            {/* Breadcrumb: HOME > Contact Us / Career (Active segment in #018837) */}
            <nav aria-label="Breadcrumb">
              <p className="text-base md:text-xl font-medium tracking-wide">
                <Link href="/" className="text-black hover:text-[#018837] transition font-sans">
                  HOME
                </Link>
                <span className="text-black mx-2">&gt;</span>
                <span className="text-[#018837] font-semibold font-sans">
                  Career &amp; Contact
                </span>
              </p>
            </nav>

            {/* Headline: Contact with UAMC (Canela / serif 300 #262626 and 700 #018837) */}
            <h1 className="text-5xl md:text-6xl lg:text-[70px] font-serif tracking-tight leading-tight">
              <span className="font-light text-[#262626] font-serif" style={{ fontWeight: 300 }}>
                Contact with{' '}
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
                src={img("college-emblem", "/assets/college-emblem.png")}
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
          2. JOB OPENINGS & REQUIREMENTS SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="flex flex-col space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-[#018837]">
            <Briefcase className="w-4 h-4" />
            <span>Employment Opportunities</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#444444] border-l-4 border-[#018837] pl-3">
            Current Job Circulars &amp; Faculty Openings
          </h2>
          <p className="text-sm md:text-base text-[#737477]">
            Join our dedicated academic and clinical team at Uttara Adhunik Medical College &amp; Hospital.
          </p>
        </div>

        {/* 3-Column Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careerOpenings.map((job) => (
            <div
              key={job.id}
              className={`rounded-2xl p-6 border transition flex flex-col justify-between ${
                selectedJob === job.title
                  ? 'border-[#018837] bg-[#E6F4EC]/60 shadow-md ring-2 ring-[#018837]/30'
                  : 'border-gray-200 bg-[#FCFBFB] hover:border-[#018837] hover:shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-[#FECD2F] text-black text-xs font-semibold px-3 py-1 rounded-sm">
                    {job.type}
                  </span>
                  <span className="text-xs text-[#737477]">Due: {job.deadline}</span>
                </div>

                <h3 className="text-lg md:text-xl font-bold font-serif text-[#110C2D] leading-snug">
                  {job.title}
                </h3>

                <p className="text-xs md:text-sm text-[#018837] font-medium flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>{job.department}</span>
                </p>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs font-bold text-[#444444] uppercase tracking-wider mb-2">
                    Key Requirements:
                  </p>
                  <ul className="text-xs text-[#737477] space-y-1.5 list-disc list-inside">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => handleApplyClick(job.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#018837] text-[#018837] hover:text-white border border-[#018837] text-xs md:text-sm font-semibold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Apply for this Role</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. MAIN CONTACT & APPLICATION FORM (Figma Node 346:4710)
          ========================================================================= */}
      <section id="application-form" className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: Contact Information Card (Figma Node 346:4776)
              Width: 398px, Background: rgba(1, 136, 55, 0.1), Padding: 50px 30px
              ===================================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 bg-[rgba(1,136,55,0.1)] rounded-2xl p-8 sm:p-10 border border-[#018837]/20 shadow-xs space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-2xl md:text-[25px] font-serif font-bold text-[#018837]">
                Contact Information
              </h2>
              <div className="w-16 h-1 bg-[#018837] rounded-full mt-3" />
            </div>

            {/* Information Items */}
            <div className="space-y-6">
              {/* Phone No */}
              <div className="space-y-1">
                <p className="text-[#444444] font-semibold text-lg md:text-[20px] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#018837]" />
                  <span>Phone No:</span>
                </p>
                <p className="text-black text-sm md:text-base pl-6">
                  <a href="tel:0255080711" className="hover:text-[#018837] transition font-medium">
                    0255080711
                  </a>
                </p>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <p className="text-[#444444] font-semibold text-lg md:text-[20px] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#018837]" />
                  <span>Email:</span>
                </p>
                <p className="text-black text-sm md:text-base pl-6">
                  <a href="mailto:uamcoffice08@yahoo.com" className="hover:text-[#018837] transition font-medium">
                    uamcoffice08@yahoo.com
                  </a>
                </p>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <p className="text-[#444444] font-semibold text-lg md:text-[20px] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#018837]" />
                  <span>Location:</span>
                </p>
                <p className="text-black text-sm md:text-base leading-relaxed pl-6">
                  H # 34, R # 4, Sector # 9, Sonargaon Janapath, Uttara Model Town
                </p>
              </div>

              {/* Open Hours */}
              <div className="space-y-1">
                <p className="text-[#444444] font-semibold text-lg md:text-[20px] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#018837]" />
                  <span>Open Hours:</span>
                </p>
                <p className="text-black text-sm md:text-base leading-relaxed pl-6">
                  Monday - Friday: 8:00 am - 5:00 pm<br />
                  Saturday - Sunday: 8:00 am - 5:00 pm
                </p>
              </div>

              {/* Social Media Links */}
              <div className="space-y-3 pt-2">
                <p className="text-[#444444] font-semibold text-lg md:text-[20px]">
                  Social Media:
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-[#018837] hover:text-white transition shadow-xs"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-[#018837] hover:text-white transition shadow-xs"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-[#018837] hover:text-white transition shadow-xs"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-[#018837] hover:text-white transition shadow-xs"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: Send Us Message Form (Figma Node 346:4728)
              Width: 1002px, Fills: Solid White with Light Mint Inputs
              ===================================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white space-y-8">
            {/* Heading */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-serif font-bold text-[#444444] leading-tight border-l-4 border-[#018837] pl-4">
                Keep In Touch, We Want To Hear From You - <br className="hidden md:inline" />
                Send Us Message
              </h2>
            </div>

            {submitted ? (
              <div className="bg-[#E6F4EC] border border-[#018837] p-8 rounded-2xl flex items-center gap-4 text-[#018837]">
                <CheckCircle className="w-10 h-10 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold font-serif">Message Dispatched Successfully!</h3>
                  <p className="text-sm text-[#444444] mt-1">
                    Thank you for contacting Uttara Adhunik Medical College. Our administration / HR office will review your inquiry and follow up shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        message: '',
                        agreePrivacy: true,
                      })
                      setSelectedJob(null)
                    }}
                    className="mt-4 px-4 py-2 bg-[#018837] text-white text-xs font-semibold rounded-lg hover:bg-[#016f2c] transition"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm md:text-base font-bold text-[#444444]">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Your First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full h-[60px] px-5 rounded-xl bg-[rgba(1,136,55,0.08)] border border-transparent focus:border-[#018837] focus:bg-white text-sm md:text-base text-black placeholder-[#737477] focus:outline-none transition shadow-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm md:text-base font-bold text-[#444444]">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Your Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full h-[60px] px-5 rounded-xl bg-[rgba(1,136,55,0.08)] border border-transparent focus:border-[#018837] focus:bg-white text-sm md:text-base text-black placeholder-[#737477] focus:outline-none transition shadow-xs"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm md:text-base font-bold text-[#444444]">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#018837]" />
                      <input
                        type="email"
                        required
                        placeholder="Enter Your Valid Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-[60px] pl-12 pr-5 rounded-xl bg-[rgba(1,136,55,0.08)] border border-transparent focus:border-[#018837] focus:bg-white text-sm md:text-base text-black placeholder-[#737477] focus:outline-none transition shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm md:text-base font-bold text-[#444444]">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#018837]" />
                      <input
                        type="tel"
                        required
                        placeholder="Enter Your Valid Contact Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-[60px] pl-12 pr-5 rounded-xl bg-[rgba(1,136,55,0.08)] border border-transparent focus:border-[#018837] focus:bg-white text-sm md:text-base text-black placeholder-[#737477] focus:outline-none transition shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-bold text-[#444444]">
                    Write your Message Here *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-5 rounded-xl bg-[rgba(1,136,55,0.08)] border border-transparent focus:border-[#018837] focus:bg-white text-sm md:text-base text-black placeholder-[#737477] focus:outline-none transition shadow-xs"
                  />
                </div>

                {/* Checkbox: Privacy Notice */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="privacy-notice"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                    className="w-4 h-4 rounded text-[#018837] focus:ring-[#018837] cursor-pointer"
                  />
                  <label
                    htmlFor="privacy-notice"
                    className="text-xs md:text-sm text-[#444444] cursor-pointer select-none"
                  >
                    By submitting this form, you agree to the UAMC privacy notice.
                  </label>
                </div>

                {/* Submit Button (Component 27: bg-[#018837], text-white) */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="h-[60px] px-8 rounded-xl bg-[#018837] hover:bg-[#016f2c] text-white text-base md:text-[17.3px] font-medium transition shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Send you message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
