"use server"
import prisma  from "./prisma";
import { revalidatePath } from "next/cache";

// CRUD News
export async function createNews(title: string, content: string, quote: string, imageUrl: string) {
    await prisma.news.create({
        data: { title, content, quote, imageUrl }
    })
    revalidatePath("/news");
}

//CRUD Gallery
export async function createGallery(title: string, imageUrl: string) {
    await prisma.gallery.create({
        data: { title, imageUrl }
    });
    revalidatePath("/gallery");
}