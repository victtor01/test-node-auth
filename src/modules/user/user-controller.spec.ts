import { Request, Response } from "express";
import { prismaService } from "../../database";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { UserController } from "./user-controller";

describe("Prisma users repository tests", () => {
  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it("should create a user.", async () => {
    // create request
    const request: Request = {
      body: {
        name: "teste22",
        email: "teste22@gmail.com",
        password: "teste",
      },
    } as Request;

    // create response
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;

    // simule
    PrismaUsersRepository.prototype.findByEmail = jest
      .fn()
      .mockResolvedValueOnce(null);
    PrismaUsersRepository.prototype.store = jest
      .fn()
      .mockImplementationOnce(async (user) => user);

    // get resopnse of userController
    const userRepo = new PrismaUsersRepository(prismaService);
    const userController = new UserController(userRepo);
    await userController.create(request, response);

    // test
    expect(response.status).toHaveBeenCalledWith(200);
  });
});
