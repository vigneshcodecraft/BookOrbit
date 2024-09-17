import { error } from "console";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { IPagedResponse, IPageRequest } from "../pagination.response";
import { ITransactionRepository } from "../repository";
import {
  ITransaction,
  ITransactionBase,
  ITransactionExtend,
} from "./transaction.model";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  BooksTable,
  MembersTable,
  TransactionsTable,
} from "../../drizzle/schema";
import { and, count, eq, like, ne, or } from "drizzle-orm";
import { formatDate } from "../utils";

export type PageOption = {
  offset?: number;
  limit?: number;
};

export class TransactionRepository
  implements ITransactionRepository<ITransactionBase, ITransaction>
{
  constructor(private readonly db: MySql2Database<Record<string, unknown>>) {}

  async create(data: ITransactionBase): Promise<ITransaction> {
    try {
      const transaction: Omit<ITransaction, "id"> = {
        ...data,
        status: "Pending",
      };

      const [result] = await this.db
        .insert(TransactionsTable)
        .values(transaction)
        .$returningId();
      const [insertedTransaction] = await this.db
        .select()
        .from(TransactionsTable)
        .where(eq(TransactionsTable.id, result.id));
      //const insertedTransaction = await this.getById(result.insertId);
      const [bookDetails] = await this.db
        .select()
        .from(BooksTable)
        .where(eq(BooksTable.id, insertedTransaction.bookId));

      if (!insertedTransaction) {
        throw new Error("Failed to retrieve the newly inserted transaction");
      }
      return insertedTransaction as ITransaction;
    } catch (error: any) {
      throw new Error(`Insertion failed: ${error.message}`);
    }
  }

  async getById(id: number): Promise<ITransaction | null> {
    try {
      const [result] = await this.db
        .select()
        .from(TransactionsTable)
        .where(eq(TransactionsTable.id, id));
      return (result as ITransaction) || null;
    } catch (e: any) {
      throw new Error(`Selection failed: ${e.message}`);
    }
  }

  async update(
    transactionId: number,
    returnDate: string
  ): Promise<ITransaction | null> {
    try {
      await this.db
        .update(TransactionsTable)
        .set({ returnDate: returnDate, status: "Returned" })
        .where(
          and(
            eq(TransactionsTable.id, transactionId),
            eq(TransactionsTable.status, "Issued")
          )
        );
      const [updatedTransaction] = await this.db
        .select()
        .from(TransactionsTable)
        .where(eq(TransactionsTable.id, transactionId));

      const [bookDetails] = await this.db
        .select()
        .from(BooksTable)
        .where(eq(BooksTable.id, updatedTransaction.bookId));

      await this.db
        .update(BooksTable)
        .set({ availableCopies: bookDetails.availableCopies + 1 })
        .where(eq(BooksTable.id, bookDetails.id));

      if (!updatedTransaction) {
        throw new Error("Failed to retrieve the newly updated transaction");
      }
      return updatedTransaction as ITransaction;
    } catch (e: any) {
      throw new Error(`Selection failed: ${e.message}`);
    }
  }

  async delete(id: number): Promise<ITransaction | null> {
    try {
      const existingTransaction = await this.getById(id);
      if (!existingTransaction) {
        return null;
      }
      const deleteTransaction = await this.db
        .delete(TransactionsTable)
        .where(eq(TransactionsTable.id, id));

      return existingTransaction;
    } catch (e: any) {
      throw new Error(`Deletion failed: ${e.message}`);
    }
  }

  async list(
    params: IPageRequest
  ): Promise<IPagedResponse<ITransactionExtend>> {
    try {
      const search = params.search?.toLowerCase();
      const whereExpression = search
        ? or(
            like(BooksTable.title, `%${search}%`),
            like(TransactionsTable.bookId, `%${search}%`),
            like(TransactionsTable.memberId, `%${search}%`)
          )
        : undefined;
      const transactions = await this.db
        .select({
          title: BooksTable.title,
          firstName: MembersTable.firstName,
          lastName: MembersTable.lastName,
          id: TransactionsTable.id,
          memberId: TransactionsTable.memberId,
          bookId: TransactionsTable.bookId,
          borrowDate: TransactionsTable.borrowDate,
          dueDate: TransactionsTable.dueDate,
          status: TransactionsTable.status,
          returnDate: TransactionsTable.returnDate,
        })
        .from(TransactionsTable)
        .innerJoin(BooksTable, eq(BooksTable.id, TransactionsTable.bookId))
        .innerJoin(
          MembersTable,
          eq(MembersTable.id, TransactionsTable.memberId)
        )
        .where(whereExpression)
        .limit(params.limit)
        .offset(params.offset);

      const [totalTransactionRows] = await this.db
        .select({ count: count() })
        .from(TransactionsTable)
        .innerJoin(BooksTable, eq(BooksTable.id, TransactionsTable.bookId))
        .innerJoin(
          MembersTable,
          eq(MembersTable.id, TransactionsTable.memberId)
        )
        .where(whereExpression);

      const totalTransaction = totalTransactionRows.count;
      return {
        items: transactions as ITransactionExtend[],
        pagination: {
          offset: params.offset,
          limit: params.limit,
          total: totalTransaction,
        },
      };
    } catch (e: any) {
      throw new Error(`Listing Transactions failed: ${e.message}`);
    }
  }

  async requestList(
    params: IPageRequest
  ): Promise<IPagedResponse<ITransactionExtend>> {
    try {
      const search = params.search?.toLowerCase();
      const whereExpression = search
        ? or(
            like(BooksTable.title, `%${search}%`),
            like(TransactionsTable.bookId, `%${search}%`),
            like(TransactionsTable.memberId, `%${search}%`)
          )
        : undefined;

      const requests = await this.db
        .select({
          title: BooksTable.title,
          firstName: MembersTable.firstName,
          lastName: MembersTable.lastName,
          id: TransactionsTable.id,
          memberId: TransactionsTable.memberId,
          bookId: TransactionsTable.bookId,
          borrowDate: TransactionsTable.borrowDate,
          dueDate: TransactionsTable.dueDate,
          status: TransactionsTable.status,
          returnDate: TransactionsTable.returnDate,
        })
        .from(TransactionsTable)
        .innerJoin(BooksTable, eq(BooksTable.id, TransactionsTable.bookId))
        .innerJoin(
          MembersTable,
          eq(MembersTable.id, TransactionsTable.memberId)
        )
        .where(and(eq(TransactionsTable.status, "Pending"), whereExpression))
        .limit(params.limit)
        .offset(params.offset);

      const [totalTransactionRows] = await this.db
        .select({ count: count() })
        .from(TransactionsTable)
        .where(and(eq(TransactionsTable.status, "Pending"), whereExpression));

      const totalTransaction = totalTransactionRows.count;
      return {
        items: requests as ITransactionExtend[],
        pagination: {
          offset: params.offset,
          limit: params.limit,
          total: totalTransaction,
        },
      };
    } catch (e: any) {
      throw new Error(`Listing Transactions failed: ${e.message}`);
    }
  }

  async listMyTransaction(userId: number) {
    try {
      const transactions = await this.db
        .select()
        .from(TransactionsTable)
        .where(
          and(
            eq(TransactionsTable.memberId, userId),
            ne(TransactionsTable.status, "Rejected")
          )
        );
      return transactions;
    } catch (e: any) {
      throw new Error(`Listing Transactions failed: ${e.message}`);
    }
  }

  async listMyRequest(
    params: IPageRequest,
    userId: number
  ): Promise<IPagedResponse<ITransactionExtend>> {
    try {
      const search = params.search?.toLowerCase();
      const whereExpression = search
        ? or(
            like(BooksTable.title, `%${search}%`),
            like(TransactionsTable.bookId, `%${search}%`),
            like(TransactionsTable.memberId, `%${search}%`)
          )
        : undefined;

      const requests = await this.db
        .select({
          title: BooksTable.title,
          id: TransactionsTable.id,
          bookId: TransactionsTable.bookId,
          borrowDate: TransactionsTable.borrowDate,
          status: TransactionsTable.status,
        })
        .from(TransactionsTable)
        .innerJoin(BooksTable, eq(BooksTable.id, TransactionsTable.bookId))
        .where(
          and(
            eq(TransactionsTable.status, "Pending"),
            eq(TransactionsTable.memberId, userId),
            whereExpression
          )
        )
        .limit(params.limit)
        .offset(params.offset);

      const [totalTransactionRows] = await this.db
        .select({ count: count() })
        .from(TransactionsTable)
        .innerJoin(BooksTable, eq(BooksTable.id, TransactionsTable.bookId))
        .where(
          and(
            eq(TransactionsTable.status, "Pending"),
            eq(TransactionsTable.memberId, userId),
            whereExpression
          )
        );

      const totalTransaction = totalTransactionRows.count;
      return {
        items: requests as ITransactionExtend[],
        pagination: {
          offset: params.offset,
          limit: params.limit,
          total: totalTransaction,
        },
      };
    } catch (e: any) {
      throw new Error(`Listing Transactions failed: ${e.message}`);
    }
  }

  async pendingRequests(): Promise<number> {
    const pendingRequest = await this.db
      .select({ count: count() })
      .from(TransactionsTable)
      .where(eq(TransactionsTable.status, "Pending"));
    return pendingRequest[0].count;
  }

  async totalTransactions(): Promise<number> {
    const countTransactions = await this.db
      .select({ count: count() })
      .from(TransactionsTable)
      .where(ne(TransactionsTable.status, "Pending"));
    return countTransactions[0].count;
  }
  async totalBorrowed(userId: number): Promise<number> {
    const totalBorrowedBooks = await this.db
      .select({ count: count() })
      .from(TransactionsTable)
      .where(
        and(
          eq(TransactionsTable.memberId, userId),
          or(
            eq(TransactionsTable.status, "Issued"),
            eq(TransactionsTable.status, "Returned")
          )
        )
      );
    return totalBorrowedBooks[0].count;
  }
  async totalReturned(userId: number): Promise<number> {
    const totalReturnedBooks = await this.db
      .select({ count: count() })
      .from(TransactionsTable)
      .where(
        and(
          eq(TransactionsTable.memberId, userId),
          eq(TransactionsTable.status, "Returned")
        )
      );
    return totalReturnedBooks[0].count;
  }
}
