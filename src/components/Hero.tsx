import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-block">
              <p className="text-sm font-medium tracking-widest text-primary mb-4">
                | ENRIQUE BARROSO |
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight">
              Actor de{" "}
              <span className="text-primary">Teatro</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Una década dedicada al arte escénico, transformando personajes en experiencias inolvidables.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("videos")}
                className="bg-primary text-primary-foreground hover:bg-accent font-medium group"
              >
                <Film className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Ver Videos
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium"
              >
                Contactar
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end space-y-12 animate-in fade-in slide-in-from-right duration-1000 delay-300">
            <div className="text-right space-y-2">
              <Film className="w-12 h-12 text-primary ml-auto mb-4" />
              <div className="text-6xl font-display font-bold text-primary">10+</div>
              <p className="text-sm italic text-muted-foreground">años de experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
