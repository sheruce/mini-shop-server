import { Router, Request, Response } from "express";
import * as productService from "../services/product";

export const productRouter = Router();

productRouter.get("/", async (_req: Request, res: Response) => {
  const products = await productService.getProducts();
  res.json({ code: 0, message: "ok", data: products });
});

productRouter.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ code: 1, message: "Invalid product id" });
    return;
  }

  const product = await productService.getProductById(id);
  if (!product) {
    res.status(404).json({ code: 1, message: "Product not found" });
    return;
  }

  res.json({ code: 0, message: "ok", data: product });
});
