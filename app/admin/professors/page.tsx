import MembersView from "@/components/admin/MembersView";
import ProfessorView from "@/components/admin/ProfessorView";
import { fetchFilteredProfessors, fetchUserDetails } from "@/lib/actions";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const transactionsPerPage = 8;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { professors, totalCount } = await fetchFilteredProfessors(
    query,
    currentPage,
    transactionsPerPage
  );
  const totalPages = Math.ceil(Number(totalCount) / transactionsPerPage);

  return (
    <div>
      <ProfessorView totalPages={totalPages} professors={professors} />
    </div>
  );
}
