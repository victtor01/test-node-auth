import { PrismaClient } from "@prisma/client";
import { User } from "../../entities/User";
import { IUserReposity } from "../users-repository";

export class PrismaUsersRepository implements IUserReposity {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async store(data: User): Promise<User> {
    return await this.prisma.user.create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }
}
