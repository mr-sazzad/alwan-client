import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const CreateProductDialogSkeleton = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto my-auto border-none">
      <CardHeader>
        <Skeleton className="h-8 md:w-1/4 w-2/4" />
      </CardHeader>
      <CardContent className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
        <Separator />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
};

export default CreateProductDialogSkeleton;
