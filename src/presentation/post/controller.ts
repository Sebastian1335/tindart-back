import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dto/auth/register-user.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { PostService } from "../services/post.service";
import { UploadedFile } from "express-fileupload";
import { CreatePostDto } from "../../domain/dto/post/create-post.dto";

export class PostController {
    constructor(
        private postService: PostService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }
        console.log(`${error}`)
        return res.status(500).json({error: typeof error == "string" ? error : 'Internal Server Error'})
    }
    
    uploadPost = async (req: Request, res: Response) => {
        if (req.files === undefined || req.files === null) return this.handleError("No se encontro una imagen",res)
        const file = req.files.image;

        const {title, description, tags, authorId} = req.body;

        if (!file) this.handleError("No se subio la imagen", res)

        const uploadedFile = Array.isArray(file) ? file[0] : (file as UploadedFile)

        const buffer = Buffer.from(uploadedFile?.data!)

        const [error, dto] = CreatePostDto.create({
            title,
            description,
            image: buffer,
            tags: JSON.parse(tags || "[]")
        })

        if (error) return this.handleError(error,res)
        
        this.postService.uploadPost(dto!)
            .then((data) => res.status(201).json(data))
            .catch((error) => this.handleError(error, res))
    }

    getFeedPost = async (req: Request, res: Response) => {
        const page = parseInt(typeof req.query.page === "string" ? req.query.page : "1");
        const limit = parseInt(typeof req.query.limit === "string" ? req.query.limit : "20");

        this.postService.getFeed(limit, page)
            .then((response) => res.status(201).json({
                data: response.posts,
                page,
                limit,
                total: response.total,
                totalPages: Math.ceil(response.total/limit)
            }))
            .catch((error) => this.handleError(error,res))
    }
}