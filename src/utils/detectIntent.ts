const GREETINGS = /\b(hi|hello|hey|yo|sup)\b/;
const ABOUT_PHRASES = /who are you|about you|about yourself|introduce yourself|what can (i|you) ask/;

export function detectIntent(message: string) {
  const text = message.toLowerCase();

  if (GREETINGS.test(text) || ABOUT_PHRASES.test(text)) {
    return "about";
  }

  const keywords: Record<string, string[]> = {
    skills: ["skill", "tech", "technology", "stack", "tools", "language", "framework", "rag", "llm", "vector", "faiss"],
    projects: ["project", "build", "built", "developed", "created", "quantix", "passvault", "compressor", "penguin", "app"],
    experience: ["experience", "intern", "job", "work", "role", "quantum gandiva", "career", "company"],
    achievements: ["achievement", "award", "topper", "won", "trophy", "rank", "ranger", "badge", "trailhead", "agentblazer", "merit"],
    certifications: ["certificat", "course", "udemy", "cisco", "ibm", "qlik", "forage", "simplilearn", "credential"],
    hackathons: ["hackathon", "guido", "dotpy", "biriyanios", "rover"],
    leadership: ["leader", "club", "activity", "event", "ecell", "e-cell", "echo", "tarang", "yukti", "vriti", "volunteer"],
    education: ["education", "study", "studied", "degree", "college", "school", "university", "cgpa", "vjit", "kendriya"],
    hobbies: ["hobby", "hobbies", "dance", "bharatanatyam", "reading", "passion", "creative coding", "free time"],
    contact: ["contact", "email", "reach", "linkedin", "github", "hire", "connect", "phone"],
    salesforce: ["salesforce"],
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

  // "salesforce" alone is ambiguous between experience, achievements, and
  // certifications — route it to experience, the most direct match.
  if (bestMatch === "salesforce") return "experience";

  return bestMatch;
}
