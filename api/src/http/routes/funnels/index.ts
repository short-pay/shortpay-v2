import { FastifyInstance } from "fastify";
import { createFunnel } from "./create-funnel";
import { getFunnels } from "./get-funnels";
import { getFunnel } from "./get-funnel";

export const registerFunnelsRoutes = (app: FastifyInstance) => {
    app.register(createFunnel)
    app.register(getFunnels)
    app.register(getFunnel)
}