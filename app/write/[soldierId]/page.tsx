"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useActionState, useEffect } from "react";
import { ChangeEvent } from "react";
import { Input, PrimaryButton, Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";
import { FilePreview, IconPicker } from "@/components/letters";
import { getSoldierName } from "@/lib/actions/soldier-actions";
import { postLetter } from "@/lib/actions/write-actions";
import { IconName } from "@/types/common/icons";
import { uploadedFileType } from "@/types/letters";
import { getIconIdByName } from "@/utils/icon";

export default function WritePage({
  params,
}: {
  params: Promise<{ soldierId: string }>;
}) {
  const [soldierId, setSoldierId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<IconName>("face");
  const [uploadedFile, setUploadedFile] = useState<uploadedFileType | null>(
    null
  );
  const router = useRouter();

  // params와 userName을 가져오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      const { soldierId } = await params;
      setSoldierId(soldierId);

      const { userName: name } = await getSoldierName(+soldierId);
      setUserName(name || "별돌이");
    };

    fetchData();
  }, [params]);

  // 편지 작성 액션
  const [letter, postLetterAction, isPending] = useActionState(
    async (_pre: unknown, formData: FormData) => {
      // soldierId 추가
      formData.append("soldierId", soldierId);

      // 선택된 아이콘 ID 추가
      const iconId = getIconIdByName(selectedIcon);
      formData.append("iconId", iconId.toString());

      // 업로드된 파일이 있으면 FormData에 추가
      if (uploadedFile?.file) {
        formData.append("file", uploadedFile.file);
      }

      const result = await postLetter(formData);

      if (result?.success) {
        router.push(`/cabinet/${soldierId}`);
      }

      return result;
    },
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const fileType = file.type.startsWith("image/") ? "image" : "video";

      setUploadedFile({
        file,
        url,
        type: fileType,
      });
    }
  };

  // 파일 삭제 시 메모리 해제
  const handleDeleteFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.url);
      setUploadedFile(null);
    }
  };

  return (
    <div className="flex flex-col">
      <BasicHeader />
      <div className="flex flex-col w-full px-4 relative min-h-[calc(100dvh-64px)]">
        <div className="flex items-center justify-center gap-2 mt-2">
          <Image
            src="/images/byeoldol-face.svg"
            alt="별돌이 얼굴"
            width={50}
            height={50}
          />
          <Image src="/images/letter.svg" alt="편지" width={50} height={50} />
        </div>

        <div className="flex mt-[14px] mb-13 items-center justify-center whitespace-nowrap">
          <Txt size={20} weight="bold" className="text-green-49d">
            {userName}&nbsp;
          </Txt>
          <Txt size={20} weight="bold">
            군인에게 편지를 작성해주세요!
          </Txt>
        </div>

        <div className="flex flex-col gap-[14px] mb-8">
          <Txt size={16} weight="cm" align="left">
            관물대에 넣을 물건을 선택해주세요.
          </Txt>
          <IconPicker value={selectedIcon} onChange={setSelectedIcon} />
        </div>

        <form className="flex flex-col gap-3 w-full" action={postLetterAction}>
          <Input
            name="nickname"
            placeholder="닉네임"
            className="w-1/3 text-gray-939 placeholder:text-blue-9a0 text-[15px] pl-[18px]"
            maxLength={7} // 7글자 제한
            required
          />
          <Txt size={11} weight="cm" className="text-blue-9a0" align="left">
            ※ 닉네임은 관물대에서만 보여지며, 상대방에게는 실명이 전달됩니다.
          </Txt>
          <Input
            name="content"
            placeholder="내용을 입력하세요."
            tag="textarea"
            maxLength={500} // 500자 제한
            required
          />

          <div className="flex flex-row justify-between w-full items-center mt-5">
            {/* 파일이 없을 때만 업로드 버튼 표시 */}
            {!uploadedFile && (
              <div className="flex flex-row gap-1 items-center">
                <button
                  type="button"
                  onClick={onClickImage}
                  className="flex w-7 h-7 items-center justify-center rounded-[5px] bg-white-fff shadow-[0px_0px_5px_rgba(0,0,0,0.15)]"
                >
                  <Image
                    src="/icons/ic-picture.svg"
                    alt="사진"
                    width={20}
                    height={20}
                    className="w-auto h-auto"
                  />
                </button>
                <Txt size={12} weight="cm" className="text-blue-9a0">
                  ※ 최대 1개의 파일만 첨부할 수 있습니다.
                </Txt>
              </div>
            )}

            {/* 파일이 있을 때는 빈 div로 공간 */}
            {uploadedFile && <div />}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              className="hidden"
            />
          </div>
          {uploadedFile && (
            <FilePreview
              uploadedFile={uploadedFile}
              onDelete={handleDeleteFile}
            />
          )}
          <div className="flex justify-end mt-4">
            <PrimaryButton
              title="전송"
              type="submit"
              rounded="sm"
              weight="medium"
              className="w-20 py-1"
              disabled={isPending}
              textSize={16}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
