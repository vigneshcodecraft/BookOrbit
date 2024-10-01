import "dotenv/config";
import {
  BooksTable,
  PaymentsTable,
  TransactionsTable,
} from "../../drizzle/schema";
import {
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  isNull,
  like,
  or,
} from "drizzle-orm";
import { IPageRequest, IPagedResponse } from "../pagination.response";
import { IRepository, SortOptions } from "../repository";
import { IPaymentBase, IPayment } from "./payment.model";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
export type PageOption = {
  offset?: number;
  limit?: number;
};

export class PaymentRepository implements IRepository<IPaymentBase, IPayment> {
  constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}

  async create(data: IPaymentBase): Promise<IPayment> {
    try {
      const paymentData: Omit<IPayment, "id"> = {
        ...data,
      };
      const [queryResult] = await this.db
        .insert(PaymentsTable)
        .values(paymentData)
        .returning({ id: PaymentsTable.id });
      const [insertedPayment] = await this.db
        .select()
        .from(PaymentsTable)
        .where(eq(PaymentsTable.id, queryResult.id));

      if (!insertedPayment) {
        throw new Error("Failed to retrieve the newly inserted payment");
      }
      return insertedPayment;
    } catch (e: any) {
      throw new Error(`Insertion failed: ${e.message}`);
    }
  }

  async update(
    id: number,
    data: Partial<IPaymentBase>
  ): Promise<IPayment | null> {
    try {
      const existingPayment = await this.getById(id);
      if (!existingPayment) {
        return null;
      }

      const updatedPayment: IPayment = {
        ...existingPayment,
        ...data,
      };

      await this.db
        .update(BooksTable)
        .set(updatedPayment)
        .where(eq(PaymentsTable.id, id));

      const editedPayment = await this.getById(id);
      if (!editedPayment) {
        throw new Error("Failed to retrieve the updated payment");
      }
      return editedPayment;
    } catch (e: any) {
      throw new Error(`Update failed: ${e.message}`);
    }
  }

  async delete(id: number): Promise<IPayment | null> {
    try {
      const existingPayment = await this.getById(id);
      if (!existingPayment) {
        return null;
      }
      await this.db.delete(PaymentsTable).where(eq(PaymentsTable.id, id));
      return existingPayment;
    } catch (e: any) {
      throw new Error(`Deletion failed: ${e.message}`);
    }
  }

  async getById(id: number): Promise<IPayment | null> {
    try {
      const [result] = await this.db
        .select()
        .from(PaymentsTable)
        .where(eq(PaymentsTable.id, id));
      return (result as IPayment) || null;
    } catch (e: any) {
      throw new Error(`Selection failed: ${e.message}`);
    }
  }

  async list(params: IPageRequest): Promise<IPagedResponse<IPayment>> {
    try {
      const search = params.search?.toLowerCase();
      const whereExpression = search
        ? or(
            ilike(PaymentsTable.memberId, `%${search}%`),
            ilike(PaymentsTable.professorId, `%${search}%`)
          )
        : undefined;
      const payments = await this.db
        .select()
        .from(PaymentsTable)
        .where(whereExpression)
        .limit(params.limit)
        .offset(params.offset);

      const result = await this.db
        .select({ count: count() })
        .from(PaymentsTable)
        .where(whereExpression);

      const totalCount = result[0].count;

      return {
        items: payments as IPayment[],
        pagination: {
          offset: params.offset,
          limit: params.limit,
          total: totalCount,
        },
      };
    } catch (e: any) {
      throw new Error(`Listing payments failed: ${e.message}`);
    }
  }

  async listMyPayments(
    params: IPageRequest,
    userId: number
  ): Promise<IPagedResponse<IPayment>> {
    try {
      const search = params.search?.toLowerCase();
      const whereExpression = and(
        eq(PaymentsTable.memberId, userId),
        search
          ? or(
              ilike(PaymentsTable.professorId, `%${search}%`),
              ilike(PaymentsTable.status, `%${search}%`)
            )
          : undefined
      );

      const payments = await this.db
        .select()
        .from(PaymentsTable)
        .where(whereExpression)
        .limit(params.limit)
        .offset(params.offset);

      const result = await this.db
        .select({ count: count() })
        .from(PaymentsTable)
        .where(whereExpression);

      const totalCount = result[0].count;

      return {
        items: payments as IPayment[],
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

  async getByProfessorIdAndMemberId(
    professorId: number,
    memberId: number
  ): Promise<number | null> {
    try {
      const [result] = await this.db
        .select()
        .from(PaymentsTable)
        .where(
          and(
            eq(PaymentsTable.professorId, professorId),
            eq(PaymentsTable.memberId, memberId),
            eq(PaymentsTable.status, "paid"),
            isNull(PaymentsTable.appointmentId)
          )
        );
      if (result) {
        return result.id;
      }
      return null;
    } catch (e: any) {
      throw new Error(`Selection failed: ${e.message}`);
    }
  }

  async totalPayments(): Promise<number> {
    const countPayments = await this.db
      .select({ count: count() })
      .from(PaymentsTable);
    return countPayments[0].count;
  }
}
