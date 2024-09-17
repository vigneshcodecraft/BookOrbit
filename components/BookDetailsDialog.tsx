"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface BookDetailsDialogProps {
  book: any;
  onClose: () => void;
}

export default function BookDetailsDialog({
  book,
  onClose,
}: BookDetailsDialogProps) {
  return (
    <>
      <Dialog open={!!book} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{book?.title}</DialogTitle>
            <DialogDescription>by {book?.author}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                Publisher:
              </span>
              <span className="col-span-3">{book?.publisher}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                Genre:
              </span>
              <span className="col-span-3">{book?.genre}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                ISBN:
              </span>
              <span className="col-span-3">{book?.isbnNo}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                Pages:
              </span>
              <span className="col-span-3">{book?.pages}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                Available Copies
              </span>
              <span className="col-span-3">{book?.availableCopies}</span>
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Status:
            </span> 
             <span className="col-span-3">
              <Badge
                variant={
                  book?.status === "Available" ? "default" : "destructive"
                }
              >
                {book?.status}
              </Badge>
            </span>
          </div> */}
            {/* {book?.dueDate && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                Due Date:
              </span>
              <span className="col-span-3 text-yellow-600">{book.dueDate}</span>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Description:
            </span>
            <p className="col-span-3 text-sm">{book?.description}</p>
          </div>*/}
          </div>
          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
