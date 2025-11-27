import theater1 from "@/assets/theater-1.jpg";
import theater2 from "@/assets/theater-2.jpg";

const Gallery = () => {
  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Capturando Momentos,{" "}
            <span className="text-primary">Mostrando Talento</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Una mirada detrás del telón con magníficas tomas de ensayos, sets de filmación 
            y producciones teatrales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group relative overflow-hidden rounded-lg aspect-video animate-in fade-in slide-in-from-left duration-1000 delay-300">
            <img
              src={theater1}
              alt="Producción teatral"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-square animate-in fade-in slide-in-from-right duration-1000 delay-500">
            <img
              src={theater2}
              alt="Ensayo teatral"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 animate-in fade-in duration-1000 delay-700">
          Estas impresionantes fotos ofrecen una mirada única a mi vida actoral y el proceso 
          creativo detrás de mis interpretaciones.
        </p>
      </div>
    </section>
  );
};

export default Gallery;
