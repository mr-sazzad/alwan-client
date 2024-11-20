"use client";

import { Button } from "@/components/ui/button";
import { PackageSearch, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmptyProductsPage() {
  const router = useRouter();

  const resetFilters = () => {
    const currentPath = window.location.pathname;
    router.push(currentPath);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto text-center px-4">
      <PackageSearch className="w-20 h-20 mb-6" />
      <h2 className="text-2xl font-medium mb-4 text-primary">
        No Products Found
      </h2>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        We couldn&apos;t find any products matching your current filters. Try
        adjusting your search criteria or browse our full collection.
      </p>
      <Button className="w-full group" onClick={resetFilters} variant="outline">
        <RefreshCw className="mr-2 h-4 w-4 group-hover:animate-spin" />
        Reset Filters
      </Button>
    </div>
  );
}
