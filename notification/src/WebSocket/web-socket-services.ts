//src/WebSocket/WebSocketService.ts

import { WebSocket } from "ws";

interface IWebSocketService {
  connections: Map<string, WebSocket>;
}

export class WebSocketService implements IWebSocketService {
  connections: Map<string, WebSocket>;

  constructor() {
    this.connections = new Map();
  }

  addConnection(userId: string, ws: WebSocket): void {
    if (this.connections.has(userId)) {
      const existingWs = this.connections.get(userId)!;
      existingWs.close(1000, `New Ws connection for user ${userId}`);
    }

    this.connections.set(userId, ws);
    console.log(`Added WS for user ${userId}. Total connections: ${this.connections.size}`);
  }

  removeConnection(userId: string): void {
    const userSocket = this.connections.get(userId);

    if (userSocket) {
      this.connections.delete(userId);

      if (userSocket.readyState === WebSocket.OPEN || userSocket.readyState === WebSocket.CONNECTING) {
        userSocket.close(1000, "Disconnected");
      }

      console.log(`Removed WebSocket for user ${userId}. Total: ${this.connections.size}`);
    }
  }

  async sendNotification(userId: string, notification: any): Promise<void> {
    const userSocket = this.connections.get(userId);

    return new Promise((resolve, reject) => {
      try {
        if (!userSocket || userSocket.readyState !== WebSocket.OPEN) {
          return reject();
        }

        userSocket.send(JSON.stringify({ type: "notification", data: notification }), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getConnectionCount(): number {
    return this.connections.size;
  }
}
