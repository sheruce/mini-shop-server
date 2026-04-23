import { prisma } from "../lib/prisma";

interface OrderItemInput {
  productId: number;
  quantity: number;
}

function generateOrderNo(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${date}${random}`;
}

export async function createOrder(items: OrderItemInput[], remark?: string) {
  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const productMap = new Map(products.map((p) => [p.id, p]));

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Product "${product.name}" has insufficient stock`);
    }
  }

  return prisma.$transaction(async (tx) => {
    let totalPrice = 0;
    const orderItems: { productId: number; quantity: number; price: number }[] = [];

    for (const item of items) {
      const product = productMap.get(item.productId)!;
      const price = Number(product.price);
      totalPrice += price * item.quantity;
      orderItems.push({ productId: item.productId, quantity: item.quantity, price });

      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return tx.order.create({
      data: {
        orderNo: generateOrderNo(),
        totalPrice,
        remark,
        items: { create: orderItems },
      },
      include: { items: true },
    });
  });
}

export async function getOrders() {
  return prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderById(id: number) {
  return prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });
}
