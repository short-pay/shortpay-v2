import { FastifyInstance } from "fastify";
import { CreateIntegrationToGateway } from "./create-integration-to-gateways";
import { DeleteIntegrationToCheckout } from "./delete-integration-to-checkout";
import { UpdateIntegrationToGateway } from "./update-integration-to-gateway";
import { GetIntegrationsToGateways } from "./get-integrations-to-gateways";

export const registerGatewaysRoutes = (app: FastifyInstance) => {
    app.register(CreateIntegrationToGateway)
    app.register(DeleteIntegrationToCheckout)
    app.register(UpdateIntegrationToGateway)
    app.register(GetIntegrationsToGateways)
}