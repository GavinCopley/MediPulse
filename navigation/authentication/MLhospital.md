---
layout: base
title: Best Hospital for You
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
#suggestions, #medical-issue-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-top: none;
  z-index: 1000;
  max-height: 14rem;
  overflow-y: auto;
}
#suggestions div, #medical-issue-dropdown div {
  padding: .5rem .75rem;
  font-size: .9rem;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#suggestions div:hover, #medical-issue-dropdown div:hover {
  background: #f0f0f0;
}
.num-results-btn.active {
  background:#3b82f6 !important;
  color:white !important;
}
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
  <div id="step-one" class="bg-white shadow-lg rounded-2xl p-6 mb-10">
    <h2 class="text-2xl font-bold mb-4">Step&nbsp;1: Choose Your Location</h2>


<div class="relative mb-1.5">
      <label for="address-input" class="block text-lg font-medium mb-1.5">Address (autocomplete):</label>
      <input id="address-input" autocomplete="off" type="text" placeholder="Start typing…" class="border border-gray-300 bg-white rounded-md px-4 py-2 w-full">
      <div id="suggestions" class="hidden"></div>
    </div>
    <p class="text-sm text-gray-500">Select from suggestions or click “Use My Location”.</p>


 <div class="flex flex-wrap gap-3 mt-4 mb-3">
      <button id="geo-btn"              class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow">Use My Location</button>
      <button id="choose-landmark-btn"  class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md shadow">Choose a San Diego Landmark</button>
      <button id="select-on-map-btn"    class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow">Pick on Map</button>
    </div>


<div id="user-map" class="w-full h-64 rounded-md mb-2 shadow-inner"></div>
    <p id="location-status" class="font-medium">No location selected yet.</p>
  </div>


  <!-- STEP 2 -------------------------------------------------->
  <div id="step-two" class="hidden bg-white shadow-lg rounded-2xl p-6 mb-10">
    <h2 class="text-2xl font-bold mb-6">Step&nbsp;2: Select Your Preferences</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- left -->
      <div class="md:col-span-2 grid gap-8">
        <div>
          <p class="text-lg font-medium mb-2">Medical issue</p>
          <div class="flex items-center">
            <div class="flex-grow">
              <div class="relative">
                <input id="medical-issue-input" type="text" placeholder="Type medical issue..." 
                       class="border border-gray-300 bg-white rounded-md px-4 py-3 h-12 w-full">
                <div id="medical-issue-dropdown" class="absolute top-full left-0 w-full bg-white border border-t-0 rounded-b-md shadow-lg hidden"></div>
              </div>
            </div>
            <button id="show-all-issues-btn" class="ml-2 px-3 py-2 bg-blue-700 text-white rounded-md shadow">
              Show all options
            </button>
          </div>
        </div>
        <div>
          <label class="font-medium block mb-1.5">Results to show</label>
          <div class="flex gap-2">
            <button class="num-results-btn bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md shadow" data-value="1">1</button>
            <button class="num-results-btn bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md shadow" data-value="2">2</button>
            <button class="num-results-btn bg-blue-600 text-white px-4 py-2 rounded-md shadow active" data-value="3">3</button>
            <button class="num-results-btn bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md shadow" data-value="4">4</button>
            <button class="num-results-btn bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md shadow" data-value="5">5</button>
          </div>
        </div>
      </div>
      <!-- right – stylish blue slider -->
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


  <!-- STEP 3 -------------------------------------------------->
  <div id="results" class="hidden">
    <h2 class="text-2xl font-bold mb-6">Step&nbsp;3: Your Recommended Hospitals</h2>
    <div id="hospital-list" class="grid md:grid-cols-2 gap-6 mb-6"></div>
    <div id="map" class="hidden w-full h-96 rounded-lg shadow-inner"></div>
  </div>
</div>


<!--────────── CHART MODAL, LEGEND, LANDMARK & PICK MODALS (unchanged markup) ──────────-->
<!-- … identical to previous version … -->


<!-- CHART MODAL -->
<div id="chart-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl relative w-80">
    <h4 id="chart-title" class="font-bold mb-2 text-center"></h4>
    <canvas id="chart-canvas"></canvas>
    <div id="chart-stats" class="mt-3 text-xs text-gray-700 dark:text-gray-300"></div>
    <button id="close-chart" class="absolute top-2 right-3 text-xl hover:text-red-600">&times;</button>
  </div>
</div>


<!-- LEGEND -->
<div class="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow px-3 py-2 text-xs text-gray-700 dark:text-gray-200 flex items-center">
  <strong>Score colours</strong> –
  <span class="inline-block w-3 h-3 bg-teal-500 mr-1"></span>Distance
  <span class="inline-block w-3 h-3 bg-indigo-500 mr-1"></span>Quality
  <span class="inline-block w-3 h-3 bg-amber-500 mr-1"></span>Experience
  <span class="inline-block w-3 h-3 bg-rose-500 mr-1"></span>Safety
  <span class="inline-block w-3 h-3 bg-gray-400 mr-1 hash"></span>N/A
  <button id="legend-info-btn" class="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400" aria-label="Show score key">ℹ️</button>
</div>


<!-- LEGEND INFO MODAL -->
<div id="legend-info-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl max-w-md">
    <h4 class="font-bold mb-4 text-lg">Score Explanation</h4>
    <ul class="list-disc list-inside text-sm space-y-2">
      <li><strong>Distance:</strong> How far the hospital is (closer = better).</li>
      <li><strong>Quality:</strong> Risk-adjusted rate & hospital ratings.</li>
      <li><strong>Experience:</strong> Number of treated cases.</li>
      <li><strong>Safety:</strong> Fewer adverse events.</li>
    </ul>
    <div class="mt-6 text-right"><button id="close-legend-info" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">Close</button></div>
  </div>
</div>


<!-- LANDMARK MODAL -->
<div id="landmark-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
  <div class="bg-white dark:bg-gray-800 rounded-lg w-[90vw] h-[90vh] flex relative shadow-2xl">
    <aside class="w-64 border-r dark:border-gray-700 p-4 overflow-y-auto">
      <h3 class="text-lg font-bold mb-4">Landmarks</h3>
      <div id="landmark-buttons" class="space-y-2"></div>
      <button id="close-landmark" class="mt-4 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900">Close</button>
    </aside>
    <div id="landmark-map" class="flex-1"></div>
  </div>
</div>


<!-- PICK MODAL -->
<div id="pick-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
  <div class="bg-white dark:bg-gray-800 rounded-lg w-[90vw] h-[90vh] relative shadow-2xl flex flex-col">
    <h3 class="text-lg font-bold p-4 border-b dark:border-gray-700">Click map to set location</h3>
    <div id="pick-map" class="flex-1"></div>
    <button id="close-pick" class="absolute top-2 right-4 text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900">&times;</button>
  </div>
</div>


<!-- New modal for showing all medical issues with higher z-index and no minimize button -->
<div id="issues-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center" style="z-index: 9999;">
  <div id="issues-modal-content" class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-3/4 max-w-xl relative transition-all">
    <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
      <h3 class="text-xl font-bold">Select Medical Issue</h3>
      <button id="close-issues-btn" class="text-gray-600 hover:text-red-600">&times;</button>
    </div>
    <div id="issues-list" class="p-4 max-h-64 overflow-y-auto">
      <!-- Options will be generated dynamically -->
    </div>
  </div>
</div>


<!--────────── JAVASCRIPT ──────────-->
<script>

  /*==== DATA ====*/
const issuesData={
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
const landmarks=[
  {name:'Petco Park',lat:32.7073,lng:-117.1566},
  {name:'San Diego Zoo',lat:32.7353,lng:-117.1490},
  {name:'Balboa Park',lat:32.7311,lng:-117.1466},
  {name:'SeaWorld',lat:32.7640,lng:-117.2265},
  {name:'USS Midway',lat:32.7137,lng:-117.1750},
  {name:'La Jolla Cove',lat:32.8504,lng:-117.2727}
];


/*==== STATE ====*/
let userMap,userMarker,chosen;
let landmarkMap,landmarkTemp,pickMap,pickMarker,hospMap,routeCtl;
let selectedIssue='',numResults=3;
const apiURL='http://127.0.0.1:8115/api/predict';


/*==== PROGRESS ====*/
function markStep(n){
  document.getElementById('p-step1').className=n>=1?'text-indigo-600':'text-gray-400';
  document.getElementById('p-step2').className=n>=2?'text-indigo-600':'text-gray-400';
  document.getElementById('p-step3').className=n>=3?'text-indigo-600':'text-gray-400';
}


/*==== MAP INIT ====*/
function initUserMap(){
  userMap=L.map('user-map',{zoomControl:false}).setView([32.7157,-117.1611],12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(userMap);
}


/*==== SET LOCATION ====*/
function setLoc(lat,lng,label=''){
  chosen={lat,lng};
  if(userMarker)userMap.removeLayer(userMarker);
  userMarker=L.marker([lat,lng]).addTo(userMap);
  userMap.setView([lat,lng],14);
  if(label)userMarker.bindPopup(label).openPopup();
  document.getElementById('location-status').textContent=`Location set ➜ ${label}`; // Fixed template literal
  document.getElementById('step-two').classList.remove('hidden');
  markStep(2);
}


/*==== AUTOCOMPLETE (CA ONLY) ====*/
function initAutocomplete(){
  const input = document.getElementById('address-input');
  const dropdown = document.getElementById('suggestions');
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    const q = input.value.trim();
    if(q.length < 3){ 
      dropdown.style.display = 'none'; 
      return;
    }
    debounce = setTimeout(async() => {
      try{
        const viewbox = '-124.409591,32.534156,-114.131211,42.009518';
        const url=`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=8&addressdetails=1&viewbox=${viewbox}&bounded=1&countrycodes=us`; // Fixed template literal
        const data=await (await fetch(url)).json();
        dropdown.innerHTML='';
        if(!data.length){ 
          dropdown.style.display = 'none';
          return;
        }
        data.forEach(item=>{
          const div=document.createElement('div');
          div.textContent=item.display_name;
          div.onclick=()=>{
            input.value=item.display_name;
            dropdown.style.display = 'none';
            setLoc(+item.lat,+item.lon,item.display_name);
          };
          dropdown.appendChild(div);
        });
        dropdown.style.display = 'block';
      }catch(e){console.error(e);}
    },250);
  });
  document.addEventListener('click', e=>{
    if(!input.contains(e.target)) dropdown.style.display = 'none';
  });
}


/*==== MEDICAL ISSUE DROPDOWN ====*/
const medicalInput = document.getElementById('medical-issue-input');
const medicalDropdown = document.getElementById('medical-issue-dropdown');
medicalInput.addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const filtered = Object.keys(issuesData)
    .filter(issue => issue.toLowerCase().includes(searchTerm))
    .sort((a, b) => a.localeCompare(b));
  medicalDropdown.innerHTML = '';
  if (!searchTerm || !filtered.length) {
    medicalDropdown.style.display = 'none';
    return;
  }
  filtered.forEach(issue => {
    const div = document.createElement('div');
    div.textContent = issue;
    div.className = 'hover:bg-gray-100 dark:hover:bg-gray-600';
    div.onclick = () => {
      medicalInput.value = issue;
      selectedIssue = issue;
      medicalDropdown.style.display = 'none';
    };
    medicalDropdown.appendChild(div);
  });
  medicalDropdown.style.display = 'block';
});
document.addEventListener('click', e => {
  if (!medicalInput.contains(e.target)) {
    medicalDropdown.style.display = 'none';
  }
});


/*==== RESULTS BUTTONS ====*/
document.querySelectorAll('.num-results-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.num-results-btn').forEach(b => 
      b.classList.remove('active', 'bg-blue-600', 'text-white'));
    this.classList.add('active', 'bg-blue-600', 'text-white');
    numResults = parseInt(this.dataset.value);
  });
});


/*==== GEOLOCATION ====*/
document.getElementById('geo-btn').onclick=()=>{
  if(!navigator.geolocation){alert('Geolocation not supported');return;}
  navigator.geolocation.getCurrentPosition(
    pos=>setLoc(pos.coords.latitude,pos.coords.longitude,'Your location'),
    ()=>alert('Unable to retrieve your location'));
};


/*==== LANDMARK MODAL ====*/
const lmModal=document.getElementById('landmark-modal');
document.getElementById('choose-landmark-btn').onclick=()=>{
  lmModal.classList.replace('hidden','flex');
  document.getElementById('user-map').classList.add('invisible');
  if(!landmarkMap){
    landmarkMap=L.map('landmark-map',{zoomControl:false}).setView([32.7157,-117.1611],11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(landmarkMap);
  }
};
document.getElementById('close-landmark').onclick=()=>{
  lmModal.classList.replace('flex','hidden');
  document.getElementById('user-map').classList.remove('invisible');
};
const lmBtns=document.getElementById('landmark-buttons');
landmarks.forEach(l=>{
  const btn=document.createElement('button');
  btn.innerHTML=`<span class="inline-block w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>${l.name}`; // Fixed template literal
  btn.className='w-full text-left px-3 py-2 border rounded bg-white dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 shadow-sm';
  btn.onmouseenter=()=>{
    if(landmarkTemp)landmarkMap.removeLayer(landmarkTemp);
    landmarkTemp=L.marker([l.lat,l.lng]).addTo(landmarkMap);
    landmarkMap.panTo([l.lat,l.lng]);
  };
  btn.onmouseleave=()=>{if(landmarkTemp)landmarkMap.removeLayer(landmarkTemp);};
  btn.onclick=()=>{
    setLoc(l.lat,l.lng,l.name);
    lmModal.classList.replace('flex','hidden');
    document.getElementById('user-map').classList.remove('invisible');
  };
  lmBtns.appendChild(btn);
});


/*==== PICK MAP ====*/
const pickModal=document.getElementById('pick-modal');
document.getElementById('select-on-map-btn').onclick=()=>{
  pickModal.classList.replace('hidden','flex');
  document.getElementById('user-map').classList.add('invisible');
  if(!pickMap){
    pickMap=L.map('pick-map',{zoomControl:false}).setView([32.7157,-117.1611],11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(pickMap);
    pickMap.on('click',e=>{
      const {lat,lng}=e.latlng;
      if(pickMarker)pickMap.removeLayer(pickMarker);
      pickMarker=L.marker([lat,lng]).addTo(pickMap);
      setTimeout(()=>{
        pickModal.classList.replace('flex','hidden');
        document.getElementById('user-map').classList.remove('invisible');
      },300);
      setLoc(lat,lng,'Custom drop-pin');
    });
  }
};
document.getElementById('close-pick').onclick=()=>{
  pickModal.classList.replace('flex','hidden');
  document.getElementById('user-map').classList.remove('invisible');
};


/*==== PRINT ====*/
document.getElementById('print-btn').onclick=()=>window.print();


/*==== MINI-BAR ====*/
function makeBar(d,q,e,s){
  const cell = (v,c,l) =>
    `<span data-tip="${l}: ${v==null?'N/A':v.toFixed(2)}"`
    + ` style="width:${v==null?5:Math.min(v/40*100,100)}%"`
    + ` class="${v==null?'hash':''} ${c}"></span>`;
  return `<div class="bar mt-2">`
       + cell(d,'bg-teal-500','Distance')
       + cell(q,'bg-indigo-500','Quality')
       + cell(e,'bg-amber-500','Experience')
       + cell(s,'bg-rose-500','Safety')
       + `</div>`;
}


/*==== CHART MODAL ====*/
function showChart(h){
  if(chart) chart.destroy();
  chart = new Chart(ctx, {type:'doughnut',
    data:{
      labels:['Distance','Quality','Experience','Safety'],
      datasets:[{
        data:[h.score_distance??0, h.score_quality??0, h.score_experience??0, h.score_safety??0],
        backgroundColor:['#14b8a6','#6366f1','#f59e0b','#f43f5e'],
        borderWidth:0
      }]
    },
    options:{ plugins:{ legend:{ display:false }}, cutout:'60%' }
  });
  document.getElementById('chart-title').textContent = h.hospital;
  document.getElementById('chart-stats').innerHTML = `
    <table class="w-full">
      <tbody>
        <tr><td>Distance</td><td class="text-right">${(h.score_distance??0).toFixed(2)}</td></tr>
        <tr><td>Quality</td><td class="text-right">${(h.score_quality??0).toFixed(2)}</td></tr>
        <tr><td>Experience</td><td class="text-right">${(h.score_experience??0).toFixed(2)}</td></tr>
        <tr><td>Safety</td><td class="text-right">${(h.score_safety??0).toFixed(2)}</td></tr>
      </tbody>
    </table>`;
  document.getElementById('chart-modal').classList.replace('hidden','flex');
}
document.getElementById('close-chart').onclick=()=>document.getElementById('chart-modal').classList.replace('flex','hidden');


/*==== FIND HOSPITALS ====*/
document.getElementById('find-hospitals-btn').onclick = async () => {
  if (!chosen)      { alert('Choose a location first'); return; }
  if (!selectedIssue){ alert('Select a medical issue'); return; }


  const list = document.getElementById('hospital-list');
  list.innerHTML =
    '<div class="h-24 rounded-lg skel"></div>'.repeat(numResults);
  document.getElementById('results').classList.remove('hidden');
  markStep(3);


  /* fetch */
  const payload = {
    disease: selectedIssue,
    lat: chosen.lat,
    lon: chosen.lng,
    radius: +document.getElementById('distance-range').value,
    limit:  numResults
  };


  const mapDiv = document.getElementById('map');
  mapDiv.classList.add('hidden');
  if (hospMap) hospMap.remove();
  if (routeCtl) { hospMap?.removeControl(routeCtl); routeCtl = null; }


  try {
    const res  = await fetch(apiURL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });
    const data = await res.json();
    let rows   = data.recommended_hospitals || [];

    if (!rows.length) {
      list.innerHTML = '<p class="text-red-600">No hospitals returned.</p>';
      return;
    }


    /* 1️⃣  Calculate a single composite score and sort DESCENDING */
    rows = rows
      .map(h => {
        const avg =
          ((h.score_distance   ?? 0) +
           (h.score_quality    ?? 0) +
           (h.score_experience ?? 0) +
           (h.score_safety     ?? 0)) / 4;
        return { ...h, avg };
      })
      .sort((a, b) => b.avg - a.avg);          // bigger score → higher rank


    /* 2️⃣  Build map first */
    mapDiv.classList.remove('hidden');
    hospMap = L.map('map', { zoomControl: false })
      .setView([chosen.lat, chosen.lng], 10);
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 19 }
    ).addTo(hospMap);


    const you = L.marker([chosen.lat, chosen.lng])
      .addTo(hospMap)
      .bindPopup('You');
    you.openPopup();


    const bounds = [[chosen.lat, chosen.lng]];


    /* 3️⃣  Render cards & markers */
    list.innerHTML = '';                       // clear skeletons


    rows.forEach((h, idx) => {
      bounds.push([h.latitude, h.longitude]);
      const card = document.createElement('div');
      card.className = 'p-4 border rounded-lg bg-white dark:bg-gray-700 shadow hover:shadow-md transition';
      
      card.innerHTML = `
        <h3 class="font-bold text-lg mb-1">${idx + 1}. ${h.hospital}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Distance ${h.distance_mi} mi • Score ${h.avg.toFixed(2)}
        </p>
        ${makeBar(
          h.score_distance,
          h.score_quality,
          h.score_experience,
          h.score_safety
        )}
        <div class="flex gap-2 items-center text-xs mt-2">
          ${h.phone
            ? `☎ <a href="tel:+1-${h.phone}" class="underline">${h.phone}</a>`
            : ''}
          <button
            class="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded"
            data-i="${idx}"
            data-lat="${h.latitude}"
            data-lng="${h.longitude}">
            Route
          </button>
          <button
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded"
            onclick='showChart(${JSON.stringify(h)})'>
            Details
          </button>
        </div>
        <p class="text-xs mt-1" id="eta-${idx}"></p>`; // Fixed template literal
      
      list.appendChild(card);


      L.marker([h.latitude, h.longitude])
        .addTo(hospMap)
        .bindPopup(h.hospital);
    });


    hospMap.fitBounds(bounds, { padding: [50, 50] });


    /* 4️⃣  Routing */
    list.querySelectorAll('button[data-i]').forEach(btn => {
      btn.onclick = () => {
        const lat = +btn.dataset.lat,
              lng = +btn.dataset.lng,
              i   = btn.dataset.i;


        if (routeCtl) hospMap.removeControl(routeCtl);


        routeCtl = L.Routing.control({
          waypoints: [
            L.latLng(chosen.lat, chosen.lng),
            L.latLng(lat, lng)
          ],
          router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
          }),
          lineOptions: {
            addWaypoints: false,
            styles: [{ weight: 5 }]
          },
          show: false,
          addWaypoints: false,
          fitSelectedRoutes: false
        }).addTo(hospMap);


        routeCtl.on('routesfound', e => {
          const mins = Math.round(e.routes[0].summary.totalTime / 60);
          document.getElementById(`eta-${i}`).textContent = // Fixed template literal
            `~${mins} min travel time`;
          hospMap.fitBounds(e.routes[0].bounds, { padding: [30, 30] });
        });
      };
    });
  } catch (err) {
    console.error(err);
    list.innerHTML = `<p class="text-red-600">${err.message}</p>`; // Fixed template literal
  }
};


/*==== LEGEND INFO MODAL ====*/
document.getElementById('legend-info-btn').onclick=()=>document.getElementById('legend-info-modal').classList.replace('hidden','flex');
document.getElementById('close-legend-info').onclick=()=>document.getElementById('legend-info-modal').classList.replace('flex','hidden');
document.getElementById('legend-info-modal').onclick=e=>{
  if(e.target===document.getElementById('legend-info-modal')) document.getElementById('legend-info-modal').classList.replace('flex','hidden');
};


/*==== INIT ====*/
window.addEventListener('DOMContentLoaded',()=>{
  initUserMap();
  initAutocomplete();
  markStep(1);
});
window.addEventListener('DOMContentLoaded', () => {
  // New modal event listeners for "Show all options"
  const showAllBtn = document.getElementById('show-all-issues-btn');
  const issuesModal = document.getElementById('issues-modal');
  const issuesList = document.getElementById('issues-list');
  const medicalInput = document.getElementById('medical-issue-input');

  showAllBtn.addEventListener('click', () => {
    issuesList.innerHTML = '';
    Object.keys(issuesData).sort().forEach(issue => {
      const item = document.createElement('div');
      item.className = "p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center";
      item.textContent = issue;
      item.addEventListener('click', () => {
        medicalInput.value = issue;
        selectedIssue = issue;
        const checkmark = document.createElement('span');
        checkmark.innerHTML = "&#10004;";
        checkmark.className = "text-green-500 text-2xl ml-2";
        item.appendChild(checkmark);
        setTimeout(() => {
          checkmark.remove();
          issuesModal.style.display = 'none';
        }, 1500);
      });
      issuesList.appendChild(item);
    });
    issuesModal.style.display = 'flex';
  });

  document.getElementById('close-issues-btn').addEventListener('click', () => {
    issuesModal.style.display = 'none';
  });
});
</script>