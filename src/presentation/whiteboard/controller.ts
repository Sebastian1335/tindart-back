import { Request, Response } from "express";
import { WhiteboardService } from "../services/whiteboard.service";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateWhiteboardDto } from "../../domain/dto/whiteboard/create-whiteboard.dto";
import { UpdateWhiteboardDto } from "../../domain/dto/whiteboard/update-whiteboard.dto";
export class WhiteboardController {
    constructor(private whiteboardService: WhiteboardService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({
            error: typeof error === "string" ? error : "Internal Server Error",
        });
    };

    public getWhiteboards = (req: Request, res: Response) => {
        const user = (req as any).user;
        if (typeof user === "undefined" || isNaN(+user.id)) return this.handleError("user undefined", res);

        this.whiteboardService.getWhiteboards(+user.id)
            .then((r) => res.status(201).json(r))
            .catch((e) => this.handleError(e, res))
    };
    public getSnapshot = (req: Request, res: Response) => {
        const id = req.params.id
        if (typeof id === "undefined" || isNaN(+id)) return this.handleError("Id no es un numero", res);

        this.whiteboardService.getSnapshot(+id)
            .then((r) => res.status(201).json(r))
            .catch((e) => this.handleError(e, res))
    };

    public createWhiteboard = (req: Request, res: Response) => {
        const user = (req as any).user;
        if (typeof user === "undefined") return this.handleError("user undefined", res);
        const [error, dto] = CreateWhiteboardDto.create({ownerId: user.id,...req.body});
        if (error) return this.handleError(error, res)
        this.whiteboardService.createWhiteboard(dto!)
            .then((r) => res.status(201).json(r))
            .catch((e) => this.handleError(e, res))
    }
    public updateWhiteboard = (req: Request, res: Response) => {
        const id = req.params.id
        if (typeof id === "undefined" || isNaN(+id)) return this.handleError("Id no es un numero", res);
        
        const user = (req as any).user;
        if (typeof user === "undefined") return this.handleError("user undefined", res);
        
        const [error, dto] = UpdateWhiteboardDto.create({ownerId: user.id,...req.body});
        if (error) return this.handleError(error, res);
        
        this.whiteboardService.updateWhiteboard(dto!, +id)
            .then((r) => res.status(201).json(r))
            .catch((e) => this.handleError(e, res))
    }
}
