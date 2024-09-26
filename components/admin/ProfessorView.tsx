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
import { handleDeleteMember, handleDeleteProfessor } from "@/lib/actions";
import SearchBar from "../SearchBar";
import Link from "next/link";
import Pagination from "../Pagination";
import AlertDialogBox from "./AlertDialogBox";
import { IProfessor } from "@/lib/professors/professor.model";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { handleInviteProfessor } from "@/lib/actions";
export default function ProfessorView({
  professors,
  totalPages,
}: {
  professors: IProfessor[];
  totalPages: number;
}) {
  const { toast } = useToast();
  const [inviteEmail, setInviteEmail] = useState("");
  const handleInvite = async () => {
    const result = await handleInviteProfessor(inviteEmail);
    console.log(result);
    toast({
      title: result.resource ? "Success" : "Error",
      description: result.resource
        ? "Invitation sent successfully"
        : result.message,
      variant: result.resource ? "success" : "destructive",
      duration: 2000,
    });
  };
  const handleDelete = async (id: number) => {
    const result = await handleDeleteProfessor(id);
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
        <CardTitle>Manage Professors</CardTitle>
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
          <SearchBar placeholder="Search professors..." />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Invite User
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Invite a New Professor</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter the email address of the professor you want to invite.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input
                type="email"
                placeholder="professor@university.edu"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleInvite}>
                  Send Invitation
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department Name</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead>Calendly Link</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professors.map((professor) => (
                <TableRow key={professor.id}>
                  <TableCell>{professor.name}</TableCell>
                  <TableCell>{professor.department}</TableCell>
                  <TableCell>{professor.bio}</TableCell>
                  <TableCell>{professor.calendlyLink}</TableCell>
                  <TableCell className="flex">
                    <Link href={`/admin/professors/${professor.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <AlertDialogBox tableName="member" id={professor.id} />
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
