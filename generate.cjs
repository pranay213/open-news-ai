const fs = require("fs")

const topics = [
  "AI Agents architecture",
  "RAG production systems",
  "AI SaaS ideas",
  "React AI UI patterns",
  "LLM prompt engineering patterns",
  "Trending GitHub AI tools",
  "Developer productivity with AI",
  "Open source AI stack",
  "Future of AI engineering",
  "AI system design patterns",
  "Vector databases explained",
  "AI automation workflows",
  "Multi agent systems",
  "Edge AI applications",
  "AI coding copilots"
]

const topic = topics[Math.floor(Math.random()*topics.length)]

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
        { role: "user", content: "Write a concise markdown article about: " + topic + " with tools and examples." }
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
    text = "# " + topic + "\n\nFallback content.\n"
  }

  fs.writeFileSync(`notes/${Date.now()}.md`, text)
}

run()
