import { Request, Response } from "express";

export default class QuestController {
  static async question(req: Request, res: Response) {
    try {
      const { question } = req.body;
      if (!question) {
        return res
          .status(400)
          .json({ error: "a pergunta precisa ser feita!" });
      }
      return res.status(200).json(question);
    } catch (error: any) {
      console.error('erro no endpoint question:', error);
      return res.status(500).json({ error: 'erro interno ao processar pergunta.' });
    }
  }
}
