"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Edit, Trash2, CircleX } from "lucide-react";
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
import Pagination from "@/components/Pagination";
import { handleDeleteBook, handleDeleteTransaction } from "@/lib/actions";
import { useToast } from "@/components/hooks/use-toast";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { ITransactionExtend } from "@/lib/transactions/transaction.model";
import AlertDialogBox from "@/components/admin/AlertDialogBox";

export default function RequestBook({
  requests,
  totalPages,
}: {
  requests: ITransactionExtend[];
  totalPages: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Requests</CardTitle>
      </CardHeader>

      <CardContent>
        {/* <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
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
          </div>
          <SearchBar placeholder="Search Transactions..." />
        </div> */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>BookId</TableHead>
                <TableHead>Book Title</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.bookId}</TableCell>
                  <TableCell>{request.title}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {request.borrowDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "Pending"
                          ? "pending"
                          : request.status === "Rejected"
                          ? "destructive"
                          : request.status === "Issued"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {/* <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button> */}
                    <AlertDialogBox
                      tableName="transaction"
                      id={request.id}
                      title="Confirm Cancellation"
                      description="Are you sure you want to cancel this book? This action cannot be undone."
                      icon={<CircleX className="h-4 w-4" />}
                      button="Ok"
                    />
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
