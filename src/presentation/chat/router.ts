import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { InteractionService } from "../services/interaction.service";
import { ChatController } from "./controller";
import { ChatService } from "../services/chat.service";




export class ChatRoutes {


  static get routes(): Router {
    const router = Router();
    const service = new ChatService()
    const controller = new ChatController(service)
    // Definir las rutas
    router.get('/conversations', [AuthMiddleware.validateJWT], controller.getConversationPerUser)
    router.post('/conversation/:userId', [AuthMiddleware.validateJWT], controller.createConversation)
    router.get("/messages/:conversationId", [AuthMiddleware.validateJWT], controller.getMessages)
    router.get(`/contacts`, [AuthMiddleware.validateJWT], controller.getContacts)
    return router;
  }

}
