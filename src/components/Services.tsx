import { useEffect, useRef, useState } from "react"
import Icon from "@/components/ui/icon"

const services = [
  {
    title: "Дата и время",
    description: "12 сентября 2026 года. Сбор гостей в 15:30, торжественная церемония начнётся ровно в 16:00.",
    icon: <Icon name="CalendarHeart" size={32} />,
  },
  {
    title: "Место",
    description: "Усадьба «Тихий сад», Московская область. Свежий воздух, старинный парк и уютный банкетный зал.",
    icon: <Icon name="MapPin" size={32} />,
  },
  {
    title: "Дресс-код",
    description: "Будем рады видеть вас в нарядах пастельных и природных тонов — бежевый, оливковый, терракотовый.",
    icon: <Icon name="Shirt" size={32} />,
  },
  {
    title: "Подарки",
    description: "Лучший подарок — это вы рядом с нами. Если хотите порадовать нас, мы будем благодарны за поддержку нашего свадебного путешествия.",
    icon: <Icon name="Gift" size={32} />,
  },
]

export function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-32 lg:py-40 px-6 lg:px-12 bg-sand/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p
            className={`text-xs tracking-[0.3em] uppercase text-terracotta mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Детали торжества
          </p>
          <h2
            className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground text-balance transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
Что важно знать
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group bg-background p-10 lg:p-14 transition-all duration-1000 hover:bg-card ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div className="text-sage mb-6 transition-transform duration-500 group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}