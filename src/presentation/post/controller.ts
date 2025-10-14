import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { PostService } from "../services/post.service";
import { UploadedFile } from "express-fileupload";
import { CreatePostDto } from "../../domain/dto/post/create-post.dto";

export class PostController {
  constructor(private postService: PostService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({
      error: typeof error === "string" ? error : "Internal Server Error",
    });
  };

  uploadPost = async (req: Request, res: Response) => {
    try {
      // 👇 usamos el middleware anterior, que deja el archivo en req.files
      const fileArray = req.body.files
      if (fileArray.length === 0) return res.status(400).json({ error: "No se subió ninguna imagen" });
      const uploadedFile = fileArray[0];
      const buffer = Buffer.from(uploadedFile!.data);

      const { title, description, tags } = req.body;
      const user = (req as any).user; // o req.user si lo defines globalmente

      const parsedTags = typeof tags === "string" ? JSON.parse(tags || "[]") : tags;

      const [error, dto] = CreatePostDto.create({
        title,
        description,
        image: buffer,
        tags: parsedTags,
        authorId: user.id,
      });

      if (error) return this.handleError(error, res);

      this.postService.uploadPost(dto!)
        .then((response) => res.status(201).json(response))
        .catch((error) => this.handleError(error, res))

    } catch (error) {
      this.handleError(error, res);
    }
  };

  getFeedPost = async (req: Request, res: Response) => {
    try {
      const page = parseInt(typeof req.query.page === "string" ? req.query.page : "1");
      const limit = parseInt(typeof req.query.limit === "string" ? req.query.limit : "20");

      const response = await this.postService.getFeed(limit, page);

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
  };
}
