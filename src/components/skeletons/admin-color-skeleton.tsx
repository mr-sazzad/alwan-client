import React from "react";
import { Skeleton } from "../../components/ui/skeleton";

const AdminColorSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 mt-3">
      <Skeleton className="w-[200px] h-7" />
      <Skeleton className="w-full h-[120px]" />
      <Skeleton className="ml-auto w-[150px] h-10" />
      <div className="flex justify-between gap-2">
        <Skeleton className="md:w-[250px] w-full h-10" />
        <Skeleton className="w-[100px] h-10" />
      </div>
      <Skeleton className="w-full h-[40vh]" />
    </div>
  );
};

export default AdminColorSkeleton;
