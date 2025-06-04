---
layout: tailwind
title: Summary Dashboard
description: Dashboard comparing hospital metrics and YouTube engagement via Flask API
menu: nav/home.html
permalink: /notebooks/summary_dashboard/
---

<div class="max-w-5xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md text-gray-800 space-y-12">

<h1 class="text-3xl font-bold text-blue-700"> Summary Dashboard: Hospital & YouTube Data Comparison</h1>

<p class="text-lg text-gray-600 leading-relaxed">
  This dashboard allows users to explore and compare hospital performance metrics and YouTube engagement statistics using a dynamic, tabbed interface built with Flask, TailwindCSS, and Chart.js.
</p>

<hr class="border-t border-gray-300" />

<h2 class="text-2xl font-semibold text-gray-700">Frontend Overview</h2>

<ul class="list-disc list-inside text-gray-600 space-y-2">
  <li><strong>Tabbed Interface</strong>: Easily switch between hospital data and YouTube analytics.</li>
  <li><strong>Interactive Charts</strong>: Visualized using Chart.js for responsive, real-time updates.</li>
  <li><strong>Dynamic Dropdowns</strong>: Populated via API responses to load and compare datasets.</li>
</ul>

<div class="space-y-8 mt-6">

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1"> Hospital Comparison</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend + Backend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>Data Source: <code>GET /api/comparison</code> → reads from <code>data/comparisondata.csv</code></li>
      <li>Dropdowns: Dynamically populated with hospital names and performance measures.</li>
      <li>Chart Output: Grouped bar chart with:
        <ul class="ml-5 list-disc space-y-1">
          <li>Number of Adverse Events</li>
          <li>Number of Cases</li>
          <li>Risk-Adjusted Rate</li>
        </ul>
      </li>
      <li>Handles missing or unavailable data gracefully.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1"> YouTube Comparison</h3>
    <span class="text-sm italic text-indigo-600 block mb-2">(Frontend + Backend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>File Selection: <code>GET /api/youtube/files</code> lists available CSVs in <code>/data/yt/</code></li>
      <li>Dataset Loading: <code>GET /api/youtube/data/&lt;filename&gt;</code> fetches and cleans selected file.</li>
      <li>Chart Output: Bar chart comparing:
        <ul class="ml-5 list-disc space-y-1">
          <li>Views</li>
          <li>Likes</li>
          <li>Comments</li>
          <li>Likes per View</li>
          <li>Views per Comment</li>
        </ul>
      </li>
      <li>Responsive design and tooltip interactivity included.</li>
    </ul>
  </div>

</div>

<hr class="border-t border-gray-300" />

<h2 class="text-2xl font-semibold text-gray-700"> Backend API Endpoints</h2>

<div class="space-y-6 mt-4">

  <div>
    <h3 class="text-xl font-bold text-gray-700"> <code>/api/comparison</code> (GET)</h3>
    <p class="text-gray-600 mt-2">Reads hospital metrics from <code>data/comparisondata.csv</code> and returns a normalized JSON response.</p>
    <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{
  "success": true,
  "count": 300,
  "data": [
    {
      "HOSPITAL": "Example Hospital",
      "PERFORMANCE_MEASURE": "Heart Surgery Mortality",
      "#_OF_ADVERSE_EVENTS": 7,
      "#_OF_CASES": 150,
      "RISK-ADJUSTED_RATE": 4.7
    }
  ]
}
    </pre>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700"> <code>/api/youtube/files</code> (GET)</h3>
    <p class="text-gray-600 mt-2">Returns a list of available CSV datasets in the <code>/data/yt/</code> directory.</p>
    <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{
  "success": true,
  "files": ["MayoClinic.csv", "DoctorMike.csv", "..."]
}
    </pre>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700"> <code>/api/youtube/data/&lt;filename&gt;</code> (GET)</h3>
    <p class="text-gray-600 mt-2">Reads and processes the specified CSV file, returning cleaned data for visualization.</p>
    <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{
  "success": true,
  "data": [
    {
      "CHANNELTITLE": "Mayo Clinic",
      "VIEWCOUNT": "450000",
      "LIKECOUNT": "12000",
      "COMMENTCOUNT": "800",
      "DURATIONSEC": "360"
    }
  ]
}
    </pre>
  </div>

</div>

<hr class="border-t border-gray-300 my-8" />

<h2 class="text-xl font-semibold text-gray-700"> Interactive Exploration Tips</h2>

<ul class="list-disc list-inside text-gray-600 space-y-2">
  <li>Use the dropdowns to explore new combinations of data.</li>
  <li>Switch between tabs to analyze hospital vs. video metrics.</li>
  <li>Check console logs for helpful debug messages when loading fails.</li>
</ul>

<hr class="border-t border-gray-300 my-8" />

<p class="text-gray-600 text-base leading-relaxed">
  This dashboard was created to provide insight into the intersection of healthcare performance and medical content engagement, giving users tools to explore patterns, gaps, and opportunities across both domains.
</p>

</div>
