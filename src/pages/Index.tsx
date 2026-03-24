import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import look1 from "@/assets/look-1.jpg";
import look2 from "@/assets/look-2.jpg";
import look3 from "@/assets/look-3.jpg";
import look5 from "@/assets/look-5.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <div className="absolute inset-0">
          <img
            src={look5}
            alt="KAI'S DIVO COLLECTION editorial"
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-12 pb-20 lg:pb-28 max-w-7xl mx-auto">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-foreground/60 mb-4">
            Redefining Elegance • Kampala
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-foreground leading-[0.95] tracking-tight">
            Kai's Divo
            <br />
            <span className="italic font-normal text-foreground/70">Collection</span>
          </h1>
          <div className="mt-8 flex gap-4">
            <Link
              to="/contact"
              className="glass glass-hover px-8 py-3 font-body text-xs tracking-[0.2em] uppercase text-foreground transition-all duration-300 rounded-sm"
            >
              Book a Consultation
            </Link>
            <Link
              to="/collections"
              className="px-8 py-3 font-body text-xs tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors rounded-sm border border-foreground/10"
            >
              View Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl italic text-foreground/90 leading-relaxed">
            "Where precision tailoring meets bold vision — crafting garments that command attention."
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-8 max-w-xl mx-auto leading-relaxed">
            Founded by Abbas Kaijuka in Kampala, Kai's Divo Collection is
            East Africa's premier bespoke fashion house, dressing icons and
            redefining contemporary African elegance.
          </p>
        </div>
      </section>

      {/* Featured Looks */}
      <section className="px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-10">
            Featured Looks
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { src: look1, title: "Evening Formal" },
              { src: look2, title: "Editorial" },
              { src: look3, title: "Bespoke Tailoring" },
            ].map((item) => (
              <Link
                to="/collections"
                key={item.title}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-display text-lg text-foreground">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 border-t border-border/20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            Ready to elevate your style?
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-10">
            Book a private consultation — in person at our Kampala studio or virtually.
          </p>
          <Link
            to="/contact"
            className="inline-block glass glass-hover px-10 py-4 font-body text-xs tracking-[0.2em] uppercase text-foreground transition-all duration-300 rounded-sm"
          >
            Book a Meeting
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
