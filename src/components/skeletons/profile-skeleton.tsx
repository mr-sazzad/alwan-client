import { Skeleton } from "../ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 items-start">
      <Skeleton className="h-8 w-[250px]" />

      <Skeleton className="h-9 w-[100px]" />
      <Skeleton className="h-7 w-[190px]" />

      <Skeleton className="h-[250px] w-full" />

      <Skeleton className="h-10 w-full mt-3" />
    </div>
  );
};

export default ProfileSkeleton;
