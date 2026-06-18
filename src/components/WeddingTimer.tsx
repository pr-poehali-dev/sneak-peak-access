/* Таймер обратного отсчёта до 08.08.2026 13:20 */
import { useEffect, useState } from "react"

const WEDDING_DATE = new Date("2026-08-08T13:20:00")

function getTimeLeft() {
  const now = new Date()
  const diff = WEDDING_DATE.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

export function WeddingTimer() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  const units = [
    { value: time.days, label: "Дней" },
    { value: time.hours, label: "Часов" },
    { value: time.minutes, label: "Минут" },
    { value: time.seconds, label: "Секунд" },
  ]

  return (
    <section id="timer" className="py-20 px-4 bg-sage relative overflow-hidden">
      {/* Лёгкий фоновый паттерн */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Декор: ветки по углам */}
      <svg className="absolute bottom-0 left-0 w-40 opacity-20 pointer-events-none" viewBox="0 0 160 120" fill="none">
        <path d="M10 110 Q50 60 100 40 Q130 28 155 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <ellipse cx="40" cy="85" rx="12" ry="7" fill="white" opacity="0.5" transform="rotate(-30 40 85)"/>
        <ellipse cx="70" cy="62" rx="12" ry="7" fill="white" opacity="0.4" transform="rotate(-15 70 62)"/>
        <ellipse cx="105" cy="42" rx="11" ry="6" fill="white" opacity="0.3" transform="rotate(5 105 42)"/>
      </svg>
      <svg className="absolute bottom-0 right-0 w-40 opacity-20 pointer-events-none" viewBox="0 0 160 120" fill="none" style={{transform:"scaleX(-1)"}}>
        <path d="M10 110 Q50 60 100 40 Q130 28 155 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <ellipse cx="40" cy="85" rx="12" ry="7" fill="white" opacity="0.5" transform="rotate(-30 40 85)"/>
        <ellipse cx="70" cy="62" rx="12" ry="7" fill="white" opacity="0.4" transform="rotate(-15 70 62)"/>
        <ellipse cx="105" cy="42" rx="11" ry="6" fill="white" opacity="0.3" transform="rotate(5 105 42)"/>
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-white/70 mb-3">До нашего торжества</p>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-normal mb-10">
          Осталось совсем немного
        </h2>

        {/* Карточки с числами */}
        <div className="flex justify-center gap-3 md:gap-5 flex-wrap">
          {units.map((unit) => (
            <div key={unit.label} className="timer-card bg-white/10 border-white/20 backdrop-blur-sm rounded-xl px-4 md:px-6 py-4 text-center min-w-[72px]">
              <p className="font-serif text-3xl md:text-5xl text-white leading-none mb-1">
                {pad(unit.value)}
              </p>
              <p className="text-xs tracking-widest uppercase text-white/60">{unit.label}</p>
            </div>
          ))}
        </div>

        {/* Дата */}
        <p className="mt-10 font-serif text-xl text-white/80 italic">
          08 августа 2026, 13:20
        </p>
      </div>
    </section>
  )
}
