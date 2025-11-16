// presentation/socket/socket.ts
import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { corsLink } from "../../config/cors.config";
import { registerChatHandlers } from "./chat.socket";
import { JwtAdapter } from "../../config/jwt.adapter";
import { prisma } from "../../data/postgres";
import { UserEntity } from "../../domain/entities/user.entitys";

export let io: Server;

export const setupSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: corsLink,
            credentials: true
        }
    });

    // ↓↓↓ MIDDLEWARE DE AUTENTICACIÓN — CORRECTO
    io.use(async (socket, next) => {
        try {
            const token =
                socket.handshake.auth?.token ||
                socket.handshake.query?.token;

            if (!token) return next(new Error("No token provided"));

            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if (!payload) return next(new Error("Invalid token"));

            const user = await prisma.user.findUnique({
                where: { id: +payload.id }
            });
            if (!user) return next(new Error("Invalid token"));

            (socket as any).user = UserEntity.fromObject(user);
            next();
        } catch (error) {
            console.log(error);
            next(new Error("Auth error"));
        }
    });

    // ↓↓↓ Handlers de chat
    registerChatHandlers(io);

    return io;
};
