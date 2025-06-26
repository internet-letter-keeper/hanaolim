"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ChangeEvent } from "react";
import {
  IconSelectionSection,
  LetterPageLayout,
  LetterForm,
  FileUploadSection,
} from "@/components/write";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useLetterForm } from "@/hooks/useLetterForm";
import { postLetter } from "@/lib/actions/write-actions";
import { getIconIdByName } from "@/utils/icon";

export default function WritePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    formData,
    setNickname,
    setContent,
    setSelectedIcon,
    soldierId,
    isFormValid,
  } = useLetterForm();
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

  const handleSubmit = () => {
    startTransition(async () => {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("nickname", formData.nickname);
      formDataToSubmit.append("content", formData.content);
      formDataToSubmit.append("soldierId", soldierId);
      formDataToSubmit.append(
        "iconId",
        getIconIdByName(formData.selectedIcon).toString()
      );

      if (uploadedFile?.url) {
        formDataToSubmit.append("fileUrl", uploadedFile.url);
      }

      const result = await postLetter(formDataToSubmit);
      if (result?.success) {
        router.push(`/cabinet/${soldierId}`);
      }
    });
  };

  return (
    <LetterPageLayout userName={formData.userName}>
      <IconSelectionSection
        selectedIcon={formData.selectedIcon}
        onChange={setSelectedIcon}
      />

      <LetterForm
        nickname={formData.nickname}
        content={formData.content}
        onNicknameChange={setNickname}
        onContentChange={setContent}
        onSubmit={handleSubmit}
        isPending={isPending}
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
