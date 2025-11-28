import { Award, Briefcase } from "lucide-react"; // Añadimos Briefcase para variar iconos
import aboutImage from "@/assets/about-image.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Imagen (Izquierda) */}
          <div className="relative animate-in fade-in slide-in-from-left duration-1000">
            <div className="aspect-square rounded-lg overflow-hidden border-4 border-primary/20 shadow-xl">
              <img
                src={aboutImage}
                alt="Enrique Barroso"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Texto (Derecha) */}
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-1000 delay-300">
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              Ingeniero de Formación, <span className="text-primary">Actor por Vocación</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Soy ingeniero civil de formación, pero actor por vocación absoluta. Aunque me gradué con los números, 
                mi verdadera pasión siempre latió en los escenarios. Tras mis inicios en el mundo aficionado, 
                en 2010 di el gran salto profesional integrándome a la emblemática compañía 
                <strong className="text-foreground"> Hubert de Blanck</strong>, una de las instituciones más prestigiosas de Cuba.
              </p>
              
              <p>
                Allí no solo me formé, sino que crecí. Bajo la tutela de maestros de la talla de 
                <span className="text-foreground"> Berta Martínez, Orietta Medina, Abelardo Estorino y María Elena Soteras</span>, 
                fui puliendo mi técnica y enfrentándome a personajes de alta complejidad.
              </p>

              <p>
                Este viaje me llevó a consolidarme como actor de primer nivel, habitando clásicos universales 
                como <em>Fuenteovejuna</em>, <em>Romeo y Julieta</em> o <em>El cartero de Neruda</em>, sin olvidar la magia del teatro infantil. 
                Hoy, aplico la disciplina de la ingeniería a la arquitectura de cada emoción.
              </p>
            </div>

            {/* Puntos destacados */}
            <div className="pt-6 space-y-4 border-t border-border mt-6">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Compañía Hubert de Blanck</p>
                  <p className="text-sm text-muted-foreground">Más de una década de trayectoria profesional</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Briefcase className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Disciplina y Técnica</p>
                  <p className="text-sm text-muted-foreground">Rigor profesional aplicado al arte escénico</p>
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