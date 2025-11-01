import { Router } from "express";
import { WhiteboardService } from "../services/whiteboard.service";
import { WhiteboardController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class WhiteboardRoutes{
    static get routes(): Router {
        const router = Router();
        const service = new WhiteboardService()
        const controller = new WhiteboardController(service)
        router.get("/", [AuthMiddleware.validateJWT], controller.getWhiteboards)
        router.get("/:id/snapshot", [AuthMiddleware.validateJWT], controller.getSnapshot)
        router.post("/", [AuthMiddleware.validateJWT], controller.createWhiteboard)
        router.put("/:id", [AuthMiddleware.validateJWT], controller.updateWhiteboard)
        return router
    }
}