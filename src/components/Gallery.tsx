import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/data/content";

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
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Galería de{" "}
            <span className="text-primary">Momentos</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Una colección de imágenes que capturan la esencia de mis interpretaciones en el escenario.
          </p>
        </div>

        {galleryImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Próximamente nuevas imágenes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`group relative overflow-hidden rounded-xl cursor-pointer animate-in fade-in slide-in-from-bottom duration-1000 ${
                  index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                style={{ animationDelay: `${index * 100 + 300}ms` }}
                onClick={() => openLightbox(index)}
              >
                <div className={`${index === 0 || index === 5 ? "aspect-square" : "aspect-[3/4]"}`}>
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-foreground font-medium">{image.title}</p>
                    {image.description && (
                      <p className="text-foreground/70 text-sm mt-1">{image.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
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
