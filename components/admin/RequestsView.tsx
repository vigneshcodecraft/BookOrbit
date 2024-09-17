"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Pagination from "../Pagination";
import { handleRequestAccept, handleRequestReject } from "@/lib/actions";
import { useToast } from "@/components/hooks/use-toast";
import SearchBar from "../SearchBar";
import { ITransactionExtend } from "@/lib/transactions/transaction.model";

export default function RequestsView({
  requests,
  totalPages,
}: {
  requests: ITransactionExtend[];
  totalPages: number;
}) {
  const { toast } = useToast();

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
        <CardTitle>Request Management</CardTitle>
        <CardDescription>
          Review and manage book issuance requests
        </CardDescription>
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
                <TableHead>Request Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.bookId}</TableCell>
                  <TableCell>{request.title}</TableCell>
                  <TableCell>{request.memberId}</TableCell>
                  <TableCell>
                    {request.firstName} {request.lastName}
                  </TableCell>
                  <TableCell>{request.borrowDate}</TableCell>
                  <TableCell>
                    {request.status === "Pending" && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center"
                          onClick={() => {
                            handleAccept(request.bookId, request.id);
                          }}
                        >
                          <CheckCircle className="h-5 w-5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                          onClick={() => {
                            console.log("reject clicked");
                            handleReject(request.id);
                          }}
                        >
                          <XCircle className="h-5 w-5" />
                        </Button>
                      </div>
                    )}
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
