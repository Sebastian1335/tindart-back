import { prisma } from "../../data/postgres";
import { PostEntity } from "../../domain/entities/post.entity";

export class ProfileService {
    constructor() {}

    public getProfileData = async (userId: number) => {
        const response = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                createdAt: true,
                userName: true,
                profilePictures: {
                    select: {
                        profilePicture: true,
                        wallPicture: true,
                    },
                },
                _count: {
                    select: {
                        followers: true,
                        following: true,
                    },
                },
            },
        });
    };

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
}
