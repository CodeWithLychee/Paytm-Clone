import zod from "zod";

const zodSchema = zod.object({
  fromAccountNumber: zod
    .string()
    .min(12, { message: "Account Number must contain atleast 12 digits" })
    .max(16, { message: "Account Number must contain atmost 12 digits" })
    .regex(/^\d+$/, {
      message: "Account Number must contain only digits",
    }),

  toAccountNumber: zod
    .string()
    .min(12, { message: "Account Number must contain atleast 12 digits" })
    .max(16, { message: "Account Number must contain atmost 12 digits" })
    .regex(/^\d+$/, {
      message: "Account Number must contain only digits",
    }),

  pin: zod
    .string()
    .min(4, { message: "Pin must contain atleast 4 characters" })
    .max(6, { message: "Pin must contain atmost 6 characters" }),

  amount: zod.number(),
});

const transferMoneyValidation = (req, res, next) => {
  const response = zodSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(411).json({
      error: "Validation error",
      message: response.error.errors[0].message,
    });
  }

  next();
};

export { transferMoneyValidation };
