import { Award } from "lucide-react";
import aboutImage from "@/assets/about-image.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative animate-in fade-in slide-in-from-left duration-1000">
            <div className="aspect-square rounded-lg overflow-hidden border-4 border-primary/20">
              <img
                src={aboutImage}
                alt="Enrique Barroso"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-1000 delay-300">
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Mi carrera profesional abarca el fascinante mundo del teatro
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Con una década de experiencia en las artes escénicas, he tenido el honor de 
                interpretar una amplia gama de personajes, desde papeles dramáticos hasta 
                comedias que han cautivado a audiencias en diversos escenarios.
              </p>
              
              <p>
                Mi pasión por la actuación comenzó a temprana edad, llevándome a formarme 
                en las mejores escuelas de arte dramático. Cada rol es una oportunidad para 
                explorar la condición humana y conectar con el público de manera profunda y 
                auténtica.
              </p>

              <p>
                El teatro no es solo mi profesión, es mi vocación. Cada presentación es un 
                viaje único donde la emoción, la técnica y la creatividad se fusionan para 
                crear momentos mágicos e irrepetibles.
              </p>
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Formación en Arte Dramático</p>
                  <p className="text-sm text-muted-foreground">Especialización en teatro clásico y contemporáneo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
