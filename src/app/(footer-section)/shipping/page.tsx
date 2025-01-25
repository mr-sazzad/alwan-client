import { Clock, HelpCircle, Leaf, MapPin, Package, Truck } from "lucide-react";
import React from "react";
import MaxWidth from "../../../components/max-width";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

export default function ShippingPage() {
  return (
    <MaxWidth className="mt-[100px]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-medium mb-4">Shipping Information</h1>
        <p className="mb-8 text-muted-foreground">
          At Alwan, we&apos;re committed to delivering tranquility and
          mindfulness to your doorstep across Bangladesh. Our shipping process
          is designed to be as smooth and stress-free as your journey to inner
          peace.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <Truck className="w-10 h-10 mb-2 text-primary" />
              <CardTitle className="font-medium">Nationwide Delivery</CardTitle>
              <CardDescription>Serving all of Bangladesh</CardDescription>
            </CardHeader>
            <CardContent>
              We deliver Alwan products to all divisions and districts in
              Bangladesh, ensuring that everyone can access our lifestyle
              essentials.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <MapPin className="w-10 h-10 mb-2 text-primary" />
              <CardTitle className="font-medium">Local Partnerships</CardTitle>
              <CardDescription>Reliable courier services</CardDescription>
            </CardHeader>
            <CardContent>
              We&apos;ve partnered with trusted local courier services to ensure
              your Alwan products reach you safely and on time, wherever you are
              in Bangladesh.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Clock className="w-10 h-10 mb-2 text-primary" />
              <CardTitle className="font-medium">Processing Time</CardTitle>
              <CardDescription>1-2 business days</CardDescription>
            </CardHeader>
            <CardContent>
              We carefully package each order within 1-2 business days to ensure
              your Alwan products arrive in perfect condition.
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="font-medium">
              Shipping Rates and Estimated Delivery Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Shipping Cost</TableHead>
                  <TableHead>Estimated Delivery Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Inside Dhaka</TableCell>
                  <TableCell>৳70</TableCell>
                  <TableCell>2-3 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Outside Dhaka</TableCell>
                  <TableCell>৳130</TableCell>
                  <TableCell>3-5 business days</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="font-medium">Our Shipping Process</CardTitle>
            <CardDescription>From our hands to your home</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-4">
              <li className="flex items-start">
                <Package className="w-6 h-6 mr-2 mt-1 flex-shrink-0" />
                <span>
                  We carefully package your Alwan products, ensuring
                  they&apos;re protected for the journey.
                </span>
              </li>
              <li className="flex items-start">
                <Truck className="w-6 h-6 mr-2 mt-1 flex-shrink-0" />
                <span>
                  Your package is handed over to our trusted local courier
                  partners.
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-6 h-6 mr-2 mt-1 flex-shrink-0" />
                <span>
                  The courier delivers your package to the address you provided.
                </span>
              </li>
              <li className="flex items-start">
                <Leaf className="w-6 h-6 mr-2 mt-1 flex-shrink-0" />
                <span>
                  You receive your Alwan products and can begin your journey to
                  a more mindful lifestyle.
                </span>
              </li>
            </ol>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-medium mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="mb-12">
          <AccordionItem value="item-1">
            <AccordionTrigger>How can I track my order?</AccordionTrigger>
            <AccordionContent>
              Once your order ships, you&apos;ll receive a shipping confirmation
              SMS and email with a tracking number. You can use this number to
              track your package on our website or directly with the courier
              service.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do you offer same-day delivery?</AccordionTrigger>
            <AccordionContent>
              Currently, we don&apos;t offer same-day delivery. We strive to
              process and ship all orders within 1-2 business days to ensure
              careful packaging and handling of your Alwan products.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What if my package is lost or damaged?
            </AccordionTrigger>
            <AccordionContent>
              In the rare event that your package is lost or arrives damaged,
              please contact our customer support team within 48 hours of the
              expected delivery date. We&apos;ll work quickly to resolve the
              issue and ensure you receive your Alwan products in perfect
              condition.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can I change my shipping address after placing an order?
            </AccordionTrigger>
            <AccordionContent>
              If you need to change your shipping address, please contact us as
              soon as possible. We&apos;ll do our best to update the address if
              the order hasn&apos;t been processed yet. Once an order has
              shipped, we cannot change the delivery address.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center font-medium">
              <HelpCircle className="w-6 h-6 mr-2" />
              Need More Information?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              If you have any questions about our shipping policies or need
              assistance with your order, our customer support team is here to
              help.
            </p>
            <div className="flex flex-wrap space-x-4">
              <span className="text-sm py-1 px-2 border rounded-full">
                support.alwan@gmail.com
              </span>
              <span className="text-sm py-1 px-2 border rounded-full">
                +8801613980323
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </MaxWidth>
  );
}
