import z from "zod";

export const simulatorScreenSchema = z.object({
  grossSalary: z.number().positive(),
  dependents: z.number().nonnegative(),
  transportationVoucher: z.number().nonnegative(),
  mealVoucher: z.number().nonnegative(),
  healthPlan: z.number().nonnegative(),
  otherDeductions: z.number().nonnegative(),
});

export type simulatorScreenSchemaType = z.infer<typeof simulatorScreenSchema>;
