import { fetchOptions, pythonURI } from "./config.js";

// GET (if needed to fetch full chat history from backend, not localStorage)
export async function getAllChat() {
  const endpoint = `${pythonURI}/api/chatbot`;

  try {
    const response = await fetch(endpoint, {
      ...fetchOptions,
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch chat history: ${response.status}`);
    }
    const chat = await response.json();
    return chat;
  } catch (error) {
    console.error("Error fetching chat:", error.message);
    return null;
  }
}

// POST a new user message to get chatbot reply
export async function postChat(userInput) {
  try {
    const response = await fetch(`${pythonURI}/api/chatbot`, {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Origin': 'client'
      },
      body: JSON.stringify({ user_input: userInput })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to get chatbot reply: ${response.status} - ${errorText}`);
      throw new Error(`Failed to get chatbot reply: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, ...result };
  } catch (error) {
    console.error('Error posting to chatbot:', error);
    return { success: false };
  }
}


