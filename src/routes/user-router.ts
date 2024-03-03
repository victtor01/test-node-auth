import { Router } from "express";
import { userController } from "../modules/user";

const userRouter = Router();

userRouter.post("/users", (req, res) => {
  userController.create(req, res);
});

export { userRouter };
