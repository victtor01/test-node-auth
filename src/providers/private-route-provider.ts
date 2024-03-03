import { NextFunction, Response, Request, response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../entities/user";

export interface RequestUser extends Request {
  user: JwtPayload | string;
}

const PrivateRouteProvider = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(403)
      .json({ error: "Acesso não autorizado. Token não fornecido." });
  }

  try {
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);

    if (!decode) {
      res.status(403).json({
        error: true,
        message: "invalid token",
      });
    }

    (req as RequestUser).user = decode;

    next();
  } catch (error) {
    console.log("houve um erro:", error);
    return res.status(403).json({ error: "Houve um erro desconhecido" });
  }
};

export { PrivateRouteProvider };
