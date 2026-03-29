import aboutFounder from "@/assets/about_founder.jpg";
import Marquee from "@/components/Marquee";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { ref, get } from "firebase/database";

const About = () => {
  const [content, setContent] = useState({
    narrativeTitle: "Beyond the Silhouette",
    headerQuote: "We don't create fashion. We create armor for the modern visionary. Each piece is a testament to the power of precision and the beauty of Kampala's creative spirit.",
    founderBio: "Abbas Kaijuka is the visionary founder and lead designer behind Kai’s Divo, one of East Africa’s most celebrated fashion houses. Based in Kampala, Uganda, Kai’s Divo is renowned for its flawless fusion of Ugandan heritage and contemporary global style, offering custom designs in haute couture, ready-to-wear, and streetwear for men and women. Under Abbas’s creative direction, Kai’s Divo has dressed Uganda’s biggest celebrities—including Eddy Kenzo (whose Grammy 2023 outfit he designed), Spice Diana, Sheebah Karungi, and Chameleone—while earning seven major international awards, including Fashion Designer of the Year at the Odartey Style Fashion Awards (Ghana, 2022) and Best Fashion Brand in Africa (2021). The brand’s signature aesthetic blends clean tailoring, bold color, and minimal prints with traditional Ugandan textiles like kikoy, creating timeless yet modern looks that have graced runways from Kampala to Lagos and Dar es Salaam. In 2024, Kai’s Divo unveiled “Corbata,” a monochrome tribute to the tuxedo that reaffirmed the brand’s mastery of elegant, structure-driven design. Kai’s Divo is more than a fashion label—it’s a movement celebrating Ugandan identity, craftsmanship, and confidence on the world stage.",
    philosophy1Title: "Smart Contemporary",
    philosophy1Text: "Our approach blends traditional tailoring with experimental forms. We focus on how a garment moves with the body, ensuring versatility across all occasions.",
    philosophy2Title: "Compact Collections",
    philosophy2Text: "By releasing focused 'Drops' rather than massive seasonal collections, we maintain a commitment to quality and exclusivity. Every piece matters.",
    philosophy3Title: "Kampala Craft",
    philosophy3Text: "Deeply rooted in Uganda's vibrant capital, our studio is a hub of local craftsmanship, pushing the boundaries of what East African luxury can be.",
    finalQuote: "The goal is not to be seen, but to be remembered.",
  });

  useEffect(() => {
    if (isFirebaseConfigured()) {
      const aboutRef = ref(db, 'content/about');
      get(aboutRef).then((snapshot) => {
        if (snapshot.exists()) {
          setContent(prev => ({ ...prev, ...snapshot.val() }));
        }
      });
    }
  }, []);

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
              {content.narrativeTitle.split(' ').slice(0, -1).join(' ')} <br />
              <span className="italic font-normal">{content.narrativeTitle.split(' ').pop()}</span>
            </h1>
          </div>
          <div className="pb-2 animate-in fade-in duration-1000 delay-500">
            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-md italic">
              "{content.headerQuote}"
            </p>
          </div>
        </div>
      </section>

      {/* Founder Bio Section - Side by Side Layout */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-foreground/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Image */}
          <div className="relative overflow-hidden shadow-2xl">
            <img 
              src={aboutFounder} 
              alt="Abbas Kaijuka - Creative Director" 
              className="w-full h-auto transition-all duration-1000 hover:scale-105"
            />
          </div>

          {/* Right Side: Text */}
          <div className="space-y-8">
            <div>
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-2">Founder & Creative Director</p>
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter leading-tight">
                Abbas Kaijuka <br />
                <span className="italic">Founder of Kai’s Divo</span>
              </h2>
            </div>
            
            <div className="font-body text-sm md:text-base text-muted-foreground space-y-6 leading-relaxed">
              {content.founderBio.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="py-32 bg-foreground text-background">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h3 className="font-display text-xl uppercase tracking-widest">{content.philosophy1Title}</h3>
              <p className="font-body text-sm text-background/60 leading-relaxed">
                {content.philosophy1Text}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-xl uppercase tracking-widest">{content.philosophy2Title}</h3>
              <p className="font-body text-sm text-background/60 leading-relaxed">
                {content.philosophy2Text}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-xl uppercase tracking-widest">{content.philosophy3Title}</h3>
              <p className="font-body text-sm text-background/60 leading-relaxed">
                {content.philosophy3Text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-40 px-6 lg:px-12 text-center max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter leading-tight mb-12">
          {content.finalQuote.split(' ').slice(0, -1).join(' ')} <br />
          <span className="italic">{content.finalQuote.split(' ').pop()}</span>
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
