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
import { toast } from "@/components/ui/use-toast";
import { useDeleteSingleSizeMutation } from "@/redux/api/size/size-api";
import { Dispatch, SetStateAction } from "react";

interface deleteSizeDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  sizeId: string;
}

const DeleteSizeDialog: React.FC<deleteSizeDialogProps> = ({
  open,
  setOpen,
  sizeId,
}) => {
  const [deleteSingleSile, { isLoading }] = useDeleteSingleSizeMutation();
  const handleSizeDelete = async () => {
    try {
      const response: any = await deleteSingleSile(sizeId);

      console.log("Delete Response => ", response);

      if (!response.data.success) {
        toast({
          title: "Error",
          description: "Failed to delete size. Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Size has been deleted successfully.",
        });
        setOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete size. Error: ${error.message}`,
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            are you sure? you want to delete this size
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            onClick={handleSizeDelete}
          >
            remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSizeDialog;
