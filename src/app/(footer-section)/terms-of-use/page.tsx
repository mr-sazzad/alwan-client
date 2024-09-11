import MaxWidth from "@/components/max-width";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Link from "next/link";

const TermsOfUsePage = () => {
  return (
    <MaxWidth className="mt-[100px] mb-16">
      <h1 className="md:text-3xl sm:text-2xl text-xl font-bold text-center mb-4">
        Terms of Use
      </h1>
      <p className="text-sm md:text-base text-center text-muted-foreground mb-8">
        Please read these terms carefully before using the Alwan Ideal website
        or purchasing our products.
      </p>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-4">
            By accessing this website and using our services, you agree to
            comply with and be bound by the following terms and conditions of
            use. If you do not agree to these terms, please do not use our
            website or services.
          </p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full mb-12">
        <AccordionItem value="term-1">
          <AccordionTrigger>1. Acceptance of Terms</AccordionTrigger>
          <AccordionContent>
            By using the Alwan Ideal website, you agree to be bound by these
            Terms of Use, all applicable laws and regulations, and agree that
            you are responsible for compliance with any applicable local laws.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="term-2">
          <AccordionTrigger>2. Use License</AccordionTrigger>
          <AccordionContent>
            Permission is granted to temporarily download one copy of the
            materials (information or software) on Alwan Ideal&apos;s website
            for personal, non-commercial transitory viewing only. This is the
            grant of a license, not a transfer of title.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="term-3">
          <AccordionTrigger>3. Disclaimer</AccordionTrigger>
          <AccordionContent>
            The materials on Alwan Ideal&apos;s website are provided on an
            &apos;as is&apos; basis. Alwan Ideal makes no warranties, expressed
            or implied, and hereby disclaims and negates all other warranties
            including, without limitation, implied warranties or conditions of
            merchantability, fitness for a particular purpose, or
            non-infringement of intellectual property or other violation of
            rights.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="term-4">
          <AccordionTrigger>4. Limitations</AccordionTrigger>
          <AccordionContent>
            In no event shall Alwan Ideal or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use the materials on Alwan Ideal&apos;s website, even
            if Alwan Ideal or an authorized representative has been notified
            orally or in writing of the possibility of such damage.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="term-5">
          <AccordionTrigger>5. Accuracy of Materials</AccordionTrigger>
          <AccordionContent>
            The materials appearing on Alwan Ideal&apos;s website could include
            technical, typographical, or photographic errors. Alwan Ideal does
            not warrant that any of the materials on its website are accurate,
            complete, or current. Alwan Ideal may make changes to the materials
            contained on its website at any time without notice.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="term-6">
          <AccordionTrigger>6. Links</AccordionTrigger>
          <AccordionContent>
            Alwan Ideal has not reviewed all of the sites linked to its website
            and is not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by Alwan Ideal of
            the site. Use of any such linked website is at the user&apos;s own
            risk.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="term-7">
          <AccordionTrigger>7. Modifications</AccordionTrigger>
          <AccordionContent>
            Alwan Ideal may revise these terms of use for its website at any
            time without notice. By using this website, you are agreeing to be
            bound by the then current version of these terms of service.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="term-8">
          <AccordionTrigger>8. Governing Law</AccordionTrigger>
          <AccordionContent>
            These terms and conditions are governed by and construed in
            accordance with the laws of Bangladesh and you irrevocably submit to
            the exclusive jurisdiction of the courts in that location.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Questions or Concerns?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            If you have any questions or concerns about our Terms of Use, please
            don&apos;t hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/contact" passHref>
              <Button className="w-full sm:w-auto">
                <FileText className="mr-2 h-4 w-4" /> Contact Us
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

export default TermsOfUsePage;
