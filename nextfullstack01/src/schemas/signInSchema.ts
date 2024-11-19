import { z } from "zod";

export const signInSchema = z.object({          //here we want to validate multiple fields so we use object
    identifier: z.string(),         //here identifier = username we can also use username instade of identifier this is only like variable name
    password: z.string(),
})