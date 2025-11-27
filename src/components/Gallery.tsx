import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import theater1 from "@/assets/theater-1.jpg";
import theater2 from "@/assets/theater-2.jpg";
import theater3 from "@/assets/theater-3.jpg";
import theater4 from "@/assets/theater-4.jpg";
import theater5 from "@/assets/theater-5.jpg";
import theater6 from "@/assets/theater-6.jpg";
import theater7 from "@/assets/theater-7.jpg";
import theater8 from "@/assets/theater-8.jpg";

const galleryImages = [
  { src: theater1, alt: "Producción teatral", aspect: "aspect-video" },
  { src: theater2, alt: "Ensayo teatral", aspect: "aspect-square" },
  { src: theater3, alt: "Preparación backstage", aspect: "aspect-video" },
  { src: theater4, alt: "Actor en escena", aspect: "aspect-square" },
  { src: theater5, alt: "Ensayo de grupo", aspect: "aspect-video" },
  { src: theater6, alt: "Personaje de época", aspect: "aspect-square" },
  { src: theater7, alt: "Función en vivo", aspect: "aspect-video" },
  { src: theater8, alt: "Momento dramático", aspect: "aspect-square" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg ${image.aspect} cursor-pointer animate-in fade-in slide-in-from-bottom duration-1000`}
              style={{ animationDelay: `${index * 100 + 300}ms` }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-foreground font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

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
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg animate-in fade-in zoom-in duration-300"
                />
                <p className="text-foreground font-medium mt-4 text-center">
                  {galleryImages[selectedImage].alt}
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  {selectedImage + 1} / {galleryImages.length}
                </p>
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
