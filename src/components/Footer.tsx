import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="pt-32 pb-16 px-6 lg:px-12 bg-background border-t border-foreground/5">
    <div className="mx-auto max-w-[1800px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        {/* Drops */}
        <div className="space-y-8">
          <h4 className="font-display text-xs uppercase tracking-[0.4em] text-foreground">Drops</h4>
          <ul className="space-y-4">
            {["Drop 6", "Drop 5", "Drop 4", "Drop 3"].map((label) => (
              <li key={label}>
                <Link to="/collections" className="nav-link text-[10px] lowercase tracking-widest">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Collections */}
        <div className="space-y-8">
          <h4 className="font-display text-xs uppercase tracking-[0.4em] text-foreground">Collections</h4>
          <ul className="space-y-4">
            {[
              { label: "MEN", to: "/mens" },
              { label: "LADIES", to: "/ladies" },
              { label: "GALERIE", to: "/collections" }
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="nav-link text-[10px] lowercase tracking-widest">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div className="space-y-8">
          <h4 className="font-display text-xs uppercase tracking-[0.4em] text-foreground">Information</h4>
          <ul className="space-y-4">
            {["Contact", "Returns and Refunds", "Privacy Policy", "Terms of Service"].map((label) => (
              <li key={label}>
                <Link to="/contact" className="nav-link text-[10px] lowercase tracking-widest">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About */}
        <div className="space-y-8">
          <h4 className="font-display text-xs uppercase tracking-[0.4em] text-foreground">About Us</h4>
          <div className="space-y-6">
            <p className="font-body text-[11px] text-foreground/60 leading-relaxed uppercase tracking-wider">
              Kai's Divo is the premier bespoke fashion house in Kampala, founded by creative director Abbas Kaijuka.
            </p>
            <p className="font-body text-[11px] text-foreground/60 leading-relaxed uppercase tracking-wider">
              Redefining contemporary elegance through precision tailoring and a commitment to focused narratives.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-24 flex flex-col items-center gap-12">
        <div className="flex gap-8">
          <a href="#" className="text-foreground/40 hover:text-foreground transition-colors"><Instagram size={18} /></a>
          <a href="#" className="text-foreground/40 hover:text-foreground transition-colors"><Mail size={18} /></a>
        </div>
        
        <div className="text-center space-y-8 w-full overflow-hidden">
          <p className="font-body text-[9px] tracking-[0.3em] uppercase opacity-40">
            © 2026. KAI'S DIVO
          </p>
          <h1 className="huge-text opacity-10 select-none pointer-events-none whitespace-nowrap translate-y-12">
            Kai's Divo
          </h1>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
