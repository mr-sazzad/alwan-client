"use client";

import AlertDialogComp from "@/components/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import { Expense } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

interface ExpensesColumnsProps {
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export const ExpensesColumns = ({
  onEdit,
  onDelete,
  isLoading,
}: ExpensesColumnsProps): ColumnDef<Expense>[] => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setExpenseToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (expenseToDelete) {
      onDelete(expenseToDelete);
      setIsDeleteDialogOpen(false);
      setExpenseToDelete(null);
    }
  };

  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("title")}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <span className="text-muted-foreground font-thin">
          {row.getValue("description")}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="bg-red-100 px-2 py-1 rounded text-red-600 flex items-center gap-1">
            {parseFloat(row.getValue("amount")).toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) =>
        format(new Date(row.getValue("createdAt")), "MMM dd, yyyy"),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDeleteClick(row.original.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      id: "deleteDialog",
      cell: () => (
        <AlertDialogComp
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          handler={handleConfirmDelete}
          title="Are you sure?"
          description="This action will permanently remove the selected expense from your records.
                Please note that once deleted, this information cannot be recovered. Are you certain you want to proceed?"
          buttonText="Delete"
          loading={isLoading}
        />
      ),
    },
  ];
};
