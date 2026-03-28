import React from "react";

interface MarqueeProps {
  text: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text }) => {
  return (
    <div className="bg-foreground text-background py-4 overflow-hidden relative z-50">
      <div className="marquee-content flex items-center">
        <span className="font-luxe text-[11px] md:text-xs mx-8 inline-block uppercase tracking-[0.3em]">
          {text} • {text} • {text} • {text}
        </span>
        <span className="font-luxe text-[11px] md:text-xs mx-8 inline-block uppercase tracking-[0.3em]">
          {text} • {text} • {text} • {text}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
