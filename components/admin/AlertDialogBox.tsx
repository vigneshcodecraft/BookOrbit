import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useToast } from "../hooks/use-toast";
import {
  handleDeleteMember,
  handleDeleteBook,
  handleDeleteTransaction,
  handleDeleteProfessor,
} from "@/lib/actions";
import { Trash2, TrashIcon } from "lucide-react";

export interface AlertDialogBoxProps {
  tableName: "book" | "member" | "transaction" | "professor";
  id: number;
  title?: string;
  description?: string;
  icon?: any;
  button?: string;
}
export default function AlertDialogBox({
  tableName,
  id,
  title,
  description,
  icon,
  button,
}: AlertDialogBoxProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const handleDelete = async (id: number) => {
    const result =
      tableName === "member"
        ? await handleDeleteMember(id)
        : tableName === "book"
        ? await handleDeleteBook(id)
        : tableName === "transaction"
        ? await handleDeleteTransaction(id)
        : tableName === "professor"
        ? await handleDeleteProfessor(id)
        : null;
    if (result) {
      toast({
        title: result.success ? "Success" : "Error",
        description: result.message,
        variant: result.success ? "success" : "destructive", // Use the correct variant for success/error
        duration: 2000,
      });
    }
  };
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          {icon ? icon : <Trash2 className="h-4 w-4" />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {title ? (
            <DialogTitle>{title}</DialogTitle>
          ) : (
            <DialogTitle>Confirm Deletion</DialogTitle>
          )}

          {!description ? (
            <DialogDescription>
              Are you sure you want to delete this {tableName}? This action
              cannot be undone.
            </DialogDescription>
          ) : (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              handleDelete(id);
            }}
          >
            {button ? button : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
