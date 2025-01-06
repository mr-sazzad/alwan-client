import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import AlertDialogComp from "../../../../components/alert-dialog/alert-dialog";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { toast } from "../../../../components/ui/use-toast";
import { useDeleteProductReviewMutation } from "../../../../redux/api/reviews/reviews-api";
import { IReview } from "../../../../types";

const ReviewsTableColumns = () => {
  const [deleteProductReview, { isLoading }] = useDeleteProductReviewMutation();
  const [open, setOpen] = useState(false);

  const deleteReviewHandler = async (id: string) => {
    const result: any = await deleteProductReview(id);

    if (!result.data.success) {
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Review deleted!",
      });
    }
  };

  const columns: ColumnDef<IReview>[] = [
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = row.original.rating || 0;

        const ratingColor =
          rating < 3
            ? "bg-red-100 text-red-600"
            : rating < 5
            ? "bg-yellow-100 text-yellow-600"
            : "bg-green-100 text-green-600";

        return (
          <span className={`${ratingColor} px-2 py-1 rounded-md`}>
            {rating || "N/A"}
          </span>
        );
      },
    },

    {
      accessorKey: "content",
      header: "Review",
      cell: ({ row }) => <span>{row.original.content}</span>,
    },
    {
      accessorKey: "userId",
      header: "UserId",
      cell: ({ row }) => {
        const userId = row.original.userId;
        const truncatedUserId = `${userId.slice(0, 6)}...${userId.slice(-5)}`;
        return <span>{truncatedUserId}</span>;
      },
    },
    {
      accessorKey: "productId",
      header: "Product Id",
      cell: ({ row }) => {
        const productId = row.original.productId;
        const truncatedProductId = `${productId.slice(
          0,
          6
        )}...${productId.slice(-5)}`;
        return <span>{truncatedProductId}</span>;
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
                <Button variant="outline" className="h-8 w-8 p-0 rounded-full">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setOpen(true)}>
                  Delete this Review
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogComp
              open={open}
              setOpen={setOpen}
              loading={isLoading}
              title="Confirm Review Deletion"
              description="This action is irreversible and will permanently remove the review from your inventory. Please note, we do not backup our database, so deleted reviews cannot be retrieved."
              handler={() => deleteReviewHandler(id)}
              buttonText="Continue"
            />
          </div>
        );
      },
    },
  ];

  return columns;
};

export default ReviewsTableColumns;
