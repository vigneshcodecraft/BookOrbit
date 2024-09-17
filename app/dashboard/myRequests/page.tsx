"use server";
import DataNotFound from "@/components/DataNotFound";
import RequestBook from "@/components/RequestBook";
import { fetchMyRequest, fetchUserDetails } from "@/lib/actions";
import { request } from "http";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const booksPerPage = 6;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const currentUser = await fetchUserDetails();
  console.log(currentUser);
  const { requests, totalCount } = await fetchMyRequest(
    query,
    currentPage,
    booksPerPage,
    currentUser?.id!
  );
  console.log(requests);
  const totalPages = Math.ceil(Number(totalCount) / booksPerPage);
  if (requests.length === 0) {
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
      <RequestBook totalPages={totalPages} requests={requests} />
    </div>
  );
}
