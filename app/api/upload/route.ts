import { NextRequest, NextResponse } from "next/server";
import { s3 } from "@/lib/s3";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;

    await s3.upload({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type, 
    }).promise();

    const url = `${process.env.R2_PUBLIC_URL}/${fileName}`;
    return NextResponse.json({ url });
}

