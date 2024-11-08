import { strict } from 'assert';
import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "Username must be unique"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "User already exists"]
    },
    password: {
        type: String,
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
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    
})



const User = mongoose.models.users || mongoose.model("users", userSchema)              //here we are checking if the model is already created or not if not then we are creating the model with the name "users" and the schema userSchema    

export default User;