import prisma from "../db.js";
import { hashPassword } from "../utils/auth.js";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword(password),
      activated: false,
    },
  });
  res.json({ user: user });
};
