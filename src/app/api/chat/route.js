import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { activeMasterTheme, taskList, userMsgText } = await req.json();

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { 
            role: "system", 
            content: `You are the QuestEngine Assistant. Current Theme: ${activeMasterTheme}. User Tasks: ${taskList}. Be helpful, concise, and stay in character based on the theme (Professional=Friendly, Retro=Gaming Lingo, Flower=Gentle, Valentine=Loving).` 
          },
          { role: "user", content: userMsgText }
        ],
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to reach Groq" }, { status: 500 });
  }
}