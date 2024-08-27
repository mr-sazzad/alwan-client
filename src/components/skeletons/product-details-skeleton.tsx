import MaxWidth from "../max-width";
import { Skeleton } from "../ui/skeleton";

const ProductDetailsPageSkeleton = () => {
  return (
    <MaxWidth className="flex justify-center w-full mt-[90px]">
      <div className="max-w-5xl w-full">
        <div className="flex md:flex-row flex-col gap-5 w-full">
          <div className="h-[70vh] flex-1 w-full">
            <div className="space-y-2">
              <div className="md:hidden mt-3">
                <Skeleton className="w-[200px] h-8 mb-2" />
                <Skeleton className="w-[100px] h-6 mb-2" />
                <Skeleton className="w-[120px] h-8 my-6" />
              </div>

              <Skeleton className="h-[400px] w-full mb-3" />
              <div className="flex flex-row gap-2 justify-between items-center">
                <Skeleton className="h-[100px] w-[24%]" />
                <Skeleton className="h-[100px] w-[24%]" />
                <Skeleton className="h-[100px] w-[24%]" />
                <Skeleton className="h-[100px] w-[24%]" />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col mt-2">
              <div className="md:block hidden">
                <Skeleton className="w-[200px] h-8 mb-2" />
                <Skeleton className="w-[100px] h-6 mb-2" />
                <Skeleton className="w-[90px] h-7" />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Skeleton className="w-[20%] h-7" />
                <div className="flex flex-row gap-2 w-full">
                  <Skeleton className="w-[24%] h-10" />
                  <Skeleton className="w-[24%] h-10" />
                  <Skeleton className="w-[24%] h-10" />
                  <Skeleton className="w-[24%] h-10" />
                </div>
                <Skeleton className="w-[24%] h-4" />
              </div>
              <div className="mt-2">
                <Skeleton className="w-full h-10 mb-2 rounded-full" />
                <Skeleton className="w-full h-10 mb-1 rounded-full" />
                <Skeleton className="w-full h-10 rounded-full" />
              </div>
              <div className="mt-4">
                <Skeleton className="w-[200px] h-4 mb-1" />
                <Skeleton className="w-[150px] h-4 mb-1" />
                <Skeleton className="w-[120px] h-4 mb-1" />
                <Skeleton className="w-[200px] h-4" />
              </div>

              <div className="mt-4">
                <Skeleton className="w-[100px] h-8 mb-2" />
                <Skeleton className="w-[200px] h-4 mb-1" />
                <Skeleton className="w-[150px] h-4 mb-1" />
                <Skeleton className="w-[120px] h-4 mb-1" />
                <Skeleton className="w-[200px] h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default ProductDetailsPageSkeleton;

// import MaxWidth from "../max-width";
// import { Skeleton } from "../ui/skeleton";

// const ProductDetailsPageSkeleton = () => {
//   return (
//     <MaxWidth className="flex justify-center w-full">
//       <div className="mt-[100px] max-w-5xl">
//         <div className="flex flex-row gap-5 w-full">
//           <div className="w-[50%] h-[60%]">

//               {/* slider images */}

//             </div>
//           </div>

//           <div className="flex-1">
//             <div className=" flex flex-row flex-wrap justify-start w-full gap-3 md:mt-2 mt-10">
//               <Skeleton className="h-10 w-full md:hidden" />

//               <Skeleton className="md:h-[400px] h-[100pxpx] md:w-[31%] w-[48%]" />

//               <Skeleton className="md:h-[400px] h-[100pxpx] md:w-[31%] w-[48%]" />

//               <Skeleton className="md:h-[400px] h-[100pxpx] md:w-[31%] w-[48%]" />

//               <Skeleton className="md:h-[400px] h-[100pxpx] md:w-[31%] w-[48%]" />

//               <Skeleton className="md:h-[400px] h-[100pxpx] md:w-[31%] w-[48%]" />

//               <Skeleton className="md:h-[400px] h-[100pxpx] md:w-[31%] w-[48%]" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </MaxWidth>
//   );
// };

// export default ProductDetailsPageSkeleton;
