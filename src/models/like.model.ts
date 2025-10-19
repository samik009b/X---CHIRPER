import mongoose, { Schema } from "mongoose";
import { ILike } from "../types";
const likeSchema = new Schema<ILike>({
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

export const Like = mongoose.model("Like", likeSchema);
