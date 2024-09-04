import { DataTable } from "@/components/admins/dashboard/products/data-table";
import AlertDialogComp from "@/components/alert-dialog/alert-dialog";
import CategoryDetailsDrawer from "@/components/categories/category-details-drawer";
import CategoryDrawer from "@/components/categories/category-drawer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "@/redux/api/categoies/categoriesApi";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import React, { useState } from "react";

export type Category = {
  id: string;
  name: string;
  parentId: string;
  isLeaf: boolean;
  isNavigational: boolean;
  parent: {
    id: string;
    name: string;
  } | null;
};

interface CategoryTableColumnsProps {
  categories: Category[];
}

const CategoryTableColumns: React.FC<CategoryTableColumnsProps> = ({
  categories,
}) => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const { data: category, isLoading: isCategoryLoading } =
    useGetCategoryQuery(categoryId);

  const handleDetailsClick = (id: string) => {
    setOpen(true);
    setCategoryId(id);
  };

  const handleCategoryDelete = async () => {
    const response: any = await deleteCategory(categoryId);

    if (!response.data.success) {
      toast({
        title: "Error occurred",
        description: "Failed to delete category. Please try again later.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Category deleted",
        description: "Category has been deleted successfully.",
      });
      setDialogOpen(false);
    }
  };

  const columns: ColumnDef<Category>[] = [
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
      accessorKey: "parent.name",
      header: "Parent",
      cell: ({ row }) =>
        row.original.parent ? row.original.parent.name : "not available",
    },
    {
      accessorKey: "isLeaf",
      header: "Is Leaf",
      cell: ({ row }) => (row.original.isLeaf ? "Yes" : "No"),
    },
    {
      accessorKey: "isNavigational",
      header: "Is Navigation",
      cell: ({ row }) => (row.original.isNavigational ? "Yes" : "No"),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const id = row.original.id;

        return (
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
              <DropdownMenuItem onClick={() => handleDetailsClick(id)}>
                Category Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUpdateDialogOpen(true);
                  setCategoryId(id);
                }}
              >
                Update Category
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDialogOpen(true);
                  setCategoryId(id);
                }}
              >
                Remove Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={categories} filterColumn="name" />

      <CategoryDetailsDrawer
        open={open}
        setOpen={setOpen}
        category={category?.data}
        loading={isCategoryLoading}
      />

      <CategoryDrawer
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        categories={categories}
        mode="update"
        categoryId={categoryId}
      />

      <AlertDialogComp
        open={dialogOpen}
        setOpen={setDialogOpen}
        handler={handleCategoryDelete}
        title="Remove Category?"
        description="Do you want to Remove this category?"
        buttonText="Remove"
        className="bg-destructive hover:bg-destructive/70"
        loading={isLoading}
      />
    </div>
  );
};

export default CategoryTableColumns;
