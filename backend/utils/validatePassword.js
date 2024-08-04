import bcrypt from "bcrypt";

const validatePassword = async (candidatePassword, hashedPassword) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

export { validatePassword };
