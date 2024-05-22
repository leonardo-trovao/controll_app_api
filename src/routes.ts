import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { UsersController } from "./controllers/UsersController";
import { NotificationsController } from "./controllers/NotificationsController";

export default async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/api/", async (request: FastifyRequest, reply: FastifyReply) => {
    return { api: "Controll App Api" };
  });

  fastify.post("/api/user/create", (request: FastifyRequest, reply: FastifyReply) => {
    return new UsersController().createUser(request, reply);
  });

  fastify.post("api/user/login", (request: FastifyRequest, reply: FastifyReply) => {
    return new UsersController().login(request, reply);
  });

  fastify.post("/api/notification/create", (request: FastifyRequest, reply: FastifyReply) => {
    return new NotificationsController().create(request, reply);
  });

};