"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

const formSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  activity: z.string().min(3, "Veuillez décrire votre activité"),
  description: z.string().min(10, "La description doit faire au moins 10 caractères"),
  website: z.string().url("URL invalide").optional().or(z.string().length(0)),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  acceptTerms: z.boolean().refine((val) => val === true, "Vous devez accepter les conditions"),
});

export default function AdhererPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      activity: "",
      description: "",
      website: "",
      email: "",
      phone: "",
      acceptTerms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { error: supabaseError } = await supabase
        .from('candidatures')
        .insert([
          {
            name: values.name,
            email: values.email,
            activity: values.activity,
            description: values.description,
            phone: values.phone,
            website: values.website,
          }
        ]);

      if (supabaseError) throw supabaseError;
      
      setIsSuccess(true);
    } catch (err: unknown) {
      console.error("Erreur Supabase:", err);
      setError("Une erreur est survenue lors de l'envoi de votre dossier. Veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-50 dark:bg-green-900/20 p-8 rounded-full mb-8"
        >
          <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Candidature Envoyée !</h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8">
          Merci pour votre intérêt. Notre équipe examinera votre dossier et reviendra vers vous par email dans les plus brefs délais.
        </p>
        <Button asChild variant="outline">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Dossier d&apos;Inscription</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Exposez vos créations lors des Dimanches Mulhousiens 2026. Remplissez le formulaire ci-dessous pour soumettre votre candidature.
          </p>
        </div>

        <Card className="border-none shadow-xl bg-white dark:bg-zinc-900">
          <CardHeader>
            <CardTitle>Vos Informations</CardTitle>
            <CardDescription>
              Ces informations nous permettront d&apos;étudier la cohérence de votre stand avec l&apos;esprit de l&apos;événement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom / Enseigne</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Atelier Lumière" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email de contact</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@votre-art.fr" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="activity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type d&apos;activité</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Céramique, Joaillerie, Illustration..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Précisez votre domaine de prédilection.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description de votre univers</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez vos créations, vos matériaux et votre démarche artistique..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="06 .. .. .. .." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Web ou Instagram</FormLabel>
                        <FormControl>
                          <Input placeholder="https://instagram.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-zinc-50 dark:bg-zinc-800/50">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          J&apos;accepte les conditions d&apos;exposition
                        </FormLabel>
                        <FormDescription>
                          Je m&apos;engage à être présent les dimanches sélectionnés de 10h à 18h.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 text-lg rounded-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Soumettre ma candidature"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}