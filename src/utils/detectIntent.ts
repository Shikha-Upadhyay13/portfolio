import { resumeData } from "@/data/resumeData";

export function detectIntent(message: string) {
  const text = message.toLowerCase();

  const keywords: Record<string, string[]> = {
    skills: ["skill", "tech", "technology", "stack", "tools"],
    projects: ["project", "build", "developed", "created"],
    experience: ["experience", "intern", "work", "job"],
    leadership: ["leader", "club", "activity", "event"],
    education: ["education", "study", "degree", "college"],
  };

  let bestMatch = "unknown";
  let highestScore = 0;

  for (const key in keywords) {
    let score = 0;

    keywords[key].forEach((word) => {
      if (text.includes(word)) {
        score++;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = key;
    }
  }

  return bestMatch;
}
