/* Форма подтверждения присутствия RSVP */
import { type FormEvent, useEffect, useRef, useState } from "react"

const ATTENDANCE_OPTIONS = [
  "Только на церемонии",
  "Только на банкете",
  "Да, на церемонии и на банкете",
  "Не смогу присутствовать",
]

const DRINKS = [
  "Вино красное",
  "Вино белое",
  "Водка",
  "Пиво",
  "Шампанское",
  "Виски/коньяк",
  "Безалкогольные напитки",
]

interface Props {
  onSubmitSuccess: () => void
}

export function WeddingRSVP({ onSubmitSuccess }: Props) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [attendance, setAttendance] = useState("")
  const [drinks, setDrinks] = useState<string[]>([])
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const toggleDrink = (drink: string) => {
    setDrinks(prev =>
      prev.includes(drink) ? prev.filter(d => d !== drink) : [...prev, drink]
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const payload = { firstName, lastName, attendance, drinks, comment }

    try {
      // Отправка в Telegram через бэкенд
      const res = await fetch("https://functions.poehali.dev/e9f58e07-7e50-47c5-b2b6-7cd4e9c50b4b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      // Отправка на Email через Formspree (параллельно)
      fetch("https://formspree.io/f/mjgdqrvj", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          attendance,
          drinks: drinks.join(", "),
          comment,
        }),
      }).catch(() => {/* не блокируем если Formspree упал */})

      if (!res.ok) throw new Error("server")
      onSubmitSuccess()
    } catch {
      setError("Что-то пошло не так. Попробуйте ещё раз или напишите нам напрямую.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={ref} id="rsvp" className="py-20 px-4 bg-lace relative overflow-hidden">
      {/* Верхний кружевной бордюр */}
      <svg className="absolute top-0 left-0 right-0 w-full opacity-20 pointer-events-none" height="30" viewBox="0 0 400 30" preserveAspectRatio="none">
        <path d="M0 30 Q25 5 50 30 Q75 5 100 30 Q125 5 150 30 Q175 5 200 30 Q225 5 250 30 Q275 5 300 30 Q325 5 350 30 Q375 5 400 30" fill="none" stroke="#c8b89a" strokeWidth="1.5"/>
      </svg>

      <div className="max-w-xl mx-auto">
        {/* Заголовок */}
        <div className={`text-center mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-3">Анкета гостя</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground font-normal mb-4">
            Подтверждение
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 bg-warm-brown opacity-30"/>
            <div className="w-1.5 h-1.5 rounded-full bg-warm-brown opacity-50"/>
            <div className="h-px w-12 bg-warm-brown opacity-30"/>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Ждём вас с теплом в сердце, но без неожиданных гостей. Давайте проведём этот день
            в уютном кругу самых близких. Пожалуйста, заполните анкету до{" "}
            <strong className="text-foreground">1 июля 2026 года</strong>.
          </p>
        </div>

        {/* Форма */}
        <form
          onSubmit={handleSubmit}
          className={`space-y-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Имя + Фамилия */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Имя <span className="text-sage">*</span>
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full bg-white border border-pearl rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/40 focus:border-sage focus:outline-none transition-colors"
                placeholder="Александр"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Фамилия <span className="text-sage">*</span>
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full bg-white border border-pearl rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/40 focus:border-sage focus:outline-none transition-colors"
                placeholder="Иванов"
              />
            </div>
          </div>

          {/* Присутствие */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-3">
              Будете ли вы присутствовать? <span className="text-sage">*</span>
            </label>
            <div className="flex flex-col gap-2">
              {ATTENDANCE_OPTIONS.map(opt => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    attendance === opt
                      ? "border-sage bg-sage-pale/50 text-foreground"
                      : "border-pearl bg-white text-muted-foreground hover:border-sage/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value={opt}
                    required
                    checked={attendance === opt}
                    onChange={() => setAttendance(opt)}
                    className="accent-sage"
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Напитки */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-3">
              Ваши предпочтения в напитках <span className="text-sage">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {DRINKS.map(drink => (
                <label
                  key={drink}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-all duration-200 ${
                    drinks.includes(drink)
                      ? "border-sage bg-sage text-white"
                      : "border-pearl bg-white text-muted-foreground hover:border-sage/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={drinks.includes(drink)}
                    onChange={() => toggleDrink(drink)}
                    className="hidden"
                  />
                  {drink}
                </label>
              ))}
            </div>
          </div>

          {/* Комментарий */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
              Комментарии или вопросы
            </label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={3}
              className="w-full bg-white border border-pearl rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/40 focus:border-sage focus:outline-none transition-colors resize-none"
              placeholder="Аллергии, особые пожелания, ваш @username в Telegram..."
            />
          </div>

          {/* Ошибка */}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          {/* Кнопка */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-sage text-white font-sans text-sm tracking-widest uppercase rounded-lg hover:bg-sage/90 disabled:opacity-60 transition-all duration-300"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
            ) : "📧 Отправить"}
          </button>
        </form>
      </div>
    </section>
  )
}