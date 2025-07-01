import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ERROR_MESSAGES } from "@/constants/message";
import { useToast } from "@/contexts/toast/ToastContext";
import { getSenderNameId } from "@/lib/actions/write-actions";
import { IconName } from "@/types/common/icons";

interface UseLetterFormProps {
  isReply?: boolean;
}

export const useLetterForm = ({ isReply = false }: UseLetterFormProps = {}) => {
  const [userName, setUserName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<IconName>("bag");
  const [senderId, setSenderId] = useState<number>(0);
  const { showToast } = useToast();

  const { soldierId, letterId } = useParams();
  const searchParams = useSearchParams();
  const nameParam = searchParams.get("name");

  if (!soldierId) {
    throw new Error(ERROR_MESSAGES.SOLDIER.NOT_FOUND);
  }

  useEffect(() => {
    // 사용자 이름 설정
    if (nameParam) {
      try {
        const decodedName = decodeURIComponent(nameParam);
        setUserName(decodedName);
      } catch {
        setUserName("별돌이");
      }
    } else {
      setUserName("별돌이");
    }

    // 답장인 경우 발신자 정보 가져오기
    if (isReply && letterId) {
      (async () => {
        // 부모 letterId 가지고 name, id 가져오기
        const { success, message, data } = await getSenderNameId(+letterId);
        if (success && data) {
          setSenderId(data.userId);
        }
        if (!success || !data) {
          showToast(message, "", "error");
        }
      })();
    }
  }, [nameParam, isReply, letterId]);

  const isFormValid =
    content.trim() !== "" && (isReply || nickname.trim() !== "");

  return {
    formData: {
      userName,
      nickname,
      content,
      selectedIcon,
      senderId,
    },
    setNickname,
    setContent,
    setSelectedIcon,
    soldierId: soldierId.toString(),
    letterId: letterId?.toString(),
    isFormValid,
  };
};
