import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Shikha Upadhyay",
        jobTitle: "AI Engineer",
        url: SITE_URL,
        email: SOCIAL_LINKS.email,
        sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
        description: SITE_DESCRIPTION,
        knowsAbout: [
          "Retrieval-Augmented Generation",
          "Large Language Models",
          "Agentic AI",
          "Machine Learning",
        ],
      },
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
