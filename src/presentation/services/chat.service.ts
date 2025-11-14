import { prisma } from '../../data/postgres';
import { CreateConversationDto } from '../../domain/dto/chat/create-conversation.dto';
import { CreateMessageDto } from '../../domain/dto/chat/create-message.dto';
import { CustomError } from '../../domain/errors/custom.error';

export class ChatService {
    async findOrCreateConversation(dto: CreateConversationDto){
        let conv = await prisma.conversation.findFirst({
            where: {
                OR: [
                    {userOneId: dto.userOneId, userTwoId: dto.userTwoId},
                    {userOneId: dto.userTwoId, userTwoId: dto.userOneId}
                ]
            }
        })
        if (!conv){
            conv = await prisma.conversation.create({
                data: {
                    userOneId: dto.userOneId,
                    userTwoId: dto.userTwoId
                }
            })
        }
        return conv
    }

    async saveMessage(dto: CreateMessageDto){
        const conversation = await prisma.conversation.findUnique({
            where: {id: dto.conversationId}
        })
        if (!conversation){
            throw CustomError.notFound("La conversación no existe")
        }
        const message = await prisma.message.create({
            data: {
                fromId: dto.fromId,
                conversationId: dto.conversationId,
                text: dto.text ?? null,
                postId: dto.postId ?? null,
                status: "SENT"
            }
        })
        return message
    }

    async getConversationsByUser(userId: number){
        const res = await prisma.conversation.findMany({
            where: {
                OR: [
                    {userOneId: userId},
                    {userTwoId: userId}
                ]
            },
            include: {
                messages: {
                    take: 1,
                    orderBy: {createdAt: "desc"}
                },
                userOne: true,
                userTwo: true
            },
            orderBy: {
                messages: {
                    _count: "desc"
                }
            }
        })
        return res
    }

    async getMessages(conversationId: number, limit =  50, offset= 0){
        const res = await prisma.message.findMany({
            where: {conversationId},
            orderBy: {createdAt: "desc"},
            skip: offset,
            take: limit
        })

        return res
    }

    async markAsDelivered(messageId: number) {
        const res = await prisma.message.update({
            where: {id: messageId},
            data: {status: "DELIVERED"}
        })
    }
    async markAsRead(conversationId: number, userId: number) {
        const res = await prisma.message.updateMany({
            where: {
                conversationId,
                fromId: {not: userId},
                status: {not: "READ"}
            },
            data: {status: "READ"}
        })

        return res
    }
}