//src/routes/webSocket.ts

import { requireAuth } from "@millionsclub/shared-libs/server";
import { Router } from "express";
import { wss, wsService } from "../index";
import { handleWebSocketConnect } from "../controllers/wsSocket";


const websocketRouter = Router ();

websocketRouter.get ('/wsconnect', requireAuth, (req, socket, head)=>{
        
    const userId = req.currentUser!.id;

    handleWebSocketConnect(req, socket, head, userId, wss, wsService)
})


export default websocketRouter;