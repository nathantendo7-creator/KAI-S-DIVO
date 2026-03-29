import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Local development fallback
    if (import.meta.env.DEV && password === "admin123") {
      localStorage.setItem("admin-token", "dev-token");
      toast({ title: "Dev Login", description: "Authenticated via local fallback" });
      navigate("/admin");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("admin-token", data.token);
        toast({ title: "Welcome back", description: "Login successful" });
        navigate("/admin");
      } else {
        const data = await response.json().catch(() => ({}));
        toast({
          title: "Error",
          description: data.error || "Invalid password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Could not connect to authentication server. Please ensure the backend is running.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md space-y-8 glass p-10 rounded-sm">
        <div className="text-center">
          <h1 className="font-display text-4xl uppercase tracking-tighter">Admin Access</h1>
          <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mt-2">Enter credentials</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="font-body text-xs tracking-[0.15em] uppercase text-foreground/60">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-transparent border-border/40 focus:border-foreground/30 rounded-sm h-12 font-body text-sm pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full glass glass-hover py-4 font-body text-xs tracking-[0.2em] uppercase text-foreground transition-all duration-300 rounded-sm disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
