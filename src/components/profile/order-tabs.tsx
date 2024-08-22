import { IOrderResponse } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProfileOnDeliveredOrderItem from "./profile-delivered-order-item";
import ProfileOnTheWayOrderItem from "./profile-on-the-way-order-item";
import ProfileProcessingOrderItem from "./profile-processing-order-item";

interface IProfileOrderTabsProps {
  orders: IOrderResponse[];
}

const ProfileOrderTabs: React.FC<IProfileOrderTabsProps> = ({ orders }) => {
  return (
    <Tabs defaultValue="processing" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="processing">Prosessing</TabsTrigger>
        <TabsTrigger value="onTheWay">On The Way</TabsTrigger>
        <TabsTrigger value="delivered">Delivered</TabsTrigger>
      </TabsList>
      <TabsContent value="processing">
        <Card>
          <CardHeader>
            <CardTitle>Processing</CardTitle>
            <CardDescription>
              Please review and carefully cancel your processing orders.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[300px] overflow-y-auto hide-scrollbar">
            <div className="flex flex-col border rounded-md pt-2 px-2">
              {orders.map((order: IOrderResponse) => (
                <ProfileProcessingOrderItem
                  key={order.id}
                  items={order.items}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-muted-foreground text-sm pt-3">
              All of your processing orders
            </p>
          </CardFooter>
        </Card>
      </TabsContent>
      {/* on the way */}
      <TabsContent value="onTheWay">
        <Card>
          <CardHeader>
            <CardTitle>On The Way</CardTitle>
            <CardDescription>
              Your order is on its way! Track its journey and get ready for its
              arrival.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[300px] overflow-y-auto hide-scrollbar">
            <div className="flex flex-col border rounded-md pt-2 px-2">
              {orders.map((order: IOrderResponse) => (
                <ProfileOnTheWayOrderItem key={order.id} items={order.items} />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-muted-foreground text-sm">
              All of your on the way orders
            </p>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* delivered */}
      <TabsContent value="delivered">
        <Card>
          <CardHeader>
            <CardTitle>Delivered</CardTitle>
            <CardDescription>
              If you encounter any issues with your delivered orders, please
              return the products or leave a review. Your review is very helpful
              to us.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[300px] overflow-y-auto hide-scrollbar">
            <div className="flex flex-col border rounded-md pt-2 px-2">
              {orders.map((order: IOrderResponse) => (
                <ProfileOnDeliveredOrderItem
                  key={order.id}
                  items={order.items}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-muted-foreground text-sm">
              All of your delivered orders
            </p>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileOrderTabs;
