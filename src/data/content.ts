// src/data/content.ts

export interface GalleryImage {
  id: string;
  src: string;
  personaje: string;
  año: string;
  obra: string;
  descripción: string | null;
}

export interface PersonalImage {
  id: string;
  src: string;
  título: string;
  año: string;
  lugar: string;
}

export interface Video {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnailSrc: string;
}

// ============================================
// IMÁGENES DE GALERÍA (Teatro/Actuación)
// ============================================
export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/gallery/theater-1.jpg",
    personaje: "Monteleone",
    año: "2017",
    obra: "¿Quién quiere comprar un pueblo?",
    descripción: "Escena junto a la actriz Laura Delgado como 'Lila'."
  },
  {
    id: "2",
    src: "/gallery/theater-2.jpg",
    personaje: "Monteleone",
    año: "2017",
    obra: "¿Quién quiere comprar un pueblo?",
    descripción: "Monólogo dramático en el primer acto."
  },
  {
    id: "3",
    src: "/gallery/theater-3.jpg",
    personaje: "Monteleone",
    año: "2017",
    obra: "¿Quién quiere comprar un pueblo?",
    descripción: "Escena del primer acto."
  },
  {
    id: "4",
    src: "/gallery/theater-4.jpg",
    personaje: "Fernando",
    año: "2018",
    obra: "Cabaigüan-La Habana-Madrid",
    descripción: "Primera escena de la obra."
  },
   {
    id: "5",
    src: "/gallery/theater-5.jpg",
    personaje: "Fernando",
    año: "2018",
    obra: "Cabaigüan-La Habana-Madrid",
    descripción: "Escena de celebración familiar."
  },
  {
    id: "6",
    src: "/gallery/theater-6.jpg",
    personaje: "El padre de Él",
    año: "2016",
    obra: "Ni un si, ni un no",
    descripción: "Ensayo general previo a la función."
  },
   {
    id: "7",
    src: "/gallery/theater-7.jpg",
    personaje: "Fernando",
    año: "2018",
    obra: "Cabaigüan-La Habana-Madrid",
    descripción: "Ensayo de luces y sonido."
  },
  {
    id: "8",
    src: "/gallery/theater-8.jpg",
    personaje: "Comendador",
    año: "2015",
    obra: "Fuenteovejuna",
    descripción: "Escena de la ballesta"
  },
   {
    id: "9",
    src: "/gallery/theater-9.jpg",
    personaje: "Comendador",
    año: "2015",
    obra: "Fuenteovejuna",
    descripción: "Escena junto a actor José Ramon Vigo como el alcalde."
  },
   {
    id: "10",
    src: "/gallery/theater-10.jpg",
    personaje: "Comendador",
    año: "2015",
    obra: "Fuenteovejuna",
    descripción: "Escena junto a la actriz Ailene Junco como 'Pascuala'"
  },
   {
    id: "11",
    src: "/gallery/theater-11.jpg",
    personaje: "Mercucio",
    año: "2019",
    obra: "Romeo y Julieta",
    descripción: "Escena de la muerte de Mercucio"
  },
   {
    id: "12",
    src: "/gallery/theater-12.jpg",
    personaje: "Mercucio",
    año: "2019",
    obra: "Romeo y Julieta",
    descripción: "Escena antes de entrar a la fiesta de los Capuleto, junto a Romeo (Hansel Lestegás) y Bemboleo (Juan Carlos Garcia)."
  },
  // Añade más imágenes aquí para probar el botón "Cargar más"
];


// ============================================
// IMÁGENES PERSONALES
// ============================================
export const personalImages: PersonalImage[] = [
  {
    id: "p1",
    src: "/gallery/personal-1.jpg", 
    título: "En el Estudio",
    año: "2025",
    lugar: "Barcelona"
  },
  {
    id: "p2",
    src: "/gallery/personal-2.jpg",
    título: "En el Estudio",
    año: "2025",
    lugar: "Barcelona"
  },
  {
    id: "p3",
    src: "/gallery/personal-3.jpg",
    título: "En el Estudio",
    año: "2025",
    lugar: "Barcelona"
  },
  {
    id: "p4",
    src: "/gallery/personal-4.jpg",
    título: "En el Estudio",
    año: "2025",
    lugar: "Barcelona"
  },
  {
    id: "p5",
    src: "/gallery/personal-5.jpg",
    título: "En el Estudio",
    año: "2025",
    lugar: "Barcelona"
  },
  {
    id: "p6",
    src: "/gallery/personal-6.jpg",
    título: "En el Estudio",
    año: "2025",
    lugar: "Barcelona"
  },
];
// ============================================
// VIDEOS (Instagram/YouTube)
// ============================================
export const videos: Video[] = [
  {
    id: "v1",
    title: "Reel Actoral 2024",
    description: "Recopilación de escenas de televisión y teatro.",
    url: "https://www.instagram.com/p/ChsOVqLl5JE/", 
    thumbnailSrc: "/gallery/escena-1.jpg", 
  },
  {
    id: "v2",
    title: "Reel Actoral 2024",
    description: "Recopilación de escenas de televisión y teatro.",
    url: "https://www.instagram.com/p/DNqWGZ5P3Y7/", 
    thumbnailSrc: "/gallery/escena-2.jpg", 
  },
  {
    id: "v3",
    title: "Reel Actoral 2024",
    description: "Recopilación de escenas de televisión y teatro.",
    url: "https://www.instagram.com/p/ClMc6OdA6R0/", 
    thumbnailSrc: "/gallery/escena-3.jpg", 
  },
  {
    id: "v4",
    title: "Reel Actoral 2024",
    description: "Recopilación de escenas de televisión y teatro.",
    url: "https://www.instagram.com/reel/CsBAEcHvE_p/", 
    thumbnailSrc: "/gallery/escena-4.jpg", 
  },
  {
    id: "v5",
    title: "Reel Actoral 2024",
    description: "Recopilación de escenas de televisión y teatro.",
    url: "https://www.instagram.com/reel/Cr3WfxjOwuj/", 
    thumbnailSrc: "/gallery/escena-5.jpg", 
  },
];