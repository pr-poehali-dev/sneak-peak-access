/* Плавающая кнопка музыки — автозапуск при первом клике по странице */
import { useEffect, useRef, useState } from "react"

export function WeddingMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  /* При первом любом клике по странице — пытаемся автозапустить */
  useEffect(() => {
    const tryPlay = () => {
      if (!started && audioRef.current) {
        audioRef.current.play().then(() => {
          setPlaying(true)
          setStarted(true)
        }).catch(() => {
          setStarted(true) // браузер заблокировал — не страшно
        })
      }
      document.removeEventListener("click", tryPlay)
    }
    document.addEventListener("click", tryPlay)
    return () => document.removeEventListener("click", tryPlay)
  }, [started])

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setPlaying(true)
        setStarted(true)
      }).catch(() => {})
    }
  }

  return (
    <>
      {/* Скрытый аудиоплеер */}
      <audio ref={audioRef} src="/wedding-song.mp3" loop preload="auto" />

      {/* Плавающая кнопка в правом верхнем углу */}
      <button
        onClick={toggle}
        className="fixed top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/90 backdrop-blur border border-pearl shadow-md flex items-center justify-center hover:bg-sage hover:text-white hover:border-sage transition-all duration-300 group"
        title={playing ? "Выключить музыку" : "Включить музыку"}
        aria-label={playing ? "Выключить музыку" : "Включить музыку"}
      >
        {playing ? (
          /* Пауза */
          <svg className="w-4 h-4 text-sage group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          /* Играть */
          <svg className="w-4 h-4 text-sage group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
    </>
  )
}
