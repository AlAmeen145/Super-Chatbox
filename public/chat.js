let chatHistory = [];
let currentModel = "basic";

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = text;
  document.getElementById("chat").appendChild(div);
  document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
  if(type === "bot") speak(text);
}

async function send() {
  const input = document.getElementById("input");
  const text = input.value;
  if(!text) return;

  addMessage(text, "user");
  input.value = "";

  const mode = document.getElementById("mode-select")?.value || currentModel;

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text, mode })
  });
  const data = await res.json();
  const reply = data[0]?.generated_text?.replace(/.*AI:/s,"").trim() || "No response";
  addMessage(reply, "bot");
}

function newChat() {
  document.getElementById("chat").innerHTML = "";
}