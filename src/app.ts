import express from "express";
import cors from "cors";
import { productRouter } from "./routes/product";
import { orderRouter } from "./routes/order";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/api/health", (_req, res) => {
  res.json({ code: 0, message: "ok" });
});

export { app };
