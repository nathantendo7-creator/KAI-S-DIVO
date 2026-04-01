import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { ref, get } from "firebase/database";

const Mens = () => {
  const [content, setContent] = useState({
    title: "Men's Collection",
    description: "Epitomizing structural precision and modern masculinity — our bespoke tailoring designed for the discerning gentleman.",
    ctaTitle: "Command Attention",
  });

  useEffect(() => {
    if (isFirebaseConfigured()) {
      get(ref(db, 'content/mens')).then((snapshot) => {
        if (snapshot.exists()) {
          setContent(prev => ({ ...prev, ...snapshot.val() }));
        }
      });
    }
  }, []);

  const assetModules = import.meta.glob("@/assets/*.{jpg,jpeg,png,mp4}", { eager: true });
  
  const mensFilenames = [
    "man_vid_1.mp4",
    "man_vid_2.mp4",
    "man_vid_3.mp4",
    "man1.jpg",
    "man2.jpg",
    "man3.jpg",
    "man4.jpg",
    "man5.jpg",
    "man6.jpg",
    "man7.jpg",
    "man8.jpg",
    "man9.jpg",
    "man10.jpg",
    "man11.jpg",
    "man12.jpg",
    "man13.jpg"
  ];

  const mensAssets = Object.entries(assetModules)
    .filter(([path]) => mensFilenames.some(filename => path.endsWith(filename)))
    .map(([path, module]: [string, any]) => ({
      id: `men-${path.split("/").pop()}`,
      src: module.default,
      name: path.split("/").pop()?.replace(/\.[^/.]+$/, "").replace("SaveClip.App_", "").slice(0, 15) || "Look"
    }));

  return (
    <div className="bg-background">
      <section className="pt-24 pb-16 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
            Menswear
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95] uppercase tracking-tighter">
            {content.title.split(' ').slice(0, -1).join(' ')} <span className="italic">{content.title.split(' ').pop()}</span>
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-6 max-w-lg leading-relaxed">
            {content.description}
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 lg:gap-x-8">
            {mensAssets.map((item) => (
              <div key={item.id} className="group flex flex-col gap-4">
                <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                  {item.src.endsWith(".mp4") ? (
                    <video
                      src={item.src}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      autoPlay muted loop playsInline
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link to="/contact" state={{ asset: item.src }} className="bg-foreground text-background px-6 py-2 font-body text-[10px] uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      Inquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 lg:px-12 border-t border-border/10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-8 uppercase tracking-tighter">
            {content.ctaTitle.split(' ').slice(0, -1).join(' ')} <span className="italic">{content.ctaTitle.split(' ').pop()}</span>
          </h2>
          <Link
            to="/contact"
            className="inline-block border border-foreground px-10 py-4 font-body text-[10px] tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-all duration-500"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Mens;
