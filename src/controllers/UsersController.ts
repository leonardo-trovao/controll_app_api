import { FastifyReply, FastifyRequest } from "fastify";
import { UsersService } from "../services/UsersService";

class UsersController {
  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const usersService = new UsersService();

    const data = request.body;

    const response = await usersService.create(data);

    reply.send(response);
  }
}

export { UsersController };