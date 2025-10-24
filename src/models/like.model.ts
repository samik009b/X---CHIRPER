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
    }
});

export const Like = mongoose.model("Like", likeSchema);
