import { IconType } from "react-icons";

interface IItemType {
  id: number;
  icon: IconType;
  label: string;
}

interface IItems {
  items: IItemType[];
}

const WhatWeOffer: React.FC<IItems> = ({ items }) => {
  return (
    <div className="w-full pb-2">
      <div className="flex justify-center gap-2 w-full">
        {items.map((item) => (
          <div
            className="flex flex-col items-center border rounded border-dashed text-muted-foreground p-2 hover:bg-gray-100 hover:font-semibold transition group border-gray-400 hover:border-gray-100 w-full"
            key={item.id}
          >
            <div className="p-2 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-full">
              <item.icon
                size={26}
                className="group-hover:scale-75 transition-all duration-75"
              />
            </div>
            <p className="md:text-base group-hover:font-medium text-sm group-hover:scale-90 duration-75 tracking-tight mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;
