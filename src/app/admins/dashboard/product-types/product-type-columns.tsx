"use client";

import ProductTypeDrawer from "@/components/admins/dashboard/product-types/product-type-drawer";
import { DataTable } from "@/components/admins/dashboard/products/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IReadProductType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";

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
  const [productType, setProductType] = useState<IReadProductType>();

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
    },
    {
      accessorKey: "id",
      header: "Type Id",
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
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setOpen(true);
                      setProductType(row.original);
                    }}
                  >
                    Update Product Type
                  </Button>
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
      <DataTable columns={columns} data={productTypes} filterColumn="name" />
      <ProductTypeDrawer
        open={open}
        setOpen={setOpen}
        productType={productType}
      />
    </div>
  );
};

export default ProductTypeColumns;
