import { useState } from "react";
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-12">
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
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 top-0 z-40 glass-strong flex flex-col items-center justify-center gap-10">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-6 text-foreground"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="font-display text-2xl tracking-[0.15em] text-foreground/80 hover:text-foreground transition-colors"
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
