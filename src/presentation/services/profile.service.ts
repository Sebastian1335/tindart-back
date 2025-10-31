import { prisma } from "../../data/postgres"

export class ProfileService {
    constructor(){}

    public getProfileData = async (userId: number) => {
        const response = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                createdAt: true,
                userName: true,
                profilePictures: {
                    select: {
                        profilePicture: true,
                        wallPicture: true
                    }
                },
                _count: {
                    select: {
                        followers: true,
                        following: true
                    }
                }
            }
        })
        
    }

    public getProfilePicture = async (userId: number) => {
        const response = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                profilePictures: {
                    select: {
                        profileMimeType: true,
                        profilePicture: true,
                    }
                }
            }
        })
        return response
    }
    public getWallPicture = async (userId: number) => {
        const response = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                profilePictures: {
                    select: {
                        profileMimeType: true,
                        profilePicture: true,
                    }
                }
            }
        })

        return response;
    }
}