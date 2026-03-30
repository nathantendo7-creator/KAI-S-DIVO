import { useSearchParams, Link } from "react-router-dom";

const Collections = () => {
  const [searchParams] = useSearchParams();
  const dropFilter = searchParams.get("drop");

  // Dynamically import assets
  const assetModules = import.meta.glob("@/assets/*.{jpg,jpeg,png,mp4}", { eager: true });
  const allAssets = Object.entries(assetModules)
    .filter(([path]) => !path.includes("logo.jpg") && !path.includes("about_founder.jpg"))
    .map(([path, module]: [string, any]) => ({
      src: module.default,
      name: path.split("/").pop()?.replace(/\.[^/.]+$/, "") || "Piece",
    }));

  const drops = {
    "06": {
      name: "Volume 06: Ethereal Kampala",
      description: "A celebration of light and movement. Our latest work explores the intersection of traditional Ugandan textures and contemporary minimalist silhouettes.",
      pieces: allAssets.slice(0, 8).map((a, i) => ({ ...a, id: `06-${i}` }))
    },
    "05": {
      name: "Volume 05: Midnight tailored",
      description: "Precision at its finest. Volume 05 focuses on the architecture of evening wear, where every stitch serves a purpose.",
      pieces: allAssets.slice(8, 16).map((a, i) => ({ ...a, id: `05-${i}` }))
    },
    "04": {
      name: "Volume 04: Urban Nomad",
      description: "Versatile, breathable, and unmistakably Kai's Divo. Designed for the modern visionary who values both style and comfort.",
      pieces: allAssets.slice(16, 24).map((a, i) => ({ ...a, id: `04-${i}` }))
    },
    "03": {
      name: "Volume 03: Heritage Reborn",
      description: "Revisiting our roots. This collection reimagines classic bespoke tailoring through a 21st-century lens.",
      pieces: allAssets.slice(24, 32).map((a, i) => ({ ...a, id: `03-${i}` }))
    }
  };

  const activeDropId = dropFilter || "06";
  const activeDrop = drops[activeDropId as keyof typeof drops] || drops["06"];

  return (
    <div className="pt-24 pb-32 px-6 lg:px-12 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Drop Header */}
        <header className="max-w-3xl mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
            Editorial • {activeDropId}
          </p>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-8 italic">
            {activeDrop.name}
          </h1>
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
            {activeDrop.description}
          </p>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16 lg:gap-x-8">
          {activeDrop.pieces.map((piece) => (
            <div key={piece.id} className="group flex flex-col gap-4 animate-in fade-in duration-700">
              <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                {piece.src.endsWith('.mp4') ? (
                  <video 
                    src={piece.src} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    autoPlay muted loop playsInline
                  />
                ) : (
                  <img
                    src={piece.src}
                    alt={piece.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Link to={`/contact?asset=${encodeURIComponent(piece.src)}`} className="bg-foreground text-background px-6 py-2 font-body text-[10px] uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                     Inquire
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Drops Navigation */}
        <div className="mt-40 border-t border-border/10 pt-24">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-12 text-center">Explore Volumes</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
            {Object.keys(drops).map((id) => (
              <Link
                key={id}
                to={`/collections?drop=${id}`}
                className={`font-display text-4xl md:text-6xl uppercase tracking-tighter transition-all duration-300 ${
                  activeDropId === id ? "text-foreground italic underline underline-offset-8" : "text-foreground/20 hover:text-foreground"
                }`}
              >
                {id}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
