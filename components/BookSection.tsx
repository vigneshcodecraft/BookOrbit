"use client";

import { useState } from "react";
import BookList from "@/components/BookList";
import Pagination from "@/components/Pagination";
import BookDetailsDialog from "@/components/BookDetailsDialog";

interface BookSectionProps {
  totalPages: number;
  books: any[];
}

export default function BookSection({ totalPages, books }: BookSectionProps) {
  const [selectedBook, setSelectedBook] = useState(null);
  return (
    <>
      <BookList books={books} onBookClick={setSelectedBook} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      <BookDetailsDialog
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </>
  );
}
