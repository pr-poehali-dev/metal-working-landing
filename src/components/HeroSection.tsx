import Icon from "@/components/ui/icon";

const STATS = [
  { value: "18+", label: "лет в производстве валов" },
  { value: "0.01", label: "мм допуск на диаметр" },
  { value: "100%", label: "контроль ОТК каждого вала" },
  { value: "3.5 м", label: "максимальная длина вала" },
  { value: "90 к.д.", label: "срок изготовления" },
];

interface HeroSectionProps {
  scrollTo: (section: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <section id="Главная" className="relative min-h-screen flex items-center pt-14 grid-bg overflow-hidden">
      <div className="absolute inset-0 grid-bg-fine opacity-60" />

      <div className="absolute top-24 left-8 w-6 h-6 opacity-30">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-primary"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary"></div>
      </div>
      <div className="absolute bottom-24 right-8 w-6 h-6 opacity-30">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-primary"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-16">
        <div>
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            <div className="h-px w-8 bg-primary"></div>
            <span className="font-mono-tech text-xs text-primary tracking-widest">// ПРОИЗВОДСТВО ВАЛОВ ПОД ЗАКАЗ</span>
          </div>

          <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6 animate-fade-up-delay-1">
            <span className="text-foreground">ВАЛЫ</span>
            <br />
            <span className="text-primary">ДЛЯ КОНДЕНСАТНЫХ</span>
            <br />
            <span className="text-foreground text-3xl md:text-4xl font-light">насосов</span>
          </h1>

          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md animate-fade-up-delay-2">
            Изготовление насосных валов по чертежам заказчика или образцу.
            Длина до 3,5 метров. Марки стали: 40Х, 40ХФА, Ст.45, 45ХГМА.
            Точность по ГОСТ 24643, допуски от 0.01 мм.
          </p>

          <div className="flex flex-wrap gap-3 animate-fade-up-delay-3">
            <button
              onClick={() => scrollTo("Запчасти")}
              className="flex items-center gap-2 bg-primary text-primary-foreground font-oswald tracking-widest text-sm px-6 py-3 hover:opacity-90 transition-opacity"
            >
              <Icon name="Search" size={14} />
              КАТАЛОГ ВАЛОВ
            </button>
            <button
              onClick={() => scrollTo("Контакты")}
              className="flex items-center gap-2 border border-border text-muted-foreground font-oswald tracking-widest text-sm px-6 py-3 hover:border-primary hover:text-primary transition-colors"
            >
              <Icon name="FileText" size={14} />
              ЗАПРОСИТЬ КП
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-border animate-fade-up-delay-3">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-oswald text-2xl font-bold text-primary">{s.value}</div>
                <div className="font-mono-tech text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block animate-fade-up-delay-2">
          <div className="relative p-4" style={{ position: 'relative' }}>
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
            <img
              src="https://cdn.poehali.dev/projects/cefcff8e-8f75-492a-9553-1c18c82cffe4/files/3737437c-9c5c-4652-8d5b-abc4a154cfde.jpg"
              alt="Запчасти для насосов"
              className="w-full h-[480px] object-cover scanline"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-background/90 border border-border p-3">
              <div className="font-mono-tech text-xs text-primary mb-1">// SCAN COMPLETE</div>
              <div className="grid grid-cols-3 gap-2">
                {["ГОСТ 24643", "ГОСТ 31606", "ISO 286"].map((std) => (
                  <div key={std} className="text-center border border-border/50 py-1">
                    <div className="font-mono-tech text-[10px] text-muted-foreground">{std}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -top-2 left-4 font-mono-tech text-[10px] text-primary/50">X: 0.000</div>
          <div className="absolute top-8 -right-4 font-mono-tech text-[10px] text-primary/50" style={{ writingMode: 'vertical-rl' }}>Y: 0.000</div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="font-mono-tech text-xs text-muted-foreground tracking-widest">SCROLL</div>
        <Icon name="ChevronDown" size={16} className="text-primary animate-bounce" />
      </div>
    </section>
  );
}