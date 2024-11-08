import MaxWidth from "@/components/max-width";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaExchangeAlt,
  FaInfoCircle,
  FaTruck,
} from "react-icons/fa";

export default function ReturnPolicyPage() {
  return (
    <MaxWidth className="mt-[100px]">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-medium mb-8 text-primary">
          Return Policy
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-medium">Key Points</CardTitle>
            <CardDescription>
              Important information about our return policy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Products must be in unused and original condition</li>
              <li>
                Returns must be initiated within 7 days of receiving the product
              </li>
              <li>
                Refunds will be processed within 5-10 business days after
                inspection
              </li>
              <li>
                Shipping costs for returns are the responsibility of the
                customer unless the item is defective
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md flex items-start">
            <FaExchangeAlt className="text-primary text-3xl mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-medium mb-2">Unused Products Only</h3>
              <p>
                We accept returns only for unused products in their original
                condition. Any signs of use or alteration will result in the
                return being rejected.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md flex items-start">
            <FaCalendarAlt className="text-primary text-3xl mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-medium mb-2">7-Day Return Window</h3>
              <p>
                You must inform us of your intent to return within 7 days of
                receiving your product. Returns initiated after this period will
                not be accepted.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md flex items-start">
            <FaTruck className="text-primary text-3xl mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-medium mb-2">Return Shipping</h3>
              <p>
                Customers are responsible for return shipping costs, except in
                cases of defective items. We recommend using a trackable
                shipping service.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md flex items-start">
            <FaInfoCircle className="text-primary text-3xl mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-medium mb-2">Refund Process</h3>
              <p>
                Once we receive and inspect the returned item, we&apos;ll
                process your refund. Please allow 5-10 business days for the
                refund to appear in your account.
              </p>
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full mb-12">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I initiate a return?</AccordionTrigger>
            <AccordionContent>
              To initiate a return, please contact our customer service team
              within 7 days of receiving your product. You can reach us via
              email at returns@example.com or call us at 1-800-123-4567. Please
              have your order number ready.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What items are not eligible for return?
            </AccordionTrigger>
            <AccordionContent>
              We do not accept returns on personalized items, intimate apparel,
              or clearance items. Additionally, any product that shows signs of
              use or has been altered in any way is not eligible for return.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How long does the refund process take?
            </AccordionTrigger>
            <AccordionContent>
              Once we receive your return, we&apos;ll inspect the item within
              2-3 business days. If approved, your refund will be processed, and
              a credit will automatically be applied to your original method of
              payment within 5-10 business days.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">Need Help?</h2>
          <p className="mb-4">
            If you have any questions about our return policy, please don&apos;t
            hesitate to contact us.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Customer Service</Link>
          </Button>
        </div>
      </div>
    </MaxWidth>
  );
}
