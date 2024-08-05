import bcrypt from "bcrypt";

const validatePassword = async (candidatePassword, hashedPassword) => {
  try {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  } catch (error) {
    throw error;
  }
};

export { validatePassword };
