import { Request, Response } from "express";
import { IUserRepository } from "../../repositories/users-repository";
import { User } from "../../entities/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthController {
  constructor(private userRepo: IUserRepository) {}

  private PRIVATE_KEY = process.env.PRIVATE_KEY;

  async auth(req: Request, res: Response) {
    // get email and password
    const { email, password } = req.body;

    // verify props
    if (!email || !password) {
      return res.status(400).json({
        message: "Campos faltando!",
        error: true,
      });
    }

    // get user of database
    const userExists: User | undefined = await this.userRepo.findByEmail(email);

    // verify if user exists
    if (!userExists?.email) {
      return res.status(400).json({
        message: "Usuário não existe!",
        error: true,
      });
    }

    // get passowrd of user
    const { password: passhash } = userExists;

    // verify password
    if (!(await bcrypt.compare(password, passhash))) {
      return res.status(403).json({
        message: "Senha incorreta!",
        error: true,
      });
    }

    // create data for jwt
    const dataSign = {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
    };

    const token = jwt.sign(dataSign, this.PRIVATE_KEY, {
      expiresIn: 3600,
    });

    //return response
    return res.status(200).json({
      error: false,
      message: "usuário logado.",
      token,
    });
  }
}

export { AuthController };
