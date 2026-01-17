import { Instagram } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Esquema de validación
const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Introduce un correo electrónico válido"),
  message: z.string().min(10, "El mensaje debe ser más largo"),
});

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // REEMPLAZA ESTA URL con tu Endpoint de Formspree
    const FORMSPREE_URL = "https://formspree.io/f/mwpdoynv";

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("¡Mensaje enviado con éxito!", {
          description: "Te responderé lo antes posible.",
        });
        form.reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Hubo un error al enviar el mensaje.", {
        description: "Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Trabajemos <span className="text-primary">Juntos</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            ¿Tienes un proyecto en mente o quieres contar conmigo para una producción?
            Escríbeme y hablemos.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cuéntame sobre tu proyecto..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full py-6 text-lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </Form>
          <div className="mt-12 text-center border-t pt-8">
            <p className="text-muted-foreground mb-4 font-medium">O si lo prefieres, búscame en redes:</p>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-bold text-lg"
            >
              <Instagram className="h-5 w-5" /> @03_enrique_actor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

export const socialLinks = {
  instagram: "https://www.instagram.com/03_enrique_actor/", // Reemplaza con tu link real
  email: "tu@email.com",
};