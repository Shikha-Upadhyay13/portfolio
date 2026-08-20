import Reveal from "@/components/ui/Reveal";

/**
 * Shared section header — replaces the identical
 * `<Reveal><h2 className="accent-text">...` block that every section
 * hand-copied (with a drifting mb-14/mb-16 split fixed here for good).
 */
export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <Reveal className={`text-center mb-14 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-semibold accent-text">{title}</h2>
      {subtitle && <p className="text-gray-400 mt-4">{subtitle}</p>}
    </Reveal>
  );
}
