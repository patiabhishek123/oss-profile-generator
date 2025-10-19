import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  const { githubData } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Write a short, inspiring open-source contributor bio based on this data:
    ${JSON.stringify(githubData, null, 2)}
    Keep it under 100 words, in a friendly professional tone.
    `;

    const result = await model.generateContent(prompt);
    const bio = result.response.text();

    return NextResponse.json({ bio });
  } catch (error) {
    return NextResponse.json({ error: "Gemini API request failed." }, { status: 500 });
  }
}
