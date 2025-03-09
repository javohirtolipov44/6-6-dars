import "dotenv/config";
import express from "express";
import Routes from "./routes/routes.js";
import AppDataSource from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", Routes());

const bootstrap = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
    app.listen(PORT, () => console.log("Server is running", PORT));
  } catch (error) {
    console.error(error.message);
  }
};

bootstrap();
