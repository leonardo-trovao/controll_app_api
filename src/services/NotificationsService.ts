import { model } from "mongoose";
import { INotification } from "../interfaces/NotificationInterface";
import { notificationSchema } from "../schemas/NotificationSchema";
import { userSchema } from "../schemas/UserSchema";
import { IUser } from "../interfaces/UserInterface";
import axios from "axios";

class NotificationsService {
  async getAll() {
    const Notification = model<INotification>('Notification', notificationSchema)

    try {
      const notifications = await Notification.find();

      return {
        success: true,
        data: notifications,
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        data: error,
      }
    }
  }

  async getAllByUser(data: any) {
    const Notification = model<INotification>('Notification', notificationSchema)

    try {
      const notifications = await Notification.find({ user: data.id });

      return {
        success: true,
        data: notifications,
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        data: error,
      }
    }
  }

  async createNotification(data: any) {
    const User = model<IUser>('User', userSchema);
    const Notification = model<INotification>('Notification', notificationSchema);

    try {
      const user = await User.findOne({ _id: data.userId })

      const notification = new Notification({
        service: data.service,
        severity: data.severity,
        description: data.description,
        verdict: data.verdict,
        resolved: false,
        user: user != null ? user._id : null
      })

      await notification.save();

      const response = await axios.post('https://fcm.googleapis.com/fcm/send',
        {
          "to": "f8HNDfzbRF6tKMVskcXOBs:APA91bF9nVmpBMS6nH8s7L1Jo8zJBwQX2bZ0h9apFhpXXDqmF13W-RXLSiIJr6Rag_u4z8oXp5e4TLAvX2ZuYQ5Np77EAXG822nVOYr0MhYy5Er8rbD9N3XprMsUx73-6PM0y78bEtXE",
          "notification": {
            "title": "Título da Notificação",
            "body": "Corpo da Notificação"
          },
          "data": {
            "custom_key": "valor_customizado"
          }
        }, {
          headers: {
            "Authorization": "key=AAAAcy8VqQo:APA91bHsCV1PPQX-Ckpf9Gls3yu8S5O8g7DO0xEPrqRwZ-r64uvEmPuVQs3qHMdET1Ts87rz_L2jVe8cZb3ZFptjiLOL-Q5nnqsHHZXnedRUtEUa_7Peh1RdQOEh7AE4kSBjiThnZAxe"
          }
        }
      )

      return {
        success: true,
        data: notification,
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        data: error,
      }
    }

  }

  async deleteNotification(data: any) {
    const Notification = model<INotification>('Notification', notificationSchema)

    try {
      const response = await Notification.deleteOne({ _id: data.id })

      return {
        success: true,
        data: response,
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        data: error,
      }
    }

  }
}

export { NotificationsService }