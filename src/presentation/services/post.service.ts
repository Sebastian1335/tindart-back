import { prisma } from "../../data/postgres";
import { CreatePostDto } from "../../domain/dto/post/create-post.dto";
import { PostEntity } from "../../domain/entities/post.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class PostService {

    public uploadPost = async(postDto: CreatePostDto): Promise<PostEntity> => {
        try {
            const post = await prisma.post.create({
                data: {
                    title: postDto.title,
                    description: postDto.description,
                    authorId: postDto.authorId,
                    image: postDto.image,
                    tags: postDto.tags
                }
            })

            const response = PostEntity.fromObject(post)
            return response
        } catch (error) {
            throw CustomError.internalServer("Error al guardar el post en la base de datos");
        }
    }

    public getFeed = async (limit: number, page: number): Promise<{posts: PostEntity[], total: number}> => {

        const skip = (page - 1) * limit
        const [data, total] = await Promise.all([
            prisma.post.findMany({
                skip,
                take: limit,
                orderBy: {createdAt: 'desc'}
            }),
            prisma.post.count()
        ])

        const posts = data.map((post) => {
            return PostEntity.fromObject(post)
        })
        
        return {posts, total}
    }
}