import { Link } from "react-router-dom";

const Mens = () => {
  const assetModules = import.meta.glob("@/assets/*.{jpg,jpeg,png,mp4}", { eager: true });
  
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
            Men's <span className="italic">Collection</span>
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-6 max-w-lg leading-relaxed">
            Epitomizing structural precision and modern masculinity — our bespoke tailoring 
            designed for the discerning gentleman.
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
                    <Link to="/contact" className="bg-foreground text-background px-6 py-2 font-body text-[10px] uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      Inquire
                    </Link>
                  </div>
                </div>
                <h3 className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 lg:px-12 border-t border-border/10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-8 uppercase tracking-tighter">
            Command <span className="italic">Attention</span>
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
