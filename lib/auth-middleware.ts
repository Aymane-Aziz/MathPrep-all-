import { type NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "./jwt"

export async function authenticateRequest(req: NextRequest) {
  // Get the authorization header
  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { authenticated: false, userId: null }
  }

  // Extract the token
  const token = authHeader.split(" ")[1]

  // Verify the token
  const payload = await verifyJWT(token)

  if (!payload || !payload.userId) {
    return { authenticated: false, userId: null }
  }

  return { authenticated: true, userId: payload.userId }
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
