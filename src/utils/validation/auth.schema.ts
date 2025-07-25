import { z as zod } from 'zod'

export const signInSchema = zod.object({
    email: zod.string().email('Invalid email'),
    password: zod.string().min(6, 'Password must be at least 6 characters')
})

export type SignInInput = zod.infer<typeof signInSchema>