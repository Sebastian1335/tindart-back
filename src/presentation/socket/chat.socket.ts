import { io } from "./socket";
import { ChatService } from '../services/chat.service';
import { CreateMessageDto } from "../../domain/dto/chat/create-message.dto";

const chatService = new ChatService();


export const registerChatHandlers = () => {
    io.on("connection", async (socket) => {
        const userId = Number(socket.handshake.query.userId);
        if (!userId) return;

        socket.join(`user_${userId}`);


        const conversations = await chatService.getConversationsByUser(userId);
        conversations.forEach(conv => {
            socket.join(`conversation_${conv.id}`);
        });

        socket.on("send_message", async (payload, callback) => {
            try {
                const [error, dto] = CreateMessageDto.create(payload)
                if (error) throw new Error(error)
                const message = await chatService.saveMessage(dto!)
                
                socket.to(`conversation_${dto!.conversationId}`).emit("new_message", message)

                callback?.({ok: true, message})
            } catch (err) {
                callback?.({ ok: false, error: err });
            }
        });

        socket.on("get_messages", async ({conversationId, limit, offset}, callback) => {
            if (
                isNaN(Number(conversationId)) ||
                isNaN(Number(limit)) ||
                isNaN(Number(offset))
            ) {
                return callback?.({ ok: false, error: "Parámetros inválidos" });
            }
            try {
                const messages = await chatService.getMessages(+conversationId, +limit, +offset);
                callback?.({ ok: true, messages });
            } catch (err: any) {
                callback?.({ ok: false, error: err.message || err });
            }
        })

        socket.on("mark_read", async ({ conversationId }) => {
            try {
                await chatService.markAsRead(conversationId, userId);

                io.to(`conversation_${conversationId}`).emit("messages_read", {
                    conversationId,
                    userId,
                });
            } catch (err) {
                console.error(err);
            }

        });
        socket.on("typing", ({ conversationId }) => {
            socket.to(`conversation_${conversationId}`).emit("typing", {fromId: userId})
        });

        socket.on("join_conversation", ({conversationId}) => {
            socket.join(`conversation_${conversationId}`)
        })

        socket.on("disconnect", () => {
            console.log(`User ${userId} disconnected`);
        });

    });
}