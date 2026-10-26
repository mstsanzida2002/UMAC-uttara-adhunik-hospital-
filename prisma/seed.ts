import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
  const adminEmail = "sakin5140@gmail.com"
  const existing = await prisma.adminUser.findUnique({
    where: { email: adminEmail }
  })

  if (!existing) {
    const hashedPassword = await bcrypt.hash("Sakin106", 10)
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        name: "Sakin (Super Admin)",
        password: hashedPassword,
      }
    })
    console.log("Default admin created: sakin5140@gmail.com / Sakin106")
  } else {
    const hashedPassword = await bcrypt.hash("Sakin106", 10)
    await prisma.adminUser.update({
      where: { email: adminEmail },
      data: { password: hashedPassword }
    })
    console.log("Admin user updated with new password.")
  }

  // Seed sample notices if none exist
  const noticeCount = await prisma.notice.count()
  if (noticeCount === 0) {
    await prisma.notice.createMany({
      data: [
        {
          title: "MBBS Admission 2026-2027 Academic Year Notice",
          category: "Admission",
          date: "Oct 18, 2026",
          content: "Applications for MBBS 1st Year Admission for the academic session 2026-2027 are now open according to DGHS guidelines.",
          isImportant: true,
        },
        {
          title: "Professional MBBS Final Examination Schedule",
          category: "Academic",
          date: "Oct 15, 2026",
          content: "The upcoming Professional MBBS examinations will commence from November 10, 2026. Admit cards can be collected from the office.",
          isImportant: false,
        },
        {
          title: "Annual Cultural & Sports Week 2026",
          category: "Event",
          date: "Oct 10, 2026",
          content: "All students are cordially invited to participate in the Annual Cultural and Sports Week starting next Sunday.",
          isImportant: false,
        }
      ]
    })
    console.log("Sample notices seeded.")
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
