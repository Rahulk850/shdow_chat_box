import {z } from "zod"

export const signInSchema = z.object({
   email:z.string().nonempty("Enrer Email"),
  password:z.string().nonempty("Enrer Password"),
})