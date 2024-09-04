import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: `${process.env.JWT_EXPIRY}`,
    }
  );
  return token;
};

export { generateToken };
