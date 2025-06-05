---
layout: tailwind
title: Hospital Chatbot Feature
description: Feature description of chatbot
menu: nav/home.html
permalink: /notebooks/chatbot
---

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-indigo-600 mb-6">Hospital Chatbot Notebook</h1>
    <p class="text-lg text-gray-700 mb-4">
        The Hospital Chatbot is designed to assist users by providing answers to medical-related questions. Powered by the Google Gemini API, this chatbot acts as a virtual medical professional, offering insights on hospitals, diseases, treatments, and more.
    </p>

    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">Features</h2>
    <ul class="list-disc list-inside text-gray-700">
        <li>Interactive chatbot interface for user queries.</li>
        <li>Powered by Google Gemini API for accurate responses.</li>
        <li>Local storage for chat history to enhance user experience.</li>
        <li>Clear and responsive design styled with Tailwind CSS.</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">Implementation</h2>
    <p class="text-gray-700 mb-4">
        Below is the implementation of the Hospital Chatbot using JavaScript and Tailwind CSS. The chatbot communicates with the Google Gemini API to fetch responses based on user input.
    </p>

    <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-4">Frontend Code</h3>
    <pre class="bg-gray-100 p-4 rounded-lg shadow-inner text-sm">
        <code class="text-gray-800">
            &lt;div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"&gt;
                &lt;div class="w-full max-w-md space-y-6"&gt;
                    &lt;div class="text-center"&gt;
                        &lt;h1 class="text-3xl font-bold text-indigo-600"&gt;MediPulse Chatbot&lt;/h1&gt;
                        &lt;p class="mt-2 text-sm text-gray-600"&gt;Ask questions about hospitals, diseases, or treatments.&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div id="chat-container" class="h-80 overflow-y-auto bg-white border border-gray-300 rounded-lg p-4 space-y-2 shadow-inner"&gt;&lt;/div&gt;
                    &lt;form id="chat-form" class="flex space-x-2"&gt;
                        &lt;input id="user-input" type="text" placeholder="Type your message..." required class="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500" /&gt;
                        &lt;button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-semibold shadow"&gt;Send&lt;/button&gt;
                    &lt;/form&gt;
                    &lt;button id="clear-history" class="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 text-sm font-medium"&gt;Clear History&lt;/button&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        </code>
    </pre>

    <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-4">Backend Code</h3>
    <pre class="bg-gray-100 p-4 rounded-lg shadow-inner text-sm">
        <code class="text-gray-800">
            import { fetchOptions, pythonURI } from "./config.js";

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
        </code>
    </pre>

    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">How It Works</h2>
    <p class="text-gray-700 mb-4">
        The chatbot interface allows users to type their questions, which are sent to the Google Gemini API. The API processes the input and returns a response, which is displayed in the chat container. Chat history is saved locally to improve user experience.
    </p>

    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">Conclusion</h2>
    <p class="text-gray-700 mb-4">
        The Hospital Chatbot is a powerful tool for users seeking medical information. By leveraging the Google Gemini API, it provides accurate and reliable responses in a user-friendly interface.
    </p>
</div>
