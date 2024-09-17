import MembersView from "@/components/admin/MembersView";
import { fetchFilteredMembers, fetchUserDetails } from "@/lib/actions";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const membersPerPage = 8;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { members, totalCount } = await fetchFilteredMembers(
    query,
    currentPage,
    membersPerPage
  );
  const totalPages = Math.ceil(Number(totalCount) / membersPerPage);

  return (
    <div>
      <MembersView totalPages={totalPages} members={members} />
    </div>
  );
}
