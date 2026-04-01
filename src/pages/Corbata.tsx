import { useState, useEffect } from "react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { ref, get } from "firebase/database";

const Corbata = () => {
  const [content, setContent] = useState({
    title: "Corbata",
    description: "A house code inspired by black-tie tailoring: monochrome confidence, sculpted cuts, and artistic tie details reimagined into contemporary silhouettes.",
    feature1Title: "Monochrome Identity",
    feature1Text: "A disciplined black-and-ivory direction that lets tailoring and form speak first.",
    feature2Title: "Tuxedo Heritage",
    feature2Text: "Structured jackets, elongated lines, and ceremonial detailing rooted in classic suiting.",
    feature3Title: "Artisanal Finish",
    feature3Text: "Distinctive handcrafted motifs and tie-inspired accents across both menswear and womenswear.",
  });

  useEffect(() => {
    if (isFirebaseConfigured()) {
      get(ref(db, 'content/corbata')).then((snapshot) => {
        if (snapshot.exists()) {
          setContent(prev => ({ ...prev, ...snapshot.val() }));
        }
      });
    }
  }, []);

  return (
    <div className="bg-background">
      <section className="pt-24 pb-16 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
            Maison Notes
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95] uppercase tracking-tighter">
            {content.title}
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-6 max-w-2xl leading-relaxed">
            {content.description}
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: content.feature1Title,
              text: content.feature1Text,
            },
            {
              title: content.feature2Title,
              text: content.feature2Text,
            },
            {
              title: content.feature3Title,
              text: content.feature3Text,
            },
          ].map((item) => (
            <article key={item.title} className="border border-border/10 p-8 lg:p-10 space-y-4 hover:bg-muted/5 transition-colors">
              <h2 className="font-display text-2xl text-foreground uppercase tracking-tighter">{item.title}</h2>
              <p className="font-body text-sm text-foreground/70 leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Corbata;
