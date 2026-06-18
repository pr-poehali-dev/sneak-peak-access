/* ─── Страница "Спасибо" — кружево, жемчуг, бохо ─── */
export function WeddingThankYou() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20"
      style={{ background:"linear-gradient(160deg, hsl(var(--ivory)) 0%, hsl(var(--cream)) 100%)" }}>
      {/* Кружевные бордюры */}
      <div className="absolute top-0 left-0 right-0 lace-top"/>
      <div className="absolute bottom-0 left-0 right-0 lace-bottom"/>
      {/* Точечный паттерн */}
      <div className="absolute inset-0" style={{
        backgroundImage:"radial-gradient(circle, hsl(40 55% 75% / 0.14) 1px, transparent 1px)",
        backgroundSize:"28px 28px",
      }}/>

      {/* Угловые кружева */}
      {[false,true].map((flip,i)=>(
        <svg key={i} viewBox="0 0 120 120" fill="none"
          className="absolute w-28 md:w-36 opacity-20 pointer-events-none"
          style={{ top:0, [flip?"right":"left"]:0, transform:flip?"scaleX(-1)":undefined }}>
          <path d="M0 0 Q60 0 60 60 Q60 0 120 0" stroke="#c9b48a" strokeWidth="1.2" fill="none"/>
          {[[15,2],[35,2],[55,2],[2,15],[2,35],[2,55],[25,25],[45,12],[12,45]].map(([x,y],j)=>(
            <circle key={j} cx={x} cy={y} r="2" fill="#d4c4a0" opacity="0.6"/>
          ))}
        </svg>
      ))}

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Кружевная рамка-контейнер */}
        <div className="p-8 md:p-12" style={{
          background:"hsl(var(--lace))",
          borderRadius:"1.5rem",
          border:"1.5px solid hsl(var(--pearl))",
          boxShadow:"0 0 0 4px hsl(var(--ivory)), 0 0 0 5.5px hsl(var(--pearl) / 0.6), 0 12px 40px rgba(100,70,30,0.12)",
        }}>
          {/* Ботанический SVG-декор */}
          <svg viewBox="0 0 200 80" fill="none" className="w-36 mx-auto mb-6 opacity-35">
            <path d="M20 70 Q70 30 100 45 Q130 58 180 15" stroke="#6b9b7a" strokeWidth="1.8" strokeLinecap="round"/>
            {[{cx:45,cy:52,r:-25},{cx:75,cy:38,r:-10},{cx:105,cy:44,r:5},{cx:140,cy:32,r:15}].map((l,i)=>(
              <ellipse key={i} cx={l.cx} cy={l.cy} rx={14} ry={8}
                fill="#6b9b7a" opacity={0.45-i*0.05} transform={`rotate(${l.r} ${l.cx} ${l.cy})`}/>
            ))}
          </svg>

          {/* Жемчужная нить */}
          <div className="flex justify-center gap-1.5 mb-6">
            {[4,5,6,8,6,9,8,6,9,8,6,5,4].map((s,i)=>(
              <div key={i} className="rounded-full shadow-sm"
                style={{ width:s,height:s, background:"linear-gradient(135deg,#f0e8d5,#d8c9a8)", border:"1px solid #e0cda8" }}/>
            ))}
          </div>

          {/* Заголовок */}
          <h1 className="font-kudry italic leading-tight mb-4"
            style={{ fontSize:"clamp(2.4rem,6vw,3.8rem)", color:"hsl(var(--warm-brown))" }}>
            Спасибо,<br/>что вы с нами!
          </h1>

          {/* Золотой разделитель */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12" style={{ background:"linear-gradient(to right,transparent,hsl(var(--gold-light)))" }}/>
            <span className="font-kudry text-xl" style={{ color:"hsl(var(--gold))" }}>❧</span>
            <div className="h-px w-12" style={{ background:"linear-gradient(to left,transparent,hsl(var(--gold-light)))" }}/>
          </div>

          {/* Текст */}
          <p className="font-sans text-sm leading-relaxed mb-7"
            style={{ color:"hsl(var(--foreground) / 0.68)" }}>
            Мы получили вашу анкету и очень рады, что вы будете с нами.
            До встречи <span className="font-kudry italic text-base" style={{ color:"hsl(var(--gold))" }}>08 августа 2026</span> — этот день будет незабываемым!
          </p>

          {/* Жемчуг снизу */}
          <div className="flex justify-center gap-1.5 mb-6">
            {[3,4,5,7,5,4,5,7,5,4,3].map((s,i)=>(
              <div key={i} className="rounded-full"
                style={{ width:s,height:s, background:"linear-gradient(135deg,#f0e8d5,#d8c9a8)", border:"1px solid #e0d5b8" }}/>
            ))}
          </div>

          <p className="font-kudry italic text-lg" style={{ color:"hsl(var(--warm-brown))" }}>
            С любовью, Александр &amp; Дарья 💍
          </p>

          {/* Кнопка вверх */}
          <a href="#hero" className="inline-flex items-center gap-2 mt-8 text-xs tracking-widest uppercase font-sans"
            style={{ color:"hsl(var(--muted-foreground))" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7"/>
            </svg>
            Вернуться наверх
          </a>
        </div>
      </div>
    </div>
  )
}
