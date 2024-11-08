import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiSearchLine } from "react-icons/ri";

const ReviewsCard = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted pb-6">
        <CardTitle className="text-xl font-medium">Customer Reviews</CardTitle>
        <CardDescription className="text-sm mt-1">
          Displaying the latest reviews for your convenience.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center space-y-4 py-8 px-4 bg-accent rounded-lg">
          <RiSearchLine size={40} className="text-muted-foreground" />
          <p className="text-lg font-medium text-muted-foreground">
            No Reviews Available Yet
          </p>
          <p className="text-sm text-center text-muted-foreground max-w-md">
            Be the first to share your thoughts on this product and help others
            make informed decisions.
          </p>
          <Button className="mt-2">Write a Review</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewsCard;
