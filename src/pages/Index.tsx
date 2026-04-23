import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = ["Главная", "Запчасти", "Галерея", "Контакты"];

const PARTS = [
  { id: 1, name: "Рабочее колесо Ø120", type: "Центробежный", size: "DN125", material: "Нержавеющая сталь", price: "от 12 400 ₽", code: "PTD-CW-120-SS" },
  { id: 2, name: "Рабочее колесо Ø80", type: "Центробежный", size: "DN80", material: "Чугун", price: "от 5 800 ₽", code: "PTD-CW-080-CI" },
  { id: 3, name: "Торцевое уплотнение", type: "Погружной", size: "DN50", material: "Нержавеющая сталь", price: "от 3 200 ₽", code: "PTD-MS-050-SS" },
  { id: 4, name: "Корпус насоса К80/50", type: "Центробежный", size: "DN80", material: "Чугун", price: "от 18 900 ₽", code: "PTD-HB-080-CI" },
  { id: 5, name: "Вал насосный Ø32", type: "Вихревой", size: "DN32", material: "Легированная сталь", price: "от 7 600 ₽", code: "PTD-SH-032-AS" },
  { id: 6, name: "Подшипниковый узел", type: "Погружной", size: "DN65", material: "Легированная сталь", price: "от 4 100 ₽", code: "PTD-BU-065-AS" },
  { id: 7, name: "Крышка корпуса DN100", type: "Вихревой", size: "DN100", material: "Нержавеющая сталь", price: "от 9 300 ₽", code: "PTD-HC-100-SS" },
  { id: 8, name: "Диффузор ступени", type: "Многоступенчатый", size: "DN50", material: "Чугун", price: "от 6 750 ₽", code: "PTD-DF-050-CI" },
  { id: 9, name: "Направляющий аппарат", type: "Многоступенчатый", size: "DN125", material: "Нержавеющая сталь", price: "от 14 200 ₽", code: "PTD-GA-125-SS" },
];

const TYPES = ["Все типы", "Центробежный", "Погружной", "Вихревой", "Многоступенчатый"];
const SIZES = ["Все размеры", "DN32", "DN50", "DN65", "DN80", "DN100", "DN125"];
const MATERIALS = ["Все материалы", "Нержавеющая сталь", "Чугун", "Легированная сталь"];

const GALLERY = [
  {
    src: "https://cdn.poehali.dev/projects/cefcff8e-8f75-492a-9553-1c18c82cffe4/files/3737437c-9c5c-4652-8d5b-abc4a154cfde.jpg",
    title: "Прецизионные компоненты",
    desc: "Рабочие колёса и фланцы из нержавеющей стали"
  },
  {
    src: "https://cdn.poehali.dev/projects/cefcff8e-8f75-492a-9553-1c18c82cffe4/files/6467335a-ceeb-4e6e-be61-a35f736316b3.jpg",
    title: "Производственный цех",
    desc: "Токарная обработка насосных валов на станках с ЧПУ"
  },
  {
    src: "https://cdn.poehali.dev/projects/cefcff8e-8f75-492a-9553-1c18c82cffe4/files/80edde49-a905-47c4-a308-8d0f010d31ef.jpg",
    title: "Инженерные решения",
    desc: "Конструктивный разрез центробежного насоса"
  },
];

const STATS = [
  { value: "18+", label: "лет на рынке" },
  { value: "3 200", label: "наименований в каталоге" },
  { value: "96%", label: "совместимость с OEM" },
  { value: "48 ч", label: "средний срок доставки" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [filterType, setFilterType] = useState("Все типы");
  const [filterSize, setFilterSize] = useState("Все размеры");
  const [filterMaterial, setFilterMaterial] = useState("Все материалы");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredParts = PARTS.filter((p) => {
    const okType = filterType === "Все типы" || p.type === filterType;
    const okSize = filterSize === "Все размеры" || p.size === filterSize;
    const okMat = filterMaterial === "Все материалы" || p.material === filterMaterial;
    return okType && okSize && okMat;
  });

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-primary flex items-center justify-center relative">
              <Icon name="Cog" size={16} className="text-primary" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </div>
            <div>
              <div className="font-oswald text-sm font-semibold tracking-widest text-foreground leading-none">ПРОМТЕХДЕТАЛЬ</div>
              <div className="font-mono-tech text-[9px] text-muted-foreground tracking-wider">PUMP PARTS & METALWORKS</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`font-oswald text-xs tracking-widest px-4 py-2 transition-all duration-200 ${
                  activeSection === item
                    ? "text-primary border-b border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo("Контакты")}
              className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground font-oswald text-xs tracking-widest px-4 py-2 hover:opacity-90 transition-opacity"
            >
              <Icon name="Phone" size={12} />
              ЗАПРОСИТЬ ЦЕНУ
            </button>
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-slide-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="w-full text-left font-oswald text-sm tracking-widest px-4 py-3 text-muted-foreground hover:text-primary border-b border-border/50"
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
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
              <span className="font-mono-tech text-xs text-primary tracking-widest">// ПРОМЫШЛЕННЫЕ ЗАПЧАСТИ</span>
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6 animate-fade-up-delay-1">
              <span className="text-foreground">ЗАПЧАСТИ</span>
              <br />
              <span className="text-primary">ДЛЯ НАСОСОВ</span>
              <br />
              <span className="text-foreground text-3xl md:text-4xl font-light">любой сложности</span>
            </h1>

            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md animate-fade-up-delay-2">
              Производство и поставка запасных частей для промышленных насосов.
              Центробежные, погружные, вихревые и многоступенчатые насосы.
              Допуски по ISO 9906.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up-delay-3">
              <button
                onClick={() => scrollTo("Запчасти")}
                className="flex items-center gap-2 bg-primary text-primary-foreground font-oswald tracking-widest text-sm px-6 py-3 hover:opacity-90 transition-opacity"
              >
                <Icon name="Search" size={14} />
                КАТАЛОГ ЗАПЧАСТЕЙ
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
                  {["ISO 9906", "ГОСТ Р 52743", "EN 809"].map((std) => (
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

      {/* PARTS CATALOG */}
      <section id="Запчасти" className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-primary"></div>
                <span className="font-mono-tech text-xs text-primary tracking-widest">// КАТАЛОГ</span>
              </div>
              <h2 className="font-oswald text-4xl font-bold tracking-tight">ЗАПЧАСТИ ДЛЯ НАСОСОВ</h2>
            </div>
            <div className="font-mono-tech text-xs text-muted-foreground text-right hidden md:block">
              <div>НАЙДЕНО: {filteredParts.length} позиций</div>
              <div className="text-primary">REV.{new Date().getFullYear()}.{String(new Date().getMonth()+1).padStart(2,"0")}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 border border-border bg-card">
            <div className="font-mono-tech text-xs text-primary col-span-full mb-1">// ПАРАМЕТРЫ ФИЛЬТРАЦИИ</div>

            <div>
              <div className="font-mono-tech text-[10px] text-muted-foreground mb-2 tracking-wider">ТИП НАСОСА</div>
              <div className="flex flex-wrap gap-1">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`font-mono-tech text-[10px] px-2 py-1 border transition-all ${
                      filterType === t
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono-tech text-[10px] text-muted-foreground mb-2 tracking-wider">РАЗМЕР</div>
              <div className="flex flex-wrap gap-1">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterSize(s)}
                    className={`font-mono-tech text-[10px] px-2 py-1 border transition-all ${
                      filterSize === s
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono-tech text-[10px] text-muted-foreground mb-2 tracking-wider">МАТЕРИАЛ</div>
              <div className="flex flex-wrap gap-1">
                {MATERIALS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setFilterMaterial(m)}
                    className={`font-mono-tech text-[10px] px-2 py-1 border transition-all ${
                      filterMaterial === m
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Parts grid */}
          {filteredParts.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border">
              <Icon name="SearchX" size={32} className="text-muted-foreground mx-auto mb-3" />
              <div className="font-mono-tech text-sm text-muted-foreground">// НЕТ РЕЗУЛЬТАТОВ ПО ЗАДАННЫМ ПАРАМЕТРАМ</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredParts.map((part) => (
                <div
                  key={part.id}
                  className="border border-border bg-card p-5 hover:border-primary/50 transition-all duration-200 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-primary opacity-0 group-hover:opacity-60 transition-all duration-300"></div>

                  <div className="flex items-start justify-between mb-3">
                    <div className="font-mono-tech text-[10px] text-muted-foreground">{part.code}</div>
                    <span className="font-mono-tech text-[10px] border border-border px-2 py-0.5 text-muted-foreground">{part.size}</span>
                  </div>

                  <h3 className="font-oswald text-base font-semibold mb-3 group-hover:text-primary transition-colors">{part.name}</h3>

                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Settings" size={10} className="text-primary/60" />
                      <span className="font-mono-tech text-[10px] text-muted-foreground">{part.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Layers" size={10} className="text-primary/60" />
                      <span className="font-mono-tech text-[10px] text-muted-foreground">{part.material}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="font-oswald text-base text-primary font-semibold">{part.price}</span>
                    <button
                      onClick={() => scrollTo("Контакты")}
                      className="font-mono-tech text-[10px] border border-primary/40 text-primary px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      ЗАПРОСИТЬ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => scrollTo("Контакты")}
              className="font-mono-tech text-xs text-muted-foreground border border-dashed border-border px-6 py-3 hover:border-primary hover:text-primary transition-all"
            >
              // НЕТ НУЖНОЙ ПОЗИЦИИ? ЗАПРОСИТЬ ПОДБОР →
            </button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="Галерея" className="py-20 border-t border-border grid-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-primary"></div>
            <span className="font-mono-tech text-xs text-primary tracking-widest">// ПРОИЗВОДСТВО</span>
          </div>
          <h2 className="font-oswald text-4xl font-bold tracking-tight mb-10">ГАЛЕРЕЯ</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {GALLERY.map((item, i) => (
              <div key={i} className="group relative overflow-hidden border border-border hover:border-primary/50 transition-all">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 scanline"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-background/70 transition-all duration-300 flex flex-col justify-end p-4">
                  <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="font-mono-tech text-[10px] text-primary mb-1">// ФОТО {String(i + 1).padStart(2, "0")}</div>
                    <div className="font-oswald text-base font-semibold">{item.title}</div>
                    <div className="font-mono-tech text-[10px] text-muted-foreground mt-1">{item.desc}</div>
                  </div>
                </div>
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary/40"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary/40"></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {[
              { icon: "Ruler", label: "Допуски до 0.01 мм" },
              { icon: "ShieldCheck", label: "Входной контроль ОТК" },
              { icon: "Timer", label: "Срочное производство" },
              { icon: "Repeat", label: "Серийный выпуск" },
            ].map((cap) => (
              <div key={cap.label} className="border border-border bg-card/50 p-4 flex items-center gap-3">
                <Icon name={cap.icon} fallback="Circle" size={18} className="text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{cap.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="Контакты" className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-primary"></div>
            <span className="font-mono-tech text-xs text-primary tracking-widest">// ОБРАТНАЯ СВЯЗЬ</span>
          </div>
          <h2 className="font-oswald text-4xl font-bold tracking-tight mb-10">КОНТАКТЫ</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-border bg-card p-6">
              <div className="font-mono-tech text-xs text-primary mb-4">// ЗАПРОС КОММЕРЧЕСКОГО ПРЕДЛОЖЕНИЯ</div>
              <div className="space-y-4">
                <div>
                  <label className="font-mono-tech text-[10px] text-muted-foreground block mb-1 tracking-wider">ИМЯ / ОРГАНИЗАЦИЯ</label>
                  <input
                    type="text"
                    placeholder="ООО Водснаб"
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono-tech text-[10px] text-muted-foreground block mb-1 tracking-wider">ТЕЛЕФОН / EMAIL</label>
                  <input
                    type="text"
                    placeholder="+7 (999) 000-00-00"
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono-tech text-[10px] text-muted-foreground block mb-1 tracking-wider">ОПИСАНИЕ ЗАПРОСА / АРТИКУЛ</label>
                  <textarea
                    rows={4}
                    placeholder="Укажите тип насоса, наименование детали или артикул..."
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <button className="w-full bg-primary text-primary-foreground font-oswald tracking-widest text-sm py-3 hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Icon name="Send" size={14} />
                  ОТПРАВИТЬ ЗАПРОС
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border border-border bg-card p-5">
                <div className="font-mono-tech text-[10px] text-primary mb-3 tracking-wider">// РЕКВИЗИТЫ</div>
                <div className="space-y-3">
                  {[
                    { icon: "Phone", label: "Отдел продаж", value: "+7 (495) 000-00-00" },
                    { icon: "Mail", label: "Email", value: "sales@promtechdet.ru" },
                    { icon: "MapPin", label: "Адрес", value: "Москва, ул. Промышленная, 14" },
                    { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 09:00–18:00" },
                  ].map((c) => (
                    <div key={c.label} className="flex items-start gap-3">
                      <Icon name={c.icon} fallback="Circle" size={14} className="text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="font-mono-tech text-[10px] text-muted-foreground">{c.label}</div>
                        <div className="text-sm text-foreground">{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-border bg-card p-5">
                <div className="font-mono-tech text-[10px] text-primary mb-3 tracking-wider">// ДОКУМЕНТАЦИЯ</div>
                <div className="space-y-2">
                  {["Сертификат ISO 9001", "ГОСТ Р 52743-2007", "Декларация соответствия"].map((doc) => (
                    <div key={doc} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      <Icon name="FileCheck" size={12} className="text-primary/60" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-primary/30 bg-card p-4 font-mono-tech text-xs">
                <div className="text-primary/60 mb-2">$ status --production</div>
                <div className="text-muted-foreground">Склад: <span className="text-green-400">ONLINE</span></div>
                <div className="text-muted-foreground">Производство: <span className="text-green-400">АКТИВНО</span></div>
                <div className="text-muted-foreground">Доставка: <span className="text-primary">48 часов</span></div>
                <div className="flex items-center gap-1 mt-2 text-primary">
                  <span>$</span>
                  <span className="animate-blink">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono-tech text-xs text-muted-foreground">
            © 2024 ПромТехДеталь — Запчасти для насосов
          </div>
          <div className="font-mono-tech text-xs text-muted-foreground">
            v1.0.0 // BUILD {new Date().getFullYear()}.{String(new Date().getMonth()+1).padStart(2,"0")}
          </div>
        </div>
      </footer>
    </div>
  );
}