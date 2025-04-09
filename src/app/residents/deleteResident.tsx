import React, { useState } from "react";
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
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { useMutation } from "@apollo/client";
import { DELETE_RESIDENT } from "@/graphql/mutations/residents/deleteResident";
import { toast } from "sonner";

interface Props {
  id: string;
  refetch: () => void;
}

const DeleteResident = ({ id, refetch }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteResident, { loading, error }] = useMutation(DELETE_RESIDENT);

  const handleDelete = async () => {
    try {
      const { data } = await deleteResident({
        variables: {
          id,
        },
      });

      toast(data.deleteResident.message);
      setOpenDialog(false);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger className="hover:scale-105 cursor-pointer text-xs text-red-400">
        <Trash className="w-4 h-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to delete this
            resident?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleDelete}>
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteResident;
