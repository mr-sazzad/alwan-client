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
import { FiSearch } from "react-icons/fi";
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
      <DialogContent className="sm:w-[500px] sm:h-[500px] w-full h-full flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">
            Search Product
          </DialogTitle>
          <DialogDescription className="pb-0 mb-0">
            search your favorite product by product name.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 h-full">
          <div className="grid grid-cols-4 gap-4 relative">
            <Input
              id="search"
              placeholder="Type product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="col-span-4 py-5 rounded-full outline-none focus:outline-none active:outline-0"
            />
            <FiSearch
              className="absolute right-4 top-3 text-muted-foreground"
              size={20}
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
              searchTerm.length >= 3 && (
                <div className="flex flex-col gap-2 justify-center items-center font-medium text-xl text-muted-foreground">
                  <p>Icon</p>
                  <p className="">Products Not Found</p>
                </div>
              )
            )}
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-row items-start">
            <IoInformation className="mt-1 text-muted-foreground" />
            <p className="text-muted-foreground pl-2 text-sm">
              Any product that matches your search, will be displayed in this
              section.
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
