export function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-4">
            <p className="font-serif text-2xl tracking-wide text-foreground mb-4">Анна &amp; Михаил</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              12 сентября 2026 · Москва. Будем счастливы видеть вас в этот день рядом с нами.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 md:col-start-7">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Навигация</p>
            <nav className="flex flex-col gap-3">
              <a href="#philosophy" className="text-sm text-foreground hover:text-sage transition-colors">
                История
              </a>
              <a href="#services" className="text-sm text-foreground hover:text-sage transition-colors">
                Детали
              </a>
              <a href="#process" className="text-sm text-foreground hover:text-sage transition-colors">
                Программа
              </a>
              <a href="#contact" className="text-sm text-foreground hover:text-sage transition-colors">
                Подтвердить
              </a>
            </nav>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Соцсети</p>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-sm text-foreground hover:text-sage transition-colors">
                Instagram
              </a>
              <a href="#" className="text-sm text-foreground hover:text-sage transition-colors">
                Pinterest
              </a>
              <a href="#" className="text-sm text-foreground hover:text-sage transition-colors">
                Telegram
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Связаться</p>
            <nav className="flex flex-col gap-3">
              <a href="tel:+79990000000" className="text-sm text-foreground hover:text-sage transition-colors">
                +7 999 000-00-00
              </a>
              <a href="#contact" className="text-sm text-foreground hover:text-sage transition-colors">
                Подтвердить участие
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Анна &amp; Михаил
          </p>
          <p className="text-xs text-muted-foreground">Создано с любовью</p>
        </div>
      </div>
    </footer>
  )
}