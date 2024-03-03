import { hash } from "bcrypt";
import { User } from "../../entities/user";
import { IUserRepository } from "../../repositories/users-repository";
import { Request, Response } from "express";

class UserController {
  constructor(private readonly userRepo: IUserRepository) {}

  private readonly saltsPasswordHash = 8;

  private hashPassword(password: string) {
    return hash(password, this.saltsPasswordHash);
  }

  async create(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;

      // confirm data of body
      if (!email || !name || !password) {
        return res.status(400).json({
          error: "Campos faltando!",
        });
      }

      //user exists
      const userExists = await this.userRepo.findByEmail(email);

      // if user exists
      if (userExists?.email) {
        return res.status(400).json({
          error: "Email já cadastrado!",
        });
      }

      // bcrypt password of user
      const pass = await this.hashPassword(password);

      // create user entity
      const user: User = new User({
        password: pass,
        name,
        email,
      });

      // create user
      await this.userRepo.store(user);

      // if user exists in database
      return res.status(200).json({
        message: "usuário cadastrado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Houve um erro ao tentar cadastrar, tente novamente mais tarde!",
      });
    }
  }

}

export { UserController };
