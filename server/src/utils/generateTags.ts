import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function generateTagsFromContent(
  content: string
): Promise<string[]> {
  const prompt = `
Given the following blog content, generate up to 5 relevant, concise tags that represent its main topics. 
Return them as a simple JSON array of strings. No explanation.

Content:
${content}
`;

  const result = await model.generateContent(prompt);
  try {
    const res = result.response.text();
    const arr = res.replace("```json", "").replace("```", "").trim();
    const tags = JSON.parse(arr);

    return tags;
  } catch (e) {
    return [];
  }
}
