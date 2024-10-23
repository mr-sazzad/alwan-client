"use client";

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
import { useDeleteFeedbackMutation } from "@/redux/api/feedback/feedbackApi";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { FaRegMeh, FaRegSadTear, FaRegSmile } from "react-icons/fa";

export type Feedback = {
  id: string;
  message: string;
  rating: number;
  createdAt: string;
};

interface FeedbacksColumnsProps {
  feedbacks: Feedback[];
}

export const FeedbacksColumns = ({ feedbacks }: FeedbacksColumnsProps) => {
  const [open, setOpen] = useState(false);
  const [feedbackId, setFeedbackId] = useState("");
  const [deleteFeedback, { isLoading }] = useDeleteFeedbackMutation();

  const handleDeleteClick = async () => {
    try {
      const result = await deleteFeedback(feedbackId).unwrap();

      if (result.success) {
        toast({
          title: "Feedback Deleted",
          description: "The feedback was successfully removed.",
        });
      } else {
        toast({
          title: "Deletion Failed",
          description: "Unable to delete feedback. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<Feedback>[] = [
    {
      accessorKey: "message",
      header: "Message",
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = row.getValue("rating") as number;
        let Icon;
        let color;

        switch (rating) {
          case 1:
            Icon = FaRegSadTear;
            color = "text-red-500";
            break;
          case 2:
            Icon = FaRegMeh;
            color = "text-yellow-500";
            break;
          case 3:
            Icon = FaRegSmile;
            color = "text-green-500";
            break;
          default:
            Icon = FaRegMeh;
            color = "text-gray-500";
        }

        return <Icon className={`h-5 w-5 ${color}`} />;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return format(date, "PP");
      },
    },
    {
      id: "Actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-medium">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true), setFeedbackId(row.original.id);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Feedback
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={feedbacks} filterColumn="rating" />

      <AlertDialogComp
        open={open}
        setOpen={setOpen}
        buttonText="Confirm"
        title="Delete Feedback?"
        description="Are you sure you want to delete this feedback? This action cannot be undone."
        handler={handleDeleteClick}
      />
    </div>
  );
};
