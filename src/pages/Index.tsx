import { useState } from "react"
import { WeddingHero } from "@/components/WeddingHero"
import { WeddingLocations } from "@/components/WeddingLocations"
import { WeddingDresscode } from "@/components/WeddingDresscode"
import { WeddingFAQ } from "@/components/WeddingFAQ"
import { WeddingRSVP } from "@/components/WeddingRSVP"
import { WeddingTimer } from "@/components/WeddingTimer"
import { WeddingThankYou } from "@/components/WeddingThankYou"
import { WeddingMusicPlayer } from "@/components/WeddingMusicPlayer"

export default function Index() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <>
        <WeddingMusicPlayer />
        <WeddingThankYou />
      </>
    )
  }

  return (
    <main className="min-h-screen" id="hero">
      <WeddingMusicPlayer />

      {/* 1. Шапка */}
      <WeddingHero />

      {/* 2. Локации */}
      <WeddingLocations />

      {/* 3. Дресс-код */}
      <WeddingDresscode />

      {/* 4. FAQ */}
      <WeddingFAQ />

      {/* 5. RSVP форма */}
      <WeddingRSVP onSubmitSuccess={() => setSubmitted(true)} />

      {/* 6. Таймер обратного отсчёта */}
      <WeddingTimer />

      {/* Мини-футер */}
      <footer className="py-8 text-center text-xs text-muted-foreground bg-white border-t border-pearl">
        <p className="font-serif italic text-base text-foreground mb-1">Александр &amp; Дарья</p>
        <p>08 · 08 · 2026 · Нижнекамск</p>
      </footer>
    </main>
  )
}
