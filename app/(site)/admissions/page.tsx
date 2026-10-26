import { Metadata } from 'next'
import AdmissionsContent from '@/components/admissions/AdmissionsContent'

export const metadata: Metadata = {
  title: 'Admissions - Uttara Adhunik Medical College',
  description: 'MBBS admission requirements, process, fees, and important dates.',
}

export default function AdmissionsPage() {
  return <AdmissionsContent />
}
