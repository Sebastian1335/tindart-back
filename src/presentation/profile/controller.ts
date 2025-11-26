import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { ProfileService } from "../services/profile.service";

export class ProfileController {
    constructor(private service: ProfileService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({
            error: typeof error === "string" ? error : "Internal Server Error",
        });
    };

    getPortafolio = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId
            if (userId === undefined) return this.handleError("userId no esta definido", res)
            if (isNaN(+userId)) return this.handleError("userId invalido", res)
            const page = parseInt(
                typeof req.query.page === "string" ? req.query.page : "1"
            );
            const limit = parseInt(
                typeof req.query.limit === "string" ? req.query.limit : "20"
            );

            const response = await this.service.getPortafolio(limit, page, +userId);

            res.status(200).json({
                data: response.posts,
                page,
                limit,
                total: response.total,
                totalPages: Math.ceil(response.total / limit),
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }
    getLikedPost = async (req: Request, res: Response) => {
        try {
            const user = (req as any).user;
            const page = parseInt(
                typeof req.query.page === "string" ? req.query.page : "1"
            );
            const limit = parseInt(
                typeof req.query.limit === "string" ? req.query.limit : "20"
            );

            const response = await this.service.getLikedPosts(limit, page, user.id);

            res.status(200).json({
                data: response.posts,
                page,
                limit,
                total: response.total,
                totalPages: Math.ceil(response.total / limit),
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }
    getSavedPost = async (req: Request, res: Response) => {
        try {
            const user = (req as any).user;
            const page = parseInt(
                typeof req.query.page === "string" ? req.query.page : "1"
            );
            const limit = parseInt(
                typeof req.query.limit === "string" ? req.query.limit : "20"
            );

            const response = await this.service.getSavedPosts(limit, page, user.id);

            res.status(200).json({
                data: response.posts,
                page,
                limit,
                total: response.total,
                totalPages: Math.ceil(response.total / limit),
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    getProfileInfo = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (typeof id === "undefined") return this.handleError("id es undefined", res);
            if (isNaN(+id))  return this.handleError("id debe ser un numero", res);
            this.service.getProfileInfo(+id)
                .then((r) => res.json(r))
                .catch((e) => this.handleError(e, res))
        } catch (error) {
            this.handleError(error, res);
        }
    }
}