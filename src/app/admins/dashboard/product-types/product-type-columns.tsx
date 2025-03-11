"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
import React, { useState } from "react";
import ProductTypeDrawer from "../../../../components/admins/dashboard/product-types/product-type-drawer";
import { DataTable } from "../../../../components/admins/dashboard/products/data-table";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { IProductType } from "../../../../types";

export type ProductType = {
  id: string;
  name: string;
};

interface ProductTypeColumnsProps {
  productTypes: ProductType[];
}

const ProductTypeColumns: React.FC<ProductTypeColumnsProps> = ({
  productTypes,
}) => {
  const [open, setOpen] = useState(false);
  const [productType, setProductType] = useState<IProductType>();

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="inline-flex items-center bg-violet-100 text-violet-600 px-2 py-1 rounded-md">
          <span className="w-2 h-2 rounded bg-violet-600 mr-2" />
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "Type Id",
      cell: ({ row }) => {
        const typeId = row.original.id;
        const truncatedSizeId = `${typeId.slice(0, 6)}...${typeId.slice(-5)}`;
        return (
          <span className="inline-flex items-center bg-teal-100 text-teal-600 px-2 py-1 rounded-md">
            {truncatedSizeId}
          </span>
        );
      },
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
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => (setOpen(true), setProductType(row.original))}
                >
                  <PencilLine className="w-4 h-4 mr-2" />
                  Update Product Type
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => (setOpen(true), setProductType(row.original))}
                >
                  <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                  Delete Product Type
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={productTypes} />
      <ProductTypeDrawer
        open={open}
        setOpen={setOpen}
        productType={productType}
      />
    </div>
  );
};

export default ProductTypeColumns;
