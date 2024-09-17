import BooksView from "@/components/admin/BooksView";
import {
  fetchFilteredBooks,
  fetchUniqueGenre,
  fetchUserDetails,
} from "@/lib/actions";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const booksPerPage = 8;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const genre = await fetchUniqueGenre();
  const { books, totalCount } = await fetchFilteredBooks(
    query,
    currentPage,
    booksPerPage
  );
  const totalPages = Math.ceil(Number(totalCount) / booksPerPage);
  console.log(genre);
  return (
    <div>
      <BooksView totalPages={totalPages} books={books} />
    </div>
  );
}
