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
import {
  Building,
  Tag,
  Hash,
  Bookmark,
  Calendar,
  BookCopy,
  IndianRupee,
  Book,
} from "lucide-react";
import { Button } from "./ui/button";
import { borrowBook, fetchUserDetails } from "@/lib/actions";
import { useToast } from "./hooks/use-toast";
import { IBook } from "@/lib/books/book.model";
import Image from "next/image";

interface BookCardProps {
  book: IBook;
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
      <div className="relative pb-[60%] sm:pb-[80%]">
        {book.image ? (
          <Image
            src={book.image}
            layout="fill"
            objectFit="contain cover "
            className="rounded-lg shadow-2xl px-1"
            alt={`Cover of ${book.title}`}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary text-primary-foreground p-4">
            <Book className="h-12 w-12 mb-2" />
            <h3 className="text-lg font-semibold text-center line-clamp-2">
              {book.title}
            </h3>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge
            variant={book.availableCopies > 0 ? "default" : "destructive"}
            className=" ml-2 shrink-0"
          >
            {book.availableCopies > 0 ? "Available" : "Not Available"}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold truncate">
          {book.title}
        </CardTitle>
        <CardDescription className="line-clamp-1">
          {book.author}
        </CardDescription>
      </CardHeader>

      <CardFooter className="p-4 mt-auto">
        <Button
          aria-label="borrow"
          variant="outline"
          className="w-full bg-black text-white"
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

// <Card
//   key={book.id}
//   className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//   onClick={() => setSelectedBook(book)}
// >
//   <div className="relative pb-[60%] sm:pb-[80%]">
//     <img
//       src={book.image}
//       alt={`Cover of ${book.title}`}
//       className="absolute inset-0 w-full h-full object-cover"
//     />
//     <div className="absolute top-2 right-2">
//       <Badge variant={book.status === "Available" ? "success" : "destructive"}>
//         {book.status}
//       </Badge>
//     </div>
//   </div>
//   <CardHeader className="p-4">
//     <CardTitle className="text-lg font-semibold line-clamp-2">
//       {book.title}
//     </CardTitle>
//     <CardDescription className="line-clamp-1">{book.author}</CardDescription>
//   </CardHeader>
//   <CardFooter className="p-4 mt-auto">
//     {book.dueDate ? (
//       <div className="flex items-center text-sm text-yellow-600">
//         <Calendar className="h-4 w-4 mr-2" />
//         Due: {book.dueDate}
//       </div>
//     ) : (
//       <Button variant="outline" className="w-full">
//         Check Out
//       </Button>
//     )}
//   </CardFooter>
// </Card>;
