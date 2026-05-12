import { NextRequest, NextResponse } from "next/server";
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: NextRequest) {
  const bucket = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!bucket || !publicUrl) {
    return NextResponse.json(
      { message: "R2_BUCKET_NAME atau R2_PUBLIC_URL belum dikonfigurasi." },
      { status: 500 },
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ message: "File upload tidak ditemukan." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;

  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    });
    await s3.send(command);
  } catch (error) {
    return NextResponse.json(
      { message: "Upload ke Cloudflare R2 gagal.", error: String(error) },
      { status: 500 },
    );
  }

  const url = `${publicUrl}/${fileName}`;
  return NextResponse.json({ url, key: fileName });
}
