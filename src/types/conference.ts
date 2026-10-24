export interface Organizer {
  name: string;
  short_name: string;
  instagram: string;
  linkedin?: string;
}

export interface ContactPerson {
  name: string;
  phone: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface ConferenceInfo {
  name: string;
  type: string;
  institution: string;
  city: string;
  start_date: string;
  end_date: string;
  display_dates: string;
  quote?: Quote;
  tagline: string;
  description: string;
  eligibility_general: string;
  organizers: Organizer[];
  announcement_group_whatsapp: string;
  institution_linkedin: string;
  general_contacts: {
    MASS: ContactPerson[];
    MAFIA: ContactPerson[];
  };
}

export interface WorkshopSession {
  date: string;
  time: string;
}

export interface WorkshopRegistration {
  form_release: string | null;
  maulanian_url: string;
  non_maulanian_url: string;
  alternate_url_in_lineup_post?: string;
  note?: string;
}

export interface WorkshopFee {
  free_condition?: string;
  paid_condition?: string;
}

export interface DetailedOrthopaedicFormat {
  total_slots: number;
  slot_1_demonstration_and_expert_sessions: string[];
  hands_on_sessions: {
    description: string;
    group_1: string[];
    group_2: string[];
  };
}

export interface Workshop {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  department: string;
  description: string;
  whats_in_store: string[];
  closing_line?: string;
  date: string;
  display_date: string;
  time?: string;
  sessions?: WorkshopSession[];
  venue: string;
  registration: WorkshopRegistration;
  fee: WorkshopFee | null;
  contacts: ContactPerson[];
  detailed_format?: DetailedOrthopaedicFormat;
}

export interface AcademicRound {
  round: number;
  name: string;
  mode: string;
  submission_format?: string;
  abstract_types_accepted?: string[];
  abstract_specifications?: {
    word_limit: string;
    required_headings?: string[];
    structure_original_research?: string[];
    structure_systematic_review_meta_analysis?: string[];
  };
  rules?: string[];
  file_naming?: string;
  submission_deadline?: string;
  display_deadline?: string;
  description?: string;
  date?: string;
  display_date?: string;
  time?: string;
}

export interface HackathonTrack {
  name: string;
  prompt: string;
}

export interface AcademicFee {
  maulanians: string;
  non_maulanians: string;
}

export interface AcademicEvent {
  id: string;
  name: string;
  subtitle: string;
  organizer: string;
  tagline: string;
  description: string;
  eligibility?: string;
  format?: string;
  rounds?: AcademicRound[];
  prizes?: string;
  registration_url?: string;
  contacts: ContactPerson[];
  tracks?: HackathonTrack[];
  proposal_deadline?: string;
  display_proposal_deadline?: string;
  date?: string;
  display_date?: string;
  time?: string;
  venue?: string;
  problem_statement_url?: string;
  highlights?: string[];
  fee?: AcademicFee;
  basic_registration_required?: boolean;
  note?: string;
  mode?: string;
  submission_deadline?: string;
  display_deadline?: string;
  results?: string;
  original_registration_url?: string;
}

export interface MafiaFee {
  early_bird?: string;
  later?: string;
}

export interface MafiaEvent {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  date: string;
  display_date: string;
  time: string;
  venue: string;
  fee: string | MafiaFee;
  registration_url?: string;
  registration_urls?: {
    undergraduates: string;
    postgraduates: string;
  };
  highlights?: string[];
  note?: string;
  contacts?: ContactPerson[];
}

export interface MafiaEventsSection {
  organizer: string;
  instagram: string;
  intro: string;
  prize_note: string;
  spots_note: string;
  events: MafiaEvent[];
  contacts: ContactPerson[];
}

export interface FinanceSocietySection {
  organizer: string;
  instagram: string;
  workshops: Workshop[];
  competitions: AcademicEvent[];
  contacts: ContactPerson[];
}

export interface AccommodationInfo {
  title: string;
  description: string;
  form_url: string;
  contacts: ContactPerson[];
}

export interface ScheduleItem {
  name: string;
  time: string;
  type: string;
}

export interface ScheduleDay {
  date: string;
  label: string;
  events: ScheduleItem[];
}

export interface ConferenceData {
  conference: ConferenceInfo;
  registration_info: {
    workshop_form_release_schedule: {
      date: string;
      slots: { workshop_day: string; form_release_time: string }[];
    };
    notes: string[];
    late_academic_event_update: {
      applies_to: string[];
      date_of_update: string;
      points: string[];
    };
  };
  workshops: Workshop[];
  academic_events: AcademicEvent[];
  mafia_events: MafiaEventsSection;
  finance_events?: FinanceSocietySection;
  accommodation: AccommodationInfo;
  schedule_overview: ScheduleDay[];
}
