export type AchievementPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type Achievement = {
  eyebrow: string;
  title: string;
  meta: string;
  description: string;
  photos: AchievementPhoto[];
};

export const achievements: Achievement[] = [
  {
    eyebrow: "Academic Excellence",
    title: "2nd Topper — B.Tech Artificial Intelligence",
    meta: "CGPA 9.25 · Vidya Jyothi Institute of Technology",
    description:
      "Recognized for securing the Second Topper position in the II B.Tech Examinations (AY 2024–25), Department of Artificial Intelligence. Awarded a Certificate of Merit and a Letter of Appreciation by the Principal, along with a memento presented at a college ceremony.",
    photos: [
      {
        src: "/images/achievements/trophy-plaque.jpg",
        alt: "Memento awarded for securing the 2nd Topper position in the I B.Tech Examinations",
        caption: "Memento — 2nd Topper, I B.Tech Examinations",
      },
      {
        src: "/images/achievements/certificate-of-merit.jpg",
        alt: "Certificate of Merit for the Second Topper position, II B.Tech Examination",
        caption: "Certificate of Merit — II B.Tech, AY 2024–25",
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
    meta: "116 Badges · 105,875+ Points · 7 Trails",
    description:
      "Reached Trailhead Ranger rank on Salesforce with 116 badges and over 105,000 points across 7 trails, and was recognized as a 2026 Agentblazer Innovator for applying Salesforce and Agentforce skills through hands-on practice.",
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
