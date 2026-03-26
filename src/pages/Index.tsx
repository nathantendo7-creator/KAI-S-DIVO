import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Index = () => {
  // Dynamically import images/videos for the hero slideshow
  const assetModules = import.meta.glob("@/assets/*.{jpg,jpeg,png,mp4}", { eager: true });
  const assets = Object.entries(assetModules)
    .filter(([path]) => !path.includes("logo.jpg") && !path.includes("about_founder.jpg"))
    .map(([path, module]: [string, any]) => ({
      src: module.default,
      title: path.split("/").pop()?.replace(/\.[^/.]+$/, "") || "Look",
    }));
  const slides = assets.map((asset) => asset.src);
  const featuredLooks = assets
    .filter((asset) => !asset.src.endsWith(".mp4"))
    .slice(0, 3)
    .map((asset, index) => ({
      src: asset.src,
      title: ["Evening Formal", "Editorial", "Bespoke Tailoring"][index] || asset.title,
    }));
  const services = [
    {
      title: "Bespoke Design",
      text: "Custom garments crafted from concept to final fitting with precision tailoring and premium fabrics.",
    },
    {
      title: "Styling Direction",
      text: "Personal styling for events, editorials, and public appearances with a distinctive Kai's Divo edge.",
    },
    {
      title: "Wardrobe Consultation",
      text: "Refine your wardrobe strategy with guidance on silhouette, color story, and occasion-driven looks.",
    },
  ];
  const journey = [
    {
      step: "01",
      title: "Discovery Call",
      text: "We discuss your occasion, preferences, and desired statement.",
    },
    {
      step: "02",
      title: "Creative Direction",
      text: "Silhouettes, fabrics, and detailing are curated to match your identity.",
    },
    {
      step: "03",
      title: "Fittings",
      text: "Precise measurements and fitting sessions ensure a flawless finish.",
    },
    {
      step: "04",
      title: "Final Delivery",
      text: "Your bespoke look is completed and prepared for your defining moment.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <Carousel
          className="absolute inset-0 w-full h-full"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000 })]}
        >
          <CarouselContent className="h-full">
            {slides.map((src, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative w-full h-full">
                  {src.endsWith(".mp4") ? (
                    <video
                      src={src}
                      className="w-full h-full object-cover object-top"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={src}
                      alt="Hero slide"
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

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
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[Autoplay({ delay: 2600, stopOnInteraction: false, stopOnMouseEnter: true })]}
          >
            <CarouselContent className="-ml-4">
              {featuredLooks.map((item) => (
                <CarouselItem key={item.title} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Link to="/collections" className="group relative block aspect-[3/4] overflow-hidden rounded-sm">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Signature Services */}
      <section className="px-6 lg:px-12 pb-24 lg:pb-32 border-t border-border/20 pt-24 lg:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-12 lg:mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Signature Services
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              Tailored experiences designed around your identity
            </h2>
          </div>

          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[Autoplay({ delay: 2200, stopOnInteraction: false, stopOnMouseEnter: true })]}
          >
            <CarouselContent className="-ml-4">
              {services.map((item, index) => (
                <CarouselItem key={item.title} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <article
                    className="service-card glass rounded-sm p-8 lg:p-10 space-y-4 h-full"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                    <p className="font-body text-sm text-foreground/65 leading-relaxed">{item.text}</p>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Consultation Process */}
      <section className="px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-14">
            <div className="max-w-2xl">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Consultation Journey
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
                A refined process from vision to final reveal
              </h2>
            </div>
            <Link
              to="/contact"
              className="glass glass-hover px-8 py-3 font-body text-xs tracking-[0.2em] uppercase text-foreground transition-all duration-300 rounded-sm w-fit"
            >
              Start Your Booking
            </Link>
          </div>

          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[Autoplay({ delay: 2100, stopOnInteraction: false, stopOnMouseEnter: true })]}
          >
            <CarouselContent className="-ml-4">
              {journey.map((item) => (
                <CarouselItem key={item.step} className="pl-4 basis-full md:basis-1/2 lg:basis-1/4">
                  <article className="border border-border/40 rounded-sm p-7 lg:p-8 space-y-4 h-full bg-card/30">
                    <p className="font-body text-xs tracking-[0.25em] uppercase text-foreground/40">{item.step}</p>
                    <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                    <p className="font-body text-sm text-foreground/60 leading-relaxed">{item.text}</p>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Editorial Highlight */}
      <section className="px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {featuredLooks.slice(0, 2).map((item) => (
              <div key={item.title} className="relative h-[420px] lg:h-[520px] overflow-hidden rounded-sm group">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
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
