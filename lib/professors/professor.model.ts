import z from "zod";

export const professorBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  department: z.string().min(1, "Department is required"),
  bio: z.string().min(1, "Short bio is required"),
});

export const professorSchema = professorBaseSchema.extend({
  id: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  inviteStatus: z.enum(["Accepted", "Pending"]),
  calendlyLink: z
    .string()
    .url("Invalid Calendly link")
    .min(1, "Calendly link is required"),
});

export type IProfessorBase = z.infer<typeof professorBaseSchema>;
export type IProfessor = z.infer<typeof professorSchema>;
