import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Mail, Phone, Calendar, Inbox, Trash2, Loader2, Edit3, Save } from "lucide-react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { ref, onValue, remove, get, set } from "firebase/database";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AdminDashboard = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"requests" | "content">("requests");
  const [contentPage, setContentPage] = useState<"home" | "about" | "collections" | "mens" | "ladies" | "corbata">("home");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Content state
  const [homeContent, setHomeContent] = useState({
    heroTitle: "KAI'S DIVO",
    volume06Text: "Drop 6: Minimalist retro elegance, where timeless closet pieces are reborn with a modern edge.",
    modernTwistsTitle: "modern twists on classical elegance",
  });

  const [aboutContent, setAboutContent] = useState({
    narrativeTitle: "Beyond the Silhouette",
    headerQuote: "We don't create fashion. We create armor for the modern visionary. Each piece is a testament to the power of precision and the beauty of Kampala's creative spirit.",
    founderBio: "Abbas Kaijuka is the visionary founder and lead designer behind Kai’s Divo...",
    philosophy1Title: "Smart Contemporary",
    philosophy1Text: "Our approach blends traditional tailoring with experimental forms...",
    philosophy2Title: "Compact Collections",
    philosophy2Text: "By releasing focused 'Drops' rather than massive seasonal collections...",
    philosophy3Title: "Kampala Craft",
    philosophy3Text: "Deeply rooted in Uganda's vibrant capital, our studio is a hub of local craftsmanship...",
    finalQuote: "The goal is not to be seen, but to be remembered.",
  });

  const [collectionsContent, setCollectionsContent] = useState({
    drop06Name: "Volume 06: Ethereal Kampala",
    drop06Desc: "A celebration of light and movement. Our latest work explores the intersection of traditional Ugandan textures and contemporary minimalist silhouettes.",
    drop05Name: "Volume 05: Midnight tailored",
    drop05Desc: "Precision at its finest. Volume 05 focuses on the architecture of evening wear, where every stitch serves a purpose.",
    drop04Name: "Volume 04: Urban Nomad",
    drop04Desc: "Versatile, breathable, and unmistakably Kai's Divo. Designed for the modern visionary who values both style and comfort.",
    drop03Name: "Volume 03: Heritage Reborn",
    drop03Desc: "Revisiting our roots. This collection reimagines classic bespoke tailoring through a 21st-century lens.",
  });

  const [mensContent, setMensContent] = useState({
    title: "Men's Collection",
    description: "Epitomizing structural precision and modern masculinity — our bespoke tailoring designed for the discerning gentleman.",
    ctaTitle: "Command Attention",
  });

  const [ladiesContent, setLadiesContent] = useState({
    title: "Ladies Collection",
    description: "Where ethereal grace meets avant-garde vision — our bespoke creations for the modern woman who commands the room.",
    ctaTitle: "Redefine Elegance",
  });

  const [corbataContent, setCorbataContent] = useState({
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
    // If Firebase is configured, fetch real-time from Realtime Database
    if (isFirebaseConfigured()) {
      setIsLoading(true);
      
      // Fetch messages
      const submissionsRef = ref(db, 'submissions');
      const unsubSubmissions = onValue(submissionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fetchedMessages = Object.entries(data).map(([id, val]: [string, any]) => ({
            id,
            ...val,
            date: val.submittedAt ? new Date(val.submittedAt).toISOString().split('T')[0] : "N/A"
          })).reverse();
          setMessages(fetchedMessages);
        } else {
          setMessages([]);
        }
      });

      // Fetch all content
      const contentPaths = ['home', 'about', 'collections', 'mens', 'ladies', 'corbata'];
      const setters = {
        home: setHomeContent,
        about: setAboutContent,
        collections: setCollectionsContent,
        mens: setMensContent,
        ladies: setLadiesContent,
        corbata: setCorbataContent
      };

      contentPaths.forEach(path => {
        get(ref(db, `content/${path}`)).then(snapshot => {
          if (snapshot.exists()) {
            (setters as any)[path]((prev: any) => ({ ...prev, ...snapshot.val() }));
          }
        });
      });

      setIsLoading(false);
      return () => unsubSubmissions();
    } else {
      const savedMessages = JSON.parse(localStorage.getItem("contact-messages") || "[]");
      setMessages(savedMessages);
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    navigate("/admin/login");
  };

  const handleSaveContent = async () => {
    setIsSaving(true);
    try {
      const pageRef = ref(db, `content/${contentPage}`);
      const contentToSave = {
        home: homeContent,
        about: aboutContent,
        collections: collectionsContent,
        mens: mensContent,
        ladies: ladiesContent,
        corbata: corbataContent
      }[contentPage];

      await set(pageRef, contentToSave);
      toast({ title: "Success", description: `${contentPage} content updated` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update content", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearAll = async () => {
    if (confirm("Are you sure you want to clear all messages?")) {
      if (isFirebaseConfigured()) {
        try {
          await remove(ref(db, 'submissions'));
        } catch (error) {
          console.error("Error clearing Realtime DB messages:", error);
        }
      } else {
        localStorage.removeItem("contact-messages");
        setMessages([]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="glass py-6 px-12 flex justify-between items-center border-b border-border/10 fixed top-0 w-full z-50">
        <div className="flex items-center gap-12">
          <h1 className="font-display text-2xl uppercase tracking-tighter">Admin</h1>
          <div className="flex gap-6">
             <button 
               onClick={() => setActiveTab("requests")}
               className={`font-body text-[10px] tracking-[0.2em] uppercase transition-all ${activeTab === "requests" ? "text-foreground underline underline-offset-8" : "text-foreground/40 hover:text-foreground"}`}
             >
               Requests
             </button>
             <button 
               onClick={() => setActiveTab("content")}
               className={`font-body text-[10px] tracking-[0.2em] uppercase transition-all ${activeTab === "content" ? "text-foreground underline underline-offset-8" : "text-foreground/40 hover:text-foreground"}`}
             >
               Edit Content
             </button>
          </div>
        </div>
        <div className="flex items-center gap-8">
          {activeTab === "requests" && messages.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-destructive/60 hover:text-destructive transition-all duration-300"
            >
              <Trash2 size={14} />
              Clear All
            </button>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-all duration-300"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </nav>

      <main className="pt-40 pb-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        {activeTab === "requests" ? (
          <>
            <header className="space-y-4">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">Overview</p>
              <div className="flex justify-between items-end">
                <h2 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95]">
                  Contact<br />
                  <span className="italic font-normal text-foreground/70">Requests</span>
                </h2>
                {isFirebaseConfigured() && (
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-green-500 mb-2 border border-green-500/20 px-3 py-1 rounded-full">
                    Connected to Firebase
                  </span>
                )}
              </div>
            </header>

            <section className="grid grid-cols-1 gap-6">
              {isLoading ? (
                <div className="py-32 flex flex-col items-center justify-center space-y-4 glass rounded-sm">
                  <Loader2 className="animate-spin text-muted-foreground" size={40} />
                  <p className="font-body text-xs tracking-widest uppercase">Fetching submissions...</p>
                </div>
              ) : messages.length > 0 ? (
                messages.map((msg) => (
                  <div key={msg.id} className="glass p-8 rounded-sm space-y-6 group hover:border-foreground/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div className="space-y-4 w-full">
                        <div className="flex items-center gap-3">
                          <User size={16} className="text-muted-foreground" />
                          <h3 className="font-display text-xl text-foreground uppercase">{msg.name}</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-muted-foreground" />
                            <span className="font-body text-xs text-foreground/60">{msg.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-muted-foreground" />
                            <span className="font-body text-xs text-foreground/60">{msg.phone || "No phone provided"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-muted-foreground" />
                            <span className="font-body text-xs text-foreground/60">{msg.date}</span>
                          </div>
                          <div className="inline-block px-3 py-1 bg-foreground/5 rounded-sm w-fit">
                            <span className="font-body text-[10px] tracking-widest uppercase text-foreground/40">{msg.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-border/10">
                      <p className="font-body text-sm text-foreground/70 leading-relaxed italic max-w-3xl">
                        "{msg.message}"
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-32 flex flex-col items-center justify-center text-center space-y-4 glass rounded-sm opacity-50">
                  <Inbox size={40} strokeWidth={1} className="text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="font-display text-xl uppercase tracking-tighter">No requests yet</p>
                    <p className="font-body text-xs tracking-widest uppercase">Messages from the contact page will appear here</p>
                  </div>
                </div>
              )}
            </section>
          </>
        ) : (
          <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
            <header className="flex justify-between items-end">
              <div className="space-y-4">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">Editor</p>
                <div className="flex flex-wrap gap-4">
                  {["home", "about", "collections", "mens", "ladies", "corbata"].map(p => (
                    <button 
                      key={p}
                      onClick={() => setContentPage(p as any)}
                      className={`font-display text-2xl md:text-3xl uppercase tracking-tighter leading-none ${contentPage === p ? "text-foreground underline underline-offset-8 italic" : "text-foreground/20 hover:text-foreground"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleSaveContent}
                disabled={isSaving}
                className="flex items-center gap-2 glass glass-hover px-8 py-4 font-body text-[10px] tracking-[0.2em] uppercase text-foreground transition-all duration-300 rounded-sm disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save Changes
              </button>
            </header>

            <div className="glass p-10 rounded-sm space-y-8">
              {contentPage === "home" && (
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Hero Title</label>
                    <Input 
                      value={homeContent.heroTitle}
                      onChange={e => setHomeContent({...homeContent, heroTitle: e.target.value})}
                      className="bg-transparent border-border/40 font-display text-2xl uppercase h-16"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Drop 06 Text</label>
                    <Textarea 
                      value={homeContent.volume06Text}
                      onChange={e => setHomeContent({...homeContent, volume06Text: e.target.value})}
                      className="bg-transparent border-border/40 font-body text-sm h-32 resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Modern Twists Title</label>
                    <Input 
                      value={homeContent.modernTwistsTitle}
                      onChange={e => setHomeContent({...homeContent, modernTwistsTitle: e.target.value})}
                      className="bg-transparent border-border/40 font-display text-2xl uppercase h-16"
                    />
                  </div>
                </div>
              )}

              {contentPage === "about" && (
                <div className="grid grid-cols-1 gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Editorial Title</label>
                      <Input 
                        value={aboutContent.narrativeTitle}
                        onChange={e => setAboutContent({...aboutContent, narrativeTitle: e.target.value})}
                        className="bg-transparent border-border/40 font-display text-2xl uppercase h-16"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Header Quote</label>
                      <Textarea 
                        value={aboutContent.headerQuote}
                        onChange={e => setAboutContent({...aboutContent, headerQuote: e.target.value})}
                        className="bg-transparent border-border/40 font-body text-sm h-32 italic"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Founder Biography</label>
                    <Textarea 
                      value={aboutContent.founderBio}
                      onChange={e => setAboutContent({...aboutContent, founderBio: e.target.value})}
                      className="bg-transparent border-border/40 font-body text-sm h-64 resize-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/10">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="space-y-4">
                          <Input 
                            value={(aboutContent as any)[`philosophy${i}Title`]}
                            onChange={e => setAboutContent({...aboutContent, [`philosophy${i}Title`]: e.target.value} as any)}
                            className="bg-transparent border-border/40 font-display text-lg uppercase"
                          />
                          <Textarea 
                            value={(aboutContent as any)[`philosophy${i}Text`]}
                            onChange={e => setAboutContent({...aboutContent, [`philosophy${i}Text`]: e.target.value} as any)}
                            className="bg-transparent border-border/40 font-body text-xs h-32 resize-none"
                          />
                       </div>
                     ))}
                  </div>

                  <div className="space-y-2 pt-8 border-t border-border/10">
                    <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Final Quote</label>
                    <Input 
                      value={aboutContent.finalQuote}
                      onChange={e => setAboutContent({...aboutContent, finalQuote: e.target.value})}
                      className="bg-transparent border-border/40 font-display text-2xl uppercase h-16 text-center"
                    />
                  </div>
                </div>
              )}

              {contentPage === "collections" && (
                <div className="grid grid-cols-1 gap-12">
                   {[6, 5, 4, 3].map(v => {
                     const num = `0${v}`;
                     return (
                       <div key={v} className="space-y-6 pb-8 border-b border-border/10 last:border-0">
                         <h3 className="font-display text-xl uppercase tracking-widest text-foreground/60">Volume {num}</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                              <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Collection Name</label>
                              <Input 
                                value={(collectionsContent as any)[`drop${num}Name`]}
                                onChange={e => setCollectionsContent({...collectionsContent, [`drop${num}Name`]: e.target.value} as any)}
                                className="bg-transparent border-border/40 font-display text-lg uppercase h-12"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Description</label>
                              <Textarea 
                                value={(collectionsContent as any)[`drop${num}Desc`]}
                                onChange={e => setCollectionsContent({...collectionsContent, [`drop${num}Desc`]: e.target.value} as any)}
                                className="bg-transparent border-border/40 font-body text-xs h-24 resize-none"
                              />
                            </div>
                         </div>
                       </div>
                     )
                   })}
                </div>
              )}

              {(contentPage === "mens" || contentPage === "ladies") && (
                <div className="grid grid-cols-1 gap-8">
                  {/* Reuse structure for Mens/Ladies */}
                  {(() => {
                    const content = contentPage === "mens" ? mensContent : ladiesContent;
                    const setter = contentPage === "mens" ? setMensContent : setLadiesContent;
                    return (
                      <div className="grid grid-cols-1 gap-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Page Title</label>
                            <Input 
                              value={content.title}
                              onChange={e => setter({...content, title: e.target.value} as any)}
                              className="bg-transparent border-border/40 font-display text-2xl uppercase h-16"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">CTA Title</label>
                            <Input 
                              value={content.ctaTitle}
                              onChange={e => setter({...content, ctaTitle: e.target.value} as any)}
                              className="bg-transparent border-border/40 font-display text-2xl uppercase h-16"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Description</label>
                          <Textarea 
                            value={content.description}
                            onChange={e => setter({...content, description: e.target.value} as any)}
                            className="bg-transparent border-border/40 font-body text-sm h-32 resize-none"
                          />
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

              {contentPage === "corbata" && (
                <div className="grid grid-cols-1 gap-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Page Title</label>
                        <Input 
                          value={corbataContent.title}
                          onChange={e => setCorbataContent({...corbataContent, title: e.target.value})}
                          className="bg-transparent border-border/40 font-display text-2xl uppercase h-16"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-body text-[10px] tracking-widest uppercase text-foreground/40">Header Description</label>
                        <Textarea 
                          value={corbataContent.description}
                          onChange={e => setCorbataContent({...corbataContent, description: e.target.value})}
                          className="bg-transparent border-border/40 font-body text-xs h-32 resize-none"
                        />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/10">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="space-y-4">
                          <Input 
                            value={(corbataContent as any)[`feature${i}Title`]}
                            onChange={e => setCorbataContent({...corbataContent, [`feature${i}Title`]: e.target.value} as any)}
                            className="bg-transparent border-border/40 font-display text-lg uppercase"
                          />
                          <Textarea 
                            value={(corbataContent as any)[`feature${i}Text`]}
                            onChange={e => setCorbataContent({...corbataContent, [`feature${i}Text`]: e.target.value} as any)}
                            className="bg-transparent border-border/40 font-body text-xs h-32 resize-none"
                          />
                       </div>
                     ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
