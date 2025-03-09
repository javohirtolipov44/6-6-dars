import { DataSource } from "typeorm";
import User from "../entity/user.entitie.js";
import Post from "../entity/post.entitie.js";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  synchronize: true, // Ishlab chiqarishda false qilish tavsiya etiladi
  logging: false,
  entities: [User, Post],
});

export default AppDataSource;
