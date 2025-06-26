import { signIn } from "next-auth/react";
import { getUserByEmail, postSignUp } from "@/lib/actions/auth-actions";
import { postFriendbyId } from "@/lib/actions/friend-actions";

type SignInProps = {
  email: string;
  password: string;
  callbackUrl: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
  callbackUrl: string;
};

// next-auth 로그인 함수
async function loginFunc(email: string, password?: string) {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  return result;
}

//로그인
export async function signInHook(signInData: SignInProps) {
  try {
    const { email, password, callbackUrl } = signInData;
    const result = await loginFunc(email, password);
    if (result.ok) {
      // 로그인 성공
      if (callbackUrl && callbackUrl !== "/") {
        if (email) {
          const user = await getUserByEmail(email);
          await postFriendbyId(
            Number(callbackUrl.split("/").pop()),
            Number(user?.userId)
          );
        }
        return { success: true, redirectUrl: callbackUrl };
      } else {
        return { success: true, redirectUrl: "/onboarding" };
      }
    } else {
      return { success: false, error: "signIn" };
    }
  } catch (error) {
    console.error("로그인 에러:", error);
    return { success: false, error: "signIn" };
  }
}

//회원가입
export async function signUpHook(signUpData: SignUpProps) {
  try {
    const { name, email, password, callbackUrl } = signUpData;

    const result = await postSignUp({
      email,
      userName: name,
      password: password,
    });

    if (result.ok) {
      return await signInHook({
        email,
        password,
        callbackUrl,
      });
    } else {
      return { success: false, error: "signUp" };
    }
  } catch (error) {
    console.error("회원가입 에러:", error);
    return { success: false, error: "signUp" };
  }
}
