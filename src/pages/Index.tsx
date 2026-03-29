import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Marquee from "@/components/Marquee";
import Newsletter from "@/components/Newsletter";
import aboutFounder from "@/assets/about_founder.jpg";

const Index = () => {
  const [activeDrop, setActiveDrop] = useState("06");

  // Dynamically import assets
  const assetModules = import.meta.glob("@/assets/*.{jpg,jpeg,png,mp4}", { eager: true });
  const allAssets = Object.entries(assetModules)
    .filter(([path]) => {
      const isLogo = path.includes("logo.jpg");
      const isAbout = path.includes("about_founder.jpg");
      const isSaveClipDuplicate = path.includes("SaveClip.App_") && 
        (path.includes("473619780") || path.includes("621744881") || 
         path.includes("621752945") || path.includes("621755053") || 
         path.includes("626265330") || path.includes("632528076"));
      return !isLogo && !isAbout && !isSaveClipDuplicate;
    })
    .map(([path, module]: [string, any]) => ({
      src: module.default,
      name: path.split("/").pop()?.replace(/\.[^/.]+$/, "") || "Piece",
    }));

  const cutoutModules = import.meta.glob("@/assets/cutouts/*.{jpg,jpeg,png}", { eager: true });
  const cutouts = Object.entries(cutoutModules).reduce((acc, [path, module]: [string, any]) => {
    const name = path.split("/").pop()?.replace(/\.[^/.]+$/, "").toLowerCase() || "";
    acc[name] = module.default;
    return acc;
  }, {} as Record<string, string>);

  const heroSlides = allAssets.slice(0, 5);
  
  const getCutout = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("look-1") || n.includes("original") || n.includes("473619780")) return cutouts["k_1"] || cutouts["man1"];
    if (n.includes("look-2") || n.includes("621744881")) return cutouts["man2"];
    if (n.includes("look-3") || n.includes("621752945")) return cutouts["man3"];
    if (n.includes("look-4") || n.includes("621755053")) return cutouts["man4"];
    if (n.includes("look-5") || n.includes("626265330")) return cutouts["woman"];
    return null;
  };

  const dropNav = ["06", "05", "04", "03", "02", "01"];

  return (
    <div className="overflow-x-hidden bg-background">
      {/* Cinematic Hero - Reverted to Fullscreen Slideshow */}
      <section className="relative h-screen w-full overflow-hidden">
        <Carousel
          className="w-full h-full"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 6000 })]}
        >
          <CarouselContent className="h-screen -ml-0">
            {heroSlides.map((asset, index) => {
              const cutoutSrc = getCutout(asset.name);
              const isLook1 = asset.name.toLowerCase().includes("look-1") || asset.name.toLowerCase().includes("original");
              const bgSrc = (isLook1 && cutouts["backround"]) ? cutouts["backround"] : asset.src;
              
              return (
                <CarouselItem key={index} className="h-full w-full pl-0">
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    {/* Background Layer */}
                    {asset.src.endsWith(".mp4") ? (
                      <video
                        src={asset.src}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ zIndex: 1 }}
                      />
                    ) : (
                      <img
                        src={bgSrc}
                        alt="Hero"
                        className="w-full h-full object-cover"
                        style={{ zIndex: 1, imageRendering: "-webkit-optimize-contrast" }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/5" style={{ zIndex: 2 }} />

                    {/* Text Layer - Positioned Behind the Person */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4" style={{ zIndex: 3 }}>
                      <h1 className="font-display text-[20vw] md:text-[18vw] leading-none tracking-[-0.08em] uppercase text-white/50 select-none transition-all duration-700">
                        Kai's Divo
                      </h1>
                    </div>

                    {/* Person Cutout Layer - On Top of Text */}
                    {cutoutSrc && (
                      <img
                        src={cutoutSrc}
                        alt="Hero Cutout"
                        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none"
                        style={{ zIndex: 4, imageRendering: "-webkit-optimize-contrast" }}
                      />
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Volume 06 Section */}
      <section className="py-32 px-6 lg:px-12 max-w-[1800px] mx-auto border-b border-foreground/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex justify-center">
             <div className="relative aspect-[3/4] w-full max-w-xl overflow-hidden shadow-2xl">
                <img src={allAssets[5]?.src} className="w-full h-full object-cover" alt="Volume 06" />
             </div>
          </div>
          <div className="lg:col-span-5 space-y-12">
            <h2 className="text-[20vw] lg:text-[15vw] leading-none font-display tracking-tighter opacity-10">06</h2>
            <div className="space-y-6 max-w-md">
              <p className="font-body text-sm md:text-base text-foreground leading-relaxed">
                Drop 6: Minimalist retro elegance, where timeless closet pieces are reborn with a modern edge.
              </p>
              <Link
                to="/collections"
                className="inline-block border-b border-foreground pb-2 font-body text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
              >
                Galerie
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Pieces */}
      <section className="py-32 px-6 lg:px-12">
        <div className="mx-auto max-w-[1800px]">
          <h2 className="font-display text-3xl uppercase tracking-tighter mb-16">Curated Pieces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-[16/9] overflow-hidden bg-muted relative group">
              <img src={allAssets[6]?.src} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Curated" />
              <div className="absolute inset-0 bg-black/5" />
            </div>
            <div className="aspect-[16/9] overflow-hidden bg-muted relative group">
              <img src={allAssets[7]?.src} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Curated" />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Animated Marquee */}
      <div className="border-y border-foreground/10">
        <Marquee text=". redifining contemporary elegance . precision tailoring . handcrafted in kampala . bespoke design . styling direction ." />
      </div>

      {/* Modern Twists - Full width Image Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={allAssets[10]?.src} className="w-full h-full object-cover" alt="Background" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h2 className="font-display text-5xl md:text-8xl text-white uppercase tracking-tighter leading-none max-w-4xl mx-auto">
            modern twists <br /> on classical elegance
          </h2>
        </div>
      </section>

      {/* Drop Selection Navigation */}
      <section className="py-32 px-6 lg:px-12 bg-background border-t border-foreground/5">
        <div className="mx-auto max-w-[1800px] grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
           <div className="lg:col-span-8">
             <div className="aspect-video overflow-hidden shadow-2xl">
                <img src={allAssets[12]?.src} className="w-full h-full object-cover" alt="Drop View" />
             </div>
           </div>
           <div className="lg:col-span-4 flex flex-col gap-6 items-end">
              {dropNav.map((id) => (
                <button
                  key={id}
                  onClick={() => setActiveDrop(id)}
                  className={`font-display text-4xl md:text-6xl uppercase tracking-tighter transition-all duration-300 ${
                    activeDrop === id ? "text-foreground italic underline underline-offset-8" : "text-foreground/20 hover:text-foreground"
                  }`}
                >
                  Drop {id}
                </button>
              ))}
              <div className="mt-8">
                <Link 
                  to="/collections" 
                  className="inline-block border border-foreground px-12 py-5 font-body text-[10px] tracking-[0.4em] uppercase hover:bg-foreground hover:text-background transition-all duration-500"
                >
                  View Drop {activeDrop}
                </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Inner List Signup */}
      <Newsletter />

      {/* Final Branding CTA */}
      <section className="py-40 bg-foreground text-background text-center px-6 overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-display text-4xl md:text-7xl uppercase tracking-tighter mb-12 max-w-4xl mx-auto leading-tight italic">
            "Redefining contemporary elegance through precision tailoring."
          </h2>
          <Link 
            to="/contact" 
            className="inline-block border border-background/30 px-12 py-5 font-body text-[10px] tracking-[0.4em] uppercase hover:bg-background hover:text-foreground transition-all duration-500"
          >
            Start Your Journey
          </Link>
        </div>
        <div className="mt-40">
           <h1 className="huge-text opacity-5 text-background pointer-events-none select-none whitespace-nowrap">
            Kai's Divo
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Index;
