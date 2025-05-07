import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { input } = await req.json();

  if (!input || input.length < 10) {
    return NextResponse.json({ error: "Please provide more input text." }, { status: 400 });
  }

  try {
    const prompt = `You are a helpful writing assistant that mimics the user's writing style based on the following input. Reply with a tweet-length response in the same tone.

Example input:
"""
${input}
"""

Generate a continuation or related thought in the same style:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    });

    const output = completion.choices[0]?.message?.content?.trim() || "";

    return NextResponse.json({ output });
  } catch (error: any) {
    console.error("OpenAI Error:", error);
    return NextResponse.json({ error: "Failed to generate text." }, { status: 500 });
  }
}
