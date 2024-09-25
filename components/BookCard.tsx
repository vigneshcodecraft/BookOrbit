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
  BookOpen,
} from "lucide-react";
import { Button } from "./ui/button";
import { borrowBook, fetchUserDetails } from "@/lib/actions";
import { useToast } from "./hooks/use-toast";
import { IBook } from "@/lib/books/book.model";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface BookCardProps {
  book: IBook;
}

export default function BookCard({ book }: BookCardProps) {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const fallbackImage = "/placeholder.svg?height=400&width=300";
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
    <motion.div
      whileHover={{ scale: 1.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="m-4"
    >
      <Card className="relative w-full h-[400px] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300">
        {book.image ? (
          <div className="absolute inset-0">
            <Image
              src={book.image}
              alt={`Cover of ${book.title}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
            <BookOpen className="h-20 w-20 text-white opacity-50" />
          </div>
        )}

        <div
          className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 ${
            book.image ? "bg-white bg-opacity-80" : "bg-transparent"
          }`}
          style={{
            height: isHovered ? "50%" : "40%",
          }}
        >
          <div className="h-full flex flex-col justify-between text-black">
            <div>
              <h3 className="text-xl font-bold mb-1 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-sm mb-1 line-clamp-1">{book.author}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                ₹{book.price.toFixed(2)}
              </span>
              <Badge
                variant={book.availableCopies > 0 ? "secondary" : "destructive"}
                className="ml-2"
              >
                {book.availableCopies} / {book.totalCopies}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
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
