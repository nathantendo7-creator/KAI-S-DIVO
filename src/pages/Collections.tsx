import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Dynamically import all images/videos from the assets directory
const assetModules = import.meta.glob("@/assets/*.{jpg,jpeg,png,mp4}", { eager: true });
const assets = Object.entries(assetModules).map(([path, module]: [string, any]) => ({
  src: module.default,
  title: path.split("/").pop()?.replace(/\.[^/.]+$/, "") || "Look",
}));

const looks = [...assets].sort((a, b) =>
  a.src.endsWith(".mp4") === b.src.endsWith(".mp4") ? 0 : a.src.endsWith(".mp4") ? -1 : 1
);
const videos = looks.filter((item) => item.src.endsWith(".mp4"));
const images = looks.filter((item) => !item.src.endsWith(".mp4"));

const Collections = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Archive
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95]">
            Collections
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-6 max-w-lg leading-relaxed">
            A curated selection of bespoke pieces from Kai's Divo Collection —
            each garment a statement of precision and bold vision.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl space-y-8">
          {videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((item, index) => (
                <div
                  key={item.src}
                  className={`group relative overflow-hidden rounded-sm cursor-pointer aspect-[16/10] ${
                    videos.length % 2 === 1 && index === videos.length - 1 ? "md:col-span-2" : ""
                  }`}
                >
                  <video
                    src={item.src}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          )}

          <div className="columns-1 md:columns-2 xl:columns-3 gap-4 [column-fill:_balance]">
            {images.map((item) => (
              <div
                key={item.src}
                className="group relative overflow-hidden rounded-sm cursor-pointer mb-4 break-inside-avoid"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12 border-t border-border/20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-4">
            Interested in a bespoke piece?
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Schedule a private consultation to discuss your vision.
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

export default Collections;
