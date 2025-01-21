"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ClipboardEdit,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { DataTable } from "../../../../components/admins/dashboard/products/data-table";
import AlertDialogComp from "../../../../components/alert-dialog/alert-dialog";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { toast } from "../../../../components/ui/use-toast";
import { useDeleteHomePageTextMutation } from "../../../../redux/api/home-page-text/home-page-text-api";
import { ICategory } from "../../../../types";

export type HomeText = {
  id: string;
  title: string;
  text: string;
  buttonText: string;
  categoryId: string;
  category: ICategory;
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
          <div className="inline-flex items-center text-emerald-600 px-2 py-1 rounded-md">
            <span>{row.original.buttonText}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "category.name",
      header: "Explore Category",
      cell: ({ row }) => (
        <span className="inline-flex items-center p-2 rounded gap-2 text-emerald-600">
          <div className="bg-emerald-800 h-2 w-2 rounded-full" />
          <span>{row.original.category?.name ?? "No Category"}</span>
        </span>
      ),
    },
    {
      accessorKey: "text",
      header: "Description",
      cell: ({ row }) => (
        <span className="inline-flex items-center p-2 rounded gap-2 text-gray-700">
          <span>{row.original.text}</span>
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
              <DropdownMenuItem
                onClick={() => onUpdateText(text)}
                className="flex items-center gap-2"
              >
                <ClipboardEdit className="w-4 h-4" />
                <p>Update Home Text</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true), setTextId(row.original.id);
                }}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <p>Delete Home Text</p>
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
