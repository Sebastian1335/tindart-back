import { prisma } from "../../data/postgres";
import { PostEntity } from "../../domain/entities/post.entity";
import { UserEntity } from "../../domain/entities/user.entitys";
import { CustomError } from "../../domain/errors/custom.error";

export class ProfileService {
    constructor() {}

    public getProfilePicture = async (userId: number) => {
        const response = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                profilePictures: {
                    select: {
                        profileMimeType: true,
                        profilePicture: true,
                    },
                },
            },
        });
        return response;
    };
    public getWallPicture = async (userId: number) => {
        const response = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                profilePictures: {
                    select: {
                        profileMimeType: true,
                        profilePicture: true,
                    },
                },
            },
        });

        return response;
    };

    public getPortafolio = async (
        limit: number,
        page: number,
        userId: number
    ): Promise<{ posts: PostEntity[]; total: number }> => {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            prisma.post.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                where: {
                    authorId: userId,
                },
            }),
            prisma.post.count({ where: { authorId: userId } }),
        ]);

        const posts = data.map((post) => {
            return PostEntity.fromObject(post);
        });

        return { posts, total };
    };

    public getLikedPosts = async (
        limit: number,
        page: number,
        userId: number
    ): Promise<{ posts: PostEntity[]; total: number }> => {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            prisma.post.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                where: {
                    LikePost: {
                        some: {
                            userId: userId,
                        },
                    },
                },
            }),
            prisma.post.count({
                where: {
                    LikePost: {
                        some: {
                            userId: userId,
                        },
                    },
                },
            }),
        ]);

        const posts = data.map((post) => {
            return PostEntity.fromObject(post);
        });

        return { posts, total };
    };

    public getSavedPosts = async (
        limit: number,
        page: number,
        userId: number
    ): Promise<{ posts: PostEntity[]; total: number }> => {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            prisma.post.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                where: {
                    SavePost: {
                        some: {
                            userId: userId,
                        },
                    },
                },
            }),
            prisma.post.count({
                where: {
                    SavePost: {
                        some: {
                            userId: userId,
                        },
                    },
                },
            }),
        ]);

        const posts = data.map((post) => {
            return PostEntity.fromObject(post);
        });

        return { posts, total };
    };

    public async getProfileInfo(userId: number, id: number) {
        //FindONe para verificar si existe
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                password: true,
                userName: true,
                email: true,
                createdAt: true,
                description: true,
                _count: {
                    select: {
                        followers: true,
                        following: true,
                    },
                },
                followers: {
                    where: {
                        idSeguidor: id
                    },
                    select: {
                        id: true
                    }
                },
                post: {
                    select: {
                        _count: {
                            select: {
                                LikePost: true,
                            },
                        },
                    },
                },
            },
        });
        let totalLikesReceived = null;
        if (user!.post !== null){
            totalLikesReceived = user!.post.reduce(
                (acc, post) => acc + post._count.LikePost,
                0
            );
        }

        if (!user) throw CustomError.badRequest("Usuario no resgistrado");
        // if (user.emailValidated === false) throw CustomError.unauthrized('Email no validado')
        // isMatch... bcript.compare(123123,asdsfawferwrfwr123)
        const { password, post, ...info } = UserEntity.fromObject(user);

        return {
            extra: {
                description: user.description,
                ...user._count,
                totalLikesReceived: totalLikesReceived ?? 0,
            },
            ...info,
        };
    }
}
