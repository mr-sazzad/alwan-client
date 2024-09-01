import CheckOutPageBillingInfo from "@/components/cards/checkout-page-billing-info";
import { IUserCartProduct } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface OrderSummaryProps {
  products: IUserCartProduct[];
  district: string;
  handlePlaceOrder: () => void;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  setShippingCost: Dispatch<SetStateAction<number>>;
  totalPrice: number;
  buttonLoading: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  products,
  district,
  handlePlaceOrder,
  setTotalPrice,
  setShippingCost,
  totalPrice,
  buttonLoading,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg mb-4">Order Summary</h3>
      <CheckOutPageBillingInfo
        products={products}
        district={district}
        handlePlaceOrder={handlePlaceOrder}
        setTotalPrice={setTotalPrice}
        setShippingCost={setShippingCost}
        totalPrice={totalPrice}
        buttonLoading={buttonLoading}
      />
    </div>
  );
};

export default OrderSummary;
