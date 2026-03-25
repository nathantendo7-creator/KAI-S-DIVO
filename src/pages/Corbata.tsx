import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Corbata = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Maison Notes
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95]">
            Corbata
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-6 max-w-2xl leading-relaxed">
            A house code inspired by black-tie tailoring: monochrome confidence, sculpted cuts,
            and artistic tie details reimagined into contemporary silhouettes.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Monochrome Identity",
              text: "A disciplined black-and-ivory direction that lets tailoring and form speak first.",
            },
            {
              title: "Tuxedo Heritage",
              text: "Structured jackets, elongated lines, and ceremonial detailing rooted in classic suiting.",
            },
            {
              title: "Artisanal Finish",
              text: "Distinctive handcrafted motifs and tie-inspired accents across both menswear and womenswear.",
            },
          ].map((item) => (
            <article key={item.title} className="glass rounded-sm p-8 lg:p-10 space-y-4">
              <h2 className="font-display text-2xl text-foreground">{item.title}</h2>
              <p className="font-body text-sm text-foreground/70 leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Corbata;
