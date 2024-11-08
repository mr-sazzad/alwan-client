import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingProps {
  className?: string;
}

export default function Loading({ className }: LoadingProps) {
  return (
    <div
      className={`flex justify-center items-center w-full h-[80vh] ${className}`}
    >
      <Card className="relative w-64 h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-32 h-32">
            <Skeleton className="absolute inset-0 rounded-full animate-pulse" />
            <Skeleton className="absolute inset-2 rounded-full animate-pulse delay-75" />
            <Skeleton className="absolute inset-4 rounded-full animate-pulse delay-150" />
            <Skeleton className="absolute inset-6 rounded-full animate-pulse delay-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <Skeleton className="h-4 w-32 animate-pulse" />
        </div>
      </Card>
    </div>
  );
}
