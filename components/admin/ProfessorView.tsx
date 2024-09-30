"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Edit, Trash2, RefreshCw } from "lucide-react";
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
import {
  handleDeleteMember,
  handleDeleteProfessor,
  refreshProfessors,
} from "@/lib/actions";
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
import ProfessorDialog from "./ProfessorDialog";
export default function ProfessorView({
  professors,
  totalPages,
}: {
  professors: IProfessor[];
  totalPages: number;
}) {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshProfessors = async () => {
    setIsRefreshing(true);
    try {
      console.log("Refreshing professors...");
      const result = await refreshProfessors();
      console.log(result);
      toast({
        title: "Refresh Successful",
        description: "Professor list has been updated.",
        variant: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error refreshing professors:", error);
      toast({
        title: "Refresh Failed",
        description: "An error occurred while refreshing the professor list.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsRefreshing(false);
    }
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
          <div className="flex space-x-2">
            <Button
              onClick={handleRefreshProfessors}
              disabled={isRefreshing}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
              variant="outline"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
            <ProfessorDialog />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Calendly Link</TableHead>

                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professors.map((professor) => (
                <TableRow key={professor.id}>
                  <TableCell>{professor.name}</TableCell>
                  <TableCell>{professor.email}</TableCell>
                  <TableCell>{professor.department}</TableCell>
                  <TableCell>{professor.bio}</TableCell>
                  <TableCell>{professor.inviteStatus}</TableCell>
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
