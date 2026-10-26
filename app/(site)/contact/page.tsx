import { Metadata } from 'next'
import CareerContent from '@/components/career/CareerContent'

export const metadata: Metadata = {
  title: 'Contact Us - Uttara Adhunik Medical College',
  description: 'Official contact information, campus address, administrative office hours, and inquiry message form for Uttara Adhunik Medical College (UAMC).',
}

export default function ContactPage() {
  return <CareerContent />
}
