import prisma from "./lib/prisma.js";

console.log("Prisma keys:", Object.keys(prisma));
if (prisma.album) {
  console.log("Album model found!");
} else {
  console.log("Album model NOT found on prisma instance.");
}
process.exit(0);
