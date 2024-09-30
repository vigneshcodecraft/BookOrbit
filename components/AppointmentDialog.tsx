"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Razorpay, { ICustomer } from "@/components/RazorPay";
import { IProfessor } from "@/lib/professors/professor.model";
import { IndianRupee, User } from "lucide-react";

interface AppointmentDialogProps {
  professor: IProfessor;
  amount: number;
  customer: ICustomer;
}

export default function AppointmentDialog({
  customer,
  professor,
  amount,
}: AppointmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-primary text-white hover:bg-primary/90 transition-colors duration-300">
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary mb-4">
            Book Appointment
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-primary">
                {professor.name}
              </h3>
              <p className="text-sm text-gray-600">{professor.department}</p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-primary/5 p-4 rounded-lg">
            <span className="font-semibold text-primary">Appointment Fee</span>
            <div className="flex items-center">
              <IndianRupee className="w-5 h-5 mr-1 text-primary" />
              <span className="text-lg font-bold text-primary">{amount}</span>
            </div>
          </div>
          <Razorpay
            amount={amount}
            customer={customer}
            redirectUrl={`/dashboard/professors/${professor.id}`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
