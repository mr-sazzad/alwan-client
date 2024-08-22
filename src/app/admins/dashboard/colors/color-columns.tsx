"use client";

import { DataTable } from "@/components/admins/dashboard/products/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export type Color = {
  id: string;
  name: string;
  hexCode: string;
};

interface ColorTableColumnsProps {
  colors: Color[];
}

const ColorTableColumns: React.FC<ColorTableColumnsProps> = ({ colors }) => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const handleDetailsClick = (id: string) => {
    setOpen(true);
    setCategoryId(id);
  };

  const columns: ColumnDef<Color>[] = [
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
      accessorKey: "hexCode",
      header: "Hex Code",
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
                <DropdownMenuItem onClick={() => handleDetailsClick(id)}>
                  Update
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={colors} filterColumn="name" />

      {/* <CategoryDetailsDrawer open={open} setOpen={setOpen} id={Id} /> */}
    </div>
  );
};

export default ColorTableColumns;
