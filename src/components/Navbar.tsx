import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ShoppingBag } from "lucide-react";

const navLinks = [
  { to: "/collections", label: "Galerie" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/stockist", label: "Stockist" },
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
    <nav className="fixed top-0 left-0 right-0 z-[150] bg-background border-b border-foreground/10">
      <div className="mx-auto max-w-[1800px] flex items-center justify-between px-6 py-6 lg:px-12 relative z-[110]">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-display text-2xl tracking-tighter uppercase text-foreground font-semibold">
            Kai's Divo
          </span>
        </Link>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.to + link.label}
              to={link.to}
              className={`nav-link font-bold text-foreground hover:opacity-60 transition-all duration-300 ${
                location.pathname === link.to ? "opacity-100" : "opacity-80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <button className="text-foreground hover:opacity-60 transition-all">
            <Search size={20} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground p-1"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[100] bg-background w-full h-screen flex flex-col items-center justify-center gap-8 px-6 overflow-hidden animate-in fade-in duration-300">
          {navLinks.map((link, index) => (
            <Link
              key={link.to + link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`font-display text-4xl tracking-tight transition-all duration-500 ${
                location.pathname === link.to
                  ? "text-foreground opacity-100"
                  : "text-foreground/40 hover:text-foreground"
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
