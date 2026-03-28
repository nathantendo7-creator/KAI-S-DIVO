import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  // We'll use one of the assets as the side image (matching the vibe of the flower in the video)
  const assetModules = import.meta.glob("@/assets/*.{jpg,jpeg,png}", { eager: true });
  const images = Object.values(assetModules).map((m: any) => m.default);
  const sideImage = images[15] || images[0]; // Picking a representative image

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to the Inner List",
        description: "You'll be the first to know about our next Drop.",
      });
      setEmail('');
    }
  };

  return (
    <div className="py-32 border-t border-foreground/5 bg-background">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-tight">
                Enter the inner list - <br />
                <span className="italic font-normal opacity-60">subscribe for early access.</span>
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-md space-y-8">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="WRITE DOWN YOUR E-MAIL ADDRESS"
                  className="w-full bg-transparent border-b border-foreground/20 py-4 font-body text-[10px] tracking-[0.2em] focus:outline-none focus:border-foreground transition-colors uppercase placeholder:text-foreground/30"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-12 py-4 bg-foreground text-background font-body text-[10px] tracking-[0.4em] uppercase hover:opacity-90 transition-opacity"
              >
                Submit
              </button>
            </form>
          </div>
          
          <div className="hidden lg:block">
            <div className="aspect-[4/5] max-w-md ml-auto overflow-hidden grayscale opacity-80">
              <img 
                src={sideImage} 
                alt="Newsletter Aesthetic" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
