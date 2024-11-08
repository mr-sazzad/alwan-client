import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, RefreshCcw } from "lucide-react";

const InformationCard = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted pb-6">
        <CardTitle className="text-2xl font-medium">
          Product Information
        </CardTitle>
        <CardDescription className="text-sm mt-1">
          Essential details for your purchase
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            At Alwan, we are committed to providing you with the highest quality
            apparel. Your satisfaction is our top priority, and we strive to
            ensure you always look and feel your best in our products.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If you receive an item that doesn&apos;t meet your expectations,
            we&apos;re here to help. Our customer-friendly policies ensure a
            smooth and satisfactory shopping experience.
          </p>
        </div>
        <div className="grid gap-4 pt-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Quality Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                We stand behind the quality of every item we sell.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <RefreshCcw className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">
                07-day return policy for a full refund or exchange.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InformationCard;
