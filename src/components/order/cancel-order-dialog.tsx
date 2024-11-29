import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { RiLoaderLine } from "react-icons/ri";

interface AlertDialogCompProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handler: () => void;
  loading: boolean;
  orderId: string;
}

const CancelOrderDialog: React.FC<AlertDialogCompProps> = ({
  open,
  setOpen,
  handler,
  loading,
  orderId,
}) => {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText.toLowerCase() === "cancel";

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-primary">
            Cancel Order #{orderId.slice(0, 8)}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-muted-foreground">
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <Label
            htmlFor="confirmCancel"
            className="text-sm font-medium text-muted-foreground"
          >
            Type &apos;cancel&apos; to confirm
          </Label>
          <Input
            id="confirmCancel"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type 'cancel' here"
            className="mt-1"
          />
        </div>
        <AlertDialogFooter className="flex flex-col gap-1 w-full">
          <AlertDialogCancel
            disabled={loading}
            className="text-base font-normal w-full"
          >
            Keep Order
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handler}
            className={`text-base font-normal bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full ${
              !isConfirmed && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isConfirmed || loading}
          >
            {loading ? (
              <RiLoaderLine className="animate-spin h-5 w-5" />
            ) : (
              "Cancel Order"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelOrderDialog;
