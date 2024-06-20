import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { CgMenuLeftAlt } from "react-icons/cg";
import ModeToggle from "../themes/theme-toggle";
import { Button } from "../ui/button";

const Navigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CgMenuLeftAlt
          size={22}
          className="cursor-pointer text-black dark:text-gray-200"
        />
      </SheetTrigger>
      <SheetContent side="left" className="md:w-[400px] w-[300px]">
        <SheetHeader>
          <SheetTitle>Application Menu</SheetTitle>
          <SheetDescription>
            Go to your favorite page and shopping.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4 h-[83%]">
          <div className="grid gap-4">
            <Link href="/t-shirts" legacyBehavior passHref className="w-full">
              <Button className="w-full" variant="secondary">
                <p className="text-start w-full">T-Shirt</p>
              </Button>
            </Link>
          </div>
        </div>

        <SheetFooter>
          <div className="flex flex-col gap-5 items-center w-full">
            <div className="flex justify-center">
              <ModeToggle />
            </div>

            <p className="text-sm text-center w-full text-gray-600">
              all rights reserved by alwan
            </p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Navigation;
