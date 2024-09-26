import CancelAppointment from "@/components/CancelAppointment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchUserDetails, getUsersAppointments } from "@/lib/actions";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  VideoIcon,
  MapPinIcon,
} from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const currentUser = await fetchUserDetails();
  if (!currentUser) {
    return null;
  }
  const appointments = await getUsersAppointments(currentUser.email);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Your Appointments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <Card
            key={appointment.uri}
            className="w-full bg-white border-2 border-primary/10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="pb-2 border-b border-primary/10">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-primary">
                  {appointment.eventName}
                </CardTitle>
                <Badge
                  variant={
                    appointment.status === "active"
                      ? "default"
                      : appointment.status === "inactive"
                      ? "secondary"
                      : appointment.status === "canceled"
                      ? "destructive"
                      : "outline"
                  }
                  className="capitalize text-xs font-semibold"
                >
                  {appointment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center space-x-3 text-sm text-primary/80">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">{appointment.date}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-primary/80">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ClockIcon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">{appointment.time}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-primary/80">
                <div className="bg-primary/10 p-2 rounded-full">
                  <UserIcon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">{appointment.professorName}</span>
              </div>
              <div className=" flex items-center space-x-3 text-sm text-primary/80">
                {appointment.meetingUrl ? (
                  <Link
                    href={appointment.meetingUrl}
                    className="flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <div className="bg-primary/10 p-2 rounded-full">
                      <VideoIcon className="h-4 w-4 text-primary" />
                    </div>
                    <span>Join Google Meet</span>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-2 text-sm font-medium text-primary/80">
                    <div className=" bg-primary/10 p-2 rounded-full">
                      <MapPinIcon className="h-5 w-5 text-primary" />
                    </div>
                    <span>Physically Scheduled</span>
                  </div>
                )}
              </div>
            </CardContent>
            {appointment.status !== "canceled" && (
              <CardFooter className="bg-primary/5 pt-4 pb-4 rounded-b-lg flex justify-between">
                <Link href={`/dashboard/appointments/${appointment.uri}`}>
                  <Button variant="default">Reschedule</Button>
                </Link>
                <CancelAppointment event_uuid={appointment.uri} />
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
