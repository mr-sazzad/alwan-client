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

const FAQsPage = () => {
  return (
    <MaxWidth className="mt-[110px] mb-16">
      <h1 className="md:text-3xl sm:text-2xl text-xl font-bold md:text-start text-center mb-4">
        Frequently Asked Questions
      </h1>
      <p className="text-sm md:text-base md:text-start text-center text-muted-foreground mb-8">
        Find answers to common questions about Alwan Ideal products and services
      </p>

      <Accordion type="single" collapsible className="w-full mb-12">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            What materials do you use in your products?
          </AccordionTrigger>
          <AccordionContent>
            At Alwan Ideal, we use a variety of high-quality materials in our
            products, including premium fabrics, sustainable materials, and
            durable components. We&apos;re constantly exploring new eco-friendly
            options to improve our product line.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            How can I care for my Alwan Ideal products?
          </AccordionTrigger>
          <AccordionContent>
            To ensure the longevity of your Alwan Ideal products, we recommend
            following the care instructions provided with each item. Generally,
            this includes gentle washing, avoiding harsh chemicals, and proper
            storage when not in use.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Do you offer international shipping?
          </AccordionTrigger>
          <AccordionContent>
            Currently, we primarily serve customers within Bangladesh. However,
            we&apos;re exploring options for international shipping in the
            future. Stay tuned to our website and social media channels for
            updates on our shipping policies.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day return policy for unused items in their original
            packaging. If you&apos;re not satisfied with your purchase, please
            contact our customer service team to initiate the return process.
            Note that customized items may not be eligible for return.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Are your products sustainable?</AccordionTrigger>
          <AccordionContent>
            We&apos;re committed to increasing the sustainability of our
            products. While not all of our items are fully sustainable yet,
            we&apos;re actively working on incorporating more eco-friendly
            materials and production methods. Look for specific product
            information to identify our more sustainable options.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Still have questions?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            If you couldn&apos;t find the answer to your question, please
            don&apos;t hesitate to contact us directly.
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

export default FAQsPage;
