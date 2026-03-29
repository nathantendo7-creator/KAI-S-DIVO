import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Mail, Phone, Calendar, Inbox, Trash2, Loader2 } from "lucide-react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { ref, onValue, remove, get } from "firebase/database";

const AdminDashboard = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // If Firebase is configured, fetch real-time from Realtime Database
    if (isFirebaseConfigured()) {
      setIsLoading(true);
      const submissionsRef = ref(db, 'submissions');
      
      const unsubscribe = onValue(submissionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fetchedMessages = Object.entries(data).map(([id, val]: [string, any]) => ({
            id,
            ...val,
            // Format timestamp for display
            date: val.submittedAt ? new Date(val.submittedAt).toISOString().split('T')[0] : "N/A"
          })).reverse(); // Newest first
          setMessages(fetchedMessages);
        } else {
          setMessages([]);
        }
        setIsLoading(false);
      }, (error) => {
        console.error("Error fetching Realtime DB messages:", error);
        setIsLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Load local messages (dev fallback)
      const savedMessages = JSON.parse(localStorage.getItem("contact-messages") || "[]");
      setMessages(savedMessages);
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    navigate("/admin/login");
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
        <h1 className="font-display text-2xl uppercase tracking-tighter">Admin Dashboard</h1>
        <div className="flex items-center gap-8">
          {messages.length > 0 && (
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
      </main>
    </div>
  );
};

export default AdminDashboard;
