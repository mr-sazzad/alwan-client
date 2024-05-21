import React from "react";
import { IconType } from "react-icons";

interface CardProps {
  title: string;
  Icon: IconType;
  content: string;
  stats: number | string;
  className?: string;
}

// Card component
const AdminCardComponent: React.FC<CardProps> = ({
  title,
  Icon,
  content,
  stats,
  className,
}) => {
  return (
    <div className="border border-black/30 rounded-lg p-5 flex-grow sm:flex-basis-[calc(50%-1rem)] md:flex-basis-[calc(33.333%-1rem)] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="font-bold">{title}</p>
        <Icon className={className} />
      </div>
      <div>
        <p className="text-xl font-bold flex items-center">
          +{" "}
          {typeof stats === "number" && stats < 10000
            ? `${"0".repeat(5 - String(stats).length)}${stats}`
            : stats}
        </p>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default AdminCardComponent;
