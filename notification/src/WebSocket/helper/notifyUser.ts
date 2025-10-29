import { wsConnectionManager } from "../../index";

const notifyUser = async (userId: string, data: any) => {
  try {
    wsConnectionManager.sendNotification(userId, data);
  } catch (error) {
    console.error("WebSocket notification failed:", error);
  }
};

export default notifyUser;
