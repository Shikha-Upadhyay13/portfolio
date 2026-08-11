export type EducationMilestone = {
  degree: string;
  score: string;
  duration: string;
};

export type EducationEntry = {
  institution: string;
  image: string;
  /** Multiple milestones (e.g. Class X + Intermediate at the same school)
   * share one card and one photo instead of repeating the same image. */
  milestones: EducationMilestone[];
};

export const education: EducationEntry[] = [
  {
    institution: "Vidya Jyothi Institute of Technology",
    image: "/images/education/vjit-campus.jpg",
    milestones: [
      {
        degree: "B.Tech, Artificial Intelligence",
        score: "CGPA 9.25 (till 5th semester)",
        duration: "2023 – Present",
      },
    ],
  },
  {
    institution: "Kendriya Vidyalaya No. 2 Golconda",
    image: "/images/education/kv-golconda.webp",
    milestones: [
      {
        degree: "Intermediate",
        score: "77%",
        duration: "2021 – 2023",
      },
      {
        degree: "Class X",
        score: "GPA 8.2",
        duration: "2021",
      },
    ],
  },
];
