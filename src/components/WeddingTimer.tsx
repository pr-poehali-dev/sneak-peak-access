/* ─── Таймер обратного отсчёта — кружевная рамка, винтажные цифры ─── */
import { useEffect, useState } from "react"

const TARGET = new Date("2026-08-08T13:20:00")

function getLeft() {
  const d = TARGET.getTime() - Date.now()
  if (d <= 0) return { days:0, hours:0, minutes:0, seconds:0 }
  return {
    days:    Math.floor(d / 86400000),
    hours:   Math.floor(d / 3600000) % 24,
    minutes: Math.floor(d / 60000)   % 60,
    seconds: Math.floor(d / 1000)    % 60,
  }
}

const pad = (n: number) => String(n).padStart(2,"0")

export function WeddingTimer() {
  const [t, setT] = useState(getLeft)
  useEffect(() => { const id = setInterval(() => setT(getLeft()), 1000); return () => clearInterval(id) }, [])

  const units = [
    { v: t.days,    l:"Дней"   },
    { v: t.hours,   l:"Часов"  },
    { v: t.minutes, l:"Минут"  },
    { v: t.seconds, l:"Секунд" },
  ]

  return (
    <section id="timer" className="relative py-20 px-4 overflow-hidden"
      style={{ background:"linear-gradient(160deg, hsl(var(--cream)) 0%, hsl(var(--wood-bg)) 100%)" }}>
      {/* Кружевные бордюры */}
      <div className="absolute top-0 left-0 right-0 lace-top"/>
      <div className="absolute bottom-0 left-0 right-0 lace-bottom"/>
      {/* Точечный паттерн */}
      <div className="absolute inset-0" style={{
        backgroundImage:"radial-gradient(circle, hsl(38 40% 60% / 0.12) 1px, transparent 1px)",
        backgroundSize:"22px 22px",
      }}/>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Заголовок */}
        <h2 className="font-kudry italic text-4xl md:text-5xl mb-3"
          style={{ color:"hsl(var(--warm-brown))" }}>
          Осталось до свадьбы
        </h2>
        {/* Жемчуг */}
        <div className="flex justify-center gap-1.5 mb-10">
          {[3,4,5,7,5,4,5,7,5,4,3].map((s,i)=>(
            <div key={i} className="rounded-full shadow-sm"
              style={{ width:s,height:s, background:"linear-gradient(135deg,#f0e8d5,#d8c9a8)", border:"1px solid #e0cda8" }}/>
          ))}
        </div>

        {/* Карточки цифр */}
        <div className="flex justify-center gap-3 md:gap-5 flex-wrap">
          {units.map(({v,l}) => (
            <div key={l} className="flex flex-col items-center">
              {/* Кружевная рамка карточки */}
              <div className="relative px-4 md:px-7 py-4 md:py-5"
                style={{
                  background:"hsl(var(--lace))",
                  borderRadius:"1.1rem",
                  border:"1.5px solid hsl(var(--pearl))",
                  boxShadow:"0 0 0 3px hsl(var(--ivory)), 0 0 0 4.5px hsl(var(--pearl) / 0.5), 0 6px 20px rgba(100,70,30,0.1)",
                  minWidth:"76px",
                }}>
                {/* Маленькие кружевные угловые точки */}
                {[[4,4],[4,-4],[-4,4],[-4,-4]].map(([dx,dy],i)=>(
                  <div key={i} className="absolute w-1.5 h-1.5 rounded-full"
                    style={{ background:"hsl(var(--gold-light))", opacity:0.6,
                      top: dy > 0 ? "auto" : "6px", bottom: dy > 0 ? "6px" : "auto",
                      left: dx > 0 ? "auto" : "6px", right: dx > 0 ? "6px" : "auto" }}/>
                ))}
                <p className="timer-digit text-4xl md:text-6xl font-kudry" style={{ color:"hsl(var(--warm-brown))" }}>
                  {pad(v)}
                </p>
              </div>
              <p className="mt-2 text-xs tracking-widest uppercase font-sans"
                style={{ color:"hsl(var(--muted-foreground))" }}>
                {l}
              </p>
            </div>
          ))}
        </div>

        {/* Дата */}
        <p className="mt-10 font-kudry italic text-xl md:text-2xl"
          style={{ color:"hsl(var(--gold))" }}>
          08 августа 2026, 13:20
        </p>
      </div>
    </section>
  )
}
