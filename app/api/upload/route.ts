// app/api/upload/route.ts
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export async function POST(req: Request) {
  const { fileName } = await req.json();

  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION!,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
  });

  const key = `uploads/${Date.now()}-${fileName}`;

  const presignedPost = await createPresignedPost(s3, {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: key,
    Conditions: [["starts-with", "$Content-Type", ""]],
    Fields: { acl: "public-read" },
    Expires: 60, // 1분
  });

  return Response.json({ ...presignedPost, key });
}
