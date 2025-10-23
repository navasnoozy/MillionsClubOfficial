// src/WebSocket/upgradeHandler.ts

import { WebSocketServer } from "ws";
import { extractCurrentUserFromWS } from "./auth/ws-current-user";
import { WebSocketService } from "./WebSocketService";
import { Duplex } from "stream";
import { IncomingMessage } from "http";

export const upgradeHandler = (
  req: IncomingMessage,
  socket: Duplex,
  head: Buffer,
  wss: WebSocketServer,
  wsService: WebSocketService
) => {

  if (!req.url?.startsWith("/wsconnect")) {
    socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    socket.destroy();
    return;
  }

  const currentUser = extractCurrentUserFromWS(req);

  if (!currentUser) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  const userId = currentUser.id;

  wss.handleUpgrade(req, socket, head, (ws) => {
    wsService.addConnection(userId, ws);

    ws.on("close", () => wsService.removeConnection(userId));
    ws.on("error", () => wsService.removeConnection(userId));

    ws.send(
      JSON.stringify({
        type: "connected",
        message: "WebSocket Connection established",
        userId,
        email: currentUser.email,
        role: currentUser.role,
      })
    );
  });
};
