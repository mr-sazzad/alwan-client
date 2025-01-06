import React from "react";
import { Skeleton } from "../../components/ui/skeleton";

const AdminCarouselSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 mt-3">
      <Skeleton className="w-[200px] h-7" />
      <Skeleton className="w-full h-[120px]" />
      <Skeleton className="ml-auto w-[150px] h-10" />
      <Skeleton className="w-full h-[60vh]" />
    </div>
  );
};

export default AdminCarouselSkeleton;
