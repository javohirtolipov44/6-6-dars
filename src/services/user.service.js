import AppDataSource from "../config/database.js";
import Post from "../entity/post.entitie.js";
import User from "../entity/user.entitie.js";

class userService {
  async addUser(body) {
    const { firstName, lastName, email, age } = body;
    if (firstName && lastName && email && age) {
      const userRepo = AppDataSource.getRepository(User);
      const findUser = await userRepo.findOne({ where: { email } });
      if (findUser) {
        throw new Error("Email allaqachon ro'yxatdan o'tgan");
      }

      const user = userRepo.create(body);
      await userRepo.save(user);
      return user;
    }
    throw new Error("Barcha ustunlar to'ldirilishi shart");
  }

  async getAllUser() {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.find();
    return user;
  }

  async getUser(params) {
    const id = params.id;
    const userRepo = AppDataSource.getRepository(User);
    const postRepo = AppDataSource.getRepository(Post);
    const findUser = await userRepo.findOne({ where: { id } });
    const findPost = await postRepo.find({ where: { user: { id } } });
    if (findUser) {
      return {
        ...findUser,
        posts: [findPost],
      };
    }
    throw new Error("Foydalanuvchi topilmadi");
  }

  async updateUser(params, body) {
    const id = params.id;
    const { firstName, lastName, age } = body;
    const userRepo = AppDataSource.getRepository(User);

    const result = await userRepo
      .createQueryBuilder()
      .update(User)
      .set({ firstName, lastName, age })
      .where({ id })
      .returning("*")
      .execute();
    if (result.affected === 1) {
      return result.raw[0];
    }
    throw new Error("Foydalanuvchi topilmadi");
  }

  async deleteUser(params) {
    const id = +params.id;
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.delete(id);
    if (user.affected === 1) {
      return {
        status: "success",
        message: "Foydalanuvchi muvaffaqiyatli o'chirildi",
      };
    }
    throw new Error("Foydalanuvchi topilmadi");
  }
}

export default userService;
