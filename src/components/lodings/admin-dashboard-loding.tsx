import React from "react";
import { PiSpinner } from "react-icons/pi";
import { Skeleton } from "../ui/skeleton";

const AdminDashboardLoading = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <PiSpinner size={26} className="font-bold animate-spin" />
        <Skeleton className="flex flex-col items-center">
          <p className="font-bold text-lg">Processing Your Content</p>
          <p className="text-sm font-thin text-muted-foreground">Please Wait</p>
        </Skeleton>
      </div>
    </div>
  );
};

export default AdminDashboardLoading;
