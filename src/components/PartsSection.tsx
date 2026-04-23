import Icon from "@/components/ui/icon";
import { useState, useEffect, useRef } from "react";

const GET_PARTS_URL = "https://functions.poehali.dev/1fe895cb-1796-4767-9cf4-918f239b0559";
const UPLOAD_PARTS_URL = "https://functions.poehali.dev/82d0889c-e7c4-429d-bdf9-1f9c2c70f008";

const STATIC_PARTS = [
  { id: 1, drawing_number: null, qty_per_pump: null, name: "Рабочее колесо Ø120", note: null, dimensions: "Ø120", weight_kg: null, material: "Нержавеющая сталь", code: "PTD-CW-120-SS" },
  { id: 2, drawing_number: null, qty_per_pump: null, name: "Рабочее колесо Ø80", note: null, dimensions: "Ø80", weight_kg: null, material: "Чугун", code: "PTD-CW-080-CI" },
  { id: 3, drawing_number: null, qty_per_pump: null, name: "Торцевое уплотнение", note: null, dimensions: "DN50", weight_kg: null, material: "Нержавеющая сталь", code: "PTD-MS-050-SS" },
  { id: 4, drawing_number: null, qty_per_pump: null, name: "Корпус насоса К80/50", note: null, dimensions: "DN80", weight_kg: null, material: "Чугун", code: "PTD-HB-080-CI" },
  { id: 5, drawing_number: null, qty_per_pump: null, name: "Вал насосный Ø32", note: null, dimensions: "Ø32", weight_kg: null, material: "Легированная сталь", code: "PTD-SH-032-AS" },
];

interface Part {
  id: number;
  code: string | null;
  drawing_number: string | null;
  qty_per_pump: number | null;
  name: string;
  note: string | null;
  dimensions: string | null;
  weight_kg: number | null;
  material: string | null;
}

interface PartsSectionProps {
  scrollTo: (section: string) => void;
}

const COLS = [
  { key: "drawing_number", label: "Номер чертежа" },
  { key: "qty_per_pump", label: "Шт. в насосе" },
  { key: "name", label: "Наименование" },
  { key: "note", label: "Примечание" },
  { key: "dimensions", label: "Габариты, мм" },
  { key: "weight_kg", label: "Масса, кг" },
  { key: "material", label: "Материал" },
] as const;

export default function PartsSection({ scrollTo }: PartsSectionProps) {
  const [parts, setParts] = useState<Part[]>(STATIC_PARTS);
  const [fromDb, setFromDb] = useState(false);
  const [loadingDb, setLoadingDb] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(GET_PARTS_URL)
      .then((r) => r.json())
      .then((data) => {
        if (data.parts && data.parts.length > 0) {
          setParts(data.parts);
          setFromDb(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingDb(false));
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadStatus("uploading");
    setUploadMessage("");

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const b64 = btoa(
        new Uint8Array(ev.target!.result as ArrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      try {
        const res = await fetch(UPLOAD_PARTS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: b64 }),
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          setUploadStatus("success");
          setUploadMessage(`Загружено ${data.imported} позиций`);
          const updated = await fetch(GET_PARTS_URL).then((r) => r.json());
          if (updated.parts?.length > 0) {
            setParts(updated.parts);
            setFromDb(true);
          }
        } else {
          setUploadStatus("error");
          setUploadMessage(data.error || "Ошибка загрузки");
        }
      } catch {
        setUploadStatus("error");
        setUploadMessage("Ошибка соединения");
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsArrayBuffer(file);
  };

  const filteredParts = parts.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.material || "").toLowerCase().includes(q) ||
      (p.drawing_number || "").toLowerCase().includes(q) ||
      (p.note || "").toLowerCase().includes(q)
    );
  });

  return (
    <section id="Запчасти" className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
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
            <div className={fromDb ? "text-green-400" : "text-primary"}>
              {fromDb ? "// ИЗ БАЗЫ ДАННЫХ" : `REV.${new Date().getFullYear()}.${String(new Date().getMonth() + 1).padStart(2, "0")}`}
            </div>
          </div>
        </div>

        {/* Search + Upload */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 border border-border bg-card px-3 py-2">
            <Icon name="Search" size={14} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по наименованию, материалу, примечанию..."
              className="flex-1 bg-transparent font-mono-tech text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={12} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input ref={fileInputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleFileChange} />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadStatus === "uploading" || loadingDb}
              className="flex items-center gap-2 border border-primary/40 text-primary font-mono-tech text-xs px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name={uploadStatus === "uploading" ? "Loader" : "FileSpreadsheet"} size={13} className={uploadStatus === "uploading" ? "animate-spin" : ""} />
              {uploadStatus === "uploading" ? "ЗАГРУЗКА..." : "ЗАГРУЗИТЬ EXCEL"}
            </button>
          </div>
        </div>

        {/* Upload status */}
        {uploadStatus === "success" && (
          <div className="flex items-center gap-2 font-mono-tech text-xs text-green-400 border border-green-400/30 px-3 py-2 mb-4">
            <Icon name="CheckCheck" size={12} />
            // {uploadMessage}
          </div>
        )}
        {uploadStatus === "error" && (
          <div className="flex items-center gap-2 font-mono-tech text-xs text-red-400 border border-red-400/30 px-3 py-2 mb-4">
            <Icon name="AlertCircle" size={12} />
            // ОШИБКА: {uploadMessage}
          </div>
        )}

        {/* List */}
        {loadingDb ? (
          <div className="text-center py-16 border border-dashed border-border">
            <Icon name="Loader" size={24} className="text-primary mx-auto mb-3 animate-spin" />
            <div className="font-mono-tech text-xs text-muted-foreground">// ЗАГРУЗКА КАТАЛОГА...</div>
          </div>
        ) : filteredParts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border">
            <Icon name="SearchX" size={32} className="text-muted-foreground mx-auto mb-3" />
            <div className="font-mono-tech text-sm text-muted-foreground">// НЕТ РЕЗУЛЬТАТОВ ПО ЗАДАННЫМ ПАРАМЕТРАМ</div>
          </div>
        ) : (
          <div className="border border-border">
            {/* Header row */}
            <div className="grid grid-cols-[1.2fr_0.6fr_2fr_1.2fr_1fr_0.6fr_1.2fr_auto] border-b border-border bg-card">
              {COLS.map((col) => (
                <div key={col.key} className="font-mono-tech text-[10px] text-primary px-3 py-3 tracking-wider uppercase">
                  {col.label}
                </div>
              ))}
              <div className="px-3 py-3" />
            </div>

            {/* Data rows */}
            {filteredParts.map((part, i) => (
              <div
                key={part.id}
                className={`grid grid-cols-[1.2fr_0.6fr_2fr_1.2fr_1fr_0.6fr_1.2fr_auto] border-b border-border/50 hover:bg-primary/5 transition-colors group ${i % 2 !== 0 ? "bg-card/30" : ""}`}
              >
                <div className="font-mono-tech text-[11px] text-muted-foreground px-3 py-3">{part.drawing_number || "—"}</div>
                <div className="font-mono-tech text-[11px] text-muted-foreground px-3 py-3 text-center">{part.qty_per_pump ?? "—"}</div>
                <div className="font-oswald text-sm text-foreground px-3 py-3 group-hover:text-primary transition-colors">{part.name}</div>
                <div className="font-mono-tech text-[11px] text-muted-foreground px-3 py-3">{part.note || "—"}</div>
                <div className="font-mono-tech text-[11px] text-muted-foreground px-3 py-3">{part.dimensions || "—"}</div>
                <div className="font-mono-tech text-[11px] text-muted-foreground px-3 py-3">{part.weight_kg != null ? part.weight_kg : "—"}</div>
                <div className="font-mono-tech text-[11px] text-muted-foreground px-3 py-3">{part.material || "—"}</div>
                <div className="px-3 py-3 flex items-center">
                  <button
                    onClick={() => scrollTo("Контакты")}
                    className="font-mono-tech text-[10px] border border-primary/40 text-primary px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-all whitespace-nowrap"
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
