"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import CertificateLightbox from "@/components/ui/CertificateLightbox";
import { certifications, type Certification } from "@/data/certifications";

function extractYear(date: string) {
  const match = date.match(/\b(20\d{2})\b/);
  return match ? match[1] : "Other";
}

export default function CertificationsPage() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const active = certifications.find((c) => c.id === openId) ?? null;
  const close = useCallback(() => setOpenId(null), []);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? certifications.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.issuer.toLowerCase().includes(q)
        )
      : certifications;

    const map = new Map<string, Certification[]>();
    for (const cert of filtered) {
      const year = extractYear(cert.date);
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(cert);
    }
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [query]);

  const issuerCount = useMemo(
    () => new Set(certifications.map((c) => c.issuer)).size,
    []
  );

  return (
    <>
      <Navbar />

      <main className="pt-28 pb-24 px-6 max-w-[900px] mx-auto min-h-screen">
        <Link
          href="/#certifications"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </Link>

        <Reveal>
          <h1 className="text-3xl md:text-4xl font-semibold accent-text">
            All Certifications
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl">
            {certifications.length} courses, simulations, and programs across{" "}
            {issuerCount} issuers.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-8 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or issuer..."
            className="glass w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#47F1FF]/50 placeholder:text-gray-500"
          />
        </Reveal>

        <div className="mt-14 space-y-14">
          {groups.length === 0 && (
            <p className="text-gray-500 text-sm">
              No certifications match &ldquo;{query}&rdquo;.
            </p>
          )}

          {groups.map(([year, certs]) => (
            <div key={year}>
              <div className="flex items-baseline gap-3 mb-5">
                <h2 className="text-xl font-semibold text-[#47F1FF]">{year}</h2>
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {certs.length}{" "}
                  {certs.length === 1 ? "certification" : "certifications"}
                </span>
              </div>

              <div className="space-y-3">
                {certs.map((cert) => (
                  <Reveal key={cert.id}>
                    <button
                      onClick={() => setOpenId(cert.id)}
                      className="group w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#47F1FF]/50 hover:bg-white/[0.06] transition-all text-left"
                    >
                      <div className="relative w-20 h-16 shrink-0 rounded-lg overflow-hidden bg-[#0c0c10] border border-white/5">
                        <Image
                          src={cert.image}
                          alt={`${cert.title} certificate`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base leading-snug truncate group-hover:text-[#47F1FF] transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                          {cert.issuer} · {cert.date}
                        </p>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      <CertificateLightbox active={active} onClose={close} />
    </>
  );
}
