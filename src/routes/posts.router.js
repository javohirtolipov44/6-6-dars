import { Router } from "express";
import postController from "../controllers/post.controller.js";

const postRouter = Router();
const controller = new postController();

postRouter.post("/posts", (req, res) =>
  controller.createPostController(req, res)
);

postRouter.get("/posts", (req, res) =>
  controller.getAllPostController(req, res)
);

postRouter.get("/posts/:id", (req, res) =>
  controller.getPostController(req, res)
);

postRouter.put("/posts/:id", (req, res) =>
  controller.updatePostController(req, res)
);

postRouter.delete("/posts/:id", (req, res) =>
  controller.deletePostController(req, res)
);

export default postRouter;
