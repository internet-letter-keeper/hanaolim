import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

// 로그인 필요 페이지
const authenticatedPages = [
  "/cabinet",
  "/friends",
  "/hanaBank",
  "/letters",
  "/onboarding",
  "/pointHistory",
  "/registerSoldier",
  "/write",
];

// 군인접근 불가능한 페이지
const userPages = ["/registerSoldier", "/onboarding"];

// const isNotLoginPages = ["auth/siginIn", "auth/signUp"];

export async function middleware(req: NextRequest) {
  const session = await auth();
  console.log("session", session);
  const didLogin = !!session?.user;
  const isSoldier = !!session?.user?.isSoldier;

  const { pathname } = req.nextUrl;

  if (authenticatedPages.some((page) => pathname.startsWith(page))) {
    //로그인이 되어있지 않을 경우
    if (!didLogin) {
      return NextResponse.redirect(new URL(`/auth/signIn`, req.url));
    }
  }

  if (userPages.some((page) => pathname.startsWith(page))) {
    //군인일 경우 자신의 캐비넷으로
    if (didLogin && isSoldier) {
      return NextResponse.redirect(
        new URL(`/cabinet/${session.user.soldier.soldierId}`, req.url)
      );
    }
  }

  if (pathname === "/") {
    console.log("홈 페이지 접근");
    //군인X , 로그인X -> 가입으로
    if (!didLogin) {
      return NextResponse.redirect(new URL(`/auth/signIn`, req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|_next/static|_next/image|auth|favicon.ico|robots.txt|images|api/auth|auth/signin$).*)",
    "/api/:path*",
  ],
};
