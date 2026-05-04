import Icon from "@/components/ui/icon";

const GALLERY = [
  {
    src: "https://cdn.poehali.dev/projects/cefcff8e-8f75-492a-9553-1c18c82cffe4/files/3737437c-9c5c-4652-8d5b-abc4a154cfde.jpg",
    title: "Готовые валы",
    desc: "Насосные валы из легированной стали 40Х и нержавейки 12Х18Н10Т"
  },
  {
    src: "https://cdn.poehali.dev/projects/cefcff8e-8f75-492a-9553-1c18c82cffe4/files/6467335a-ceeb-4e6e-be61-a35f736316b3.jpg",
    title: "Токарная обработка",
    desc: "Финишная обработка посадочных мест на станках с ЧПУ"
  },
  {
    src: "https://cdn.poehali.dev/projects/cefcff8e-8f75-492a-9553-1c18c82cffe4/files/80edde49-a905-47c4-a308-8d0f010d31ef.jpg",
    title: "Контроль качества",
    desc: "Измерение биения и посадочных диаметров на координатной машине"
  },
];

export default function GallerySection() {
  return (
    <section id="Галерея" className="py-20 border-t border-border grid-bg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-primary"></div>
          <span className="font-mono-tech text-xs text-primary tracking-widest">// ПРОИЗВОДСТВО</span>
        </div>
        <h2 className="font-oswald text-4xl font-bold tracking-tight mb-10">ПРОИЗВОДСТВО</h2>

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
            { icon: "Ruler", label: "Допуск на диаметр от 0.005 мм" },
            { icon: "ShieldCheck", label: "ОТК — 100% каждого вала" },
            { icon: "FileText", label: "Изготовление по чертежу или образцу" },
            { icon: "Repeat", label: "Серийный и единичный выпуск" },
          ].map((cap) => (
            <div key={cap.label} className="border border-border bg-card/50 p-4 flex items-center gap-3">
              <Icon name={cap.icon} fallback="Circle" size={18} className="text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">{cap.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}