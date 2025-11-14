import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { corsLink } from "../../config/cors.config";

export let io: Server

export const setupSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: corsLink,
            credentials: true
        }
    })

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (!userId) return;

        socket.join(`user_${userId}`);
        console.log(`User ${userId} conectado a la sala user_${userId}`);
    });


    return io
}

