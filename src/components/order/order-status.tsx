import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type OrderStatusType = "CONFIRM" | "CANCELLED";

const statusConfig: Record<OrderStatusType, { color: string }> = {
  CONFIRM: {
    color: "bg-emerald-100 text-emerald-600",
  },
  CANCELLED: {
    color: "bg-pink-100 text-pink-600",
  },
};

interface OrderStatusProps {
  status: OrderStatusType;
  onStatusChange: (newStatus: OrderStatusType) => void;
  isLoading?: boolean;
}

export default function OrderStatus({
  status,
  onStatusChange,
  isLoading = false,
}: OrderStatusProps) {
  const handleStatusChange = (newStatus: OrderStatusType) => {
    if (newStatus !== status) {
      onStatusChange(newStatus);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-[160px] justify-between",
            statusConfig[status].color
          )}
          disabled={isLoading}
        >
          <span className="flex items-center gap-2">{status}</span>
          <svg
            className="h-4 w-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[140px]">
        {Object.entries(statusConfig).map(([key, { color }]) => (
          <DropdownMenuItem
            key={key}
            onSelect={() => handleStatusChange(key as OrderStatusType)}
            className={cn(
              "flex items-center justify-between",
              status === key && "bg-accent"
            )}
          >
            <span>{key}</span>
            {status === key && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
