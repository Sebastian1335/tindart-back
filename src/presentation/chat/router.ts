import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { InteractionService } from "../services/interaction.service";
import { ChatController } from "./controller";
import { ChatService } from "../services/chat.service";




export class ChatRoutes {


  static get routes(): Router {
    const router = Router();
    const service = new ChatService()
    const interactionController = new ChatController(service)
    // Definir las rutas
    router.get('/conversation/:userId', [AuthMiddleware.validateJWT], interactionController.getConversationPerUser)
    router.get("/messages/:conversationId", [AuthMiddleware.validateJWT], interactionController.getMessages)
    return router;
  }

}
