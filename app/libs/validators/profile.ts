import * as z from "zod"

export const profileValidation = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().readonly(),
    phone: z.string().min(1, { message: "Phone number is required" }),
    birthday: z.string().nullable().optional(),
    lineId: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    notifyBooking: z.boolean().optional(),
    notifyPromotion: z.boolean().optional(),
    notifyHow: z.string().optional(),
});
