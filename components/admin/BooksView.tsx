"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
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
import { handleDeleteBook } from "@/lib/actions";
import { useToast } from "@/components/hooks/use-toast";
import Link from "next/link";
import SearchBar from "../SearchBar";
import AlertDialogBox from "./AlertDialogBox";

export default function BooksView({
  books,
  totalPages,
}: {
  books: IBook[];
  totalPages: number;
}) {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    const result = await handleDeleteBook(id);
    toast({
      title: result.success ? "Success" : "Error",
      description: result.message,
      variant: result.success ? "success" : "destructive", // Use the correct variant for success/error
      duration: 2000,
    });
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
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Publisher</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead>TotalCopies</TableHead>
                <TableHead>Available</TableHead>
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
                  <TableCell>{book.totalCopies}</TableCell>
                  <TableCell>{book.availableCopies}</TableCell>
                  <TableCell className="flex">
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
