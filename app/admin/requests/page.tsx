import RequestsView from "@/components/admin/RequestsView";
import { fetchFilteredRequest } from "@/lib/actions";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const requestsPerPage = 8;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { requests, totalCount } = await fetchFilteredRequest(
    query,
    currentPage,
    requestsPerPage
  );

  const totalPages = Math.ceil(Number(totalCount) / requestsPerPage);

  return (
    <>
      <RequestsView requests={requests} totalPages={totalPages} />
    </>
  );
}
