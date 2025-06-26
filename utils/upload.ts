export const getPresignedPost = async (file: File) => {
  const res = await fetch("/api/upload", {
    method: "POST",
    body: JSON.stringify({ fileName: file.name }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Presigned URL 발급 실패");
  return res.json();
};

export const uploadToS3 = async (file: File): Promise<string> => {
  const { url, fields, key } = await getPresignedPost(file);
  const formData = new FormData();
  Object.entries(fields).forEach(([k, v]) => formData.append(k, v as string));
  formData.append("Content-Type", file.type);
  formData.append("file", file);
  const uploadRes = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (!uploadRes.ok) throw new Error("S3 업로드 실패");
  const s3Url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
  return s3Url;
};
