import aboutFounder from "@/assets/about_founder.jpg";
import Marquee from "@/components/Marquee";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-background">
      {/* Editorial Header */}
      <section className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div className="space-y-8">
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
              Our Narrative
            </p>
            <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tighter uppercase animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Beyond the <br />
              <span className="italic font-normal">Silhouette</span>
            </h1>
          </div>
          <div className="pb-2 animate-in fade-in duration-1000 delay-500">
            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-md italic">
              "We don't create fashion. We create armor for the modern visionary. Each piece is a testament to the power of precision and the beauty of Kampala's creative spirit."
            </p>
          </div>
        </div>
      </section>

      {/* Large Image Section */}
      <section className="px-6 lg:px-12 mb-32 max-w-5xl mx-auto">
        <div className="relative overflow-hidden">
          <img 
            src={aboutFounder} 
            alt="Abbas Kaijuka - Creative Director" 
            className="w-full h-auto transition-all duration-1000"
          />
        </div>
      </section>

      {/* Founder Bio Section */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-foreground/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl uppercase tracking-widest text-foreground/40">Founder & Creative Director</h2>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tighter">Abbas Kaijuka – Founder of Kai’s Divo</h3>
            <div className="font-body text-sm md:text-base text-muted-foreground space-y-6 leading-relaxed">
              <p>
                Abbas Kaijuka is the visionary founder and lead designer behind <strong>Kai’s Divo</strong>, one of East Africa’s most celebrated fashion houses. Based in Kampala, Uganda, Kai’s Divo is renowned for its flawless fusion of Ugandan heritage and contemporary global style, offering custom designs in haute couture, ready-to-wear, and streetwear for men and women.
              </p>
              <p>
                Under Abbas’s creative direction, Kai’s Divo has dressed Uganda’s biggest celebrities—including Eddy Kenzo (whose Grammy 2023 outfit he designed), Spice Diana, Sheebah Karungi, and Chameleone—while earning seven major international awards, including <em>Fashion Designer of the Year</em> at the Odartey Style Fashion Awards (Ghana, 2022) and <em>Best Fashion Brand in Africa</em> (2021).
              </p>
              <p>
                The brand’s signature aesthetic blends clean tailoring, bold color, and minimal prints with traditional Ugandan textiles like kikoy, creating timeless yet modern looks that have graced runways from Kampala to Lagos and Dar es Salaam. In 2024, Kai’s Divo unveiled “Corbata,” a monochrome tribute to the tuxedo that reaffirmed the brand’s mastery of elegant, structure-driven design.
              </p>
              <p>
                Kai’s Divo is more than a fashion label—it’s a movement celebrating Ugandan identity, craftsmanship, and confidence on the world stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="py-32 bg-foreground text-background">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h3 className="font-display text-xl uppercase tracking-widest">Smart Contemporary</h3>
              <p className="font-body text-sm text-background/60 leading-relaxed">
                Our approach blends traditional tailoring with experimental forms. We focus on how a garment moves with the body, ensuring versatility across all occasions.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-xl uppercase tracking-widest">Compact Collections</h3>
              <p className="font-body text-sm text-background/60 leading-relaxed">
                By releasing focused 'Drops' rather than massive seasonal collections, we maintain a commitment to quality and exclusivity. Every piece matters.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-xl uppercase tracking-widest">Kampala Craft</h3>
              <p className="font-body text-sm text-background/60 leading-relaxed">
                Deeply rooted in Uganda's vibrant capital, our studio is a hub of local craftsmanship, pushing the boundaries of what East African luxury can be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-40 px-6 lg:px-12 text-center max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter leading-tight mb-12">
          "The goal is not to be seen, <br />
          but to be <span className="italic">remembered</span>."
        </h2>
        <div className="h-[1px] w-24 bg-foreground/20 mx-auto" />
      </section>

      {/* Call to Action */}
      <section className="pb-32 px-6 lg:px-12 text-center">
        <Marquee text=". join the movement . define your silhouette . bespoke tailoring . kampala luxury . " />
        <div className="mt-20">
          <Link 
            to="/collections" 
            className="inline-block border border-foreground px-12 py-5 font-body text-[10px] tracking-[0.4em] uppercase hover:bg-foreground hover:text-background transition-all duration-500"
          >
            Explore the Drops
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
