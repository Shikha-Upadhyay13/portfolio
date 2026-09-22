export type NavLink = {
  id: string;
  label: string;
};

/** Compact desktop bar — keeps the nav from feeling crowded. */
export const DESKTOP_NAV_LINKS: NavLink[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/** Full section list for mobile drawer and command palette. */
export const NAV_LINKS: NavLink[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
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
