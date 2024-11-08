"use client";

import ColorDrawer from "@/components/admins/dashboard/color/create-color-drawer";
import { DataTable } from "@/components/admins/dashboard/products/data-table";
import AlertDialogComp from "@/components/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { useDeleteColorMutation } from "@/redux/api/color/color-api";
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const [color, setColor] = useState<Color>();
  const [deleteColor, { isLoading }] = useDeleteColorMutation();

  const handleColorDelete = async () => {
    const result: any = await deleteColor(colorId);

    if (!result?.data.success) {
      toast({
        title: "Error",
        description:
          "An error occurred while attempting to delete the color. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "The color was successfully deleted from your collection.",
      });
    }
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
      cell: ({ row }) => (
        <div className="inline-flex items-center bg-violet-100 text-violet-600 px-2 py-1 rounded-md">
          <span className="w-2 h-2 rounded bg-violet-600 mr-2" />
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "hexCode",
      header: "Color",
      cell: ({ getValue }) => {
        const hexCode = getValue() as string;
        return (
          <>
            <div className="flex items-center space-x-1">
              <div
                className="w-12 h-5 rounded border border-gray-300"
                style={{ backgroundColor: hexCode }}
                aria-hidden="true"
              />
            </div>
          </>
        );
      },
    },
    {
      accessorKey: "hexCode",
      header: "Hex Code",
      cell: ({ row }) => {
        return (
          <>
            <div className="flex items-center space-x-1">
              <div className="bg-teal-100 text-teal-600 px-2 py-1 rounded">
                {row.original.hexCode.toUpperCase()}
              </div>
            </div>
          </>
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
                <DropdownMenuLabel className="px-2 font-medium">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setOpen(true);
                    setColor(row.original);
                  }}
                >
                  Update Color
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setDialogOpen(true);
                    setColorId(row.original.id);
                  }}
                >
                  Delete Color
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
      <DataTable columns={columns} data={colors} filterColumn="name" />

      <ColorDrawer open={open} setOpen={setOpen} color={color} />

      <AlertDialogComp
        open={dialogOpen}
        setOpen={setDialogOpen}
        handler={handleColorDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this color? This action cannot be undone."
        buttonText="Remove"
        className="bg-destructive hover:bg-destructive/70"
        loading={isLoading}
      />
    </div>
  );
};

export default ColorTableColumns;
