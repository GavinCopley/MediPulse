---
layout: base
title: "Best Hospital for You"
permalink: /hospitalforyou/   
search_exclude: true
menu: nav/home.html
---


<!--────────── CDN IMPORTS ──────────-->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css"/>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>

<!--────────── GLOBAL STYLE PATCHES ──────────-->
<style>
:root{--track:#e5e7eb;--thumb:#4f46e5;--fill:#4f46e5}
.dark{--track:#374151;--thumb:#6366f1;--fill:#6366f1;background:#1f2937;color:#d1d5db}

/* slider + mini-bars (unchanged) */
input[type=range]{-webkit-appearance:none;width:100%;height:8px;border-radius:4px;background:var(--track)}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;height:22px;width:22px;border-radius:50%;background:var(--thumb);border:2px solid #fff;cursor:pointer;box-shadow:0 0 3px rgb(0 0 0/.4);margin-top:-7px;transition:.2s}
input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.15)}
.bar{height:8px;border-radius:4px;display:flex;overflow:hidden}.bar span{display:block;height:100%}
.bar span[data-tip]{position:relative}
.bar span[data-tip]::after{content:attr(data-tip);position:absolute;bottom:110%;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:10px;padding:2px 4px;border-radius:4px;background:#111;color:#fff;opacity:0;pointer-events:none;transition:.15s}
.bar span[data-tip]:hover::after{opacity:1}
.hash{background-image:linear-gradient(135deg,rgba(0,0,0,.17)25%,transparent25%,transparent50%,rgba(0,0,0,.17)50%,rgba(0,0,0,.17)75%,transparent75%,transparent);background-size:8px 8px}

/* suggestions dropdown */
#suggestions{position:absolute;top:100%;left:0;width:100%;background:#fff;border:1px solid #ccc;border-top:none;z-index:1000;max-height:14rem;overflow-y:auto}
#suggestions div{padding:.5rem .75rem;font-size:.9rem;cursor:pointer;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}
#suggestions div:hover{background:#f0f0f0}

/* new results-count buttons */
.res-btn{padding:.5rem 1rem;border:1px solid #d1d5db;border-radius:.5rem;font-weight:600}
.res-btn.active{background:#4f46e5;color:#fff;border-color:#4f46e5}
</style>

<!--────────── HERO ──────────-->
<div class="bg-gradient-to-r from-indigo-600 to-blue-500 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
    <div class="text-center flex-1">
      <h1 class="text-4xl font-extrabold text-white">Find the Best Hospital for Your Needs</h1>
      <p class="mt-3 text-xl text-indigo-100 max-w-3xl mx-auto">
        AI-driven scoring for distance • quality • experience • safety
      </p>
    </div>
    <button id="dark-toggle" class="ml-4 flex items-center justify-center h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur">
      <svg id="sun" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
      </svg>
      <svg id="moon" class="h-5 w-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
      </svg>
    </button>
  </div>
</div>


<!--────────── MAIN WRAPPER ──────────-->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">

  <!-- progress bar -->
  <div class="flex mb-6 items-center justify-center gap-6 text-sm font-semibold">
    <span id="p-step1" class="text-indigo-600">Step 1 • Location</span><span>➔</span>
    <span id="p-step2" class="text-gray-400">Step 2 • Preferences</span><span>➔</span>
    <span id="p-step3" class="text-gray-400">Step 3 • Results</span>
  </div>

  <!-- STEP 1 -------------------------------------------------->
  <div id="step-one" class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-10">
    <h2 class="text-2xl font-bold mb-4">Step 1: Choose Your Location</h2>

    <div class="relative mb-1.5">
      <label for="address-input" class="block text-lg font-medium mb-1.5">Address (autocomplete):</label>
      <input id="address-input" autocomplete="off" type="text" placeholder="Start typing…" class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md px-4 py-2 w-full">
      <div id="suggestions" class="hidden"></div>
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400">Select from suggestions or click “Use My Location”.</p>

    <div class="flex flex-wrap gap-3 mt-4 mb-3">
      <button id="geo-btn"              class="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md shadow">Use My Location</button>
      <button id="choose-landmark-btn"  class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md shadow">Choose a San Diego Landmark</button>
      <button id="select-on-map-btn"    class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow">Pick on Map</button>
    </div>

    <div id="user-map" class="w-full h-64 rounded-md mb-2 shadow-inner"></div>
    <p id="location-status" class="font-medium">No location selected yet.</p>
  </div>

  <!-- STEP 2 -------------------------------------------------->
  <div id="step-two" class="hidden bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-10">
    <h2 class="text-2xl font-bold mb-6">Step 2: Select Your Preferences</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- left column -->
      <div class="md:col-span-2 grid gap-8">
        <!-- NEW searchable dropdown -->
        <div>
          <label for="issue-input" class="block text-lg font-medium mb-2">Medical issue (type or select)</label>
          <input id="issue-input" list="issue-list" placeholder="e.g. Acute Stroke" class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md px-4 py-2 w-full">
          <datalist id="issue-list"></datalist>
        </div>

        <!-- original pill container kept (hidden) so previous JS won’t break -->
        <div class="hidden">
          <p class="text-lg font-medium mb-2">Medical issue pills (legacy)</p>
          <div id="issue-pills" class="flex flex-wrap gap-2"></div>
        </div>

        <!-- results-count buttons -->
        <div>
          <p class="font-medium mb-1">Results to show</p>
          <div class="flex gap-2">
            <button class="res-btn" data-n="1">1</button>
            <button class="res-btn" data-n="2">2</button>
            <button class="res-btn active" data-n="3">3</button>
            <button class="res-btn" data-n="4">4</button>
            <button class="res-btn" data-n="5">5</button>
          </div>
          <select id="num-results" class="hidden"><option>1</option><option>2</option><option selected>3</option><option>4</option><option>5</option></select>
        </div>
      </div>

      <!-- right column – distance slider -->
      <div class="md:col-span-2 flex flex-col">
        <label class="block text-xl font-medium mb-4">Max travel distance</label>
        <input type="range" id="distance-range" min="1" max="50" value="10" oninput="document.getElementById('distance-readout').textContent=this.value+' mi'">
        <div class="flex justify-between text-xs text-gray-500 mt-1"><span>1 mi</span><span>25</span><span>50 mi</span></div>
        <span id="distance-readout" class="font-semibold mt-2 self-center">10 mi</span>
      </div>
    </div>

    <div class="mt-10 flex justify-center gap-4">
      <button id="find-hospitals-btn" class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-10 rounded-md shadow-lg text-xl">Get Recommendations</button>
      <button id="print-btn"           class="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-4 rounded-md shadow">Save / Print PDF</button>
    </div>
  </div>

  <!-- STEP 3 (unchanged markup) -------------------------------------------------->
  <div id="results" class="hidden">
    <h2 class="text-2xl font-bold mb-6">Step 3: Your Recommended Hospitals</h2>
    <div id="hospital-list" class="grid md:grid-cols-2 gap-6 mb-6"></div>
    <div id="map" class="hidden w-full h-96 rounded-lg shadow-inner"></div>
  </div>
</div>
<!--────────── CHART MODAL / LEGEND / LANDMARK & PICK MODALS (unchanged) ──────────-->
<!-- … identical to original markup … -->

<!-- Add these modal elements right before your JavaScript section -->

<!--────────── CHART MODAL / LEGEND / LANDMARK & PICK MODALS ──────────-->
<!-- Chart Modal -->
<div id="chart-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 p-4">
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 id="chart-title" class="text-xl font-bold">Hospital Score Details</h3>
      <button id="close-chart" class="text-gray-500 hover:text-gray-700">✕</button>
    </div>
    <div class="flex gap-8">
      <div class="w-40 h-40 relative">
        <canvas id="chart-canvas"></canvas>
      </div>
      <div id="chart-stats" class="flex-1"></div>
    </div>
  </div>
</div>

<!-- Landmark Modal -->
<div id="landmark-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 p-4">
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold">Choose a San Diego Landmark</h3>
      <button id="close-landmark" class="text-gray-500 hover:text-gray-700">✕</button>
    </div>
    <div class="flex gap-6">
      <div id="landmark-buttons" class="flex-1 flex flex-col gap-2"></div>
      <div id="landmark-map" class="w-64 h-64 rounded-md"></div>
    </div>
  </div>
</div>

<!-- Pick-on-Map Modal -->
<div id="pick-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 p-4">
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold">Click to Select Location</h3>
      <button id="close-pick" class="text-gray-500 hover:text-gray-700">✕</button>
    </div>
    <div id="pick-map" class="w-full h-64 rounded-md"></div>
  </div>
</div>

<!-- Legend Info Modal -->
<div id="legend-info-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 p-4">
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold">Score Explanation</h3>
      <button id="close-legend-info" class="text-gray-500 hover:text-gray-700">✕</button>
    </div>
    <div class="space-y-4 text-sm">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 bg-teal-500 rounded-full"></span>
        <strong>Distance Score:</strong> Proximity to your location
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 bg-indigo-500 rounded-full"></span>
        <strong>Quality Score:</strong> Overall care quality metrics
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 bg-amber-500 rounded-full"></span>
        <strong>Experience Score:</strong> Patient experience ratings
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 bg-rose-500 rounded-full"></span>
        <strong>Safety Score:</strong> Infection rates and safety protocols
      </div>
    </div>
  </div>
</div>

<!--────────── JAVASCRIPT ──────────-->
<script>
/*==== DATA & CONSTANTS (unchanged) ====*/
const issuesData = {
  "Early Stage Skin Cancer": "Outpatient diagnosis and excision of localized skin lesions.",
  "Chronic Knee Pain": "Management of persistent knee discomfort due to arthritis or overuse.",
  "Mild Asthma": "Routine monitoring and inhaler management for mild asthma symptoms.",
  "Scoliosis": "Non-surgical monitoring and physical therapy for spinal curvature.",
  "Hypertension": "Long-term blood pressure control and medication adjustment.",
  "Osteoarthritis": "Joint pain management using medication, lifestyle changes, and PT.",
  "ACL Tear": "Orthopedic consultation and rehab planning for ACL injury.",
  "Sleep Apnea": "Diagnosis and management of obstructive sleep apnea, including CPAP.",
  "Chronic Migraines": "Outpatient treatment and prevention for recurring headaches.",
  "Shoulder Impingement": "Physical therapy and rehab for shoulder mobility issues.",
  "Insomnia": "Behavioral and pharmacologic strategies for sleep disturbances.",
  "Bulimia": "Outpatient care for disordered eating involving purging or binging.",
  "Low Back Pain": "Non-surgical management of lumbar discomfort and stiffness.",
  "Cataracts": "Pre-surgical evaluation and follow-up for cloudy vision due to lens opacity.",
  "Broken Bone": "Non-emergency fracture treatment and follow-up care.",
  "Concussion": "Monitoring and outpatient management of mild traumatic brain injury."
};
const landmarks = [
  { name: "Petco Park",     lat: 32.7073, lng: -117.1566 },
  { name: "San Diego Zoo",  lat: 32.7353, lng: -117.1490 },
  { name: "Balboa Park",    lat: 32.7311, lng: -117.1466 },
  { name: "SeaWorld",       lat: 32.7640, lng: -117.2265 },
  { name: "USS Midway",     lat: 32.7137, lng: -117.1750 },
  { name: "La Jolla Cove",  lat: 32.8504, lng: -117.2727 }
];

let userMap, userMarker, chosen;
let landmarkMap, landmarkTemp, pickMap, pickMarker, hospMap, routeCtl;
let selectedIssue = "";
const apiURL = "https://medipulse-832734119496.us-west2.run.app/api/predict";

/*==== UTIL ====*/
const $ = id => document.getElementById(id);

/*==== DARK-MODE TOGGLE ====*/
if ($("dark-toggle"))
  $("dark-toggle").onclick = () => {
    document.documentElement.classList.toggle("dark");
    $("sun").classList.toggle("hidden");
    $("moon").classList.toggle("hidden");
  };

/*==== PROGRESS BAR ====*/
function markStep(n) {
  ["p-step1", "p-step2", "p-step3"].forEach((id, i) =>
    $(id).className = n >= i + 1 ? "text-indigo-600" : "text-gray-400"
  );
}

/*==== MAP INIT ====*/
function initUserMap() {
  userMap = L.map("user-map", { zoomControl: false }).setView([32.7157, -117.1611], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(userMap);
}

/*==== SET LOCATION ====*/
function setLoc(lat, lng, label = "") {
  chosen = { lat, lng };
  if (userMarker) userMap.removeLayer(userMarker);
  userMarker = L.marker([lat, lng]).addTo(userMap);
  userMap.setView([lat, lng], 14);
  if (label) userMarker.bindPopup(label).openPopup();
  $("location-status").textContent = `Location set ➜ ${label}`;
  $("step-two").classList.remove("hidden");
  markStep(2);
}

/*==== AUTOCOMPLETE (CA-only) ====*/
function initAutocomplete() {
  const input = $("address-input");
  if (!input) return;
  const dd = $("suggestions");
  let debounce;
  input.addEventListener("input", () => {
    clearTimeout(debounce);
    const q = input.value.trim();
    if (q.length < 3) { dd.classList.add("hidden"); return; }
    debounce = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=15&addressdetails=1`;
        const data = await (await fetch(url)).json();
        dd.innerHTML = "";
        const ca = data.filter(d =>
          d.address?.state === "California" || /,\s*CA\b/.test(d.display_name)
        ).slice(0, 8);
        if (!ca.length) { dd.classList.add("hidden"); return; }
        ca.forEach(item => {
          const div = document.createElement("div");
          div.textContent = item.display_name.replace(", United States", "");
          div.onclick = () => {
            input.value = div.textContent;
            dd.classList.add("hidden");
            setLoc(+item.lat, +item.lon, div.textContent);
          };
          dd.appendChild(div);
        });
        dd.classList.remove("hidden");
      } catch (e) { console.error(e); }
    }, 250);
  });
  document.addEventListener("click", e => {
    if (!input.contains(e.target)) dd.classList.add("hidden");
  });
}

/*==== GEOLOCATION ====*/
if ($("geo-btn"))
  $("geo-btn").onclick = () => {
    if (!navigator.geolocation) { alert("Geolocation not supported"); return; }
    navigator.geolocation.getCurrentPosition(
      pos => setLoc(pos.coords.latitude, pos.coords.longitude, "Your location"),
      ()  => alert("Unable to retrieve your location")
    );
  };

/*==== ISSUE DROPDOWN ====*/
const listElt = $("issue-list");
if (listElt)
  Object.keys(issuesData).forEach(k => {
    const opt = document.createElement("option");
    opt.value = k; listElt.appendChild(opt);
  });
if ($("issue-input"))
  $("issue-input").addEventListener("input", e => {
    const v = e.target.value.trim();
    selectedIssue = issuesData[v] ? v : "";
  });

/*==== RESULTS-COUNT BUTTONS ====*/
document.querySelectorAll(".res-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".res-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    $("num-results").value = btn.dataset.n;
  };
});

/*==== LANDMARK MODAL ====*/
const lmModal = $("landmark-modal");
if ($("choose-landmark-btn"))
  $("choose-landmark-btn").onclick = () => {
    lmModal.classList.replace("hidden", "flex");
    $("user-map").classList.add("invisible");
    if (!landmarkMap) {
      landmarkMap = L.map("landmark-map", { zoomControl: false }).setView([32.7157, -117.1611], 11);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(landmarkMap);
    }
  };
if ($("close-landmark"))
  $("close-landmark").onclick = () => {
    lmModal.classList.replace("flex", "hidden");
    $("user-map").classList.remove("invisible");
  };
const lmBtns = $("landmark-buttons");
landmarks.forEach(l => {
  const b = document.createElement("button");
  b.innerHTML = `<span class="inline-block w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>${l.name}`;
  b.className = "w-full text-left px-3 py-2 border rounded bg-white dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 shadow-sm";
  b.onmouseenter = () => {
    if (landmarkTemp) landmarkMap.removeLayer(landmarkTemp);
    landmarkTemp = L.marker([l.lat, l.lng]).addTo(landmarkMap);
    landmarkMap.panTo([l.lat, l.lng]);
  };
  b.onmouseleave = () => { if (landmarkTemp) landmarkMap.removeLayer(landmarkTemp); };
  b.onclick = () => {
    setLoc(l.lat, l.lng, l.name);
    lmModal.classList.replace("flex", "hidden");
    $("user-map").classList.remove("invisible");
  };
  lmBtns.appendChild(b);
});

/*==== PICK MAP ====*/
const pickModal = $("pick-modal");
if ($("select-on-map-btn"))
  $("select-on-map-btn").onclick = () => {
    pickModal.classList.replace("hidden", "flex");
    $("user-map").classList.add("invisible");
    if (!pickMap) {
      pickMap = L.map("pick-map", { zoomControl: false }).setView([32.7157, -117.1611], 11);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(pickMap);
      pickMap.on("click", e => {
        const { lat, lng } = e.latlng;
        if (pickMarker) pickMap.removeLayer(pickMarker);
        pickMarker = L.marker([lat, lng]).addTo(pickMap);
        setTimeout(() => {
          pickModal.classList.replace("flex", "hidden");
          $("user-map").classList.remove("invisible");
        }, 300);
        setLoc(lat, lng, "Custom drop-pin");
      });
    }
  };
if ($("close-pick"))
  $("close-pick").onclick = () => {
    pickModal.classList.replace("flex", "hidden");
    $("user-map").classList.remove("invisible");
  };

/*==== PRINT ====*/
if ($("print-btn"))
  $("print-btn").onclick = () => window.print();

/*==== MINI-BAR ====*/
function makeBar(d, q, e, s) {
  const cell = (v, c, l) =>
    `<span data-tip="${l}: ${v == null ? "N/A" : v.toFixed(2)}" style="width:${v == null ? 5 : Math.min(v / 40 * 100, 100)}%" class="${v == null ? "hash" : ""} ${c}"></span>`;
  return `<div class="bar mt-2">${cell(d, "bg-teal-500", "Distance")}${cell(q, "bg-indigo-500", "Quality")}${cell(e, "bg-amber-500", "Experience")}${cell(s, "bg-rose-500", "Safety")}</div>`;
}

/*==== CHART MODAL ====*/
let chart, ctx = $("chart-canvas");
function showChart(h) {
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Distance", "Quality", "Experience", "Safety"],
      datasets: [{
        data: [h.score_distance ?? 0, h.score_quality ?? 0, h.score_experience ?? 0, h.score_safety ?? 0],
        backgroundColor: ["#14b8a6", "#6366f1", "#f59e0b", "#f43f5e"],
        borderWidth: 0
      }]
    },
    options: { plugins: { legend: { display: false } }, cutout: "60%" }
  });
  $("chart-title").textContent = h.hospital;
  $("chart-stats").innerHTML = `
    <table class="w-full"><tbody>
      <tr><td>Distance</td><td class="text-right">${(h.score_distance ?? 0).toFixed(2)}</td></tr>
      <tr><td>Quality</td><td class="text-right">${(h.score_quality ?? 0).toFixed(2)}</td></tr>
      <tr><td>Experience</td><td class="text-right">${(h.score_experience ?? 0).toFixed(2)}</td></tr>
      <tr><td>Safety</td><td class="text-right">${(h.score_safety ?? 0).toFixed(2)}</td></tr>
    </tbody></table>`;
  $("chart-modal").classList.replace("hidden", "flex");
}
if ($("close-chart"))
  $("close-chart").onclick = () => $("chart-modal").classList.replace("flex", "hidden");

/*==== FIND HOSPITALS ====*/
if ($("find-hospitals-btn"))
  $("find-hospitals-btn").onclick = async () => {
    if (!chosen)         { alert("Choose a location first"); return; }
    if (!selectedIssue)  { alert("Select a medical issue"); return; }

    const list = $("hospital-list");
    const limit = +$("num-results").value || 3;
    list.innerHTML = `<div class="h-24 rounded-lg skel"></div>`.repeat(limit);
    $("results").classList.remove("hidden");
    markStep(3);

    const payload = {
      disease: selectedIssue,
      lat: chosen.lat,
      lon: chosen.lng,
      radius: +$("distance-range").value,
      limit
    };

    const mapDiv = $("map");
    mapDiv.classList.add("hidden");
    if (hospMap) hospMap.remove();
    if (routeCtl) { hospMap?.removeControl(routeCtl); routeCtl = null; }

    try {
      const res  = await fetch(apiURL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload)
      });
      const data = await res.json();
      let rows   = data.recommended_hospitals || [];
      if (!rows.length) { list.innerHTML = "<p class='text-red-600'>No hospitals returned.</p>"; return; }

      rows = rows.map(h => {
        const avg = ((h.score_distance ?? 0) + (h.score_quality ?? 0) + (h.score_experience ?? 0) + (h.score_safety ?? 0)) / 4;
        return { ...h, avg };
      }).sort((a, b) => b.avg - a.avg);

      /* build map */
      mapDiv.classList.remove("hidden");
      hospMap = L.map("map", { zoomControl: false }).setView([chosen.lat, chosen.lng], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(hospMap);
      const you = L.marker([chosen.lat, chosen.lng]).addTo(hospMap).bindPopup("You").openPopup();
      const bounds = [[chosen.lat, chosen.lng]];

      /* render cards */
      list.innerHTML = "";
      rows.forEach((h, idx) => {
        bounds.push([h.latitude, h.longitude]);
        const card = document.createElement("div");
        card.className = "p-4 border rounded-lg bg-white dark:bg-gray-700 shadow hover:shadow-md transition";
        card.innerHTML = `
          <h3 class="font-bold text-lg mb-1">${idx + 1}. ${h.hospital}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Distance ${h.distance_mi} mi • Score ${h.avg.toFixed(2)}
          </p>
          ${makeBar(h.score_distance, h.score_quality, h.score_experience, h.score_safety)}
          <div class="flex gap-2 items-center text-xs mt-2">
            ${h.phone ? `☎ <a href="tel:+1-${h.phone}" class="underline">${h.phone}</a>` : ""}
            <button class="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded" data-i="${idx}" data-lat="${h.latitude}" data-lng="${h.longitude}">Route</button>
            <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded" onclick='showChart(${JSON.stringify(h)})'>Details</button>
          </div>
          <p class="text-xs mt-1" id="eta-${idx}"></p>`;
        list.appendChild(card);
        L.marker([h.latitude, h.longitude]).addTo(hospMap).bindPopup(h.hospital);
      });
      hospMap.fitBounds(bounds, { padding: [50, 50] });

      /* routing */
      list.querySelectorAll("button[data-i]").forEach(btn => {
        btn.onclick = () => {
          const lat = +btn.dataset.lat, lng = +btn.dataset.lng, i = btn.dataset.i;
          if (routeCtl) hospMap.removeControl(routeCtl);
          routeCtl = L.Routing.control({
            waypoints: [L.latLng(chosen.lat, chosen.lng), L.latLng(lat, lng)],
            router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }),
            lineOptions: { addWaypoints: false, styles: [{ weight: 5 }] },
            show: false, addWaypoints: false, fitSelectedRoutes: false
          }).addTo(hospMap);
          routeCtl.on("routesfound", e => {
            const mins = Math.round(e.routes[0].summary.totalTime / 60);
            $(`eta-${i}`).textContent = `≈${mins} min travel time`;
            hospMap.fitBounds(e.routes[0].bounds, { padding: [30, 30] });
          });
        };
      });
    } catch (err) {
      console.error(err);
      list.innerHTML = `<p class="text-red-600">${err.message}</p>`;
    }
  };

/*==== LEGEND INFO MODAL ====*/
if ($("legend-info-btn"))
  $("legend-info-btn").onclick = () => $("legend-info-modal").classList.replace("hidden", "flex");
if ($("close-legend-info"))
  $("close-legend-info").onclick = () => $("legend-info-modal").classList.replace("flex", "hidden");
$("legend-info-modal")?.addEventListener("click", e => {
  if (e.target === $("legend-info-modal"))
    $("legend-info-modal").classList.replace("flex", "hidden");
});

/*==== INIT ====*/
window.addEventListener("DOMContentLoaded", () => {
  initUserMap();
  initAutocomplete();
  markStep(1);
});
</script>
</body>
</html>
