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

import { Dispatch, SetStateAction } from "react";

import { RiLoaderLine } from "react-icons/ri";

interface AlertDialogCompProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  handler: () => void;
  loading?: boolean;
  className?: string;
  buttonText: string;
}

const AlertDialogComp: React.FC<AlertDialogCompProps> = ({
  open,
  setOpen,
  title,
  description,
  handler,
  loading,
  className,
  buttonText,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="rounded">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handler} className={className}>
            {loading ? <RiLoaderLine className="animate-spin" /> : buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComp;
