import { Link } from "react-router-dom";

const stockists = [
  {
    id: "01",
    name: "H. LORENZO",
    address: "8660 Sunset Blvd, West Hollywood, CA 90069",
    phone: "(310) 659-1432",
    website: "www.hlorenzo.com",
  },
  {
    id: "02",
    name: "CURVE",
    address: "154 N Robertson Blvd, West Hollywood, CA 90048",
    phone: "(310) 360-8008",
    website: "www.shopcurve.com",
  },
];

const Stockist = () => {
  return (
    <div className="pt-32 pb-32 bg-background min-h-screen">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <h1 className="font-display text-huge text-[10vw] uppercase leading-none mb-32 opacity-10">Stockists</h1>
        
        <div className="space-y-40">
          {stockists.map((item) => (
            <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-foreground/5 pt-12">
              <div className="lg:col-span-6">
                <h2 className="font-display text-7xl md:text-9xl uppercase tracking-tighter">
                  Stockist <br />
                  <span className="italic">{item.id}</span>
                </h2>
              </div>
              <div className="lg:col-span-6 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="font-body text-[10px] tracking-widest text-foreground/40 uppercase">Store</p>
                    <h3 className="font-display text-3xl uppercase">{item.name}</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="font-body text-[10px] tracking-widest text-foreground/40 uppercase">Address</p>
                    <p className="font-body text-sm leading-relaxed uppercase">{item.address}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-body text-[10px] tracking-widest text-foreground/40 uppercase">Phone</p>
                    <p className="font-body text-sm uppercase">{item.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-body text-[10px] tracking-widest text-foreground/40 uppercase">Website</p>
                    <a href={`https://${item.website}`} target="_blank" rel="noreferrer" className="font-body text-sm border-b border-foreground pb-1 hover:opacity-60 transition-opacity uppercase">
                      {item.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stockist;
