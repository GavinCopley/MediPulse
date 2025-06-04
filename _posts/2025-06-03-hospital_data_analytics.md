---
layout: tailwind
title: Data Analytics Feature
description: Description of the new data analytics feature 
menu: nav/home.html
permalink: /notebooks/data_analytics/
---

<div class="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md text-gray-800 space-y-12">

<h1 class="text-3xl font-bold text-blue-700">Hospital Data Analytics Dashboard</h1>

<p class="text-lg text-gray-600 leading-relaxed">
  Build a dashboard to load, display, filter, and visualize hospital-related data from a pre-cleaned CSV via a Flask API. This feature empowers users to analyze healthcare data through dynamic filtering and visual analysis.
</p>

<hr class="border-t border-gray-300" />

<h2 class="text-2xl font-semibold text-gray-700">📊 Dashboard Overview</h2>

<div class="my-6">
  <img src="{{site.baseurl}}/images/hospital_analytics_dashboard.png" alt="Hospital Analytics Dashboard" class="rounded-lg shadow-md border border-gray-200">
</div>

<hr class="border-t border-gray-300" />

<div class="space-y-10">

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">1. Load Dataset</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>Data is fetched on page load from a backend endpoint: <code>GET /api/analytics</code></li>
      <li>Uses <code>fetch()</code> with async/await and handles status states (loading, error, empty).</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">2. Data Display</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>Table rendering with headers auto-generated from dataset keys.</li>
      <li>Dynamic row creation using JavaScript.</li>
      <li>Responsive design using TailwindCSS classes.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">3. Filtering Logic</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Filter by:
        <ul class="ml-5 list-disc space-y-1">
          <li><strong>Hospital</strong></li>
          <li><strong>Procedure</strong></li>
          <li><strong>Rating</strong></li>
        </ul>
      </li>
      <li>Dynamic population of filter options based on dataset.</li>
      <li>Apply/reset filters to update the table content.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">4. User Experience Enhancements</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>Status message panel (<code>loading</code>, <code>error</code>, <code>no data found</code>).</li>
      <li>Smooth transitions and hover effects.</li>
      <li>Graceful fallback when no matching data is found.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">5. API Endpoint Processing</h3>
    <span class="text-sm italic text-indigo-600 block mb-2">(Backend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Reads from: <code>data/hospitaldatamodified.csv</code></li>
      <li>Returns JSON response:
        <ul class="ml-5 list-disc space-y-1">
          <li><code>success</code>: true/false status</li>
          <li><code>count</code>: number of records</li>
          <li><code>data</code>: array of hospital records</li>
        </ul>
      </li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">6. Data Processing</h3>
    <span class="text-sm italic text-indigo-600 block mb-2">(Backend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>Uses Pandas for CSV file reading and data cleaning.</li>
      <li>Converts DataFrame to JSON format for API response.</li>
      <li>Handles missing values and data type validation.</li>
    </ul>
  </div>

</div>

<hr class="border-t border-gray-300" />

<h2 class="text-2xl font-semibold text-gray-700">📡 API Endpoint</h2>

<p class="text-gray-600 mb-4">
  The <code>/api/analytics</code> endpoint (GET) returns JSON data:
</p>

````json
{
  "success": true,
  "count": 1000,
  "data": [
    {
      "HOSPITAL": "Medical Center",
      "PROCEDURE": "Heart Surgery",
      "RATING": 4.5,
      "CASES": 150,
      "ADVERSE_EVENTS": 2
    }
  ]
}
`````

</div>
