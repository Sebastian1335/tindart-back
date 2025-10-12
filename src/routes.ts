import {  Router } from "express";
import { AuthRoutes } from "./presentation/auth/routes";


export class AppRoutes {


    static get routes(): Router {
        const apiPrefix = "/api/v1"
        const router = Router();
        // router.use(`${apiPrefix}`, (req: Request, res: Response) => {res.send("<p>Hola mundo</p>")})
        router.use(`${apiPrefix}/auth`, AuthRoutes.routes)
        return router;
    }
}