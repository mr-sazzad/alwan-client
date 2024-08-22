import { type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.match("/admins/dashboard")) {
  //   return NextResponse.rewrite(
  //     new URL("/admins/dashboard/application-dashboard", request.url)
  //   );
  // }
  // if (request.nextUrl.pathname.startsWith("/about")) {
  //   return NextResponse.rewrite(new URL("/about-2", request.url));
  // }
  // if (request.nextUrl.pathname.match("/account")) {
  //   return NextResponse.redirect("/account/profile");
  // }
}
