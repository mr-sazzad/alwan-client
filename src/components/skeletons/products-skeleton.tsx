import MaxWidth from "../max-width";
import { Skeleton } from "../ui/skeleton";

const ProductsSkeleton = () => {
  return (
    <MaxWidth>
      <div className="flex items-center space-x-4 mt-[100px] ">
        <div className="flex flex-row gap-3 w-full">
          <div className="w-[190px] h-screen hidden md:block">
            <div className="space-y-2">
              <Skeleton className="h-8 w-[90px] mb-8" />
              <Skeleton className="h-5 w-[150px]" />
              <Skeleton className="h-5 w-[110px]" />
              <Skeleton className="h-5 w-[160px]" />
              <div className="py-5" />
              <Skeleton className="h-8 w-[90px] mb-8" />
              <Skeleton className="h-5 w-[150px]" />
              <Skeleton className="h-5 w-[110px]" />
              <Skeleton className="h-5 w-[160px]" />
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-5 w-[160px]" />
            </div>
          </div>

          <div className="flex-1">
            <div className=" flex flex-row flex-wrap justify-start w-full h-full gap-2 md:mt-2 mt-10">
              <Skeleton className="h-10 w-full md:hidden" />

              <Skeleton className="md:h-[260px] h-[300px] md:md:w-[32%] w-[48%]" />

              <Skeleton className="md:h-[260px] h-[300px] md:w-[32%] w-[48%]" />

              <Skeleton className="md:h-[260px] h-[300px] md:w-[32%] w-[48%]" />

              <Skeleton className="md:h-[260px] h-[300px] md:w-[32%] w-[48%]" />

              <Skeleton className="md:h-[260px] h-[300px] md:w-[32%] w-[48%]" />

              <Skeleton className="md:h-[260px] h-[300px] md:w-[32%] w-[48%]" />
            </div>
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default ProductsSkeleton;
