import { model, Schema } from "mongoose";
import { mongooseSaveError, setUpdateSettings } from "./hooks.js";
import { ROLES } from "../../constants/contacts-constants.js";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: [ROLES.TEACHER, ROLES.PARENT],
            default: ROLES.PARENT,
            },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

userSchema.post("save", mongooseSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", mongooseSaveError);

export const UsersCollection = model('users', userSchema);