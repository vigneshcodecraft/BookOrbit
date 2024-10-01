"use client";
import { updatePaymentWithAppointment } from "@/lib/actions";
import React from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

const CalendlyWidget = ({
  url,
  name,
  email,
  paymentId,
}: {
  url: string;
  name: string;
  email: string;
  paymentId: number;
}) => {
  useCalendlyEventListener({
    onEventScheduled: (event) => {
      const appointmentUuid = event.data.payload.event.uri.split("/")[4];
      async () => {
        const updateAppointment = await updatePaymentWithAppointment(
          paymentId,
          appointmentUuid
        );
        if (updateAppointment?.success) {
          console.log("Appointment updated successfully");
        } else {
          console.log("Appointment update failed");
        }
      };
    },
  });
  return (
    <div className="App">
      <InlineWidget url={url} prefill={{ name, email }} />
    </div>
  );
};

export default CalendlyWidget;
