import mongoose, { Schema } from "mongoose";
import { IPost } from "../types";

const postSchema = new Schema<IPost>({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        max: [250, "content must be under 250 characters"]
    },
    likes: {
        type: Schema.Types.ObjectId,
        ref: "Like"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export const Post = mongoose.model<IPost>("Post", postSchema);
