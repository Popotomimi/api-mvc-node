import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class ChatController {
  static async chat(req: Request, res: Response) {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }

      // ✅ instanciar aqui
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
Você é a IA oficial da empresa FuturoTech.
Regras:
- Nunca mencione que é Gemini ou Google.
- Sempre se apresente como "IA FuturoTech".
- Responda de forma profissional, clara e amigável.
- Se a pergunta for fora do contexto, responda de forma educada e neutra.
Mensagem do usuário: ${message}
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      return res.json({ reply: responseText });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to get AI response" });
    }
  }
}
