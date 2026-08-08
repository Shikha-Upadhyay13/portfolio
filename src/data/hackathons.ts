import type { MediaItem } from "@/types/media";

export type Hackathon = {
  title: string;
  team: string;
  event: string;
  award?: string;
  description: string;
  media: MediaItem[];
};

export const hackathons: Hackathon[] = [
  {
    title: "Guido — Smart Campus Assistance Rover",
    team: "Team BiriyaniOS",
    event: "National-Level Hackathon, CMR College of Engineering & Technology · 36 hours",
    description:
      "Built with five teammates in a 36-hour hackathon: a rover meant to sit at the campus entrance, help visitors navigate to specific blocks through conversation, communicate in multiple languages, and walk alongside them to their destination — with a longer-term vision as a utility rover for faculty to move documents between blocks. We didn't finish every feature we set out to build, but the real win was learning to make decisions fast under pressure as a team.",
    media: [
      {
        type: "image",
        src: "/images/hackathons/guido-team-auditorium.jpg",
        alt: "Team BiriyaniOS at the CMR College hackathon auditorium",
      },
      {
        type: "image",
        src: "/images/hackathons/guido-circuit-build.jpg",
        alt: "Wiring the motor drivers and battery pack for the Guido rover",
      },
      {
        type: "image",
        src: "/images/hackathons/guido-robot-prototype.jpg",
        alt: "The assembled Guido rover prototype with its display screen",
      },
      {
        type: "video",
        src: "/videos/guido-workspace.mp4",
        poster: "/images/hackathons/guido-workspace-poster.jpg",
        alt: "Team workspace while building the Guido rover",
      },
    ],
  },
  {
    title: "Automation & Generative AI Hackathon",
    team: "Team DotPy · UI/UX Design",
    event: "24-Hour Hackathon, KL University in collaboration with VJIT · Oct 18–19, 2025",
    award: "1st Token of Appreciation",
    description:
      "A 24-hour hackathon on Automation Anywhere and generative AI with teammates Syed Asif, Sanchit Gupta, and Thapendra Donepudi — I led the UI/UX design while the team built out the architecture and logic. Our solution won a 1st Token of Appreciation.",
    media: [
      {
        type: "image",
        src: "/images/hackathons/dotpy-lab-collab.jpg",
        alt: "Team DotPy collaborating in the lab",
      },
      {
        type: "image",
        src: "/images/hackathons/dotpy-whiteboard-doodle.jpg",
        alt: "Whiteboard doodles from the hackathon, including the team name DotPy",
      },
      {
        type: "image",
        src: "/images/hackathons/dotpy-award-stage.jpg",
        alt: "Team DotPy on stage at the GEN-AI Automation Hackathon 2025",
      },
      {
        type: "image",
        src: "/images/hackathons/dotpy-team-photo.jpg",
        alt: "Team DotPy group photo",
      },
    ],
  },
];
