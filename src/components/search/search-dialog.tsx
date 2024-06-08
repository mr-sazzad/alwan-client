import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import { ITShirt } from "@/types";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import SearchDialogProductCard from "./search-dialog-product-card";

import { useRouter } from "next/navigation";
import { IoInformation } from "react-icons/io5";
import { PiSpinner } from "react-icons/pi";

interface ISearchDialogProps {
  searchDialogOpen: boolean;
  setSearchDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchDialog: React.FC<ISearchDialogProps> = ({
  searchDialogOpen,
  setSearchDialogOpen,
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!products || searchTerm.length < 3) return [];
    return products.filter((product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleGoToDetailsPage = (id: string) => {
    setSearchTerm("");
    router.push(`/t-shirts/${id}`);
    setSearchDialogOpen(false);
  };

  return (
    <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
      <DialogContent className="sm:w-[500px] rounded">
        <DialogHeader>
          <DialogTitle>Search Product</DialogTitle>
          <DialogDescription>
            search your favorite product by product name.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="search"
              placeholder="Type product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="col-span-4"
            />
          </div>
          <div>
            {isLoading && (
              <div className="flex justify-center items-center h-[50px]">
                <PiSpinner className="animate-spin" size={20} />
              </div>
            )}
            {filteredProducts.length > 0 ? (
              <div className="flex flex-col gap-2">
                <p className="font-medium mb-2">Search Results</p>
                {filteredProducts.map((product: ITShirt) => (
                  <SearchDialogProductCard
                    key={product.id}
                    product={product}
                    handleGoToDetailsPage={handleGoToDetailsPage}
                  />
                ))}
              </div>
            ) : (
              searchTerm.length >= 3 && <p>No products found</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-1">
              <IoInformation
                size={22}
                className="p-1 border rounded-full text-muted-foreground"
              />
              <p className="font-medium text-muted-foreground">Information</p>
            </div>
            <p className="text-sm text-muted-foreground pl-7">
              Any product that matches your search criteria will be displayed in
              this section.
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
