// modules
import http from "http";
import chalk from "chalk";
// express app
import { app } from "@/app";
// config
import { connectDatabase } from "@/config/database";
import { connectResend } from "@/config/resend";
import { NODE_ENV, PORT } from "@/config/env";
// socket
import { initializeSocket } from "@/socket";

(async () => {
    try {
        // Connect to MongoDb
        await connectDatabase();
        // Connect to Resend
        await connectResend();
        // Initialize http server
        const server = http.createServer(app);
        // Initialize Socket.IO instance and attach it to the existing HTTP server
        // Enables real-time communication via WebSockets
        initializeSocket(server);
        // Start listening for http requests
        server.listen(PORT, () => {
            console.log(chalk.bgGreen.bold(`Server is up in ${NODE_ENV} environment on port ${PORT}.`));
        });
    } catch (error) {
        console.log(chalk.red.bold(error));
    }
})();