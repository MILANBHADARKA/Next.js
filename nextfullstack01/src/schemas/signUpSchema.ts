import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2,"Username must be atleast 2 characters")
    .max(20, "Usrname must be no more then 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")


export const signUpSchema = z.object({          //here we want to validate multiple fields so we use object
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be atleast 6 characters"})
})