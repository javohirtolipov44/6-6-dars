import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRouter = Router();
const controller = new userController();

userRouter.post("/user", (req, res) => controller.addUserController(req, res));
userRouter.get("/users", (req, res) =>
  controller.getAllUserController(req, res)
);
userRouter.get("/users/:id", (req, res) =>
  controller.getUserController(req, res)
);
userRouter.put("/users/:id", (req, res) =>
  controller.updateUserController(req, res)
);
userRouter.delete("/users/:id", (req, res) =>
  controller.deleteUserController(req, res)
);

export default userRouter;
