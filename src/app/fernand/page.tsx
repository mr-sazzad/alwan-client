'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MaxWidth from '@/components/max-width'

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

export default function ContactPage() {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false)

  useEffect(() => {
    return () => {
      // Cleanup function to remove the script when component unmounts
      const script = document.querySelector('script[src="https://messenger.getfernand.com/client.js"]')
      if (script) {
        document.body.removeChild(script)
      }
      delete window.Fernand
    }
  }, [])

  const initializeFernandWidget = () => {
    if (typeof window === 'undefined' || window.Fernand) return

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
      window.Fernand?.('openMessenger')
      setIsWidgetLoaded(true)
    }
    script.onerror = () => console.error('Failed to load Fernand script')
    document.body.appendChild(script)
  }

  const handleChatButtonClick = () => {
    if (!isWidgetLoaded) {
      initializeFernandWidget()
    } else {
      window.Fernand?.('openMessenger')
    }
  }

  return (
    <MaxWidth className='mt-[100px]'>
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
          <CardDescription>We&apos;re here to help with any questions or concerns you may have.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            At Alwan, we value your feedback and are committed to providing excellent customer service. Whether you have a question about our products, need technical support, or just want to share your thoughts, we&apos;re here to listen and assist.
          </p>
          <p>
            You can reach us through various channels:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Email: support@alwan.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Alwan Street, Tech City, TC 12345</li>
          </ul>
          <p>
            For immediate assistance, click the button below to chat with our customer support team:
          </p>
          <Button onClick={handleChatButtonClick} className="w-full">
            Chat with Us
          </Button>
          {isWidgetLoaded && (
            <p className="text-sm text-muted-foreground">
              The chat widget is now loaded. If it&apos;s not visible, click the chat icon in the bottom right corner of the screen.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
    </MaxWidth>
  )
}