"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Txt } from "@/components/atoms";
import { BasicHeader, Modal } from "@/components/common";
import { ERROR_MESSAGES } from "@/constants/message";
import { deleteUser } from "@/lib/actions/auth-actions";
import { cn } from "@/lib/utils";

const buttonStyle = "flex flex-row pl-4 py-3 ";
const containerStyle =
  "flex flex-col bg-white  shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)] rounded-[10px] mx-5";

export default function MyPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { userName, email, isSoldier, isSocial, soldier, follow } =
    session?.user || {};

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const handleLogout = () => {
    router.push("/api/auth/signout");
    setShowLogoutModal(false);
  };
  const handleWithdraw = async () => {
    try {
      await deleteUser(session?.user.userId || 0);
      const preSession = session;
      await signOut({ redirect: false });
      setShowWithdrawModal(false);
      // 회원 탈퇴 후 팔로잉이 있는 경우 해당 군인 페이지로 이동
      if (preSession?.user.follow)
        router.push(`/cabinet/${preSession.user.follow.soldierId}`);
      else router.push("/auth/signIn");
      // catch
    } catch {
      throw new Error(ERROR_MESSAGES.AUTH.FAILD_TO_DELETE_ACCOUNT);
    }
  };
  const backUrl = `cabinet/${isSoldier ? soldier?.soldierId : follow?.soldierId}`;

  return (
    <div>
      <BasicHeader title="내 정보" backUrl={backUrl} />
      <div className="flex flex-col items-start border-b border-gray-aaa pb-5 pl-4 mt-9 mb-9">
        <Txt className="text-gray-353" size={22} weight="cm">
          {userName}
        </Txt>
        <Txt className="text-gray-353" size={16} weight="cm">
          {email}
        </Txt>
      </div>
      <div className={containerStyle}>
        {!isSocial && (
          <button
            className={buttonStyle}
            onClick={() => {
              router.push("/my/pwd");
            }}
          >
            <Txt className="text-gray-353/80" size={17}>
              비밀번호 변경
            </Txt>
          </button>
        )}
        {isSoldier && (
          <button
            className={cn(buttonStyle, !isSocial && "border-t border-gray-aaa")}
            onClick={() => {
              router.push("/my/soldier");
            }}
          >
            <Txt className="text-gray-353/80" size={17}>
              입대/전역일 변경
            </Txt>
          </button>
        )}
      </div>
      <div className={containerStyle + " mt-4"}>
        <button
          className={buttonStyle}
          onClick={() => setShowLogoutModal(true)}
        >
          <Txt className="text-gray-353/80" size={17}>
            로그아웃
          </Txt>
        </button>
        <button
          className={buttonStyle + " border-t border-gray-aaa"}
          onClick={() => setShowWithdrawModal(true)}
        >
          <Txt className="text-gray-353/80" size={17}>
            회원 탈퇴
          </Txt>
        </button>
      </div>
      {showLogoutModal && (
        <Modal
          greenBtnText="로그아웃 하기"
          whiteBtnText="취소"
          onClickGreenBtn={handleLogout}
          onClickWhiteBtn={() => setShowLogoutModal(false)}
        >
          정말 로그아웃 하시겠습니까?
        </Modal>
      )}
      {showWithdrawModal && (
        <Modal
          greenBtnText="탈퇴하기"
          whiteBtnText="취소"
          onClickGreenBtn={handleWithdraw}
          onClickWhiteBtn={() => setShowWithdrawModal(false)}
        >
          정말 탈퇴하시겠습니까?
        </Modal>
      )}
    </div>
  );
}
