"use client"

import { useState, useEffect } from "react"
import HeroBackground from "@/components/ui/demo"
import { ImageZoom } from "@/components/ui/zoomable-image"
import { GooeyText } from "@/components/ui/gooey-text-morphing"

type Page = "home" | "services" | "about" | "gallery" | "contact" | "booking"

// ─── Logo ──────────────────────────────────────────────────────────────────────
function LogoMark({ size = 44 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Renaissance Detailing"
      width={size}
      height={size}
      className="flex-shrink-0 object-contain"
    />
  )
}

// ─── Fade wrapper ──────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div
      className={className}
      style={{
        animation: `fadeUp 0.6s ease ${delay}s both`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Page transition wrapper ───────────────────────────────────────────────────
function PageView({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 30); return () => clearTimeout(t) }, [])
  return (
    <div
      className={`w-full h-full overflow-y-auto ${className}`}
      style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease" }}
    >
      {children}
    </div>
  )
}

// ─── Back button ──────────────────────────────────────────────────────────────
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-[0.6rem] font-medium tracking-[0.3em] uppercase text-[#666] hover:text-[#c0c0c0] transition-colors group"
    >
      <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
      Home
    </button>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { num: "01", name: "Exterior Detail", desc: "Full exterior wash, clay bar treatment, machine polish, and premium paint protection. Restore your vehicle's showroom finish.", tag: "Most Popular", img: "/work-1.jpg" },
  { num: "02", name: "Interior Detail", desc: "Deep clean, vacuum, steam sanitisation, leather conditioning, and panel dressing. A pristine cabin environment.", tag: "Enquire", img: "/work-3.jpg" },
  { num: "03", name: "Ceramic Coating", desc: "Nano-ceramic protection that bonds with your paintwork, offering years of hydrophobic, UV-resistant, and self-cleaning defence.", tag: "Signature", img: "/ceramic-2yr.jpg" },
  { num: "04", name: "Full Detail Package", desc: "The complete Renaissance experience — interior and exterior transformation combined into one comprehensive, thorough package.", tag: "Best Value", img: "/hero.jpg" },
  { num: "05", name: "Maintenance Wash", desc: "Scheduled upkeep to preserve your ceramic coating or detail. Keep your vehicle in pristine condition between full services.", tag: "Ongoing", img: "/maintenance.jpg" },
]

const WHY_ITEMS = [
  { icon: "01", title: "Mobile Service", desc: "We come to you — home, office, or anywhere across Sydney." },
  { icon: "02", title: "Flexible Scheduling", desc: "Available 7 days a week, tailored around your calendar." },
  { icon: "03", title: "Premium Products", desc: "Industry-leading detailing products and ceramic coatings only." },
  { icon: "04", title: "Attention to Detail", desc: "Every panel, surface, and crevice — treated with exacting care." },
  { icon: "05", title: "Fully Insured", desc: "Complete coverage for your peace of mind on every job." },
  { icon: "06", title: "Trusted Sydney-Wide", desc: "Eastern Suburbs to the Hills District and everywhere between." },
]

// ─── Top Bar (shown on all inner pages) ───────────────────────────────────────
function TopBar({ navigate, current }: { navigate: (p: Page) => void; current: Page }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = (p: Page) => { navigate(p); setMenuOpen(false) }

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/[0.07] bg-black/80 backdrop-blur-sm">
        <button onClick={() => nav("home")} className="flex items-center gap-3 group cursor-pointer">
          <div className="transition-opacity duration-300 group-hover:opacity-80">
            <LogoMark size={38} />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-[family-name:var(--font-playfair)] text-sm font-semibold tracking-[0.22em] uppercase text-white leading-none">Renaissance</span>
            <div className="w-full h-px my-[3px]" style={{ background: "linear-gradient(90deg, transparent, #c0c0c0, transparent)" }} />
            <span className="font-[family-name:var(--font-montserrat)] text-[0.4rem] font-medium tracking-[0.55em] uppercase text-[#888] leading-none">Detailing</span>
          </div>
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {(["services", "about", "gallery", "contact"] as Page[]).map((item) => (
            <li key={item}>
              <button
                onClick={() => nav(item)}
                className={`text-[0.62rem] font-medium tracking-[0.22em] uppercase transition-colors relative group ${current === item ? "text-white" : "text-[#777] hover:text-white"}`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 h-px bg-[#c0c0c0] transition-all duration-300 ${current === item ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => nav("booking")}
              className="text-[0.62rem] font-medium tracking-[0.22em] uppercase bg-[#c0c0c0] text-black px-5 py-2 hover:bg-white transition-colors"
            >
              Book Now
            </button>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-[#c0c0c0] transition-all duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block w-5 h-px bg-[#c0c0c0] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-[#c0c0c0] transition-all duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute inset-0 z-50 bg-black/98 flex flex-col items-center justify-center gap-8">
          <button onClick={() => nav("home")} className="mb-4"><LogoMark size={60} /></button>
          {(["services", "about", "gallery", "booking", "contact"] as Page[]).map((item) => (
            <button key={item} onClick={() => nav(item)} className="text-sm font-medium tracking-[0.3em] uppercase text-[#888] hover:text-white transition-colors capitalize">
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function ServicesPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <PageView>
      <div className="px-6 md:px-14 py-14 max-w-5xl mx-auto">
        <FadeIn className="flex items-end justify-between mb-16 gap-4 flex-wrap">
          <div>
            <BackBtn onClick={() => navigate("home")} />
            <h2 className="font-[family-name:var(--font-playfair)] text-6xl md:text-8xl italic text-white mt-8 leading-none">Services</h2>
          </div>
          <p className="text-[0.65rem] text-[#444] tracking-[0.15em] max-w-[180px] text-right leading-relaxed">Tailored to your vehicle.<br />Delivered across Sydney.</p>
        </FadeIn>

        <div className="flex flex-col gap-px bg-white/[0.05]">
          {SERVICES.map((svc, i) => (
            <FadeIn key={svc.num} delay={i * 0.06}>
              <button
                onClick={() => navigate("booking")}
                className="group text-left w-full flex flex-col overflow-hidden hover:bg-white/[0.02] transition-colors duration-500"
              >
                {/* Photo — tall */}
                <div className="w-full h-[55vw] max-h-[480px] min-h-[260px] overflow-hidden">
                  <img
                    src={svc.img}
                    alt={svc.name}
                    className="w-full h-full object-cover brightness-60 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
                  />
                </div>

                {/* Text row */}
                <div className="px-6 md:px-10 py-6 flex items-center justify-between gap-6">
                  <div className="flex items-baseline gap-6">
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white/70 group-hover:text-white transition-colors duration-300">{svc.name}</h3>
                    <p className="hidden md:block text-[0.75rem] text-[#444] group-hover:text-[#666] leading-relaxed transition-colors duration-300 max-w-xl">{svc.desc}</p>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <span className="font-[family-name:var(--font-montserrat)] text-[0.42rem] tracking-[0.22em] uppercase text-[#333] group-hover:text-[#555] transition-colors">{svc.tag}</span>
                    <span className="text-white/20 group-hover:text-white/60 transition-colors duration-300 text-sm">→</span>
                  </div>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </PageView>
  )
}

function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <PageView className="overflow-y-auto">
      {/* ── Full-bleed hero image with text overlay ── */}
      <div className="relative w-full h-[60vh] min-h-[340px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work-4.jpg" alt="Renaissance Detailing" className="w-full h-full object-cover brightness-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

        {/* Back button */}
        <div className="absolute top-6 left-6 md:left-10">
          <BackBtn onClick={() => navigate("home")} />
        </div>

        {/* Overlay text */}
        <div className="absolute bottom-0 left-0 px-6 md:px-14 pb-10">
          <p className="font-[family-name:var(--font-montserrat)] text-[0.52rem] tracking-[0.35em] uppercase text-white/40 mb-3">Sydney Mobile Detailing</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl italic text-white leading-[1.1]">
            No shortcuts.<br />No compromises.
          </h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-14">

        {/* ── Intro split ── */}
        <FadeIn delay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 py-16 border-b border-white/[0.06]">
            <p className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white/80 leading-[1.5] italic">
              A Sydney-based sole trader built on one obsession — bringing out the very best in every vehicle we touch.
            </p>
            <div className="flex flex-col justify-center gap-5 text-[0.82rem] text-[#555] leading-[2]">
              <p>We come directly to you — whether that&apos;s your home, workplace, or anywhere across Sydney. Your time matters, and your car deserves attention on your terms.</p>
              <p>From a maintenance wash to ceramic coating, every job gets the same <span className="text-[#999]">unwavering attention to detail</span> the Renaissance name demands. Available 7 days a week, we work around your life.</p>
            </div>
          </div>
        </FadeIn>

        {/* ── Big stats ── */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-3 gap-0 py-14 border-b border-white/[0.06]">
            {[
              { num: "100%", label: "Mobile Service" },
              { num: "7",    label: "Days a Week" },
              { num: "SYD",  label: "Wide Coverage" },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col items-center text-center px-4 border-r border-white/[0.06] last:border-r-0">
                <span className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl text-white/80 leading-none">{num}</span>
                <span className="font-[family-name:var(--font-montserrat)] text-[0.45rem] tracking-[0.3em] uppercase text-[#444] mt-3">{label}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── Photo + quote split ── */}
        <FadeIn delay={0.12}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 py-14 border-b border-white/[0.06]">
            <div className="overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[320px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/work-1.jpg" alt="Detailing work" className="w-full h-full object-cover brightness-75 hover:brightness-90 transition-all duration-700" />
            </div>
            <div className="flex flex-col justify-center px-0 md:px-12 pt-8 md:pt-0">
              <p className="font-[family-name:var(--font-montserrat)] text-[0.48rem] tracking-[0.3em] uppercase text-[#444] mb-6">The Process</p>
              <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl italic text-white/70 leading-[1.6] mb-6">
                &ldquo;Every panel, every surface, every crevice — treated with the same exacting care.&rdquo;
              </p>
              <p className="text-[0.78rem] text-[#444] leading-[1.9]">We use only industry-leading products and take time to understand each vehicle individually. No two details are the same — every job is approached fresh.</p>
            </div>
          </div>
        </FadeIn>

        {/* ── Why list ── */}
        <FadeIn delay={0.16}>
          <p className="font-[family-name:var(--font-montserrat)] text-[0.6rem] tracking-[0.35em] uppercase text-[#888] mt-14 mb-8">Why Renaissance</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05] mb-14">
            {WHY_ITEMS.map((item) => (
              <div key={item.title} className="group bg-transparent hover:bg-white/[0.02] transition-colors p-6">
                <h4 className="font-[family-name:var(--font-playfair)] text-lg text-white/70 group-hover:text-white transition-colors duration-300 mb-2">{item.title}</h4>
                <p className="text-[0.72rem] text-[#444] leading-[1.8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── CTA ── */}
        <FadeIn delay={0.2}>
          <div className="pb-16">
            <button
              onClick={() => navigate("booking")}
              className="group flex items-center gap-3 text-[0.58rem] tracking-[0.4em] uppercase text-[#555] hover:text-[#c0c0c0] transition-colors duration-300"
            >
              <span className="block w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
              Book a Detail
            </button>
          </div>
        </FadeIn>

      </div>
    </PageView>
  )
}

function GalleryPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <PageView>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14">
        <FadeIn>
          <div className="mb-12">
            <BackBtn onClick={() => navigate("home")} />
            <p className="text-[0.6rem] font-medium tracking-[0.35em] uppercase text-[#888] mt-8">Our Work</p>
            <div className="w-10 h-px bg-[#c0c0c0] my-5" />
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white leading-tight mb-3">Gallery</h2>
            <p className="text-sm text-[#666]">
              Follow us on{" "}
              <a href="https://www.instagram.com/renaissancesyd/" target="_blank" rel="noopener noreferrer" className="text-[#d8d8d8] hover:text-white transition-colors">
                @renaissancesyd
              </a>{" "}
              for the latest work.
            </p>
          </div>
        </FadeIn>

        {/* Video — full width autoplay */}
        <FadeIn delay={0.08}>
          <div className="w-full overflow-hidden mb-0.5">
            <video
              src="/gloss.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full object-cover max-h-[70vh]"
            />
          </div>
        </FadeIn>

        {/* Photo grid */}
        <FadeIn delay={0.14}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
            {[
              "/hero.jpg",
              "/work-1.jpg",
              "/work-3.jpg",
              "/work-4.jpg",
              "/ceramic-2yr.jpg",
              "/ceramic-5yr.jpg",
              "/maintenance.jpg",
            ].map((src, i) => (
              <div key={i} className="relative overflow-hidden aspect-square group [&_span]:block [&_span]:w-full [&_span]:h-full">
                <ImageZoom
                  src={src}
                  alt={`Renaissance Detailing work ${i + 1}`}
                  width={800}
                  height={800}
                  className="!w-full !h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-100 !rounded-none"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.instagram.com/renaissancesyd/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.65rem] font-medium tracking-[0.25em] uppercase text-[#777] hover:text-white transition-colors group"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              View on Instagram
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </PageView>
  )
}

function ContactPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <PageView>
      <div className="max-w-2xl mx-auto px-6 md:px-10 py-14">
        <FadeIn>
          <BackBtn onClick={() => navigate("home")} />
          <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl italic text-white mt-10 mb-12 leading-tight">Contact</h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="space-y-0">
            {[
              { label: "Phone", value: "0400 000 000", href: "tel:0400000000" },
              { label: "Email", value: "info@renaissancedetailing.com.au", href: "mailto:info@renaissancedetailing.com.au" },
              { label: "Area", value: "Sydney-wide — fully mobile" },
              { label: "Hours", value: "By appointment, 7 days a week" },
            ].map(({ label, value, href }) => (
              <div key={label} className="flex items-baseline gap-8 py-5 border-b border-white/[0.06]">
                <span className="font-[family-name:var(--font-montserrat)] text-[0.48rem] tracking-[0.25em] uppercase text-[#333] w-12 shrink-0">{label}</span>
                {href ? (
                  <a href={href} className="font-[family-name:var(--font-playfair)] text-xl text-white/70 hover:text-white transition-colors duration-200">{value}</a>
                ) : (
                  <span className="font-[family-name:var(--font-playfair)] text-xl text-white/70">{value}</span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-14 flex flex-col gap-5">
            <a
              href="https://www.instagram.com/renaissancesyd/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-[0.58rem] tracking-[0.3em] uppercase text-[#444] hover:text-[#999] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @renaissancesyd
            </a>
            <button
              onClick={() => navigate("booking")}
              className="group flex items-center gap-3 text-[0.58rem] tracking-[0.4em] uppercase text-[#555] hover:text-[#c0c0c0] transition-colors duration-300"
            >
              <span className="block w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
              Book a Detail
            </button>
          </div>
        </FadeIn>
      </div>
    </PageView>
  )
}

function BookingPage({ navigate }: { navigate: (p: Page) => void }) {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", vehicle: "", service: "", date: "", notes: "" })
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)

  const handleSubmit = () => {
    const required = ["name", "phone", "email", "vehicle", "service"] as const
    if (!required.every((k) => formData[k].trim())) { setFormError(true); return }
    setFormError(false)
    setSubmitted(true)
  }

  return (
    <PageView>
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-14">
        <FadeIn>
          <BackBtn onClick={() => navigate("home")} />
          <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl italic text-white mt-10 mb-2 leading-tight">Book a Detail</h2>
          <p className="text-[0.72rem] text-[#555] leading-relaxed mb-12">Fill in the form and we&apos;ll be in touch within 24 hours.</p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          <FadeIn delay={0.05} className="lg:col-span-2">
            <p className="text-[0.82rem] text-[#777] leading-[1.9] mb-8">
              Fill in the form and we&apos;ll respond promptly with pricing, availability, and details. Fully mobile across all of Sydney.
            </p>
            <div className="space-y-3">
              {[
                { label: "Phone", value: "0400 000 000" },
                { label: "Email", value: "info@renaissancedetailing.com.au" },
                { label: "Service Area", value: "Sydney-wide · Fully Mobile" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 items-start p-4 border border-white/10">
                  <div>
                    <div className="text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-[#d8d8d8] mb-0.5">{label}</div>
                    <div className="text-[0.73rem] text-[#777]">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className="lg:col-span-3">
            {submitted ? (
              <div className="text-center py-16 border border-white/10">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white mb-3">Thank You</h3>
                <p className="text-[0.78rem] text-[#777]">Your request has been received. We&apos;ll be in touch within 24 hours with a tailored quote.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
                {[
                  { id: "name", label: "Full Name", type: "text", placeholder: "John Smith" },
                  { id: "phone", label: "Phone Number", type: "tel", placeholder: "04XX XXX XXX" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "you@email.com" },
                  { id: "vehicle", label: "Vehicle Make & Model", type: "text", placeholder: "e.g. BMW M3" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} className="bg-[#0d0d0d]">
                    <label className="block text-[0.58rem] font-semibold tracking-[0.25em] uppercase text-[#777] px-5 pt-4 pb-1">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={formData[id as keyof typeof formData]}
                      onChange={(e) => setFormData((p) => ({ ...p, [id]: e.target.value }))}
                      className={`w-full bg-transparent border-b px-5 pb-4 text-[0.8rem] text-white font-light placeholder:text-white/20 outline-none transition-colors ${formError && !formData[id as keyof typeof formData].trim() ? "border-red-500/50" : "border-white/10 focus:border-white/30"}`}
                    />
                  </div>
                ))}

                <div className="bg-[#0d0d0d] sm:col-span-2">
                  <label className="block text-[0.58rem] font-semibold tracking-[0.25em] uppercase text-[#777] px-5 pt-4 pb-1">Service Required</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                    className={`w-full bg-[#0d0d0d] border-b px-5 pb-4 text-[0.8rem] text-white font-light outline-none appearance-none transition-colors ${formError && !formData.service ? "border-red-500/50" : "border-white/10 focus:border-white/30"}`}
                  >
                    <option value="" disabled>Select a service…</option>
                    {SERVICES.map((s) => <option key={s.num} value={s.name}>{s.name}</option>)}
                    <option value="unsure">Not sure — please advise</option>
                  </select>
                </div>

                <div className="bg-[#0d0d0d] sm:col-span-2">
                  <label className="block text-[0.58rem] font-semibold tracking-[0.25em] uppercase text-[#777] px-5 pt-4 pb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                    className="w-full bg-transparent border-b border-white/10 px-5 pb-4 text-[0.8rem] text-white font-light outline-none focus:border-white/30 transition-colors [color-scheme:dark]"
                  />
                </div>

                <div className="bg-[#0d0d0d] sm:col-span-2">
                  <label className="block text-[0.58rem] font-semibold tracking-[0.25em] uppercase text-[#777] px-5 pt-4 pb-1">Additional Notes</label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                    placeholder="Vehicle condition, specific concerns, your location…"
                    className="w-full bg-transparent border-b border-white/10 px-5 pb-4 text-[0.8rem] text-white font-light placeholder:text-white/20 outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <div className="bg-[#0d0d0d] sm:col-span-2 p-5">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#c0c0c0] text-black text-[0.65rem] font-semibold tracking-[0.35em] uppercase py-4 hover:bg-white transition-all duration-300"
                  >
                    Request a Booking
                  </button>
                  <p className="text-center text-[0.62rem] text-white/25 mt-3">We&apos;ll respond within 24 hours with a tailored quote.</p>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </PageView>
  )
}

// ─── Home / Landing ────────────────────────────────────────────────────────────
function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="relative h-full flex flex-col items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 flex flex-col items-center px-8 w-full max-w-3xl">

        {/* Logo */}
        <FadeIn className="flex flex-col items-center text-center gap-0">
          <LogoMark size={110} />
          <div className="mt-8">
            <GooeyText
              texts={["Renaissance Detailing", "Sydney Mobile", "Ceramic Coating", "By Appointment"]}
              morphTime={1.2}
              cooldownTime={2.5}
              className="h-16 w-[480px] max-w-[92vw]"
              textClassName="font-[family-name:var(--font-playfair)] text-[2rem] font-bold tracking-[0.18em] uppercase text-white w-full"
            />
          </div>
        </FadeIn>

        {/* Thin rule */}
        <FadeIn delay={0.12} className="w-full mt-10">
          <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
        </FadeIn>

        {/* Nav row — no boxes, just type */}
        <FadeIn delay={0.2} className="w-full mt-8">
          <div className="flex justify-center items-start gap-0">
            {([
              { id: "services", label: "Services",  num: "01" },
              { id: "about",    label: "About",      num: "02" },
              { id: "gallery",  label: "Gallery",    num: "03" },
              { id: "contact",  label: "Contact",    num: "04" },
            ] as { id: Page; label: string; num: string }[]).map(({ id, label, num }, i) => (
              <div key={id} className="flex items-stretch">
                <button
                  onClick={() => navigate(id)}
                  className="group flex flex-col items-center gap-1.5 px-6 md:px-9 py-2"
                >
                  <span className="font-[family-name:var(--font-playfair)] italic text-[1.45rem] md:text-[1.7rem] font-normal text-white/40 group-hover:text-white/90 transition-all duration-300 leading-none tracking-wide">
                    {label}
                  </span>
                  <span className="block w-0 h-px bg-white/30 group-hover:w-full transition-all duration-500" />
                </button>
                {i < 3 && <span className="self-center text-white/[0.08] text-xs select-none">·</span>}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Rule + Book Now */}
        <FadeIn delay={0.32} className="w-full mt-8 flex flex-col items-center gap-6">
          <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
          <button
            onClick={() => navigate("booking")}
            className="group flex items-center gap-3 text-[0.58rem] tracking-[0.4em] uppercase text-[#666] hover:text-[#c0c0c0] transition-colors duration-300"
          >
            <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
            Book a Detail
            <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
          </button>
        </FadeIn>

      </div>
    </div>
  )
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [page, setPage] = useState<Page>("home")

  const navigate = (p: Page) => {
    setPage(p)
    // scroll inner content back to top whenever switching pages
    setTimeout(() => {
      const main = document.getElementById("main-content")
      if (main) main.scrollTop = 0
    }, 10)
  }

  return (
    <div className="text-white h-screen flex flex-col overflow-hidden relative bg-black">
      {/* Persistent background across all pages */}
      <div className="fixed inset-0 z-0">
        <HeroBackground />
        {/* Subtle overlay on inner pages so text stays readable */}
        {page !== "home" && <div className="absolute inset-0 bg-black/25" />}
      </div>

      {page !== "home" && <TopBar navigate={navigate} current={page} />}

      <div id="main-content" className="flex-1 overflow-hidden relative z-10">
        {page === "home"     && <HomePage    navigate={navigate} />}
        {page === "services" && <ServicesPage navigate={navigate} />}
        {page === "about"    && <AboutPage    navigate={navigate} />}
        {page === "gallery"  && <GalleryPage  navigate={navigate} />}
        {page === "contact"  && <ContactPage  navigate={navigate} />}
        {page === "booking"  && <BookingPage  navigate={navigate} />}
      </div>

      {page !== "home" && (
        <footer className="shrink-0 border-t border-white/[0.07] py-4 px-8 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <span className="text-[0.58rem] text-white/20">© 2024 Renaissance Detailing. All rights reserved.</span>
            <span className="text-[0.58rem] text-white/20">Sydney, New South Wales, Australia</span>
          </div>
        </footer>
      )}
    </div>
  )
}
