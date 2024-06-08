import { ITShirt } from "@/types";
import React, { useEffect, useState } from "react";
import CouponCodeModal from "../modals/coupon-code-modals";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { PiSpinner } from "react-icons/pi";

interface CheckOutPageBillingInfoProps {
  products: ITShirt[];
  city: string;
  qty?: number;
  handlePlaceOrder: () => void;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
  buttonLoading: boolean;
}

const CheckOutPageBillingInfo: React.FC<CheckOutPageBillingInfoProps> = ({
  products,
  city,
  qty,
  handlePlaceOrder,
  setTotalPrice,
  totalPrice,
  buttonLoading,
}) => {
  const [subTotal, setSubTotal] = useState<number>(0);
  const [charge, setCharge] = useState<number>(0);
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [couponId, setCouponId] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  useEffect(() => {
    let sTotal = 0;

    products.forEach((product) => {
      const price =
        product.prices.length > 1 ? product.prices[1] : product.prices[0];
      const orderQty = qty || product.orderQty;
      sTotal += price * orderQty;
    });

    setSubTotal(sTotal);

    // Update charge based on city
    const newCharge = city === "dhaka" ? 70 : 130;
    setCharge(newCharge);
  }, [products, qty, city]);

  useEffect(() => {
    // Calculate the discount amount
    const discountAmount = subTotal * (discountPercentage / 100);

    // Calculate the discounted subtotal
    const discountedSubTotal = subTotal - discountAmount;

    // Calculate the total price with the discount applied
    const total = discountedSubTotal + charge;

    // Set the total price
    setTotalPrice(total);
  }, [subTotal, charge, discountPercentage, setTotalPrice]);

  const handleCouponApply = (id: string, discount: number) => {
    setCouponId(id);
    setDiscountPercentage(discount);
  };

  return (
    <>
      <div className="flex flex-col">
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <p>Sub Total:</p> <p>{subTotal} TK</p>
        </div>
        <Separator className="my-4" />
        {couponId && discountPercentage && (
          <>
            <div className="flex justify-between items-center">
              <p>Discount:</p>
              <p className="text-destructive">
                - {subTotal * (discountPercentage / 100)} TK
              </p>
            </div>
            <Separator className="my-4" />
          </>
        )}
        <div className="flex justify-between items-center">
          <p>Delivery:</p> <p>{charge} TK</p>
        </div>
        <Separator className="my-4" />

        <div className="flex justify-between items-center">
          <p>Total:</p>
          <p>{totalPrice} TK</p>
        </div>
        <Separator className="my-4" />
        <div className="flex sm:flex-row sm:justify-between flex-col-reverse">
          <div className="flex gap-2 items-center sm:mt-0 mt-2 sm:jusify-start">
            <p className="text-sm text-muted-foreground">
              Do you have a coupon code?
            </p>
            <Button
              variant="link"
              size="sm"
              className="text-sm"
              onClick={() => setCouponModalOpen(true)}
            >
              Apply Coupon
            </Button>
          </div>
          <Button
            onClick={handlePlaceOrder}
            disabled={buttonLoading}
            className="min-w-[107px]"
          >
            {buttonLoading ? (
              <PiSpinner size={20} className="animate-spin" />
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </div>
      <CouponCodeModal
        open={couponModalOpen}
        setOpen={setCouponModalOpen}
        onCouponApply={handleCouponApply}
      />
    </>
  );
};

export default CheckOutPageBillingInfo;
