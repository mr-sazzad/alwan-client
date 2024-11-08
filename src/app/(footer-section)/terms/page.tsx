import MaxWidth from "@/components/max-width";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TermsAndConditionsPage() {
  return (
    <MaxWidth className="mt-[100px]">
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-medium mb-6">Terms and Conditions</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-medium">
              Welcome to Our Lifestyle Website
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These terms and conditions outline the rules and regulations for
              the use of our Lifestyle Website. By accessing this website, we
              assume you accept these terms and conditions in full. Do not
              continue to use our website if you do not accept all of the terms
              and conditions stated on this page.
            </p>
          </CardContent>
        </Card>

        <ScrollArea className="h-[600px] rounded-md border p-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                1. Intellectual Property Rights
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Other than the content you own, under these Terms, our Company
                  and/or its licensors own all the intellectual property rights
                  and materials contained in this Website. You are granted
                  limited license only for purposes of viewing the material
                  contained on this Website.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>2. Restrictions</AccordionTrigger>
              <AccordionContent>
                <p>
                  You are specifically restricted from all of the following:
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>publishing any Website material in any other media;</li>
                  <li>
                    selling, sublicensing and/or otherwise commercializing any
                    Website material;
                  </li>
                  <li>
                    publicly performing and/or showing any Website material;
                  </li>
                  <li>
                    using this Website in any way that is or may be damaging to
                    this Website;
                  </li>
                  <li>
                    using this Website in any way that impacts user access to
                    this Website;
                  </li>
                  <li>
                    using this Website contrary to applicable laws and
                    regulations, or in any way may cause harm to the Website, or
                    to any person or business entity;
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>3. Your Content</AccordionTrigger>
              <AccordionContent>
                <p>
                  In these Website Standard Terms and Conditions, &quot;Your
                  Content&quot; shall mean any audio, video text, images or
                  other material you choose to display on this Website. By
                  displaying Your Content, you grant our Company a
                  non-exclusive, worldwide irrevocable, sub licensable license
                  to use, reproduce, adapt, publish, translate and distribute it
                  in any and all media.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>4. No Warranties</AccordionTrigger>
              <AccordionContent>
                <p>
                  This Website is provided &quot;as is,&quot; with all faults,
                  and our Company express no representations or warranties, of
                  any kind related to this Website or the materials contained on
                  this Website.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>5. Limitation of Liability</AccordionTrigger>
              <AccordionContent>
                <p>
                  In no event shall our Company, nor any of its officers,
                  directors and employees, be held liable for anything arising
                  out of or in any way connected with your use of this Website
                  whether such liability is under contract. Our Company,
                  including its officers, directors and employees shall not be
                  held liable for any indirect, consequential or special
                  liability arising out of or in any way related to your use of
                  this Website.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>6. Indemnification</AccordionTrigger>
              <AccordionContent>
                <p>
                  You hereby indemnify to the fullest extent our Company from
                  and against any and/or all liabilities, costs, demands, causes
                  of action, damages and expenses arising in any way related to
                  your breach of any of the provisions of these Terms.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>7. Severability</AccordionTrigger>
              <AccordionContent>
                <p>
                  If any provision of these Terms is found to be invalid under
                  any applicable law, such provisions shall be deleted without
                  affecting the remaining provisions herein.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>8. Variation of Terms</AccordionTrigger>
              <AccordionContent>
                <p>
                  Our Company is permitted to revise these Terms at any time as
                  it sees fit, and by using this Website you are expected to
                  review these Terms on a regular basis.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>
                9. Governing Law & Jurisdiction
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  These Terms will be governed by and interpreted in accordance
                  with the laws of the country where our Company is based, and
                  you submit to the non-exclusive jurisdiction of the state and
                  federal courts located in said country for the resolution of
                  any disputes.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>

        <Card className="mt-8">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              By using our website, you hereby consent to our Terms and
              Conditions and agree to abide by them. If you have any questions
              about these Terms, please contact us.
            </p>
          </CardContent>
        </Card>
      </div>
    </MaxWidth>
  );
}
