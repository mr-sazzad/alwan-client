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
import { Button } from "../ui/button";

const Navigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CgMenuLeftAlt size={22} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Application Menu</SheetTitle>
          <SheetDescription>
            Go to your favorite page and shopping.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4 h-[90%]">
          <div className="grid gap-4">
            <Link href="/t-shirts" legacyBehavior passHref className="w-full">
              <Button className="w-full" variant="secondary">
                <p className="text-start w-full">Products</p>
              </Button>
            </Link>
          </div>
        </div>

        <SheetFooter className="">
          <p className="text-sm text-center w-full text-gray-600">
            all right reserved @alwan
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Navigation;
