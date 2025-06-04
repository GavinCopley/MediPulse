---
layout: tailwind
title: Data Search
description: Description of the new data analytics feature
permalink: /notebooks/figma/search
---

<div class="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md text-gray-800 space-y-12">

<h1 class="text-3xl font-bold text-blue-700">Hospital Search Interface</h1>

<p class="text-lg text-gray-600 leading-relaxed">
  Created a responsive, searchable hospital listing page with filters for location, specialty, insurance, treatments, and patient ratings—styled using TailwindCSS and structured for Jekyll integration.
</p>

<hr class="border-t border-gray-300" />

<h2 class="text-2xl font-semibold text-gray-700">🏥 Frontend Features (HTML + TailwindCSS)</h2>

<p class="text-gray-600 leading-relaxed">
  This feature is a static frontend component integrated into a Jekyll layout. It's designed for an intuitive user experience, offering form-based filtering and styled result cards for nearby hospitals.
</p>

<div class="my-6">
  <img src="https://i.postimg.cc/8cw4mbCK/Screenshot-2025-04-10-at-9-12-22-AM.png" alt="Hospital Search Interface" class="rounded-lg shadow-md border border-gray-200">
</div>

<hr class="border-t border-gray-300" />

<div class="space-y-10">

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">1. Theme Section</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>Gradient background header with large, bold title and subtitle</li>
      <li>Sets the tone for a modern healthcare experience</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">2. Search Filters</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Input/select fields for:
        <ul class="ml-5 list-disc space-y-1">
          <li>Location</li>
          <li>Specialty</li>
          <li>Insurance Provider</li>
          <li>Procedure/Treatment</li>
          <li>Minimum Rating</li>
        </ul>
      </li>
      <li>Responsive grid layout</li>
      <li>Accessible form labels and interactive focus states</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">3. Hospital Cards</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Each result card includes:
        <ul class="ml-5 list-disc space-y-1">
          <li>Featured image</li>
          <li>Name, location, and distance</li>
          <li>Average star rating (visual + numeric)</li>
          <li>Highlighted specialties (tag badges)</li>
          <li>Status ("Accepting new patients")</li>
          <li>"View Details" link</li>
        </ul>
      </li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">4. Metrics Dashboard</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>Displays hospital performance stats: Patient Satisfaction, Wait Time, Success Rate, Average Rating</li>
      <li>Uses Tailwind utility classes for consistent styling and layout</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">5. User Support</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Help section with two actionable buttons:
        <ul class="ml-5 list-disc space-y-1">
          <li>"Call an Advisor"</li>
          <li>"Chat Now"</li>
        </ul>
      </li>
      <li>Paired with a visually engaging support image</li>
    </ul>
  </div>

</div>

<hr class="border-t border-gray-300" />

<hr class="border-t border-gray-300 my-8" />

<h2 class="text-2xl font-semibold text-gray-700">🚀 Purpose & Future Integration</h2>

<p class="text-gray-600 text-base leading-relaxed">
  The current version is fully static and UI-focused, ideal for a prototype or front-end showcase. It is designed to be extended with JavaScript or API integration in future versions for real-time data filtering and search queries.
</p>

</div>
