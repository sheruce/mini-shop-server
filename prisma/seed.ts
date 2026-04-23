import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: "Classic T-Shirt", description: "Comfortable cotton t-shirt", price: 99.0, stock: 100, status: 1 },
      { name: "Denim Jeans", description: "Slim fit denim jeans", price: 199.0, stock: 50, status: 1 },
      { name: "Canvas Sneakers", description: "Lightweight canvas sneakers", price: 159.0, stock: 80, status: 1 },
      { name: "Baseball Cap", description: "Adjustable baseball cap", price: 49.0, stock: 200, status: 1 },
    ],
  });

  console.log("Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
