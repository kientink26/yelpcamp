import prisma from "../db.js";
import { comparePasswords, createJWT } from "../utils/auth.js";
import { invalidCredentialError } from "../utils/errors.js";

export const createAuthenticationToken = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return next(invalidCredentialError);
  }
  const match = await comparePasswords(password, user.passwordHash);

  if (!match) {
    return next(invalidCredentialError);
  }
  const token = createJWT(user);
  res.json({ token });
};
