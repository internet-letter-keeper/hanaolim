import { ERROR_MESSAGES } from "@/constants/message";
import { getPresignedPost } from "@/lib/actions/upload-actions";

export const uploadToS3 = async (file: File) => {
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
      const errorText = await uploadRes.text();
      console.error(
        ERROR_MESSAGES.FILE.S3_UPLOAD_FAILED,
        uploadRes.status,
        errorText
      );

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
  } catch (error) {
    throw new Error(ERROR_MESSAGES.COMMON.SERVER_ERROR);
  }
};
