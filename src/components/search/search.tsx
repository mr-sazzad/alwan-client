"use client";

import { Loader, Search, SearchSlash, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetAllProductsQuery } from "../../redux/api/products/productsApi";
import type { IProduct } from "../../types";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";

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
    }, 300);
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
        ${isOpen ? "translate-y-0" : "-translate-y-full"}
        ${
          isOpen && !isClosing ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ref={searchRef}
    >
      <div
        className={`w-full h-full flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 transition-all duration-500 ease-in-out
          ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}
          ${isOpen ? "delay-100" : "delay-0"}`}
      >
        <div className="flex items-center justify-between mb-8 gap-5">
          <h2 className="font-medium text-primary md:flex hidden">
            Search Products
          </h2>
          <div className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 md:py-4 py-2 text-lg sm:text-xl rounded-full shadow-md"
            />
            {searchTerm && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          <Button
            size="lg"
            variant="ghost"
            onClick={handleClose}
            aria-label="Close search"
          >
            Close
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 h-full">
          {/* Suggestions */}
          <div className="w-full lg:w-[200px] mb-4 lg:mb-0 lg:mr-8 rounded">
            {searchTerm &&
              productSuggestions &&
              productSuggestions.length > 0 && (
                <>
                  <h3 className="font-medium mb-2 text-base sm:text-lg text-primary">
                    Top Suggestions
                  </h3>
                  <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                    {productSuggestions.map(
                      (suggestion: string, index: number) => (
                        <li key={index} className="w-full">
                          <Button
                            variant="outline"
                            className="w-full justify-start text-sm sm:text-base py-2 px-3 hover:bg-primary/10 transition-colors duration-300 rounded-lg"
                            onClick={() => setSearchTerm(suggestion)}
                          >
                            <Search className="mr-2 h-4 w-4" />
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
          <ScrollArea className="flex-grow rounded overflow-hidden scrollbar-hide mb-10 p-4 bg-card">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-full p-8">
                <Loader className="h-16 w-16 animate-spin text-primary mb-6" />
                <p className="text-2xl font-medium text-primary mb-2">
                  Searching for products...
                </p>
                <p className="text-lg text-muted-foreground">
                  This won&apos;t take long
                </p>
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6">
                {filteredProducts.map((product: IProduct) => (
                  <div
                    key={product.id}
                    className="overflow-hidden cursor-pointer group rounded"
                    onClick={() => handleGoToDetailsPage(product.id)}
                  >
                    <div className="aspect-square relative overflow-hidden group-hover:opacity-90 transition-opacity duration-300">
                      <Image
                        src={product.imageUrls[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 sm:p-4 bg-gradient-to-b from-card to-card/90">
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-1 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-sm sm:text-base font-bold text-primary">
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
              <div className="flex flex-col items-center justify-center h-full text-center p-12">
                <SearchSlash size={48} className="text-primary mb-6" />
                <p className="text-3xl font-medium text-primary mb-2">
                  No products found
                </p>
                <p className="text-xl text-muted-foreground max-w-md">
                  Try a different search term or browse our categories
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-12">
                <Search size={48} className="text-primary mb-6" />
                <p className="text-3xl font-medium mb-4 text-primary">
                  Discover Amazing Products
                </p>
                <p className="text-xl text-muted-foreground max-w-md">
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
