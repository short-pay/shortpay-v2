import { FastifyInstance } from "fastify";
import { createOrganization } from "./create-organization";
import { getOrganizations } from "./get-organizations";
import { getOrganization } from "./get-organization";
import { shutdownOrganization } from "./shutdown-organization";
import { transferOrganization } from "./transfer-organization";
import { updateOrganization } from "./update-organization";
import { getMembership } from "./get-membership";


export const registerOrganizationRoutes = (app: FastifyInstance) => {
    app.register(createOrganization)
    app.register(getOrganizations)
    app.register(getOrganization)
    app.register(shutdownOrganization)
    app.register(transferOrganization)
    app.register(updateOrganization)
    app.register(getMembership)
}
