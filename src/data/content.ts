// ============================================
// DATOS ESTÁTICOS DEL PORTFOLIO
// ============================================
// Para añadir contenido:
// 1. Añade la imagen a src/assets/
// 2. Importa la imagen aquí
// 3. Añádela al array correspondiente
// ============================================

import theater1 from "@/assets/theater-1.jpg";
import theater2 from "@/assets/theater-2.jpg";
import theater3 from "@/assets/theater-3.jpg";
import theater4 from "@/assets/theater-4.jpg";
import theater5 from "@/assets/theater-5.jpg";
import theater6 from "@/assets/theater-6.jpg";
import theater7 from "@/assets/theater-7.jpg";
import theater8 from "@/assets/theater-8.jpg";

// ============================================
// IMÁGENES DE GALERÍA (Teatro/Actuación)
// ============================================
export interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  src: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    title: "Escena Dramática",
    description: "Momento intenso durante una representación teatral",
    src: theater1,
  },
  {
    id: "2",
    title: "Monólogo",
    description: "Interpretación de un monólogo clásico",
    src: theater2,
  },
  {
    id: "3",
    title: "Ensayo General",
    description: "Preparación antes del estreno",
    src: theater3,
  },
  {
    id: "4",
    title: "En Escena",
    description: "Actuación en vivo frente al público",
    src: theater4,
  },
  {
    id: "5",
    title: "Personaje",
    description: "Transformación en un nuevo personaje",
    src: theater5,
  },
  {
    id: "6",
    title: "Teatro Clásico",
    description: "Interpretación de obra clásica",
    src: theater6,
  },
  {
    id: "7",
    title: "Momento Emotivo",
    description: "Escena cargada de emoción",
    src: theater7,
  },
  {
    id: "8",
    title: "Final de Acto",
    description: "Cierre impactante de una escena",
    src: theater8,
  },
];

// ============================================
// IMÁGENES PERSONALES (Vida personal)
// ============================================
// Añade aquí tus fotos personales
// Ejemplo:
// import personal1 from "@/assets/personal-1.jpg";

export const personalImages: GalleryImage[] = [
  // {
  //   id: "p1",
  //   title: "Viaje a París",
  //   description: "Vacaciones de verano",
  //   src: personal1,
  // },
];

// ============================================
// VIDEOS (Enlaces a Instagram/YouTube)
// ============================================
export interface Video {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnailSrc: string | null;
}

export const videos: Video[] = [
  // Ejemplo:
  // {
  //   id: "v1",
  //   title: "Monólogo de Hamlet",
  //   description: "Interpretación del famoso 'Ser o no ser'",
  //   url: "https://www.instagram.com/reel/xxx",
  //   thumbnailSrc: null, // o importa una imagen para miniatura
  // },
];
