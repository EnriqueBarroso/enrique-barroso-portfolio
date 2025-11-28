import { useEffect, useState, useCallback } from "react"; // IMPORTANTE: Añadido useCallback
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast"; // Corregida la ruta si usas hooks/use-toast

interface Video {
  id: string;
  title: string;
  description: string | null;
  url: string;
  display_order: number;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Envolvemos la función con useCallback para estabilizarla
  const fetchVideos = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error cargando videos:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los videos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]); // 'toast' es la única dependencia externa

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]); // Ahora sí incluimos fetchVideos en las dependencias

  return (
    <section id="videos" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 text-center mx-auto animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Videos y{" "}
            <span className="text-primary">Actuaciones</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explora una selección de mis trabajos más recientes en video. 
            Sígueme en Instagram para más contenido exclusivo.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Cargando videos...</div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Pronto habrá nuevos videos.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                  <Instagram className="w-16 h-16 text-primary/40" />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display font-semibold text-xl">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => window.open(video.url, "_blank")}
                  >
                    <Instagram className="mr-2 h-4 w-4" />
                    Ver Video
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center animate-in fade-in duration-1000 delay-700">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-accent"
            onClick={() => window.open("https://www.instagram.com/", "_blank")}
          >
            <Instagram className="mr-2 h-5 w-5" />
            Sígueme en Instagram
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Videos;