import zod from "zod";

const zodSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(6, { message: "Password must contain atleast 6 characters" })
    .max(14, { message: "Password must contain atmost 14 characters" }),
});

const signInValidation = (req, res, next) => {
  const response = zodSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(411).json({
      error: "Validation error",
      message: response.error.errors[0].message,
    });
  }

  next();
};

export { signInValidation };
