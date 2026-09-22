export type NavLink = {
  id: string;
  label: string;
};

export const NAV_LINKS: NavLink[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "how-i-work", label: "How I Work" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  { id: "hackathons", label: "Hackathons" },
  { id: "leadership", label: "Leadership" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contact", label: "Contact" },
];

/** Section IDs observed by the navbar scroll-spy (includes hero). */
export const SCROLL_SPY_IDS = ["home", ...NAV_LINKS.map((l) => l.id)];
