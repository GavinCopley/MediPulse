---
layout: tailwind
title: Best Hospital for You
permalink: /hospitalforyou
search_exclude: true
menu: nav/home.html
---

<!-- Leaflet CSS -->
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet/dist/leaflet.css"
/>

<!-- Google Places API (Autocomplete) -->
<!-- Replace with your own key, but here's the one you provided. -->
<script 
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCusKJxX9PZrryqKQ4oYAMfaHYJMS-my24&libraries=places">
</script>

<div class="bg-gradient-to-r from-indigo-600 to-blue-500 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-extrabold text-white text-center">
      Find the Best Hospital for Your Needs
    </h1>
    <p class="mt-3 text-xl text-indigo-100 text-center max-w-3xl mx-auto">
      Using AI and proprietary algorithms will recommend the perfect hospital based on your needs
    </p>
  </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- STEP ONE: Location selection -->
  <div class="bg-white shadow-lg rounded-lg p-6 mb-8" id="step-one">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Step 1: Choose Your Location</h2>

 <!-- 1) Google Places Autocomplete -->
  <div class="mb-4">
      <label for="address-input" class="block text-lg font-medium text-gray-700 mb-1.5">
        Type your address (autocomplete):
      </label>
      <input
        id="address-input"
        type="text"
        placeholder="e.g., 1600 Amphitheatre Parkway, Mountain View, CA"
        class="border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
      />
      <p class="text-sm text-gray-500 mt-1">
        Start typing an address and select from the suggestions (requires Google API).
      </p>
    </div>

<!-- 2) Quick pick buttons -->
  <div class="mb-4 flex flex-wrap items-center space-x-3 space-y-2">
      <button
        id="anonymous-petco"
        class="bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-md"
      >
        Remain Anonymous (Use Petco Park)
      </button>
      <button
        id="anonymous-zoo"
        class="bg-green-700 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded-md"
      >
        Use San Diego Zoo
      </button>
      <button
        id="select-on-map-btn"
        class="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-md"
      >
        Select on Map
      </button>
    </div>

  <!-- Map to place or see chosen location, default center is SD -->
  <div id="user-map" class="w-full h-64 mb-4"></div>
    <p class="text-gray-600 text-sm">
      If you choose "Select on Map," click anywhere on the map to set your location marker.
    </p>

  <div id="location-status" class="text-gray-800 mt-2 font-medium">
      No location selected yet.
    </div>
  </div>

  <!-- STEP TWO: Hidden until location is set -->
  <div class="bg-white shadow-lg rounded-lg p-6 mb-8 hidden" id="step-two">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Step 2: Select Your Preferences</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Left Column (1/2 width) -->
      <div class="md:col-span-2">
        <div class="grid grid-cols-1 gap-8">
          <!-- Medical Issue Dropdown -->
          <div>
            <label for="medical-issue" class="block text-lg font-medium text-gray-700 mb-1.5">
              What is your medical issue?
            </label>
            <select
              id="medical-issue"
              class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a medical issue</option>
              <option value="cardiology">AAA Repair Endo Unrupture</option>
              <option value="oncology">AAA Repair Open Unrupture</option>
              <option value="neurology">Acute Stroke</option>
              <option value="orthopedics">Acute Stroke Hemorrhagic</option>
              <option value="pediatrics">Acute Stroke Ischemic</option>
              <option value="emergency">Acute Stroke Subarachnoid</option>
              <option value="womens-health">Acute Myocardial Infection (AMI)</option>
              <option value="mental-health">Carotid Endarterectomy</option>
              <option value="surgery">GI Hemorrhage</option>
              <option value="respiratory">Heart Failure</option>
              <option value="respiratory">Hip Fracture</option>
              <option value="respiratory">Isolated Coronary Artery Bypass Grafting (CABG)r</option>
              <option value="respiratory">Pancreatic Resection</option>
              <option value="respiratory">Percutaneous Coronary Intervention (PCI)</option>
              <option value="respiratory">Pneumonia</option>
              <option value="respiratory">Postoperative Sepsis</option>
            </select>
          </div>

<!-- Priority Selection -->
  <div>
            <label for="priority" class="block text-lg font-medium text-gray-700 mb-1.5">
              What's most important to you?
            </label>
            <select
              id="priority"
              class="w-full border border-gray-300 rounded-md px-4 py-2 
                     focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="quality" title="How risky is the procedure?">Quality</option>
              <option value="experience" title="Facility track record with numerous prior cases.">Experience</option>
              <option value="safety" title="Complication rate.">Safety</option>
            </select>
          </div>
<!-- Number of Results Selection -->
          <div>
            <label for="num-results" class="block text-lg font-medium text-gray-700 mb-1.5">
              How many hospital results do you want? (1 to 10)
            </label>
            <input
              id="num-results"
              type="number"
              min="1"
              max="10"
              value="3"
              class="w-full border border-gray-300 rounded-md px-4 py-2 
                     focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
<!-- Right Column (1/2 width) - Distance Slider -->
      <div class="md:col-span-2 p-6 bg-gray-50 rounded-lg shadow-inner h-full flex flex-col justify-center">
        <div class="flex items-center mb-4">
          <label for="distance-range" class="block text-xl font-medium text-gray-700">
            How far are you willing to travel?
          </label>
        </div>
        <div class="mt-4">
          <input
            type="range"
            id="distance-range"
            min="1"
            max="50"
            value="10"
            class="w-full h-6 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <style>
            input[type=range] {
              height: 6px;
            }
            input[type=range]::-webkit-slider-thumb {
              appearance: none;
              width: 22px;
              height: 22px;
              border-radius: 50%;
              background: #4f46e5;
              cursor: pointer;
              border: 2px solid #fff;
              box-shadow: 0 0 2px rgba(0,0,0,0.3);
            }
            input[type=range]::-moz-range-thumb {
              width: 22px;
              height: 22px;
              border-radius: 50%;
              background: #4f46e5;
              cursor: pointer;
              border: 2px solid #fff;
              box-shadow: 0 0 2px rgba(0,0,0,0.3);
            }
            input[type=range]::-ms-thumb {
              width: 22px;
              height: 22px;
              border-radius: 50%;
              background: #4f46e5;
              cursor: pointer;
              border: 2px solid #fff;
              box-shadow: 0 0 2px rgba(0,0,0,0.3);
            }
          </style>
          <div class="flex justify-between text-sm text-gray-600 mt-3">
            <span>1 mile</span>
            <span>Up to 50 miles</span>
          </div>
          <p class="text-lg text-gray-700 mt-4 font-semibold text-center">
            Current selection: <span id="distance-value">10</span> miles
          </p>
        </div>
      </div>
    </div>

<div class="mt-8 flex justify-center">
      <button
        type="submit"
        id="find-hospitals-btn"
        class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-8 rounded-md shadow-md 
               transition duration-150 ease-in-out text-xl"
      >
        Find My Best Hospital Match
      </button>
    </div>
  </div>

  <!-- RESULTS -->
  <div id="results" class="hidden">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Your Recommended Hospitals</h2>
    <div class="grid grid-cols-1 gap-6" id="hospital-list"></div>
  </div>

  <!-- MAP OF HOSPITAL MARKERS (AFTER RANKING) -->
  <div id="map" class="hidden w-full h-96 mb-6"></div>
</div>

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

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

  // API URL (adjust if needed)
  const frontEndAPIURL = 'http://127.0.0.1:8115/api/predict';

  // Elements
  const locationStatusEl = document.getElementById('location-status');
  const stepTwoEl = document.getElementById('step-two');

  /*************************************************************
   * INIT: Step One's Map
   *************************************************************/
  function initUserMap() {
    userMap = L.map('user-map').setView([32.7157, -117.1611], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(userMap);

    // By default, no marker until user picks location 
    // through any method (autocomplete, quick pick, or map click).
  }

  /*************************************************************
   * Setting the user's location (common function)
   *************************************************************/
  function setUserLocation(lat, lng, label = '') {
    chosenLocation = { lat, lng };

    if (userMarker) {
      userMap.removeLayer(userMarker);
      userMarker = null;
    }

    // Place a marker on userMap
    userMarker = L.marker([lat, lng]).addTo(userMap);
    userMap.setView([lat, lng], 14);

    if (label) {
      userMarker.bindPopup(label).openPopup();
    }

    locationStatusEl.textContent = `Location set: (${lat.toFixed(4)}, ${lng.toFixed(4)}) ${label}`;

    // Reveal step two
    stepTwoEl.classList.remove('hidden');
  }

  /*************************************************************
   * 1) Google Places Autocomplete
   *************************************************************/
  function initAddressAutocomplete() {
    const input = document.getElementById('address-input');
    addressAutocomplete = new google.maps.places.Autocomplete(input);
    addressAutocomplete.setFields(['formatted_address', 'geometry']);

    addressAutocomplete.addListener('place_changed', function() {
      const place = addressAutocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        locationStatusEl.textContent = "No valid geometry for that address.";
        return;
      }

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setUserLocation(lat, lng, place.formatted_address);
    });
  }

  /*************************************************************
   * 2) Quick Pick Buttons
   *************************************************************/
  document.getElementById('anonymous-petco').addEventListener('click', () => {
    // Approx coords for Petco Park
    setUserLocation(32.7073, -117.1566, 'Petco Park');
  });

  document.getElementById('anonymous-zoo').addEventListener('click', () => {
    // Approx coords for San Diego Zoo
    setUserLocation(32.7353, -117.1490, 'San Diego Zoo');
  });

  // Let user click anywhere on the map to choose location
  document.getElementById('select-on-map-btn').addEventListener('click', () => {
    alert("Click on the map to set your location.");

    userMap.off('click'); // remove old
    userMap.on('click', function(e) {
      const { lat, lng } = e.latlng;
      setUserLocation(lat, lng, 'Custom map click');
      // optional: turn off click once location set
      userMap.off('click');
    });
  });

  /*************************************************************
   * 3) Distance Slider
   *************************************************************/
  const distanceRange = document.getElementById('distance-range');
  const distanceValueEl = document.getElementById('distance-value');

  distanceRange.addEventListener('input', function() {
    distanceValueEl.textContent = this.value;
  });

  /*************************************************************
   * 4) "Find My Best Hospital Match" Button
   *************************************************************/
  document.getElementById('find-hospitals-btn').addEventListener('click', function(e) {
    e.preventDefault();

    if (!chosenLocation) {
      alert("Please choose a location first.");
      return;
    }

    const diseaseEl = document.getElementById('medical-issue');
    const priorityEl = document.getElementById('priority');
    const numResultsEl = document.getElementById('num-results');

    const distance = distanceRange.value;
    const diseaseText = diseaseEl.options[diseaseEl.selectedIndex].text;
    const priority = priorityEl.value;
    const limit = parseInt(numResultsEl.value, 10);

    if (!diseaseText || !priority || !limit) {
      alert("Please fill out disease, priority, and number of results fields.");
      return;
    }

    // Show loading in results
    const resultsSection = document.getElementById('results');
    const resultsContainer = document.getElementById('hospital-list');
    resultsSection.classList.remove('hidden');
    resultsContainer.innerHTML = '<p class="text-gray-600">Loading...</p>';

    // Hide old hospital map if any
    const mapContainer = document.getElementById('map');
    mapContainer.classList.add('hidden');
    if (hospitalsMap) {
      hospitalsMap.remove();
      hospitalsMap = null;
    }

    // Prepare request body
    const payload = {
      user_lat: chosenLocation.lat,
      user_lon: chosenLocation.lng,
      distance: distance,
      disease: diseaseText,
      priority: priority,
      limit: limit
    };

    // Fetch to your back-end
    fetch(frontEndAPIURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(resp => resp.json())
    .then(data => {
      resultsContainer.innerHTML = '';

      if (data.error) {
        const errP = document.createElement('p');
        errP.textContent = `Error: ${data.error}`;
        errP.classList.add('text-red-600', 'font-semibold');
        resultsContainer.appendChild(errP);
        return;
      }

      if (!data.recommended_hospitals || !Array.isArray(data.recommended_hospitals)) {
        resultsContainer.innerHTML = '<p>No valid hospitals data returned.</p>';
        return;
      }

      // If we have hospitals, show them + the map
      mapContainer.classList.remove('hidden');
      hospitalsMap = L.map('map').setView([chosenLocation.lat, chosenLocation.lng], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(hospitalsMap);

      // Mark user location on this second map
      L.marker([chosenLocation.lat, chosenLocation.lng])
        .addTo(hospitalsMap)
        .bindPopup("Your Chosen Location")
        .openPopup();

      const latLngs = [[chosenLocation.lat, chosenLocation.lng]];

      data.recommended_hospitals.forEach((hosp, index) => {
        const card = document.createElement('div');
        card.classList.add('p-4', 'border', 'border-gray-300', 'rounded-md', 'bg-white');

        const rank = index + 1;
        const nameEl = document.createElement('h3');
        nameEl.classList.add('text-lg', 'font-bold');
        nameEl.textContent = `#${rank} - ${hosp.hospital}`;

        const latLonEl = document.createElement('p');
        latLonEl.textContent = `Lat: ${hosp.latitude}, Lon: ${hosp.longitude}`;

        // Score
        let scoreText = '';
        if (hosp.score !== undefined) {
          scoreText = ` (Score: ${(hosp.score * 100).toFixed(1)}%)`;
        }

        const detailsEl = document.createElement('p');
        detailsEl.classList.add('text-sm', 'text-gray-600');
        detailsEl.textContent = `Distance: ${hosp.distance} miles${scoreText}`;

        card.appendChild(nameEl);
        card.appendChild(latLonEl);
        card.appendChild(detailsEl);
        resultsContainer.appendChild(card);

        // Add marker
        if (hosp.latitude !== undefined && hosp.longitude !== undefined) {
          const marker = L.marker([hosp.latitude, hosp.longitude]).addTo(hospitalsMap);
          marker.bindPopup(`
            <strong>${hosp.hospital}</strong><br/>
            Distance: ${hosp.distance} miles<br/>
            ${scoreText ? 'Score: ' + scoreText : ''}
          `);
          latLngs.push([hosp.latitude, hosp.longitude]);
        }
      });

      // Fit bounds to all markers
      if (latLngs.length > 1) {
        const bounds = L.latLngBounds(latLngs);
        hospitalsMap.fitBounds(bounds, { padding: [50, 50] });
      }
    })
    .catch(err => {
      console.error(err);
      resultsContainer.innerHTML = `<p class="text-red-600 font-semibold">Error: ${err}</p>`;
    });
  });

  /*************************************************************
   * DOM Ready
   *************************************************************/
  window.addEventListener('DOMContentLoaded', () => {
    // 1) Initialize user location map
    initUserMap();

    // 2) Initialize Google Places
    initAddressAutocomplete();
  });
</script>
