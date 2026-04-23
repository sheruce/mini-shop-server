import { Router, Request, Response } from "express";
import * as orderService from "../services/order";

export const orderRouter = Router();

orderRouter.post("/", async (req: Request, res: Response) => {
  const { items, remark } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ code: 1, message: "Items are required" });
    return;
  }

  try {
    const order = await orderService.createOrder(items, remark);
    res.json({ code: 0, message: "ok", data: order });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Create order failed";
    res.status(400).json({ code: 1, message });
  }
});

orderRouter.get("/", async (_req: Request, res: Response) => {
  const orders = await orderService.getOrders();
  res.json({ code: 0, message: "ok", data: orders });
});

orderRouter.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ code: 1, message: "Invalid order id" });
    return;
  }

  const order = await orderService.getOrderById(id);
  if (!order) {
    res.status(404).json({ code: 1, message: "Order not found" });
    return;
  }

  res.json({ code: 0, message: "ok", data: order });
});
