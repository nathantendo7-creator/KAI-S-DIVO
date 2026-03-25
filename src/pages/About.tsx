import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aboutFounder from "@/assets/about_founder.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            The Visionary
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95]">
            Abbas
            <br />
            <span className="italic font-normal text-foreground/70">Kaijuka</span>
          </h1>
        </div>
      </section>

      {/* Bio Section */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Portrait */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <img
              src={aboutFounder}
              alt="Abbas Kaijuka — Founder of Kai's Divo Collection"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </div>

          {/* Bio Text */}
          <div className="lg:pt-12 space-y-8">
            <div className="space-y-6">
              <p className="font-body text-sm text-foreground/80 leading-[1.8]">
                Abbas Kaijuka is the founder and creative director of Kai's Divo Collection,
                one of East Africa's most celebrated bespoke fashion houses. Based in Kampala,
                Uganda, his journey into fashion began in 2014 following an inspiring trip to
                China that ignited his passion for design and craftsmanship.
              </p>
              <p className="font-body text-sm text-foreground/80 leading-[1.8]">
                Before establishing his fashion empire, Abbas worked with GIZ (Deutsche
                Gesellschaft für Internationale Zusammenarbeit), where he gained valuable
                experience in international collaboration. However, his calling lay in the
                world of fashion — and he answered it with conviction.
              </p>
              <p className="font-body text-sm text-foreground/80 leading-[1.8]">
                Since founding Kai's Divo Collection, Abbas has become Kampala's most
                sought-after stylist and designer, dressing some of East Africa's biggest
                icons. His client roster includes music legend Jose Chameleon, singer-songwriter
                Maurice Kirya, Sheebah Karungi, Winnie Nwagi, media personality Bettinah Tianah,
                and model Malaika Nnyanzi, among many others.
              </p>
              <p className="font-body text-sm text-foreground/80 leading-[1.8]">
                His work has been recognised with numerous accolades including East African
                Designer of the Year, Fashion Designer of the Year at the prestigious Abryanz
                Style and Fashion Awards 2016, and Best Menswear Designer at the 2020 East
                Fashion Awards. Known for his signature tuxedo-inspired silhouettes and the
                acclaimed "Corbata" collection, Abbas continues to push the boundaries of
                contemporary African fashion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Precision",
                text: "Every stitch is intentional. Every cut, considered. We believe in the transformative power of garments crafted with absolute precision.",
              },
              {
                title: "Identity",
                text: "Fashion is self-expression. We create pieces that amplify the wearer's presence, blending African heritage with global contemporary aesthetics.",
              },
              {
                title: "Excellence",
                text: "From fabric selection to final fitting, we hold ourselves to the highest standard — because our clients deserve nothing less.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass rounded-sm p-8 lg:p-10 space-y-4"
              >
                <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                <p className="font-body text-sm text-foreground/60 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
