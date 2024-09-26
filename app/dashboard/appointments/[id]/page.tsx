import BookForm from "@/components/admin/BookForm";
import CalendlyWidget from "@/components/CalendlyWidget";
import DataNotFound from "@/components/DataNotFound";
import {
  fetchProfessorById,
  fetchUserDetails,
  rescheduleAppointments,
} from "@/lib/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log("id:", id);
  const rescheduleURL = await rescheduleAppointments(id);
  const currentUser = await fetchUserDetails();
  const name = `${currentUser?.firstName} ${currentUser?.lastName}`;
  const email = currentUser?.email!;

  if (!rescheduleURL) {
    return (
      <>
        <DataNotFound
          title="No Data Available"
          message="It looks like we don't have any data to display at the moment."
          actionLabel="Go Back"
        />
      </>
    );
  }
  return (
    <>
      <CalendlyWidget url={rescheduleURL} name={name} email={email} />
    </>
  );
}
