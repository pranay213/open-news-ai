const fs = require("fs")

async function run(){
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://github.com",
      "X-Title": "daily-ai"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "user",
          content: "Write a concise markdown article about a trending AI or tech topic with tools and examples."
        }
      ]
    })
  })

  const json = await res.json()
  const text = json.choices?.[0]?.message?.content || "empty"

  fs.writeFileSync(`notes/${Date.now()}.md`, text)
}

run()
