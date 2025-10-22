import { Request } from "express";
import { WebSocketServer } from "ws";
import { WebSocketService } from "../config/WebSocket";

// Controller: Handles the upgrade after auth
export const handleWebSocketConnect = (
  req: Request,
  socket: any,
  head: Buffer,
  userId: string,
  wss: WebSocketServer,
  wsService: WebSocketService
) => {
  // Upgrade the connection
  wss.handleUpgrade(req, socket, head, (ws) => {
    console.log(`WS connected for user ${userId}`);

    // Add to service map (closes existing if any)
    wsService.addConnection(userId, ws);

    // Handle incoming messages (e.g., pings or user-specific cmds)
    ws.on("message", (message: string) => {
      try {
        const data = JSON.parse(message);
        console.log(`Message from ${userId}:`, data);
        // Example: Echo or handle (e.g., { type: 'ping' })
        if (data.type === "ping") {
          ws.send(JSON.stringify({ type: "pong" }));
        }
      } catch (err) {
        console.error("Invalid message:", err);
      }
    });

    // Handle errors
    ws.on("error", (err) => {
      console.error(`WS error for ${userId}:`, err);
      wsService.removeConnection(userId); // Clean up on error
    });

    // Handle close: Remove from map
    ws.on("close", (code: number, reason: string) => {
      console.log(`WS closed for ${userId}: ${code} - ${reason}`);
      wsService.removeConnection(userId);
    });

    // Optional: Send welcome/confirmation
    ws.send(JSON.stringify({ type: "connected", message: "Real-time notifications active" }));

    // Emit the connection event for global handling if needed
    wss.emit("connection", ws, req);
  });
};