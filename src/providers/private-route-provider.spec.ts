import { Request, Response, NextFunction } from "express";
import { PrivateRouteProvider, RequestUser } from "./private-route-provider";
import jwt from "jsonwebtoken";

describe("test PrivateRouteProvider", () => {
  const mockRequest = {} as Request;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  const mockNext = jest.fn() as unknown as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a status 403 if there is no token.", () => {
    PrivateRouteProvider(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockNext).not.toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Unauthorized access. Token not provided.",
    });
  });

  it("It should return a status 403 if the token is invalid.", () => {
    (mockRequest as RequestUser).user = {};

    mockRequest.headers = { authorization: "Bearer invalid_token" };

    PrivateRouteProvider(mockRequest, mockResponse, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: true,
      message: "invalid token",
    });
  });

  it("It should set up req.user and call next() if the token is valid", () => {
    const token = jwt.sign({ id: 1 }, process.env.PRIVATE_KEY);

    mockRequest.headers = { authorization: `Bearer ${token}` };

    PrivateRouteProvider(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
    expect((mockRequest as RequestUser).user).toEqual(
      expect.objectContaining({
        id: 1,
      })
    );
  });
});
