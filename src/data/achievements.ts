export type AchievementPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export const achievement = {
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
  ] satisfies AchievementPhoto[],
};
