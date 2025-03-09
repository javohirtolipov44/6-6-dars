import userService from "../services/user.service.js";

class userController {
  constructor() {
    this.userService = new userService();
  }

  async addUserController(req, res) {
    try {
      const body = req.body;
      const user = await this.userService.addUser(body);
      if (user) {
        res.status(201).json(user);
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getAllUserController(req, res) {
    try {
      const users = await this.userService.getAllUser();
      if (users) {
        res.json(users);
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getUserController(req, res) {
    try {
      const params = req.params;
      const user = await this.userService.getUser(params);
      if (user) {
        res.json(user);
      }
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async updateUserController(req, res) {
    try {
      const params = req.params;
      const body = req.body;
      const user = await this.userService.updateUser(params, body);
      if (user) {
        res.json(user);
      }
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async deleteUserController(req, res) {
    try {
      const params = req.params;
      const user = await this.userService.deleteUser(params);
      if (user) {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default userController;
