import { FastifyInstance } from "fastify";
import { createTransaction } from "./create-transaction";

export const registerTransactionRoutes = (app: FastifyInstance) => {
    app.register(createTransaction)
}