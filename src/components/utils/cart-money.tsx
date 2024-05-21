interface CartMoneyProps {
  prices: number[];
  className?: string;
}

const CartMoney = ({ prices, className }: CartMoneyProps) => {
  return (
    <div className={`flex flex-row gap-3 ${className}`}>
      {prices.length > 1 ? (
        <div className="flex gap-1 items-end">
          <p className="text-[15px] font-medium flex items-center gap-1">
            TK.
            {prices[1]}
          </p>
          <p className="text-xs line-through flex items-center">
            TK.
            {prices[0]}
          </p>
        </div>
      ) : (
        <p className="text-[15px] font-medium flex items-center gap-1">
          TK.
          {prices[0]}
        </p>
      )}
    </div>
  );
};

export default CartMoney;
