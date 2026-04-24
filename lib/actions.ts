"use server"
import prisma  from "./prisma";
import { revalidatePath } from "next/cache";

// CRUD News
export async function createNews(title: string, content: string, quote: string, imageUrl: string, imageKey?: string) {
    await prisma.news.create({
        data: { title, content, quote, imageUrl, imageKey }
    })
    revalidatePath("/news");
}

//CRUD Gallery
export async function createGallery(title: string, imageUrl: string, imageKey?: string) {
    await prisma.gallery.create({
        data: { title, imageUrl, imageKey }
    });
    revalidatePath("/gallery");
}