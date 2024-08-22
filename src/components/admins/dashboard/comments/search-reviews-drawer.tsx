"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProduct, IReadCategory, IReview } from "@/types";
import { SelectItem } from "@radix-ui/react-select";
import { useEffect, useState } from "react";

interface SearchReviewsDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: IReadCategory[];
  fetchProductsByCategory: (categoryId: string) => Promise<IProduct[]>;
  fetchReviewsByProduct: (productId: string) => Promise<IReview[]>;
}

const SearchReviewsDrawer: React.FC<SearchReviewsDrawerProps> = ({
  open,
  setOpen,
  categories,
  fetchProductsByCategory,
  fetchReviewsByProduct,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchProductsByCategory(selectedCategoryId).then(setProducts);
    }
  }, [selectedCategoryId, fetchProductsByCategory]);

  useEffect(() => {
    if (selectedProductId) {
      fetchReviewsByProduct(selectedProductId).then(setReviews);
    }
  }, [selectedProductId, fetchReviewsByProduct]);

  const handleCategoryChange = (id: string) => {
    setSelectedCategoryId(id);
    setSelectedProductId("");
    setReviews([]);
  };

  const handleProductChange = (id: string) => {
    setSelectedProductId(id);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full mt-5">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="text-black"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {selectedCategoryId && (
            <Select onValueChange={handleProductChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Products</SelectLabel>
                  {products.map((product) => (
                    <SelectItem
                      key={product.id}
                      value={product.id}
                      className="text-black"
                    >
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          <Button
            onClick={() => setOpen(false)}
            className="w-full mb-2 mt-5"
            disabled={!selectedProductId}
          >
            Submit
          </Button>

          {selectedProductId && (
            <div className="mt-5">
              <h3 className="text-lg font-medium">Reviews</h3>
              {reviews.length > 0 ? (
                <ul className="mt-3">
                  {reviews.map((review) => (
                    <li key={review.id} className="border-b py-2">
                      <p>{review.content}</p>
                      <p className="text-sm text-gray-500">
                        Rating: {review.rating}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-gray-500">
                  No reviews available for this product.
                </p>
              )}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchReviewsDrawer;
