/* ─── Шапка: Александр & Дарья, кружево, жемчуг, айвори ─── */
import { useEffect, useState } from "react"

/* Кружевной угол-декор */
const LaceCorner = ({ flip = false }: { flip?: boolean }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    className="absolute w-32 md:w-48 opacity-25 pointer-events-none"
    style={{ top: 0, [flip ? "right" : "left"]: 0, transform: flip ? "scaleX(-1)" : undefined }}
  >
    <path d="M0 0 Q80 0 80 80 Q80 0 160 0" stroke="#c9b48a" strokeWidth="1.2" fill="none"/>
    <path d="M0 0 Q55 0 55 55" stroke="#c9b48a" strokeWidth="0.8" fill="none" opacity="0.7"/>
    <path d="M0 0 Q35 0 35 35" stroke="#c9b48a" strokeWidth="0.6" fill="none" opacity="0.5"/>
    <path d="M0 0 Q18 0 18 18" stroke="#c9b48a" strokeWidth="0.5" fill="none" opacity="0.4"/>
    {[[22,2],[44,2],[66,2],[88,2],[110,2],[132,2],[2,22],[2,44],[2,66],[2,88],[2,110],[2,132],[30,30],[55,15],[15,55]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="2.2" fill="#d4c4a0" opacity="0.55"/>
    ))}
    <circle cx="10" cy="10" r="5" stroke="#c9b48a" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <circle cx="10" cy="10" r="2" fill="#c9b48a" opacity="0.35"/>
  </svg>
)

/* Ботанические листья — боковой декор */
const Leaves = ({ right = false }: { right?: boolean }) => (
  <svg viewBox="0 0 180 320" fill="none"
    className="absolute bottom-0 w-24 md:w-36 opacity-[0.18] pointer-events-none"
    style={{ [right ? "right" : "left"]: "1%", transform: right ? "scaleX(-1)" : undefined }}>
    <path d="M90 320 Q85 240 75 170 Q65 100 55 40" stroke="#6b9b7a" strokeWidth="2" strokeLinecap="round"/>
    {[
      {cx:72,cy:275,rx:18,ry:10,r:-32},{cx:68,cy:230,rx:17,ry:10,r:-22},
      {cx:66,cy:188,rx:16,ry:9,r:-14},{cx:63,cy:148,rx:15,ry:8,r:-8},
      {cx:60,cy:110,rx:14,ry:8,r:-3},{cx:57,cy:75,rx:13,ry:7,r:3},
    ].map((l,i)=>(
      <ellipse key={i} cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry}
        fill="#6b9b7a" opacity={0.5-i*0.06}
        transform={`rotate(${l.r} ${l.cx} ${l.cy})`}/>
    ))}
  </svg>
)

export function WeddingHero() {
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t) }, [])

  const cl = (delay: number) =>
    `transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`
    + ` [transition-delay:${delay}ms]`

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24"
      style={{ background: "linear-gradient(160deg, hsl(38 55% 97%) 0%, hsl(36 45% 95%) 100%)" }}
    >
      {/* Точечный фоновый паттерн */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle, hsl(40 55% 75% / 0.18) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}/>

      {/* Кружевные бордюры */}
      <div className="absolute top-0 left-0 right-0 h-8 lace-top" />
      <div className="absolute bottom-0 left-0 right-0 h-8 lace-bottom" />

      {/* Угловые кружевные орнаменты */}
      <LaceCorner/>
      <LaceCorner flip/>

      {/* Листья */}
      <Leaves/>
      <Leaves right/>

      {/* ── Центральный блок ── */}
      <div className="relative z-10 text-center max-w-2xl mx-auto select-none">

        {/* Жемчужная нить сверху */}
        <div className={`flex justify-center gap-1.5 mb-7 ${cl(100)}`}>
          {[4,5,6,8,6,9,8,6,9,8,6,5,4].map((s,i)=>(
            <div key={i} className="rounded-full shadow-sm"
              style={{ width:s, height:s, background:"linear-gradient(135deg,#f0e8d5,#d8c9a8)", border:"1px solid #e0cda8" }}/>
          ))}
        </div>

        {/* Подзаголовок */}
        <p className={`text-xs tracking-[0.45em] uppercase font-sans mb-6 ${cl(180)}`}
          style={{ color:"hsl(var(--warm-brown) / 0.65)" }}>
          Приглашение на бракосочетание
        </p>

        {/* Имя «Александр» */}
        <h1 className={`font-kudry leading-[0.95] ${cl(280)}`}
          style={{
            fontSize:"clamp(3rem,9vw,6.5rem)",
            color:"hsl(var(--warm-brown))",
            fontStyle:"italic", fontWeight:400,
            textShadow:"0 2px 16px hsl(38 55% 52% / 0.2)",
          }}>
          Александр
        </h1>

        {/* Амперсанд + линии */}
        <div className={`flex items-center justify-center gap-4 my-3 ${cl(360)}`}>
          <div className="flex-1 h-px max-w-[100px]"
            style={{ background:"linear-gradient(to right, transparent, hsl(var(--gold-light)))" }}/>
          <span className="font-kudry text-3xl md:text-4xl"
            style={{ color:"hsl(var(--gold))", fontStyle:"normal" }}>❧</span>
          <div className="flex-1 h-px max-w-[100px]"
            style={{ background:"linear-gradient(to left, transparent, hsl(var(--gold-light)))" }}/>
        </div>

        {/* Имя «Дарья» */}
        <h1 className={`font-kudry leading-[0.95] ${cl(440)}`}
          style={{
            fontSize:"clamp(3rem,9vw,6.5rem)",
            color:"hsl(var(--warm-brown))",
            fontStyle:"italic", fontWeight:400,
            textShadow:"0 2px 16px hsl(38 55% 52% / 0.2)",
          }}>
          Дарья
        </h1>

        {/* Дата */}
        <div className={`mt-8 ${cl(520)}`}>
          <p className="font-kudry tracking-[0.22em] font-normal"
            style={{ fontSize:"clamp(1.6rem,4vw,2.4rem)", color:"hsl(var(--gold))" }}>
            08 · 08 · 2026
          </p>
          <p className="mt-1.5 text-xs tracking-[0.4em] uppercase font-sans"
            style={{ color:"hsl(var(--muted-foreground))" }}>
            Нижнекамск
          </p>
        </div>

        {/* Жемчужная нить снизу */}
        <div className={`flex justify-center gap-1.5 mt-7 ${cl(600)}`}>
          {[4,5,6,8,6,9,8,6,9,8,6,5,4].map((s,i)=>(
            <div key={i} className="rounded-full shadow-sm"
              style={{ width:s, height:s, background:"linear-gradient(135deg,#f0e8d5,#d8c9a8)", border:"1px solid #e0cda8" }}/>
          ))}
        </div>

        {/* Стрелка вниз */}
        <a href="#locations"
          className={`inline-flex flex-col items-center gap-1.5 mt-10 text-xs tracking-widest uppercase font-sans ${cl(700)}`}
          style={{ color:"hsl(var(--muted-foreground))" }}>
          Подробнее
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
