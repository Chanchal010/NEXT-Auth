import { verify } from "crypto";
import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

})


const User = mongoose.models.users ||  mongoose.model("users", userSchema)


export default User;
