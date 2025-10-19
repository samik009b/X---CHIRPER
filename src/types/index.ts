import { Document, Types } from "mongoose";

export interface ILike extends Document {
    likedBy: Types.ObjectId;
    post?: Types.ObjectId;
    comment?: Types.ObjectId;
}

export interface IPost extends Document {
    authorId: Types.ObjectId;
    content: string;
    likes: ILike;
    createdAt: Date;
}

type roletype = "admin" | "user";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: roletype;
    createdAt: Date;
}

export interface IComment extends Document {
    author: Types.ObjectId;
    content: string;
    likes: ILike;
}

export interface IToken extends Document {
    userId: Types.ObjectId;
    token: string;
}
