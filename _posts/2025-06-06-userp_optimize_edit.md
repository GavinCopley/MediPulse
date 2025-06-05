---
layout: tailwind
title: User Pathway - optimize/edit
description: Pathway of a user through optimize/edit
menu: nav/home.html
permalink: /notebooks/user_pathway/edit
---

<div class="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md text-gray-800 space-y-12">

<h1 class="text-3xl font-bold text-blue-700">User Pathway: Optimize Edit Flow</h1>

<p class="text-lg text-gray-600 leading-relaxed">
  This document outlines the user journey for the <strong>Optimize Edit</strong> feature of the MediPulse platform. It highlights the frontend and backend components at each stage of interaction.
</p>

<hr class="border-t border-gray-300" />

<h2 class="text-2xl font-semibold text-gray-700">🧭 Pathway Overview</h2>

<div class="my-6">
  <img src="{{site.baseurl}}/images/user_pathway_edit.png" alt="Optimize Edit Flow" class="rounded-lg shadow-md border border-gray-200">
</div>

<hr class="border-t border-gray-300" />

<div class="space-y-10">

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">1. Visits MediPulse</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>The user accesses the MediPulse platform for the first time.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">2. Sign Up</h3>
    <span class="text-sm italic text-indigo-600 block mb-2">(Backend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>User navigates to the sign-up page.</li>
      <li>Authentication is performed.</li>
      <li>User credentials are stored in the database.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">3. Go from Dashboard to Optimize Edit</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>After successful login, the user navigates to the "Optimize Edit" section via the dashboard.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">4. Click One of the Existing Palomar Health Videos</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>User browses through existing Palomar Health videos displayed in a grid layout.</li>
      <li>Each video shows:
        <ul class="ml-5 list-disc space-y-1">
          <li>Title and thumbnail</li>
          <li>Publication date</li>
          <li>View count statistics</li>
          <li>Category tags</li>
        </ul>
      </li>
      <li>User clicks on a video to select it for optimization.</li>
      <li>Selected video displays checkmark overlay and border highlighting.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">5. Machine Learning Algorithm & Gemini</h3>
    <span class="text-sm italic text-indigo-600 block mb-2">(Backend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>Selected video's title, description, and metadata are processed by the backend service.</li>
      <li>ML algorithm and Gemini analyze the existing content to identify improvement areas.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">6. Gives Improvement Tips</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>User receives generated improvement tips for the selected video.</li>
      <li>User can:
        <ul class="ml-5 list-disc space-y-1">
          <li>Select which tips to integrate.</li>
          <li>View a real-time preview of the optimized content.</li>
        </ul>
      </li>
      <li>Shows preview to user with optimized content alternatives.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">7. Gives a Rating</h3>
    <span class="text-sm italic text-indigo-600 block mb-2">(Backend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>System provides a rating from 0 to 100 based on relation to popular videos in CSV.</li>
      <li>Rating reflects predicted engagement potential of the optimized content.</li>
    </ul>
  </div>

</div>

<hr class="border-t border-gray-300" />

<h2 class="text-xl font-semibold text-gray-700 mt-12 mb-4">🔧 Key</h2>

<ul class="list-disc list-inside text-gray-600 space-y-1">
  <li><span class="text-blue-600 font-semibold">🟥 Frontend</span>: White boxes</li>
  <li><span class="text-indigo-600 font-semibold">🟦 Backend</span>: Navy blue boxes</li>
</ul>

<hr class="border-t border-gray-300 my-8" />

<p class="text-gray-600 text-base leading-relaxed">
  This pathway guides users through selecting and optimizing existing video content, providing a streamlined experience from video library browsing to receiving actionable optimization recommendations with performance ratings.
</p>

</div>