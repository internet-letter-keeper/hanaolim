import { useState, useRef, useEffect } from "react";
import { uploadedFileType } from "@/types/letters";
import { uploadToS3 } from "@/utils/upload";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const useFileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<uploadedFileType | null>(
    null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      setError("5MB 이하의 파일만 업로드할 수 있습니다.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileUpload = async (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    try {
      const url = await uploadToS3(file);
      const fileType = file.type.startsWith("image/") ? "image" : "video";

      setUploadedFile({
        file,
        url,
        type: fileType,
      });
    } catch (err) {
      console.error("업로드 실패", err);
      setError("파일 업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileDelete = () => {
    if (uploadedFile?.url) {
      URL.revokeObjectURL(uploadedFile.url);
      setUploadedFile(null);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (uploadedFile?.url) {
        URL.revokeObjectURL(uploadedFile.url);
      }
    };
  }, [uploadedFile]);

  return {
    uploadedFile,
    isUploading,
    error,
    fileInputRef,
    handleFileUpload,
    handleFileDelete,
    openFileDialog,
  };
};
