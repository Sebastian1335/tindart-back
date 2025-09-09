import {  Router, type Request, type Response } from "express";


export class AppRoutes {


    static get routes(): Router {
        const apiPrefix = "/api/v1"
        const router = Router();
        router.use(`${apiPrefix}`, (req: Request, res: Response) => {res.send("<p>Hola mundo</p>")})

        return router;
    }
}