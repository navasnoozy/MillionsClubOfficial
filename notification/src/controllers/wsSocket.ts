//src/controllers/wsSocket.ts

import { Request, Response } from "express";
import { WebSocketServer } from "ws";
import { WebSocketService } from "../config/WebSocket";

const handleWebSocketConnect = (
  req: Request,
  socket: any,
  head: Buffer,
  userId: string,
  wss: WebSocketServer,
  wsService: WebSocketService
) => {

    wss.han
};

export { handleWebSocketConnect };
