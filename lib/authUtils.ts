import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import 'dotenv/config'

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION = {
  expiresIn: "1hr",
};

export function signToken(
  payload: JwtPayload,
  option: SignOption = DEFAULT_SIGN_OPTION
) {
  const token = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    option
  );
  return token;
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    return decoded as JwtPayload;
  } catch (error) {
    return null;
  }
}

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};
