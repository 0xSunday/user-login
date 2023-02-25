import { compare, hash } from "bcrypt";

export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export async function verifyPassword(password, hashedPassword) {
  const isvalid = await compare(password, hashedPassword);
  return isvalid;
}
