import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { submitContactForm } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Instagram, Phone } from "lucide-react";

const meetingTypes = ["In-Person", "Video Call", "Phone Call"] as const;

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const asset = searchParams.get("asset");
  const [selected, setSelected] = useState<string>("In-Person");

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast({
        title: "Request received",
        description: "We'll be in touch shortly to confirm your meeting.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      type: selected,
      message: formData.get("message"),
    };
    mutation.mutate(data);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Get in Touch
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95]">
            Book a<br />
            <span className="italic font-normal text-foreground/70">Meeting</span>
          </h1>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Asset Preview (Optional) */}
            {asset && (
              <div className="lg:col-span-4 order-last lg:order-first">
                <div className="sticky top-32 space-y-6">
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Inquiry Asset</p>
                  <div className="aspect-[3/4] bg-muted overflow-hidden rounded-sm border border-foreground/5 shadow-2xl">
                    {decodeURIComponent(asset).endsWith(".mp4") ? (
                      <video
                        src={decodeURIComponent(asset)}
                        className="w-full h-full object-cover"
                        autoPlay muted loop playsInline
                      />
                    ) : (
                      <img
                        src={decodeURIComponent(asset)}
                        alt="Inquiry Piece"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <p className="font-body text-[10px] text-foreground/40 leading-relaxed uppercase tracking-wider">
                    You are inquiring about this specific piece from our collection.
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className={`${asset ? 'lg:col-span-8' : 'lg:col-span-7'} space-y-6`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-body text-xs tracking-[0.15em] uppercase text-foreground/60">
                    Name
                  </label>
                  <Input
                    required
                    name="name"
                    placeholder="Your full name"
                    className="bg-transparent border-border/40 focus:border-foreground/30 rounded-sm h-12 font-body text-sm placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs tracking-[0.15em] uppercase text-foreground/60">
                    Email
                  </label>
                  <Input
                    required
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="bg-transparent border-border/40 focus:border-foreground/30 rounded-sm h-12 font-body text-sm placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-body text-xs tracking-[0.15em] uppercase text-foreground/60">
                  Phone
                </label>
                <Input
                  name="phone"
                  placeholder="+256 ..."
                  className="bg-transparent border-border/40 focus:border-foreground/30 rounded-sm h-12 font-body text-sm placeholder:text-muted-foreground"
                />
              </div>

              {/* Meeting Type */}
              <div className="space-y-3">
                <label className="font-body text-xs tracking-[0.15em] uppercase text-foreground/60">
                  Preferred Meeting Type
                </label>
                <div className="flex flex-wrap gap-3">
                  {meetingTypes.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setSelected(type)}
                      className={`px-5 py-2.5 rounded-sm font-body text-xs tracking-[0.1em] uppercase transition-all duration-300 ${
                        selected === type
                          ? "glass-strong text-foreground"
                          : "border border-border/30 text-foreground/40 hover:text-foreground/70"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-body text-xs tracking-[0.15em] uppercase text-foreground/60">
                  Message
                </label>
                <Textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your vision or what you're looking for..."
                  className="bg-transparent border-border/40 focus:border-foreground/30 rounded-sm font-body text-sm placeholder:text-muted-foreground resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full glass glass-hover py-4 font-body text-xs tracking-[0.2em] uppercase text-foreground transition-all duration-300 rounded-sm disabled:opacity-50"
              >
                {mutation.isPending ? "Sending..." : "Book a Meeting"}
              </button>
            </form>

            {/* Info */}
            <div className={`${asset ? 'lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-foreground/5' : 'lg:col-span-5 lg:pt-4'} space-y-10`}>
              <div className="space-y-10">
                <div>
                  <h3 className="font-display text-xl text-foreground mb-6">Studio</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                      <p className="font-body text-sm text-foreground/70 leading-relaxed">
                        Kampala, Uganda
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Instagram size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                      <a
                        href="https://instagram.com/kais_divo_collection"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-foreground/70 hover:text-foreground transition-colors"
                      >
                        @kais_divo_collection
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                      <p className="font-body text-sm text-foreground/70">
                        Available upon request
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-sm p-8 space-y-4">
                  <h3 className="font-display text-lg text-foreground">What to expect</h3>
                  <ul className="space-y-3">
                    {[
                      "A personal style consultation tailored to your needs",
                      "Fabric selection from premium materials",
                      "Custom measurements and fitting sessions",
                      "Delivery of your bespoke garment within 2–4 weeks",
                    ].map((item) => (
                      <li
                        key={item}
                        className="font-body text-sm text-foreground/60 leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-foreground/30 mt-1">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
