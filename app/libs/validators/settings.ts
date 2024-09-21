import * as z from "zod"

export const settingsValidation = z.object({
    takeTime: z.number(),
    maxStudent: z.number().min(1, { message: "At least 1 student" }),
});
