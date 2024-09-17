"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Undo2, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "../Pagination";
import {
  handleReturnBook,
  handleRequestAccept,
  handleRequestReject,
} from "@/lib/actions";
import { useToast } from "@/components/hooks/use-toast";
import SearchBar from "../SearchBar";
import { ITransactionExtend } from "@/lib/transactions/transaction.model";
import AlertDialogBox from "./AlertDialogBox";

export default function TransactionsView({
  transactions,
  totalPages,
}: {
  transactions: ITransactionExtend[];
  totalPages: number;
}) {
  const { toast } = useToast();

  const handleReturn = async (id: number) => {
    const result = await handleReturnBook(id);
    toast({
      title: result.success ? "Success" : "Error",
      description: result.message,
      variant: result.success ? "success" : "destructive", // Use the correct variant for success/error
      duration: 2000,
    });
  };
  const handleAccept = async (bookId: number, requestId: number) => {
    const result = await handleRequestAccept(bookId, requestId);
    if (result?.status === "Error")
      toast({
        title: result.status,
        description: result.message,
        variant: "destructive",
        duration: 2000,
      });
  };

  const handleReject = async (requestId: number) => {
    const result = await handleRequestReject(requestId);
    if (result?.status === "Error")
      toast({
        title: result.status,
        description: result.message,
        variant: "destructive",
        duration: 2000,
      });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
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
          <SearchBar placeholder="Search Transactions..." />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>BookId</TableHead>
                <TableHead>Book Title</TableHead>
                <TableHead>MemberId</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead className="whitespace-nowrap">Borrow Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="whitespace-nowrap">Return Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.bookId}</TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.memberId}</TableCell>
                  <TableCell>
                    {transaction.firstName} {transaction.lastName}
                  </TableCell>
                  <TableCell>{transaction.borrowDate}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {transaction.dueDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "Pending"
                          ? "pending"
                          : transaction.status === "Rejected"
                          ? "destructive"
                          : transaction.status === "Issued"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="">{transaction.returnDate}</TableCell>
                  <TableCell className="flex justify-end">
                    {transaction.status === "Pending" && (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          // className="bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center"
                          onClick={() => {
                            handleAccept(transaction.bookId, transaction.id);
                          }}
                        >
                          <CheckCircle className="h-5 w-5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          // className="rounded-full flex items-center justify-center"
                          onClick={() => {
                            console.log("reject clicked");
                            handleReject(transaction.id);
                          }}
                        >
                          <XCircle className="h-5 w-5" />
                        </Button>
                      </>
                    )}
                    {transaction.status === "Issued" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleReturn(transaction.id)}
                      >
                        <Undo2 className="h-4 w-4" />
                      </Button>
                    )}
                    <AlertDialogBox
                      tableName="transaction"
                      id={transaction.id}
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
