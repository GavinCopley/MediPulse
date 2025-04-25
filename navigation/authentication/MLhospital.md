---
layout: tailwind
title: Best Hospital for You
permalink: /hospitalforyou
search_exclude: true
menu: nav/home.html
---

<!-- ──────────────────────────────────────────────────────────────── -->
<!--  CSS / JS CDN IMPORTS                                           -->
<!-- ──────────────────────────────────────────────────────────────── -->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_PLACES_KEY&libraries=places"></script>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<!-- ──────────────────────────────────────────────────────────────── -->
<!--  HERO                                                            -->
<!-- ──────────────────────────────────────────────────────────────── -->
<div class="bg-gradient-to-r from-indigo-600 to-blue-500 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl font-extrabold text-white">
      Find the Best Hospital for Your Needs
    </h1>
    <p class="mt-3 text-xl text-indigo-100 max-w-3xl mx-auto">
      Using AI-powered scoring we’ll recommend the perfect hospital based on what matters most to you.
    </p>
  </div>
</div>

<!-- ──────────────────────────────────────────────────────────────── -->
<!--  MAIN CARD (Step 1 → Step 2 → Results)                           -->
<!-- ──────────────────────────────────────────────────────────────── -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

  <!-- STEP 1 – Location -->
  <div id="step-one" class="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Step 1: Choose Your Location</h2>

    <!-- address autocomplete -->
    <div class="mb-4">
      <label for="address-input" class="block text-lg font-medium text-gray-700 mb-1.5">
        Type your address (autocomplete):
      </label>
      <input id="address-input" type="text"
             placeholder="e.g., 1600 Amphitheatre Pkwy, Mountain View, CA"
             class="border border-gray-300 rounded-md px-4 py-2 w-full
                    focus:ring-indigo-500 focus:border-indigo-500"/>
      <p class="text-sm text-gray-500 mt-1">
        Start typing an address and select from the suggestions.
      </p>
    </div>

<!-- 2) Quick pick buttons -->
  <div class="mb-4 flex flex-wrap gap-3">
      <button
        id="anonymous-petco"
        class="bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-md"
      >
        Remain Anonymous (Use Petco Park)
      </button>
      <button id="anonymous-zoo"
              class="bg-green-700 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded-md">
        Use San Diego Zoo
      </button>
      <button id="select-on-map-btn"
              class="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-md">
        Select on Map
      </button>
    </div>

    <!-- user-map -->
    <div id="user-map" class="w-full h-64 mb-4"></div>
    <p class="text-gray-600 text-sm">Click the map to set a custom location.</p>
    <div id="location-status" class="text-gray-800 mt-2 font-medium">
      No location selected yet.
    </div>
  </div>

  <!-- STEP 2 – Preferences -->
  <div id="step-two" class="hidden bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Step 2: Select Your Preferences</h2>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- left column -->
      <div class="md:col-span-2 grid gap-8">

        <!-- Medical issue -->
        <div>
          <label for="medical-issue" class="block text-lg font-medium text-gray-700 mb-1.5">
            What is your medical issue?
          </label>
          <select id="medical-issue"
                  class="w-full border border-gray-300 rounded-md px-4 py-2
                         focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Select a medical issue</option>
            <option>AAA Repair Endo Unrupture</option>
            <option>AAA Repair Open Unrupture</option>
            <option>Acute Stroke</option>
            <option>Acute Stroke Hemorrhagic</option>
            <option>Acute Stroke Ischemic</option>
            <option>Acute Stroke Subarachnoid</option>
            <option>AMI</option>
            <option>Carotid Endarterectomy</option>
            <option>GI Hemorrhage</option>
            <option>Heart Failure</option>
            <option>Hip Fracture</option>
            <option>Isolated CABG Operative Mor</option>
            <option>Pancreatic Resection</option>
            <option>PCI</option>
            <option>Pneumonia</option>
            <option>Postoperative Sepsis</option>
          </select>
        </div>

        <!-- Priority -->
        <div>
          <label for="priority" class="block text-lg font-medium text-gray-700 mb-1.5">
            What’s most important to you?
          </label>
          <select id="priority"
                  class="w-full border border-gray-300 rounded-md px-4 py-2
                         focus:ring-indigo-500 focus:border-indigo-500">
            <option value="quality">Quality</option>
            <option value="experience">Experience</option>
            <option value="safety">Safety</option>
          </select>
        </div>

        <!-- Number of results -->
        <div>
          <label for="num-results" class="block text-lg font-medium text-gray-700 mb-1.5">
            How many hospital results do you want? (1 – 10)
          </label>
          <input id="num-results" type="number" min="1" max="10" value="3"
                 class="w-full border border-gray-300 rounded-md px-4 py-2
                        focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
      </div>

      <!-- right column – distance slider -->
      <div class="md:col-span-2 p-6 bg-gray-50 rounded-lg shadow-inner
                  flex flex-col justify-center">
        <label for="distance-range" class="block text-xl font-medium text-gray-700">
          How far are you willing to travel?
        </label>
        <input type="range" id="distance-range" min="1" max="50" value="10"
               class="w-full h-6 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4"/>
        <style>
          input[type=range] { height:6px; }
          input[type=range]::-webkit-slider-thumb,
          input[type=range]::-moz-range-thumb,
          input[type=range]::-ms-thumb {
            width:22px;height:22px;border-radius:50%;
            background:#4f46e5;cursor:pointer;border:2px solid #fff;
            box-shadow:0 0 2px rgba(0,0,0,.3);
          }
        </style>
        <div class="flex justify-between text-sm text-gray-600 mt-3">
          <span>1 mile</span><span>Up to 50 miles</span>
        </div>
        <p class="text-lg text-gray-700 mt-4 font-semibold text-center">
          Current selection: <span id="distance-value">10</span> miles
        </p>
      </div>
    </div>

<div class="mt-8 flex justify-center">
      <button
        type="submit"
        id="find-hospitals-btn"
        class="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-8 rounded-md shadow-md 
               transition duration-150 ease-in-out text-xl"
      >
        Find My Best Hospital Match
      </button>
    </div>
  </div>

  <!-- RESULTS -->
  <div id="results" class="hidden">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">
      Your Recommended Hospitals
    </h2>
    <div id="hospital-list" class="grid grid-cols-1 gap-6"></div>
  </div>

  <!-- MAP OF HOSPITAL MARKERS (AFTER RANKING) - Now hidden as we'll show individual maps -->
  <div id="map" class="hidden w-full h-96 mb-6"></div>
</div>

<!-- ──────────────────────────────────────────────────────────────── -->
<!--  JAVASCRIPT LOGIC                                               -->
<!-- ──────────────────────────────────────────────────────────────── -->
<script>
  /*************************************************************
   * GLOBALS for Step One (User's location)
   *************************************************************/
  let userMap = null;              // For the user location selection map
  let userMarker = null;           // Marker for user location
  let chosenLocation = null;       // { lat, lng } after user picks

  // For "address" approach (Google Places)
  let addressAutocomplete = null;
  let addressMarker = null;

  // For the hospital results map
  let hospitalsMap = null;
  
  // Store individual hospital maps
  let hospitalMaps = [];

  // API URL (adjust if needed)
  const frontEndAPIURL = 'http://127.0.0.1:8115/api/predict';

  // Elements
  const locationStatusEl = document.getElementById('location-status');
  const stepTwoEl = document.getElementById('step-two');

/* ─── map helpers ─────────────────────────────────────────────── */
function initUserMap() {
  userMap = L.map('user-map').setView([32.7157,-117.1611], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              {maxZoom:19}).addTo(userMap);
}
function setUserLocation(lat, lng, label='') {
  chosenLocation = {lat, lng};
  if (userMarker) userMap.removeLayer(userMarker);
  userMarker = L.marker([lat,lng]).addTo(userMap);
  userMap.setView([lat,lng], 14);
  if (label) userMarker.bindPopup(label).openPopup();
  locationStatusEl.textContent =
    `Location set: (${lat.toFixed(4)}, ${lng.toFixed(4)}) ${label}`;
  stepTwoEl.classList.remove('hidden');
}
function initAddressAutocomplete() {
  const input = document.getElementById('address-input');
  const ac = new google.maps.places.Autocomplete(
    input, {fields:['formatted_address','geometry']});
  ac.addListener('place_changed', () => {
    const p = ac.getPlace();
    if (!p.geometry) return;
    setUserLocation(p.geometry.location.lat(),
                    p.geometry.location.lng(),
                    p.formatted_address);
  });
}

/* ─── quick-pick buttons ───────────────────────────────────────── */
document.getElementById('anonymous-petco')
  .addEventListener('click', () =>
    setUserLocation(32.7073,-117.1566,'Petco Park'));
document.getElementById('anonymous-zoo')
  .addEventListener('click', () =>
    setUserLocation(32.7353,-117.1490,'San Diego Zoo'));
document.getElementById('select-on-map-btn')
  .addEventListener('click', () => {
    alert('Click on the map to set your location.');
    userMap.once('click', e =>
      setUserLocation(e.latlng.lat, e.latlng.lng, 'Custom location'));
  });

/* ─── distance-slider text ─────────────────────────────────────── */
const distanceRange     = document.getElementById('distance-range');
const distanceValueEl   = document.getElementById('distance-value');
distanceRange.addEventListener('input',
  () => distanceValueEl.textContent = distanceRange.value);

/* ─── find-hospitals button ────────────────────────────────────── */
document.getElementById('find-hospitals-btn')
  .addEventListener('click', async e => {
    e.preventDefault();
    if (!chosenLocation) { alert('Please choose a location first.'); return; }

    const disease   = document.getElementById('medical-issue').value.trim();
    const priority  = document.getElementById('priority').value;
    const limit     = parseInt(document.getElementById('num-results').value||'3',10);
    const radius    = parseInt(distanceRange.value,10);
    if (!disease) { alert('Select a medical issue.'); return; }

    /* ui – loading */
    const resultsSection   = document.getElementById('results');
    const resultsContainer = document.getElementById('hospital-list');
    resultsSection.classList.remove('hidden');
    resultsContainer.innerHTML = '<p class="text-gray-600">Loading…</p>';

    // Hide old hospital map if any
    const mapContainer = document.getElementById('map');
    mapContainer.classList.add('hidden');
    if (hospitalsMap) {
      hospitalsMap.remove();
      hospitalsMap = null;
    }
    
    // Clean up any previous hospital maps
    hospitalMaps.forEach(map => {
      if (map) {
        map.remove();
      }
    });
    hospitalMaps = [];

    /* build payload */
    const payload = {
      disease, priority, limit,
      lat: chosenLocation.lat, lon: chosenLocation.lng, radius
    };

    try {
      const resp  = await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      resultsContainer.innerHTML = '';

      if (data.error) {
        resultsContainer.innerHTML = `<p class="text-red-600 font-semibold">
          Error: ${data.error}</p>`;
        return;
      }
      if (!Array.isArray(data.recommended_hospitals) ||
          !data.recommended_hospitals.length) {
        resultsContainer.innerHTML = '<p>No hospitals returned.</p>';
        return;
      }

      data.recommended_hospitals.forEach((hosp, index) => {
        const card = document.createElement('div');
        card.className = 'p-4 border border-gray-300 rounded-md bg-white';
        card.innerHTML = `
          <h3 class="text-lg font-bold">#${i+1} – ${h.hospital}</h3>
          <p class="text-sm text-gray-600">
            Lat: ${h.latitude}, Lon: ${h.longitude}
          </p>
          <p class="text-sm text-gray-600">
            Distance: ${h.distance_mi} mi | Score: ${h.predicted_score.toFixed(2)}
          </p>`;
        resultsContainer.appendChild(card);

        /* pin */
        if (h.latitude !== undefined && h.longitude !== undefined) {
          L.marker([h.latitude, h.longitude]).addTo(hospitalsMap)
            .bindPopup(`<strong>${h.hospital}</strong><br/>
                        Distance: ${h.distance_mi} mi<br/>
                        Score: ${h.predicted_score.toFixed(2)}`);
          bounds.push([h.latitude, h.longitude]);
        }
      });
      hospitalsMap.fitBounds(bounds, {padding:[50,50]});

    } catch (err) {
      console.error(err);
      resultsContainer.innerHTML = `<p class="text-red-600 font-semibold">
        Error: ${err.message}</p>`;
    }
});

/* ─── init on DOM ready ─────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  initUserMap();
  initAddressAutocomplete();
});
</script>
