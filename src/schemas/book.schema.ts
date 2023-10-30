import { z } from "zod";

export const createBookSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    author: z.string({ required_error: "Author is required" }),
    summary: z
      .string({ required_error: "Summary is required" })
      .min(10, "Summary must be more than 10 characters")
      .max(250, "Summary must be less than 250 characters"),
  }),
});

export const params = z.object({
  bookId: z.string(),
});

export const updateBookSchema = z.object({
  params,
  body: z
    .object({
      title: z.string(),
      author: z.string(),
      summary: z
        .string()
        .min(10, "Summary must be more than 10 characters")
        .max(250, "Summary must be less than 250 characters"),
    })
    .partial(),
});

export type ParamsInput = z.TypeOf<typeof params>;
export type CreateBookInput = z.TypeOf<typeof createBookSchema>["body"];
export type UpdateBookInput = z.TypeOf<typeof updateBookSchema>;
