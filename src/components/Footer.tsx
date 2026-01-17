import { Instagram, Mail } from "lucide-react";
import { socialLinks } from "@/data/content";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-xl">
              Enrique <span className="text-primary">Barroso</span>
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Actor & Intérprete © {new Date().getFullYear()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 hover:bg-primary hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${socialLinks.email}`}
              className="p-3 rounded-full bg-secondary/50 hover:bg-primary hover:text-white transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;