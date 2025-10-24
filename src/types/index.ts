import { Document, Types } from "mongoose";

export interface ILike extends Document {
    likedBy: Types.ObjectId;
    post?: Types.ObjectId;
}

export interface IPost extends Document {
    authorId: Types.ObjectId;
    serialNumber: number;
    content: string;
    likedBy: [Types.ObjectId];
    likes: number;
    createdAt: Date;
}

type roletype = "admin" | "user";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: string;
    role: roletype;
    banned: boolean;
    followers: number;
    following: [Types.ObjectId];
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

export interface IRequestUser {
    userId: Types.ObjectId;
    email: string;
}
