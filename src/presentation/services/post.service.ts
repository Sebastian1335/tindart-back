import { prisma } from "../../data/postgres";
import { CreateCommentDto } from "../../domain/dto/comment/create-comment.dto";
import { CreatePostDto } from "../../domain/dto/post/create-post.dto";
import { CommentEntity } from "../../domain/entities/comment.entity";
import { PostEntity } from '../../domain/entities/post.entity';
import { UserEntity } from "../../domain/entities/user.entitys";
import { CustomError } from "../../domain/errors/custom.error";



interface PostDetails {
    likedByUser:  boolean;
    savedByUser:  boolean;
    sharedByUser: boolean;
    count:        Count;
}

interface Count {
    LikePost:  number;
    SavePost:  number;
    SharePost: number;
}



export class PostService {

    public uploadPost = async(postDto: CreatePostDto): Promise<PostEntity> => {
        try {
            const post = await prisma.post.create({
                data: {
                    title: postDto.title,
                    description: postDto.description,
                    authorId: postDto.authorId,
                    image: postDto.image,
                    mimeType: postDto.imageMimeType,
                    tags: postDto.tags,
                }})
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
                orderBy: {createdAt: 'desc'},
            }),
            prisma.post.count()
        ])

        const posts = data.map((post) => {
            return PostEntity.fromObject(post)
        })
        
        return {posts, total}
    }

    public getPostDetails = async (postId: number, userId: number): Promise<{user: Partial<UserEntity>, comments: CommentEntity[], postDetails: PostDetails}> => {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            select: {
                author: {
                    select: {
                        userName: true,
                        id: true,
                        _count: {
                            select: {
                                followers: true
                            }
                        },
                        followers: {
                            where: {
                                idSeguidor: userId
                            },
                            select: {
                                id: true
                            }
                        }
                    }
                },
                comments: {
                    select: {
                        content: true,
                        id: true,
                        image: true,
                        postId: true,
                        createdAt: true,
                        authorId: true,
                        author: {
                            select: {
                                userName: true,
                            }
                        },
                        _count: {
                            select: {
                                LikeComment: true
                            }
                        },
                        LikeComment: {
                            where: {
                                userId
                            },
                            select: {id: true}
                        }
                    }
                },
                _count: {
                    select: {
                        LikePost: true,
                        SavePost: true,
                        SharePost: true
                    }},
                LikePost: {
                    where: {userId: userId},
                    select: {id: true}
                },
                SavePost: {
                    where: {userId},
                    select: {id: true}
                },
                SharePost: {
                    where: {userId},
                    select: {id: true}
                }
            }
        })
        if (post === null) throw new CustomError(400, `post con id ${postId} no existe`)


        const comments = post.comments.map((com) => {
            return CommentEntity.fromObject(com)
        }) 
        const postDetails = {
            likedByUser: post.LikePost.length > 0,
            savedByUser: post.SavePost.length > 0,
            sharedByUser: post.SharePost.length > 0,
            count: post._count
        }

        return {user: post.author, comments: comments, postDetails, }
    }

    public createComment = async (dto: CreateCommentDto): Promise<CommentEntity> => {
        const comment = await prisma.comment.create({
            data: {
                content: dto.content,
                authorId: dto.authorId,
                postId: dto.postId,
                image: !!dto.image ? dto.image : null,
                mimeType: !!dto.imageMimeType ? dto.imageMimeType : null 
            },
            include: {
                author: {
                    select: {
                        userName: true
                    }
                }
            }
        })
        return CommentEntity.fromObject(comment)
    }

    public getImage = async (postId: number) => {
        try {
            const img = await prisma.post.findUnique({
                where: {
                    id: postId
                },
                select: {
                    image: true,
                    mimeType: true
                }
            })
            if (!img) throw new CustomError(400, "no se encontro imagen")

            return img
        } catch (error) {
            throw new CustomError(500, "error del servidor") 
        }
    }
}