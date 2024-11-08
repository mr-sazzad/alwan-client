import { DataTable } from "@/components/admins/dashboard/products/data-table";
import { IReadColor, IReadSize, SizeVariant } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export type ProductType = {
  id: string;
  size: IReadSize;
  color: IReadColor;
  price: number;
  manufacturingCost: number;
  stock: number;
};

export type AdminProductTableProps = {
  data: SizeVariant[];
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
