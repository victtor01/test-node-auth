import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface RequestUser extends Request {
  user: JwtPayload | string;
}

const PrivateRouteProvider = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req?.headers?.authorization
    ?.replace("Bearer", "")
    .replace(" ", "");

  if (!token) {
    return res
      .status(403)
      .json({ error: "Unauthorized access. Token not provided." });
  }

  try {
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);
    (req as RequestUser).user = decode;
    next();
  } catch (error) {
    return res.status(403).json({
      error: true,
      message: "invalid token",
    });
  }
};

export { PrivateRouteProvider };
