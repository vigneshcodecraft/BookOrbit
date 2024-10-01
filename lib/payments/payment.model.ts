import { z } from "zod";

// Zod schema for payment validation
export const PaymentBaseSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  paymentId: z.string().min(1, "Razorpay Payment ID is required"),
  amount: z.string().min(1, "Amount is required"),
  currency: z.string().length(3, "Currency must be a 3-letter code"),
  status: z.enum(["paid", "failed", "pending"]),
  memberId: z.number().int().positive("Member ID must be a positive integer"),
  professorId: z
    .number()
    .int()
    .positive("Professor ID must be a positive integer"),
  appointmentId: z.string().min(1, "Appointment ID is required").nullable(),
});

export const PaymentSchema = PaymentBaseSchema.extend({
  id: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
});

// Type inference from Zod schema
export type IPayment = z.infer<typeof PaymentSchema>;
export type IPaymentBase = z.infer<typeof PaymentBaseSchema>;
