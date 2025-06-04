---
layout: tailwind
title: Hospitals For You
description: Description of the machine learning  
menu: nav/home.html
permalink: /notebooks/hospitalsforyou/
---

<div class="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md text-gray-800 space-y-12">

<h1 class="text-3xl font-bold text-blue-700">Hospital Recommendation System</h1>

<p class="text-lg text-gray-600 leading-relaxed">
  Builds an algorithm using machine learning to recommend the best hospital based on user selections—medical issue, priority (e.g., quality, safety, or experience), and acceptable travel distance. Combines a Flask backend (serving hospital data from a CSV) with a user-facing frontend (HTML, JavaScript, and Leaflet for maps).
</p>

<hr class="border-t border-gray-300" />

<h2 class="text-2xl font-semibold text-gray-700">🎯 System Overview</h2>

<div class="my-6">
  <img src="{{site.baseurl}}/images/hospital_recommendation_flow.png" alt="Hospital Recommendation Flow" class="rounded-lg shadow-md border border-gray-200">
</div>

<hr class="border-t border-gray-300" />

<div class="space-y-10">

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">1. User Location & Medical Issue</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>The user can choose a location (has anonymous options like San Diego Zoo or Petco Park in case the user isn't comfortable sharing).</li>
      <li>Select a specific medical issue from a dropdown.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">2. Priority Selection</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>The frontend offers a choice among three key priorities:
        <ul class="ml-5 list-disc space-y-1">
          <li><strong>Quality</strong></li>
          <li><strong>Experience</strong></li>
          <li><strong>Safety</strong></li>
        </ul>
      </li>
      <li>A distance slider lets the user specify a maximum travel range.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">3. Request Processing</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li>On form submission, the frontend sends a POST request to the Flask endpoint with the user's location, distance, medical issue, and priority.</li>
      <li>Shows loading/error messages during processing.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">4. Data Loading & Distance Calculation</h3>
    <span class="text-sm italic text-indigo-600 block mb-2">(Backend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Reads from a pre-cleaned CSV (`hospitaldatamodified.csv`) containing:
        <ul class="ml-5 list-disc space-y-1">
          <li>`hospital`, `performance measure` (medical issue)</li>
          <li>`latitude`, `longitude`</li>
          <li>`# of cases`, `# of adverse events`, `risk-adjusted rate`</li>
          <li>(Optional) `quality` or similar metrics</li>
        </ul>
      </li>
      <li>Uses Haversine formula to compute distance from user's chosen lat/lon.</li>
      <li>Filters out hospitals beyond the user's max travel distance.</li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">5. ML Algorithm & Prioritization Logic</h3>
    <span class="text-sm italic text-indigo-600 block mb-2">(Backend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li><strong>Enhanced Priority Weighting (RandomForest approach)</strong>
        <ul class="ml-5 list-disc space-y-1">
          <li>Encodes disease/priority, scales numeric features, and trains a random forest.</li>
          <li>Increases the multiplier for the priority feature so that "What's most important" strongly affects which hospital is chosen.</li>
        </ul>
      </li>
      <li><strong>Custom Scoring (Direct Formula)</strong>
        <ul class="ml-5 list-disc space-y-1">
          <li>For safety: fewer adverse events is better</li>
          <li>For experience: higher # of cases</li>
          <li>For quality: "better than expected" > "as expected" > "worse"</li>
          <li>Incorporates distance as a penalty so closer facilities rank higher when priorities tie</li>
        </ul>
      </li>
    </ul>
  </div>

  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">6. Results Display</h3>
    <span class="text-sm italic text-blue-600 block mb-2">(Frontend)</span>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li>Receives a recommended hospital—or a list of top hospitals—and displays them:
        <ul class="ml-5 list-disc space-y-1">
          <li>Basic hospital info (name, distance)</li>
          <li>A Leaflet map with markers for each recommended facility and the user's location</li>
        </ul>
      </li>
      <li>Utilizes TailwindCSS for a responsive layout and user-friendly design.</li>
      <li>Shows clear results section once the recommendation is computed.</li>
    </ul>
  </div>

</div>

<hr class="border-t border-gray-300" />

<h2 class="text-2xl font-semibold text-gray-700">🔧 Backend Dependencies</h2>

<p class="text-gray-600 mb-4">
  Here are the core Python libraries used in the backend to process the hospital CSV data and serve recommendations:
</p>

<div class="space-y-6">
  <div>
    <h3 class="text-xl font-bold text-gray-700 mb-1">Core Libraries:</h3>
    <ul class="list-disc list-inside text-gray-600 space-y-2">
      <li><strong>Pandas</strong> - For reading CSV files, cleaning and transforming the data, and handling imputation of missing values.</li>
      <li><strong>Scikit-learn</strong> - Provides the RandomForestClassifier (if using the machine-learning approach) and tools like `StandardScaler` for feature scaling.</li>
      <li><strong>Joblib</strong> - Used to serialize (save/load) the trained model and its associated encoders or scalers.</li>
      <li><strong>Math</strong> - For the Haversine formula to calculate distances between user and hospital coordinates.</li>
      <li><strong>Flask</strong> (and optionally <strong>Flask-RESTful</strong>) - To create the API endpoint that receives user input (disease, priority, distance, lat/lon) and returns a recommended hospital.</li>
    </ul>
  </div>
</div>

<hr class="border-t border-gray-300" />

<h2 class="text-xl font-semibold text-gray-700 mt-12 mb-4">🔧 Key</h2>

<ul class="list-disc list-inside text-gray-600 space-y-1">
  <li><span class="text-blue-600 font-semibold">🟥 Frontend</span>: User interface and interaction</li>
  <li><span class="text-indigo-600 font-semibold">🟦 Backend</span>: Data processing and ML algorithms</li>
</ul>

<hr class="border-t border-gray-300" />

<h2 class="text-2xl font-semibold text-gray-700">📡 API Endpoint</h2>

<p class="text-gray-600 mb-4">
  A POST endpoint `/api/predict` that accepts JSON:
</p>

````json
{
  "disease": "Acute Stroke",
  "priority": "safety",
  "distance": 10,
  "user_lat": 32.71,
  "user_lon": -117.16
}
`````
