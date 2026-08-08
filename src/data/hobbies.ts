export type HobbyPhoto = {
  src: string;
  alt: string;
};

export type Hobby = {
  title: string;
  tagline: string;
  description: string;
  photos: HobbyPhoto[];
};

export const hobbies: Hobby[] = [
  {
    title: "Bharatanatyam",
    tagline: "Classical Dance · Nritya Ratna, 2019",
    description:
      "I've trained in Bharatanatyam and performed at academy showcases and state-level competitions. In 2019 I was honored with the title \"Nritya Ratna\" by the Natraja Kalakrishna Nrityajyothi Akademi, Warangal, and in 2021 I won a dancing competition conducted by the Kanyakubj Brahmin Samiti.",
    photos: [
      {
        src: "/images/hobbies/bharatanatyam-performance-seated.jpg",
        alt: "Performing a seated Bharatanatyam pose on stage",
      },
      {
        src: "/images/hobbies/bharatanatyam-backstage.jpg",
        alt: "In costume backstage before a Bharatanatyam performance",
      },
      {
        src: "/images/hobbies/bharatanatyam-diamond-pose.jpg",
        alt: "Performing a hand-mudra pose at a dance competition",
      },
      {
        src: "/images/hobbies/bharatanatyam-jump-pose.jpg",
        alt: "Mid-performance at a state-level dance competition",
      },
    ],
  },
];
