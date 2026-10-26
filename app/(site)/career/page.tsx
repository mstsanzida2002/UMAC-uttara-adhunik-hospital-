import { Metadata } from 'next'
import CareerContent from '@/components/career/CareerContent'

export const metadata: Metadata = {
  title: 'Career & Contact - Uttara Adhunik Medical College',
  description: 'Career opportunities, job circulars, faculty openings, and official contact information for Uttara Adhunik Medical College (UAMC).',
}

export default function CareerPage() {
  return <CareerContent />
}
