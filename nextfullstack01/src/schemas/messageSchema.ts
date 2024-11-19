import { z } from "zod";


export const messageSchema = z.object({          //here we want to validate multiple fields so we use object
    content: z
        .string()
        .min(10, {message: "Content must be atleast of 10 characters"})
        .max(300, {message: "Content must be no longer then 300 characters"})
})