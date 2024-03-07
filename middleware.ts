import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const route = request.nextUrl.clone();
  const cookies = request.cookies.get("isAuth");
  if (cookies === undefined || cookies === null) {
    if (route.pathname === "/sign-in" || route.pathname === "/sign-up") {
      return NextResponse.next();
    }
    route.pathname = "/sign-in";
    return NextResponse.redirect(route);
  } else if (
    cookies?.value === "true" &&
    (route.pathname === "/sign-in" || route.pathname === "/sign-up")
  ) {
    route.pathname = "/";
    return NextResponse.redirect(route);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|static|favicon.ico|_next|sideImage.png).*)", //Excludes middlware calls on APIs, icons, and static stuff
  ],
};
