/* Types and constants that are safe to import from client components (no Node APIs). */

export type Accent = "blue" | "red" | "yellow" | "green";

export type Img = { src: string; width: number; height: number };

export type Speaker = { name: string; role?: string };

export type EventType = "workshop" | "hackathon" | "community" | "talk";

export type EventEntry = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  year: string;
  type: EventType;
  location: string;
  summary: string;
  role?: string;
  speakers: Speaker[];
  featured: boolean;
  cover: Img | null;
  gallery: Img[];
  html: string;
};

export type Article = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  summary: string;
  tags: string[];
  cover: Img | null;
  html: string;
};

export type Person = { name: string; role: string; photo?: string };

export type Generation = {
  generation: number;
  term: string;
  name: string;
  note: string;
  placeholder?: boolean;
  leads: Person[];
  advisors: Person[];
  teams: { name: string; members: string[] }[];
};

export type Department = {
  id: string;
  station: string;
  name: string;
  color: Accent;
  summary: string;
  tracks: string[];
  benefits: string[];
  requirements: string[];
  openTo: string;
};

export type Milestone = {
  date: string;
  tag: string;
  title: string;
  text: string;
  color: Accent;
};

export const EVENT_TYPES: Record<EventType, { label: string; color: Accent }> = {
  workshop: { label: "Workshop", color: "blue" },
  hackathon: { label: "Hackathon", color: "red" },
  community: { label: "Community", color: "green" },
  talk: { label: "Talk", color: "yellow" },
};
