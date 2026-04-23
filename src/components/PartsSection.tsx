import Icon from "@/components/ui/icon";
import { useState, useEffect, useRef } from "react";

const GET_PARTS_URL = "https://functions.poehali.dev/1fe895cb-1796-4767-9cf4-918f239b0559";
const UPLOAD_PARTS_URL = "https://functions.poehali.dev/82d0889c-e7c4-429d-bdf9-1f9c2c70f008";

const STATIC_PARTS = [
  { id: 1, name: "Рабочее колесо Ø120", material: "Нержавеющая сталь", code: "PTD-CW-120-SS", dimensions: "Ø120", weight_kg: null, drawing_number: null, qty_per_pump: null },
  { id: 2, name: "Рабочее колесо Ø80", material: "Чугун", code: "PTD-CW-080-CI", dimensions: "Ø80", weight_kg: null, drawing_number: null, qty_per_pump: null },
  { id: 3, name: "Торцевое уплотнение", material: "Нержавеющая сталь", code: "PTD-MS-050-SS", dimensions: "DN50", weight_kg: null, drawing_number: null, qty_per_pump: null },
  { id: 4, name: "Корпус насоса К80/50", material: "Чугун", code: "PTD-HB-080-CI", dimensions: "DN80", weight_kg: null, drawing_number: null, qty_per_pump: null },
  { id: 5, name: "Вал насосный Ø32", material: "Легированная сталь", code: "PTD-SH-032-AS", dimensions: "Ø32", weight_kg: null, drawing_number: null, qty_per_pump: null },
  { id: 6, name: "Подшипниковый узел", material: "Легированная сталь", code: "PTD-BU-065-AS", dimensions: "DN65", weight_kg: null, drawing_number: null, qty_per_pump: null },
  { id: 7, name: "Крышка корпуса DN100", material: "Нержавеющая сталь", code: "PTD-HC-100-SS", dimensions: "DN100", weight_kg: null, drawing_number: null, qty_per_pump: null },
  { id: 8, name: "Диффузор ступени", material: "Чугун", code: "PTD-DF-050-CI", dimensions: "DN50", weight_kg: null, drawing_number: null, qty_per_pump: null },
  { id: 9, name: "Направляющий аппарат", material: "Нержавеющая сталь", code: "PTD-GA-125-SS", dimensions: "DN125", weight_kg: null, drawing_number: null, qty_per_pump: null },
];

interface Part {
  id: number;
  code: string | null;
  drawing_number: string | null;
  qty_per_pump: number | null;
  name: string;
  dimensions: string | null;
  weight_kg: number | null;
  material: string | null;
}

interface PartsSectionProps {
  scrollTo: (section: string) => void;
}

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
      (p.code || "").toLowerCase().includes(q) ||
      (p.material || "").toLowerCase().includes(q) ||
      (p.drawing_number || "").toLowerCase().includes(q)
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
              {fromDb ? "// ИЗ БАЗЫ ДАННЫХ" : `REV.${new Date().getFullYear()}.${String(new Date().getMonth()+1).padStart(2,"00")}`}
            </div>
          </div>
        </div>

        {/* Upload + Search bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 border border-border bg-card px-3 py-2">
            <Icon name="Search" size={14} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по наименованию, артикулу, материалу..."
              className="flex-1 bg-transparent font-mono-tech text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={12} />
              </button>
            )}
          </div>

          {/* Upload Excel */}
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadStatus === "uploading" || loadingDb}
              className="flex items-center gap-2 border border-primary/40 text-primary font-mono-tech text-xs px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon
                name={uploadStatus === "uploading" ? "Loader" : "FileSpreadsheet"}
                size={13}
                className={uploadStatus === "uploading" ? "animate-spin" : ""}
              />
              {uploadStatus === "uploading" ? "ЗАГРУЗКА..." : "ЗАГРУЗИТЬ EXCEL"}
            </button>
          </div>
        </div>

        {/* Upload status message */}
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