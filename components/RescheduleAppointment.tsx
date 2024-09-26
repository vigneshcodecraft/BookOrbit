// "use client";
// import { cancelAppointments, rescheduleAppointments } from "@/lib/actions";
// import { Button } from "./ui/button";
// import { useToast } from "./hooks/use-toast";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import CalendlyWidget from "./CalendlyWidget";

// export default function RescheduleAppointment({
//   event_uuid,
// }: {
//   event_uuid: string;
// }) {
//   const { toast } = useToast();
//   const [rescheduleURL, setRescheduleURL] = useState("");
//   async function handleReschedule(event_uuid: string) {
//     const result = await rescheduleAppointments(event_uuid);
//     setRescheduleURL(result);
//   }
//   return (
//     <div>
//       <Button
//         variant="default"
//         onClick={() => {
//           handleReschedule(event_uuid);
//         }}
//       >
//         Reschedule
//       </Button>
//       {rescheduleURL && <CalendlyWidget url={rescheduleURL} name=""/>}
//     </div>
//   );
// }
