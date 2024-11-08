"use client";

import { DataTable } from "@/components/admins/dashboard/products/data-table";
import SizeDrawer from "@/components/admins/dashboard/sizes/size-drawer";
import AlertDialogComp from "@/components/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { useDeleteSizeMutation } from "@/redux/api/size/size-api";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";

export type Size = {
  id: string;
  name: string;
};

interface SizeTableColumnsProps {
  sizes: Size[];
}

const SizeTableColumns: React.FC<SizeTableColumnsProps> = ({ sizes }) => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [size, setSize] = useState<Size>();

  const [deleteSize, { isLoading }] = useDeleteSizeMutation();

  const handleSizeDelete = async () => {
    try {
      const response: any = await deleteSize(size?.id);

      if (!response.data.success) {
        toast({
          title: "Error",
          description: "Failed to delete size. Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Size has been deleted successfully.",
        });
        setOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete size. Error: ${error.message}`,
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const columns: ColumnDef<Size>[] = [
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
      cell: ({ row }) => {
        return (
          <div className="inline-flex items-center bg-orange-100 text-orange-600 px-2 py-1 rounded-md">
            <span className="w-2 h-2 rounded bg-orange-600 mr-2" />
            <span>{row.original.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: "Size ID",
      cell: ({ row }) => {
        const sizeId = row.original.id;
        const truncatedSizeId = `${sizeId.slice(0, 6)}...${sizeId.slice(-5)}`;
        return (
          <span className="inline-flex items-center bg-fuchsia-100 text-fuchsia-600 px-2 py-1 rounded-md">
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
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="px-2 font-medium">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setOpen(true), setSize(row.original);
                  }}
                >
                  <PencilLine className="w-4 h-4 mr-2" />
                  Update size
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setDialogOpen(true);
                    setSize(row.original);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                  Delete size
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
      <DataTable columns={columns} data={sizes} filterColumn="name" />
      <SizeDrawer open={open} setOpen={setOpen} size={size} />

      <AlertDialogComp
        open={dialogOpen}
        setOpen={setDialogOpen}
        handler={handleSizeDelete}
        buttonText="Delete"
        title="Delete Size?"
        description="Are you sure you want to delete this size? This action cannot be undone."
        loading={isLoading}
      />
    </div>
  );
};

export default SizeTableColumns;
