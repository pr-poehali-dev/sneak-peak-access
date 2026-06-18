/* ─── Плавающая кнопка музыки — автозапуск при первом клике ─── */
import { useEffect, useRef, useState } from "react"

export function WeddingMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  /* Автозапуск при первом взаимодействии со страницей */
  useEffect(() => {
    const tryPlay = () => {
      if (started) return
      setStarted(true)
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {})
      document.removeEventListener("click", tryPlay)
      document.removeEventListener("touchstart", tryPlay)
    }
    document.addEventListener("click", tryPlay)
    document.addEventListener("touchstart", tryPlay)
    return () => {
      document.removeEventListener("click", tryPlay)
      document.removeEventListener("touchstart", tryPlay)
    }
  }, [started])

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().then(() => { setPlaying(true); setStarted(true) }).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/wedding-song.mp3" loop preload="auto"/>

      {/* Кнопка в правом верхнем углу */}
      <button
        onClick={toggle}
        title={playing ? "Выключить музыку" : "Включить музыку"}
        aria-label={playing ? "Выключить музыку" : "Включить музыку"}
        className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: playing
            ? "linear-gradient(135deg, hsl(var(--warm-brown)), hsl(var(--chocolate)))"
            : "hsl(var(--lace))",
          border:"1.5px solid hsl(var(--pearl))",
          boxShadow: playing
            ? "0 0 0 2px hsl(var(--ivory)), 0 0 0 3px hsl(var(--gold-light) / 0.5), 0 4px 14px rgba(80,50,20,0.3)"
            : "0 0 0 2px hsl(var(--ivory)), 0 0 0 3px hsl(var(--pearl)), 0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        {playing ? (
          /* Пауза */
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"
            style={{ color:"hsl(var(--gold-light))" }}>
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          /* Ноты */
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"
            style={{ color:"hsl(var(--warm-brown))" }}>
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        )}
      </button>
    </>
  )
}
