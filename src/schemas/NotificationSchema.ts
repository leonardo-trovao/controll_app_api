import { Schema } from "mongoose";
import { INotification } from "../interfaces/NotificationInterface";

const notificationSchema = new Schema<INotification>({
  service: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  severity: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  verdict: {
    type: String,
    required: true,
    minlength: 2,
  },
});

export { notificationSchema };