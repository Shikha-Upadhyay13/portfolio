export type AchievementPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type AchievementStat = {
  value: string;
  label: string;
};

export type Achievement = {
  eyebrow: string;
  title: string;
  meta: string;
  description: string;
  photos: AchievementPhoto[];
  /** Shown as small stat chips instead of repeating the numbers in `meta`. */
  stats?: AchievementStat[];
};

export const achievements: Achievement[] = [
  {
    eyebrow: "Academic Excellence",
    title: "1st Topper — B.Tech Artificial Intelligence (3rd Year)",
    meta: "CGPA 9.25 · Vidya Jyothi Institute of Technology",
    description:
      "Current 1st Topper in the 3rd Year, Department of Artificial Intelligence at Vidya Jyothi Institute of Technology (CGPA 9.25). Recognized with a Certificate of Merit, Letter of Appreciation from the Principal, and a memento presented at a college ceremony.",
    photos: [
      {
        src: "/images/achievements/trophy-plaque.jpg",
        alt: "Memento awarded for academic excellence in B.Tech Artificial Intelligence",
        caption: "Memento — academic excellence, Dept. of AI",
      },
      {
        src: "/images/achievements/certificate-of-merit.jpg",
        alt: "Certificate of Merit for academic standing in B.Tech examinations",
        caption: "Certificate of Merit — B.Tech, Dept. of AI",
      },
      {
        src: "/images/achievements/letter-of-appreciation.jpg",
        alt: "Letter of Appreciation signed by the Principal",
        caption: "Letter of Appreciation — signed by the Principal",
      },
      {
        src: "/images/achievements/award-ceremony.jpg",
        alt: "Receiving the award on stage at Vidya Jyothi Institute of Technology",
        caption: "Award ceremony — Vidya Jyothi Institute of Technology",
      },
    ],
  },
  {
    eyebrow: "Hackathon",
    title: "1st Token of Appreciation — Team DotPy",
    meta: "Automation & Generative AI Hackathon · KL University × VJIT, 2025",
    description:
      "Won a 1st Token of Appreciation with Team DotPy at a 24-hour hackathon on Automation Anywhere and generative AI, hosted by KL University in collaboration with VJIT. I led the UI/UX design for our solution.",
    photos: [
      {
        src: "/images/hackathons/dotpy-lab-collab.jpg",
        alt: "Team DotPy collaborating in the lab",
        caption: "Team DotPy, working the problem",
      },
      {
        src: "/images/hackathons/dotpy-whiteboard-doodle.jpg",
        alt: "Whiteboard doodles from the hackathon, including the team name DotPy",
        caption: "Whiteboard doodles, hour 20 or so",
      },
      {
        src: "/images/hackathons/dotpy-award-stage.jpg",
        alt: "Team DotPy on stage at the GEN-AI Automation Hackathon 2025",
        caption: "Receiving the Token of Appreciation on stage",
      },
      {
        src: "/images/hackathons/dotpy-team-photo.jpg",
        alt: "Team DotPy group photo",
        caption: "Team DotPy",
      },
    ],
  },
  {
    eyebrow: "Salesforce",
    title: "Trailhead Ranger & 2026 Agentblazer Innovator",
    meta: "Salesforce Trailhead",
    description:
      "Reached Trailhead Ranger rank on Salesforce, and was recognized as a 2026 Agentblazer Innovator for applying Salesforce and Agentforce skills through hands-on practice.",
    stats: [
      { value: "116", label: "Badges" },
      { value: "105,875+", label: "Points" },
      { value: "7", label: "Trails" },
    ],
    photos: [
      {
        src: "/images/achievements/salesforce-trailhead-profile.jpg",
        alt: "Salesforce Trailhead profile showing Ranger rank, 116 badges, and 105,875 points",
        caption: "Trailhead profile — Ranger rank, 116 badges",
      },
      {
        src: "/images/achievements/salesforce-ranger-rank-email.jpg",
        alt: "Email from Salesforce congratulating on unlocking Ranger rank",
        caption: "Unlocking Ranger rank — 100 badges, 50K points",
      },
      {
        src: "/images/achievements/salesforce-agentblazer-innovator.jpg",
        alt: "Congratulations screen for becoming a 2026 Agentblazer Innovator",
        caption: "Recognized as a 2026 Agentblazer Innovator",
      },
    ],
  },
];
