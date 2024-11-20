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

  const filteredProducts = products?.data
    ?.filter((product: IProduct) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 8);

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
      className={`fixed inset-0 bg-background/60 backdrop-blur-xl z-50 transition-all duration-500 ease-in-out
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl">Search Products</h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleClose}
            className="rounded-full transition-transform duration-300 hover:scale-110"
            aria-label="Close search"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-6 text-lg rounded-lg shadow-lg"
          />
          {searchTerm && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300 hover:scale-110"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <ScrollArea className="flex-grow rounded-lg backdrop-blur-sm scrollbar-hide">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center fixed inset-0">
              <div className="text-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
                <p className="text-xl font-medium text-foreground">
                  Please wait...
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  We&apos;re preparing your content
                </p>
              </div>
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
              {filteredProducts.map((product: IProduct) => (
                <div
                  key={product.id}
                  className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[102%]"
                  onClick={() => handleGoToDetailsPage(product.id)}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={product.imageUrls[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      TK.{" "}
                      {product.sizeVariants[0]?.price || "Price Not Available"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm.length >= 3 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 mt-[40%]">
              <Search className="h-12 w-12 text-muted-foreground mb-6" />
              <p className="text-2xl font-medium mb-2">No products found</p>
              <p className="text-muted-foreground">
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Search className="h-16 w-16 text-muted-foreground mb-6" />
              <p className="text-2xl font-medium mb-2">
                Start typing to search
              </p>
              <p className="text-lg text-muted-foreground">
                Find products by name, category, or description
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
