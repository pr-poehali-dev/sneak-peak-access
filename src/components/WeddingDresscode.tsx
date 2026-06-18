/* Секция: дресс-код с цветовыми кружками */
import { useEffect, useRef, useState } from "react"

const colors = [
  { name: "Бежевый", hex: "#E8D5B7" },
  { name: "Розовый", hex: "#F2C4CE" },
  { name: "Зелёный", hex: "#8DB596" },
  { name: "Тёмно-зелёный", hex: "#3D6B58" },
  { name: "Светло-коричневый", hex: "#C4A882" },
  { name: "Шоколадный", hex: "#7B5635" },
  { name: "Чёрный", hex: "#2C2C2C" },
]

export function WeddingDresscode() {
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
    <section ref={ref} id="dresscode" className="py-20 px-4 bg-cream relative overflow-hidden">
      {/* Декоративный кружевной верх */}
      <svg className="absolute top-0 left-0 right-0 w-full opacity-20 pointer-events-none" height="30" viewBox="0 0 400 30" preserveAspectRatio="none">
        <path d="M0 30 Q25 5 50 30 Q75 5 100 30 Q125 5 150 30 Q175 5 200 30 Q225 5 250 30 Q275 5 300 30 Q325 5 350 30 Q375 5 400 30" fill="none" stroke="#c8b89a" strokeWidth="1.5"/>
      </svg>

      <div className="max-w-3xl mx-auto text-center">
        {/* Заголовок */}
        <div className={`mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-3">Внешний вид</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground font-normal mb-4">
            Дресс-код
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-12 bg-warm-brown opacity-30"/>
            <div className="w-1.5 h-1.5 rounded-full bg-warm-brown opacity-50"/>
            <div className="h-px w-12 bg-warm-brown opacity-30"/>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Для нас самое главное Ваше присутствие! Но мы будем очень рады видеть Вас в нарядах
            спокойных, пастельных тонов, которые подчеркнут нежную атмосферу нашего праздника.
          </p>
        </div>

        {/* Цветовые кружки */}
        <div
          className={`flex flex-wrap justify-center gap-5 mb-8 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {colors.map((color, i) => (
            <div key={color.name} className="flex flex-col items-center gap-2" style={{ transitionDelay: `${i * 60}ms` }}>
              <div
                className="w-12 h-12 rounded-full shadow-sm border-2 border-white ring-1 ring-black/5"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs text-muted-foreground max-w-[64px] text-center leading-tight">
                {color.name}
              </span>
            </div>
          ))}
        </div>

        {/* Подпись про обувь */}
        <p
          className={`text-sm text-muted-foreground transition-all duration-700 delay-400 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          👟 Сменная обувь приветствуется
        </p>
      </div>

      {/* Декоративный кружевной низ */}
      <svg className="absolute bottom-0 left-0 right-0 w-full opacity-20 pointer-events-none" height="30" viewBox="0 0 400 30" preserveAspectRatio="none">
        <path d="M0 0 Q25 25 50 0 Q75 25 100 0 Q125 25 150 0 Q175 25 200 0 Q225 25 250 0 Q275 25 300 0 Q325 25 350 0 Q375 25 400 0" fill="none" stroke="#c8b89a" strokeWidth="1.5"/>
      </svg>
    </section>
  )
}
