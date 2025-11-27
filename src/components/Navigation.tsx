import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
            className="text-xl font-display font-semibold text-primary hover:text-accent transition-colors"
          >
            EB
          </button>
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              SOBRE MÍ
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              GALERÍA
            </button>
            <button
              onClick={() => scrollToSection("videos")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              VIDEOS
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-primary-foreground hover:bg-accent font-medium"
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
