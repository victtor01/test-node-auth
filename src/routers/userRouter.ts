import { Router } from "express";
import { userController } from "../controllers/user/user-module";

const userRouter = Router();

userRouter.post("/users", (req, res) => {
  userController.create(req, res);
});

export { userRouter };
