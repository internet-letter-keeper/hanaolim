"use server";

import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export const getPresignedPost = async (fileName: string) => {
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
    Expires: 300,
  });

  return { ...presignedPost, key };
};
