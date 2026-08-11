"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import CertificateLightbox from "@/components/ui/CertificateLightbox";
import CertificationCard from "@/components/ui/CertificationCard";
import { certifications } from "@/data/certifications";

export default function CertificationsPage() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const active = certifications.find((c) => c.id === openId) ?? null;
  const close = useCallback(() => setOpenId(null), []);

  const issuerCount = useMemo(
    () => new Set(certifications.map((c) => c.issuer)).size,
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return certifications;
    return certifications.filter(
      (c) =>
        c.title.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <Navbar />

      <main className="pt-28 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
        <Link
          href="/#certifications"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14">
          <Reveal>
            <h1 className="text-3xl md:text-4xl font-semibold accent-text">
              All Certifications
            </h1>
            <p className="text-gray-400 mt-3 max-w-xl">
              {certifications.length} courses, simulations, and programs
              across {issuerCount} issuers.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="w-full md:w-72 shrink-0">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or issuer..."
                className="glass w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#47F1FF]/50 placeholder:text-gray-500"
              />
            </div>
          </Reveal>
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No certifications match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((cert, i) => (
              <Reveal key={cert.id} delay={(i % 3) * 0.05}>
                <CertificationCard cert={cert} onOpen={() => setOpenId(cert.id)} />
              </Reveal>
            ))}
          </div>
        )}
      </main>

      <Footer />

      <CertificateLightbox active={active} onClose={close} />
    </>
  );
}
