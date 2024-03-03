import { Router } from "express";
import { authController } from "../modules/auth";

const authRouter = Router();

authRouter.post("/auth", (req, res) => {
  authController.auth(req, res);
});

export { authRouter };
