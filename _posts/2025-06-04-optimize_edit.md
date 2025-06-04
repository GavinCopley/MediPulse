---
layout: tailwind
title: Optimize Edit Feature
description: Feature description of optimize/edit
menu: nav/home.html
permalink: /notebooks/optimize/edit
---

<div class="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md text-gray-800 space-y-12">

<h1 class="text-3xl font-bold text-blue-700">Optimize Edit Feature</h1>

<p class="text-lg text-gray-600 leading-relaxed">
  The <strong>Optimize Edit</strong> feature allows users to select existing Palomar Health videos from their library and apply AI-powered optimization to improve title, description, tags, and overall engagement potential. This feature combines video library browsing with machine learning recommendations.
</p>

<hr class="border-t border-gray-300" />

<h2 class="text-2xl font-semibold text-gray-700">🎬 Feature Overview</h2>

<div class="my-6">
  <img src="{{site.baseurl}}/images/optimize_edit_overview.png" alt="Optimize Edit Feature" class="rounded-lg shadow-md border border-gray-200">
</div>

<hr class="border-t border-gray-300" />

<div class="space-y-10">

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">1. Video Library Display</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Displays existing Palomar Health videos in a responsive grid layout.</li>
      <li>Shows video metadata:
        <ul class="ml-5 list-disc space-y-1">
          <li>Video title and thumbnail</li>
          <li>Publication date</li>
          <li>View count statistics</li>
          <li>Current category tags</li>
        </ul>
      </li>
      <li>Implements hover effects and visual feedback for user interaction.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">2. Search & Filter Functionality</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Real-time search through video titles and descriptions.</li>
      <li>Category-based filtering:
        <ul class="ml-5 list-disc space-y-1">
          <li>Health & Medical</li>
          <li>Patient Stories</li>
          <li>Educational Content</li>
          <li>Lifestyle & Wellness</li>
        </ul>
      </li>
      <li>Pagination controls for large video collections.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">3. Video Selection Interface</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>Single-select video cards with visual selection indicators.</li>
      <li>Selected videos display checkmark overlay and border highlighting.</li>
      <li>Optimize button becomes enabled only when a video is selected.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">4. Data Processing & API Integration</h3>
    <span class="text-sm italic text-indigo-600 block mb-2">(Backend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Loads video metadata from CSV data source containing:
        <ul class="ml-5 list-disc space-y-1">
          <li>Video IDs, titles, and descriptions</li>
          <li>Publication timestamps and view metrics</li>
          <li>Category classifications and tags</li>
          <li>Duration and quality specifications</li>
        </ul>
      </li>
      <li>Processes selected video data for optimization API submission.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">5. ML-Powered Optimization Engine</h3>
    <span class="text-sm italic text-indigo-600 block mb-2">(Backend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Submits video metadata to optimization API endpoint:
        <ul class="ml-5 list-disc space-y-1">
          <li>Title and description analysis</li>
          <li>Tag relevance scoring</li>
          <li>Publication timing optimization</li>
          <li>Technical quality assessments</li>
        </ul>
      </li>
      <li>Generates engagement predictions and improvement recommendations.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">6. Results & Recommendations Display</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Displays optimization results in an interactive dashboard:
        <ul class="ml-5 list-disc space-y-1">
          <li>Predicted engagement score with visual gauge</li>
          <li>AI-generated content alternatives (3 variations)</li>
          <li>Category-specific improvement tips</li>
          <li>Similar high-performing video recommendations</li>
        </ul>
      </li>
      <li>Provides editable content fields with real-time preview.</li>
      <li>Copy-to-clipboard functionality for optimized content.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">7. Interactive Optimization Tools</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>Template switcher for comparing optimization variations.</li>
      <li>Tip application system with undo functionality.</li>
      <li>Re-evaluation capability for iterative improvements.</li>
      <li>Export options for finalized optimizations.</li>
    </ul>
  </div>

</div>

<hr class="border-t border-gray-300" />

<h2 class="text-2xl font-semibold text-gray-700">🔧 Technical Implementation</h2>

<div class="space-y-6">
  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">Frontend Technologies:</h3>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li><strong>Bulma CSS Framework</strong> - Responsive grid system and UI components</li>
      <li><strong>Vanilla JavaScript</strong> - Dynamic content rendering and interaction handling</li>
      <li><strong>Chart.js</strong> - Engagement score visualization</li>
      <li><strong>Font Awesome</strong> - Iconography and visual indicators</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">Backend Integration:</h3>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li><strong>CSV Data Source</strong> - Palomar Health video metadata repository</li>
      <li><strong>Optimization API</strong> - Machine learning service endpoint</li>
      <li><strong>JSON Processing</strong> - Data transformation and error handling</li>
    </ul>
  </div>
</div>

<hr class="border-t border-gray-300" />

<h2 class="text-xl font-semibold text-gray-700 mt-12 mb-4">🔧 Key</h2>

<ul class="list-disc list-inside text-gray-600 space-y-1">
  <li><span class="text-blue-600 font-semibold">🟥 Frontend</span>: User interface and interaction components</li>
  <li><span class="text-indigo-600 font-semibold">🟦 Backend</span>: Data processing and API services</li>
</ul>

<hr class="border-t border-gray-300" />

<h2 class="text-2xl font-semibold text-gray-700">📡 API Endpoint</h2>

<p class="text-gray-600 mb-4">
  The optimization service accepts POST requests to <code>/api/optimize</code> with video metadata:
</p>

````json
{
  "title": "Palomar Health Birth Center",
  "description": "Learn about our world-class birth center...",
  "duration_sec": 120,
  "tags": "health|medical|birth|center",
  "category_id": 22,
  "is_hd": 1,
  "has_captions": 1,
  "publish_dow": 2,
  "publish_hour": 14
}
````

