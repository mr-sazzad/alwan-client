"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CopyIcon, EyeIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useCallback } from "react";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { useToast } from "../../../../components/ui/use-toast";
import { IUser } from "../../../../types";

const path = "/admins/dashboard/users";

const UserColumns = () => {
  const { toast } = useToast();

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).then(
        () => {
          toast({
            title: "Copied!",
            description: "User ID has been copied to clipboard.",
          });
        },
        (err) => {
          console.error("Could not copy text: ", err);
          toast({
            title: "Error",
            description: "Failed to copy User ID.",
            variant: "destructive",
          });
        }
      );
    },
    [toast]
  );
  // Column definitions for the DataTable
  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        const typeId = row.original.id;
        const truncatedSizeId = `${typeId.slice(0, 6)}...${typeId.slice(-5)}`;
        return (
          <span className="inline-flex items-center  dark:bg-gray-900 text-emerald-500 px-2 py-1 rounded-md">
            {truncatedSizeId}
          </span>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        return (
          <span className="text-muted-foreground">{row.getValue("email")}</span>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role;
        return (
          <span className="inline-flex items-center dark:bg-gray-900 text-rose-500 px-2 py-1 rounded-md">
            {role}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        return new Date(row.getValue("createdAt")).toLocaleDateString();
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

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
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <EyeIcon className="w-4 h-4 mr-2" />
                <Link href={`${path}/${user.id}`}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => copyToClipboard(user.id)}>
                <CopyIcon className="w-4 h-4 mr-2" />
                Copy User Id
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};

export default UserColumns;
