import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const sections = ["hero", "about", "gallery", "videos", "personal", "contact"] as const;

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "about", label: "SOBRE MÍ" },
    { id: "gallery", label: "GALERÍA" },
    { id: "videos", label: "VIDEOS" },
    { id: "personal", label: "PERSONAL" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="group relative text-2xl font-display font-bold text-primary hover:text-accent transition-all duration-300"
          >
            <span className="relative z-10 group-hover:scale-110 inline-block transition-transform duration-300">
              EB
            </span>
            <span className="absolute inset-0 -m-2 rounded-lg bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
