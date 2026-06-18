/* ─── Секция локаций: две карточки на фоне деревянной текстуры ─── */
import { useEffect, useRef, useState } from "react"

const CEREMONY_IMG = "https://cdn.poehali.dev/projects/55b19651-2bf9-4e62-a3bc-45cc9f97f0cd/files/075d8757-f269-429d-abd6-73c8ad276794.jpg"
const BANQUET_IMG  = "https://cdn.poehali.dev/projects/55b19651-2bf9-4e62-a3bc-45cc9f97f0cd/files/767c19c5-8f47-42a9-9a30-52326e15ab24.jpg"

const locations = [
  {
    emoji: "💍",
    label: "Церемония",
    title: "Церемония бракосочетания",
    address: "ул. Юности, 6б, Нижнекамск",
    time: "13:20",
    mapUrl: "https://yandex.ru/maps/?text=ул.+Юности+6б+Нижнекамск",
    img: CEREMONY_IMG,
    imgAlt: "Место церемонии бракосочетания",
  },
  {
    emoji: "🥂",
    label: "Банкет",
    title: "Банкет",
    address: "Береговая ул., 88, Вишнёвый сад",
    time: "16:00 — 21:00",
    mapUrl: "https://yandex.ru/maps/?text=Береговая+88+Нижнекамск",
    img: BANQUET_IMG,
    imgAlt: "Банкетный зал Вишнёвый сад",
  },
]

/* Декоративная кружевная рамка-svg вокруг карточки */
const LaceFrame = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" style={{zIndex:0}}>
    <rect x="6" y="6" width="calc(100%-12)" height="calc(100%-12)"
      fill="none" stroke="hsl(var(--pearl))" strokeWidth="1" rx="18"
      style={{ width:"calc(100% - 12px)", height:"calc(100% - 12px)" }}/>
    <rect x="2" y="2" width="calc(100%-4)" height="calc(100%-4)"
      fill="none" stroke="hsl(var(--gold-light) / 0.4)" strokeWidth="0.8" rx="20"
      style={{ width:"calc(100% - 4px)", height:"calc(100% - 4px)" }}/>
  </svg>
)

export function WeddingLocations() {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} id="locations" className="relative py-20 px-4 overflow-hidden">
      {/* Деревянный фон */}
      <div className="absolute inset-0 wood-texture" />
      <div className="absolute inset-0" style={{ background: "hsl(var(--ivory) / 0.55)" }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Заголовок */}
        <div className={`text-center mb-12 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="font-kudry italic text-4xl md:text-5xl" style={{ color:"hsl(var(--warm-brown))" }}>
            Место торжества
          </h2>
          {/* Жемчужный разделитель */}
          <div className="pearl-divider mt-4 mx-auto max-w-xs">
            <div className="w-2 h-2 rounded-full shadow-sm" style={{ background:"linear-gradient(135deg,#f0e8d5,#d8c9a8)", border:"1px solid #e0cda8" }}/>
          </div>
        </div>

        {/* Карточки */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {locations.map((loc, i) => (
            <div
              key={loc.title}
              className={`relative transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 160}ms` }}
            >
              {/* Карточка */}
              <div className="lace-card p-6 flex flex-col gap-5">
                <LaceFrame />

                {/* Фото с закруглёнными краями */}
                <div className="relative z-10 overflow-hidden" style={{ borderRadius:"1rem" }}>
                  <img
                    src={loc.img}
                    alt={loc.imgAlt}
                    className="w-full h-48 md:h-56 object-cover"
                    style={{ borderRadius:"1rem" }}
                    loading="lazy"
                  />
                  {/* Нежный оверлей */}
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, transparent 60%, hsl(var(--ivory) / 0.4))", borderRadius:"1rem" }}/>
                </div>

                {/* Контент карточки */}
                <div className="relative z-10 flex flex-col gap-3">
                  {/* Заголовок */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{loc.emoji}</span>
                    <h3 className="font-kudry italic text-2xl leading-tight" style={{ color:"hsl(var(--warm-brown))" }}>
                      {loc.title}
                    </h3>
                  </div>

                  {/* Жемчужная линия */}
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1" style={{ background:"linear-gradient(to right, hsl(var(--gold-light) / 0.5), transparent)" }}/>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background:"hsl(var(--gold-light))" }}/>
                  </div>

                  {/* Адрес */}
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color:"hsl(var(--sage))" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p className="text-sm font-sans" style={{ color:"hsl(var(--muted-foreground))" }}>{loc.address}</p>
                  </div>

                  {/* Время */}
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 shrink-0" style={{ color:"hsl(var(--sage))" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="font-kudry text-xl" style={{ color:"hsl(var(--warm-brown))" }}>{loc.time}</span>
                  </div>

                  {/* Кнопка карты */}
                  <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-map inline-flex items-center gap-2 px-5 py-2.5 font-sans text-sm font-medium self-start mt-1">
                    📍 Посмотреть на карте
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
