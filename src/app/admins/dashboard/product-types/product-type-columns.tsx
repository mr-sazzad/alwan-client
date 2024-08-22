"use client";

import UpdateProductType from "@/components/admins/dashboard/product-types/update-product-type";
import { DataTable } from "@/components/admins/dashboard/products/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const [productId, setProductId] = useState("");

  const handleUpdate = (id: string) => {
    setOpen(true);
    setProductId(id);
  };

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
                    onClick={() => handleUpdate(id)}
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
      <UpdateProductType
        open={open}
        setOpen={setOpen}
        productTypeId={productId}
      />
    </div>
  );
};

export default ProductTypeColumns;
