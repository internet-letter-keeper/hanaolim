import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credential from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import { getUserByEmail } from "./actions/auth-actions";
import { credentialValidator } from "./validations/zodValidation";

//

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google,
    Naver,
    Kakao,
    Credential({
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "패스워드", type: "password" },
      },
      //authorize 함수는 zod validation!!
      async authorize(credentials) {
        if (!credentials) return null;

        // zod validation을 사용하여 credentials 검증
        const validator = credentialValidator.safeParse(credentials);
        if (!validator.success) return null;

        const { email, password } = validator.data;

        const dbUser = await getUserByEmail(email);
        if (!dbUser || !dbUser.password) return null;
        // 비밀번호가 일치하는지 확인
        const isValid = await bcrypt.compare(password, dbUser.password);
        if (!isValid) return null;
        // 비밀번호가 일치하면 사용자 정보를 반환
        return {
          email: dbUser.email,
          userName: dbUser.userName,
          userId: dbUser.userId,
          isSoldier: dbUser.isSoldier,
          isSocial: dbUser.isSocial,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    // error: "/auth/error",       // 에러 발생 시 보여줄 페이지
  },
  callbacks: {
    async signIn({ user, account }) {
      // credentials인지 sns인지
      if (account?.provider === "credentials") {
        // 이미 authorize 함수에서 검증을 했으므로 true를 반환
        return true;
      } else {
        // SNS 로그인인 경우
        return true;
      }
    },
    async jwt({ token, user, trigger, session }) {
      // 내정보 수정을 위한 코드
      const userData = trigger === "update" ? session : user;
      // 넘겨주는 값
      if (userData) {
        token.userId = userData.userId;
        token.email = userData.email;
        token.userName = userData.userName;
        token.isSoldier = userData.isSoldier;
        token.isSocial = userData.isSocial;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email || "";
        session.user.userName = token.userName;
        session.user.isSoldier = token.isSoldier;
        session.user.isSocial = token.isSocial;
      }
      return session;
    },
  },
});
