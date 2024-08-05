import bcrypt from "bcrypt";

const createHash = async (plainTextPassword) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
  } catch (error) {
    throw error;
  }
};

export { createHash };
