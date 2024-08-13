import zod from "zod";

const zodSchema = zod.object({
  username: zod
    .string()
    .min(4, {
      message: "Username must contain atleast 4 characters",
    })
    .max(30, {
      message: "Username must contain atmost 30 characters",
    }),
  fullName: zod.string(),
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(6, {
      message: "Password must contain atleast 6 characters",
    })
    .max(14, {
      message: "Password must contain atmost 14 characters",
    }),
  // phoneNumber: zod
  //   .string()
  //   .length(10, {
  //     message: "PhoneNumber must conatins exactly 10 digits",
  //   })
  //   .regex(/^[1-9]\d{9}$/, {
  //     message:
  //       "Phone number must not start with 0 or doesn't contain any character",
  //   }),
});

const signUpValidation = (req, res, next) => {
  const response = zodSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(411).json({
      error: "Validation error",
      message: response.error.errors[0].message,
    });
  }

  next();
};

export { signUpValidation };
