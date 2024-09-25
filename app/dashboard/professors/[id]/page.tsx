import BookForm from "@/components/admin/BookForm";
import CalendlyWidget from "@/components/CalendlyWidget";
import DataNotFound from "@/components/DataNotFound";
import { fetchProfessorById, fetchUserDetails } from "@/lib/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log("id", id);
  const professor = await fetchProfessorById(Number(id));
  const currentUser = await fetchUserDetails();

  if (!professor.calendlyLink) {
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
      <CalendlyWidget
        url={professor.calendlyLink}
        name={`${currentUser?.firstName} ${currentUser?.lastName}`}
        email={currentUser?.email!}
      />
    </>
  );
}
