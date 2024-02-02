import { NextResponse } from "next/server";

export async function middleware(request) {
  const refreshToken = request.cookies.get("refreshToken");

  if (request.nextUrl.pathname.startsWith("/auth/login")) {
    if (refreshToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/community/write")) {
    if (refreshToken == null) {
      return NextResponse.redirect(
        new URL("/?alert=로그인 후 이용 가능한 서비스입니다.", request.url)
      );
    }
  }
}
