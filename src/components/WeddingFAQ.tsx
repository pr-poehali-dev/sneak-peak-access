/* Секция FAQ — 3 раскрывающиеся карточки */
import { useEffect, useRef, useState } from "react"

const faqs = [
  {
    question: "🎁 Подарки",
    answer:
      "Дорогие гости, ваш подарок — это ваше внимание! Мы будем рады конвертам или любым тёплым сюрпризам. Главное — вы рядом!",
  },
  {
    question: "👶 Маленькие гости",
    answer:
      "Для детей мы подготовили отдельный сладкий стол и пригласили аниматора. Так что малыши точно не заскучают!",
  },
  {
    question: "💬 Другие вопросы",
    answer:
      "Если у вас остались вопросы — смело пишите нам в WhatsApp или спросите лично в день свадьбы. Мы на связи!",
  },
]

export function WeddingFAQ() {
  const [visible, setVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section ref={ref} id="faq" className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Заголовок */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-3">Частые вопросы</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground font-normal">
            Всё, что важно знать
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-12 bg-warm-brown opacity-30"/>
            <div className="w-1.5 h-1.5 rounded-full bg-warm-brown opacity-50"/>
            <div className="h-px w-12 bg-warm-brown opacity-30"/>
          </div>
        </div>

        {/* Карточки FAQ */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className={`border border-pearl rounded-xl overflow-hidden bg-lace transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Кнопка вопроса */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-sage-pale/40 transition-colors duration-200"
              >
                <span className="font-serif text-lg text-foreground">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-sage shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {/* Ответ с анимацией */}
              <div
                className="faq-content"
                style={{
                  maxHeight: openIndex === i ? "300px" : "0",
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p className="px-6 pb-5 text-muted-foreground leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
