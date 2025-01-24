"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EyeIcon, MoreHorizontal, Package } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import CourierRatioChecker from "../../../../components/admins/dashboard/courier-ration-checker/courier-ratio-checker";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

export type OrderItem = {
  id: string;
  sizeId: string;
  colorId: string;
  quantity: number;
  returnQuantity: number;
  itemStatus: string;
  returnReason: string;
  returnNote: string;
  discountedPrice: number;
  orderId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: string;
  email: string;
  totalCost: number;
  phone: string;
  altPhone?: string;
  division: string;
  district: string;
  upazila: string;
  union: string;
  streetAddress: string;
  orderStatus: string;
  shippingMethod: string;
  createdAt: string;
  items: OrderItem[];
};

const OrderTableColumns = () => {
  const path = "/admins/dashboard/orders";

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
      cell: ({ row }) => {
        return <span className="text-sm">{row.getValue("email")}</span>;
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        return (
          <div className="flex gap-1 items-center">
            <span className="text-sm">{row.getValue("phone")}</span>
            <CourierRatioChecker phone={row.getValue("phone")} />
          </div>
        );
      },
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="text-xs">
            <p>{order.streetAddress}</p>
            <p>{`${order.union}, ${order.upazila}`}</p>
            <p>{`${order.district}, ${order.division}`}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "totalCost",
      header: "Total Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalCost"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "BDT",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => {
        const items = row.getValue("items") as OrderItem[];
        const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
        const formattedCount =
          totalItems < 10 ? `0${totalItems}` : `${totalItems}`;

        return (
          <div className="flex gap-1 items-center">
            <Package className="mr-1 h-3 w-3" />
            {formattedCount}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Order Date",
      cell: ({ row }) => {
        return (
          <span className="text-sm">
            {new Date(row.getValue("createdAt")).toLocaleDateString()}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;

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
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <EyeIcon className="w-4 h-4 mr-2" />
                <Link href={`${path}/${order.id}`}>View Details</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};

export default OrderTableColumns;
