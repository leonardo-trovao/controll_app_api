import { model } from "mongoose";
import { IUser } from "../interfaces/UserInterface";
import { userSchema } from "../schemas/UserSchema";

class UsersService {
  async create(data: any) {
    const User = model<IUser>('User', userSchema);

    try {
      const user = new User({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      await user.save();

      return {
        success: true,
        data: user,
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        data: error,
      }
    }
  }

  async login(data: any) {
    const User = model<IUser>('User', userSchema);

    const user = await User.find({
      'email': data.email,
      'password': data.password,
    })

    if (user.length > 0) {
      return {
        success: true,
        data: user,
      }
    } else {
      return {
        success: false,
        data: 'User not found',
      }
    }
  }
}

export { UsersService };