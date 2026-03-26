import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collection" },
  { to: "/mens", label: "Men's" },
  { to: "/ladies", label: "Ladies" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
  { to: "/corbata", label: "Corbata" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/10">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-12 relative z-[110]">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Kai's Divo Collection logo"
            className="h-9 w-9 rounded-full object-cover border border-border/50"
          />
          <span className="font-display text-lg tracking-[0.2em] uppercase text-foreground">
            Kai&apos;s Divo
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-xs tracking-[0.2em] uppercase transition-opacity duration-300 ${
                location.pathname === link.to
                  ? "text-foreground opacity-100"
                  : "text-foreground/60 hover:opacity-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground relative z-[110] p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[100] bg-black w-full h-screen flex flex-col items-center justify-center gap-8 px-6 overflow-hidden">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`font-display text-3xl sm:text-4xl md:text-5xl tracking-tight transition-all duration-500 ${
                location.pathname === link.to
                  ? "text-white opacity-100"
                  : "text-white/40 hover:text-white"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
