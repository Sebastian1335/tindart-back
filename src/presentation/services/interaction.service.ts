import { prisma } from "../../data/postgres";
import { CustomError } from "../../domain/errors/custom.error";

export class InteractionService {
    public toggleLikePost = async (userId: number, postId: number) => {
        const likeExist = await prisma.likePost.findUnique({
            where: {
                userId_postId: {
                    postId: postId,
                    userId: userId,
                },
            },
        });
        if (!likeExist) {
            await prisma.likePost.create({
                data: {
                    postId: postId,
                    userId: userId,
                },
            });

            return {
                response: `el usuario ${userId} le dio like al post ${postId}`,
            };
        } else {
            await prisma.likePost.delete({
                where: {
                    userId_postId: {
                        postId: postId,
                        userId: userId,
                    },
                },
            });
            return {
                response: `el usuario ${userId} le quitó el like al post ${postId}`,
            };
        }
    };
    public toggleSavePost = async (userId: number, postId: number) => {
        const likeExist = await prisma.savePost.findUnique({
            where: {
                userId_postId: {
                    postId: postId,
                    userId: userId,
                },
            },
        });
        if (!likeExist) {
            await prisma.savePost.create({
                data: {
                    postId: postId,
                    userId: userId,
                },
            });

            return {
                response: `el usuario ${userId} guardó el post ${postId}`,
            };
        } else {
            await prisma.savePost.delete({
                where: {
                    userId_postId: {
                        postId: postId,
                        userId: userId,
                    },
                },
            });
            return {
                response: `el usuario ${userId} desguardó el post ${postId}`,
            };
        }
    };
    public toggleSharePost = async (userId: number, postId: number) => {
        const likeExist = await prisma.sharePost.findUnique({
            where: {
                userId_postId: {
                    postId: postId,
                    userId: userId,
                },
            },
        });
        if (!likeExist) {
            await prisma.sharePost.create({
                data: {
                    postId: postId,
                    userId: userId,
                },
            });

            return {
                response: `el usuario ${userId} compartió el post ${postId}`,
            };
        } else {
            await prisma.sharePost.delete({
                where: {
                    userId_postId: {
                        postId: postId,
                        userId: userId,
                    },
                },
            });
            return {
                response: `el usuario ${userId} descompartió el post ${postId}`,
            };
        }
    };

    public toggleLikeComment = async (userId: number, commentId: number) => {
        const likeExist = await prisma.likeComment.findUnique({
            where: {
                userId_commentId: {
                    userId,
                    commentId,
                },
            },
        });
        if (!likeExist) {
            await prisma.likeComment.create({
                data: {
                    commentId,
                    userId,
                },
            });

            return {
                response: `el usuario ${userId} dio like al comentario ${commentId}`,
            };
        } else {
            await prisma.likeComment.delete({
                where: {
                    userId_commentId: {
                        commentId,
                        userId,
                    },
                },
            });
            return {
                response: `el usuario ${userId} quito el like al comentario ${commentId}`,
            };
        }
    };

    public toggleFollowUser = async (idSeguidor: number, idSeguido: number) => {
        const idSeguidoExist = await prisma.user.findUnique({
            where: {
                id: idSeguido,
            },
        });

        if (!idSeguidoExist)
            throw CustomError.internalServer(
                "El usuario que quieres seguir no existe"
            );

        try {
            const followExist = await prisma.follows.findUnique({
                where: {
                    idSeguidor_idSeguido: {
                        idSeguido,
                        idSeguidor,
                    },
                },
            });
            if (!followExist) {
                const res = await prisma.follows.create({
                    data: {
                        idSeguido,
                        idSeguidor,
                    },
                });
                return {
                    response: `el usuario ${idSeguidor} siguio al usuario ${idSeguido}`,
                };
            } else {
                const res = await prisma.follows.delete({
                    where: {
                        idSeguidor_idSeguido: {
                            idSeguido,
                            idSeguidor,
                        },
                    },
                });
                return {
                    response: `el usuario ${idSeguidor} dejó de seguir al usuario ${idSeguido}`,
                };
            }
        } catch (error) {
            throw CustomError.internalServer("Error al seguir a un usuario");
        }
    };
}
