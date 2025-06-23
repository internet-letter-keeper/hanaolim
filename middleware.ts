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
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  //홈으로 접근할 경우
  if (pathname === "/") {
    console.log("홈 페이지 접근");
    //군인X , 로그인X -> 가입으로
    if (!didLogin) {
      return NextResponse.redirect(new URL(`/auth/signIn`, req.url));
    }
    // 군인X, 로그인O, 팔로우 유무에 따른 라우팅
    if (didLogin && !isSoldier && !session.user.follow) {
      // follow가 없을 경우
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
    if (didLogin && !isSoldier && !!session.user.follow.followId) {
      //팔로우가 있을 경우
      return NextResponse.redirect(
        new URL(`/cabinet/${session.user.follow.soldierId}`, req.url)
      );
    }
  }
  if (pathname === "/onboarding") {
    // 군인X, 로그인O, 팔로우 유무에 따른 라우팅
    //팔로우가 없을 경우
    if (didLogin && !isSoldier && !session.user.follow) {
      return;
    }
    if (didLogin && !isSoldier && !!session.user.follow.followId) {
      //팔로우가 있을 경우
      return NextResponse.redirect(
        new URL(`/cabinet/${session.user.follow.soldierId}`, req.url)
      );
    }
  }

  if (pathname.startsWith("/cabinet")) {
    // 군인X, 로그인O, 팔로우 유무에 따른 라우팅
    //팔로우가 없을 경우
    if (didLogin && !isSoldier && !session.user.follow) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
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
