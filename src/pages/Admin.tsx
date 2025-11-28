import { useState, useEffect, useCallback } from "react"; // IMPORTANTE: Añadido useCallback
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Trash2, Video, Image as ImageIcon, Plus, ArrowLeft } from "lucide-react";
import { Session } from "@supabase/supabase-js";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  storage_path: string;
  display_order: number;
}

interface VideoItem {
  id: string;
  title: string;
  description: string | null;
  url: string;
  display_order: number;
}

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [imageCategory, setImageCategory] = useState("produccion");

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [addingVideo, setAddingVideo] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // --- Autenticación ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) navigate("/auth");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // --- Funciones de Carga (Memorizadas con useCallback) ---
  const loadImages = useCallback(async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({ title: "Error", description: "No se pudieron cargar las imágenes", variant: "destructive" });
    } else {
      setImages(data || []);
    }
  }, [toast]);

  const loadVideos = useCallback(async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({ title: "Error", description: "No se pudieron cargar los videos", variant: "destructive" });
    } else {
      setVideos(data || []);
    }
  }, [toast]);

  // --- Efecto de Carga Inicial ---
  useEffect(() => {
    if (session) {
      loadImages();
      loadVideos();
    }
  }, [session, loadImages, loadVideos]); // Dependencias completas

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // --- Lógica de Galería ---
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!imageTitle) {
      toast({ title: "Error", description: "Ingresa un título para la imagen", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from("gallery-images").upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("gallery-images").getPublicUrl(filePath);

      const { error: dbError } = await supabase.from("gallery_images").insert({
        title: imageTitle,
        description: imageDescription,
        category: imageCategory,
        image_url: publicUrl,
        storage_path: filePath,
        display_order: images.length,
      });

      if (dbError) throw dbError;

      toast({ title: "Éxito", description: "Imagen subida correctamente" });
      setImageTitle("");
      setImageDescription("");
      loadImages();
    } catch (error) {
      const message = (error as Error).message || "Error al subir imagen";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (image: GalleryImage) => {
    if (!confirm("¿Estás seguro de eliminar esta imagen?")) return;
    try {
      const { error: storageError } = await supabase.storage.from("gallery-images").remove([image.storage_path]);
      if (storageError) throw storageError;

      const { error: dbError } = await supabase.from("gallery_images").delete().eq("id", image.id);
      if (dbError) throw dbError;

      toast({ title: "Éxito", description: "Imagen eliminada" });
      loadImages();
    } catch (error) {
      const message = (error as Error).message || "Error al eliminar imagen";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  };

  // --- Lógica de Videos ---
  const handleAddVideo = async () => {
    if (!videoTitle || !videoUrl) {
      toast({ title: "Error", description: "Título y URL son obligatorios", variant: "destructive" });
      return;
    }

    setAddingVideo(true);
    try {
      const { error } = await supabase.from("videos").insert({
        title: videoTitle,
        description: videoDescription,
        url: videoUrl,
        display_order: videos.length,
      });

      if (error) throw error;

      toast({ title: "Éxito", description: "Video añadido correctamente" });
      setVideoTitle("");
      setVideoDescription("");
      setVideoUrl("");
      loadVideos();
    } catch (error) {
      const message = (error as Error).message || "Error al añadir video";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setAddingVideo(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este video?")) return;
    try {
      const { error } = await supabase.from("videos").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Éxito", description: "Video eliminado" });
      loadVideos();
    } catch (error) {
      const message = (error as Error).message || "Error al eliminar video";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Panel de Administración</h1>
          
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate("/")} variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Volver al Inicio
            </Button>
            
            <Button onClick={handleSignOut} variant="outline" className="gap-2 border-destructive/50 hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="h-4 w-4" /> Cerrar Sesión
            </Button>
          </div>
        </div>

        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="gallery" className="gap-2">
              <ImageIcon className="h-4 w-4" /> Galería
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Video className="h-4 w-4" /> Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subir Nueva Imagen</CardTitle>
                <CardDescription>Agrega fotos a tu portafolio profesional.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="img-title">Título</Label>
                    <Input id="img-title" value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} placeholder="Ej: Hamlet" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="img-category">Categoría</Label>
                    <select
                      id="img-category"
                      value={imageCategory}
                      onChange={(e) => setImageCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
                    >
                      <option value="produccion">Producción Teatral</option>
                      <option value="ensayo">Ensayo</option>
                      <option value="backstage">Backstage</option>
                      <option value="personaje">Personaje</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="img-desc">Descripción</Label>
                  <Textarea id="img-desc" value={imageDescription} onChange={(e) => setImageDescription(e.target.value)} placeholder="Detalles de la foto..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Imagen</Label>
                  <Input id="file" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Imágenes ({images.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group rounded-lg overflow-hidden border border-border">
                      <img src={image.image_url} alt={image.title} className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteImage(image)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-2 text-xs truncate font-medium bg-secondary/50">{image.title}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Añadir Nuevo Video</CardTitle>
                <CardDescription>Enlaza videos de YouTube, Vimeo o Instagram.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vid-title">Título</Label>
                    <Input id="vid-title" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} placeholder="Ej: Showreel 2024" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vid-url">URL del Video</Label>
                    <Input id="vid-url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://instagram.com/..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vid-desc">Descripción</Label>
                  <Textarea id="vid-desc" value={videoDescription} onChange={(e) => setVideoDescription(e.target.value)} placeholder="Breve descripción del clip..." />
                </div>
                <Button onClick={handleAddVideo} disabled={addingVideo} className="w-full md:w-auto">
                  <Plus className="mr-2 h-4 w-4" /> Añadir Video
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Videos Activos ({videos.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {videos.map((video) => (
                    <div key={video.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{video.title}</p>
                          <a href={video.url} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-primary truncate block">
                            {video.url}
                          </a>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteVideo(video.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {videos.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No hay videos añadidos aún.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;