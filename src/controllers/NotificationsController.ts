import { FastifyReply, FastifyRequest } from "fastify";
import { NotificationsService } from "../services/NotificationsService";

class NotificationsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const notificationsService = new NotificationsService();

    const data = request.body;

    const response = await notificationsService.createNotification(data);

    reply.send(response);
  }
}

export { NotificationsController }