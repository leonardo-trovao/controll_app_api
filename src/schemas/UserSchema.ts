import { Schema } from "mongoose";
import { IUser } from "../interfaces/UserInterface";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
  },
});

export { userSchema };