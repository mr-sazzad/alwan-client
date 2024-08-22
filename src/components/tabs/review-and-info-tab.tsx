import ReviewsCard from "../cards/single-product-page-comment-card";
import InformationCard from "../cards/single-product-page-info-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const ReviewAndInfoTab = () => {
  return (
    <Tabs defaultValue="information" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="information" className="font-semibold">
          Information
        </TabsTrigger>
        <TabsTrigger value="comments" className="font-semibold">
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="information">
        <InformationCard />
      </TabsContent>
      {/* second tab */}
      <TabsContent value="comments">
        <ReviewsCard />
      </TabsContent>
    </Tabs>
  );
};

export default ReviewAndInfoTab;
