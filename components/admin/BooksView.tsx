"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Edit, Trash2, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBook } from "@/lib/books/book.model";
import Pagination from "../Pagination";
import { borrowBook, fetchUserDetails, handleDeleteBook } from "@/lib/actions";
import { useToast } from "@/components/hooks/use-toast";
import Link from "next/link";
import SearchBar from "../SearchBar";
import AlertDialogBox from "./AlertDialogBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SortOptions } from "@/lib/repository";

export default function BooksView({
  books,
  totalPages,
  sortOptions,
}: {
  books: IBook[];
  totalPages: number;
  sortOptions: SortOptions<IBook>;
}) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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

  const handleSortChange = (column: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", column);
    newSearchParams.set(
      "order",
      sortOptions.sortOrder === "asc" ? "desc" : "asc"
    );
    replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Inventory</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between mb-4">
          {/* <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search books"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="borrowed">Borrowed</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          <SearchBar placeholder="Search books..." />
          <Link href="/admin/books/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Book
            </Button>
          </Link>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader
                  column="title"
                  handleSortChange={handleSortChange}
                  label="Title"
                />
                <SortableHeader
                  column="author"
                  handleSortChange={handleSortChange}
                  label="Author"
                />
                <SortableHeader
                  column="publisher"
                  handleSortChange={handleSortChange}
                  label="Publisher"
                />
                <SortableHeader
                  column="genre"
                  handleSortChange={handleSortChange}
                  label="Genre"
                />
                <SortableHeader
                  column="isbnNo"
                  handleSortChange={handleSortChange}
                  label="ISBN"
                />
                <SortableHeader
                  column="pages"
                  handleSortChange={handleSortChange}
                  label="Pages"
                />
                <SortableHeader
                  column="price"
                  handleSortChange={handleSortChange}
                  label="Price"
                />
                <SortableHeader
                  column="totalCopies"
                  handleSortChange={handleSortChange}
                  label="Total Copies"
                />
                <SortableHeader
                  column="availableCopies"
                  handleSortChange={handleSortChange}
                  label="Available"
                />
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.isbnNo}</TableCell>
                  <TableCell>{book.pages}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>{book.totalCopies}</TableCell>
                  <TableCell>{book.availableCopies}</TableCell>
                  <TableCell className="flex">
                    <Button
                      aria-label="borrow"
                      variant="outline"
                      className="bg-green-400 hover:bg-green-700 mr-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBorrowBook(book.id);
                      }}
                    >
                      Borrow
                    </Button>
                    <Link href={`/admin/books/${book.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <AlertDialogBox tableName="book" id={book.id} />
                    {/* <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(book.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-center mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      </CardContent>
    </Card>
  );
}

const SortableHeader = ({
  column,
  handleSortChange,
  label,
}: {
  column: keyof IBook;
  handleSortChange: (column: string) => void;
  label: string;
}) => (
  <TableHead className="hidden sm:table-cell">
    <Button
      variant="ghost"
      onClick={() => handleSortChange(column)}
      className="hover:bg-transparent focus:outline-none p-0 "
    >
      {label}
      <ArrowUpDown className="ml-1 h-4 w-4" />
    </Button>
  </TableHead>
);
