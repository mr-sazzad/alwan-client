"use client";

import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import { IProduct } from "@/types";
import { Loader2, Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FullWidthSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullWidthSearch(
  { isOpen, onClose }: FullWidthSearchProps = {
    isOpen: false,
    onClose: () => {},
  }
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  const filteredProducts = products?.data?.filter((product: IProduct) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productSuggestions = filteredProducts
    ?.map((product: IProduct) => product.name)
    .slice(0, 5);

  const handleGoToDetailsPage = (id: string) => {
    setSearchTerm("");
    router.push(`/products/${id}`);
    handleClose();
  };

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  }, [onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClose]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 bg-background z-50 transition-all duration-500 ease-in-out
        ${
          isOpen && !isClosing ? "opacity-100" : "opacity-0 pointer-events-none"
        }
        ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
      ref={searchRef}
    >
      <div
        className={`w-full h-full flex flex-col p-4 sm:p-6 md:p-8 transition-all duration-500 ease-in-out
        ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="flex items-center justify-between mb-6 gap-5">
          <h2 className="text-lg font-medium text-primary md:flex hidden">
            Search Products
          </h2>
          <div className="relative md:w-1/2 w-4/5">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-base rounded-full shadow-md"
            />
            {searchTerm && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleClose}
            aria-label="Close search"
          >
            Cancel
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 h-full">
          {/* Suggestions */}
          <div className="w-full md:w-1/2 mt-6">
            {searchTerm &&
              productSuggestions &&
              productSuggestions.length > 0 && (
                <>
                  <h3 className="font-medium mb-2 text-muted-foreground">
                    Top Suggestions
                  </h3>
                  <ul className="space-y-2">
                    {productSuggestions.map(
                      (suggestion: string, index: number) => (
                        <li key={index}>
                          <Button
                            variant="link"
                            className="w-full justify-start text-lg"
                            onClick={() => setSearchTerm(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        </li>
                      )
                    )}
                  </ul>
                </>
              )}
          </div>

          {/* Search Results */}
          <ScrollArea className="flex-grow rounded-lg backdrop-blur-sm scrollbar-hide">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-full">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-2xl font-medium text-foreground">
                    Searching for products...
                  </p>
                  <p className="text-lg text-muted-foreground mt-2">
                    This won&apos;t take long
                  </p>
                </div>
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
                {filteredProducts.map((product: IProduct) => (
                  <div
                    key={product.id}
                    className="bg-card text-card-foreground shadow-md overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl"
                    onClick={() => handleGoToDetailsPage(product.id)}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-base line-clamp-1 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        TK.{" "}
                        {(() => {
                          const minPrice = Math.min(
                            ...product.sizeVariants.map((v) => v.price)
                          );
                          const maxPrice = Math.max(
                            ...product.sizeVariants.map((v) => v.price)
                          );
                          return minPrice === maxPrice
                            ? minPrice
                            : `${minPrice} - ${maxPrice}`;
                        })() || "Price Not Available"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchTerm.length >= 3 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Search className="h-16 w-16 text-muted-foreground mb-6" />
                <p className="text-3xl font-bold mb-2 text-primary">
                  No products found
                </p>
                <p className="text-xl text-muted-foreground">
                  Try a different search term or browse our categories
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Search className="h-20 w-20 text-primary mb-6" />
                <p className="text-3xl font-bold mb-2 text-primary">
                  Discover Amazing Products
                </p>
                <p className="text-xl text-muted-foreground">
                  Start typing to search for products by name, category, or
                  description
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
