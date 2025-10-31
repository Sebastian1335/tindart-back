import { Request, Response, NextFunction } from "express";
import { InteractionService } from "../services/interaction.service";
import { CustomError } from "../../domain/errors/custom.error";

export class InteractionController {
    constructor(private service: InteractionService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({
            error: typeof error === "string" ? error : "Internal Server Error",
        });
    };

    toggleLikePost = async (req: Request, res: Response) => {
        const user = (req as any).user;
        const postId = req.params.postId;
        if (!postId) return this.handleError("PostId undefined", res);
        if (isNaN(+postId))
            return this.handleError("PostId no es un número", res);
        this.service.toggleLikePost(user.id, +postId)
            .then((r) => res.status(201).json(r))
            .catch((e) => this.handleError(e, res))
    };
    toggleSavePost = async (req: Request, res: Response) => {
        const user = (req as any).user;
        const postId = req.params.postId;
        if (!postId) return this.handleError("PostId undefined", res);
        if (isNaN(+postId))
            return this.handleError("PostId no es un número", res);
        this.service.toggleSavePost(user.id, +postId)
            .then((r) => res.status(201).json(r))
            .catch((e) => this.handleError(e, res))
    };
    toggleSharePost = async (req: Request, res: Response) => {
        const user = (req as any).user;
        const postId = req.params.postId;
        if (!postId) return this.handleError("PostId undefined", res);
        if (isNaN(+postId))
            return this.handleError("PostId no es un número", res);
        this.service.toggleSharePost(user.id, +postId)
            .then((r) => res.status(201).json(r))
            .catch((e) => this.handleError(e, res))
    };
}
