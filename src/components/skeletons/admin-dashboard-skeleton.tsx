import { Skeleton } from "../ui/skeleton";

const AdminDashboardSkeleton = () => {
  return (
    <div className="mt-3">
      <Skeleton className="h-[22px] w-[200px] mb-5" />

      <div className="flex justify-between mb-5">
        <Skeleton className="h-[40px] md:w-[200px] sm:w-[100px] w-[30%]" />
        <Skeleton className="h-[40px] md:w-[200px] sm:w-[100px] w-[30%]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} className="h-[140px] w-full" />
        ))}
      </div>

      <div className="flex justify-start mt-5">
        <Skeleton className="h-[40px] md:w-[250px] sm:w-[100px] w-[30%]" />
      </div>

      <div className="flex justify-between mt-5">
        <Skeleton className="h-[300px] w-[48%]" />
        <Skeleton className="h-[300px] w-[48%]" />
      </div>
    </div>
  );
};

export default AdminDashboardSkeleton;
