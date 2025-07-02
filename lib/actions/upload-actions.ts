"use server";

import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { ERROR_MESSAGES } from "@/constants/message";

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

export const postUploadToS3 = async (file: File) => {
  try {
    //  Presigned URL 발급
    const { url, fields, key } = await getPresignedPost(file.name);

    //  FormData 생성 및 파일 업로드
    const formData = new FormData();
    Object.entries(fields).forEach(([k, v]) => formData.append(k, v as string));
    formData.append("Content-Type", file.type);
    formData.append("file", file);

    const uploadRes = await fetch(url, {
      method: "POST",
      body: formData,
    });

    // 업로드
    if (!uploadRes.ok) {
      if (uploadRes.status === 403) {
        throw new Error(ERROR_MESSAGES.FILE.UNAUTHORIZED_UPLOAD);
      } else if (uploadRes.status >= 500) {
        throw new Error(ERROR_MESSAGES.COMMON.SERVER_ERROR);
      } else {
        throw new Error(ERROR_MESSAGES.FILE.UPLOAD_FAILED);
      }
    }

    // 성공 시 S3 URL 반환
    const s3Url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
    return s3Url;
  } catch {
    throw new Error(ERROR_MESSAGES.COMMON.SERVER_ERROR);
  }
};
