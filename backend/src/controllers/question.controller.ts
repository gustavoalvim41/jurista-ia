import { Request, Response } from "express";
import VectorService from "../services/vector.service";
import { buildPrompt } from "../prompts/prompt";
import { CohereClientV2 } from "cohere-ai";

const cohere = new CohereClientV2({
  token: process.env.API_KEY!,
});

export default class QuestController {
  static async question(req: Request, res: Response) {
    try {
      const { question } = req.body;
      if (!question) {
        return res
          .status(400)
          .json({ error: "o campo 'question' é obrigatório." });
      }
      const context = await VectorService.searchContext(question);
      const prompt = buildPrompt(context, question);
      const llmResponse = await cohere.chat({
        model: "command-r-08-2024",
        messages: [{ role: "user", content: prompt }],
      });
      const answer = llmResponse.message.content
        .map((c: any) => c.text || "")
        .join(" ");
      return res.status(200).json({ answer });
    } catch (error: any) {
      console.error("erro no endpoint question:", error);
      return res
        .status(500)
        .json({ error: "erro interno ao processar pergunta." });
    }
  }
}
