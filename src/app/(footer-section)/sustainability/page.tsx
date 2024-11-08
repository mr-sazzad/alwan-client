import MaxWidth from "@/components/max-width";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Leaf, Recycle, ShoppingBag } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <MaxWidth className="mt-[100px]">
      <div className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-medium mb-2">
            Our Commitment to Sustainability
          </h1>
          <p className="text-muted-foreground">
            At Alwan Ideal, we believe in offering premium products while caring
            for our environment. We&apos;re taking our first steps towards a
            more sustainable future.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-medium">
                <Leaf className="mr-2 h-5 w-5" />
                Quality Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              We choose durable materials for our products to ensure they last
              longer, reducing waste.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-medium">
                <Recycle className="mr-2 h-5 w-5" />
                Reducing Waste
              </CardTitle>
            </CardHeader>
            <CardContent>
              We&apos;re working on minimizing packaging waste and exploring
              recycling options in our operations.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-medium">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Local Production
              </CardTitle>
            </CardHeader>
            <CardContent>
              By producing locally in Bangladesh, we support our community and
              reduce transportation emissions.
            </CardContent>
          </Card>
        </section>

        <section className="bg-muted p-6 rounded-lg mb-8">
          <h2 className="text-xl font-medium mb-4">Our Sustainability Goals</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Use more eco-friendly materials in our products</li>
            <li>Reduce packaging waste</li>
            <li>Improve energy efficiency in our production</li>
            <li>Educate our customers about product care to extend lifespan</li>
          </ul>
        </section>

        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="font-medium">Important Note</AlertTitle>
          <AlertDescription>
            We&apos;re committed to sustainability, but we want to be
            transparent: not all of our products are sustainable yet. We&apos;re
            working hard to improve our practices and increase our range of
            sustainable options. Look for specific product information to
            identify our more eco-friendly choices.
          </AlertDescription>
        </Alert>

        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-4">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What makes Alwan Ideal products sustainable?
              </AccordionTrigger>
              <AccordionContent>
                Our products are designed to be durable and long-lasting, which
                reduces the need for frequent replacements. We&apos;re also
                exploring more eco-friendly materials and working on reducing
                our packaging waste.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Are your products more expensive because they&apos;re
                sustainable?
              </AccordionTrigger>
              <AccordionContent>
                While some sustainable practices can increase costs, we strive
                to balance sustainability with affordability. Our products are
                priced to reflect their premium quality and durability, which
                can save money in the long run.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How can I help support your sustainability efforts?
              </AccordionTrigger>
              <AccordionContent>
                You can support us by choosing our products, taking good care of
                them to extend their lifespan, and properly disposing of or
                recycling them when they&apos;re no longer usable. We also
                appreciate feedback and suggestions on how we can improve our
                sustainability practices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Do you use eco-friendly packaging?
              </AccordionTrigger>
              <AccordionContent>
                We&apos;re currently working on improving our packaging to be
                more eco-friendly. While we haven&apos;t fully transitioned yet,
                we&apos;re exploring options like recycled materials and
                minimizing excess packaging.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                How do you ensure fair labor practices?
              </AccordionTrigger>
              <AccordionContent>
                As a Bangladeshi brand, we&apos;re committed to supporting our
                local community. We work closely with our producers to ensure
                fair wages and good working conditions. We&apos;re continuously
                working to improve our practices and transparency in this area.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="bg-muted p-6 rounded-lg mb-8">
          <h2 className="text-xl font-medium mb-4">Join Us on Our Journey</h2>
          <p className="text-muted-foreground">
            As a new brand, we&apos;re at the beginning of our sustainability
            journey. We&apos;re committed to improving our practices and
            offering you premium products that are kinder to the environment.
          </p>
        </section>
      </div>
    </MaxWidth>
  );
}
