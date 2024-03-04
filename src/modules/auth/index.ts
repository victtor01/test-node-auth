import { prismaService } from "../../database";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthController } from "./auth-controller";

// inject dependecies
const userRepo = new PrismaUsersRepository(prismaService);
const authController = new AuthController(userRepo);

// return auth controller
export { authController };