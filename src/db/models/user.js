import { model, Schema } from 'mongoose';

const usersShema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: String },
  },
  { timestamps: true, versionKey: false },
);

usersShema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersShema);
