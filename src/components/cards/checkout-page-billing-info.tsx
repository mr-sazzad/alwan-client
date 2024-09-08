import { IUserCartProduct } from "@/types";
import React, { useEffect, useState } from "react";
import CouponCodeModal from "../modals/coupon-code-modals";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface CheckOutPageBillingInfoProps {
  products: IUserCartProduct[];
  district: string;
  qty?: number;
  handlePlaceOrder: () => void;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setShippingCost: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
  buttonLoading: boolean;
}

const CheckOutPageBillingInfo: React.FC<CheckOutPageBillingInfoProps> = ({
  products,
  district,
  qty,
  setTotalPrice,
  setShippingCost,
  totalPrice,
}) => {
  const [subTotal, setSubTotal] = useState<number>(0);
  const [charge, setCharge] = useState<number>(0);
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [couponId, setCouponId] = useState<string | null>(null);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "FIXED">(
    "PERCENTAGE"
  );
  const [isDeliveryCoupon, setIsDeliveryCoupon] = useState<boolean>(false);
  const [isGlobalCoupon, setIsGlobalCoupon] = useState<boolean>(false);
  const [discountedAmount, setDiscountedAmount] = useState<number>(0);

  useEffect(() => {
    let amount = 0;

    products.forEach((product) => {
      const selectedVariant = product.sizeVariants.find(
        (variant) =>
          variant.size.name === product.orderSize &&
          variant.color.name === product.orderColor
      );

      if (selectedVariant) {
        const orderQty = qty || product.orderQty;
        amount += selectedVariant.price * orderQty;
      }
    });

    setSubTotal(amount);

    // Update charge based on city
    const shippingCharge = district === "dhaka" ? 70 : 130;
    setCharge(shippingCharge);
  }, [products, qty, district]);

  useEffect(() => {
    let discountAmount = 0;
    let discountedSubTotal = subTotal;
    let discountedCharge = charge;

    if (isGlobalCoupon) {
      discountAmount =
        discountType === "PERCENTAGE"
          ? subTotal * (discountValue / 100)
          : discountValue;
      discountedSubTotal = subTotal - discountAmount;
    } else if (isDeliveryCoupon) {
      discountAmount =
        discountType === "PERCENTAGE"
          ? charge * (discountValue / 100)
          : discountValue;
      discountedCharge = charge - discountAmount;
    }

    setDiscountedAmount(discountAmount);
    const total = discountedSubTotal + discountedCharge;

    setTotalPrice(discountedSubTotal);
    setTotal(total);
    setShippingCost(discountedCharge);
  }, [
    subTotal,
    charge,
    discountValue,
    discountType,
    isDeliveryCoupon,
    isGlobalCoupon,
    setShippingCost,
    setTotalPrice,
  ]);

  const handleCouponApply = (
    id: string,
    type: "PERCENTAGE" | "FIXED",
    value: number,
    isDeliveryCoupon: boolean,
    isGlobalCoupon: boolean
  ) => {
    setCouponId(id);
    setDiscountValue(value);
    setDiscountType(type);
    setIsDeliveryCoupon(isDeliveryCoupon);
    setIsGlobalCoupon(isGlobalCoupon);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <p>Sub Total:</p> <p>{subTotal} TK</p>
        </div>
        <Separator className="my-4" />
        {couponId && (
          <>
            <div className="flex justify-between items-center">
              <p>Discount:</p>
              <p className="text-destructive">
                -
                {discountType === "PERCENTAGE"
                  ? `${discountValue}%`
                  : `${discountValue} TK`}
              </p>
            </div>
            <Separator className="my-4" />
          </>
        )}
        <div className="flex justify-between items-center">
          <p>Shipping:</p> <p>{charge} TK</p>
        </div>
        <Separator className="my-4" />

        <div className="flex flex-col mb-4 font-semibold">
          <div className="flex justify-between items-center">
            <p>Total:</p>
            <div className="flex items-center gap-2">
              {discountValue > 0 && (
                <p className="text-destructive font-normal text-sm">
                  {`( ${discountedAmount} )`}
                </p>
              )}
              <p>{total} TK</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Do you have a coupon or promo code?
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
        </div>
        <div className="w-full mt-4">
          <Button className="w-full">Order Now</Button>
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
