import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const InrormationCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Information</CardTitle>
        <CardDescription>
          Essential information for your purchase.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-3">
          <p className="text-gray-600">
            At Alwan, we are committed to providing you with the highest quality
            apparel. If you receive an item that is damaged, defective, or not
            up to your expectations, please let us know. Once we verify the
            issue, we will happily accept the return and send you a replacement
            at no extra cost.
          </p>

          <p className="text-gray-600">
            Whether it&apos;s a tear, a stain, or any other flaw, we stand by
            our promise to deliver the best clothing experience. Your
            satisfaction is our top priority, and we strive to ensure you always
            look and feel your best in our products.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InrormationCard;
