import { strict } from 'assert';
import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema({
    username: {
        type: string,
        required: [true, "Please provide a username"],
        unique: [true, "Username must be unique"]
    },
    email: {
        type: string,
        required: [true, "Please provide an email"],
        unique: [true, "User already exists"]
    },
    password: {
        type: string,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
    verifyToken: string,
    verifyTokenExpiry: Date,
    
})



const User = mongoose.models.users || mongoose.model("userd", userSchema)

export default User;