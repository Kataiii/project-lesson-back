import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log(path.resolve(__dirname, "../.env"));

import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";
import productRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import { swaggerUi, specs } from "./swagger";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/auth", authRoutes);
app.use("/api", [todoRoutes, productRoutes]);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express backend!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
