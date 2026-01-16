import { videos } from "@/data/content";
import { Instagram, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Videos = () => {
  return (
    <section id="videos" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Contenido en <span className="text-primary">Instagram</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Echa un vistazo a mis últimos reels y publicaciones directamente en mi perfil.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="group relative overflow-hidden rounded-2xl bg-background border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Contenedor con Aspect Ratio de Reel (9:16) */}
              <div className="aspect-[9/16] relative">
                <img
                  src={video.thumbnailSrc}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay con Icono de Instagram */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full mb-4">
                    <Instagram className="text-white w-8 h-8" />
                  </div>
                  <Button
                    variant="secondary"
                    className="rounded-full gap-2"
                    onClick={() => window.open(video.url, "_blank")}
                  >
                    <Play className="w-4 h-4 fill-current" /> Ver Reel
                  </Button>
                </div>
              </div>

              {/* Info del Vídeo */}
              <div className="p-4 bg-background">
                <h3 className="font-bold text-sm line-clamp-1">{video.title}</h3>
                {video.description && (
                  <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                    {video.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Botón directo al perfil */}
        <div className="mt-16 flex justify-center">
          <Button 
            variant="outline" 
            size="lg"
            className="gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
            onClick={() => window.open("https://www.instagram.com/03_enrique_actor/", "_blank")}
          >
            <Instagram className="h-5 w-5" /> Sígueme para ver más
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Videos;