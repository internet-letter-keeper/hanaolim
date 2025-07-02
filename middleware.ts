import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { isNotSoldierYet } from "./utils/date";

// 미포함 경로 - 정적 파일 경로 | auth | api/auth | cabinet
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|icons|images|fonts|video|auth|api/auth|cabinet).*)",
  ],
};

// 군인은 접근 불가능
const SOLDIER_RESTRICTED = ["/registerSoldier"];

// 군인만 접근 가능
const SOLDIER_ONLY = ["/my/soldier", "/pointHistory"];

// 군인만 접근 가능한 받은 편지 보관함
const SOLDIER_ONLY_LETTERS = ["/letters?box=mine"];

// 소셜로그인 유저 - 비밀번호 변경 페이지 접근 불가
const IS_SOCIAL_RESTRICTED = ["/my/pwd"];

export async function middleware(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user;

  const baseUrl = req.url;
  const { pathname, search } = req.nextUrl;

  // 요청 경로가 홈인지 여부
  const isPathHome = pathname === "/";

  // 요청 경로가 온보딩인지 여부. 현재 로그인 이후 모두 온보딩으로 보냄
  const isPathOnboarding = pathname === "/onboarding";

  // 요청 경로가 편지보관함인 경우.
  // 현재 모든 회원을 내 관물대로 보낸 뒤, 일반유저나 입대 전 군인은 친구 관물대로 리다이렉트
  const isFullPathLetters = pathname + search === "/letters";

  // 요청 경로가 각 제한 경로들에 포함되는지 검사하는 함수
  const isPathIn = (pathType: string[]) =>
    pathType.some((page) => (pathname + search).startsWith(page));

  // 미로그인 사용자의 경우
  if (!didLogin) return NextResponse.redirect(new URL("/auth/signIn", baseUrl));

  const isSoldier = !!session.user.isSoldier;
  const startDate = isSoldier ? session.user.soldier?.startDate : null;
  const follow = session.user.follow;
  const isSocial = session.user.isSocial;

  // 군인이 온보딩으로 접근한 경우 (로그인 직후)
  if (isPathOnboarding && isSoldier)
    return NextResponse.redirect(new URL("/", baseUrl));

  // 팔로잉 있는 일반 유저가 온보딩 OR 홈으로 접근한 경우
  if ((isPathOnboarding || isPathHome) && !isSoldier && follow)
    return NextResponse.redirect(
      new URL(`/cabinet/${follow.soldierId}`, baseUrl)
    );

  // 일반 유저가 홈으로 접근한 경우
  if (isPathHome && !isSoldier)
    return NextResponse.redirect(new URL("/onboarding", baseUrl));

  // 일반 유저가 군인 전용 경로에 접근한 경우 OR
  // 군인이 군인 접근 불가 경로에 접근한 경우
  if (
    (isPathIn(SOLDIER_ONLY) && !isSoldier) ||
    (isPathIn(SOLDIER_RESTRICTED) && isSoldier)
  )
    return NextResponse.redirect(new URL("/invalidAccess", baseUrl));

  // 편지 보관함에 접속한 경우, box=mine param 강제 부여
  if (isFullPathLetters)
    return NextResponse.redirect(new URL("/letters?box=mine", baseUrl));

  // 일반 유저 또는 입대 전 군인이 받은 편지함(군인 전용)에 접근한 경우
  if (
    (isPathIn(SOLDIER_ONLY_LETTERS) && !isSoldier) ||
    (isPathIn(SOLDIER_ONLY_LETTERS) && startDate && isNotSoldierYet(startDate))
  )
    return NextResponse.redirect(new URL("/letters?box=friend", baseUrl));

  // 소셜 로그인일 경우
  if (isPathIn(IS_SOCIAL_RESTRICTED) && isSocial)
    return NextResponse.redirect(new URL("/my", baseUrl));

  return NextResponse.next();
}
