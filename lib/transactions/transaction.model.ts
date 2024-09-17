import { z } from "zod";

export const transactionBaseSchema = z.object({
  memberId: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  bookId: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  borrowDate: z.string(),
  dueDate: z.string(),
});

export const transactionExtendSchema = z.object({
  memberId: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  bookId: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  title: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  borrowDate: z.string(),
  dueDate: z.string(),
});

export const transactionSchema = transactionBaseSchema.extend({
  id: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  returnDate: z.string().default("-").optional(),
  status: z.enum(["Issued", "Returned", "Pending", "Rejected"]),
});

export const extendedTransactionSchema = transactionExtendSchema.extend({
  id: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  returnDate: z.string().nullable(),
  status: z.enum(["Issued", "Returned", "Pending", "Rejected"]),
});

export const returnSchema = z.object({
  id: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  returnDate: z.string().default("-"),
});

export type ITransactionBase = z.infer<typeof transactionBaseSchema>;
export type ITransaction = z.infer<typeof transactionSchema>;
export type RTransaction = z.infer<typeof returnSchema>;

export type ITransactionExtend = z.infer<typeof extendedTransactionSchema>;
