import { User } from "../../entities/User";
import { IUserReposity } from "../../repositories/users-repository";
import { Request, Response } from "express";

class UserController {
  constructor(private readonly userRepo: IUserReposity) {}

  async create(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;

      if (!email || !name || !password) {
        return res.status(400).json({
          error: "Campos faltando!",
        });
      }

      //user exists
      const userExists = await this.userRepo.findByEmail(email);

      if (userExists?.email) {
        return res.status(400).json({
          error: "Email já cadastrado!",
        });
      }

      // create DTO
      const user: User = new User(req.body);

      // find a user where email equal email in body request
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
