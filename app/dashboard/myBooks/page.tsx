"use server";
import BookSection from "@/components/BookSection";
import DataNotFound from "@/components/DataNotFound";
import Pagination from "@/components/Pagination";
import { fetchMyBooks, fetchUserDetails } from "@/lib/actions";
import { redirect } from "next/navigation";

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
  const { books, totalCount } = await fetchMyBooks(
    query,
    currentPage,
    booksPerPage,
    currentUser?.id!
  );
  const totalPages = Math.ceil(Number(totalCount) / booksPerPage);
  if (books.length === 0) {
    return (
      <>
        <DataNotFound
          title="Book Not Found"
          message="It looks like we don't have any data to display at the moment."
          actionLabel="Go Back"
        />
      </>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Book Collection</h2>
      <BookSection totalPages={totalPages} books={books} />
    </div>
  );
}
