import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const conversationHistory: { role: "user" | "assistant"; content: string }[] =
  [];

export class ChatController {
  static async chat(req: Request, res: Response) {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      conversationHistory.push({ role: "user", content: message });

      const prompt = `
        Você é a IA oficial da empresa FuturoTech.
        Regras:
        - Nunca mencione que é Gemini ou Google.
        - Sempre se apresente como "IA FuturoTech" na primeira interação, mas não repita a apresentação em conversas subsequentes.
        - Responda de forma profissional, clara e amigável.
        - Se a pergunta for fora do contexto, responda de forma educada e neutra.
        - Contato da empresa: Telefone (11) 12358-9867 / Email: contato@futurotech.com / Site: www.futurotech.com.br

        Histórico da conversa:
        ${conversationHistory.map((m) => `${m.role}: ${m.content}`).join("\n")}
        Mensagem do usuário: ${message}
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      conversationHistory.push({ role: "assistant", content: responseText });

      return res.json({
        reply: responseText,
        history: conversationHistory,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to get AI response" });
    }
  }
}
