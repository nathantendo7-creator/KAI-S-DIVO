import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Ladies = () => {
  // Specifically target assets for the Ladies collection
  const assetModules = import.meta.glob("@/assets/*.{jpg,jpeg,png,mp4}", { eager: true });
  
  // List of filenames identified from the WOMEN directory
  const ladiesFilenames = [
    "newothervid.mp4",
    "SaveClip.App_626265330_18527514700070419_5502803308398987825_n.jpg",
    "SaveClip.App_626271846_18527514664070419_5990729625749216666_n.jpg",
    "SaveClip.App_626290213_18527514730070419_3043973741252410288_n.jpg",
    "SaveClip.App_631650190_18527514673070419_4597909685099044024_n.jpg",
    "SaveClip.App_632393458_18071820197545829_1256232627390187817_n.jpg",
    "SaveClip.App_632403033_18071820188545829_7923287181965084038_n.jpg",
    "SaveClip.App_632525155_18071820185545829_7852810239566632823_n.jpg",
    "SaveClip.App_632528076_18527514718070419_4172358987601502140_n.jpg",
    "SaveClip.App_632528224_18071820206545829_5705228593394416900_n.jpg",
    "SaveClip.App_632621898_18071820215545829_7968801961567392740_n.jpg",
    "SaveClip.App_634393855_18071820170545829_8103569091023606154_n.jpg",
    "SaveClip.App_634461512_18071820161545829_7581950335420397559_n.jpg",
    "SaveClip.App_649217763_18571252681048755_449352521470921571_n.jpg",
    "SaveClip.App_649218694_18571252684048755_8973671986566751940_n.jpg",
    "SaveClip.App_649218830_18571252666048755_5917640215729521831_n.jpg",
    "SaveClip.App_649235841_18571252735048755_6115920792808881533_n.jpg",
    "SaveClip.App_649253755_18395086624149585_1750772818910056820_n.jpg",
    "SaveClip.App_652732786_18519038368077803_8691248719469967807_n.jpg",
    "SaveClip.App_654027559_18574247266048755_816951224609172211_n.jpg",
    "SaveClip.App_654142745_18574247281048755_5867372153096567296_n.jpg",
    "SaveClip.App_654729403_18519038383077803_3342483267224002406_n.jpg",
    "SaveClip.App_655223787_18571492072002954_8242918445215597659_n.jpg",
    "SaveClip.App_655734326_18574247308048755_987844877551261319_n.jpg",
    "SaveClip.App_656158731_18571492054002954_4868719204258545593_n.jpg",
    "video22.mp4"
  ];

  const ladiesAssets = Object.entries(assetModules)
    .filter(([path]) => ladiesFilenames.some(filename => path.endsWith(filename)))
    .map(([path, module]: [string, any]) => ({
      src: module.default,
      title: path.split("/").pop()?.replace(/\.[^/.]+$/, "") || "Look",
    }));

  const looks = [...ladiesAssets].sort((a, b) =>
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
            Womenswear
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95]">
            Ladies Collection
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-6 max-w-lg leading-relaxed">
            Where ethereal grace meets avant-garde vision — our bespoke creations for 
            the modern woman who commands the room.
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
            Redefine Elegance
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Collaborate with us to create your defining couture statement.
          </p>
          <Link
            to="/contact"
            className="inline-block glass glass-hover px-10 py-4 font-body text-xs tracking-[0.2em] uppercase text-foreground transition-all duration-300 rounded-sm"
          >
            Book a Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ladies;
