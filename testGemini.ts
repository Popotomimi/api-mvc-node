import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

async function main() {
  const key = process.env.GEMINI_API_KEY;
  console.log("Usando chave:", key);

  const genAI = new GoogleGenerativeAI(key!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const result = await model.generateContent("Diga olá como IA FuturoTech");
    console.log("Resposta da IA:", result.response.text());
  } catch (err) {
    console.error("Erro ao chamar Gemini:", err);
  }
}

main();
