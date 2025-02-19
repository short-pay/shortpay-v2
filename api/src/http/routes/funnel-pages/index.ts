import { FastifyInstance } from "fastify";
import { createFunnelPage } from "./create-funnel-page";
import { getFunnelPages } from "./get-funnels-pages";
import { deleteFunnelPages } from "./delete-funnel-pages";

export const registerFunnelPageRoutes = (app: FastifyInstance) => {
    app.register(createFunnelPage)
    app.register(getFunnelPages)
    app.register(deleteFunnelPages)
}