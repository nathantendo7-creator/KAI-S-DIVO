import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const assetModules = import.meta.glob("@/assets/*.{jpg,jpeg,png,mp4}", { eager: true });
const allMedia = Object.entries(assetModules).map(([path, module]: [string, any]) => ({
  src: module.default,
  name: path.split("/").pop()?.toLowerCase() || "",
}));

const ladiesHints = [
  "look-4",
  "look-5",
  "look-6",
  "saveclip.app_621755053",
  "saveclip.app_629834732",
  "saveclip.app_632025782",
  "saveclip.app_632106583",
  "saveclip.app_654729403",
];

const menMedia = allMedia.filter((item) => !ladiesHints.some((hint) => item.name.includes(hint)));
const leadVideo = menMedia.find((item) => item.src.endsWith(".mp4"));
const galleryMedia = menMedia.filter((item) => item.src !== leadVideo?.src);

const Mens = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Edit Line</p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95]">Men&apos;s</h1>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl space-y-6">
          {leadVideo && (
            <div className="relative overflow-hidden rounded-sm aspect-[16/8]">
              <video
                src={leadVideo.src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
          )}

          <div className="columns-1 md:columns-2 xl:columns-3 gap-4 [column-fill:_balance]">
            {galleryMedia.map((item) => (
              <div key={item.src} className="mb-4 break-inside-avoid overflow-hidden rounded-sm group">
                {item.src.endsWith(".mp4") ? (
                  <video
                    src={item.src}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={item.src}
                    alt="Kai's Divo menswear look"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Mens;
