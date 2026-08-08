import type { MediaItem } from "@/types/media";

export type Hobby = {
  title: string;
  tagline: string;
  description: string;
  media: MediaItem[];
};

export const hobbies: Hobby[] = [
  {
    title: "Bharatanatyam",
    tagline: "Classical Dance · Nritya Ratna, 2019",
    description:
      "I've trained in Bharatanatyam and performed at academy showcases and state-level competitions. In 2019 I was honored with the title \"Nritya Ratna\" by the Natraja Kalakrishna Nrityajyothi Akademi, Warangal, and in 2021 I won a dancing competition conducted by the Kanyakubj Brahmin Samiti.",
    media: [
      {
        type: "image",
        src: "/images/hobbies/bharatanatyam-performance-seated.jpg",
        alt: "Performing a seated Bharatanatyam pose on stage",
      },
      {
        type: "image",
        src: "/images/hobbies/bharatanatyam-backstage.jpg",
        alt: "In costume backstage before a Bharatanatyam performance",
      },
      {
        type: "image",
        src: "/images/hobbies/bharatanatyam-diamond-pose.jpg",
        alt: "Performing a hand-mudra pose at a dance competition",
      },
      {
        type: "image",
        src: "/images/hobbies/bharatanatyam-jump-pose.jpg",
        alt: "Mid-performance at a state-level dance competition",
      },
      {
        type: "image",
        src: "/images/hobbies/bharatanatyam-nritya-ratna-certificate.jpg",
        alt: "Nritya Ratna title certificate from Natraja Kalakrishna Nrityajyothi Akademi, 2019",
      },
      {
        type: "image",
        src: "/images/hobbies/bharatanatyam-winner-trophy.jpg",
        alt: "Winner trophy from the Kanyakubj Brahmin Samiti dancing competition, 2021",
      },
      {
        type: "image",
        src: "/images/hobbies/bharatanatyam-nataraja-trophy.jpg",
        alt: "Nataraja memento awarded alongside the Nritya Ratna title, 2019",
      },
    ],
  },
  {
    title: "Reading",
    tagline: "Always mid-chapter on something ML",
    description:
      "When I'm not building AI systems, I'm usually reading about them — machine learning texts, papers, and the occasional detour into fiction to reset.",
    media: [
      {
        type: "image",
        src: "/images/hobbies/reading.jpg",
        alt: "Reading a machine learning textbook at a classroom desk",
      },
    ],
  },
  {
    title: "Creative Coding",
    tagline: "Hands-free web instrument · MediaPipe + Web Audio",
    description:
      "A hands-free musical instrument, webcam-tracked with MediaPipe and played through the Web Audio API — built in an evening as a single HTML file, no framework or backend.",
    media: [
      {
        type: "video",
        src: "/videos/creative-coding-hand-tracking.mp4",
        poster: "/images/hobbies/creative-coding-poster.jpg",
        alt: "Demo of a hands-free web-based musical instrument tracked via webcam",
      },
    ],
  },
];
