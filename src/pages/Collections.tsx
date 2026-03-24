import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import look1 from "@/assets/look-1.jpg";
import look2 from "@/assets/look-2.jpg";
import look3 from "@/assets/look-3.jpg";
import look4 from "@/assets/look-4.jpg";
import look5 from "@/assets/look-5.jpg";
import look6 from "@/assets/look-6.jpg";

const looks = [
  { src: look1, title: "Evening Formal", span: "md:col-span-1 md:row-span-2" },
  { src: look2, title: "Editorial Look", span: "md:col-span-1" },
  { src: look3, title: "Bespoke Tailoring", span: "md:col-span-1" },
  { src: look5, title: "The Corbata", span: "md:col-span-2" },
  { src: look4, title: "Signature Red", span: "md:col-span-1" },
  { src: look6, title: "Contemporary Edge", span: "md:col-span-1" },
];

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
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[360px]">
          {looks.map((item) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-sm cursor-pointer ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-display text-lg text-foreground">{item.title}</p>
              </div>
            </div>
          ))}
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
