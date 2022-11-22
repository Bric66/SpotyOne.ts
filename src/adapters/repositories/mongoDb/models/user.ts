import {model, Schema} from "mongoose";

const userSchema = new Schema({
    id: {type: String,},
    userName: {type: String,},
    email: {type: String,},
    password: {type: String,},
    created: {type: Date,},
    updated: {type: Date,},
    libraryId: {type: String,},
})

export const UserModel=model ('User',userSchema)