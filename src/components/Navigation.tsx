import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const sections = ["hero", "about", "gallery", "videos", "personal", "contact"] as const;

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detectar sección activa
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil al hacer scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "about", label: "SOBRE MÍ" },
    { id: "gallery", label: "GALERÍA" },
    { id: "videos", label: "VIDEOS" },
    { id: "personal", label: "PERSONAL" },
    { id: "contact", label: "CONTACTO" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/95 backdrop-blur-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection("hero")}
              className="group relative text-2xl font-display font-bold text-primary hover:text-accent transition-all duration-300 z-50"
            >
              <span className="relative z-10 group-hover:scale-110 inline-block transition-transform duration-300">
                EB
              </span>
              <span className="absolute inset-0 -m-2 rounded-lg bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.slice(0, -1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      activeSection === item.id ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("contact")}
                className={`font-medium transition-all duration-300 ${
                  activeSection === "contact"
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground hover:bg-accent"
                }`}
              >
                CONTACTO
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span
                className={`absolute transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
                }`}
              >
                <X className="w-6 h-6" />
              </span>
              <span
                className={`absolute transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              >
                <Menu className="w-6 h-6" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-lg md:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-2xl font-display font-semibold transition-all duration-500 ${
                activeSection === item.id
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
              style={{
                transform: isMobileMenuOpen
                  ? "translateY(0)"
                  : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
                transitionDelay: isMobileMenuOpen
                  ? `${index * 75}ms`
                  : `${(navItems.length - index) * 50}ms`,
              }}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="block h-0.5 bg-primary mt-1 animate-scale-in" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
