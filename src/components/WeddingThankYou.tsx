/* Страница "Спасибо" после отправки формы */
export function WeddingThankYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lace px-4 text-center">
      {/* Декор SVG */}
      <svg className="w-32 h-20 mb-6 opacity-40" viewBox="0 0 200 120" fill="none">
        <path d="M10 110 Q60 50 100 60 Q140 70 190 10" stroke="#5d8a6f" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="45" cy="82" rx="14" ry="8" fill="#5d8a6f" opacity="0.5" transform="rotate(-30 45 82)"/>
        <ellipse cx="80" cy="62" rx="14" ry="8" fill="#5d8a6f" opacity="0.45" transform="rotate(-10 80 62)"/>
        <ellipse cx="120" cy="60" rx="13" ry="7" fill="#5d8a6f" opacity="0.35" transform="rotate(10 120 60)"/>
        <ellipse cx="158" cy="38" rx="12" ry="7" fill="#5d8a6f" opacity="0.3" transform="rotate(20 158 38)"/>
      </svg>

      {/* Жемчужные точки */}
      <div className="flex items-center gap-2 mb-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="rounded-full bg-sage-light"
            style={{
              width: i === 2 ? 10 : i === 1 || i === 3 ? 7 : 5,
              height: i === 2 ? 10 : i === 1 || i === 3 ? 7 : 5,
              opacity: i === 2 ? 0.9 : 0.5,
            }}
          />
        ))}
      </div>

      <p className="text-xs tracking-[0.35em] uppercase text-sage mb-4">Анкета получена</p>

      <h1 className="font-serif text-4xl md:text-5xl text-foreground font-normal mb-4">
        Спасибо!
      </h1>

      <p className="text-muted-foreground max-w-md leading-relaxed mb-8">
        Мы получили ваш ответ и очень рады, что вы будете с нами. До встречи{" "}
        <span className="font-serif italic text-sage">08 августа 2026</span> — это будет прекрасный день!
      </p>

      <div className="flex items-center gap-3">
        <div className="h-px w-16 bg-warm-brown opacity-30"/>
        <span className="text-warm-brown text-xl">◈</span>
        <div className="h-px w-16 bg-warm-brown opacity-30"/>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        С любовью, Александр &amp; Дарья 💍
      </p>

      <a
        href="#hero"
        className="mt-10 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-sage hover:text-sage/70 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7"/>
        </svg>
        Вернуться наверх
      </a>
    </div>
  )
}
