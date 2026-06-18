/* ─── Главная страница свадебного сайта Александра & Дарьи ─── */
import { useState } from "react"
import { WeddingHero }        from "@/components/WeddingHero"
import { WeddingLocations }   from "@/components/WeddingLocations"
import { WeddingDresscode }   from "@/components/WeddingDresscode"
import { WeddingFAQ }         from "@/components/WeddingFAQ"
import { WeddingRSVP }        from "@/components/WeddingRSVP"
import { WeddingTimer }       from "@/components/WeddingTimer"
import { WeddingThankYou }    from "@/components/WeddingThankYou"
import { WeddingMusicPlayer } from "@/components/WeddingMusicPlayer"

export default function Index() {
  const [submitted, setSubmitted] = useState(false)

  /* После отправки формы — страница "Спасибо" */
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
      {/* Плавающая кнопка музыки */}
      <WeddingMusicPlayer />

      {/* 1. Шапка */}
      <WeddingHero />

      {/* 2. Локации */}
      <WeddingLocations />

      {/* 3. Дресс-код */}
      <WeddingDresscode />

      {/* 4. FAQ */}
      <WeddingFAQ />

      {/* 5. RSVP-форма */}
      <WeddingRSVP onSubmitSuccess={() => setSubmitted(true)} />

      {/* 6. Таймер обратного отсчёта */}
      <WeddingTimer />

      {/* Футер */}
      <footer className="relative py-8 px-4 overflow-hidden" style={{ background:"hsl(var(--ivory))" }}>
        <div className="absolute top-0 left-0 right-0 lace-top"/>
        <div className="text-center relative z-10">
          <p className="font-kudry italic text-xl" style={{ color:"hsl(var(--warm-brown))" }}>
            Александр &amp; Дарья
          </p>
          <p className="mt-1 text-xs tracking-widest font-sans" style={{ color:"hsl(var(--muted-foreground))" }}>
            08 · 08 · 2026 · Нижнекамск
          </p>
          {/* Жемчуг */}
          <div className="flex justify-center gap-1 mt-4">
            {[3,4,5,6,5,4,3].map((s,i)=>(
              <div key={i} className="rounded-full"
                style={{ width:s,height:s, background:"linear-gradient(135deg,#f0e8d5,#d8c9a8)", border:"1px solid #e0d5b8" }}/>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
