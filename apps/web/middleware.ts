import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  if (!accessToken && pathname !== "/auth/login") {
    return NextResponse.redirect(`${req.nextUrl.origin}/auth/login`);
  } else if (!accessToken && pathname === "/auth/login") {
    return NextResponse.next();
  }

  if (!accessToken)
    return NextResponse.redirect(`${req.nextUrl.origin}/auth/login`);

  const { payload } = await jwtVerify(
    accessToken,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  const role = payload.role;

  if (
    (role === "CUSTOMER" && pathname.startsWith("/dashboard/customer")) ||
    (role === "EVENT_ORGANIZER" &&
      pathname.startsWith("/dashboard/event-organizer"))
  ) {
    return NextResponse.next();
  } else {
    return new NextResponse("Forbidden acces", { status: 403 });
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
