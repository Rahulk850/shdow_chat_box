import {z} from "zod"

export const userValidation = z
.string()
.nonempty({ message: "Username is required" })
.min(2,"username must be at least 2 characters")
.max(20, "username must be at least 20 characters")
.regex(/^[a-zA-Z0-9_]+$/,"username must not contain scpecial characters") 

export  const signUpSchema = z.object({
    username: userValidation,
    email: z.string().email({message:"A valid email is required"}),
    password: z.string().min(8, {message:"Password must be at least 8 characters long"})
})