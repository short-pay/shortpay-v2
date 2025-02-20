import { FastifyInstance } from "fastify";
import { createAccount } from "./create-account";
import { authenticateWithPassword } from "./authenticate-with-password";
import { getProfile } from "./get-profile";
import { requestPasswordRecover } from "./request-password-recover";
import { resetPassword } from "./reset-password";


export const registerAuthRoutes = (app: FastifyInstance) => {
    app.register(createAccount)
    app.register(authenticateWithPassword)
    app.register(getProfile)
    app.register(requestPasswordRecover)
    app.register(resetPassword)
}
