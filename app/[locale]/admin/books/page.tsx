import BooksView from "@/components/admin/BooksView";
import {
  fetchFilteredBooks,
  fetchUniqueGenre,
  fetchUserDetails,
} from "@/lib/actions";
import { IBook, IBookBase } from "@/lib/books/book.model";
import { SortOptions } from "@/lib/repository";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sort: keyof IBookBase;
    order: "asc" | "desc";
  };
}) {
  const booksPerPage = 8;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const genre = await fetchUniqueGenre();
  let sortOptions: SortOptions<IBook> = {
    sortBy: searchParams?.sort || "id",
    sortOrder: searchParams?.order || "asc",
  };
  const { books, totalCount } = await fetchFilteredBooks(
    query,
    currentPage,
    booksPerPage,
    sortOptions
  );

  const totalPages = Math.ceil(Number(totalCount) / booksPerPage);
  console.log(genre);
  return (
    <div>
      <BooksView
        totalPages={totalPages}
        books={books}
        sortOptions={sortOptions}
      />
    </div>
  );
}
