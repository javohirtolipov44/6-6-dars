import AppDataSource from "../config/database.js";
import Post from "../entity/post.entitie.js";
import User from "../entity/user.entitie.js";

class postService {
  async createPost(body) {
    const { title, content, userId } = body;
    const userRepo = AppDataSource.getRepository(User);
    const postRepo = AppDataSource.getRepository(Post);
    const user = await userRepo.findOne({ where: { id: userId } });
    if (user) {
      const newPost = postRepo.create({ title, content, user });
      await postRepo.save(newPost);
      return newPost;
    }
    throw new Error("Foydalanuvchi mavjud emas");
  }

  async allPost() {
    const postRepo = AppDataSource.getRepository(Post);
    const posts = await postRepo
      .createQueryBuilder("post")
      .innerJoin("post.user", "user")
      .select([
        "post.id",
        "post.title",
        "post.content",
        "post.createdAt",
        "post.updatedAt",
        "user.id",
        "user.firstName",
        "user.lastName",
      ])
      .getMany();

    return posts;
  }

  async getPost(params) {
    const id = params.id;
    const postRepo = AppDataSource.getRepository(Post);
    const post = await postRepo.findOne({
      where: { id },
      relations: ["user"],
    });
    if (post) {
      return post;
    }
    throw new Error("Maqola topilmadi");
  }

  async updatePost(params, body) {
    const id = params.id;
    const { title, content } = body;
    const postRepo = AppDataSource.getRepository(Post);
    const result = await postRepo.update(id, { title, content });
    if (result.affected === 1) {
      const postWithUser = await postRepo
        .createQueryBuilder("post")
        .innerJoin("post.user", "user")
        .where("post.id = :id", { id })
        .select([
          "post.id",
          "post.title",
          "post.content",
          "post.createdAt",
          "post.updatedAt",
          "user.id",
          "user.firstName",
          "user.lastName",
        ])
        .getOne();
      return postWithUser;
    }
    throw new Error("Maqola topilmadi");
  }

  async deletePost(params) {
    const id = +params.id;
    const postRepo = AppDataSource.getRepository(Post);
    const post = await postRepo.delete(id);
    if (post.affected === 1) {
      return {
        status: "success",
        message: "Maqola muvaffaqiyatli o'chirildi",
      };
    }
    throw new Error("Maqola topilmadi");
  }
}

export default postService;
