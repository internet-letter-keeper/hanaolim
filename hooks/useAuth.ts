import { signIn } from "next-auth/react";
import { postSignUp } from "@/lib/actions/auth-actions";

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

    const { ok, error } = await loginFunc(email, password);

    if (error) {
      // 로그인 실패
      return { success: false, error: "unvalid" };
    }

    if (ok) {
      // 로그인 성공
      if (callbackUrl && callbackUrl !== "/") {
        return { success: true, redirectUrl: `${callbackUrl}?add=true` };
      } else {
        return { success: true, redirectUrl: "/onboarding" };
      }
    } else {
      return { success: false, error: "signIn" };
    }
  } catch {
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
  } catch {
    return { success: false, error: "signUp" };
  }
}
