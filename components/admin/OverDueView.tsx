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
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import DataNotFound from "@/components/DataNotFound";

type OverdueItem = {
  id: string;
  bookTitle: string;
  memberName: string;
  dueDate: string;
  daysOverdue: number;
};

const mockOverdueItems: OverdueItem[] = [
  {
    id: "O001",
    bookTitle: "To Kill a Mockingbird",
    memberName: "John Doe",
    dueDate: "2023-05-28",
    daysOverdue: 3,
  },
  {
    id: "O002",
    bookTitle: "1984",
    memberName: "Jane Smith",
    dueDate: "2023-05-27",
    daysOverdue: 4,
  },
  {
    id: "O003",
    bookTitle: "Pride and Prejudice",
    memberName: "Alice Johnson",
    dueDate: "2023-05-25",
    daysOverdue: 6,
  },
  {
    id: "O004",
    bookTitle: "The Great Gatsby",
    memberName: "Bob Wilson",
    dueDate: "2023-05-26",
    daysOverdue: 5,
  },
  {
    id: "O005",
    bookTitle: "Moby Dick",
    memberName: "Emma Brown",
    dueDate: "2023-05-29",
    daysOverdue: 2,
  },
];

export default function OverdueView() {
  const [overdueItems, setOverdueItems] =
    useState<OverdueItem[]>(mockOverdueItems);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOverdueItems = overdueItems.filter(
    (item) =>
      item.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendNotice = (id: string) => {
    // Logic to send overdue notice
    console.log(`Sending overdue notice for item ${id}`);
  };

  if (filteredOverdueItems.length === 0) {
    return (
      <DataNotFound
        title="No Overdue Items"
        message="Great news! There are no overdue books at the moment."
        actionLabel="Go Back"
      />
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Overdue Items</CardTitle>
        <CardDescription>Books that are past their due date</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Book Title</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead className="w-[100px]">Due Date</TableHead>
                <TableHead className="w-[120px]">Days Overdue</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOverdueItems.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={index % 2 === 0 ? "bg-muted/20" : ""}
                >
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.bookTitle}</TableCell>
                  <TableCell>{item.memberName}</TableCell>
                  <TableCell>{item.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      {item.daysOverdue} days
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleSendNotice(item.id)}
                    >
                      Send Notice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {filteredOverdueItems.length} of {overdueItems.length}{" "}
            overdue items
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
