import postService from "../services/post.service.js";

class postController {
  constructor() {
    this.postService = new postService();
  }

  async createPostController(req, res) {
    try {
      const post = await this.postService.createPost(req.body);
      return res.status(201).json(post);
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getAllPostController(req, res) {
    try {
      const post = await this.postService.allPost(req.body);
      return res.status(200).json(post);
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getPostController(req, res) {
    try {
      const params = req.params;
      const post = await this.postService.getPost(params);
      if (post) {
        res.status(200).json(post);
      }
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async updatePostController(req, res) {
    try {
      const params = req.params;
      const body = req.body;
      const post = await this.postService.updatePost(params, body);
      if (post) {
        res.status(200).json(post);
      }
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async deletePostController(req, res) {
    try {
      const params = req.params;
      const post = await this.postService.deletePost(params);
      if (post) {
        res.status(200).json(post);
      }
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default postController;
