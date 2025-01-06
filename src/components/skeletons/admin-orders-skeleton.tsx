import React from "react";
import { Skeleton } from "../ui/skeleton";

const AdminOrdersSkeleton = () => {
  return (
    <div className="mt-3">
      <Skeleton className="h-[22px] w-[200px] mb-5" />

      <div className="flex justify-between mb-5">
        <Skeleton className="h-[40px] md:w-[200px] sm:w-[100px] w-[30%]" />
        <Skeleton className="h-[40px] md:w-[200px] sm:w-[100px] w-[30%]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-[140px] w-full" />
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <Skeleton className="h-[40px] md:w-[200px] sm:w-[100px] w-[30%]" />
        <Skeleton className="h-[40px] md:w-[400px] sm:w-[200px] w-[70%]" />
      </div>

      <div className="flex justify-between gap-4 mt-4">
        <Skeleton className="h-[40px] md:w-[300px] sm:w-[130px] w-[50%]" />
        <Skeleton className="h-[40px] md:w-[130px] sm:w-[70px] w-[20%]" />
      </div>

      <div className="mt-5">
        <Skeleton className="h-[530px] w-full" />
      </div>
    </div>
  );
};

export default AdminOrdersSkeleton;
