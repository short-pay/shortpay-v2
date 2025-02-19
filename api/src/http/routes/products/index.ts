import { FastifyInstance } from "fastify";
import { createProduct } from "./create-product";
import { deleteProduct } from "./delete-product";
import { getProduct } from "./get-product";
import { getProducts } from "./get-products";
import { updateProduct } from "./update-product";

export const registerProductRoutes = (app: FastifyInstance) => {
    app.register(createProduct)
    app.register(deleteProduct)
    app.register(getProduct)
    app.register(getProducts)
    app.register(updateProduct)
}