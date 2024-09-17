import { Book, Bookmark, Building, Tag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { fetchFilteredBooks } from "@/lib/actions";
import BookCard from "@/components/BookCard";
import { on } from "events";
import { IBook } from "@/lib/books/book.model";

interface BookListProps {
  books: IBook[];
  onBookClick: (book: any) => void;
}
export default function BookList({ books, onBookClick }: BookListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <div key={book.id} onClick={() => onBookClick(book)}>
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}
