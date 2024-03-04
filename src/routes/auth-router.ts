import { Router } from "express";
import { authController } from "../modules/auth";

const authRouter = Router();

//auth user
authRouter.post("/auth", (req, res) => {
  authController.auth(req, res);
});

export { authRouter };
