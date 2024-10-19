"use client";

import { DataTable } from "@/components/admins/dashboard/products/data-table";
import AlertDialogComp from "@/components/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useDeleteHomePageTextMutation } from "@/redux/api/home-page-text/home-page-text-api";
import { IReadCategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export type HomeText = {
  id: string;
  title: string;
  text: string;
  buttonText: string;
  categoryId: string;
  category: IReadCategory;
};

export type HomeTextTableProps = {
  texts: HomeText[];
  onUpdateText: (text: HomeText) => void;
};

const HomeTextTable = ({ texts, onUpdateText }: HomeTextTableProps) => {
  const [textId, setTextId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const [deleteHomePageText, { isLoading: isDeleting }] =
    useDeleteHomePageTextMutation();

  const handleTextDelete = async () => {
    const result: any = await deleteHomePageText(textId);

    if (!result.data.success) {
      toast({
        title: "Error occurred",
        description: "Failed to delete coupon. Please try again later.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Coupon deleted",
        description: "Coupon has been deleted successfully.",
      });
      setTextId("");
      setOpen(false);
    }
  };

  const columns: ColumnDef<HomeText>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "buttonText",
      header: "BTN Text",
      cell: ({ row }) => {
        return (
          <div className="inline-flex items-center bg-fuchsia-100 text-fuchsia-600 px-2 py-1 rounded-md">
            <span>{row.original.buttonText}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "category.name",
      header: "Explore Category",
      cell: ({ row }) => (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#e0f7fa",
            padding: "4px 8px",
            borderRadius: "4px",
            gap: "6px",
          }}
        >
          <div
            style={{
              backgroundColor: "#00796b",
              height: "8px",
              width: "8px",
              borderRadius: "50%",
            }}
          />
          <span>{row.original.category?.name ?? "No Category"}</span>
        </span>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const text = row.original;

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
              <DropdownMenuItem onClick={() => onUpdateText(text)}>
                Update Home Text
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true), setTextId(row.original.id);
                }}
              >
                Delete Home Text
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <div className="px-1 hide-scrollbar">
        <DataTable columns={columns} data={texts} filterColumn="title" />
      </div>

      <AlertDialogComp
        open={open}
        setOpen={setOpen}
        handler={handleTextDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this? This action cannot be undone."
        buttonText="Remove"
        loading={isDeleting}
      />
    </>
  );
};

export default HomeTextTable;
