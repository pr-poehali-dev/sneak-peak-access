/* Шапка свадебного сайта: имена, дата, кружевной декор, ветки эвкалипта */
import { useEffect, useState } from "react"

export function WeddingHero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-lace px-4 py-16">

      {/* Фоновый паттерн — нежная сетка */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--warm-brown)) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Декор: ветки эвкалипта SVG — левый угол */}
      <svg
        className="absolute top-0 left-0 w-48 md:w-72 opacity-30 pointer-events-none"
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 170 Q50 100 100 80 Q140 60 180 20" stroke="#5d8a6f" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="40" cy="130" rx="14" ry="9" fill="#5d8a6f" opacity="0.5" transform="rotate(-35 40 130)"/>
        <ellipse cx="65" cy="108" rx="14" ry="9" fill="#5d8a6f" opacity="0.45" transform="rotate(-25 65 108)"/>
        <ellipse cx="90" cy="90" rx="14" ry="9" fill="#5d8a6f" opacity="0.4" transform="rotate(-15 90 90)"/>
        <ellipse cx="120" cy="72" rx="13" ry="8" fill="#5d8a6f" opacity="0.35" transform="rotate(-5 120 72)"/>
        <ellipse cx="150" cy="50" rx="12" ry="7" fill="#5d8a6f" opacity="0.3" transform="rotate(10 150 50)"/>
      </svg>

      {/* Декор: ветки эвкалипта — правый угол (зеркальный) */}
      <svg
        className="absolute top-0 right-0 w-48 md:w-72 opacity-30 pointer-events-none"
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "scaleX(-1)" }}
      >
        <path d="M10 170 Q50 100 100 80 Q140 60 180 20" stroke="#5d8a6f" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="40" cy="130" rx="14" ry="9" fill="#5d8a6f" opacity="0.5" transform="rotate(-35 40 130)"/>
        <ellipse cx="65" cy="108" rx="14" ry="9" fill="#5d8a6f" opacity="0.45" transform="rotate(-25 65 108)"/>
        <ellipse cx="90" cy="90" rx="14" ry="9" fill="#5d8a6f" opacity="0.4" transform="rotate(-15 90 90)"/>
        <ellipse cx="120" cy="72" rx="13" ry="8" fill="#5d8a6f" opacity="0.35" transform="rotate(-5 120 72)"/>
        <ellipse cx="150" cy="50" rx="12" ry="7" fill="#5d8a6f" opacity="0.3" transform="rotate(10 150 50)"/>
      </svg>

      {/* Кружевной декор сверху */}
      <svg className="absolute top-0 left-0 right-0 w-full opacity-25 pointer-events-none" height="40" viewBox="0 0 400 40" preserveAspectRatio="none">
        <path d="M0 40 Q25 10 50 40 Q75 10 100 40 Q125 10 150 40 Q175 10 200 40 Q225 10 250 40 Q275 10 300 40 Q325 10 350 40 Q375 10 400 40" fill="none" stroke="#c8b89a" strokeWidth="1.5"/>
        {[0,50,100,150,200,250,300,350,400].map(x => (
          <circle key={x} cx={x} cy={40} r={2.5} fill="#c8b89a"/>
        ))}
      </svg>

      {/* Центральный блок */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Маленький подзаголовок */}
        <p
          className={`text-xs tracking-[0.35em] uppercase text-sage font-sans mb-6 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Приглашение на бракосочетание
        </p>

        {/* Жемчужное кольцо-разделитель */}
        <div className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-warm-brown opacity-40"/>
          <span className="text-warm-brown text-xl">◈</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-warm-brown opacity-40"/>
        </div>

        {/* Главный заголовок */}
        <h1
          className={`font-serif font-normal leading-tight text-foreground mb-4 transition-all duration-900 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
        >
          Александр
          <span className="block italic text-sage" style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", lineHeight: 1.4 }}>
            &amp; Дарья
          </span>
        </h1>

        {/* Дата */}
        <div
          className={`transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="font-serif text-2xl md:text-3xl text-warm-brown tracking-widest mb-2">
            08 · 08 · 2026
          </p>
          <p className="text-sm text-muted-foreground font-sans tracking-[0.25em] uppercase">
            Нижнекамск
          </p>
        </div>

        {/* Жемчужный разделитель снизу */}
        <div className={`flex items-center justify-center gap-2 mt-8 transition-all duration-700 delay-700 ${visible ? "opacity-100" : "opacity-0"}`}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-full bg-sage-light"
              style={{
                width: i === 2 ? 10 : i === 1 || i === 3 ? 7 : 5,
                height: i === 2 ? 10 : i === 1 || i === 3 ? 7 : 5,
                opacity: i === 2 ? 0.9 : 0.5,
              }}
            />
          ))}
        </div>

        {/* Кнопка прокрутки вниз */}
        <a
          href="#locations"
          className={`inline-flex flex-col items-center gap-2 mt-12 text-xs tracking-widest uppercase text-muted-foreground hover:text-sage transition-colors duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          Подробнее
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
          </svg>
        </a>
      </div>

      {/* Кружевной декор снизу */}
      <svg className="absolute bottom-0 left-0 right-0 w-full opacity-25 pointer-events-none" height="40" viewBox="0 0 400 40" preserveAspectRatio="none">
        <path d="M0 0 Q25 30 50 0 Q75 30 100 0 Q125 30 150 0 Q175 30 200 0 Q225 30 250 0 Q275 30 300 0 Q325 30 350 0 Q375 30 400 0" fill="none" stroke="#c8b89a" strokeWidth="1.5"/>
        {[0,50,100,150,200,250,300,350,400].map(x => (
          <circle key={x} cx={x} cy={0} r={2.5} fill="#c8b89a"/>
        ))}
      </svg>
    </section>
  )
}
