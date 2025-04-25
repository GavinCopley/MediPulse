---
layout: tailwind
title: Hospitals
permalink: /Hospital
search_exclude: true
menu: nav/home.html 
---

<div class="max-w-7xl mx-auto px-4 py-10">
  <h1 class="text-4xl font-bold text-center text-indigo-700 mb-6">Find the Right Hospital</h1>

  <!-- Search Form -->
  <form id="search-form" class="bg-white p-6 rounded shadow-md mb-8">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <input type="text" id="location" placeholder="Location" class="border p-2 rounded w-full">
      <input type="text" id="specialty" placeholder="Specialty" class="border p-2 rounded w-full">
      <input type="text" id="insurance" placeholder="Insurance" class="border p-2 rounded w-full">
      <input type="text" id="treatment" placeholder="Treatment" class="border p-2 rounded w-full">
      <select id="rating" class="border p-2 rounded w-full">
        <option value="1">Any Rating</option>
        <option value="2">2+ Stars</option>
        <option value="3">3+ Stars</option>
        <option value="4">4+ Stars</option>
        <option value="5">5 Stars Only</option>
      </select>
      <button type="submit" class="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Search</button>
    </div>
  </form>

  <!-- Results Section -->
  <div id="results-count" class="text-gray-600 mb-4 text-sm"></div>
  <div id="hospital-results" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
  <div id="pagination" class="flex justify-center mt-8 gap-2"></div>
</div>

<script>
  const pythonURI = "http://127.0.0.1:8115";

<!-- Help Section -->
<div class="bg-white py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="lg:flex lg:items-center lg:justify-between">
      <div class="lg:w-1/2">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Need Help Finding the Right Hospital?</h2>
        <p class="text-lg text-gray-600 mb-6">Our healthcare advisors can help you find the perfect match for your medical needs.</p>
        <div class="flex flex-wrap gap-4">
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call an Advisor
          </button>
          <a href="/MediPulse/hospital-chat" class="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-md font-medium flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Chat Now
          </a>
        </div>
      </div>
      <div class="lg:w-1/3 mt-10 lg:mt-0">
        <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Healthcare advisor" class="rounded-lg shadow-lg">
      </div>
    </div>
  </div>
</div>
