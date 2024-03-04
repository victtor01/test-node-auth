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

<<<<<<< HEAD
  // create response
=======
>>>>>>> 575cee0e09241e218d94771ee4929a7efcfb2e15
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

<<<<<<< HEAD
    // get authController
=======
>>>>>>> 575cee0e09241e218d94771ee4929a7efcfb2e15
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

<<<<<<< HEAD
    // get autController
=======
>>>>>>> 575cee0e09241e218d94771ee4929a7efcfb2e15
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
<<<<<<< HEAD
    // create request
=======
>>>>>>> 575cee0e09241e218d94771ee4929a7efcfb2e15
    const request: Request = {
      body: {
        email: "test@gmail.com",
        password: "wrong password.",
      },
    } as Request;

<<<<<<< HEAD
    // sumule
=======
>>>>>>> 575cee0e09241e218d94771ee4929a7efcfb2e15
    findByEmailMock.mockResolvedValueOnce({
      id: uuidv4(),
      name: "teste",
      email: "teste@gmail.com",
      password: await bcrypt.hash("teste", 8),
    });

<<<<<<< HEAD
    // get authController
=======
>>>>>>> 575cee0e09241e218d94771ee4929a7efcfb2e15
    const userRepo = new PrismaUsersRepository(prismaService);
    const authController = new AuthController(userRepo);

    // Act
    await authController.auth(request, response);

<<<<<<< HEAD
    // test
=======
>>>>>>> 575cee0e09241e218d94771ee4929a7efcfb2e15
    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      message: "Senha incorreta!",
      error: true,
    });
  });
});
