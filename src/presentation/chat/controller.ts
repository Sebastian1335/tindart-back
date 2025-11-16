import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { ChatService } from "../services/chat.service";
import { CreateConversationDto } from "../../domain/dto/chat/create-conversation.dto";

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

    getConversationPerUser = (req: Request, res: Response) => {
        if (isNaN((req as any).user.id)) return this.handleError("userId debe ser numero", res);
        const userId = Number((req as any).user.id);
        this.service.getConversationsByUser(userId)
            .then((r) => res.status(200).json(r))
            .catch((e) => this.handleError(e, res))
    }

    createConversation = (req: Request, res: Response) => {
        if (isNaN((req as any).user.id)) return this.handleError("userId debe ser numero", res);
        const userOneId = Number((req as any).user.id);
        const userTwoId = Number(req.params.userId)
        if (userTwoId === undefined || isNaN(+userTwoId)) return this.handleError("error userTwoId", res);

        const [error, dto] = CreateConversationDto.create({userOneId, userTwoId})
        if (error) return this.handleError(error, res);
        this.service.findOrCreateConversation(dto!)
            .then((r) => res.status(200).json(r))
            .catch((e) => this.handleError(e, res))
    }

    getMessages = (req: Request, res: Response) => {
        if (isNaN(Number(req.params.conversationId))) return this.handleError("conversatinoId debe ser numero", res);
        const conversationId = Number(req.params.conversationId);
        this.service.getMessages(conversationId)
            .then((r) => res.status(200).json(r))
            .catch((e) => this.handleError(e, res))
    }

    getContacts = (req: Request, res: Response) => {
        const user = (req as any).user;
        this.service.getUserContacts(+user.id)
            .then((r) => res.status(200).json(r))
            .catch((e) => this.handleError(e, res))
    }
}
