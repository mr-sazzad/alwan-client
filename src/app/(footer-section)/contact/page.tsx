"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import React, { Suspense, useEffect } from "react";
import { BsMessenger } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import MaxWidth from "../../../components/max-width";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { useToast } from "../../../components/ui/use-toast";

type FernandOptions = { appId?: string };
type FernandCommand = (command: string, options?: FernandOptions) => void;
type FernandQueue = any[];

interface FernandFunction extends FernandCommand {
  q?: FernandQueue;
}

declare global {
  interface Window {
    Fernand?: FernandFunction;
  }
}

const ClientSideContent = () => {
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined" && !window.Fernand) {
      const fernandFunction: FernandFunction = function (
        command: string,
        options?: FernandOptions
      ) {
        if (fernandFunction.q) {
          fernandFunction.q.push([command, options]);
        }
      };
      fernandFunction.q = [];
      window.Fernand = fernandFunction;

      const script = document.createElement("script");
      script.src = "https://messenger.getfernand.com/client.js";
      script.async = true;
      script.onload = () => {
        console.log("Fernand script loaded");
        window.Fernand?.("init", { appId: "alwan" });
        toast({
          title: "Chat widget loaded",
          description: "You can now start chatting with our support team.",
        });
      };
      script.onerror = () => {
        console.error("Failed to load Fernand script");
        toast({
          title: "Error",
          description:
            "Failed to load the chat widget. Please refresh the page and try again.",
          variant: "destructive",
        });
      };
      document.body.appendChild(script);
    }

    return () => {
      if (typeof window !== "undefined") {
        const script = document.querySelector(
          'script[src="https://messenger.getfernand.com/client.js"]'
        );
        if (script) {
          document.body.removeChild(script);
        }
        delete window.Fernand;
      }
    };
  }, [toast]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Live Chat Support</h2>
      <p className="text-muted-foreground">
        For immediate assistance, our chat support is available in the bottom
        right corner of your screen. Look for the chat icon{" "}
        <MessageCircle className="inline-block w-5 h-5 ml-1" /> to start a
        conversation with our customer support team.
      </p>
      <p className="text-sm text-muted-foreground">
        Our chat widget is always active and ready to help you. If you
        don&apos;t see it, please try refreshing your page.
      </p>
    </div>
  );
};

export default function ContactPage() {
  const whatsappNumber = "+8801613980323";
  const whatsappMessage =
    "Hello, I have a question about Alwan Ideal Lifestyle.";
  const messengerUsername = "100077653895732";

  return (
    <div className="min-h-screen bg-background">
      <MaxWidth className="mt-[80px]">
        <div className="container mx-auto px-4 py-12">
          <Card className="w-full max-w-6xl mx-auto overflow-hidden shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-3xl font-medium mb-2">
                Contact Us
              </CardTitle>
              <CardDescription className="text-lg">
                We&apos;re here to help with any questions or concerns you may
                have.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-medium mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground mb-6">
                      At Alwan, we value your feedback and are committed to
                      providing excellent customer service.
                    </p>
                    <div className="flex gap-2 items-center">
                      <Button asChild className="w-full" variant="outline">
                        <Link
                          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                            whatsappMessage
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IoLogoWhatsapp className="mr-2" size={20} />
                          WhatsApp
                        </Link>
                      </Button>
                      <Button asChild className="w-full" variant="outline">
                        <Link
                          href={`https://m.me/${messengerUsername}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BsMessenger size={20} className="mr-2" />
                          Messenger
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium">Contact Information</h2>
                    <div className="flex items-center space-x-3 text-primary">
                      <Phone className="w-5 h-5" />
                      <span>+8801613-980323</span>
                    </div>
                    <div className="flex items-center space-x-3 text-primary">
                      <Mail className="w-5 h-5" />
                      <span>contact.alwanlifestyle@gmail.com</span>
                    </div>
                    <address className="flex items-center space-x-3 not-italic text-muted-foreground">
                      <MapPin className="w-5 h-5 flex-shrink-0" />
                      <span>8100, Gopalganj Sadar, Gopalganj</span>
                    </address>
                    <div className="flex items-start space-x-3 text-muted-foreground">
                      <Clock className="w-5 h-5 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Business Hours:</p>
                        <p>Sunday to Thursday: 8 AM - 8 PM</p>
                        <p className="text-sm mt-2">
                          We strive to answer customer questions at all times,
                          but responses may be quicker during business hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <Suspense
                    fallback={<div>Loading chat support information...</div>}
                  >
                    <ClientSideContent />
                  </Suspense>
                  <div>
                    <h2 className="text-xl font-medium mb-4">
                      Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          What are your business hours?
                        </AccordionTrigger>
                        <AccordionContent>
                          We are open Sunday to Thursday, 8:00 AM to 8:00 PM. We
                          are closed on Fridays, Saturdays, and public holidays.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          Do you offer international shipping?
                        </AccordionTrigger>
                        <AccordionContent>
                          Yes, we offer international shipping to select
                          countries. Please check our shipping policy for more
                          details.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          What is your return policy?
                        </AccordionTrigger>
                        <AccordionContent>
                          We offer a 7-day return policy for most items. Please
                          refer to our returns page for full details and
                          conditions.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
              <Separator className="my-8" />
              <div className="text-center">
                <h2 className="text-xl font-medium mb-4">Our Commitment</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We strive to respond to all inquiries within 24 hours. Your
                  satisfaction is our top priority, and we look forward to
                  assisting you with any questions or concerns you may have
                  about our products or services.
                </p>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-medium mb-4">Our Location</h2>
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
            </CardContent>
          </Card>
        </div>
      </MaxWidth>
    </div>
  );
}
