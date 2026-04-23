import { useState } from "react";
import Icon from "@/components/ui/icon";

const SEND_ORDER_URL = "https://functions.poehali.dev/a567e3f0-5211-4e21-b986-abe4ebb9f6dc";

export default function ContactsSection() {
  const [formName, setFormName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!formName.trim() || !formContact.trim()) return;
    setFormStatus("sending");
    try {
      const res = await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, contact: formContact, message: formMessage }),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormName("");
        setFormContact("");
        setFormMessage("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
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
              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-12 h-12 border border-green-500 flex items-center justify-center">
                    <Icon name="CheckCheck" size={20} className="text-green-400" />
                  </div>
                  <div className="font-mono-tech text-xs text-green-400 text-center">// ЗАЯВКА ОТПРАВЛЕНА</div>
                  <div className="text-sm text-muted-foreground text-center">Мы свяжемся с вами в ближайшее время</div>
                  <button onClick={() => setFormStatus("idle")} className="font-mono-tech text-xs text-muted-foreground border border-border px-4 py-2 hover:border-primary hover:text-primary transition-all">
                    НОВЫЙ ЗАПРОС
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="font-mono-tech text-[10px] text-muted-foreground block mb-1 tracking-wider">ИМЯ / ОРГАНИЗАЦИЯ</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="ООО Водснаб"
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-[10px] text-muted-foreground block mb-1 tracking-wider">ТЕЛЕФОН / EMAIL</label>
                    <input
                      type="text"
                      value={formContact}
                      onChange={(e) => setFormContact(e.target.value)}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-[10px] text-muted-foreground block mb-1 tracking-wider">ОПИСАНИЕ ЗАПРОСА / АРТИКУЛ</label>
                    <textarea
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Укажите тип насоса, наименование детали или артикул..."
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  {formStatus === "error" && (
                    <div className="font-mono-tech text-[10px] text-red-400 border border-red-400/30 px-3 py-2">
                      // ОШИБКА ОТПРАВКИ — попробуйте ещё раз
                    </div>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={formStatus === "sending" || !formName.trim() || !formContact.trim()}
                    className="w-full bg-primary text-primary-foreground font-oswald tracking-widest text-sm py-3 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name={formStatus === "sending" ? "Loader" : "Send"} size={14} className={formStatus === "sending" ? "animate-spin" : ""} />
                    {formStatus === "sending" ? "ОТПРАВКА..." : "ОТПРАВИТЬ ЗАПРОС"}
                  </button>
                </div>
              )}
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
    </>
  );
}
