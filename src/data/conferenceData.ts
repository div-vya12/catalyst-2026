import { ConferenceData } from "@/types/conference";

export const conferenceData: ConferenceData = {
  conference: {
    name: "CATALYST 2025",
    type: "Annual Undergraduate Academic Conference",
    institution: "Maulana Azad Medical College (MAMC)",
    city: "New Delhi",
    start_date: "2025-12-01",
    end_date: "2025-12-03",
    display_dates: "1st – 3rd December 2025",
    quote: {
      text: "Wherever the art of medicine is loved, there is love for humanity",
      author: "Hippocrates",
    },
    tagline: "Learn. Practice. Innovate.",
    description:
      "MAMC's annual conference featuring hands-on workshops, academic competitions and business events for MBBS students.",
    eligibility_general:
      "Academic events are open to all MBBS students (1st year to interns). Workshops are open to Maulanians and Non-Maulanians via separate registration forms.",
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
      date: "2025-11-15",
      slots: [
        { workshop_day: "1st December workshops", form_release_time: "1:00 PM" },
        { workshop_day: "2nd December workshops", form_release_time: "4:00 PM" },
        { workshop_day: "3rd December workshops", form_release_time: "6:00 PM" },
      ],
    },
    notes: [
      "Workshop seats are limited and allotted on a first-come, first-served basis.",
      "Some workshop slots may overlap – check the schedule carefully before registering for multiple workshops on the same day.",
      "Organisers will try to assign non-clashing sessions to participants registering for multiple slots, but this cannot be guaranteed in all cases.",
    ],
    late_academic_event_update: {
      applies_to: ["MedVenture", "RickThinking Reviews"],
      date_of_update: "2025-11-30",
      points: [
        "No Basic Registration (BR) required to participate.",
        "MAMC students pay no fee; they must upload their college ID in the payment section.",
        "Non-Maulanians pay a minimal entry fee of ₹50.",
        "No delegate kits or additional materials will be provided.",
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
        "MAMC's first-ever simulator-based emergency workshop. Master CPR, airway management and oxygen therapy through high-fidelity simulations and hands-on sessions using advanced manikins and training models.",
      whats_in_store: [
        "CPR and lifesaving skills",
        "Airway management and oxygen therapy",
        "Emergency response readiness",
        "Hands-on simulation with mannequins and dummies",
        "Awareness of prompt and effective emergency care",
        "Use of AED (Automated External Defibrillator) made easy",
      ],
      closing_line: "Because heroes aren't born. They're trained – in CODE NEBULA.",
      date: "2025-12-01",
      display_date: "1st December 2025",
      time: "11:00 AM – 3:30 PM",
      venue: "PGMET Lab, BL Taneja Block, MAMC",
      registration: {
        form_release: "15 November 2025, 1:00 PM",
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
        "A hands-on surgical workshop to hone basic surgical skills – suturing, knot tying and instrument handling – and take a first confident step into the operating room.",
      whats_in_store: [
        "Surgical asepsis: hand hygiene & donning–doffing",
        "Hands-on suturing: knotting, instrument use & closure techniques",
        "Bowel perforation management & anastomosis training",
      ],
      date: "2025-12-01 and 2025-12-02",
      display_date: "1st & 2nd December 2025",
      sessions: [
        { date: "1st December 2025", time: "11:00 AM – 3:00 PM" },
        { date: "2nd December 2025", time: "9:00 AM – 12:30 PM" },
        { date: "2nd December 2025", time: "1:00 PM – 4:30 PM" },
      ],
      venue: "PGMET Lab, BL Taneja Block, MAMC, New Delhi",
      registration: {
        form_release: "15 November 2025, 6:00 PM",
        maulanian_url: "https://forms.gle/HFWyxyQ5KFfbsztYA",
        non_maulanian_url: "https://forms.gle/AqBGSSgmxvGGT3As7",
        alternate_url_in_lineup_post: "https://forms.gle/YVEpT7v96iVLvQmS8",
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
      subtitle: "Ophthalmology Skills Workshop – Clinical Pearls in Ophthalmology",
      tagline: "See beyond the surface – sharpen your vision, skills, and precision",
      department: "Ophthalmology",
      description:
        "A full-day hands-on Ophthalmology workshop covering core ocular procedures from examination to surgery, built to develop precision, skill and confidence.",
      whats_in_store: [
        "Fundamentals of ophthalmic examination, including fundoscopy and tonometry (using goat's eyes)",
        "Hands-on suturing techniques on goat's eyes for developing surgical precision",
        "Introduction to Extracapsular Cataract Extraction (ECCE) – guided practice on goat's eyes",
        "Awareness module on early detection and timely surgical management of common eye conditions",
      ],
      date: "2025-12-02",
      display_date: "2nd December 2025",
      time: "8:00 AM – 5:00 PM",
      venue: "Department of Ophthalmology, Guru Nanak Eye Centre (GNEC), MAMC, New Delhi",
      registration: {
        form_release: "15 November 2025, 4:00 PM",
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
      subtitle: "ECG Workshop – ECG Masterclass",
      tagline: "Unravel the rhythm, master the beat – every heartbeat tells a story",
      department: "Medicine",
      description:
        "A hands-on workshop by the Department of Medicine to build confidence in recording, reading, interpreting and applying ECGs in real clinical settings.",
      whats_in_store: [
        "Introduction to basic ECG theory and principles",
        "Demonstration of lead placement and electrode application",
        "Understanding ECG waveforms and standard structures",
        "Step-by-step guide to ECG interpretation",
        "Small-group discussions of real clinical cases with actual ECG examples",
      ],
      date: "2025-12-02",
      display_date: "2nd December 2025",
      time: "2:00 PM – 4:00 PM",
      venue: "New Lecture Theatre, Ground Floor, Academic Block, MAMC",
      registration: {
        form_release: "15 November 2025, 4:00 PM",
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
      subtitle: "Comprehensive Obstetrics & Gynaecology Workshop – Essentials of Gynaecological Practice",
      tagline: "From labour to life – learn, practice, and perfect",
      department: "Obstetrics & Gynaecology",
      description:
        "A hands-on Gynaecology and Obstetrics workshop curated exclusively for undergraduate students – from managing labour to mastering life-saving drills.",
      whats_in_store: [
        "Management of Labour – understanding each stage and handling complications",
        "AMTSL & PPH Drill – active management of the third stage of labour and response to postpartum haemorrhage",
        "Maternal Collapse Management – emergency protocols and team response",
        "Family Planning Counselling – with hands-on CuT insertion practice",
        "Normal Vaginal Delivery & Episiotomy Stitching Workshop – guided simulation and supervised skill training",
      ],
      date: "2025-12-02",
      display_date: "2nd December 2025",
      time: "1:00 PM – 4:00 PM",
      venue: "Department of Obstetrics & Gynaecology, MAMC & LNJP Hospital",
      registration: {
        form_release: "15 November 2025, 4:00 PM",
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
      subtitle: "Orthopaedic First Aid Workshop – Orthopaedic Skills & Fracture Management",
      tagline: "Get ready to roll, splint, and save",
      department: "Orthopaedics",
      description:
        "A hands-on workshop to make you confident in managing musculoskeletal emergencies and your first steps into trauma care.",
      whats_in_store: [
        "Interactive presentation on Basic Orthopaedic First Aid",
        "Guided practice in bandaging, slings, splints and plaster application",
        "Step-by-step demo and supervised practice of the Log Roll Technique for safe spinal handling",
        "Wound dressing and bandaging essentials for orthopaedic trauma cases",
      ],
      detailed_format: {
        total_slots: 3,
        slot_1_demonstration_and_expert_sessions: [
          "Demo lecture by Dr. Sumit Sural (HOD Orthopaedics)",
          "Introduction to Orthopaedic First Aid in trauma",
          "Live demonstration of Splints, Traction & Orthosis",
          "Combined Plaster Application demo",
          "Basics of X-ray reading & interpretation",
        ],
        hands_on_sessions: {
          description: "Students are divided into two groups for practical training.",
          group_1: [
            "Plaster application on peers",
            "Splints & Traction workshop",
          ],
          group_2: [
            "Spinal injury patient handling",
            "Correct helmet removal in RTA cases",
            "Cervical collar application",
            "Log-roll technique for safe transfer",
            "Crepe bandage application for sprains",
            "Sling preparation & application for fracture immobilisation",
          ],
        },
      },
      date: "2025-12-03",
      display_date: "3rd December 2025",
      time: "2:00 PM – 5:00 PM",
      venue: "Orthopaedic Block, LNJP (Lok Nayak) Hospital, New Delhi",
      registration: {
        form_release: "15 November 2025, 6:00 PM",
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
      subtitle: "ABG Analysis Workshop – ABG Analysis Simplified",
      tagline: "Where acid-base meets clinical clarity",
      department: "Medicine",
      description:
        "A guided, hands-on workshop by the Department of Medicine that simplifies Arterial Blood Gas (ABG) interpretation, bridging physiology and emergency medicine.",
      whats_in_store: [
        "Fundamentals of ABG theory and its clinical relevance",
        "Demonstration of ABG sampling techniques",
        "Interpretation of ABG results across varied clinical scenarios",
        "Small-group, case-based discussions on diagnosis and management",
        "Enhanced ability to make evidence-based decisions in critical cases",
      ],
      date: "2025-12-03",
      display_date: "3rd December 2025",
      time: "2:00 PM – 4:00 PM",
      venue: "New Lecture Theatre, Maulana Azad Medical College",
      registration: {
        form_release: "15 November 2025, 6:00 PM",
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
      subtitle: "Biochemistry Techniques Workshop",
      tagline: "Explore the molecular biology techniques of modern labs",
      department: "Biochemistry",
      description:
        "A guided, hands-on workshop by the Department of Biochemistry for everyone from 1st-year beginners to advanced learners.",
      whats_in_store: [
        "Hands-on DNA extraction from biological samples",
        "Gel electrophoresis for DNA separation and visualization",
        "Introduction to lab automation & molecular machinery used in cutting-edge diagnostics",
        "Guided lab round to understand real-time workflows and instrumentation",
      ],
      date: "2025-12-03",
      display_date: "3rd December 2025",
      time: "9:30 AM – 1:00 PM",
      venue: "Department of Biochemistry, 4th Floor, Academic Block, GIPMER",
      registration: {
        form_release: null,
        maulanian_url: "https://forms.gle/aNHJCFPTsCSBKNXH9",
        non_maulanian_url: "https://forms.gle/aNHJCFPTsCSBKNXH9",
        note: "Single registration link for all participants",
      },
      fee: {
        free_condition: "FREE if registered for 2 or more workshops under Catalyst'25",
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
      tagline: "Present intriguing medical cases via posters",
      description:
        "Share your clinical findings with esteemed faculty and research scholars and gain valuable feedback on your work.",
      eligibility: "All MBBS students (1st year to interns)",
      format: "Two rounds",
      rounds: [
        {
          round: 1,
          name: "Online Screening Round",
          mode: "Online",
          submission_format: "PDF only",
          abstract_specifications: {
            word_limit: "300–350 words (references not included in word limit)",
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
            "Plagiarism of any kind leads to instant disqualification.",
            "No name or institutional details of participants should appear in the entry.",
          ],
          file_naming: "YourName_CaseCatalystMAMC2025",
          submission_deadline: "2025-11-20T12:00:00+05:30",
          display_deadline: "20th November 2025, 12:00 PM",
        },
        {
          round: 2,
          name: "Offline Round – Poster Presentation",
          mode: "Offline",
          description:
            "Top 15 entries are invited to present their case to an eminent jury at MAMC, New Delhi.",
          date: "2025-12-02",
          display_date: "2nd December 2025",
          time: "9:00 AM onwards",
        },
      ],
      prizes: "Exciting cash prizes for top presenters",
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
      tagline: "An opportunity to showcase your research and gain insights from expert judges",
      description:
        "Present your research to top faculty, peers and research scholars and receive valuable feedback.",
      eligibility: "All MBBS students (1st year to interns)",
      format: "Two rounds",
      rounds: [
        {
          round: 1,
          name: "Online Screening Round",
          mode: "Online",
          submission_format: "Abstract in PDF format only",
          abstract_types_accepted: [
            "Original Research",
            "Systematic Reviews and Meta-Analysis",
          ],
          abstract_specifications: {
            word_limit: "400 words (title and references not included)",
            structure_original_research: [
              "Title",
              "Background",
              "Aims and Objectives",
              "Methodology",
              "Results",
              "Conclusions",
              "References (Vancouver Style)",
            ],
            structure_systematic_review_meta_analysis: [
              "Title",
              "Background",
              "Search Strategy",
              "Statistical Analysis",
              "Results",
              "Conclusions",
              "References (Vancouver Style)",
            ],
          },
          rules: [
            "Abstract file title: YourName_AbstractCatalystMAMC2025",
            "No personal or institutional details in the abstract, to avoid disqualification.",
            "Plagiarism or exceeding the word limit will result in penalties.",
          ],
          submission_deadline: "2025-11-20T12:00:00+05:30",
          display_deadline: "20th November 2025, 12:00 PM",
        },
        {
          round: 2,
          name: "Offline Oral Presentation",
          mode: "Offline",
          description:
            "Top 10 abstracts are invited to present at Catalyst 2025, MAMC, New Delhi, before an eminent jury.",
          date: "2025-12-03",
          display_date: "3rd December 2025",
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
      organizer: "MAMC SciSoc (MASS)",
      tagline:
        "Where passion meets purpose and your ideas become the spark for tomorrow's breakthroughs",
      description:
        "Brilliant minds unite to craft solutions that make a difference. Participants choose from three problem-statement tracks.",
      tracks: [
        {
          name: "Climate-Linked Innovations",
          prompt:
            "Do you have what it takes to shield communities from the heat, floods and diseases of a changing planet?",
        },
        {
          name: "Resilience Beyond Infection",
          prompt:
            "Do you have what it takes to reimagine healthcare for those who need the most – uniting technology and humanity to outsmart HIV?",
        },
        {
          name: "Rapid Response Innovations",
          prompt:
            "Do you have what it takes to save a life when every second counts?",
        },
      ],
      proposal_deadline: "2025-11-20T12:00:00+05:30",
      display_proposal_deadline: "20th November 2025, 12:00 PM",
      date: "2025-12-02",
      display_date: "2nd December 2025",
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
      tagline: "At MAMC, medicine isn't just studied – it's lived",
      description:
        "Put your clinical instincts to the test – simulate real dilemmas, make smart decisions and think like a doctor.",
      highlights: [
        "Take charge of the ER like Dr. House – diagnose, decide and save lives under pressure",
        "Realistic interactive medical cases – Diagnose. Manage. Compete.",
        "Tackle real-life medical dilemmas, make quick calls and see where your choices lead",
        "Show off your clinical smarts, outshine your peers and grab the cash prize",
      ],
      date: "2025-12-01",
      display_date: "1st December 2025",
      time: "4:00 PM – 6:00 PM",
      venue: "New LT, Ground Floor, MAMC",
      fee: {
        maulanians: "Free (upload college ID in payment section)",
        non_maulanians: "₹50",
      },
      basic_registration_required: false,
      note: "No delegate kits or additional materials will be provided.",
      prizes: "Cash prize and campus bragging rights",
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
        "Step into a multiverse of possibilities: analyse the provided articles, formulate your idea, and prove or support your proposal. Submissions can be a mathematical model, experimental design, a question with a probable solution, future research potential, a hypothesis with a way to prove it, and more. Anything creative, novel or of scientific value is welcome.",
      highlights: [
        "Think like Rick and Morty to unleash immense scientific potential",
        "Step into a multiverse of possibilities",
      ],
      mode: "Online",
      submission_deadline: "2025-11-30",
      display_deadline: "30th November 2025",
      results: "Announced online",
      fee: {
        maulanians: "Free (upload college ID in payment section)",
        non_maulanians: "₹50",
      },
      basic_registration_required: false,
      note: "No delegate kits or additional materials will be provided.",
      registration_url: "https://forms.gle/yX5of5fKJe6qNfcY6",
      original_registration_url:
        "https://docs.google.com/forms/d/1PmjDQYN1MJLbwhruRR98aNPbRjw6MhHGoOSKoq3yRsE/edit?ts=68fcd069",
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
      "Three flagship events to sharpen your analytical mind, entrepreneurial spark and real-world problem-solving instincts.",
    prize_note: "Cash prizes worth ₹6k at every event",
    spots_note: "All events have limited spots – register ASAP.",
    events: [
      {
        id: "the-boardroom",
        name: "The Boardroom",
        subtitle: "Flagship Problem-Solving Event",
        description:
          "Sharpen your thinking through Group Discussions & Personal Interviews.",
        date: "2025-12-01",
        display_date: "1st December 2025",
        time: "11:00 AM – 1:00 PM",
        venue: "Demo Room, MAMC",
        fee: "₹99",
        registration_url:
          "https://unstop.com/o/hdK89Vp?lb=QTYlvjk&utm_medium=Share&utm_source=not_a_rush&utm_campaign=Competitions",
      },
      {
        id: "business-bootcamp",
        name: "Business Bootcamp for Medicos",
        subtitle: "A Medico's Guide to the Business World – 2-Day Workshop",
        description:
          "Learn how to start your own clinic/startup and create your own business plan. Guest speakers to be announced.",
        date: "2025-12-02 and 2025-12-03",
        display_date: "2nd & 3rd December 2025",
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
        subtitle: "Green or Red – Startup Strategy Battle",
        description:
          "Pitch your startup idea, raise capital, trade shares and build your empire. Your startup idea should solve a real-world problem, such as those related to the medical field or the SDGs. Will you be a financial genius or a bankrupt dreamer?",
        highlights: [
          "Build Your Empire | Manipulate the Market | Outsmart Your Rivals",
          "Pitch your startup",
          "Sell shares, raise capital, and invest in competitors",
          "Predict the market",
          "Compete with other teams for net worth",
        ],
        date: "2025-12-03",
        display_date: "3rd December 2025",
        time: "11:00 AM – 1:00 PM",
        venue: "Demo Room, MAMC",
        fee: "₹249 per team",
        note: "Problem statements and rules to be announced.",
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
    title: "CATALYST 2025 – Accommodation Registration",
    description:
      "Accommodation has been arranged for participants attending CATALYST 2025. The facility is within walking distance of both the college and the hospital. Room allotment is subject to availability and on a first-come, first-served basis. Please provide accurate information.",
    form_url: "https://forms.gle/aUwSpZe2T1j6fcHQA",
    contacts: [
      { name: "Ansh Agarwal", phone: "+91 8000230796" },
      { name: "Aryan Garg", phone: "+91 8699520165" },
      { name: "Shivam Aggarwal", phone: "+91 8307755961" },
    ],
  },

  schedule_overview: [
    {
      date: "2025-12-01",
      label: "Day 1 – 1st December",
      events: [
        { name: "Code Nebula", time: "11:00 AM – 3:30 PM", type: "Workshop" },
        { name: "Know Your Knots (Session 1)", time: "11:00 AM – 3:00 PM", type: "Workshop" },
        { name: "The Boardroom", time: "11:00 AM – 1:00 PM", type: "MAFIA Event" },
        { name: "MedVenture", time: "4:00 PM – 6:00 PM", type: "Academic Event" },
      ],
    },
    {
      date: "2025-12-02",
      label: "Day 2 – 2nd December",
      events: [
        { name: "Case Files (Poster Presentation)", time: "9:00 AM onwards", type: "Academic Event" },
        { name: "Know Your Knots (Sessions 2 & 3)", time: "9:00 AM – 12:30 PM and 1:00 PM – 4:30 PM", type: "Workshop" },
        { name: "The Optic Odyssey", time: "8:00 AM – 5:00 PM", type: "Workshop" },
        { name: "The Genesis Protocol", time: "1:00 PM – 4:00 PM", type: "Workshop" },
        { name: "Rhythm Unravelled", time: "2:00 PM – 4:00 PM", type: "Workshop" },
        { name: "Business Bootcamp for Medicos (Day 1)", time: "2:00 PM – 5:00 PM", type: "MAFIA Event" },
        { name: "Hackathon", time: "4:00 PM onwards", type: "Academic Event" },
      ],
    },
    {
      date: "2025-12-03",
      label: "Day 3 – 3rd December",
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
