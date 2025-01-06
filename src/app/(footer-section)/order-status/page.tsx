import { AlertCircle, CheckCircle, Home, Package, Truck } from "lucide-react";
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

export default function OrderProcess() {
  const orderStatuses = [
    {
      id: "processing",
      label: "Processing",
      icon: Package,
      description:
        "Your order has been received and is being prepared for shipment. This typically takes 1-2 business days.",
    },
    {
      id: "shipped",
      label: "Shipped",
      icon: Truck,
      description:
        "Your order has left our warehouse and is on its way to you. You'll receive a tracking number via email.",
    },
    {
      id: "outForDelivery",
      label: "Out for Delivery",
      icon: Home,
      description:
        "Your package is with the local delivery carrier and will be delivered today.",
    },
    {
      id: "delivered",
      label: "Delivered",
      icon: CheckCircle,
      description: "Your package has been delivered to the address provided.",
    },
  ];

  return (
    <MaxWidth className="mt-[100px]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-medium mb-8">
          Understanding Your Order Status
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-medium">Our Order Process</CardTitle>
            <CardDescription>
              At Alwan-ideal, we strive to make your shopping experience as
              smooth as possible. Here&apos;s how we process your order:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Order Received: We confirm your order and begin processing.
              </li>
              <li>
                Order Preparation: Our team carefully prepares your items for
                shipment.
              </li>
              <li>
                Quality Check: We perform a final inspection to ensure
                everything is perfect.
              </li>
              <li>
                Shipping: Your order is handed over to our shipping partners.
              </li>
              <li>
                Delivery: Your package is delivered to your specified address.
              </li>
            </ol>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-medium mb-4">Order Status Explained</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {orderStatuses.map((status) => (
            <Card key={status.id}>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <status.icon className="w-6 h-6 mr-2" />
                <CardTitle className="font-medium">{status.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{status.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-medium">Tracking Your Order</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Once your order is shipped, you&apos;ll receive a tracking number
              via email. You can use this number to track your package on our
              website or directly with the carrier. Please allow up to 24 hours
              for tracking information to become available after receiving your
              shipping confirmation.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-medium mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How long does it take to process my order?
            </AccordionTrigger>
            <AccordionContent>
              Most orders are processed within 1-2 business days. During peak
              seasons or promotional periods, processing may take up to 3
              business days.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Can I change or cancel my order?
            </AccordionTrigger>
            <AccordionContent>
              You can change or cancel your order within 1 hour of placing it.
              After that, we may have already begun processing, and changes may
              not be possible.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What if my order status hasn&apos;t updated in a while?
            </AccordionTrigger>
            <AccordionContent>
              If your order status hasn&apos;t updated in more than 3 business
              days, please contact our customer support team. We&apos;ll
              investigate and provide you with the most up-to-date information.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Do you offer expedited shipping?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we offer expedited shipping options at checkout. These
              options may vary depending on your location and the items in your
              order.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card>
          <CardHeader>
            <CardTitle className="font-medium">Need More Help?</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-2">
            <AlertCircle className="w-6 h-6" />
            <p>
              If you have any questions about your order status or our process,
              please don&apos;t hesitate to contact our customer support team.
            </p>
          </CardContent>
        </Card>
      </div>
    </MaxWidth>
  );
}
