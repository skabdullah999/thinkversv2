import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Simply pass through all requests without authentication checks
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
