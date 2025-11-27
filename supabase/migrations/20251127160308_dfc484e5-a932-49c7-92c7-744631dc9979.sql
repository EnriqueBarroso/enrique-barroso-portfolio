-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true);

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gallery_images - Anyone can view
CREATE POLICY "Anyone can view gallery images"
ON public.gallery_images
FOR SELECT
USING (true);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can insert gallery images"
ON public.gallery_images
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update gallery images"
ON public.gallery_images
FOR UPDATE
TO authenticated
USING (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated users can delete gallery images"
ON public.gallery_images
FOR DELETE
TO authenticated
USING (true);

-- Storage policies for gallery-images bucket
CREATE POLICY "Anyone can view gallery images in storage"
ON storage.objects
FOR SELECT
USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can update their gallery images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'gallery-images');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_gallery_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gallery_images_timestamp
BEFORE UPDATE ON public.gallery_images
FOR EACH ROW
EXECUTE FUNCTION public.update_gallery_images_updated_at();