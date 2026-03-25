import { Instagram } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="border-t border-border/30 py-12 px-6 lg:px-12">
    <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
          <img
            src={logo}
            alt="Kai's Divo Collection logo"
            className="h-10 w-10 rounded-full object-cover border border-border/50"
          />
          <p className="font-display text-sm tracking-[0.25em] uppercase text-foreground/80">
            Kai&apos;s Divo Collection
          </p>
        </div>
        <p className="font-body text-xs text-muted-foreground mt-1">
          Kampala, Uganda
        </p>
      </div>

      <a
        href="https://instagram.com/kais_divo_collection"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/50 hover:text-foreground transition-colors"
        aria-label="Instagram"
      >
        <Instagram size={18} />
      </a>

      <p className="font-body text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kai's Divo Collection. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
