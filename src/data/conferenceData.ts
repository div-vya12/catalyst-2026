import { ConferenceData } from "@/types/conference";

export const conferenceData: ConferenceData = {
  conference: {
    name: "CATALYST 2026",
    type: "Annual Undergraduate Academic Conference",
    institution: "Maulana Azad Medical College (MAMC)",
    city: "New Delhi",
    start_date: "2026-11-18",
    end_date: "2026-11-20",
    display_dates: "18th – 20th November 2026",
    tagline: "Learn. Practice. Innovate.",
    description:
      "MAMC's annual national conference featuring hands-on simulation workshops, academic competitions, and healthcare innovation events for MBBS students across India.",
    eligibility_general:
      "Academic events are open to all MBBS students (1st year to interns). Workshops are open to Maulanians and Non-Maulanians via dedicated registration forms.",
    organizers: [
      {
        name: "Scientific Society of Maulana Azad Medical College (MASS)",
        short_name: "MASS",
        instagram: "@mamcscisoc",
      },
      {
        name: "Maulana Azad Finance & Innovation Alliance (MAFIA)",
        short_name: "MAFIA",
        instagram: "@mafia_mamc",
      },
    ],
    announcement_group_whatsapp:
      "https://chat.whatsapp.com/Fm4d79z5MPAHbStY0avOZk?mode=wwt",
    institution_linkedin:
      "https://www.linkedin.com/school/maulana-azad-medical-college-delhi/",
    general_contacts: {
      MASS: [
        { name: "Mananya Muskan", phone: "+91 7897976027" },
        { name: "Paras Jain", phone: "+91 9289691376" },
        { name: "Vanshika Gupta", phone: "+91 8595588026" },
      ],
      MAFIA: [
        { name: "Prachi Jindal", phone: "+91 7428401208" },
        { name: "Arush Lall", phone: "+91 9667138880" },
      ],
    },
  },

  registration_info: {
    workshop_form_release_schedule: {
      date: "2026-11-05",
      slots: [
        { workshop_day: "18th November workshops", form_release_time: "1:00 PM" },
        { workshop_day: "19th November workshops", form_release_time: "4:00 PM" },
        { workshop_day: "20th November workshops", form_release_time: "6:00 PM" },
      ],
    },
    notes: [
      "Workshop seats are limited and allotted on a first-come, first-served basis.",
      "Some workshop slots may overlap – check the schedule carefully before registering for multiple workshops on the same day.",
      "Organisers will try to assign non-clashing sessions to participants registering for multiple slots, but this cannot be guaranteed in all cases.",
    ],
    late_academic_event_update: {
      applies_to: ["MedVenture", "RickThinking Reviews"],
      date_of_update: "2026-11-15",
      points: [
        "No Basic Registration (BR) required to participate.",
        "MAMC students pay no fee; upload college ID in registration.",
        "Non-Maulanians pay a minimal entry fee of ₹50.",
        "No delegate kits or additional physical materials will be provided.",
      ],
    },
  },

  workshops: [
    {
      id: "code-nebula",
      name: "CODE NEBULA",
      subtitle: "Anaesthesia Workshop – Fundamentals of Anaesthesia & Airway Management",
      tagline: "Where Simulation Meets Survival",
      department: "Anaesthesia",
      description:
        "MAMC's premier simulator-based emergency workshop. Master CPR, airway management, and oxygen therapy through high-fidelity simulations using advanced manikins and training models.",
      whats_in_store: [
        "CPR and lifesaving emergency skills",
        "Airway management and oxygen therapy protocols",
        "Emergency response readiness under critical situations",
        "Hands-on simulation with mannequins and dummies",
        "Use of AED (Automated External Defibrillator) made practical",
      ],
      date: "2026-11-18",
      display_date: "18th November 2026",
      time: "11:00 AM – 3:30 PM",
      venue: "PGMET Lab, BL Taneja Block, MAMC",
      registration: {
        form_release: "5 November 2026, 1:00 PM",
        maulanian_url: "https://forms.gle/w3Lgg6FbSP2gDcRe7",
        non_maulanian_url: "https://forms.gle/godTdeX2TcXR1V8v5",
      },
      fee: null,
      contacts: [
        { name: "Abhilasha Meena", phone: "+91 9898514569" },
        { name: "Amrita Roy", phone: "+91 8768494909" },
      ],
    },
    {
      id: "know-your-knots",
      name: "KNOW YOUR KNOTS",
      subtitle: "Basic Surgical Skills Workshop",
      tagline: "Make your first incision into the world of surgery",
      department: "Surgery",
      description:
        "A hands-on surgical workshop to hone basic surgical skills – suturing, knot tying, and instrument handling – to take your first confident step into the operating theatre.",
      whats_in_store: [
        "Surgical asepsis: hand hygiene & donning–doffing",
        "Hands-on suturing: knotting, instrument handling & closure techniques",
        "Bowel perforation management & anastomosis training models",
      ],
      date: "2026-11-18 and 2026-11-19",
      display_date: "18th & 19th November 2026",
      sessions: [
        { date: "18th November 2026", time: "11:00 AM – 3:00 PM" },
        { date: "19th November 2026", time: "9:00 AM – 12:30 PM" },
        { date: "19th November 2026", time: "1:00 PM – 4:30 PM" },
      ],
      venue: "PGMET Lab, BL Taneja Block, MAMC, New Delhi",
      registration: {
        form_release: "5 November 2026, 6:00 PM",
        maulanian_url: "https://forms.gle/HFWyxyQ5KFfbsztYA",
        non_maulanian_url: "https://forms.gle/AqBGSSgmxvGGT3As7",
      },
      fee: null,
      contacts: [
        { name: "Anchit Patel", phone: "+91 8529381376" },
        { name: "Kirti Sachdeva", phone: "+91 9311246300" },
      ],
    },
    {
      id: "optic-odyssey",
      name: "THE OPTIC ODYSSEY",
      subtitle: "Ophthalmology Skills Workshop – Clinical Pearls",
      tagline: "Sharpen your vision, surgical precision, and diagnostic depth",
      department: "Ophthalmology",
      description:
        "A full-day hands-on Ophthalmology wet-lab covering core ocular procedures from examination to surgery, built to develop precision, skill and confidence.",
      whats_in_store: [
        "Fundamentals of ophthalmic exam: fundoscopy and tonometry (using goat eyes)",
        "Hands-on suturing techniques on goat eyes for surgical micro-precision",
        "Introduction to Extracapsular Cataract Extraction (ECCE) – guided practice",
        "Early detection and timely surgical triage of common ocular emergencies",
      ],
      date: "2026-11-19",
      display_date: "19th November 2026",
      time: "8:00 AM – 5:00 PM",
      venue: "Guru Nanak Eye Centre (GNEC), MAMC, New Delhi",
      registration: {
        form_release: "5 November 2026, 4:00 PM",
        maulanian_url: "https://forms.gle/YrnZPzNRtZ8zVhju5",
        non_maulanian_url: "https://forms.gle/sfMmpuPCjduJY6bd7",
      },
      fee: null,
      contacts: [
        { name: "Anchit Patel", phone: "+91 8529381376" },
        { name: "Ansh Agarwal", phone: "+91 8000230796" },
      ],
    },
    {
      id: "rhythm-unravelled",
      name: "RHYTHM UNRAVELLED",
      subtitle: "ECG Masterclass – Department of Medicine",
      tagline: "Unravel the rhythm, master the beat – every heartbeat tells a story",
      department: "Medicine",
      description:
        "A hands-on masterclass to build diagnostic mastery in recording, reading, interpreting and applying ECGs in real emergency and clinical settings.",
      whats_in_store: [
        "Core ECG electrophysiology and vector principles",
        "Lead placement demonstration and electrode physics",
        "Step-by-step systemic guide to complex ECG interpretation",
        "Case-based discussions of clinical tachyarrhythmias, STEMIs & blocks",
      ],
      date: "2026-11-19",
      display_date: "19th November 2026",
      time: "2:00 PM – 4:00 PM",
      venue: "New Lecture Theatre, Ground Floor, Academic Block, MAMC",
      registration: {
        form_release: "5 November 2026, 4:00 PM",
        maulanian_url: "https://forms.gle/Qv93JqTqS7wKVvvP6",
        non_maulanian_url: "https://forms.gle/Y9E9KXZSPvVwdGXE6",
      },
      fee: null,
      contacts: [
        { name: "Utkarsh Sharma", phone: "+91 9821769423" },
        { name: "Paras Jain", phone: "+91 9289691376" },
      ],
    },
    {
      id: "genesis-protocol",
      name: "THE GENESIS PROTOCOL",
      subtitle: "Comprehensive Obstetrics & Gynaecology Workshop",
      tagline: "From labour to life – learn, practice, and perfect",
      department: "Obstetrics & Gynaecology",
      description:
        "Curated exclusively for medical students: hands-on simulation training in normal labour, emergency obstetric drills, and pelvic examination.",
      whats_in_store: [
        "Management of labour stages and early complication identification",
        "AMTSL & PPH Drill: active management and rapid postpartum haemorrhage triage",
        "Maternal collapse management & life support algorithms",
        "Normal vaginal delivery & episiotomy repair simulation models",
      ],
      date: "2026-11-19",
      display_date: "19th November 2026",
      time: "1:00 PM – 4:00 PM",
      venue: "Department of Obstetrics & Gynaecology, MAMC & LNJP Hospital",
      registration: {
        form_release: "5 November 2026, 4:00 PM",
        maulanian_url: "https://forms.gle/EHCnZczYXQahtfav6",
        non_maulanian_url: "https://forms.gle/rjQLT7oSoAi5DAJJ6",
      },
      fee: null,
      contacts: [
        { name: "Kavya Mehta", phone: "+91 8950284902" },
        { name: "Dakshita Bhardwaj", phone: "+91 7303532735" },
      ],
    },
    {
      id: "skeletal-frontier",
      name: "THE SKELETAL FRONTIER",
      subtitle: "Orthopaedic First Aid & Fracture Management",
      tagline: "Get ready to roll, splint, and save lives in trauma care",
      department: "Orthopaedics",
      description:
        "Hands-on trauma workshop to build reflexes in musculoskeletal emergency triage, spinal immobilisation, and fracture management.",
      whats_in_store: [
        "Interactive instruction on Basic Orthopaedic First Aid",
        "Supervised practice in splints, traction, and plaster application",
        "Log-roll technique demonstration for safe spinal trauma transfer",
        "Cervical collar application and helmet removal in road accidents",
      ],
      detailed_format: {
        total_slots: 3,
        slot_1_demonstration_and_expert_sessions: [
          "Demo lecture by Dr. Sumit Sural (HOD Orthopaedics)",
          "Introduction to Orthopaedic First Aid in trauma",
          "Live demonstration of Splints, Traction & Orthosis",
          "Plaster Application demo & X-ray interpretation basics",
        ],
        hands_on_sessions: {
          description: "Hands-on rotations divided into small batches.",
          group_1: [
            "Plaster application on peers",
            "Splints & Traction immobilization",
          ],
          group_2: [
            "Spinal injury patient handling & Log-roll technique",
            "Helmet removal in RTA cases & Cervical collar",
            "Sling preparation & crepe bandaging",
          ],
        },
      },
      date: "2026-11-20",
      display_date: "20th November 2026",
      time: "2:00 PM – 5:00 PM",
      venue: "Orthopaedic Block, LNJP (Lok Nayak) Hospital, New Delhi",
      registration: {
        form_release: "5 November 2026, 6:00 PM",
        maulanian_url: "https://forms.gle/2UK6fWsSG3YzHMqy5",
        non_maulanian_url: "https://forms.gle/Uf32XC4ko2Pt12Au8",
      },
      fee: null,
      contacts: [
        { name: "Ajitesh Dash", phone: "+91 8178405394" },
        { name: "Priyanshi", phone: "+91 8619929994" },
      ],
    },
    {
      id: "echoes-of-equilibrium",
      name: "ECHOES OF EQUILIBRIUM",
      subtitle: "ABG Analysis Simplified – Department of Medicine",
      tagline: "Where acid-base meets clinical clarity",
      department: "Medicine",
      description:
        "A guided, hands-on masterclass that simplifies Arterial Blood Gas (ABG) interpretation, bridging physiological theory with ICU medicine.",
      whats_in_store: [
        "Fundamentals of acid-base disorders and Henderson-Hasselbalch equations",
        "Demonstration of arterial puncture and sampling techniques",
        "Systematic step-by-step interpretation of complicated mixed disorders",
        "Small-group case discussions on critical ICU cases",
      ],
      date: "2026-11-20",
      display_date: "20th November 2026",
      time: "2:00 PM – 4:00 PM",
      venue: "New Lecture Theatre, Maulana Azad Medical College",
      registration: {
        form_release: "5 November 2026, 6:00 PM",
        maulanian_url: "https://forms.gle/KJAt2UK7YWmRg9kw8",
        non_maulanian_url: "https://forms.gle/isKQmsRSeBpdh6Ju7",
      },
      fee: null,
      contacts: [
        { name: "Aadya Roy", phone: "+91 9971483808" },
        { name: "Mananya Muskan", phone: "+91 7897976027" },
      ],
    },
    {
      id: "molecules-in-motion",
      name: "MOLECULES IN MOTION",
      subtitle: "Biochemistry & Molecular Diagnostics Techniques",
      tagline: "Explore cutting-edge molecular biology techniques of modern labs",
      department: "Biochemistry",
      description:
        "A guided, hands-on workshop by the Department of Biochemistry for MBBS students to practice PCR, DNA isolation, and automated diagnostic workflows.",
      whats_in_store: [
        "Hands-on DNA extraction from biological samples",
        "Gel electrophoresis for DNA separation and UV visualization",
        "Introduction to automated diagnostic molecular machinery",
        "Guided round of modern clinical biochemistry laboratories",
      ],
      date: "2026-11-20",
      display_date: "20th November 2026",
      time: "9:30 AM – 1:00 PM",
      venue: "Department of Biochemistry, 4th Floor, Academic Block, GIPMER",
      registration: {
        form_release: null,
        maulanian_url: "https://forms.gle/aNHJCFPTsCSBKNXH9",
        non_maulanian_url: "https://forms.gle/aNHJCFPTsCSBKNXH9",
        note: "Single registration link for all participants",
      },
      fee: {
        free_condition: "FREE if registered for 2 or more workshops under Catalyst '26",
        paid_condition: "₹100 if registered for fewer than 2 workshops",
      },
      contacts: [
        { name: "Megh Chhabda", phone: "+91 9421131610" },
        { name: "Mananya Muskan", phone: "+91 7897976027" },
      ],
    },
  ],

  academic_events: [
    {
      id: "case-files",
      name: "CASE FILES",
      subtitle: "Clinical Case Presentation Competition",
      organizer: "MASS",
      tagline: "Present intriguing medical cases via structured posters",
      description:
        "Share clinical discoveries with esteemed MAMC faculty and peer researchers, and gain constructive feedback from expert juries.",
      eligibility: "All MBBS students (1st year to interns)",
      format: "Two rounds",
      rounds: [
        {
          round: 1,
          name: "Online Screening Round",
          mode: "Online",
          submission_format: "PDF only",
          abstract_specifications: {
            word_limit: "300–350 words (references not included)",
            required_headings: [
              "Title of the study",
              "Introduction",
              "Clinical case – history, examination, investigations, management",
              "Conclusion",
              "References (Vancouver system)",
            ],
          },
          rules: [
            "Only individual entries will be considered.",
            "Plagiarism leads to immediate disqualification.",
            "No personal or institutional identity marks in abstract.",
          ],
          file_naming: "YourName_CaseCatalystMAMC2026",
          submission_deadline: "2026-11-10T12:00:00+05:30",
          display_deadline: "10th November 2026, 12:00 PM",
        },
        {
          round: 2,
          name: "Offline Poster Defense",
          mode: "Offline",
          description:
            "Top 15 shortlisted entries present their case poster before faculty at MAMC.",
          date: "2026-11-19",
          display_date: "19th November 2026",
          time: "9:00 AM onwards",
        },
      ],
      prizes: "Cash prizes & certificates for top presenters",
      registration_url: "https://forms.gle/4tFP1PhcyMSmjSUP9",
      contacts: [
        { name: "Ansh Agarwal", phone: "+91 8000230796" },
        { name: "Vanshika Gupta", phone: "+91 8595588026" },
      ],
    },
    {
      id: "inquistador",
      name: "INQUISTADOR",
      subtitle: "Oral Research Paper Presentation",
      organizer: "MASS",
      tagline: "Defend your original research and systematic reviews",
      description:
        "Present your medical research papers to top clinical faculty and student researchers with live Q&A defense.",
      eligibility: "All MBBS students (1st year to interns)",
      format: "Two rounds",
      rounds: [
        {
          round: 1,
          name: "Online Screening Round",
          mode: "Online",
          submission_format: "Abstract in PDF format",
          abstract_types_accepted: [
            "Original Research",
            "Systematic Reviews and Meta-Analysis",
          ],
          abstract_specifications: {
            word_limit: "400 words (title and references not included)",
            structure_original_research: [
              "Title",
              "Background",
              "Aims & Objectives",
              "Methodology",
              "Results",
              "Conclusions",
              "References (Vancouver Style)",
            ],
          },
          rules: [
            "Abstract file title: YourName_AbstractCatalystMAMC2026",
            "Anonymized abstract without college name to prevent bias.",
          ],
          submission_deadline: "2026-11-10T12:00:00+05:30",
          display_deadline: "10th November 2026, 12:00 PM",
        },
        {
          round: 2,
          name: "Offline Oral Presentation",
          mode: "Offline",
          description:
            "Top 10 selected abstracts present oral slide defense before eminent professors.",
          date: "2026-11-20",
          display_date: "20th November 2026",
          time: "9:00 AM onwards",
        },
      ],
      registration_url: "https://forms.gle/CRtSbTRQ1amZ4W3YA",
      contacts: [
        { name: "Aadya Roy", phone: "+91 9971483808" },
        { name: "Mananya Muskan", phone: "+91 7897976027" },
      ],
    },
    {
      id: "hackathon",
      name: "HACKATHON",
      subtitle: "Healthcare Innovation Hackathon",
      organizer: "MASS",
      tagline: "Where medical passion meets engineering breakthroughs",
      description:
        "Interdisciplinary healthcare hackathon tackling real-world clinical and public health challenges across 3 tracks.",
      tracks: [
        {
          name: "Climate-Linked Health Innovations",
          prompt: "Innovate tools protecting communities from extreme heat, floods and vector-borne outbreaks.",
        },
        {
          name: "Resilience Beyond Infection",
          prompt: "Reimagine chronic infection care uniting digital health, patient adherence, and outsmarting HIV.",
        },
        {
          name: "Rapid Response & Emergency Care",
          prompt: "Develop life-saving triage and rapid dispatch solutions when every second counts.",
        },
      ],
      proposal_deadline: "2026-11-10T12:00:00+05:30",
      display_proposal_deadline: "10th November 2026, 12:00 PM",
      date: "2026-11-19",
      display_date: "19th November 2026",
      time: "4:00 PM onwards",
      venue: "New LT, Ground Floor, MAMC",
      problem_statement_url:
        "https://drive.google.com/file/d/1GJ9JU7QKTo38QuKUvog2NNpkQMidqgcS/view?usp=sharing",
      registration_url: "https://forms.gle/rSnEZShekMtyAgbD7",
      contacts: [
        { name: "Mananya Muskan", phone: "+91 7897976027" },
        { name: "Kirti Sachdeva", phone: "+91 9311246300" },
      ],
    },
    {
      id: "medventure",
      name: "MEDVENTURE",
      subtitle: "The Medical Game Show",
      organizer: "MASS",
      tagline: "Medicine isn't just studied – it's lived",
      description:
        "Put your clinical instincts to the test – simulate real ER dilemmas, make rapid calls, diagnose tricky presentations and outshine your peers for cash prizes.",
      highlights: [
        "Take charge of emergency cases under pressure like Dr. House",
        "Interactive real dilemma simulation & clinical decision trees",
        "Compete for cash prize and campus bragging rights",
      ],
      date: "2026-11-18",
      display_date: "18th November 2026",
      time: "4:00 PM – 6:00 PM",
      venue: "New LT, Ground Floor, MAMC",
      fee: {
        maulanians: "Free (upload college ID)",
        non_maulanians: "₹50",
      },
      basic_registration_required: false,
      prizes: "Cash prizes for winning teams",
      registration_url: "https://forms.gle/gd9HQgWRCLYaSRUk9",
      contacts: [
        { name: "Harsaaj Singh Wander", phone: "+91 9599925572" },
        { name: "Sriyansh Jha", phone: "+91 9530186757" },
      ],
    },
    {
      id: "rickthinking-reviews",
      name: "RICKTHINKING REVIEWS",
      subtitle: "Creative Scientific Ideation Challenge",
      organizer: "MASS",
      tagline: "Rick your brains and make us question like Morty",
      description:
        "Unleash scientific creativity: formulate mathematical models, novel hypotheses, experimental setups, or speculative future biomedical solutions.",
      highlights: [
        "Multiverse of scientific ideation & creative hypothesis formulation",
        "Submit mathematical models, experimental designs, or speculative theories",
      ],
      mode: "Online",
      submission_deadline: "2026-11-15",
      display_deadline: "15th November 2026",
      results: "Announced online",
      fee: {
        maulanians: "Free (upload college ID)",
        non_maulanians: "₹50",
      },
      basic_registration_required: false,
      registration_url: "https://forms.gle/yX5of5fKJe6qNfcY6",
      contacts: [
        { name: "Biswajyoti Das", phone: "+91 7896414255" },
        { name: "Paras Jain", phone: "+91 9289691376" },
      ],
    },
  ],

  mafia_events: {
    organizer: "Maulana Azad Finance & Innovation Alliance (MAFIA)",
    instagram: "@mafia_mamc",
    intro:
      "Flagship events designed to sharpen financial intelligence, medical entrepreneurship, and strategic decision making.",
    prize_note: "Cash prizes worth ₹6k at every event",
    spots_note: "Strict seat caps – register in advance",
    events: [
      {
        id: "the-boardroom",
        name: "The Boardroom",
        subtitle: "Flagship Problem-Solving & Case Defense",
        description:
          "Sharpen your analytical instincts through structured Group Discussions & Personal Interviews.",
        date: "2026-11-18",
        display_date: "18th November 2026",
        time: "11:00 AM – 1:00 PM",
        venue: "Demo Room, MAMC",
        fee: "₹99",
        registration_url:
          "https://unstop.com/o/hdK89Vp?lb=QTYlvjk&utm_medium=Share&utm_source=not_a_rush&utm_campaign=Competitions",
      },
      {
        id: "business-bootcamp",
        name: "Business Bootcamp for Medicos",
        subtitle: "A Medico's Practical Guide to the Business World (2-Day)",
        description:
          "Learn how to design your own clinic/startup and build an investor-ready business plan.",
        date: "2026-11-19 and 2026-11-20",
        display_date: "19th & 20th November 2026",
        time: "2:00 PM – 5:00 PM",
        venue: "New Lecture Hall, MAMC",
        fee: {
          early_bird: "₹349",
          later: "₹549",
        },
        registration_urls: {
          undergraduates: "https://forms.gle/8p1h6gyQHuULziEe7",
          postgraduates: "https://forms.gle/bKo3xtw4zWn7Y7UL9",
        },
      },
      {
        id: "venture-wars",
        name: "Venture Wars",
        subtitle: "Startup Strategy & Market Trading Battle",
        description:
          "Pitch your startup idea, raise capital, trade shares, navigate real-time market shifts and build your empire.",
        highlights: [
          "Pitch your healthcare or SDG startup idea",
          "Sell equity, raise simulated capital, and acquire stakes in competitors",
          "Predict macroeconomic market turns to maximize team net worth",
        ],
        date: "2026-11-20",
        display_date: "20th November 2026",
        time: "11:00 AM – 1:00 PM",
        venue: "Demo Room, MAMC",
        fee: "₹249 per team",
        registration_url:
          "https://unstop.com/o/Fa8ZKYf?lb=QTYlvjk&utm_medium=Share&utm_source=not_a_rush&utm_campaign=Competitions",
        contacts: [
          { name: "Ayush Jain", phone: "+91 8847237366" },
          { name: "Lakshya Sharma", phone: "+91 8949717078" },
        ],
      },
    ],
    contacts: [
      { name: "Prachi Jindal", phone: "+91 7428401208" },
      { name: "Ayush Jain", phone: "+91 8847237366" },
    ],
  },

  accommodation: {
    title: "CATALYST 2026 – Accommodation Registration",
    description:
      "Accommodation has been arranged for registered delegates attending CATALYST 2026. The facility is within walking distance of both MAMC and LNJP Hospital. Room allotment is on a first-come, first-served basis.",
    form_url: "https://forms.gle/aUwSpZe2T1j6fcHQA",
    contacts: [
      { name: "Ansh Agarwal", phone: "+91 8000230796" },
      { name: "Aryan Garg", phone: "+91 8699520165" },
      { name: "Shivam Aggarwal", phone: "+91 8307755961" },
    ],
  },

  schedule_overview: [
    {
      date: "2026-11-18",
      label: "Day 1 – 18th November",
      events: [
        { name: "Code Nebula", time: "11:00 AM – 3:30 PM", type: "Workshop" },
        { name: "Know Your Knots (Session 1)", time: "11:00 AM – 3:00 PM", type: "Workshop" },
        { name: "The Boardroom", time: "11:00 AM – 1:00 PM", type: "MAFIA Event" },
        { name: "MedVenture", time: "4:00 PM – 6:00 PM", type: "Academic Event" },
      ],
    },
    {
      date: "2026-11-19",
      label: "Day 2 – 19th November",
      events: [
        { name: "Case Files (Poster Presentation)", time: "9:00 AM onwards", type: "Academic Event" },
        { name: "Know Your Knots (Sessions 2 & 3)", time: "9:00 AM – 12:30 PM & 1:00 PM – 4:30 PM", type: "Workshop" },
        { name: "The Optic Odyssey", time: "8:00 AM – 5:00 PM", type: "Workshop" },
        { name: "The Genesis Protocol", time: "1:00 PM – 4:00 PM", type: "Workshop" },
        { name: "Rhythm Unravelled", time: "2:00 PM – 4:00 PM", type: "Workshop" },
        { name: "Business Bootcamp for Medicos (Day 1)", time: "2:00 PM – 5:00 PM", type: "MAFIA Event" },
        { name: "Hackathon", time: "4:00 PM onwards", type: "Academic Event" },
      ],
    },
    {
      date: "2026-11-20",
      label: "Day 3 – 20th November",
      events: [
        { name: "Inquistador (Oral Presentation)", time: "9:00 AM onwards", type: "Academic Event" },
        { name: "Molecules in Motion", time: "9:30 AM – 1:00 PM", type: "Workshop" },
        { name: "Venture Wars", time: "11:00 AM – 1:00 PM", type: "MAFIA Event" },
        { name: "The Skeletal Frontier", time: "2:00 PM – 5:00 PM", type: "Workshop" },
        { name: "Echoes of Equilibrium", time: "2:00 PM – 4:00 PM", type: "Workshop" },
        { name: "Business Bootcamp for Medicos (Day 2)", time: "2:00 PM – 5:00 PM", type: "MAFIA Event" },
      ],
    },
  ],
};
