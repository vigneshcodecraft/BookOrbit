"use server";
import BookSection from "@/components/BookSection";
import DataNotFound from "@/components/DataNotFound";
import Pagination from "@/components/Pagination";
import ProfessorSection from "@/components/ProfessorSection";
import { fetchFilteredProfessors, fetchUserDetails } from "@/lib/actions";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const professorsPerPage = 6;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { professors, totalCount } = await fetchFilteredProfessors(
    query,
    currentPage,
    professorsPerPage
  );
  const totalPages = Math.ceil(Number(totalCount) / professorsPerPage);
  if (professors.length === 0) {
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
    <div className="flex-1 overflow-y-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        Book an Appointment with a Professor
      </h2>
      <ProfessorSection totalPages={totalPages} professors={professors} />
    </div>
  );
}
