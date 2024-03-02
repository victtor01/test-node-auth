import { prismaService } from "../../database";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { UserController } from "./user-controller";

const userRepo = new PrismaUsersRepository(prismaService);
const userController = new UserController(userRepo);

export { userController }