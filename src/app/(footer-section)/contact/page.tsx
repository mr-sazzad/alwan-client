"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import MaxWidth from "@/components/max-width";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setIsDialogOpen(false);
        toast({
          title: "Message Sent",
          description:
            "We've received your message and will get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send the message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const whatsappNumber = "+8801613980323";
  const whatsappMessage =
    "Hello, I have a question about Alwan Ideal Lifestyle.";

  const messengerUsername = "100077653895732";

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex items-center justify-center mt-[100px]">
        <h1 className="text-3xl font-medium">Contact Us</h1>
      </div>
      <MaxWidth className="">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-medium mb-6 text-black">
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  <Button asChild className="w-full" variant="outline">
                    <Link
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        whatsappMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2" size={20} />
                      Chat on WhatsApp
                    </Link>
                  </Button>

                  <Button asChild className="w-full" variant="outline">
                    <Link
                      href={`https://m.me/${messengerUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessagesSquare className="mr-2" size={20} />
                      Chat on Messenger
                    </Link>
                  </Button>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        <Mail className="mr-2" size={20} />
                        Send Email
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl bg-white text-black max-h-[97vh] overflow-y-scroll hide-scrollbar">
                      <DialogHeader>
                        <DialogTitle className="font-medium text-xl">
                          Send us an email
                        </DialogTitle>
                        <DialogDescription>
                          Fill out this form and we&apos;ll get back to you as
                          soon as possible.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-4"
                        >
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your name"
                                    {...field}
                                    className="bg-white text-black"
                                  />
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
                                  <Input
                                    type="email"
                                    placeholder="Your email"
                                    {...field}
                                    className="bg-white text-black"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Message subject"
                                    {...field}
                                    className="bg-white text-black"
                                  />
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
                                    placeholder="Your message"
                                    {...field}
                                    className="bg-white text-black"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="submit"
                            className="w-full bg-black text-white hover:bg-gray-800"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-medium mb-6 text-black">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      What are your business hours?
                    </AccordionTrigger>
                    <AccordionContent>
                      We are open Monday to Friday, 9:00 AM to 6:00 PM. We are
                      closed on weekends and public holidays.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Do you offer international shipping?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer international shipping to select countries.
                      Please check our shipping policy for more details.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      What is your return policy?
                    </AccordionTrigger>
                    <AccordionContent>
                      We offer a 07-day return policy for most items. Please
                      refer to our returns page for full details and conditions.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-medium mb-6 text-black">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="mr-3 text-black" />
                    <span>+8801613-980323</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-3 text-black" />
                    <span>contact.alwanlifestyle@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-3 text-black" />
                    <span>8100, Gopalganj Sadar, Goplaganj</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-medium mb-6 text-black">
                  Our Location
                </h2>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29373.58913071724!2d89.80761611562497!3d23.00837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff0a1f8e2c2a6f%3A0x4a3e2c6f2a8b6f0d!2sGopalganj%20Sadar%20Upazila!5e0!3m2!1sen!2sbd!4v1652345678901!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidth>
    </div>
  );
}
