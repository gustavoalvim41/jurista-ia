import { Request, Response } from "express";
import VectorSearchService from "../services//vectorSearch.service";

export default class QuestController {
  static async question(req: Request, res: Response) {
    try {
      const {question} = req.body;
      if (!question) {
        return res
          .status(400)
          .json({ error: "o campo 'question' é obrigatório." });
      }
      const result = await VectorSearchService.search(question);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("erro no endpoint question:", error);
      return res
        .status(500)
        .json({ error: "erro interno ao processar pergunta." });
    }
  }
}
