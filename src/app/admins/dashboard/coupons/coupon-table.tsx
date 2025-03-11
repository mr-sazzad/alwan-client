"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { DataTable } from "../../../../components/admins/dashboard/products/data-table";
import AlertDialogComp from "../../../../components/alert-dialog/alert-dialog";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Separator } from "../../../../components/ui/separator";
import { toast } from "../../../../components/ui/use-toast";
import { useDeleteCouponMutation } from "../../../../redux/api/coupon/couponApi";
import { CouponSchema } from "../../../../schemas/admins/coupon-schema";

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
  const [couponId, setCouponId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

  const handleCouponDelete = async () => {
    const result: any = await deleteCoupon(couponId);

    if (!result.data.success) {
      toast({
        title: "Error occurred",
        description: "Failed to delete coupon. Please try again later.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Coupon deleted",
        description: "Coupon has been deleted successfully.",
      });
      setCouponId("");
      setOpen(false);
    }
  };

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
      cell: ({ row }) => (
        <div className="inline-flex items-center bg-violet-100 text-violet-600 px-2 py-1 rounded-md">
          <span className="w-2 h-2 rounded bg-violet-600 mr-2" />
          <span>{row.original.code}</span>
        </div>
      ),
    },
    {
      accessorKey: "discountType",
      header: "DSC Type",
      cell: ({ row }) => (
        <div className="inline-flex items-center bg-sky-100 text-sky-600 px-2 py-1 rounded-md">
          <span>{row.original.discountType}</span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="inline-flex items-center bg-sky-100 text-sky-600 px-2 py-1 rounded-md">
          <span>{row.original.type}</span>
        </div>
      ),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        const date = new Date(row.original.endDate);
        return (
          <span className="inline-flex items-center bg-pink-100 text-pink-600 px-2 py-1 rounded-md">
            {`${date.toLocaleDateString("en-GB")}`}
          </span>
        );
      },
    },
    {
      accessorKey: "minOrderValue",
      header: "Min Order",
      cell: ({ row }) => (
        <div className="inline-flex items-center bg-sky-100 text-sky-600 px-2 py-1 rounded-md">
          <span>{row.original.minOrderValue}</span>
        </div>
      ),
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
                <Eye className="mr-2 h-4 w-4" />
                Coupon Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdateCoupon(coupon)}>
                <Edit className="mr-2 h-4 w-4" />
                Update Coupon
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true), setCouponId(row.original.id);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Coupon
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <div className="px-1 hide-scrollbar">
        <DataTable columns={columns} data={coupons} />
      </div>

      <AlertDialogComp
        open={open}
        setOpen={setOpen}
        handler={handleCouponDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this color? This action cannot be undone."
        buttonText="Remove"
        className="bg-destructive hover:bg-destructive/70"
        loading={isDeleting}
      />
    </>
  );
};

export default CouponTableColumns;
