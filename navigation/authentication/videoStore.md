---
layout: base
title: Video Outline Generator
permalink: /optimize/outline
search_exclude: true
menu: nav/home.html
---

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Video Outline Generator</h2>
    <p class="mt-2 text-center text-sm text-gray-600">Enter your video idea and our AI will generate a complete outline</p>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" id="outlineForm">
      <div>
        <label for="video-idea" class="block text-sm/6 font-medium text-gray-900">Your Video Idea</label>
        <div class="mt-2">
          <textarea id="video-idea" rows="4" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Describe your video idea in detail..."></textarea>
        </div>
      </div>
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          <span id="submit-text">Generate Outline</span>
          <svg id="loading-spinner" class="animate-spin ml-2 h-4 w-4 text-white hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
      </div>
    </form>
    <div id="message" class="mt-4 p-4 rounded hidden"></div>
    <!-- Results Section -->
    <div id="results-container" class="mt-8 hidden">
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 class="text-lg font-bold text-gray-900 mb-4" id="outline-title">Video Title</h3>
        <div class="mb-4">
          <h4 class="text-sm font-medium text-gray-700">Description</h4>
          <p class="text-sm text-gray-600 mt-1" id="outline-description"></p>
        </div>
        <div class="mb-4">
          <h4 class="text-sm font-medium text-gray-700">Key Points</h4>
          <ul class="list-disc pl-5 text-sm text-gray-600 mt-1" id="outline-key-points"></ul>
        </div>
        <div class="mb-4">
          <h4 class="text-sm font-medium text-gray-700">Structure</h4>
          <ol class="list-decimal pl-5 text-sm text-gray-600 mt-1" id="outline-structure"></ol>
        </div>
        <div>
          <h4 class="text-sm font-medium text-gray-700">Call To Action</h4>
          <p class="text-sm text-gray-600 mt-1" id="outline-cta"></p>
        </div>
        <div class="mt-6 flex justify-center">
          <button id="copy-outline" class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 mr-2">
            <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
            Copy Outline
          </button>
          <button id="generate-new" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">New Outline</button>
        </div>
      </div>
    </div>
  </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('outlineForm');
    
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const videoIdea = document.getElementById('video-idea').value.trim();
      const submitText = document.getElementById('submit-text');
      const loadingSpinner = document.getElementById('loading-spinner');
      
      // Show loading
      submitText.textContent = "Generating...";
      loadingSpinner.classList.remove('hidden');
      
      try {
        const requestBody = JSON.stringify({ user_input: videoIdea });

        const response = await fetch(`${pythonURI}/api/videoStoreAI`, {
          method: "POST",
          cache: "default",
          mode: "cors",
          credentials: "include",
          body: requestBody,
          headers: {
            'Content-Type': 'application/json',
            'X-Origin': 'client'
          },
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("Response:", data);

        // TODO: Display results here

      } catch (error) {
        console.error("Error:", error);
      } finally {
        // Hide loading
        submitText.textContent = "Generate Outline";
        loadingSpinner.classList.add('hidden');
      }
    });
  });
</script>