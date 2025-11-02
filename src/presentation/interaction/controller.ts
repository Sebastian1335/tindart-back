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
    toggleLikeComment = async (req: Request, res: Response) => {
        const user = (req as any).user;
        const commentId = req.params.commentId;
        if (!commentId) return this.handleError("CommentId undefined", res);
        if (isNaN(+commentId))
            return this.handleError("PostId no es un número", res);
        this.service.toggleLikeComment(user.id, +commentId)
            .then((r) => res.status(201).json(r))
            .catch((e) => this.handleError(e, res))
    }

    toggleFollowUser = async (req: Request, res: Response) => {
        const user = (req as any).user;
        const otherUserId = req.params.userId;

        if (!otherUserId) return this.handleError("CommentId undefined", res);
        if (isNaN(+otherUserId))
            return this.handleError("PostId no es un número", res);

        this.service.toggleFollowUser(+user.id, +otherUserId)
            .then((r) => res.status(201).json(r))
            .catch((e) => this.handleError(e, res))
    }
}
