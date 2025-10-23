import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
  role: "user" | "amdin" | "moderator"; 
}

/**
 * Extract and verify JWT from WebSocket
 */

export const extractCurrentUserFromWS = (
  req: IncomingMessage
): UserPayload | null => {
  try {
    const token = extractJWTFromCookie(req);

    if (!token) {
      return null;
    }

    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    return payload;
  } catch (error) {
    console.error("WS JWT verification failed:", error);
    return null;
  }
};

const extractJWTFromCookie = (req: IncomingMessage): string | null => {
  const cookies = req.headers.cookie;

  if (!cookies) {
    return null;
  }

  const sessionMatch = cookies.match(/session=([^;]+)/);

  if (!sessionMatch) {
    return null;
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(sessionMatch[1], "base64").toString("utf8")
    );
    return decoded.jwt || null;
  } catch (error) {
    return null;
  }
};
