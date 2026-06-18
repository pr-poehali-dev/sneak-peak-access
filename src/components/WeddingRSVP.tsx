/* ─── Форма подтверждения RSVP — нежный бохо-стиль ─── */
import { type FormEvent, useEffect, useRef, useState } from "react"

const ATTENDANCE = [
  "Только на церемонии",
  "Только на банкете",
  "На церемонии и на банкете",
  "Не смогу присутствовать",
]

const DRINKS = [
  "Вино красное","Вино белое","Водка","Пиво",
  "Шампанское","Виски/коньяк","Безалкогольные напитки",
]

const RSVP_URL = "https://functions.poehali.dev/e9f58e07-7e50-47c5-b2b6-7cd4e9c50b4b"

interface Props { onSubmitSuccess: () => void }

/* Метка поля */
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs tracking-widest uppercase font-sans mb-2"
    style={{ color:"hsl(var(--warm-brown) / 0.7)" }}>
    {children}
  </label>
)

export function WeddingRSVP({ onSubmitSuccess }: Props) {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLElement>(null)

  const [firstName, setFirstName] = useState("")
  const [lastName,  setLastName]  = useState("")
  const [attendance, setAttendance] = useState("")
  const [drinks, setDrinks] = useState<string[]>([])
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.05 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const toggleDrink = (d: string) =>
    setDrinks(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!attendance) { setError("Пожалуйста, выберите вариант присутствия"); return }
    setLoading(true); setError("")
    try {
      const payload = { firstName, lastName, attendance, drinks, comment }

      const res = await fetch(RSVP_URL, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(payload),
      })

      /* Formspree — параллельно, не блокируем */
      fetch("https://formspree.io/f/mjgdqrvj", {
        method:"POST",
        headers:{ "Content-Type":"application/json", Accept:"application/json" },
        body: JSON.stringify({ firstName, lastName, attendance, drinks:drinks.join(", "), comment }),
      }).catch(() => {})

      if (!res.ok) throw new Error("server")
      onSubmitSuccess()
    } catch {
      setError("Что-то пошло не так. Попробуйте ещё раз.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={ref} id="rsvp" className="relative py-20 px-4 overflow-hidden"
      style={{ background:"hsl(var(--ivory))" }}>
      <div className="absolute top-0 left-0 right-0 lace-top"/>
      <div className="absolute bottom-0 left-0 right-0 lace-bottom"/>
      <div className="absolute inset-0" style={{
        backgroundImage:"radial-gradient(circle, hsl(40 55% 75% / 0.1) 1px, transparent 1px)",
        backgroundSize:"28px 28px",
      }}/>

      <div className="relative z-10 max-w-xl mx-auto">
        {/* Заголовок */}
        <div className={`text-center mb-10 transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-5"}`}>
          <h2 className="font-kudry italic text-4xl md:text-5xl" style={{ color:"hsl(var(--warm-brown))" }}>
            Подтверждение
          </h2>
          <div className="flex justify-center gap-1 mt-3 mb-6">
            {[3,4,5,6,5,8,6,5,8,6,5,4,3].map((s,i)=>(
              <div key={i} className="rounded-full"
                style={{ width:s, height:s, background:"linear-gradient(135deg,#f0e8d5,#d8c9a8)", border:"1px solid #e0d5b8" }}/>
            ))}
          </div>
          <p className="font-sans text-sm leading-relaxed" style={{ color:"hsl(var(--foreground) / 0.68)" }}>
            Ждём вас с теплом в сердце, но без неожиданных гостей. Давайте проведём этот день
            в уютном кругу самых близких. Пожалуйста, заполните анкету до{" "}
            <strong style={{ color:"hsl(var(--warm-brown))" }}>20 июля 2026 года</strong>.
          </p>
        </div>

        {/* Форма */}
        <form
          onSubmit={handleSubmit}
          className={`space-y-6 transition-all duration-700 delay-150 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-5"}`}
        >
          {/* Имя + Фамилия */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Имя <span style={{ color:"hsl(var(--gold))" }}>*</span></Label>
              <input type="text" required value={firstName}
                onChange={e=>setFirstName(e.target.value)}
                className="input-lace" placeholder="Александра"/>
            </div>
            <div>
              <Label>Фамилия <span style={{ color:"hsl(var(--gold))" }}>*</span></Label>
              <input type="text" required value={lastName}
                onChange={e=>setLastName(e.target.value)}
                className="input-lace" placeholder="Иванова"/>
            </div>
          </div>

          {/* Присутствие */}
          <div>
            <Label>Будете ли вы присутствовать? <span style={{ color:"hsl(var(--gold))" }}>*</span></Label>
            <div className="flex flex-col gap-2">
              {ATTENDANCE.map(opt => (
                <label key={opt} className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200"
                  style={{
                    borderRadius:"0.75rem",
                    border:`1.5px solid ${attendance===opt?"hsl(var(--gold))":"hsl(var(--pearl))"}`,
                    background: attendance===opt
                      ? "linear-gradient(135deg, hsl(38 45% 95%), hsl(36 38% 91%))"
                      : "hsl(var(--lace))",
                  }}>
                  <input type="radio" name="attendance" value={opt}
                    checked={attendance===opt}
                    onChange={()=>setAttendance(opt)}
                    className="hidden"/>
                  {/* Кружок-индикатор */}
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: attendance===opt?"hsl(var(--gold))":"hsl(var(--pearl))" }}>
                    {attendance===opt && (
                      <div className="w-2 h-2 rounded-full" style={{ background:"hsl(var(--gold))" }}/>
                    )}
                  </div>
                  <span className="font-sans text-sm" style={{ color:"hsl(var(--foreground) / 0.8)" }}>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Напитки */}
          <div>
            <Label>Предпочтения в напитках <span style={{ color:"hsl(var(--gold))" }}>*</span></Label>
            <div className="flex flex-wrap gap-2">
              {DRINKS.map(d => {
                const sel = drinks.includes(d)
                return (
                  <label key={d} className="flex items-center gap-1.5 px-3 py-2 cursor-pointer text-sm font-sans transition-all duration-200"
                    style={{
                      borderRadius:"2rem",
                      border:`1.5px solid ${sel?"hsl(var(--warm-brown))":"hsl(var(--pearl))"}`,
                      background: sel
                        ? "linear-gradient(135deg, hsl(var(--warm-brown)), hsl(var(--chocolate)))"
                        : "hsl(var(--lace))",
                      color: sel ? "hsl(var(--gold-light))" : "hsl(var(--foreground) / 0.72)",
                    }}>
                    <input type="checkbox" checked={sel}
                      onChange={()=>toggleDrink(d)} className="hidden"/>
                    {sel && <span className="text-xs">✓</span>}
                    {d}
                  </label>
                )
              })}
            </div>
          </div>

          {/* Комментарий */}
          <div>
            <Label>Комментарии или вопросы</Label>
            <textarea value={comment} onChange={e=>setComment(e.target.value)}
              rows={3} className="input-lace resize-none"
              placeholder="Аллергии, особые пожелания, @username в Telegram..."/>
          </div>

          {error && (
            <p className="text-center text-sm font-sans" style={{ color:"hsl(0 65% 52%)" }}>{error}</p>
          )}

          {/* Кнопка "деревянная табличка" */}
          <button type="submit" disabled={loading}
            className="btn-wood w-full py-4 rounded-xl font-kudry text-lg italic tracking-wider disabled:opacity-60">
            {loading
              ? <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>Отправляем...
                </span>
              : "✉ Отправить"
            }
          </button>
        </form>
      </div>
    </section>
  )
}
