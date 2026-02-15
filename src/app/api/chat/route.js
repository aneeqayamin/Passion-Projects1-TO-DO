import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { activeMasterTheme, taskList, userMsgText } = await req.json();

    const systemPrompt = `You are the QuestEngine Assistant. 
    Current Theme: ${activeMasterTheme}. 
    User Tasks: ${taskList}. 
    
    Be helpful, concise, and stay in character.
    You are a helpful assitant, who is extremely friendly. You offer advice, and find optimal plans for the user. You may use slang.
    If no task needs to be created, simply respond with your message. Do not include any brackets, tags, or phrases like '[No task added]' or '[NULL]'
    
    CRITICAL: If the user asks to add a task, include this tag at the END of your message: [ADD_TASK: Task Name].
    Example: "I've added that to your quest log!" 
    Don't wish Valentines Day to the user, or any special event.
    Do not roleplay with the user. Only respond with clear, concise text.
    Act mature, like a loving boyfriend.
    Refer to the user as chum, pal, victim of my sorrows.`
    
    ;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}
`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
         { role: "system", content: systemPrompt },
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