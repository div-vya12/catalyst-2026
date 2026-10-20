# CATALYST 2025 — Official Web Application & Junior Developer Handbook

> **Annual Undergraduate Academic Conference**  
> **Maulana Azad Medical College (MAMC), New Delhi**  
> *Dates: 1st – 3rd December 2025*  
> *Tagline:* **Learn. Practice. Innovate.**  
> *Motto:* *"Wherever the art of medicine is loved, there is love for humanity"* — Hippocrates

---

## 📖 1. Context & Executive Overview (For Juniors)

Welcome to the **CATALYST 2025** web platform codebase! This application serves as the central digital hub for Maulana Azad Medical College's premier undergraduate medical conference, jointly hosted by:
1. **Scientific Society of Maulana Azad Medical College (MASS)** (`@mamcscisoc`)
2. **Maulana Azad Finance & Innovation Alliance (MAFIA)** (`@mafia_mamc`)

### Target Audience & Scope
- **Participants**: MBBS undergraduates (1st year through final year) and compulsory rotatory interns from across India, plus postgraduate residents for select events.
- **Components**:
  - **8 Advanced Clinical & Simulation Workshops**: High-fidelity CPR simulations, surgical suturing on models & bowel anastomosis, ophthalmology wet-lab on goat eyes, ECG masterclasses, obstetrics emergency drills (PPH & shoulder dystocia), trauma orthopaedic first aid, arterial blood gas (ABG) interpretation, and biochemistry molecular biology diagnostics.
  - **5 Flagship Academic Competitions**: Clinical Case Presentations (*Case Files*), Research Paper Presentations (*Inquistador*), 3-track Med-Tech *Hackathon*, ER Simulation Game Show (*MedVenture*), and Creative Scientific Ideation (*RickThinking Reviews*).
  - **3 MAFIA Business & Strategy Events**: Problem-solving group discussions (*The Boardroom*), 2-Day Clinic & Startup Masterclass (*Business Bootcamp*), and Market Trading Simulation (*Venture Wars*) featuring ₹6,000+ cash prizes.
  - **Campus Accommodation**: Dedicated lodging facility within walking distance of MAMC and Lok Nayak (LNJP) Hospital.

---

## 🛠️ 2. Technology Stack & Design Architecture

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | **Next.js 14 (App Router)** | Full-stack React + Node.js serverless framework natively optimized for Vercel deployment with zero cold starts. |
| **Language** | **TypeScript 5** | Strict type safety for complex conference datasets, schedule matrices, and fee algorithms. |
| **Styling** | **Tailwind CSS 3** | Responsive, modern utility classes with custom dark medical glassmorphism (`#03060c` to `#0a192f`) and cyan neon highlights (`#00f0ff`). |
| **Icons** | **Lucide React** | Medical, clinical, and UI vector icons (Stethoscope, Activity, Sparkles, etc.). |
| **Interactivity** | **Canvas Confetti & CSS3** | Visual celebrations upon registration, dynamic countdown timers, and smooth filter transitions. |
| **Backend API** | **Next.js Route Handlers (Node.js)** | Serverless endpoints at `/api/register` with server-side pricing verification. |
| **Deployment** | **Vercel** | Automated continuous delivery, edge routing, and automated preview branches. |

---

## 📁 3. Project File Tree & Codebase Layout

```text
catalyst-2025/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Actions CI test & build pipeline
├── public/                       # Static public assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── register/
│   │   │       └── route.ts      # Node.js API for registration validation & order prep
│   │   ├── globals.css           # Tailwind directives, glass-card styles & ECG animations
│   │   ├── layout.tsx            # Global HTML shell, SEO metadata & font definitions
│   │   └── page.tsx              # Main conference landing page assembling all components
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky header with quick anchors, WhatsApp & Register CTA
│   │   ├── Hero.tsx              # Hero with Hippocrates quote, live countdown, & stats
│   │   ├── LateUpdateBanner.tsx  # Breaking update for MedVenture & RickThinking Reviews
│   │   ├── WorkshopsSection.tsx  # 8 clinical workshops with department filtering & syllabus modal
│   │   ├── AcademicEventsSection.tsx # 5 competitions (Case Files, Inquistador, Hackathon, etc.)
│   │   ├── MafiaSection.tsx      # MAFIA business competitions with ₹6k cash prize highlights
│   │   ├── ScheduleSection.tsx   # Interactive 3-day timeline with event type filters
│   │   ├── AccommodationSection.tsx # Walking distance accommodation details & student helpdesk
│   │   ├── OrganizersSection.tsx # MASS & MAFIA leadership directories with direct call buttons
│   │   ├── Footer.tsx            # Official footer, Hippocrates quote & MAMC campus address
│   │   └── RegisterModal.tsx     # Interactive registration modal with dynamic fee calculation
│   ├── data/
│   │   └── conferenceData.ts     # Complete typed single source of truth for the conference
│   └── types/
│       └── conference.ts         # TypeScript interfaces for all conference entities
├── next.config.mjs               # Next.js bundler configuration
├── package.json                  # Dependencies and execution scripts
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Custom medical navy & cyan color palette
├── tsconfig.json                 # Strict TypeScript configuration
└── vercel.json                   # Zero-configuration Vercel deployment manifest
```

---

## ⚙️ 4. Quick Start for Junior Developers

### 1. Clone & Enter Project
```bash
git clone <your-repo-url>
cd catalyst-2025
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. Changes in `src/` will hot-reload automatically.

### 4. Run Production Build & Typecheck
```bash
npm run build
```
This executes the TypeScript compiler (`tsc`) and Next.js static asset optimization.

---

## 🧮 5. Business Logic & Special Conference Rules

Junior developers maintaining the registration and pricing engine must be aware of the following rules defined in `conferenceData.ts`:

### A. Late Academic Event Update (2025-11-30)
- Applies to **MedVenture** and **RickThinking Reviews**.
- **No Basic Registration (BR)** is required to participate.
- **MAMC Students**: Pay **₹0 (Free)**. They upload their college ID in the verification section.
- **Non-Maulanians**: Pay a minimal token fee of **₹50**.
- Note: No delegate kits or physical materials are provided for these two events.

### B. Biochemistry Technique Workshop ("Molecules in Motion") Bundle Rule
- **FREE** for participants who register for **2 or more** other CATALYST '25 workshops.
- **₹100** for participants who register for fewer than 2 workshops.

### C. Orthopaedic Workshop ("The Skeletal Frontier")
Features a multi-slot structure:
- **Slot 1**: Lecture and demonstration by HOD Orthopaedics (Dr. Sumit Sural).
- **Group 1**: Practical plaster application on peers, splints & traction.
- **Group 2**: Spinal injury handling, helmet removal in RTA cases, cervical collar, and log-roll transfer.

---

## 🚀 6. Automated Vercel Deployment

This project is tailored for **zero-configuration deployment on Vercel**.

### Method 1: Automatic Git Integration (Recommended)
1. Push your repository to GitHub or GitLab:
   ```bash
   git init
   git add .
   git commit -m "feat: initial catalyst 2025 landing page release"
   git branch -M main
   git remote add origin https://github.com/<your-org>/catalyst-2025.git
   git push -u origin main
   ```
2. Log in to [vercel.com](https://vercel.com).
3. Click **Add New...** -> **Project** -> Select your repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **Deploy**. Every subsequent commit to `main` deploys to production automatically, and pull requests generate instant preview URLs!

### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 🗺️ 7. Architecture Roadmap: User Auth, Database & Payment Gateway

As noted in the project roadmap, the next phase involves adding full user authentication, persistent database storage, and live payment processing. Here is the recommended implementation blueprint:

### 1. Database Layer (Prisma ORM + PostgreSQL / Supabase)
Install Prisma:
```bash
npm install prisma @prisma/client
npx prisma init
```

Recommended Prisma Schema (`prisma/schema.prisma`):
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String         @id @default(cuid())
  name          String
  email         String         @unique
  phone         String
  college       String
  isMaulanian   Boolean        @default(false)
  collegeIdUrl  String?
  registrations Registration[]
  createdAt     DateTime       @default(now())
}

model Registration {
  id            String         @id @default(cuid())
  ticketCode    String         @unique
  userId        String
  user          User           @relation(fields: [userId], references: [id])
  eventIds      String[]
  amountPaid    Int
  paymentStatus PaymentStatus  @default(PENDING)
  paymentId     String?
  createdAt     DateTime       @default(now())
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}
```

### 2. User Authentication (NextAuth.js v5 / Auth.js)
```bash
npm install next-auth@beta
```
- Setup Google OAuth or Magic Link Email login in `src/app/api/auth/[...nextauth]/route.ts`.
- MAMC students can automatically be detected by matching `@mamc.ac.in` domain or by verified college ID upload.

### 3. Payment Gateway (Razorpay or Stripe)
- Initialize server-side Razorpay order inside `src/app/api/register/route.ts`:
  ```typescript
  import Razorpay from "razorpay";
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
  ```
- Verify webhook signature on successful UPI / Card transaction to mark ticket status as `COMPLETED`.

---

## 📞 8. Organizing Contacts Directory

- **Scientific Society of MAMC (MASS)**:
  - Mananya Muskan: `+91 7897976027`
  - Paras Jain: `+91 9289691376`
  - Vanshika Gupta: `+91 8595588026`
- **Maulana Azad Finance & Innovation Alliance (MAFIA)**:
  - Prachi Jindal: `+91 7428401208`
  - Arush Lall: `+91 9667138880`
- **Official Announcement Group**: [Join WhatsApp Broadcast](https://chat.whatsapp.com/Fm4d79z5MPAHbStY0avOZk?mode=wwt)
