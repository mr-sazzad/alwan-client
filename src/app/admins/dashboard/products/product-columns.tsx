"use client";

import ProductForm from "@/components/admins/dashboard/products/product-form";
import AlertDialogComp from "@/components/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteSingleProductMutation } from "@/redux/api/products/productsApi";
import { IProduct, IReadCategory, IReadSize, IReadSizeVariant } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type Product = {
  id: string;
  name: string;
  category: IReadCategory;
  sizeVariants: IReadSizeVariant[];
  size: IReadSize;
  stockStatus: "AVAILABLE" | "OUT_OF_STOCK";
};

const ProductTableColumns = () => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>();
  const [deleteSingleProduct, { isLoading }] = useDeleteSingleProductMutation();
  const path = "/admins/dashboard/products";

  const deleteProductHandler = async (id: string) => {
    const result = await deleteSingleProduct(id);
  };

  const columns: ColumnDef<IProduct>[] = [
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
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category.name || "N/A"}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>{row.original.sizeVariants[0]?.price}</span>,
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: ({ row }) => <span>{row.original.sizeVariants[0]?.size.name}</span>,
    },
    {
      accessorKey: "stockStatus",
      header: "Stock Status",
      cell: ({ row }) => <span>{row.original.stockStatus}</span>,
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
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`${path}/${id}`} className="flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setDialogOpen(true), setProduct(row.original);
                  }}
                >
                  <PencilLine className="w-4 h-4 mr-2" />
                  Update product
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setOpen(true)}>
                  <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                  Delete product
                </DropdownMenuItem>
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
              buttonText="Continue"
            />

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent className="max-w-5xl">
                <div className="h-[85vh] overflow-y-auto hide-scrollbar mt-5 px-1">
                  <ProductForm
                    mode="update"
                    setOpen={setDialogOpen}
                    product={product}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];

  return columns;
};

export default ProductTableColumns;
