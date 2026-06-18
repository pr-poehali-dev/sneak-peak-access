/* ─── Дресс-код: 7 цветовых кружков без подписей ─── */
import { useEffect, useRef, useState } from "react"

/* Только цвета — без подписей, по ТЗ */
const COLORS = ["#E8D9C0","#F2C4CE","#8DB596","#3D6B58","#C4A882","#7B5635","#2C2C2C"]

export function WeddingDresscode() {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.15 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} id="dresscode" className="relative py-20 px-4 overflow-hidden"
      style={{ background:"hsl(var(--ivory))" }}>
      {/* Кружевные бордюры */}
      <div className="absolute top-0 left-0 right-0 lace-top"/>
      <div className="absolute bottom-0 left-0 right-0 lace-bottom"/>

      {/* Точечный паттерн */}
      <div className="absolute inset-0" style={{
        backgroundImage:"radial-gradient(circle, hsl(40 55% 75% / 0.12) 1px, transparent 1px)",
        backgroundSize:"28px 28px",
      }}/>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Заголовок */}
        <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-kudry italic text-4xl md:text-5xl" style={{ color:"hsl(var(--warm-brown))" }}>
            Дресс-код
          </h2>
          {/* Жемчужная нить под заголовком */}
          <div className="flex justify-center gap-1 mt-3 mb-7">
            {[3,4,5,6,5,8,6,5,8,6,5,4,3].map((s,i)=>(
              <div key={i} className="rounded-full"
                style={{ width:s, height:s, background:"linear-gradient(135deg,#f0e8d5,#d8c9a8)", border:"1px solid #e0d5b8" }}/>
            ))}
          </div>
        </div>

        {/* Текст */}
        <p className={`font-sans text-sm md:text-base leading-relaxed mb-10 transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ color:"hsl(var(--foreground) / 0.72)" }}>
          Для нас самое главное Ваше присутствие! Но мы будем очень рады видеть Вас в нарядах
          спокойных, пастельных тонов, которые подчеркнут нежную атмосферу нашего праздника.
        </p>

        {/* Цветовые кружки */}
        <div className={`flex justify-center gap-4 flex-wrap mb-10 transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          {COLORS.map((hex, i) => (
            <div
              key={hex}
              className="relative rounded-full shadow-md transition-transform duration-300 hover:scale-110"
              style={{
                width: 52, height: 52,
                backgroundColor: hex,
                border: "3px solid hsl(var(--ivory))",
                boxShadow: `0 0 0 1.5px hsl(var(--pearl)), 0 4px 12px rgba(0,0,0,0.12)`,
                transitionDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>

        {/* Подпись */}
        <p className={`font-sans text-sm italic transition-all duration-700 delay-400 ${vis ? "opacity-100" : "opacity-0"}`}
          style={{ color:"hsl(var(--muted-foreground))" }}>
          Банкет пройдёт на базе отдыха. Учитывайте это при выборе одежды и обуви.
        </p>
      </div>
    </section>
  )
}
