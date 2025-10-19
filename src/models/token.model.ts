import { IToken } from "../types";
import mongoose, { Types, Schema, model } from "mongoose";

const tokenSchema = new Schema<IToken>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

export default model<IToken>("Token", tokenSchema, "Tokens");
