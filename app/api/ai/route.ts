import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { githubData } = await req.json();

  const prompt = `
  Write a short, inspiring open-source contributor bio based on this data:
  ${JSON.stringify(githubData, null, 2)}
  Keep it under 100 words.
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const bio = completion.choices[0].message.content;
  return NextResponse.json({ bio });
}
