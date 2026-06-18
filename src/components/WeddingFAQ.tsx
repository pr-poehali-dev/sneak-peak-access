/* ─── FAQ: 3 карточки в стиле деревянных табличек с кружевом ─── */
import { useEffect, useRef, useState } from "react"

const FAQS = [
  {
    q: "Подарки",
    a: "Дорогие гости, ваш подарок — это ваше внимание! Мы будем рады вашему вкладу в наш семейный бюджет или любым тёплым сюрпризам. Главное — вы рядом!",
    icon: "🎁",
  },
  {
    q: "Маленькие гости",
    a: "Формат нашего торжества не предполагает детской зоны и аниматоров, поэтому оставьте, пожалуйста, малышей в надёжных руках.",
    icon: "👶",
  },
  {
    q: "Другие вопросы",
    a: "Если у вас остались вопросы — вы можете задать их в Telegram, ВКонтакте, Bip или просто спросить нас лично. Мы всегда на связи!",
    icon: "💬",
  },
]

export function WeddingFAQ() {
  const [vis, setVis] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} id="faq" className="relative py-20 px-4 overflow-hidden">
      {/* Деревянный фон */}
      <div className="absolute inset-0 wood-texture"/>
      <div className="absolute inset-0" style={{ background:"hsl(var(--ivory) / 0.6)" }}/>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Заголовок */}
        <div className={`text-center mb-12 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-kudry italic text-4xl md:text-5xl" style={{ color:"hsl(var(--warm-brown))" }}>
            Частые вопросы
          </h2>
          <div className="pearl-divider mt-4 mx-auto max-w-xs">
            <div className="w-2 h-2 rounded-full" style={{ background:"linear-gradient(135deg,#f0e8d5,#d8c9a8)", border:"1px solid #e0cda8" }}/>
          </div>
        </div>

        {/* Карточки */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay:`${i*120}ms` }}
            >
              {/* "Деревянная табличка" с кружевом */}
              <div
                className="overflow-hidden"
                style={{
                  background:"linear-gradient(135deg, hsl(var(--wood-bg)), hsl(30 30% 82%))",
                  border:"1.5px solid hsl(var(--pearl))",
                  borderRadius:"1.1rem",
                  boxShadow:"0 0 0 3px hsl(var(--ivory)), 0 0 0 4px hsl(var(--pearl) / 0.5), 0 4px 16px rgba(100,70,30,0.12)",
                }}
              >
                {/* Кнопка-заголовок */}
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  style={{ background:"transparent" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{faq.icon}</span>
                    <span className="font-kudry italic text-xl md:text-2xl" style={{ color:"hsl(var(--warm-brown))" }}>
                      {faq.q}
                    </span>
                  </div>
                  {/* Стрелка */}
                  <svg
                    className="w-5 h-5 shrink-0 transition-transform duration-350"
                    style={{
                      color:"hsl(var(--gold))",
                      transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                {/* Ответ */}
                <div
                  className="faq-body"
                  style={{ maxHeight: open === i ? "240px" : "0", opacity: open === i ? 1 : 0 }}
                >
                  {/* Тонкая линия-разделитель */}
                  <div className="mx-6 h-px" style={{ background:"hsl(var(--pearl) / 0.8)" }}/>
                  <p className="px-6 py-5 font-sans text-sm leading-relaxed" style={{ color:"hsl(var(--foreground) / 0.72)" }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
