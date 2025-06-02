---
layout: base
title: Medipulse Chatbot
permalink: /hospital-chat
search_exclude: true
menu: nav/home.html
---

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-6">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-indigo-600">MediPulse Chatbot</h1>
      <p class="mt-2 text-sm text-gray-600">Ask questions about hospitals, diseases, or treatments.</p>
    </div>

    <!-- Chat container -->
    <div id="chat-container" class="h-80 overflow-y-auto bg-white border border-gray-300 rounded-lg p-4 space-y-2 shadow-inner"></div>

    <!-- Input form -->
    <form id="chat-form" class="flex space-x-2">
      <input 
        id="user-input" 
        type="text" 
        placeholder="Type your message..." 
        required 
        class="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
      />
      <button 
        type="submit" 
        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-semibold shadow"
      >
        Send
      </button>
    </form>

    <!-- Clear button -->
    <button 
      id="clear-history" 
      class="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 text-sm font-medium"
    >
      Clear History
    </button>
  </div>
</div>

<script type="module">
  import { postChat } from '{{site.baseurl}}/assets/js/api/chatbot.js';

  const chatContainer = document.getElementById("chat-container");
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const clearBtn = document.getElementById("clear-history");

  const appendMessage = (text, isBot) => {
    const div = document.createElement("div");
    div.className = `max-w-[80%] px-4 py-2 rounded-md text-sm shadow ${
      isBot
        ? "bg-gray-100 text-left self-start text-gray-800"
        : "bg-indigo-100 text-right self-end text-indigo-800 ml-auto"
    }`;
    div.textContent = text;
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  const saveHistory = (userMsg, botMsg) => {
    const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    history.push({ text: userMsg, isBot: false });
    history.push({ text: botMsg, isBot: true });
    localStorage.setItem("chatHistory", JSON.stringify(history));
  };

  const loadHistory = () => {
    const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    history.forEach(msg => appendMessage(msg.text, msg.isBot));
  };

  chatForm.addEventListener("submit", async e => {
    e.preventDefault();
    const msg = userInput.value.trim();
    if (!msg) return;
    appendMessage(msg, false);
    userInput.value = "";

    const result = await postChat(msg);
    if (result.success) {
      const reply = result.model_response || "No response.";
      appendMessage(reply, true);
      saveHistory(msg, reply);
    } else {
      appendMessage("Generating...", true);
    }
  });

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("chatHistory");
    chatContainer.innerHTML = "";
  });

  document.addEventListener("DOMContentLoaded", loadHistory);
</script>
