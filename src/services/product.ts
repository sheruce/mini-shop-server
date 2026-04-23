import { prisma } from "../lib/prisma";

export async function getProducts() {
  return prisma.product.findMany({
    where: { status: 1 },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: number) {
  return prisma.product.findUnique({ where: { id } });
}
