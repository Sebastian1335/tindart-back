import { Router } from "express";
import {  InteractionController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { InteractionService } from "../services/interaction.service";




export class InteractionRoutes {


  static get routes(): Router {

    const router = Router();
    const interactionService = new InteractionService()
    const interactionController = new InteractionController(interactionService)
    // Definir las rutas
    router.post('/like/post/:postId', [AuthMiddleware.validateJWT], interactionController.toggleLikePost);
    router.post('/save/post/:postId', [AuthMiddleware.validateJWT], interactionController.toggleSavePost);
    router.post('/share/post/:postId', [AuthMiddleware.validateJWT], interactionController.toggleSharePost);
    return router;
  }
}
