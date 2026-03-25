import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Mens = () => {
  // Specifically target assets for the Men's collection
  const assetModules = import.meta.glob("@/assets/*.{jpg,jpeg,png,mp4}", { eager: true });
  
  // List of filenames identified from the MEN directory
  const mensFilenames = [
    "happybd.mp4",
    "newvideo.mp4",
    "SaveClip.App_621744881_18054522896691876_474248715841451446_n.jpg",
    "SaveClip.App_621752945_18054522866691876_6356504419454153873_n.jpg",
    "SaveClip.App_621755053_18054522905691876_8950707648329954444_n.jpg",
    "SaveClip.App_626297576_18094336064486658_5658840742965331039_n.jpg",
    "SaveClip.App_629834732_18094336049486658_6729701261008518384_n.jpg",
    "SaveClip.App_632025782_18094336067486658_5206606016670739364_n.jpg",
    "SaveClip.App_632106583_18094336040486658_6401670103811217511_n.jpg",
    "SaveClip.App_632393458_18071820197545829_1256232627390187817_n.jpg",
    "SaveClip.App_632403033_18071820188545829_7923287181965084038_n.jpg",
    "SaveClip.App_632525155_18071820185545829_7852810239566632823_n.jpg",
    "SaveClip.App_632528224_18071820206545829_5705228593394416900_n.jpg",
    "SaveClip.App_649226553_18395086528149585_1848832633573745825_n.jpg",
    "SaveClip.App_AQNFEVKEDIwP9ZK0bQHAab6HJgDF8kmw0HEtF0Iy5XztvZyBOV4unLACV6Csn7m8Urze5-ob91OG_FeJY0ayXmqt.mp4"
  ];

  const mensAssets = Object.entries(assetModules)
    .filter(([path]) => mensFilenames.some(filename => path.endsWith(filename)))
    .map(([path, module]: [string, any]) => ({
      src: module.default,
      title: path.split("/").pop()?.replace(/\.[^/.]+$/, "") || "Look",
    }));

  const looks = [...mensAssets].sort((a, b) =>
    a.src.endsWith(".mp4") === b.src.endsWith(".mp4") ? 0 : a.src.endsWith(".mp4") ? -1 : 1
  );
  const videos = looks.filter((item) => item.src.endsWith(".mp4"));
  const images = looks.filter((item) => !item.src.endsWith(".mp4"));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Menswear
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95]">
            Men's Collection
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-6 max-w-lg leading-relaxed">
            Epitomizing structural precision and modern masculinity — our bespoke tailoring 
            designed for the discerning gentleman.
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
            Command Attention
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Experience the pinnacle of bespoke tailoring.
          </p>
          <Link
            to="/contact"
            className="inline-block glass glass-hover px-10 py-4 font-body text-xs tracking-[0.2em] uppercase text-foreground transition-all duration-300 rounded-sm"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Mens;
