import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, ArrowLeft, Construction } from 'lucide-react';

export default function AdminJobsPlaceholderPage() {
  return (
    <div className="min-h-screen bg-[#E6F4EB] flex flex-col justify-between items-center p-4 sm:p-6 text-gray-800 antialiased select-none">
      <div className="w-full pt-4 sm:pt-6" />

      {/* Centered Coming Soon Card */}
      <div className="w-full max-w-md my-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-emerald-950/5 border border-emerald-100/70 p-8 sm:p-10 text-center transition-all">
          {/* Emblem */}
          <div className="relative w-16 h-16 mx-auto mb-4 drop-shadow-sm">
            <Image
              src="/assets/college-emblem.png"
              alt="UAMC Emblem"
              fill
              priority
              sizes="64px"
              className="object-contain"
            />
          </div>

          {/* Module Icon Badge */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-[#018837] mb-4 border border-emerald-100">
            <Briefcase className="w-6 h-6" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-3 border border-amber-200/60">
            <Construction className="w-3.5 h-3.5" />
            <span>Under Development</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-serif mb-2">
            Career & Job Postings
          </h1>

          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            The faculty recruitment and job applicant tracking module is coming soon to the UAMC Admin Panel.
          </p>

          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#018837] hover:bg-[#016F2C] active:bg-[#015C24] text-white font-semibold py-3 px-4 rounded-xl transition duration-150 shadow-md shadow-emerald-900/10 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#018837]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full pb-6 text-center">
        <p className="text-xs sm:text-sm text-gray-500 font-medium tracking-normal">
          System engineered by{' '}
          <span className="font-semibold text-gray-700">Sakin Bin Jabed</span>
        </p>
      </footer>
    </div>
  );
}
