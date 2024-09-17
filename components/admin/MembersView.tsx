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
import { IMember } from "@/lib/members/member.model";
import { useToast } from "../hooks/use-toast";
import { handleDeleteMember } from "@/lib/actions";
import SearchBar from "../SearchBar";
import Link from "next/link";
import Pagination from "../Pagination";
import AlertDialogBox from "./AlertDialogBox";

export default function MembersView({
  members,
  totalPages,
}: {
  members: IMember[];
  totalPages: number;
}) {
  const { toast } = useToast();
  const handleDelete = async (id: number) => {
    const result = await handleDeleteMember(id);
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
        <CardTitle>Member Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          {/* <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search members"
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          <SearchBar placeholder="Search members..." />
          <Link href="/admin/members/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </Link>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>FirstName</TableHead>
                <TableHead>LastName</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.firstName}</TableCell>
                  <TableCell>{member.lastName}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.address}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="flex">
                    <Link href={`/admin/members/${member.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <AlertDialogBox tableName="member" id={member.id} />
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
