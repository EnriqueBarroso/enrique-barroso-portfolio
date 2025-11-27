import { Button } from "@/components/ui/button";
import { Mail, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            Trabajemos{" "}
            <span className="text-primary">Juntos</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Disponible para proyectos teatrales, colaboraciones artísticas y nuevos desafíos escénicos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-accent font-medium"
              onClick={() => window.location.href = "mailto:contacto@enriquebarroso.com"}
            >
              <Mail className="mr-2 h-5 w-5" />
              Enviar Email
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.open("https://www.instagram.com/", "_blank")}
            >
              <Instagram className="mr-2 h-5 w-5" />
              Instagram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
