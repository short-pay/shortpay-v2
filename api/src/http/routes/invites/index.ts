import { FastifyInstance } from "fastify";
import { acceptInvite } from "./accept-invite";
import { createInvite } from "./create-invites";
import { getInvite } from "./get-invite";
import { getInvites } from "./get-invites";
import { getPendingInvites } from "./get-pending-invites";
import { rejectInvite } from "./reject-invite";
import { revokeInvite } from "./revoke-invite";

export const registerInviteRoutes = (app: FastifyInstance) => {
    app.register(acceptInvite)
    app.register(createInvite)
    app.register(getInvite)
    app.register(getInvites)
    app.register(getPendingInvites)
    app.register(rejectInvite)
    app.register(revokeInvite)
}