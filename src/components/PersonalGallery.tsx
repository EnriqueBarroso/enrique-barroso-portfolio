import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalImages } from "@/data/content";

const PersonalGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  // Lógica de "Cargar más" para que no haya tope de 8
  const INITIAL_DISPLAY = 8;
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY);

  const imagesToShow = personalImages.slice(0, visibleCount);
  const hasMore = visibleCount < personalImages.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4); // Carga 4 más en cada clic
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
    <section id="personal" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Fuera del <span className="text-primary">Escenario</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Momentos del día a día, viajes y vida personal. Un vistazo más allá de las tablas.
          </p>
        </div>

        {personalImages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground italic">
            Pronto habrá nuevas fotos personales.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imagesToShow.map((image, index) => {
                // Aplicamos el patrón de mosaico dinámico (cada 8 fotos se repite)
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
                        alt={image.título}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Overlay con: Año, Título y Lugar */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-primary font-bold text-xs uppercase mb-1">{image.año}</p>
                        <p className="text-white font-display text-xl font-bold leading-tight">{image.título}</p>
                        <p className="text-white/80 text-sm italic">{image.lugar}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Botón Cargar Más */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <Button 
                  onClick={loadMore} 
                  variant="outline" 
                  className="gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all px-8"
                >
                  <Plus className="h-4 w-4" /> Ver más momentos
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl h-[80vh] p-0 bg-black/95 border-none flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/10"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          {selectedImage !== null && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-white">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 hidden md:flex text-white hover:bg-white/10"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-10 w-10" />
              </Button>

              <img 
                src={imagesToShow[selectedImage].src} 
                className="max-w-full max-h-[60vh] object-contain rounded shadow-2xl" 
                alt={imagesToShow[selectedImage].título}
              />
              
              <div className="mt-6 text-center">
                <p className="text-primary font-bold text-sm uppercase tracking-widest">{imagesToShow[selectedImage].año}</p>
                <h3 className="text-3xl font-display font-bold mb-1">{imagesToShow[selectedImage].título}</h3>
                <p className="text-xl text-white/80 italic">{imagesToShow[selectedImage].lugar}</p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 hidden md:flex text-white hover:bg-white/10"
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

export default PersonalGallery;