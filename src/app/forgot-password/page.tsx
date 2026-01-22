"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createBrowserSupabaseClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage("Si un compte existe avec cet email, un lien de réinitialisation vous a été envoyé.");
    } catch (err: unknown) {
      console.error(err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (message) {
    return (
      <div className="container mx-auto px-4 py-32 flex justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Email envoyé</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">{message}</p>
            <Button variant="outline" className="w-full rounded-full" asChild>
              <Link href="/login">Retour à la connexion</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-32 flex justify-center">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="icon" asChild className="-ml-2">
              <Link href="/login"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <CardTitle>Mot de passe oublié</CardTitle>
          </div>
          <CardDescription>
            Saisissez votre email pour recevoir un lien de réinitialisation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@exemple.fr"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-11 rounded-full" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Envoyer le lien"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
