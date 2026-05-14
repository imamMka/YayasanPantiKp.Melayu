"use server"
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { s3 } from "./s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

/**
 * NEWS ACTIONS
 */

export async function createNews(title: string, slug: string, category: string, content: string, quote: string | null, imageUrl: string, imageKey?: string | null) {
  await prisma.news.create({
    data: { title, slug, category, content, quote, imageUrl, imageKey }
  })
  revalidatePath("/news");
  revalidatePath("/admin/articles");
  revalidatePath("/admin/dashboard");
}

export async function deleteNews(id: string) {
  const numericId = Number(id);

  // 1. Get the news item to find the imageKey
  const news = await prisma.news.findUnique({
    where: { id: numericId },
    select: { imageKey: true }
  });

  // 2. If it has an imageKey, delete the file from Cloudflare R2
  if (news?.imageKey) {
    console.log(`[R2] Deleting news file: ${news.imageKey}`);
    try {
      await s3.send(new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: news.imageKey
      }));
    } catch (error) {
      console.error(`[R2] Failed to delete news file: ${news.imageKey}`, error);
    }
  }

  // 3. Delete from database
  await prisma.news.delete({
    where: { id: numericId },
  });
  
  revalidatePath("/news");
  revalidatePath("/admin/articles");
  revalidatePath("/admin/dashboard");
}

export async function updateNews(id: string, data: { title?: string; slug?: string; category?: string; content?: string; quote?: string | null; imageUrl?: string; imageKey?: string | null }) {
  const numericId = Number(id);
  
  // Handle old image deletion if a new one is provided
  if (data.imageKey) {
    const oldNews = await prisma.news.findUnique({
      where: { id: numericId },
      select: { imageKey: true }
    });
    
    if (oldNews?.imageKey && oldNews.imageKey !== data.imageKey) {
      console.log(`[R2] Deleting old news file: ${oldNews.imageKey}`);
      try {
        await s3.send(new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: oldNews.imageKey
        }));
      } catch (error) {
        console.error(`[R2] Failed to delete old news file: ${oldNews.imageKey}`, error);
      }
    }
  }

  await prisma.news.update({
    where: { id: numericId },
    data,
  });
  revalidatePath("/news");
  revalidatePath("/admin/articles");
  revalidatePath("/admin/dashboard");
}

export async function getNewsById(id: string) {
  const numericId = Number(id);
  return await prisma.news.findUnique({
    where: { id: numericId },
  });
}

/**
 * GALLERY ACTIONS
 */

export async function createGallery(title: string, imageUrl: string, imageKey?: string, albumId?: number | null) {
  await prisma.gallery.create({
    data: { title, imageUrl, imageKey, albumId }
  });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  revalidatePath("/admin/dashboard");
}

export async function deleteGallery(id: string) {
  const numericId = Number(id);

  // 1. Get the gallery item to find the imageKey
  const gallery = await prisma.gallery.findUnique({
    where: { id: numericId },
    select: { imageKey: true }
  });

  // 2. If it has an imageKey, delete the file from Cloudflare R2
  if (gallery?.imageKey) {
    console.log(`[R2] Deleting gallery file: ${gallery.imageKey}`);
    try {
      await s3.send(new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: gallery.imageKey
      }));
    } catch (error) {
      console.error(`[R2] Failed to delete gallery file: ${gallery.imageKey}`, error);
    }
  }

  // 3. Delete from database
  await prisma.gallery.delete({
    where: { id: numericId },
  });
  
  revalidatePath("/gallery");
  revalidatePath("/admin/dashboard");
}

export async function updateGallery(id: string, data: { title?: string; imageUrl?: string; imageKey?: string; albumId?: number | null }) {
  const numericId = Number(id);

  // Handle old image deletion if a new one is provided
  if (data.imageKey) {
    const oldGallery = await prisma.gallery.findUnique({
      where: { id: numericId },
      select: { imageKey: true }
    });
    
    if (oldGallery?.imageKey && oldGallery.imageKey !== data.imageKey) {
      console.log(`[R2] Deleting old gallery file: ${oldGallery.imageKey}`);
      try {
        await s3.send(new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: oldGallery.imageKey
        }));
      } catch (error) {
        console.error(`[R2] Failed to delete old gallery file: ${oldGallery.imageKey}`, error);
      }
    }
  }

  await prisma.gallery.update({
    where: { id: numericId },
    data,
  });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  revalidatePath("/admin/dashboard");
}

export async function getGalleryById(id: string) {
  const numericId = Number(id);
  return await prisma.gallery.findUnique({
    where: { id: numericId },
  });
}

/**
 * ALBUM ACTIONS
 */

export async function createAlbum(data: { title: string; year: number; description?: string; coverImage?: string; photoIds?: number[] }) {
  const { photoIds, ...albumData } = data;
  
  const album = await prisma.album.create({
    data: albumData
  });

  if (photoIds && photoIds.length > 0) {
    await prisma.gallery.updateMany({
      where: { id: { in: photoIds } },
      data: { albumId: album.id }
    });
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery/albums");
}

export async function deleteAlbum(id: number) {
  // First disconnect photos
  await prisma.gallery.updateMany({
    where: { albumId: id },
    data: { albumId: null }
  });

  await prisma.album.delete({
    where: { id }
  });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery/albums");
}

export async function updateAlbum(id: number, data: { title?: string; year?: number; description?: string; coverImage?: string; photoIds?: number[] }) {
  const { photoIds, ...albumData } = data;

  await prisma.album.update({
    where: { id },
    data: albumData
  });

  if (photoIds !== undefined) {
    // 1. Disconnect photos currently in this album but not in the new selection
    await prisma.gallery.updateMany({
      where: { 
        albumId: id,
        id: { notIn: photoIds }
      },
      data: { albumId: null }
    });

    // 2. Connect new photos to this album
    if (photoIds.length > 0) {
      await prisma.gallery.updateMany({
        where: { id: { in: photoIds } },
        data: { albumId: id }
      });
    }
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery/albums");
}

export async function getAlbums() {
  return await prisma.album.findMany({
    orderBy: { year: "desc" }
  });
}

/**
 * SETTINGS ACTIONS
 */

export async function getSettings() {
  let settings = await prisma.settings.findFirst({
    where: { id: 1 }
  });

  if (!settings) {
    // Create default settings if not exists
    settings = await prisma.settings.create({
      data: {
        id: 1,
        adminUsername: process.env.ADMIN_USERNAME || "admin",
        adminSecret: process.env.ADMIN_SECRET || "admin123",
      }
    });
  }

  return settings;
}

export async function updateSettings(data: { adminUsername?: string; adminSecret?: string; recoveryEmail?: string | null }) {
  await prisma.settings.update({
    where: { id: 1 },
    data
  });
  revalidatePath("/admin/settings");
}

export async function checkRecoveryEmail(email: string) {
  const settings = await prisma.settings.findUnique({
    where: { id: 1 }
  });
  return settings?.recoveryEmail === email;
}

export async function resetPassword(newSecret: string) {
  await prisma.settings.update({
    where: { id: 1 },
    data: { adminSecret: newSecret }
  });
  revalidatePath("/admin");
}
