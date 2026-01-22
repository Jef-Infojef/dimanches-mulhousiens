"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, MessageSquare, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(5, "Le sujet doit être précisé"),
  message: z.string().min(10, "Le message est trop court"),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsSubmitting(true);
    // Simulation d'envoi (peut être lié à Supabase ou un service de mail)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(values);
    setIsSubmitting(false);
    setIsSuccess(true);
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Une question sur l&apos;événement ? Une demande de partenariat ? Notre équipe est à votre écoute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Cards */}
          <div className="space-y-4">
            <Card className="border-none bg-primary/5 shadow-none">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Lieu</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Centre-ville de Mulhouse<br />Place de la Réunion</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-primary/5 shadow-none">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 text-wrap">contact@dimanches-mulhousiens.fr</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-primary/5 shadow-none">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Réseaux Sociaux</h3>
                  <div className="flex gap-3 mt-2">
                    <a href="#" className="text-xs font-medium hover:text-primary underline">Instagram</a>
                    <a href="#" className="text-xs font-medium hover:text-primary underline">Facebook</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl bg-white dark:bg-zinc-900 overflow-hidden">
              <CardContent className="p-8">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Message envoyé !</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                      Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                    </p>
                    <Button variant="outline" onClick={() => setIsSuccess(false)}>
                      Envoyer un autre message
                    </Button>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom complet</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre nom" {...field} />
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
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="votre@email.fr" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sujet</FormLabel>
                            <FormControl>
                              <Input placeholder="De quoi s'agit-il ?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Dites-nous tout..." 
                                className="min-h-[150px] resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full h-12 rounded-full gap-2" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            Envoyer le message <Send className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
