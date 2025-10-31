import { prisma } from "../../data/postgres";

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
}
