import {  Router } from "express";
import { AuthRoutes } from "./presentation/auth/routes";
import { PostRoutes } from "./presentation/post/routes";
import { InteractionRoutes } from './presentation/interaction/routes';
import { WhiteboardRoutes } from "./presentation/whiteboard/routes";
import { ProfileRoutes } from "./presentation/profile/routes";


export class AppRoutes {


    static get routes(): Router {
        const apiPrefix = "/api/v1"
        const router = Router();
        // router.use(`${apiPrefix}`, (req: Request, res: Response) => {res.send("<p>Hola mundo</p>")})
        router.use(`${apiPrefix}/auth`, AuthRoutes.routes)
        router.use(`${apiPrefix}/feed`, PostRoutes.routes)
        router.use(`${apiPrefix}/interaction`, InteractionRoutes.routes)
        router.use(`${apiPrefix}/whiteboard`, WhiteboardRoutes.routes)
        router.use(`${apiPrefix}/profile`, ProfileRoutes.routes)
        return router;
    }
}