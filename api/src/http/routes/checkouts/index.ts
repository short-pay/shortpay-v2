import { FastifyInstance } from "fastify";
import { createCheckout } from "./create-checkout";
import { listCheckouts } from "./list-checkouts";
import { getCheckout } from "./get-checkout";

export const registerCheckoutRoutes = (app: FastifyInstance) => {
    app.register(createCheckout)
    app.register(listCheckouts)
    app.register(getCheckout)
}