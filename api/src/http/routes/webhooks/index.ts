import { FastifyInstance } from "fastify";
import { postbackTransaction } from "./postback-transaction";

export const registerWebhookRoutes = (app: FastifyInstance) => {
    app.register(postbackTransaction)
}