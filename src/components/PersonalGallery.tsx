import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalImages } from "@/data/content";

const PersonalGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Don't render section if no personal images
  if (personalImages.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? personalImages.length - 1 : prev! - 1));
  };

  const goToNext = () => {
    setSelectedImage((prev) => (prev === personalImages.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section id="personal" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Fuera del{" "}
            <span className="text-primary">Escenario</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Momentos del día a día, viajes y vida personal. Un vistazo más allá de las tablas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {personalImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer animate-in fade-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 100 + 300}ms` }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <p className="text-foreground font-medium text-sm">{image.title}</p>
                  {image.description && (
                    <p className="text-foreground/70 text-xs mt-1 line-clamp-2">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
                  src={personalImages[selectedImage].src}
                  alt={personalImages[selectedImage].title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg animate-in fade-in zoom-in duration-300"
                />
                <div className="text-center mt-4 max-w-2xl">
                  <p className="text-foreground font-medium text-lg">
                    {personalImages[selectedImage].title}
                  </p>
                  {personalImages[selectedImage].description && (
                    <p className="text-muted-foreground mt-2">
                      {personalImages[selectedImage].description}
                    </p>
                  )}
                  <p className="text-muted-foreground text-sm mt-2">
                    {selectedImage + 1} / {personalImages.length}
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

export default PersonalGallery;
