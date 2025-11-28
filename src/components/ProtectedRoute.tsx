import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    // Verificar sesión actual al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Escuchar cambios en la autenticación (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Estado de carga (mientras verifica con Supabase)
  if (session === undefined) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Cargando...</div>;
  }

  // Si no hay sesión, redirigir al login
  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  // Si hay sesión, mostrar el contenido protegido (Admin)
  return <>{children}</>;
};