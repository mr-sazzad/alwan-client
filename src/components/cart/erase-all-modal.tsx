import { ITShirt } from "@/types";
import { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface IEraseCartProsuctsModalProps {
  eraseModalOpen: boolean;
  setEraseModalOpen: Dispatch<SetStateAction<boolean>>;
  cartProducts: ITShirt[];
  handleCartClear: () => void;
  className?: string;
}

const EraseCartProsuctsModal: React.FC<IEraseCartProsuctsModalProps> = ({
  eraseModalOpen,
  setEraseModalOpen,
  cartProducts,
  handleCartClear,
  className,
}) => {
  return (
    <AlertDialog open={eraseModalOpen} onOpenChange={setEraseModalOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="mt-5 w-full"
          variant="destructive"
          disabled={cartProducts.length < 1}
        >
          Erase All
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-1">
            Clear your cart
          </AlertDialogTitle>
          <AlertDialogDescription>
            Would you like to clear your cart now? If so, please click
            &quot;Yes, I want.&quot; Otherwise, click &quot;Never.&quot;
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Never</AlertDialogCancel>
          <AlertDialogAction onClick={handleCartClear} className={className}>
            Yes, I want
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EraseCartProsuctsModal;
