import { Metadata } from 'next'
import NoticeContent from '@/components/notice/NoticeContent'

export const metadata: Metadata = {
  title: 'Notice & Media - Uttara Adhunik Medical College',
  description: 'Official notice board, circulars, announcements, academic reports, and media gallery of Uttara Adhunik Medical College.',
}

export default function NoticePage() {
  return <NoticeContent />
}
