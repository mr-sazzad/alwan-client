"use client";

import AlertDialogComp from "@/components/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type Order = {
  id: string;
  email: string;
  totalCost: number;
  phone: string;
  shippingCity: string;
};

const OrderTableColumns = () => {
  const [open, setOpen] = useState(false);

  const isLoading = false;

  const path = "/admins/dashboard/orders";

  const deleteProductHandler = async (id: string) => {
    //   const result = await deleteSingleProduct(id);
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "shippingCity",
      header: "Shipping City",
    },
    {
      accessorKey: "totalCost",
      header: "Total Amount",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href={`${path}/${id}`} passHref>
                    <Button variant="secondary">Order Details</Button>
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setOpen(true)}>
                  <Button variant="destructive" className="w-full">
                    Delete this product
                  </Button>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* alert dialog */}
            <AlertDialogComp
              open={open}
              setOpen={setOpen}
              loading={isLoading}
              title="Confirm Product Deletion"
              description="This action is irreversible and will permanently remove the product from your inventory. Please note, we do not backup our database, so deleted products cannot be retrieved."
              handler={() => deleteProductHandler(id)}
            />
          </div>
        );
      },
    },
  ];

  return columns;
};

export default OrderTableColumns;
