import Icon from "@/components/ui/icon";
import { useState } from "react";

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

interface PartsSectionProps {
  scrollTo: (section: string) => void;
}

export default function PartsSection({ scrollTo }: PartsSectionProps) {
  const [filterType, setFilterType] = useState("Все типы");
  const [filterSize, setFilterSize] = useState("Все размеры");
  const [filterMaterial, setFilterMaterial] = useState("Все материалы");

  const filteredParts = PARTS.filter((p) => {
    const okType = filterType === "Все типы" || p.type === filterType;
    const okSize = filterSize === "Все размеры" || p.size === filterSize;
    const okMat = filterMaterial === "Все материалы" || p.material === filterMaterial;
    return okType && okSize && okMat;
  });

  return (
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
  );
}
