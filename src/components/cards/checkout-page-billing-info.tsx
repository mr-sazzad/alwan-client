"use client";
import { ITShirt } from "@/types";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

// Assuming ITShirt and other imports are correctly defined elsewhere

interface CheckOutPageBillingInfoProps {
  products: ITShirt[];
  city: string;
  qty?: number;
  handlePlaceOrder: () => void;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
}

const CheckOutPageBillingInfo: React.FC<CheckOutPageBillingInfoProps> = ({
  products,
  city,
  qty,
  handlePlaceOrder,
  setTotalPrice,
  totalPrice,
}) => {
  const [subTotal, setSubTotal] = useState<number>(0);
  const [charge, setCharge] = useState<number>(0);

  console.log(products, "CART PRODUCTS");

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
    setTotalPrice(subTotal + charge);
  }, [subTotal, charge, setTotalPrice]);

  return (
    <div className="flex flex-col">
      <Separator className="my-4" />
      <div className="flex justify-between items-center">
        <p>Sub Total:</p> <p>{subTotal}</p>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between items-center">
        <p>Delivary:</p> <p>{charge}</p>
      </div>
      <Separator className="my-4" />

      <div className="flex justify-between items-center">
        <p>Total:</p>
        <p>{totalPrice}</p>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-end">
        <Button onClick={handlePlaceOrder}>Place Order</Button>
      </div>
    </div>
  );
};

export default CheckOutPageBillingInfo;
