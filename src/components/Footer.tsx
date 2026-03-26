import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="border-t border-border/30 pt-16 pb-8 px-6 lg:px-12 bg-background">
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Kai's Divo Collection logo"
              className="h-10 w-10 rounded-full object-cover border border-border/50"
            />
            <p className="font-display text-lg tracking-[0.1em] uppercase text-foreground">
              Kai&apos;s Divo
            </p>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
            East Africa&apos;s premier bespoke fashion house, where precision tailoring meets bold vision.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="https://instagram.com/kais_divo_collection"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-display text-sm uppercase tracking-widest text-foreground">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { to: "/", label: "Home" },
              { to: "/collections", label: "Collections" },
              { to: "/mens", label: "Men's Collection" },
              { to: "/ladies", label: "Ladies Collection" },
              { to: "/about", label: "About Us" },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-display text-sm uppercase tracking-widest text-foreground">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-muted-foreground group">
              <MapPin size={18} className="mt-0.5 group-hover:text-foreground transition-colors" />
              <span className="font-body text-sm">Kampala, Uganda</span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground group">
              <Phone size={18} className="group-hover:text-foreground transition-colors" />
              <span className="font-body text-sm">+256 701 234 567</span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground group">
              <Mail size={18} className="group-hover:text-foreground transition-colors" />
              <span className="font-body text-sm text-wrap break-all">info@kaisdivocollection.com</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-display text-sm uppercase tracking-widest text-foreground">Studio Hours</h4>
          <ul className="space-y-2 text-sm font-body text-muted-foreground">
            <li>Mon - Fri: 9:00 AM - 6:00 PM</li>
            <li>Saturday: 10:00 AM - 4:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kai's Divo Collection. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link to="/contact" className="font-body text-xs text-muted-foreground hover:text-foreground">Privacy Policy</Link>
          <Link to="/contact" className="font-body text-xs text-muted-foreground hover:text-foreground">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
