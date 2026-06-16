import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Fencepac Knowledge Platform", charset="UTF-8"',
    },
  });
}

export function proxy(request: NextRequest) {
  const username = process.env.SITE_USERNAME || "fencepac";
  const password = process.env.SITE_PASSWORD;

  // If no password is set, do not block local development.
  if (!password) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return unauthorized();
  }

  const [scheme, encoded] = authHeader.split(" ");

  if (scheme !== "Basic" || !encoded) {
    return unauthorized();
  }

  let decoded = "";

  try {
    decoded = atob(encoded);
  } catch {
    return unauthorized();
  }

  const [providedUsername, ...passwordParts] = decoded.split(":");
  const providedPassword = passwordParts.join(":");

  if (providedUsername === username && providedPassword === password) {
    return NextResponse.next();
  }

  return unauthorized();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|images).*)",
  ],
};
