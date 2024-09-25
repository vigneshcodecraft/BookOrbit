"use client";
import { cancelAppointments } from "@/lib/actions";
import { Button } from "./ui/button";
import { useToast } from "./hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CancelAppointment({
  event_uuid,
}: {
  event_uuid: string;
}) {
  const { toast } = useToast();
  async function handleCancel(event_uuid: string) {
    const result = await cancelAppointments(event_uuid);
    console.log("result:", result);
    toast({
      title: result.resource ? "Success" : "Error",
      description: result.resource
        ? "Appointment Cancelled Successfully"
        : "Unable to cancel your appointment, try again later",
      variant: result.resource ? "success" : "destructive",
      duration: 2000,
    });
  }
  return (
    <Button
      variant="destructive"
      onClick={() => {
        handleCancel(event_uuid);
      }}
    >
      Cancel
    </Button>
  );
}
