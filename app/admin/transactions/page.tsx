import TransactionsView from "@/components/admin/TransactionsView";
import { fetchFilteredTransactions } from "@/lib/actions";
import { ITransactionExtend } from "@/lib/transactions/transaction.model";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const transactionsPerPage = 8;
  console.log(transactionsPerPage);
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { transactions, totalCount } = await fetchFilteredTransactions(
    query,
    currentPage,
    transactionsPerPage
  );

  const totalPages = Math.ceil(Number(totalCount) / transactionsPerPage);

  return (
    <>
      <TransactionsView transactions={transactions} totalPages={totalPages} />
    </>
  );
}
