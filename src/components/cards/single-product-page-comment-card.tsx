import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

// react icons
import { RiSearchLine } from "react-icons/ri";

const ReviewsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
        <CardDescription>
          Displaying only the latest reviews in this section for your
          convenience.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1 flex flex-col items-center gap-2 text-gray-500">
          <RiSearchLine size={20} />
          <p className="text-sm">Reviews Not Available</p>
        </div>
      </CardContent>
      <CardFooter>
        <div>
          <h1 className="text-xl font-semibold">AlWAN</h1>
          <p className="text-sm text-gray-500">clothing brand</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReviewsCard;
