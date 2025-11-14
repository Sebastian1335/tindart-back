import { Request, Response, NextFunction } from "express";
import { InteractionService } from "../services/interaction.service";
import { CustomError } from "../../domain/errors/custom.error";
import { ChatService } from "../services/chat.service";

export class ChatController {
    constructor(private service: ChatService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({
            error: typeof error === "string" ? error : "Internal Server Error",
        });
    };

    async getConversationPerUser(req: Request, res: Response){
        if (isNaN(Number(req.params.userId))) return this.handleError("userId debe ser numero", res);
        const userId = Number(req.params.userId);
        this.service.getConversationsByUser(userId)
            .then((r) => res.status(200).json(r))
            .catch((e) => this.handleError(e, res))
    }

    async getMessages(req: Request, res: Response){
        if (isNaN(Number(req.params.conversationId))) return this.handleError("conversatinoId debe ser numero", res);
        const conversationId = Number(req.params.conversationId);
        this.service.getMessages(conversationId)
            .then((r) => res.status(200).json(r))
            .catch((e) => this.handleError(e, res))
    }
}
