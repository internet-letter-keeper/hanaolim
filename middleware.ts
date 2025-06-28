import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

// 로그인 필요 페이지
const authenticatedPages = [
  "/friends",
  "/hanaBank",
  "/letters",
  "/my",
  "/onboarding",
  "/pointHistory",
  "/registerSoldier",
  "/write",
];

// 군인접근 불가능한 페이지
const isSoldierRestrictedPage = ["/registerSoldier", "/onboarding"];

const redirectPages = ["/friends", "/write"];
const isRedirectPage = (pathname: string) =>
  redirectPages.some((page) => pathname.startsWith(page));

// const isNotLoginPages = ["auth/siginIn", "auth/signUp"];

// 인증 필요 페이지
const isAuthenticatedPage = (pathname: string) =>
  authenticatedPages.some((page) => pathname.startsWith(page));

// 군인 접근 불가 페이지
const isUserPage = (pathname: string) =>
  isSoldierRestrictedPage.some((page) => pathname.startsWith(page));

// 일반 유저, 팔로우유무에 따른 페이지
const needsFollow = (pathname: string) =>
  // pathname.startsWith("/cabinet") ||
  pathname === "/friends" ||
  pathname.startsWith("/letters") ||
  pathname.startsWith("/write") ||
  pathname.startsWith("/pointHistory");

export async function middleware(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user;
  const isSoldier = !!session?.user?.isSoldier;
  const follow = session?.user?.follow;
  const isSocial = session?.user?.isSocial;
  const { pathname } = req.nextUrl;

  // 인증 필요 페이지
  if (isAuthenticatedPage(pathname) && !didLogin) {
    if (isRedirectPage(pathname)) {
      return NextResponse.redirect(
        new URL(
          `/auth/signIn?callbackUrl=${encodeURIComponent(`http://localhost:3000/cabinet/${pathname.split("/").pop()}`)}`,
          req.url
        )
      );
    }

    return NextResponse.redirect(new URL(`/auth/signIn`, req.url));
  }

  // 군인 접근 불가 페이지
  if (isUserPage(pathname) && didLogin && isSoldier) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 홈
  if (pathname === "/") {
    if (!didLogin) {
      return NextResponse.redirect(new URL(`/auth/signIn`, req.url));
    }
    if (!isSoldier && !follow) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
    if (!isSoldier && follow?.followId) {
      return NextResponse.redirect(
        new URL(`/cabinet/${follow.soldierId}`, req.url)
      );
    }
  }

  // 온보딩
  if (pathname === "/onboarding") {
    if (!isSoldier && didLogin && follow?.followId) {
      return NextResponse.redirect(
        new URL(`/cabinet/${follow.soldierId}`, req.url)
      );
    }
    // 팔로우가 없으면 온보딩 페이지 그대로
  }

  // 팔로우 필수 페이지
  if (needsFollow(pathname) && didLogin && !isSoldier && !follow) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  //소셜 로그인일 경우 비밀번호 변경 페이지 접근 불가
  if (pathname === "/my/pwd" && isSocial) {
    return NextResponse.redirect(new URL("/my", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|_next/static|_next/image|auth|favicon.ico|robots.txt|images|api/auth|auth/signin$).*)",
    "/api/:path*",
  ],
};
