import { count, eq, like, or } from "drizzle-orm";
import { IPageRequest, IPagedResponse } from "../pagination.response";
import { IRepository } from "../repository";
import { ProfessorsTable } from "../../drizzle/schema";
import { IProfessor, IProfessorBase } from "./professor.model";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";

export class ProfessorRepository
  implements IRepository<IProfessorBase, IProfessor>
{
  constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}

  async create(professorData: IProfessorBase): Promise<IProfessor> {
    try {
      const newMember: Omit<IProfessor, "id"> = {
        ...professorData,
      };

      const [result] = await this.db
        .insert(ProfessorsTable)
        .values(newMember)
        .returning({ id: ProfessorsTable.id });

      const [insertedProfessor] = await this.db
        .select()
        .from(ProfessorsTable)
        .where(eq(ProfessorsTable.id, result.id));
      // const insertedMember = await this.getById(queryResult.inserted);

      if (!insertedProfessor) {
        throw new Error("Failed to retrieve the newly inserted member");
      }
      return insertedProfessor as IProfessor;
    } catch (error: any) {
      throw new Error(`Insertion failed: ${error.message}`);
    }
  }

  async update(
    professorId: number,
    professorData: Partial<IProfessor>
  ): Promise<IProfessor | null> {
    try {
      const existingMember = await this.getById(professorId);
      if (!existingMember) {
        return null;
      }

      const updatedMember = {
        ...existingMember,
        ...professorData,
      };

      const updateMember = await this.db
        .update(ProfessorsTable)
        .set(updatedMember)
        .where(eq(ProfessorsTable.id, professorId));

      const editedMember = await this.getById(professorId);
      if (!editedMember) {
        throw new Error("Failed to retrieve the newly edited member");
      }
      return editedMember;
    } catch (error: any) {
      throw new Error(`Update failed: ${error.message}`);
    }
  }

  async delete(id: number): Promise<IProfessor | null> {
    try {
      const existingMember = await this.getById(id);
      if (!existingMember) {
        return null;
      }
      const deleteMember = await this.db
        .delete(ProfessorsTable)
        .where(eq(ProfessorsTable.id, id));

      return existingMember;
    } catch (e: any) {
      throw new Error(`Deletion failed: ${e.message}`);
    }
  }

  async getById(id: number): Promise<IProfessor | null> {
    try {
      const [result] = await this.db
        .select()
        .from(ProfessorsTable)
        .where(eq(ProfessorsTable.id, id));

      return (result as IProfessor) || null;
    } catch (e: any) {
      throw new Error(`Selection failed: ${e.message}`);
    }
  }

  async list(params: IPageRequest): Promise<IPagedResponse<IProfessor>> {
    try {
      const search = params.search?.toLowerCase();
      const whereExpression = search
        ? or(
            like(ProfessorsTable.name, `%${search}%`),
            like(ProfessorsTable.department, `%${search}%`)
          )
        : undefined;

      const professors = await this.db
        .select()
        .from(ProfessorsTable)
        .where(whereExpression)
        .limit(params.limit)
        .offset(params.offset);

      const [result] = await this.db
        .select({ count: count() })
        .from(ProfessorsTable)
        .where(whereExpression);

      const totalCount = result.count;

      return {
        items: professors as IProfessor[],
        pagination: {
          offset: params.offset,
          limit: params.limit,
          total: totalCount,
        },
      };
    } catch (e: any) {
      throw new Error(`Listing Professors failed: ${e.message}`);
    } finally {
    }
  }
  async totalProfessors(): Promise<number> {
    const countProfessor = await this.db
      .select({ count: count() })
      .from(ProfessorsTable);
    return countProfessor[0].count;
  }
}
