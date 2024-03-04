import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { Request, Response } from "express";
import { AuthController } from "./auth-controller";
import { prismaService } from "../../database";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

jest.mock("../../repositories/prisma/prisma-users-repository");

describe("AuthController tests", () => {
  // create prisma mock
  const PrismaUsersRepositoryMock = PrismaUsersRepository as jest.Mock;
  //create functino mock
  const findByEmailMock = jest.fn();

  // implement prisma users repository
  PrismaUsersRepositoryMock.mockImplementation(() => ({
    findByEmail: findByEmailMock,
  }));

  // create response
  const response: Response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 200 and a token on successful authentication", async () => {
    // Arrange
    const request: Request = {
      body: {
        email: "teste@gmail.com",
        password: "teste",
      },
    } as Request;

    // get authController
    const authController = new AuthController(
      new PrismaUsersRepository(prismaService)
    );

    // simule
    findByEmailMock.mockResolvedValueOnce({
      id: uuidv4(),
      name: "teste",
      email: "teste@gmail.com",
      password: await bcrypt.hash("teste", 8),
    });

    // Act
    await authController.auth(request, response);

    // test
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      error: false,
      message: "usuário logado.",
      token: expect.any(String),
    });
  });

  it("should return a status 400 due to the absence of the user.", async () => {
    // Arrange
    const request: Request = {
      body: {
        email: "undefined@gmail.com",
        password: "undefined",
      },
    } as Request;

    // get autController
    const userRepo = new PrismaUsersRepository(prismaService);
    const authController = new AuthController(userRepo);

    // Act
    await authController.auth(request, response);

    // test
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Usuário não existe!",
      error: true,
    });
  });

  it("It should return 403 due to the incorrect password.", async () => {
    // create request
    const request: Request = {
      body: {
        email: "test@gmail.com",
        password: "wrong password.",
      },
    } as Request;

    // sumule
    findByEmailMock.mockResolvedValueOnce({
      id: uuidv4(),
      name: "teste",
      email: "teste@gmail.com",
      password: await bcrypt.hash("teste", 8),
    });

    // get authController
    const userRepo = new PrismaUsersRepository(prismaService);
    const authController = new AuthController(userRepo);

    // Act
    await authController.auth(request, response);

    // test
    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      message: "Senha incorreta!",
      error: true,
    });
  });
});
