import { count, eq, like, or } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { IPageRequest, IPagedResponse } from "../pagination.response";
import { IRepository } from "../repository";
import { MembersTable } from "../../drizzle/schema";
import { IMember, IMemberBase } from "./member.model";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";

export class MemberRepository implements IRepository<IMemberBase, IMember> {
  constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}

  async create(memberData: IMemberBase): Promise<IMember> {
    try {
      const newMember: Omit<IMember, "id"> = {
        ...memberData,
      };

      const [result] = await this.db
        .insert(MembersTable)
        .values(newMember)
        .returning({ id: MembersTable.id });

      const [insertedMember] = await this.db
        .select()
        .from(MembersTable)
        .where(eq(MembersTable.id, result.id));
      // const insertedMember = await this.getById(queryResult.inserted);

      if (!insertedMember) {
        throw new Error("Failed to retrieve the newly inserted member");
      }
      return insertedMember as IMember;
    } catch (error: any) {
      throw new Error(`Insertion failed: ${error.message}`);
    }
  }

  async update(
    memberId: number,
    memberData: Partial<IMember>
  ): Promise<IMember | null> {
    try {
      const existingMember = await this.getById(memberId);
      if (!existingMember) {
        return null;
      }

      const updatedMember = {
        ...existingMember,
        ...memberData,
      };

      const updateMember = await this.db
        .update(MembersTable)
        .set(updatedMember)
        .where(eq(MembersTable.id, memberId));

      const editedMember = await this.getById(memberId);
      if (!editedMember) {
        throw new Error("Failed to retrieve the newly edited member");
      }
      return editedMember;
    } catch (error: any) {
      throw new Error(`Update failed: ${error.message}`);
    }
  }

  async delete(id: number): Promise<IMember | null> {
    try {
      const existingMember = await this.getById(id);
      if (!existingMember) {
        return null;
      }
      const deleteMember = await this.db
        .delete(MembersTable)
        .where(eq(MembersTable.id, id));

      return existingMember;
    } catch (e: any) {
      throw new Error(`Deletion failed: ${e.message}`);
    }
  }

  async getById(id: number): Promise<IMember | null> {
    try {
      const [result] = await this.db
        .select()
        .from(MembersTable)
        .where(eq(MembersTable.id, id));

      return (result as IMember) || null;
    } catch (e: any) {
      throw new Error(`Selection failed: ${e.message}`);
    }
  }

  async list(params: IPageRequest): Promise<IPagedResponse<IMember>> {
    try {
      const search = params.search?.toLowerCase();
      const whereExpression = search
        ? or(
            like(MembersTable.firstName, `%${search}%`),
            like(MembersTable.lastName, `%${search}%`)
          )
        : undefined;

      const members = await this.db
        .select()
        .from(MembersTable)
        .where(whereExpression)
        .limit(params.limit)
        .offset(params.offset);

      const [result] = await this.db
        .select({ count: count() })
        .from(MembersTable)
        .where(whereExpression);

      const totalCount = result.count;

      return {
        items: members as IMember[],
        pagination: {
          offset: params.offset,
          limit: params.limit,
          total: totalCount,
        },
      };
    } catch (e: any) {
      throw new Error(`Listing Members failed: ${e.message}`);
    } finally {
    }
  }

  async getByEmail(email: string): Promise<IMember | null> {
    try {
      const [result] = await this.db
        .select()
        .from(MembersTable)
        .where(eq(MembersTable.email, email));

      return (result as IMember) || null;
    } catch (e: any) {
      throw new Error(`Selection by email failed: ${e.message}`);
    }
  }

  async totalMembers(): Promise<number> {
    const countMember = await this.db
      .select({ count: count() })
      .from(MembersTable);
    return countMember[0].count;
  }
}

// async getByRefreshToken(refreshToken: string): Promise<IMember | null> {
//   try {
//     const [result] = await this.db
//       .select()
//       .from(MembersTable)
//       .where(eq(MembersTable.refreshToken, refreshToken));

//     return (result as IMember) || null;
//   } catch (e: any) {
//     throw new Error(`Selection by refreshToken failed: ${e.message}`);
//   }
// }

// async clearRefreshToken(memberId: number): Promise<IMember | null> {
//   try {
//     const existingMember = await this.getById(memberId);
//     if (!existingMember) {
//       return null;
//     }

//     const updatedMember = { ...existingMember, refreshToken: null };

//     await this.db
//       .update(MembersTable)
//       .set(updatedMember)
//       .where(eq(MembersTable.id, memberId));

//     return updatedMember;
//   } catch (error: any) {
//     throw new Error(`Failed to clear refresh token: ${error.message}`);
//   }
// }
