import React from "react";

interface SizeVariant {
  price: number;
}

interface CartMoneyProps {
  sizeVariants: SizeVariant[];
  className?: string;
}

const CartMoney: React.FC<CartMoneyProps> = ({ sizeVariants, className }) => {
  const prices = sizeVariants.map((variant) => variant.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <div className={`flex flex-row gap-3 ${className}`}>
      <div className="flex gap-1 items-end">
        <p className="text-[15px] font-medium flex items-center gap-1">
          TK. {minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`}
        </p>
      </div>
    </div>
  );
};

export default CartMoney;
