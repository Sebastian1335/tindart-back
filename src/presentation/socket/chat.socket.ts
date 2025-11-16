// presentation/socket/chat.socket.ts
import { ChatService } from "../services/chat.service";
import { CreateMessageDto } from "../../domain/dto/chat/create-message.dto";
import { Server, Socket } from "socket.io";

const chatService = new ChatService();

interface SendMessagePayload {
    conversationId: number;
    senderId: number;
    content: string;
    type: "text" | "image" | "file";
    tempId?: string;
}


interface SendMessageCallback {
    (response: { ok: boolean; message?: any; error?: string }): void;
}

interface GetMessagesPayload {
    conversationId: number;
    limit: number;
    offset: number;
}

interface GetMessagesCallback {
    (response: { ok: boolean; messages?: any; error?: string }): void;
}

interface MarkReadPayload {
    conversationId: number;
}

interface TypingPayload {
    conversationId: number;
}

interface JoinConversationPayload {
    conversationId: number;
}

interface DeliveredPayload {
    messageId: number;
}

// ----------------------------------

export const registerChatHandlers = (io: Server) => {
    io.on("connection", async (socket) => {
        const user = socket.user;
        if (!user) return;

        const userId = user.id;

        socket.join(`user_${userId}`);

        // Unir a todas las conversaciones del usuario
        const conversations = await chatService.getConversationsByUser(userId);
        conversations.forEach((conv) => {
            socket.join(`conversation_${conv.id}`);
        });

        // -------------------------------------
        // SEND MESSAGE
        // -------------------------------------
        socket.on(
            "send_message",
            async (payload: SendMessagePayload, callback: SendMessageCallback) => {
                try {
                    const [error, dto] = CreateMessageDto.create(payload);
                    if (error) throw new Error(error);

                    const message = await chatService.saveMessage(dto!);

                    io.to(`conversation_${dto!.conversationId}`).emit("new_message", {...message, tempId: payload.tempId || null,});

                    callback({ ok: true, message });
                } catch (err: any) {
                    callback({ ok: false, error: err.message });
                }
            }
        );

        // -------------------------------------
        // GET MESSAGES
        // -------------------------------------
        socket.on(
            "get_messages",
            async (
                { conversationId, limit, offset }: GetMessagesPayload,
                callback: GetMessagesCallback
            ) => {
                try {
                    const messages = await chatService.getMessages(
                        conversationId,
                        limit,
                        offset
                    );
                    callback({ ok: true, messages });
                } catch (err: any) {
                    callback({ ok: false, error: err.message });
                }
            }
        );

        // -------------------------------------
        // MARK READ
        // -------------------------------------
        socket.on(
            "mark_read",
            async ({ conversationId }: MarkReadPayload) => {
                try {
                    const res = await chatService.markAsRead(conversationId, userId);

                    io.to(`conversation_${conversationId}`).emit("messages_read", {
                        conversationId,
                        userId,
                        count: res.count
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        );

        // -------------------------------------
        // TYPING
        // -------------------------------------
        socket.on("typing", ({ conversationId }: TypingPayload) => {
            socket.to(`conversation_${conversationId}`).emit("typing", { fromId: userId });
        });

        // -------------------------------------
        // JOIN CONVERSATION
        // -------------------------------------
        socket.on(
            "join_conversation",
            ({ conversationId }: JoinConversationPayload) => {
                socket.join(`conversation_${conversationId}`);
            }
        );

        // -------------------------------------
        // DELIVERED
        // -------------------------------------
        socket.on(
            "delivered",
            async ({ messageId }: DeliveredPayload) => {
                try {
                    await chatService.markAsDelivered(messageId);

                    io.emit("message_delivered", {
                        messageId,
                        status: "DELIVERED"
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        );

        socket.on("disconnect", () => {
            console.log(`User ${userId} disconnected`);
        });
    });
};
