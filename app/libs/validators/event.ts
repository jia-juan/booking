import { z } from 'zod'

export const eventFormValidation = z
    .object({
        startTime: z.string()
            .refine(val => !isNaN(Date.parse(val)), { message: "Invalid start time format" })
            .transform(val => new Date(val)),
        endTime: z.string()
            .refine(val => !isNaN(Date.parse(val)), { message: "Invalid end time format" })
            .transform(val => new Date(val)),
    }).superRefine((data, ctx) => {
        if (data.endTime <= data.startTime) {
            ctx.addIssue({
                path: ["endTime"],
                message: "End time must be after start time",
                code: z.ZodIssueCode.custom,
            });
        }
    });