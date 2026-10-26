const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CONTENT_ITEMS = [
  // 1. Overview: About UAMC & Admission & Aid
  {
    key: "about.paragraph1",
    label: "About UAMC Paragraph 1",
    section: "Overview",
    type: "textarea",
    value: "Uttara Adhunik Medical College (UAMC), established in 2007 under the visionary initiative of Bangladesh Medical Studies and Research Institute (BMSRI), stands as a premier beacon of excellence in medical undergraduate training and clinical care in Bangladesh.",
  },
  {
    key: "about.paragraph2",
    label: "About UAMC Paragraph 2",
    section: "Overview",
    type: "textarea",
    value: "Affiliated with the prestigious University of Dhaka and recognized by the Bangladesh Medical and Dental Council (BMDC), UAMC delivers an internationally calibrated curriculum supported by cutting-edge simulation laboratories and a 500-bed multidisciplinary tertiary hospital.",
  },
  {
    key: "about.admission_aid_desc",
    label: "Admission & Aid Description",
    section: "Overview",
    type: "textarea",
    value: "At UAMC, we prepare you to launch your career by providing a supportive, creative, and professional environment from which to learn practical skills. Founded by visionary social leaders and medical practitioners.",
  },

  // 2. History & Evolution Timeline
  {
    key: "about.history_para1",
    label: "History Paragraph 1",
    section: "History",
    type: "textarea",
    value: "Uttara Adhunik Medical College (UAMC) has a rich history of dedication, innovation, and excellence in medical education and healthcare services. Rooted in the vision of advancing private medical education in Bangladesh, UAMC has grown into a leading institution in a short span of time.",
  },
  {
    key: "about.history_para2",
    label: "History Paragraph 2",
    section: "History",
    type: "textarea",
    value: "Founded under Bangladesh Medical Studies and Research Institute (BMSRI), the college is proudly affiliated with the University of Dhaka and recognized by the Bangladesh Medical and Dental Council (BMDC), nurturing ethical healthcare leaders.",
  },
  {
    key: "about.history_timeline_desc",
    label: "Timeline Evolution Subtitle",
    section: "History",
    type: "textarea",
    value: "Founded in 2007, UAMC, under BMSRI, is a leading medical institution affiliated with Dhaka University. With a 500-bed hospital, it excels in medical education, research, and patient care, shaping the future of healthcare in Bangladesh.",
  },
  {
    key: "about.timeline.1984.desc",
    label: "Timeline 1984: The Vision Begins",
    section: "History",
    type: "textarea",
    value: "The initiative to pioneer high standard private healthcare and medical education in Bangladesh was conceived by visionary physicians.",
  },
  {
    key: "about.timeline.1986.desc",
    label: "Timeline 1986: The First Private Medical College",
    section: "History",
    type: "textarea",
    value: "Establishment of pioneering medical institutions under BMSRI, creating a precedent for excellence in the country.",
  },
  {
    key: "about.timeline.2003.desc",
    label: "Timeline 2003: Foundation of Uttara Adhunik Hospital",
    section: "History",
    type: "textarea",
    value: "Uttara Adhunik Medical College Hospital commenced operations in Uttara Model Town, catering to healthcare needs in Northern Dhaka.",
  },
  {
    key: "about.timeline.2005.desc",
    label: "Timeline 2005: Expansion of Indoor Services",
    section: "History",
    type: "textarea",
    value: "Rapid expansion into advanced clinical inpatient care, critical care facilities, and multidisciplinary diagnostic services.",
  },
  {
    key: "about.timeline.2007.desc",
    label: "Timeline 2007: Birth of UAMC",
    section: "History",
    type: "textarea",
    value: "Formal academic establishment of UAMC under BMSRI, affiliated with the University of Dhaka and recognized by BMDC.",
  },
  {
    key: "about.timeline.2008.desc",
    label: "Timeline 2008: UAMC’s Academic Journey Begins",
    section: "History",
    type: "textarea",
    value: "First MBBS batch admitted, marking the start of a storied journey in medical undergraduate training and clinical education.",
  },
  {
    key: "about.timeline.present.desc",
    label: "Timeline Present: Advancing Healthcare & Education",
    section: "History",
    type: "textarea",
    value: "A prestigious 500-bed tertiary hospital providing world-class patient care and educating hundreds of compassionate physicians annually.",
  },
  {
    key: "about.timeline.future.desc",
    label: "Timeline Future: Continuous Global Innovation",
    section: "History",
    type: "textarea",
    value: "Expanding biomedical research, postgraduate fellowships, digital healthcare integration, and international medical collaborations.",
  },

  // 3. Vision & Mission
  {
    key: "about.vision_para",
    label: "Vision of UAMC Statement",
    section: "Vision & Mission",
    type: "textarea",
    value: "To be a leading center of excellence in medical education, healthcare, and research, producing skilled, compassionate, and ethical medical professionals who contribute to national and global healthcare advancements.",
  },
  {
    key: "about.mission_para",
    label: "Mission of UAMC Statement",
    section: "Vision & Mission",
    type: "textarea",
    value: "To provide comprehensive, state-of-the-art medical education and hands-on clinical training, instilling empathy, ethical values, and clinical mastery in physicians dedicated to serving humanity with excellence.",
  },

  // 4. Aim & Objectives
  {
    key: "about.aim_para",
    label: "Aim of UAMC Statement",
    section: "Aim & Objectives",
    type: "textarea",
    value: "Uttara Adhunik Medical College (UAMC) is committed to producing competent, compassionate, and dedicated healthcare professionals equipped with the knowledge and skills to serve the community, particularly in rural areas. The institution strives to provide a solid foundation for future training, service, and research at both national and international levels while fostering continuous professional development.",
  },
  {
    key: "about.objective1.desc",
    label: "Objective 01: Academic Excellence",
    section: "Aim & Objectives",
    type: "textarea",
    value: "Deliver a comprehensive MBBS curriculum aligned with Bangladesh Medical & Dental Council (BMDC) and Dhaka University (DU) guidelines. Equip students with a deep understanding of medical sciences, human anatomy, disease mechanisms, and healthcare practices.",
  },
  {
    key: "about.objective2.desc",
    label: "Objective 02: Clinical & Professional Skills Development",
    section: "Aim & Objectives",
    type: "textarea",
    value: "Train students in patient history-taking, clinical examinations, and emergency management. Ensure proficiency in diagnostic procedures, laboratory investigations, and therapeutic decision-making. Promote effective communication skills for patient care and interprofessional collaboration.",
  },
  {
    key: "about.objective3.desc",
    label: "Objective 03: Ethical & Holistic Medical Practice",
    section: "Aim & Objectives",
    type: "textarea",
    value: "Instill a strong sense of medical ethics, integrity, and responsibility towards patient welfare. Encourage a humanitarian approach in medical practice by blending scientific knowledge with empathy.",
  },
  {
    key: "about.objective4.desc",
    label: "Objective 04: Research & Continuous Learning",
    section: "Aim & Objectives",
    type: "textarea",
    value: "Foster critical thinking, research skills, and evidence-based medical practice. Cultivate a lifelong learning mindset to adapt to evolving medical advancements and healthcare needs.",
  },
  {
    key: "about.objective5.desc",
    label: "Objective 05: Community Health & Global Standards",
    section: "Aim & Objectives",
    type: "textarea",
    value: "Enhance healthcare accessibility by training graduates to serve diverse populations, particularly in underserved regions. Align education and healthcare practices with international standards to prepare graduates for global medical opportunities.",
  },
  {
    key: "about.objective_summary",
    label: "Aim & Objective Summary Note",
    section: "Aim & Objectives",
    type: "textarea",
    value: "With a structured five-year MBBS program followed by a one-year internship, UAMC ensures that graduates are well-prepared to contribute meaningfully to the medical field and society.",
  },

  // 5. Founder Members
  {
    key: "about.founder.1.desc",
    label: "Late Prof. Mohammad Yousuf Ali (Ex-Chairman, EC, BMSRI)",
    section: "Founder Members",
    type: "textarea",
    value: "Late Prof. Mohammad Yousuf Ali was a visionary leader and the Ex-Chairman of the Executive Committee, BMSRI, whose dedication laid the foundation for quality medical education in Bangladesh. His relentless efforts in establishing Bangladesh Medical College and UAMC have transformed the landscape of private medical education.",
  },
  {
    key: "about.founder.2.desc",
    label: "Late Prof. Abu Ahmed (Ex-Co-Chairman, EC, BMSRI)",
    section: "Founder Members",
    type: "textarea",
    value: "Late Prof. Abu Ahmed, Ex-Co-Chairman of the Executive Committee, BMSRI, was a visionary leader dedicated to enhancing medical education in Bangladesh. His contributions were instrumental in the growth of Bangladesh Medical College and UAMC, fostering excellence in healthcare and medical research.",
  },
  {
    key: "about.founder.3.desc",
    label: "Late Mr. M.M. Zaman (Ex-Co-Chairman, EC, BMSRI)",
    section: "Founder Members",
    type: "textarea",
    value: "A prominent philanthropist and organizer whose strategic vision helped secure the infrastructure and organizational strength necessary to pioneer the institution.",
  },
  {
    key: "about.founder.4.desc",
    label: "Late Prof. M.I. Chowdhury (Ex-Member, EC, BMSRI)",
    section: "Founder Members",
    type: "textarea",
    value: "Late Prof. M.I. Chowdhury, Ex-Member of the Executive Committee, BMSRI, was a distinguished academic and a passionate advocate for medical education. His dedication and contributions helped shape the foundation of Bangladesh Medical College and UAMC.",
  },
  {
    key: "about.founder.5.desc",
    label: "Late Prof. C. H. Kabir (Ex-Hony. Secretary, EC, BMSRI)",
    section: "Founder Members",
    type: "textarea",
    value: "Served with exemplary dedication to build robust academic curricula, international accreditations, and high ethical standards across all BMSRI medical faculties.",
  },
  {
    key: "about.founder.6.desc",
    label: "Late Mr. Sirajul Islam (Ex-Managing Director, SIT)",
    section: "Founder Members",
    type: "textarea",
    value: "Late Mr. Sirajul Islam, Ex-Managing Director of SIT, was a remarkable leader whose dedication and vision played a crucial role in shaping the future of Uttara Adhunik Medical College. His leadership and commitment to excellence continue to inspire the institution’s progress.",
  },
  {
    key: "about.founder.7.desc",
    label: "Late Mr. Abdul Barik (Ex-Managing Director, CSL)",
    section: "Founder Members",
    type: "textarea",
    value: "Played an essential role in the establishment and development of modern healthcare facilities and community outreach programs at UAMC.",
  },

  // 6. EC Members
  {
    key: "about.ec.1.desc",
    label: "Engr. Kh. Mesbahuddin Ahmed (Co-Chairman, EC, BMSRI)",
    section: "EC Members",
    type: "textarea",
    value: "Engr. Kh. Mesbahuddin Ahmed, Co-Chairman, EC, BMSRI, is a visionary leader committed to advancing medical education and healthcare services. His dedication and strategic guidance have significantly contributed to the growth of Uttara Adhunik Medical College & Hospital. Under his leadership, the institution continues to uphold excellence in medical training and patient care.",
  },
  {
    key: "about.ec.2.desc",
    label: "Maj. Gen. Md. Rafiqul Islam (Retd.) (Honorary Secretary, EC, BMSRI)",
    section: "EC Members",
    type: "textarea",
    value: "Maj. Gen. Md. Rafiqul Islam (Retd.), Honorary Secretary, EC, BMSRI, is a distinguished leader dedicated to enhancing medical education and healthcare services. His strategic vision and disciplined approach have played a crucial role in the development of Uttara Adhunik Medical College & Hospital. Through his leadership, the institution continues to thrive as a center of excellence in medical education and patient care.",
  },
  {
    key: "about.ec.3.desc",
    label: "Engr. G.M. Jainal Abedin Bhuiya (Honorary Treasurer, EC, BMSRI)",
    section: "EC Members",
    type: "textarea",
    value: "Engr. G.M. Jainal Abedin Bhuiya, Honorary Treasurer, EC, BMSRI, is a committed leader ensuring financial stability and growth for Uttara Adhunik Medical College & Hospital. His expertise in financial management has significantly contributed to the institution’s development and sustainability. Under his guidance, the college continues to expand its educational and healthcare services efficiently.",
  },

  // 7. GB Members
  {
    key: "about.gb.chairman.desc",
    label: "Prof. Dr. Farhad Haleem (Chairman, Governing Body, UAMC)",
    section: "GB Members",
    type: "textarea",
    value: "Professor Dr. Farhad Haleem, Chairman, Governing Body, UAMC, is a visionary leader dedicated to advancing medical education and healthcare excellence. Under his guidance, Uttara Adhunik Medical College continues to uphold high academic standards and innovative healthcare practices. His leadership ensures the institution's commitment to producing skilled medical professionals for the future.",
  },

  // 8. Address & Contact Information
  {
    key: "college.address",
    label: "College Main Address",
    section: "Address & Contact",
    type: "textarea",
    value: "House # 34, Road # 4, Sector # 9, Sonargaon Janapath, Uttara Model Town, Dhaka-1230, Bangladesh",
  },
  {
    key: "about.campus_address",
    label: "Campus & Hospital Location (Visit UAMC)",
    section: "Address & Contact",
    type: "textarea",
    value: "House - 34, Road - 4, Sector - 9, Sonargaon Janapath, Uttara Model Town, Dhaka-1230, Bangladesh",
  },
  {
    key: "about.visiting_hours",
    label: "Visiting Hours",
    section: "Address & Contact",
    type: "text",
    value: "Visiting Hours: 8:00 AM - 8:00 PM",
  },
  {
    key: "college.phone",
    label: "Phone Number",
    section: "Address & Contact",
    type: "text",
    value: "+880 2 8932330",
  },
  {
    key: "college.email",
    label: "Email Address",
    section: "Address & Contact",
    type: "text",
    value: "info@uamc.edu.bd",
  },
  {
    key: "college.location",
    label: "Location Area",
    section: "Address & Contact",
    type: "text",
    value: "Uttara, Dhaka-1230",
  },
];

async function main() {
  console.log("Upserting content items...");
  let created = 0;
  let updated = 0;

  for (const item of CONTENT_ITEMS) {
    const existing = await prisma.siteContent.findUnique({
      where: { key: item.key },
    });

    if (!existing) {
      await prisma.siteContent.create({
        data: item,
      });
      created++;
    } else {
      // Update label, section, type to keep metadata clean, preserve custom value if edited
      await prisma.siteContent.update({
        where: { key: item.key },
        data: {
          label: item.label,
          section: item.section,
          type: item.type,
        },
      });
      updated++;
    }
  }

  console.log(`Finished! Created: ${created}, Updated metadata: ${updated}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
