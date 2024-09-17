"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, Tag, Hash, Bookmark, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { borrowBook, fetchUserDetails } from "@/lib/actions";
import { useToast } from "./hooks/use-toast";

interface BookCardProps {
  book: any;
}

export default function BookCard({ book }: BookCardProps) {
  const { toast } = useToast();

  const handleBorrowBook = async (bookId: number) => {
    const currentUser = await fetchUserDetails();
    const result = await borrowBook(bookId, currentUser?.id!);

    if (result?.status) {
      toast({
        title: result.status,
        description: result.message,
        variant: result.status === "Success" ? "success" : "destructive", // Use the correct variant for success/error
        duration: 2000,
      });
    }
  };
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <CardHeader className="border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold truncate">
            {book.title}
          </CardTitle>
          <Badge
            variant={book.availableCopies > 0 ? "outline" : "destructive"}
            className=" ml-2 shrink-0"
          >
            {book.availableCopies > 0 ? "Available" : "Not Available"}
          </Badge>
        </div>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Building className="h-4 w-4 mr-2" />
            Publisher:
          </div>
          <dd>{book.publisher}</dd>
          <div className="flex items-center text-muted-foreground">
            <Tag className="h-4 w-4 mr-2" />
            Genre:
          </div>
          <dd>{book.genre}</dd>
          <div className="flex items-center text-muted-foreground">
            <Hash className="h-4 w-4 mr-2" />
            ISBN:
          </div>
          <dd>{book.isbnNo}</dd>
          <div className="flex items-center text-muted-foreground">
            <Bookmark className="h-4 w-4 mr-2" />
            Pages:
          </div>
          <dd>{book.pages}</dd>
        </dl>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-200 p-4">
        <Button
          aria-label="borrow"
          variant="outline"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            handleBorrowBook(book.id);
          }}
        >
          Borrow
        </Button>
      </CardFooter>
    </Card>
  );
}
