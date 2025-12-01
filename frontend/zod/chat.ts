import { z } from "zod";

const chatSchema = z.object({
  file: z
    .custom<File>((val) => val instanceof File, {
      message: "O arquivo é obrigatório.",
    })
    .refine(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "text/plain",
      "O arquivo deve ser PDF ou TXT."
    ),
  question: z
    .string()
    .min(1, "A pergunta é obrigatória."),
});

export default chatSchema;
