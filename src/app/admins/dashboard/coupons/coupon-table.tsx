"use client";

import { DataTable } from "@/components/admins/dashboard/products/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { CouponSchema } from "@/schemas/admins/coupon-schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { z } from "zod";

export type Coupon = z.infer<typeof CouponSchema> & {
  id: string;
  usedCount: number;
};

interface CouponTableColumnsProps {
  coupons: Coupon[];
  onUpdateCoupon: (coupon: z.infer<typeof CouponSchema>) => void;
}

const CouponTableColumns = ({
  coupons,
  onUpdateCoupon,
}: CouponTableColumnsProps) => {
  const columns: ColumnDef<Coupon>[] = [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "discountType",
      header: "DSC Type",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        const date = new Date(row.original.endDate);
        return (
          <span className="text-muted-foreground">
            {`${date.toLocaleDateString("en-GB")}`}
          </span>
        );
      },
    },

    {
      accessorKey: "minOrderValue",
      header: "Min Order",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const coupon = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => console.log("View details", coupon.id)}
              >
                Coupon Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdateCoupon(coupon)}>
                Update Coupon
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                onClick={() => console.log("Delete", coupon.id)}
              >
                Delete Coupon
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="px-1 hide-scrollbar">
      <DataTable columns={columns} data={coupons} filterColumn="code" />
    </div>
  );
};

export default CouponTableColumns;
