"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Mode = "login" | "signup";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/api/auth/callback`,
          },
        });
        if (error) throw error;
        if (data.session) {
          router.push("/dashboard");
          router.refresh();
        } else {
          setEmailSent(true);
          toast.success("Vérifie ta boîte mail pour confirmer ton compte !");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur";
      if (msg.includes("Invalid login")) {
        toast.error("Email ou mot de passe incorrect.");
      } else if (msg.includes("already registered")) {
        toast.error("Email déjà utilisé. Connecte-toi.");
        setMode("login");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
        <div className="w-full max-w-sm text-center rounded-2xl border bg-card p-8">
          <div className="text-5xl mb-4">📬</div>
          <h1 className="text-xl font-bold mb-2">Vérifie ta boîte mail</h1>
          <p className="text-muted-foreground text-sm mb-6">
            On a envoyé un lien de confirmation à <strong>{email}</strong>.
            Clique dessus pour activer ton compte.
          </p>
          <button
            onClick={() => setEmailSent(false)}
            className="text-sm text-primary hover:underline"
          >
            ← Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl">
            <span className="text-primary">⚡</span>
            <span>Chaptry</span>
          </Link>
          <p className="text-muted-foreground text-sm mt-2">
            {mode === "login" ? "Bienvenue ! Connecte-toi pour continuer." : "Crée ton compte gratuit."}
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-8">
          {/* Mode toggle */}
          <div className="flex rounded-lg bg-muted p-1 mb-6">
            {(["login", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${mode === m ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {m === "login" ? "Connexion" : "Inscription"}
              </button>
            ))}
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailAuth} className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="toi@exemple.com"
                required
                disabled={loading}
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium">Mot de passe</label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (!email) { toast.error("Entre ton email d'abord."); return; }
                      const supabase = createClient();
                      await supabase.auth.resetPasswordForEmail(email);
                      toast.success("Email de réinitialisation envoyé !");
                    }}
                    className="text-xs text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "signup" ? "8 caractères minimum" : "••••••••"}
                required
                minLength={mode === "signup" ? 8 : undefined}
                disabled={loading}
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors mt-2"
            >
              {loading
                ? "Chargement..."
                : mode === "login"
                ? "Se connecter"
                : "Créer mon compte gratuit"}
            </button>
          </form>

          {mode === "signup" && (
            <p className="text-xs text-muted-foreground text-center mt-4">
              En t&apos;inscrivant, tu acceptes nos{" "}
              <Link href="/terms" className="underline">CGU</Link>
              {" "}et notre{" "}
              <Link href="/privacy" className="underline">politique de confidentialité</Link>.
            </p>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {mode === "login" ? "Pas encore de compte ? " : "Déjà un compte ? "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-primary hover:underline font-medium"
          >
            {mode === "login" ? "S'inscrire gratuitement" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
}
