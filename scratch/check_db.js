
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const news = await prisma.news.findMany({ take: 5 });
  const gallery = await prisma.gallery.findMany({ take: 5 });
  console.log('News:', JSON.stringify(news, null, 2));
  console.log('Gallery:', JSON.stringify(gallery, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
