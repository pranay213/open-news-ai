const fs = require("fs")

async function call(model){
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://github.com",
      "X-Title": "daily-ai"
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "user", content: "Write a concise markdown article about a trending AI or tech topic with tools and examples." }
      ]
    })
  })

  const json = await res.json()
  return json?.choices?.[0]?.message?.content || ""
}

async function run(){
  const models = [
    "meta-llama/llama-3-8b-instruct:free",
    "google/gemma-7b-it:free",
    "openchat/openchat-7b:free"
  ]

  let text = ""

  for (const m of models){
    text = await call(m)
    if (text) break
  }

  if (!text){
    text = "# AI Note\n\nFallback content.\n\nTopics:\n- AI agents\n- RAG\n- Dev productivity\n"
  }

  fs.writeFileSync(`notes/${Date.now()}.md`, text)
}

run()
