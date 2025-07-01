"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChangeEvent } from "react";
import {
  FileUploadSection,
  LetterPageLayout,
  LetterForm,
} from "@/components/write";
import { ERROR_MESSAGES } from "@/constants/message";
import { useToast } from "@/contexts/toast/ToastContext";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useLetterForm } from "@/hooks/useLetterForm";
import { postLetterReply } from "@/lib/actions/write-actions";

export default function LetterWritePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formData, setContent, soldierId, letterId, isFormValid } =
    useLetterForm({ isReply: true });

  const {
    uploadedFile,
    isUploading,
    error,
    fileInputRef,
    handleFileUpload,
    handleFileDelete,
    openFileDialog,
  } = useFileUpload();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (!soldierId || !letterId) {
        throw new Error(ERROR_MESSAGES.LETTER.MISSING_REQUIRED_IDS);
      }
      if (!formData.senderId) {
        throw new Error(ERROR_MESSAGES.LETTER.MISSING_REQUIRED_IDS);
      }

      const formDataToSubmit = new FormData();
      formDataToSubmit.append("content", formData.content);
      formDataToSubmit.append("soldierId", soldierId);
      formDataToSubmit.append("parentLetterId", letterId);
      formDataToSubmit.append("receiverId", formData.senderId.toString());

      if (uploadedFile?.url) {
        formDataToSubmit.append("fileUrl", uploadedFile.url);
      }

      const { success, message } = await postLetterReply(formDataToSubmit);
      if (success) {
        router.push(`/cabinet/${soldierId}`);
      }
      if (!success) {
        showToast(message, "", "error");
      }
    } catch {
      showToast(ERROR_MESSAGES.LETTER.SENDING_ERROR, "", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LetterPageLayout userName={formData.userName}>
      <LetterForm
        content={formData.content}
        isReply={true}
        onContentChange={setContent}
        onSubmit={handleSubmit}
        isPending={isSubmitting}
        isFormValid={isFormValid}
        isUploading={isUploading}
      >
        <FileUploadSection
          uploadedFile={uploadedFile}
          isUploading={isUploading}
          error={error}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
          onFileDelete={handleFileDelete}
          onFileUploadClick={openFileDialog}
        />
      </LetterForm>
    </LetterPageLayout>
  );
}
