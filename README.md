# CATALYST 2026 — Official Web Application & Junior Developer Handbook

> **Annual Undergraduate Academic Conference**  
> **Maulana Azad Medical College (MAMC), New Delhi**  
> *Dates: 18th – 20th November 2026*  
> *Tagline:* **Learn. Practice. Innovate.**

---

## 📖 1. Context & Executive Overview (For Juniors)

Welcome to the **CATALYST 2026** web platform codebase! This application serves as the central digital platform for Maulana Azad Medical College's premier national undergraduate medical conference, jointly hosted by:
1. **Scientific Society of Maulana Azad Medical College (MASS)** (`@mamcscisoc`)
2. **Maulana Azad Finance & Innovation Alliance (MAFIA)** (`@mafia_mamc`)

### Target Audience & Scope
- **Participants**: MBBS undergraduates (1st year through final year) and compulsory rotatory interns from across India, plus postgraduate residents for select events.
- **Conference Dates**: **18th, 19th & 20th November 2026** at the MAMC campus, New Delhi.
- **Components**:
  - **8 Advanced Clinical & Simulation Workshops**: High-fidelity CPR simulations, surgical suturing on models & bowel anastomosis, ophthalmology wet-lab on goat eyes, ECG masterclasses, obstetrics emergency drills (PPH & labour management), trauma orthopaedic first aid, arterial blood gas (ABG) interpretation, and biochemistry molecular biology diagnostics.
  - **5 Flagship Academic Competitions**: Clinical Case Presentations (*Case Files*), Research Paper Presentations (*Inquistador*), 3-track Med-Tech *Hackathon*, ER Simulation Game Show (*MedVenture*), and Creative Scientific Ideation (*RickThinking Reviews*).
  - **3 MAFIA Business & Strategy Events**: Problem-solving group discussions (*The Boardroom*), 2-Day Clinic & Startup Masterclass (*Business Bootcamp*), and Market Trading Simulation (*Venture Wars*) featuring ₹6,000+ cash prizes.
  - **Campus Accommodation**: Dedicated lodging facility within walking distance of MAMC and Lok Nayak (LNJP) Hospital.

---

## 🎨 2. Minimal Design Philosophy & Mobile-First Principles

Per design specifications, the platform follows a **clean, minimal, and content-focused aesthetic**:
- **Palette**: Deep neutral background (`#090a0f`), crisp white typography, subtle zinc borders (`border-zinc-800`), eliminating heavy purple gradients and flashy glows.
- **Interactive Background**: Custom HTML5 Canvas (`InteractiveCanvas.tsx`) responding to cursor movement on desktop and touch gestures on Android and iOS devices.
- **Landing Hero Card**: Clear, concise, and focused on 3 direct options:
  1. **Register** (Primary CTA linking to the dedicated `/register` page)
  2. **Explore Events** (Smooth-scroll to workshops & competitions)
  3. **Check Existing Registration** (Lookup modal to retrieve tickets by ID, email, or phone)
- **Footer Channels**: The official WhatsApp Broadcast link is located in the footer, alongside the college's official LinkedIn page and society Instagram handles.

---

## 🛠️ 3. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | **Next.js 14 (App Router)** | Full-stack React + Node.js serverless framework natively optimized for Vercel deployment with zero cold starts. |
| **Language** | **TypeScript 5** | Strict type safety for complex conference datasets, schedule matrices, and fee algorithms. |
| **Styling** | **Tailwind CSS 3** | Responsive, minimal utility classes designed for mobile ergonomics and iOS/Android touch targets. |
| **Icons** | **Lucide React** | Minimal vector icons (Calendar, MapPin, Search, ArrowRight, etc.). |
| **Canvas** | **HTML5 2D Canvas** | Hardware-accelerated interactive particle system with zero external runtime dependencies. |
| **Backend API** | **Next.js Route Handlers (Node.js)** | Serverless endpoints at `/api/register` with server-side fee verification. |
| **Deployment** | **Vercel** | Automated continuous delivery, edge routing, and automated preview branches. |

---

## 📁 4. Project Directory Layout

```text
catalyst-2025/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Actions CI test & build pipeline
├── public/                         # Static public assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── register/
│   │   │       └── route.ts        # Node.js API for registration validation & order prep
│   │   ├── register/
│   │   │   └── page.tsx            # Dedicated registration page
│   │   ├── globals.css             # Minimal Tailwind directives & card styles
│   │   ├── layout.tsx              # Global HTML shell, SEO metadata & Inter font
│   │   └── page.tsx                # Main conference landing page
│   ├── components/
│   │   ├── Navbar.tsx              # Minimal sticky header with primary Register button
│   │   ├── Hero.tsx                # Clean hero card with 3 options: Register, Explore, Check Reg
│   │   ├── InteractiveCanvas.tsx   # Touch & cursor reactive background
│   │   ├── CheckRegistrationModal.tsx # Interactive delegate lookup modal
│   │   ├── LateUpdateBanner.tsx    # Policy update banner for MedVenture & RickThinking
│   │   ├── WorkshopsSection.tsx    # 8 clinical workshops with department filtering & syllabus modal
│   │   ├── AcademicEventsSection.tsx # 5 academic competitions
│   │   ├── MafiaSection.tsx        # MAFIA business competitions with ₹6k cash prize highlights
│   │   ├── ScheduleSection.tsx     # 3-day timeline (18th – 20th November 2026)
│   │   ├── AccommodationSection.tsx # Walking distance accommodation details & student helpdesk
│   │   └── Footer.tsx              # WhatsApp broadcast, MAMC LinkedIn, & Instagram channels
│   ├── data/
│   │   └── conferenceData.ts       # Single source of truth for CATALYST 2026
│   └── types/
│       └── conference.ts           # TypeScript interfaces for conference entities
├── next.config.mjs                 # Next.js bundler configuration
├── package.json                    # Dependencies and scripts
├── tailwind.config.ts              # Minimal theme configuration
├── tsconfig.json                   # Strict TypeScript configuration
└── vercel.json                     # Vercel deployment manifest
```

---

## ⚙️ 5. Development Workflow

```bash
# 1. Install dependencies
npm install

# 2. Run development server (runs on http://localhost:3000)
npm run dev

# 3. Production build & typecheck
npm run build
```

---

## 🧮 6. Conference Registration & Fee Rules

1. **Dates**: **18th – 20th November 2026** (Day 1: 18th Nov, Day 2: 19th Nov, Day 3: 20th Nov).
2. **MedVenture & RickThinking Reviews Policy**:
   - No Basic Registration (BR) required.
   - MAMC Students: **FREE (₹0)** with College ID.
   - Non-Maulanians: Minimal fee of **₹50**.
3. **Molecules in Motion (Biochemistry) Bundle**:
   - **FREE** if registered for 2 or more other workshops under Catalyst '26.
   - **₹100** if registered for fewer than 2 workshops.
4. **MAFIA Events**:
   - The Boardroom: ₹99
   - Business Bootcamp: ₹349 early bird / ₹549
   - Venture Wars: ₹249 per team

---

## 🌐 7. Official Communication Channels

- **Official WhatsApp Announcement Community**: In footer
- **Maulana Azad Medical College Official LinkedIn**: `https://www.linkedin.com/school/maulana-azad-medical-college-delhi/`
- **Scientific Society Instagram**: `@mamcscisoc`
- **MAFIA Society Instagram**: `@mafia_mamc`
