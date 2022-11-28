import { model, Schema } from "mongoose";
export type userModel = {
    id: string;
    userName: string;
    email: string;
    password: string;
    created: Date;
    updated?: Date;
    libraryId: string;
};
const userSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
    },
    updated: {
        type: Date,
        required: false,
    },
    libraryId: {
        type: String,
        required: true,
    },
});
export const UserModel = model("User", userSchema);