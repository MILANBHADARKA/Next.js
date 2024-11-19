import { z } from "zod";

export const acceptMessageSchema = z.object({          //here we want to validate multiple fields so we use object
    acceptMessage: z.boolean(),
})