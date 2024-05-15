import { model } from "mongoose";
import { INotification } from "../interfaces/NotificationInterface";
import { notificationSchema } from "../schemas/NotificationSchema";
import { userSchema } from "../schemas/UserSchema";
import { IUser } from "../interfaces/UserInterface";

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
  
  async getAllByUser (data: any) {
    const Notification = model<INotification>('Notification', notificationSchema)
  
    try {
      const notifications = await Notification.find({user: data.id});
      
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
      const user = await User.findOne({ _id: data.userId})

      const notification = new Notification({
        service: data.service,
        severity: data.severity,
        description: data.description,
        verdict: data.verdict,
        resolved: false,
        user: user != null ? user._id : null
      })

      await notification.save();

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
      const response = await Notification.deleteOne({ _id: data.id})

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