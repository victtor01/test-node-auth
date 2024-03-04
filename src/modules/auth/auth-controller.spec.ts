import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { Request, Response } from "express";
import { AuthController } from "./auth-controller";
import { prismaService } from "../../database";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

jest.mock("../../repositories/prisma/prisma-users-repository");

describe("AuthController tests", () => {
  const PrismaUsersRepositoryMock = PrismaUsersRepository as jest.Mock;
  const findByEmailMock = jest.fn();

  PrismaUsersRepositoryMock.mockImplementation(() => ({
    findByEmail: findByEmailMock,
  }));

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

    const authController = new AuthController(
      new PrismaUsersRepository(prismaService)
    );

    findByEmailMock.mockResolvedValueOnce({
      id: uuidv4(),
      name: "teste",
      email: "teste@gmail.com",
      password: await bcrypt.hash("teste", 8),
    });

    // Act
    await authController.auth(request, response);

    // Assert
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

    const userRepo = new PrismaUsersRepository(prismaService);
    const authController = new AuthController(userRepo);

    // Act
    await authController.auth(request, response);

    // Assert
    expect(response.status).toHaveBeenCalledWith(400);

    expect(response.json).toHaveBeenCalledWith({
      message: "Usuário não existe!",
      error: true,
    });
  });

  it("It should return 403 due to the incorrect password.", async () => {
    const request: Request = {
      body: {
        email: "test@gmail.com",
        password: "wrong password.",
      },
    } as Request;

    findByEmailMock.mockResolvedValueOnce({
      id: uuidv4(),
      name: "teste",
      email: "teste@gmail.com",
      password: await bcrypt.hash("teste", 8),
    });

    const userRepo = new PrismaUsersRepository(prismaService);
    const authController = new AuthController(userRepo);

    // Act
    await authController.auth(request, response);

    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      message: "Senha incorreta!",
      error: true,
    });
  });
});
