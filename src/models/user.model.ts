import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: [5, "password should be minimum of 5 character"],
        regex: [/^[A-Za-z0-9]+$/, "password can not contain special character"]
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    followers: {
        type: Number,
        default: 0
    },
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// hash the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 2);
    next();
});

export default model<IUser>("User", userSchema, "Users");
