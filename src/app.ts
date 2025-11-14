import { envs } from "./config/envs";
import { setupSocket } from "./presentation/socket/socket";
import { AppRoutes } from "./routes";
import { Server } from "./server";

(async () => {
    main();
})()


async function main(){
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })

    await server.start()
    if (!server.server) {
        throw new Error("HTTP server not initialized");
    }
    setupSocket(server.server)
}

