import Icon from "@/components/ui/icon";

const NAV_ITEMS = ["Главная", "Запчасти", "Галерея", "Контакты"];

interface NavBarProps {
  activeSection: string;
  scrollTo: (section: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}

export default function NavBar({ activeSection, scrollTo, mobileMenuOpen, setMobileMenuOpen }: NavBarProps) {
  return (
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
  );
}
