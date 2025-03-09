import { EntitySchema } from "typeorm";
import User from "./user.entitie.js";

const Post = new EntitySchema({
  name: "Post",
  tableName: "posts",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    userId: {
      type: "int",
    },
    title: {
      type: "varchar",
      length: 255,
    },
    content: {
      type: "text",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    user: {
      target: User,
      type: "many-to-one",
      joinColumn: { name: "userId" },
      onDelete: "CASCADE",
      cascade: true,
    },
  },
});

export default Post;
