"use client";

import { DataTable } from "@/components/admins/dashboard/products/data-table";
import DeleteSizeDialog from "@/components/admins/dashboard/sizes/delete-alert-dialog";
import SizeUpdateDrawer from "@/components/admins/dashboard/sizes/size-update-drawer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export type Sizes = {
  id: string;
  name: string;
};

interface SizeTableColumnsProps {
  sizes: Sizes[];
}

const SizeTableColumns: React.FC<SizeTableColumnsProps> = ({ sizes }) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [sizeId, setSizeId] = useState("");

  const handleSizeUpdate = (id: string) => {
    setOpen(true);
    setSizeId(id);
  };

  const handleSizeDelete = (id: string) => {
    setDeleteOpen(true);
    setSizeId(id);
  };

  const columns: ColumnDef<Sizes>[] = [
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
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleSizeUpdate(id)}>
                  Update size
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSizeDelete(id)}>
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
      <SizeUpdateDrawer open={open} setOpen={setOpen} sizeId={sizeId} />

      <DeleteSizeDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        sizeId={sizeId}
      />
    </div>
  );
};

export default SizeTableColumns;
