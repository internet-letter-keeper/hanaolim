import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

// 미포함 경로 - 정적 파일 경로 | auth | api/auth | cabinet
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|icons|images|fonts|video|auth|api/auth|cabinet).*)",
  ],
};

// 군인은 접근 불가능
const SOLDIER_RESTRICTED = ["/registerSoldier", "/onboarding"];

// 군인만 접근 가능
const SOLDIER_ONLY = ["/my/soldier", "/pointHistory"];

// 군인만 접근 가능한 받은 편지 보관함
const SOLDIER_ONLY_LETTERS = ["/letters?box=mine"];

// 일반 유저 - 팔로잉 1명 이상이면 접근 가능
const FOLLOW_REQUIRED = ["/write"];

// 일반 유저 - 팔로잉 1명 이상이면 접근 불가
const HAS_FOLLOW_RESTRICTED = ["/onboarding"];

// 소셜로그인 유저 - 비밀번호 변경 페이지 접근 불가
const IS_SOCIAL_RESTRICTED = ["/my/pwd"];

export async function middleware(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user;

  const baseUrl = req.url;
  const { pathname, search } = req.nextUrl;

  // 요청 경로가 홈인지 여부
  const isPathHome = pathname === "/";

  // 요청 경로가 각 제한 경로들에 포함되는지 검사하는 함수
  const isPathIn = (pathType: string[]) =>
    pathType.some((page) => (pathname + search).startsWith(page));

  // 미로그인 사용자의 경우
  if (!didLogin) return NextResponse.redirect(new URL("/auth/signIn", baseUrl));

  const isSoldier = !!session.user.isSoldier;
  const follow = session.user.follow;
  const isSocial = session.user.isSocial;

  // 일반 유저가 군인 전용 경로에 접근한 경우 OR
  // 군인이 군인 접근 불가 경로에 접근한 경우
  if (
    (isPathIn(SOLDIER_ONLY) && !isSoldier) ||
    (isPathIn(SOLDIER_RESTRICTED) && isSoldier)
  )
    return NextResponse.redirect(new URL("/invalidAccess", baseUrl));

  // 일반 유저가 받은 편지함(군인 전용)에 접근한 경우
  if (isPathIn(SOLDIER_ONLY_LETTERS) && !isSoldier)
    return NextResponse.redirect(new URL("/letters?box=friend", baseUrl));

  // 팔로잉 있는 일반 유저가 온보딩 OR 홈으로 접근한 경우
  if ((isPathIn(HAS_FOLLOW_RESTRICTED) || isPathHome) && !isSoldier && follow)
    return NextResponse.redirect(
      new URL(`/cabinet/${follow.soldierId}`, baseUrl)
    );

  // 팔로잉 없는 일반 유저가 편지 작성 OR 홈으로 접근한 경우
  if ((isPathIn(FOLLOW_REQUIRED) || isPathHome) && !isSoldier && !follow)
    return NextResponse.redirect(new URL("/onboarding", baseUrl));

  // 소셜 로그인일 경우
  if (isPathIn(IS_SOCIAL_RESTRICTED) && isSocial)
    return NextResponse.redirect(new URL("/my", baseUrl));

  return NextResponse.next();
}
