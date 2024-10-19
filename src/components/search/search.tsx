"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import { IProduct } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface FullWidthSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullWidthSearch({
  isOpen,
  onClose,
}: FullWidthSearchProps) {
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

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

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
  }, [isOpen, onClose]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto transition-all duration-300 ease-in-out ${
        isOpen && !isClosing ? "translate-x-0" : "translate-x-full"
      }`}
      ref={searchRef}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 gap-2">
          <div className="relative w-full max-w-2xl mx-auto">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 text-lg !outline-none !ring-0 !ring-offset-0"
              style={{ boxShadow: "none" }}
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 bottom-0 transition-all duration-300 ease-in-out"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              {searchTerm ? <X size={20} /> : <FiSearch size={20} />}
            </Button>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleClose}
            aria-label="Close search"
            className="rounded-full"
          >
            <X size={24} />
          </Button>
        </div>

        <div
          className={`min-h-[400px] transition-all duration-300 ease-in-out ${
            isOpen && !isClosing
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4"
          }`}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredProducts.map((product: IProduct) => (
                <div
                  key={product.id}
                  className="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => handleGoToDetailsPage(product.id)}
                >
                  <Image
                    src={product.imageUrls[0]}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="rounded-lg mb-2"
                  />
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-gray-600">
                    TK.{" "}
                    {product.sizeVariants[0]?.price || "Price Not Available"}
                  </p>
                </div>
              ))}
            </div>
          ) : searchTerm.length >= 3 ? (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <FiSearch size={48} className="text-gray-400 mb-4" />
              <p className="text-xl font-medium text-gray-600">
                No products found
              </p>
              <p className="text-gray-500 mt-2">Try a different search term</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <FiSearch size={48} className="text-gray-400 mb-4" />
              <p className="text-xl font-medium text-gray-600">
                Start typing to search
              </p>
              <p className="text-gray-500 mt-2">
                Find products by name, category, or description
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
