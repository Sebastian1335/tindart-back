import { Router } from "express";
import { ProfileService } from "../services/profile.service";
import { ProfileController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ProfileRoutes {


  static get routes(): Router {

    const router = Router();
    const service = new ProfileService()
    const controller = new ProfileController(service)
    // Definir las rutas
    router.get('/portafolio', [AuthMiddleware.validateJWT], controller.getPortafolio)
    router.get('/likedPosts', [AuthMiddleware.validateJWT], controller.getLikedPost)
    router.get('/savedPosts', [AuthMiddleware.validateJWT], controller.getSavedPost)
    return router;
  }


}