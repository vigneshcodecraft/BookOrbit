import "dotenv/config";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import {
  BooksTable,
  MembersTable,
  TransactionsTable,
} from "../../drizzle/schema";
import { and, asc, count, desc, eq, ilike, like, or } from "drizzle-orm";
import { IPageRequest, IPagedResponse } from "../pagination.response";
import { IRepository, SortOptions } from "../repository";
import { IBook, IBookBase } from "./book.model";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
export type PageOption = {
  offset?: number;
  limit?: number;
};

export class BookRepository implements IRepository<IBookBase, IBook> {
  constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}

  async create(data: IBookBase): Promise<IBook> {
    try {
      const newBookData: Omit<IBook, "id"> = {
        ...data,
        availableCopies: data.totalCopies,
      };
      const [queryResult] = await this.db
        .insert(BooksTable)
        .values(newBookData)
        .returning({ id: BooksTable.id });
      const [insertedBook] = await this.db
        .select()
        .from(BooksTable)
        .where(eq(BooksTable.id, queryResult.id));

      if (!insertedBook) {
        throw new Error("Failed to retrieve the newly inserted Book");
      }
      return insertedBook;
    } catch (e: any) {
      throw new Error(`Insertion failed: ${e.message}`);
    }
  }

  async update(id: number, data: IBookBase): Promise<IBook | null> {
    try {
      const existingBook = await this.getById(id);
      if (!existingBook) {
        return null;
      }

      const updatedBook: IBook = {
        ...existingBook,
        ...data,
        availableCopies:
          data.totalCopies +
          existingBook.availableCopies -
          existingBook.totalCopies,
      };

      await this.db
        .update(BooksTable)
        .set(updatedBook)
        .where(eq(BooksTable.id, id));

      const editedBook = await this.getById(id);
      if (!editedBook) {
        throw new Error("Failed to retrieve the updated book");
      }
      return editedBook;
    } catch (e: any) {
      throw new Error(`Update failed: ${e.message}`);
    }
  }

  async delete(id: number): Promise<IBook | null> {
    try {
      const existingBook = await this.getById(id);
      if (!existingBook) {
        return null;
      }
      await this.db.delete(BooksTable).where(eq(BooksTable.id, id));
      return existingBook;
    } catch (e: any) {
      throw new Error(`Deletion failed: ${e.message}`);
    }
  }

  async getById(id: number): Promise<IBook | null> {
    try {
      const [result] = await this.db
        .select()
        .from(BooksTable)
        .where(eq(BooksTable.id, id));
      return (result as IBook) || null;
    } catch (e: any) {
      throw new Error(`Selection failed: ${e.message}`);
    }
  }

  async checkBookAvailability(id: number): Promise<boolean> {
    try {
      const existingBook = await this.getById(id);
      if (existingBook && existingBook.availableCopies > 0) {
        return true;
      }
      return false;
    } catch (e: any) {
      throw new Error(`Handling book failed: ${e.message}`);
    }
  }

  async list(
    params: IPageRequest,
    sortOptions?: SortOptions<IBook>
  ): Promise<IPagedResponse<IBook>> {
    try {
      let sortOrder = asc(BooksTable.id);
      const search = params.search?.toLowerCase();
      const whereExpression = search
        ? or(
            like(BooksTable.title, `%${search}%`),
            like(BooksTable.isbnNo, `%${search}%`)
          )
        : undefined;
      if (sortOptions) {
        const sortBy = BooksTable[sortOptions.sortBy] || BooksTable.author;
        sortOrder =
          sortOptions.sortOrder === "desc" ? desc(sortBy) : asc(sortBy);
      }
      const books = (await this.db
        .select()
        .from(BooksTable)
        .where(whereExpression)
        .limit(params.limit)
        .offset(params.offset)
        .orderBy(sortOrder)) as IBook[];

      const result = await this.db
        .select({ count: count() })
        .from(BooksTable)
        .where(whereExpression);

      const totalCount = result[0].count;

      return {
        items: books as IBook[],
        pagination: {
          offset: params.offset,
          limit: params.limit,
          total: totalCount,
        },
      };
    } catch (e: any) {
      throw new Error(`Listing books failed: ${e.message}`);
    }
  }

  async listMyBook(
    params: IPageRequest,
    userId: number
  ): Promise<IPagedResponse<IBook>> {
    try {
      const search = params.search?.toLowerCase();
      const whereExpression = search
        ? or(
            like(BooksTable.title, `%${search}%`),
            like(BooksTable.isbnNo, `%${search}%`)
          )
        : undefined;

      const innerJoinExpression = and(
        eq(TransactionsTable.bookId, BooksTable.id),
        eq(TransactionsTable.memberId, userId),
        eq(TransactionsTable.status, "Issued")
      );

      const books = await this.db
        .select({
          title: BooksTable.title,
          author: BooksTable.author,
          price: BooksTable.price,
          publisher: BooksTable.publisher,
          pages: BooksTable.pages,
          image: BooksTable.image,
          availableCopies: BooksTable.availableCopies,
          totalCopies: BooksTable.totalCopies,
          genre: BooksTable.genre,
          isbnNo: BooksTable.isbnNo,
          id: BooksTable.id,
        })
        .from(BooksTable)
        .innerJoin(TransactionsTable, innerJoinExpression)
        .where(whereExpression)
        .limit(params.limit)
        .offset(params.offset);

      const result = await this.db
        .select({ count: count() })
        .from(BooksTable)
        .innerJoin(TransactionsTable, innerJoinExpression)
        .where(whereExpression);

      const totalCount = result[0].count;

      return {
        items: books as IBook[],
        pagination: {
          offset: params.offset,
          limit: params.limit,
          total: totalCount,
        },
      };
    } catch (e: any) {
      throw new Error(`Listing my books failed: ${e.message}`);
    }
  }
  async totalBooks(): Promise<number> {
    const countBooks = await this.db
      .select({ count: count() })
      .from(BooksTable);
    return countBooks[0].count;
  }
}
