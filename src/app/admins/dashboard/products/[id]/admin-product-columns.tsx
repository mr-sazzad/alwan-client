import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "../../../../../components/admins/dashboard/products/data-table";
import { IColor, ISize, ISizeVariant } from "../../../../../types";

export type ProductType = {
  id: string;
  size: ISize;
  color: IColor;
  price: number;
  manufacturingCost: number;
  stock: number;
};

export type AdminProductTableProps = {
  data: ISizeVariant[];
};

const AdminProductTable = ({ data }: AdminProductTableProps) => {
  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "size",
      header: "Size",
      cell: ({ row }) => (
        <div className="flex items-center">{row.original.size.name}</div>
      ),
    },
    {
      accessorKey: "color",
      header: "Color",
      cell: ({ row }) => (
        <div className="flex items-center">{row.original.color.name}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `${row.original.price}`,
    },
    {
      accessorKey: "manufacturingCost",
      header: "Cost",
      cell: ({ row }) => `${row.original.manufacturingCost}`,
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "profit",
      header: "Profit",
      cell: ({ row }) =>
        `${row.original.price - row.original.manufacturingCost}`,
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default AdminProductTable;
