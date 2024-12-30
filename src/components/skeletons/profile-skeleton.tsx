import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="flex flex-col items-center md:items-start gap-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Skeleton className="h-8 w-64 mb-4" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
