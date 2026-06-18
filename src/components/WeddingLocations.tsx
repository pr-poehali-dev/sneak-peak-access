/* Секция: две карточки локаций — Церемония и Банкет */
import { useEffect, useRef, useState } from "react"

const locations = [
  {
    emoji: "💍",
    title: "Церемония бракосочетания",
    address: "ул. Юности, 6б, Нижнекамск",
    time: "13:20",
    timeLabel: "Начало",
    mapUrl: "https://yandex.ru/maps/?text=ул.+Юности+6б+Нижнекамск",
  },
  {
    emoji: "🥂",
    title: "Банкет",
    address: "Береговая ул., 88, Вишнёвый сад",
    time: "16:00 — 21:00",
    timeLabel: "Время",
    mapUrl: "https://yandex.ru/maps/?text=Береговая+88+Нижнекамск+Вишнёвый+сад",
  },
]

export function WeddingLocations() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="locations" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок секции */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-3">Где нас найти</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground font-normal">
            Место торжества
          </h2>
          {/* Жемчужная линия */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-12 bg-warm-brown opacity-30"/>
            <div className="w-1.5 h-1.5 rounded-full bg-warm-brown opacity-50"/>
            <div className="h-px w-12 bg-warm-brown opacity-30"/>
          </div>
        </div>

        {/* Карточки */}
        <div className="grid md:grid-cols-2 gap-6">
          {locations.map((loc, i) => (
            <div
              key={loc.title}
              className={`bg-lace border border-pearl rounded-xl p-8 flex flex-col gap-4 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Иконка и заголовок */}
              <div className="flex items-start gap-4">
                <span className="text-4xl leading-none">{loc.emoji}</span>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground font-normal leading-tight">
                    {loc.title}
                  </h3>
                </div>
              </div>

              {/* Адрес */}
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-sage shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p className="text-muted-foreground text-sm leading-relaxed">{loc.address}</p>
              </div>

              {/* Время */}
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-sage shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <span className="text-xs text-muted-foreground tracking-widest uppercase">{loc.timeLabel}: </span>
                  <span className="font-serif text-lg text-foreground">{loc.time}</span>
                </div>
              </div>

              {/* Кнопка карты */}
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-sage text-white text-xs tracking-widest uppercase rounded-lg hover:bg-sage/90 transition-colors duration-300 w-fit"
              >
                📍 Посмотреть на карте
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
