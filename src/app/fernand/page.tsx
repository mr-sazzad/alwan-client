'use client'

import { useState, useEffect, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import MaxWidth from '@/components/max-width'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

// Define types for Fernand
type FernandOptions = { appId?: string }
type FernandCommand = (command: string, options?: FernandOptions) => void
type FernandQueue = any[]

interface FernandFunction extends FernandCommand {
  q?: FernandQueue
}

declare global {
  interface Window {
    Fernand?: FernandFunction
  }
}

// Separate component for client-side only content
const ClientSideContent = () => {
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Fernand) {
      const fernandFunction: FernandFunction = function(command: string, options?: FernandOptions) {
        if (fernandFunction.q) {
          fernandFunction.q.push([command, options])
        }
      }
      fernandFunction.q = []
      window.Fernand = fernandFunction

      const script = document.createElement('script')
      script.src = "https://messenger.getfernand.com/client.js"
      script.async = true
      script.onload = () => {
        console.log('Fernand script loaded')
        window.Fernand?.('init', { appId: 'alwan' })
        toast({
          title: "Chat widget loaded",
          description: "You can now start chatting with our support team.",
        })
      }
      script.onerror = () => {
        console.error('Failed to load Fernand script')
        toast({
          title: "Error",
          description: "Failed to load the chat widget. Please refresh the page and try again.",
          variant: "destructive",
        })
      }
      document.body.appendChild(script)
    }

    return () => {
      if (typeof window !== 'undefined') {
        const script = document.querySelector('script[src="https://messenger.getfernand.com/client.js"]')
        if (script) {
          document.body.removeChild(script)
        }
        delete window.Fernand
      }
    }
  }, [toast])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Live Chat Support</h2>
      <p className="text-muted-foreground">
        For immediate assistance, our chat support is available in the bottom right corner of your screen. 
        Look for the chat icon <MessageCircle className="inline-block w-5 h-5 ml-1" /> to start a conversation with our customer support team.
      </p>
      <p className="text-sm text-muted-foreground">
        Our chat widget is always active and ready to help you. If you don't see it, please try refreshing your page.
      </p>
    </div>
  )
}

export default function ContactPage() {
  return (
    <MaxWidth className="mt-[100px]">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold mb-2">Contact Us</CardTitle>
            <CardDescription className="text-xl">We're here to help with any questions or concerns you may have.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Get in Touch</h2>
                <p className="text-muted-foreground">
                  At Alwan, we value your feedback and are committed to providing excellent customer service.
                </p>
                <div className="space-y-4">
                  <a href="mailto:support@alwan.com" className="flex items-center space-x-3 text-primary hover:underline">
                    <Mail className="w-5 h-5" />
                    <span>support@alwan.com</span>
                  </a>
                  <a href="tel:+15551234567" className="flex items-center space-x-3 text-primary hover:underline">
                    <Phone className="w-5 h-5" />
                    <span>+1 (555) 123-4567</span>
                  </a>
                  <address className="flex items-center space-x-3 not-italic text-muted-foreground">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span>123 Alwan Street, Tech City, TC 12345</span>
                  </address>
                </div>
              </div>
              <Suspense fallback={<div>Loading chat support information...</div>}>
                <ClientSideContent />
              </Suspense>
            </div>
            <Separator className="my-8" />
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We strive to respond to all inquiries within 24 hours. Your satisfaction is our top priority, and we look forward to assisting you with any questions or concerns you may have about our products or services.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MaxWidth>
  )
}