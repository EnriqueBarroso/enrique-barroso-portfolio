import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  display_order: number;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      setGalleryImages(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las imágenes de la galería",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev! - 1));
  };

  const goToNext = () => {
    setSelectedImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev! + 1));
  };

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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando galería...</p>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay imágenes en la galería aún.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => {
              const isWide = index % 3 === 0;
              return (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden rounded-lg ${
                    isWide ? "aspect-video" : "aspect-square"
                  } cursor-pointer animate-in fade-in slide-in-from-bottom duration-1000`}
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-foreground font-medium">{image.title}</p>
                      {image.description && (
                        <p className="text-foreground/70 text-sm mt-1">{image.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-8 animate-in fade-in duration-1000 delay-700">
          Estas impresionantes fotos ofrecen una mirada única a mi vida actoral y el proceso 
          creativo detrás de mis interpretaciones.
        </p>
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-background/95 backdrop-blur-sm border-border">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-foreground hover:bg-background/50"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 z-50 text-foreground hover:bg-background/50"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <div className="flex flex-col items-center justify-center max-h-full">
                <img
                  src={galleryImages[selectedImage].image_url}
                  alt={galleryImages[selectedImage].title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg animate-in fade-in zoom-in duration-300"
                />
                <div className="text-center mt-4 max-w-2xl">
                  <p className="text-foreground font-medium text-lg">
                    {galleryImages[selectedImage].title}
                  </p>
                  {galleryImages[selectedImage].description && (
                    <p className="text-muted-foreground mt-2">
                      {galleryImages[selectedImage].description}
                    </p>
                  )}
                  <p className="text-muted-foreground text-sm mt-2">
                    {selectedImage + 1} / {galleryImages.length}
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 z-50 text-foreground hover:bg-background/50"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
