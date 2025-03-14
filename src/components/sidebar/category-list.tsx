import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getUserFromLocalStorage } from "../../helpers/jwt";
import { handleSignInWithGoogle } from "../../helpers/sign-in-with-google";
import { ICategory } from "../../types";
import LoginModal from "../modals/login-modal";
import SignUpModal from "../modals/signUp-modal";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface CategoryListProps {
  categories: ICategory[];
  onCategoryClick: (category: ICategory) => void;
  backButtonText: string;
  parentCategoryName: string;
  onBack: () => void;
  showBackButton: boolean;
  isFirstPage: boolean;
}

export function CategoryList({
  categories,
  onCategoryClick,
  backButtonText,
  parentCategoryName,
  onBack,
  showBackButton,
  isFirstPage,
}: CategoryListProps) {
  const [open, setOpen] = useState(false);
  const [SignUpOpen, setSignUpOpen] = useState(false);

  const currentUser = getUserFromLocalStorage();

  const handleModalClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <>
      <div className="p-6 flex flex-col h-full">
        <div className="px-3">
          {showBackButton && (
            <button
              className="cursor-pointer flex gap-1 font-medium items-center text-lg -mt-3 transition-colors duration-200 hover:text-primary"
              onClick={onBack}
            >
              <IoIosArrowBack aria-hidden="true" />
              <span>{backButtonText}</span>
            </button>
          )}
        </div>

        <div className="mb-14" />
        <h2 className="text-2xl font-medium mb-6 px-4">{parentCategoryName}</h2>
        <div className="flex-grow overflow-y-auto">
          <ul className="list-none p-0 px-4 py-2 space-y-4">
            {categories &&
              categories.map((category) => (
                <li
                  key={category.id}
                  className={`cursor-pointer text-lg font-medium ${
                    category.subCategories ? "relative pr-12" : ""
                  }`}
                  onClick={() => onCategoryClick(category)}
                >
                  <p
                    className={`w-full transition-colors duration-200 hover:text-primary ${
                      isFirstPage
                        ? "text-foreground text-2xl"
                        : "text-muted-foreground"
                    }`}
                  >
                    {category.name}
                  </p>
                  {category.subCategories &&
                    category.subCategories.length > 0 && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-transform duration-200 group-hover:translate-x-1">
                        <IoIosArrowForward aria-hidden="true" size={20} />
                      </div>
                    )}
                </li>
              ))}
          </ul>
        </div>
        {isFirstPage && !currentUser && (
          <div className="mt-16">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-2">
                  Unlock More Benefits!
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sign up or log in to track your orders, use exclusive coupons,
                  and enjoy a personalized shopping experience.
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => setSignUpOpen(true)}>Join Us</Button>
                  <Button variant="outline" onClick={() => setOpen(true)}>
                    Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {isFirstPage && currentUser && (
          <div className="mt-16">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-2">Need Assistance?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you&apos;re experiencing any issues or have questions,
                  please don&apos;t hesitate to reach out.
                </p>
                <Link href="/contact" passHref>
                  <Button className="w-full">Contact Us</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <LoginModal
        open={open}
        setOpen={setOpen}
        handler={handleSignInWithGoogle}
        onClose={handleModalClose}
      />
      <SignUpModal
        signUpOpen={SignUpOpen}
        setSignUpOpen={setSignUpOpen}
        handler={handleSignInWithGoogle}
        onClose={handleModalClose}
      />
    </>
  );
}
