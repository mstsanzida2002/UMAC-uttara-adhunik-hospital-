# Uttara Adhunik Medical College (UAMC) — Front-End Application

An institutional web platform for **Uttara Adhunik Medical College & Hospital (UAMC)**, built with Next.js App Router, Tailwind CSS, and TypeScript. Reconstructed 1:1 from official Figma design specifications with complete visual fidelity, responsive layouts, and zero-compromise design standards.

---

## 🌟 Key Features & Pages

- **Home / Landing Page (`/`)**: Dynamic hero carousel, statistics counters, departments showcase, principal's message, news highlights, and notice ticker.
- **About UAMC (`/about`)**: Historical timeline, mission & vision, organizational leadership, governing body, and institutional background.
- **Facilities (`/facilities`)**: Hospital clinical services, departmental infrastructure, library, medical education unit (MEU), research, training, and student accommodation.
- **Admissions (`/admissions`)**: Interactive tabbed portal for admission procedure & fees, required documents checklist, application form guidelines, and admission results.
- **Notice & Media (`/notice`)**: Complete notice board with category filtering (*General Notice*, *Admission*, *Reports*, *Job Circular*), publications & tenders, alumni events, and Bengali media gallery.
- **Career & Contact (`/career` & `/contact`)**: Current faculty & clinical job openings, employment requirements, and official contact dispatch form.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, full type safety)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom design tokens
- **Typography**: Google Fonts — *Bitter* (Serif display & headings) and *Inter* (Body & UI text)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Optimization**: `next/image` with responsive sizing and priority LCP handling

---

## 🎨 Design System & Palette

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Brand Primary Green** | `#018837` | Primary brand accent, active indicators, titles, button fills |
| **Brand Green Dark** | `#016F2C` | Button hover states and dark green accents |
| **Brand Gold / Yellow** | `#FECD2F` | Badges, category tags, notification highlights |
| **Dark Charcoal** | `#262626` | Hero headline text, high-contrast headings |
| **Muted Slate** | `#444444` / `#737477` | Body paragraph text and subheadings |
| **Soft Mint Tint** | `#E6F4EC` / `rgba(1,136,55,0.1)` | Card backgrounds, pill tags, container backgrounds |
| **Date Pill Lavender** | `#E8E8F4` | Notice date badges and search background |

---

## 🚀 Getting Started Locally

### Prerequisites

Ensure you have installed:
- [Node.js](https://nodejs.org/) (version **18.18+** or **20+** recommended)
- `npm`, `yarn`, or `pnpm`

### 1. Clone or Open the Repository

```bash
cd uttara-adunik-medical-college
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```
uttara-adunik-medical-college/
├── app/
│   ├── (site)/
│   │   ├── about/page.tsx          # About page (Server Component)
│   │   ├── admissions/page.tsx     # Admissions page (Server Component)
│   │   ├── career/page.tsx         # Career page (Server Component)
│   │   ├── contact/page.tsx        # Contact page (Server Component)
│   │   ├── departments/page.tsx    # Departments directory
│   │   ├── facilities/page.tsx     # Facilities showcase
│   │   ├── notice/page.tsx         # Notice & Media page (Server Component)
│   │   ├── layout.tsx              # Site layout (Navbar & Footer)
│   │   └── page.tsx                # Homepage
│   ├── globals.css                 # Tailwind v4 theme & typography
│   └── layout.tsx                  # Root HTML shell
├── components/
│   ├── admissions/                 # Admissions tabbed content ('use client')
│   ├── career/                     # Career & contact forms ('use client')
│   ├── notice/                     # Notice board & media gallery ('use client')
│   ├── shared/                     # Header/Navbar, Footer, Search, UI components
│   └── home/                       # Homepage modular sections
└── public/
    └── assets/                     # Logos, crests, and medical vector illustrations
```

---

## 🔒 Security & Performance

- **Zero Hardcoded Secrets**: All private API tokens and environment secrets are excluded from source files.
- **Server/Client Separation**: Interactive UI hooks (`useState`, `useSearchParams`) are isolated to dedicated Client Components wrapped in `<Suspense>`, preserving Server Component SEO metadata.
- **Production Optimized**: Passes `npm run build` and `npx tsc --noEmit` cleanly with all routes statically pre-rendered.

---

## 📄 License

Proprietary — Developed by **Sakin Bin Jabed** for **Uttara Adhunik Medical College & Hospital**. All rights reserved.
