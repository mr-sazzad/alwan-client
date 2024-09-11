import MaxWidth from "@/components/max-width";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <MaxWidth className="mt-[110px] mb-16">
      <h1 className="md:text-3xl sm:text-2xl text-xl font-bold md:text-start text-center mb-4">
        Privacy Policy
      </h1>
      <p className="text-sm md:text-base md:text-start text-center text-muted-foreground mb-8">
        At Alwan Ideal, we are committed to protecting your privacy and ensuring
        the security of your personal information.
      </p>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-4">
            This Privacy Policy outlines how we collect, use, disclose, and
            safeguard your information when you visit our website or make a
            purchase from Alwan Ideal. Please read this privacy policy
            carefully. If you do not agree with the terms of this privacy
            policy, please do not access the site.
          </p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full mb-12">
        <AccordionItem value="section-1">
          <AccordionTrigger>1. Information We Collect</AccordionTrigger>
          <AccordionContent>
            <p>
              We collect personal information that you voluntarily provide to us
              when you:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Register on the website</li>
              <li>Place an order</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in a survey or contest</li>
              <li>Contact us for customer support</li>
            </ul>
            <p className="mt-2">
              This information may include your name, email address, phone
              number, and billing/shipping address.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="section-2">
          <AccordionTrigger>2. How We Use Your Information</AccordionTrigger>
          <AccordionContent>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Process and fulfill your orders</li>
              <li>
                Communicate with you about your orders, products, and services
              </li>
              <li>Provide customer support</li>
              <li>
                Send you marketing communications (if you&apos;ve opted in)
              </li>
              <li>Improve our website and product offerings</li>
              <li>Comply with legal obligations</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="section-3">
          <AccordionTrigger>
            3. Information Sharing and Disclosure
          </AccordionTrigger>
          <AccordionContent>
            <p>We may share your personal information with:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Service providers who assist us in operating our website and
                conducting our business
              </li>
              <li>
                Law enforcement or government agencies when required by law
              </li>
              <li>
                Other parties in connection with a company transaction, such as
                a merger or sale of assets
              </li>
            </ul>
            <p className="mt-2">
              We do not sell or rent your personal information to third parties
              for their marketing purposes.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="section-4">
          <AccordionTrigger>4. Data Security</AccordionTrigger>
          <AccordionContent>
            <p>
              We implement a variety of security measures to maintain the safety
              of your personal information, including:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Using secure socket layer (SSL) technology for data transmission
              </li>
              <li>Encrypting sensitive information</li>
              <li>Regularly updating our security practices</li>
              <li>
                Restricting access to personal information to employees on a
                need-to-know basis
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="section-5">
          <AccordionTrigger>
            5. Cookies and Tracking Technologies
          </AccordionTrigger>
          <AccordionContent>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our website and hold certain information. You can instruct your
              browser to refuse all cookies or to indicate when a cookie is
              being sent.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="section-6">
          <AccordionTrigger>6. Your Rights</AccordionTrigger>
          <AccordionContent>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access and receive a copy of your personal information</li>
              <li>Rectify or update your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to the processing of your personal information</li>
              <li>
                Request restrictions on the processing of your personal
                information
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="section-7">
          <AccordionTrigger>7. Changes to This Privacy Policy</AccordionTrigger>
          <AccordionContent>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last Updated&quot; date.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Contact Us About Privacy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            If you have any questions or concerns about our Privacy Policy,
            please don&apos;t hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/contact" passHref>
              <Button className="w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4" /> Contact Us
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Alternatively, you can email us directly at: alwan.bd@gmail.com
          </p>
        </CardContent>
      </Card>
    </MaxWidth>
  );
};

export default PrivacyPolicyPage;
