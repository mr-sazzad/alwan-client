"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoryProductsQuery } from "@/redux/api/products/productsApi";
import { IProduct, IReadCategory } from "@/types";
import { useState } from "react";

interface SearchReviewsDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: IReadCategory[];
  selectedProduct: IProduct | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<IProduct | null>>;
}

const SearchReviewsDrawer: React.FC<SearchReviewsDrawerProps> = ({
  open,
  setOpen,
  categories,
  selectedProduct,
  setSelectedProduct,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const { data: products, isLoading: isProductsLoading } =
    useGetCategoryProductsQuery(selectedCategoryId, {
      skip: !selectedCategoryId,
    });

  const handleCategoryChange = (id: string) => {
    setSelectedCategoryId(id);
    setSelectedProduct(null);
  };

  const handleProductChange = (id: string) => {
    const product =
      products?.data?.products.find((p: IProduct) => p.id === id) || null;
    setSelectedProduct(product);
  };

  if (!isProductsLoading) {
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-4">
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full mt-5">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {selectedCategoryId && (
            <Select
              onValueChange={handleProductChange}
              disabled={isProductsLoading}
            >
              <SelectTrigger className="w-full mt-5">
                <SelectValue
                  placeholder={
                    isProductsLoading
                      ? "Loading products..."
                      : "Select a product"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Products</SelectLabel>
                  {isProductsLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : (
                    products?.data.products.map((product: IProduct) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          <Button
            onClick={() => setOpen(false)}
            className="w-full mb-2 mt-5"
            disabled={!selectedProduct}
          >
            Submit
          </Button>
          <DrawerClose asChild disabled={isProductsLoading}>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchReviewsDrawer;
