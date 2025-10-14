import { Router } from "express";
import { envs } from "../../config/envs";
import { EmailService } from "../services/email.service";
import { PostController } from "./controller";
import { PostService } from "../services/post.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";




export class PostRoutes {


  static get routes(): Router {

    const router = Router();
    const postService = new PostService()
    const postController = new PostController(postService)
    // Definir las rutas
    router.post('/post', [AuthMiddleware.validateJWT, FileUploadMiddleware.containFiles],postController.uploadPost);
    router.get('/', [AuthMiddleware.validateJWT],postController.getFeedPost)
    router.get('/post/:id/details', [AuthMiddleware.validateJWT],postController.getPostDetails)
    router.post('/post/:id/comment', [AuthMiddleware.validateJWT, FileUploadMiddleware.optionalFiles], postController.uploadComment)

    return router;
  }


}