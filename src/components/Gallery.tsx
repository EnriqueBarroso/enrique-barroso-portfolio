import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/data/content";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  // Lógica de "Cargar más"
  const INITIAL_DISPLAY = 8;
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY);

  const imagesToShow = galleryImages.slice(0, visibleCount);
  const hasMore = visibleCount < galleryImages.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const goToPrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? imagesToShow.length - 1 : prev! - 1));
  };

  const goToNext = () => {
    setSelectedImage((prev) => (prev === imagesToShow.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Galería de <span className="text-primary">Momentos</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Trayectoria artística: personajes, obras y años de interpretación.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagesToShow.map((image, index) => {
            // El patrón de mosaico se repite cada 8 imágenes
            const isLarge = index % 8 === 0 || index % 8 === 5;
            
            return (
              <div
                key={image.id}
                className={`group relative overflow-hidden rounded-xl cursor-pointer animate-in fade-in zoom-in duration-500 ${
                  isLarge ? "md:col-span-2 md:row-span-2" : ""
                }`}
                onClick={() => openLightbox(index)}
              >
                <div className={`${isLarge ? "aspect-square" : "aspect-[3/4]"}`}>
                  <img
                    src={image.src}
                    alt={`${image.personaje} en ${image.obra}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay con información: Obra, Año y Personaje */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-primary font-bold text-xs uppercase tracking-tighter mb-1">
                      {image.año}
                    </p>
                    <p className="text-white font-display text-xl font-bold leading-tight mb-1">
                      {image.obra}
                    </p>
                    <p className="text-white/80 text-sm italic">
                      como {image.personaje}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div className="mt-16 flex justify-center">
            <Button 
              onClick={loadMore} 
              variant="outline" 
              className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all px-8 py-6 text-lg"
            >
              <Plus className="h-5 w-5" /> Ver más imágenes
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox / Modal de imagen completa */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl h-[90vh] p-0 bg-black/95 border-none flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/10"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          {selectedImage !== null && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 md:p-12">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-white/10 hidden md:flex"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-10 w-10" />
              </Button>

              <div className="flex flex-col items-center max-h-full w-full">
                <img
                  src={imagesToShow[selectedImage].src}
                  alt={imagesToShow[selectedImage].obra}
                  className="max-w-full max-h-[70vh] object-contain rounded shadow-2xl animate-in fade-in zoom-in duration-300"
                />
                
                <div className="mt-8 text-center text-white">
                  <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
                    {imagesToShow[selectedImage].año}
                  </p>
                  <h3 className="text-3xl font-display font-bold mb-2">
                    {imagesToShow[selectedImage].obra}
                  </h3>
                  <p className="text-xl text-white/90 italic mb-4">
                    Personaje: {imagesToShow[selectedImage].personaje}
                  </p>
                  {imagesToShow[selectedImage].descripción && (
                    <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
                      {imagesToShow[selectedImage].descripción}
                    </p>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 text-white hover:bg-white/10 hidden md:flex"
                onClick={goToNext}
              >
                <ChevronRight className="h-10 w-10" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;