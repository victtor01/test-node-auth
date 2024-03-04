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
  // get token of header request
  const token = req?.headers?.authorization
    ?.replace("Bearer", "")
    .replace(" ", "");

  // veirfy if null
  if (!token) {
    return res
      .status(403)
      .json({ error: "Unauthorized access. Token not provided." });
  }

  try {
    // decode
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);
    // set user decode of request
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
