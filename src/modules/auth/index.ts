import { prismaService } from "../../database";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthController } from "./auth-controller";

const userRepo = new PrismaUsersRepository(prismaService);
const authController = new AuthController(userRepo);

export { authController };