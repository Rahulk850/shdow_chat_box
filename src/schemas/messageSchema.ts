import { z } from "zod";

export const messageSchema = z.object({
  content:z
  .string()
  .min(10,{message:'content msut be at least 10 characters'})
  .max(300,{message:'content cannot be more than 300 characters'}),
});
