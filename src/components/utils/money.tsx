import * as React from "react";
interface MoneyProps {
  prices: number[];
  className?: string;
}

const Money = ({ prices, className }: MoneyProps) => {
  return (
    <div className={`flex flex-row gap-3 ${className}`}>
      {prices.length > 1 ? (
        <div className="flex gap-1 items-end">
          <p className="sm:text-2xl text-xl font-semibold flex items-center gap-1">
            TK.
            {prices[1]}
          </p>
          <p className="text-sm font-semibold line-through flex items-center mb-1">
            TK.
            {prices[0]}
          </p>
        </div>
      ) : (
        <p className="sm:text-2xl text-xl font-semibold flex items-center gap-1">
          TK.
          {prices[0]}
        </p>
      )}
    </div>
  );
};

export default Money;

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  }).format(amount);
}
