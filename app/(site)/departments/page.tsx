import { Building2, HeartPulse, Users, Stethoscope, Baby, Bone, Brain } from "lucide-react"

export const metadata = {
  title: "Departments - Uttara Adhunik Medical College",
  description: "Explore clinical and academic departments at Uttara Adhunik Medical College.",
}

const departments = [
  { name: "Cardiology", icon: HeartPulse, desc: "Comprehensive cardiac care, ECG, Echo, and CCU facilities." },
  { name: "Medicine", icon: Stethoscope, desc: "General internal medicine with specialist consultation." },
  { name: "Pediatrics", icon: Baby, desc: "Child healthcare, immunization, and neonatal care." },
  { name: "Orthopedics", icon: Bone, desc: "Bone, joint, and trauma care with modern surgery." },
  { name: "Neurology", icon: Brain, desc: "Diagnosis and treatment of nervous system disorders." },
  { name: "Gynecology & Obstetrics", icon: Users, desc: "Maternal care, safe delivery, and women's health." },
]

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#110C2D] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[#F5D253] text-sm font-semibold uppercase tracking-wider">Clinical Excellence</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-2 mb-4">Our Departments</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
            Multidisciplinary departments staffed by expert consultants delivering quality healthcare and education.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <div key={dept.name} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-[#890C25] text-white rounded-2xl flex items-center justify-center mb-5">
                <dept.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{dept.name}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{dept.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
