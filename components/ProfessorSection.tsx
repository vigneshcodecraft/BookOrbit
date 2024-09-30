import { IProfessor } from "@/lib/professors/professor.model";
import { Card, CardContent, CardFooter } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import Pagination from "./Pagination";
import { BookOpen, Briefcase, User } from "lucide-react";
import { fetchUserDetails } from "@/lib/actions";
import { ICustomer } from "./RazorPay";
import AppointmentDialog from "./AppointmentDialog";

export default async function ProfessorSection({
  professors,
  totalPages,
}: {
  professors: IProfessor[];
  totalPages: number;
}) {
  const currentUser = await fetchUserDetails();
  const customer: ICustomer = {
    name: currentUser?.firstName + " " + currentUser?.lastName,
    email: currentUser?.email!,
    phone: currentUser?.phone!.toString()!,
  };
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professors.map((professor) => (
          <Card
            key={professor.id}
            className="overflow-hidden bg-white border-2 border-primary/10 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105"
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">
                    {professor.name}
                  </h2>
                  <p className="text-sm font-medium text-primary/70">
                    {professor.department}
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-primary/80 font-medium">
                    {professor.department}
                  </span>
                </div>
                <div className="flex items-start space-x-3 text-sm">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-primary/80 flex-1">
                    {professor.bio}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-primary/5 p-4">
              <AppointmentDialog
                customer={customer}
                professor={professor}
                amount={300}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
