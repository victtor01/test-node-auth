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
<<<<<<< HEAD
  // get token of header request
=======
>>>>>>> 575cee0e09241e218d94771ee4929a7efcfb2e15
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
<<<<<<< HEAD
    // set user decode of request
=======
>>>>>>> 575cee0e09241e218d94771ee4929a7efcfb2e15
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
