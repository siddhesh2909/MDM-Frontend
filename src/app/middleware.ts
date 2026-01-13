import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import nookies from "nookies";

export function middleware(request: NextRequest) {
  const token = nookies.get({ req: request }).token;
  console.log("Token:", token);

  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup"
  ) {
    return NextResponse.next();
  }

  if (!token) {
    const redirectUrl = new URL(request.url);
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirect", request.url);
    return NextResponse.redirect(redirectUrl);
  }
  return NextResponse.next();
}

// Commented out to disable auth checks temporarily
// export const config = {
//   matcher: [
//     "/dashboardMain/*",
//     "/notification",
//     "/HelpSupport",
//     "/resetPassword",
//     "/Setting",
//     "/data_management",
//   ],
// };