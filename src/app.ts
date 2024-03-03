import express, { Express, Response } from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user-router";
import { authRouter } from "./routes/auth-router";
import { PrivateRouteProvider, RequestUser } from "./providers/private-route-provider";

dotenv.config();

// init app express
const app: Express = express();

app.use(express.json());
app.use(userRouter);
app.use(authRouter);

app.use("*", PrivateRouteProvider);

app.get("/home", (req: RequestUser, res: Response) => {
  return res.status(200).json({
    error: req.user,
  });
});

export { app };
