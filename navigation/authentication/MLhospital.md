---
layout: base
title: Best Hospital for You
permalink: /hospitalforyou
search_exclude: true
menu: nav/home.html
---

<!--────────── CDN IMPORTS ──────────-->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBm9TJ49EHLRLvJIY-kIg9HWOFAHTjIJCA&libraries=places"></script>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>

<!--────────── GLOBAL STYLE PATCHES ──────────-->
<style>
:root{
  --track:#e5e7eb;
  --thumb:#4f46e5;
  --fill:#4f46e5;
}
.dark{
  --track:#374151;
  --thumb:#6366f1;
  --fill:#6366f1;
  background:#1f2937;
  color:#d1d5db;
}
/* pretty blue slider */
input[type=range]{
  -webkit-appearance:none;
  width:100%;
  height:8px;
  border-radius:4px;
  background:var(--track);
}
input[type=range]::-webkit-slider-thumb{
  -webkit-appearance:none;
  height:22px;width:22px;border-radius:50%;
  background:var(--thumb);border:2px solid #fff;cursor:pointer;
  box-shadow:0 0 3px rgb(0 0 0/.4);margin-top:-7px;transition:.2s}
input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.15)}
/* mini-bars */
.bar{height:8px;border-radius:4px;display:flex;overflow:hidden}
.bar span{display:block;height:100%}
.bar span[data-tip]{position:relative}
.bar span[data-tip]::after{
  content:attr(data-tip);position:absolute;bottom:110%;left:50%;
  transform:translateX(-50%);white-space:nowrap;font-size:10px;
  padding:2px 4px;border-radius:4px;background:#111;color:#fff;
  opacity:0;pointer-events:none;transition:.15s}
.bar span[data-tip]:hover::after{opacity:1}
.hash{background-image:linear-gradient(135deg,rgba(0,0,0,.17) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.17) 50%,rgba(0,0,0,.17) 75%,transparent 75%,transparent);background-size:8px 8px}
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
    <!-- dark-mode toggle -->
    <button id="dark-toggle"
            class="ml-4 flex items-center justify-center h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur">
      <svg id="sun" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
      </svg>
      <svg id="moon" class="h-5 w-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
      </svg>
    </button>
  </div>
</div>

<!--────────── MAIN WRAPPER ──────────-->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

  <!-- progress bar -->
  <div class="flex mb-6 items-center justify-center gap-6 text-sm font-semibold">
    <span id="p-step1" class="text-indigo-600">Step 1 • Location</span><span>➔</span>
    <span id="p-step2" class="text-gray-400">Step 2 • Preferences</span><span>➔</span>
    <span id="p-step3" class="text-gray-400">Step 3 • Results</span>
  </div>

  <!-- STEP 1 -------------------------------------------------->
  <div id="step-one" class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-10">
    <h2 class="text-2xl font-bold mb-4">Step 1: Choose Your Location</h2>

    <label for="address-input" class="block text-lg font-medium mb-1.5">Address (autocomplete):</label>
    <input id="address-input" type="text" placeholder="Start typing…"
           class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md px-4 py-2 w-full">
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Select from suggestions.</p>

    <div class="flex flex-wrap gap-3 mt-4 mb-2">
      <button id="choose-landmark-btn"
              class="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md shadow">
        Choose a San Diego Landmark
      </button>
      <button id="select-on-map-btn"
              class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md shadow">
        Pick on Map
      </button>
    </div>

    <div id="user-map" class="w-full h-64 rounded-md mb-2 shadow-inner"></div>
    <p id="location-status" class="font-medium">No location selected yet.</p>
  </div>

  <!-- STEP 2 -------------------------------------------------->
  <div id="step-two" class="hidden bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-10">
    <h2 class="text-2xl font-bold mb-6">Step 2: Select Your Preferences</h2>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- left -->
      <div class="md:col-span-2 grid gap-8">
        <!-- pills -->
        <div>
          <p class="text-lg font-medium mb-2">Medical issue (hover for details)</p>
          <div id="issue-pills" class="flex flex-wrap gap-2"></div>
        </div>

        <!-- results select -->
        <div class="flex items-end gap-4">
          <div>
            <label class="font-medium block mb-1.5">Results to show</label>
            <select id="num-results"
                    class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md px-4 py-2">
              <option>1</option><option>2</option><option selected>3</option><option>5</option><option>7</option><option>10</option>
            </select>
          </div>
        </div>
      </div>

      <!-- right – stylish blue slider -->
      <div class="md:col-span-2 flex flex-col">
        <label class="block text-xl font-medium mb-4">Max travel distance</label>
        <input type="range" id="distance-range" min="1" max="50" value="10"
               oninput="document.getElementById('distance-readout').textContent=this.value+' mi'">
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 mi</span><span>25</span><span>50 mi</span>
        </div>
        <span id="distance-readout" class="font-semibold mt-2 self-center">10 mi</span>
      </div>
    </div>

    <div class="mt-10 flex justify-center gap-4">
      <button id="find-hospitals-btn"
              class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-10 rounded-md shadow-lg text-xl">
        Get Recommendations
      </button>
      <button id="print-btn"
              class="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-4 rounded-md shadow">
        Save / Print PDF
      </button>
    </div>
  </div>

  <!-- STEP 3 / RESULTS --------------------------------------->
  <div id="results" class="hidden">
    <h2 class="text-2xl font-bold mb-6">Step 3: Your Recommended Hospitals</h2>
    <div id="hospital-list" class="grid md:grid-cols-2 gap-6 mb-6"></div>
    <div id="map" class="hidden w-full h-96 rounded-lg shadow-inner"></div>
  </div>
</div>

<!--────────── CHART MODAL ──────────-->
<div id="chart-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl relative w-80">
    <h4 id="chart-title" class="font-bold mb-2 text-center"></h4>
    <canvas id="chart-canvas"></canvas>
    <div id="chart-stats" class="mt-3 text-xs text-gray-700 dark:text-gray-300"></div>
    <button id="close-chart" class="absolute top-2 right-3 text-xl hover:text-red-600">&times;</button>
  </div>
</div>

<!--────────── LEGEND ──────────-->
<div class="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow px-3 py-2 text-xs text-gray-700 dark:text-gray-200 flex items-center">
  <strong>Score colours</strong> – 
  <span class="inline-block w-3 h-3 bg-teal-500 mr-1"></span>Distance 
  <span class="inline-block w-3 h-3 bg-indigo-500 mr-1"></span>Quality 
  <span class="inline-block w-3 h-3 bg-amber-500 mr-1"></span>Experience 
  <span class="inline-block w-3 h-3 bg-rose-500 mr-1"></span>Safety 
  <span class="inline-block w-3 h-3 bg-gray-400 mr-1 hash"></span>N/A
  <button id="legend-info-btn"
          class="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400"
          aria-label="Show score key">ℹ️</button>
</div>

<!--────────── LEGEND INFO MODAL ──────────-->
<div id="legend-info-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl max-w-md">
    <h4 class="font-bold mb-4 text-lg">Score Explanation</h4>
    <ul class="list-disc list-inside text-sm space-y-2">
      <li><strong>Distance:</strong> How far the hospital is (closer is better).</li>
      <li><strong>Quality:</strong> Based on risk-adjusted rate (lower risk = higher quality) and hospital ratings (“Better” = 2, “Worse” = 1, N/A = 0).</li>
      <li><strong>Experience:</strong> Number of cases treated (more cases = more experience).</li>
      <li><strong>Safety:</strong> Number of adverse events (fewer events = higher safety).</li>
    </ul>
    <div class="mt-6 text-right">
      <button id="close-legend-info" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">Close</button>
    </div>
  </div>
</div>

<!--────────── LANDMARK & PICK MAP MODALS (unchanged) ──────────-->
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

<div id="pick-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
  <div class="bg-white dark:bg-gray-800 rounded-lg w-[90vw] h-[90vh] relative shadow-2xl flex flex-col">
    <h3 class="text-lg font-bold p-4 border-b dark:border-gray-700">Click map to set location</h3>
    <div id="pick-map" class="flex-1"></div>
    <button id="close-pick" class="absolute top-2 right-4 text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900">&times;</button>
  </div>
</div>

<!--────────── JAVASCRIPT ──────────-->
<script>
/*==== DATA ====*/
const issuesData={
  'AAA Repair Endo Unrupture':'Elective endovascular aortic aneurysm repair.',
  'AAA Repair Open Unrupture':'Open surgical repair of an unruptured abdominal aortic aneurysm.',
  'Acute Stroke':'Emergency treatment for any stroke type (bleed or clot).',
  'Acute Stroke Hemorrhagic':'Bleeding stroke requiring neuro-critical care.',
  'Acute Stroke Ischemic':'Clot-related stroke (tPA / thrombectomy).',
  'Acute Stroke Subarachnoid':'Bleed around the brain from ruptured aneurysm.',
  'AMI':'Acute myocardial infarction (“heart attack”).',
  'Carotid Endarterectomy':'Surgery to clear plaque in carotid arteries.',
  'GI Hemorrhage':'Life-threatening gastrointestinal bleeding.',
  'Heart Failure':'Inpatient care for acute heart-failure decompensation.',
  'Hip Fracture':'Emergency repair of fractured hip.',
  'Isolated CABG Operative Mor':'Coronary-artery bypass graft.',
  'Pancreatic Resection':'Partial / total pancreas removal.',
  'PCI':'Percutaneous coronary intervention (stent).',
  'Pneumonia':'Severe pneumonia management.',
  'Postoperative Sepsis':'Septic complication after surgery.'
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
let landmarkMap,landmarkTemp,pickMap,pickMarker,hospMap;
let selectedIssue='';
const apiURL='http://127.0.0.1:8115/api/predict';

/*==== DARK MODE ====*/
const html=document.documentElement;
document.getElementById('dark-toggle').onclick=()=>{
  html.classList.toggle('dark');
  document.getElementById('sun').classList.toggle('hidden');
  document.getElementById('moon').classList.toggle('hidden');
};

/*==== PROGRESS ====*/
function markStep(n){
  document.getElementById('p-step1').className=n>=1?'text-indigo-600':'text-gray-400';
  document.getElementById('p-step2').className=n>=2?'text-indigo-600':'text-gray-400';
  document.getElementById('p-step3').className=n>=3?'text-indigo-600':'text-gray-400';
}

/*==== MAPS ====*/
function initUserMap(){
  userMap=L.map('user-map',{zoomControl:false}).setView([32.7157,-117.1611],12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(userMap);
}
function setLoc(lat,lng,label=''){
  chosen={lat,lng};
  if(userMarker)userMap.removeLayer(userMarker);
  userMarker=L.marker([lat,lng]).addTo(userMap);
  userMap.setView([lat,lng],14);
  if(label)userMarker.bindPopup(label).openPopup();
  document.getElementById('location-status').textContent=`Location set ➜ ${label}`;
  document.getElementById('step-two').classList.remove('hidden');markStep(2);
}

/*==== AUTOCOMPLETE ====*/
function initAutocomplete(){
  const input=document.getElementById('address-input');
  const ac=new google.maps.places.Autocomplete(
    input,{fields:['formatted_address','geometry']});
  ac.addListener('place_changed',()=>{
    const p=ac.getPlace();if(!p.geometry)return;
    setLoc(p.geometry.location.lat(),p.geometry.location.lng(),p.formatted_address);
  });
}

/*==== PILLS ====*/
const pillWrap=document.getElementById('issue-pills');
Object.entries(issuesData).forEach(([txt,desc])=>{
  const btn=document.createElement('button');
  btn.textContent=txt;btn.title=desc;
  btn.className='px-4 py-1.5 text-sm border rounded-full border-gray-300 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-600 transition';
  btn.onclick=()=>{
    selectedIssue=txt;
    [...pillWrap.children].forEach(b=>b.className='px-4 py-1.5 text-sm border rounded-full border-gray-300 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-600 transition');
    btn.className+=' bg-indigo-600 text-white border-indigo-600';
  };
  pillWrap.appendChild(btn);
});

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
  const b=document.createElement('button');
  b.innerHTML=`<span class="inline-block w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>${l.name}`;
  b.className='w-full text-left px-3 py-2 border rounded bg-white dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 shadow-sm';
  b.onmouseenter=()=>{
    if(landmarkTemp)landmarkMap.removeLayer(landmarkTemp);
    landmarkTemp=L.marker([l.lat,l.lng]).addTo(landmarkMap);
    landmarkMap.panTo([l.lat,l.lng]);
  };
  b.onmouseleave=()=>{if(landmarkTemp)landmarkMap.removeLayer(landmarkTemp);};
  b.onclick=()=>{
    setLoc(l.lat,l.lng,l.name);
    lmModal.classList.replace('flex','hidden');
    document.getElementById('user-map').classList.remove('invisible');
  };
  lmBtns.appendChild(b);
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
      },400);
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
  const mk=(v,col,label)=>`<span data-tip="${label}: ${v==null?'N/A':v.toFixed(2)}"
      style="width:${v==null?5:Math.min(v/40*100,100)}%" class="${v==null?'hash':''} ${col}"></span>`;
  return `<div class="bar mt-2">
            ${mk(d,'bg-teal-500','Distance')}
            ${mk(q,'bg-indigo-500','Quality')}
            ${mk(e,'bg-amber-500','Experience')}
            ${mk(s,'bg-rose-500','Safety')}
          </div>`;
}

/*==== CHART MODAL ====*/
let chart,ctx=document.getElementById('chart-canvas');
function showChart(h){
  if(chart)chart.destroy();
  chart=new Chart(ctx,{type:'doughnut',
    data:{labels:['Distance','Quality','Experience','Safety'],
          datasets:[{data:[h.score_distance??0,h.score_quality??0,h.score_experience??0,h.score_safety??0],
                     backgroundColor:['#14b8a6','#6366f1','#f59e0b','#f43f5e'],borderWidth:0}]},
    options:{plugins:{legend:{display:false}},cutout:'60%'}});
  document.getElementById('chart-title').textContent=h.hospital;
  document.getElementById('chart-stats').innerHTML=
   `<table class="w-full"><tbody>
      <tr><td>Distance</td><td class="text-right">${(h.score_distance??0).toFixed(2)}</td></tr>
      <tr><td>Quality</td><td class="text-right">${(h.score_quality??0).toFixed(2)}</td></tr>
      <tr><td>Experience</td><td class="text-right">${(h.score_experience??0).toFixed(2)}</td></tr>
      <tr><td>Safety</td><td class="text-right">${(h.score_safety??0).toFixed(2)}</td></tr>
    </tbody></table>`;
  document.getElementById('chart-modal').classList.replace('hidden','flex');
}
document.getElementById('close-chart').onclick=()=>document.getElementById('chart-modal').classList.replace('flex','hidden');

/*==== FIND HOSPITALS ====*/
document.getElementById('find-hospitals-btn').onclick=async()=>{
  if(!chosen){alert('Choose a location first');return;}
  if(!selectedIssue){alert('Select a medical issue');return;}

  const list=document.getElementById('hospital-list');
  list.innerHTML='<div class="h-24 rounded-lg skel"></div><div class="h-24 rounded-lg skel"></div><div class="h-24 rounded-lg skel"></div>';
  document.getElementById('results').classList.remove('hidden');markStep(3);

  const payload={
    disease:selectedIssue,
    lat:chosen.lat,lon:chosen.lng,
    radius:+document.getElementById('distance-range').value,
    limit:+document.getElementById('num-results').value
  };

  const mapDiv=document.getElementById('map');mapDiv.classList.add('hidden');
  if(hospMap)hospMap.remove();

  try{
    const res=await fetch(apiURL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data=await res.json();list.innerHTML='';
    const rows=data.recommended_hospitals||[];

    if(data.error||!rows.length){list.innerHTML='<p class="text-red-600">No hospitals returned.</p>';return;}

    rows.forEach((h,i)=>{
      // ** NEW: recompute a local average so "Score" always matches the bar graph **
      const total = (h.score_distance??0)+(h.score_quality??0)+(h.score_experience??0)+(h.score_safety??0);
      const avgScore = total/4;
      const phone=h.phone?`☎ <a href="tel:+1-${h.phone}" class="underline">${h.phone}</a>`:'';
      const card=document.createElement('div');
      card.className='p-4 border rounded-lg bg-white dark:bg-gray-700 shadow hover:shadow-md transition';
      card.innerHTML=
        `<h3 class="font-bold text-lg mb-1">${i+1}. ${h.hospital}</h3>
         <p class="text-sm text-gray-600 dark:text-gray-300">
           Distance ${h.distance_mi} mi • Score ${avgScore.toFixed(2)}
         </p>
         ${makeBar(h.score_distance,h.score_quality,h.score_experience,h.score_safety)}
         <div class="flex gap-2 items-center text-xs mt-2">
           <span>${phone}</span>
           <a target="_blank" rel="noopener"
              href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.hospital)}"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded">
             Open Map
           </a>
           <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded"
                   onclick='showChart(${JSON.stringify(h)})'>
             Details
           </button>
         </div>`;
      list.appendChild(card);
    });

    mapDiv.classList.remove('hidden');
    hospMap=L.map('map',{zoomControl:false}).setView([chosen.lat,chosen.lng],10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(hospMap);
    L.marker([chosen.lat,chosen.lng]).addTo(hospMap).bindPopup('You');
    const bounds=[[chosen.lat,chosen.lng]];
    rows.forEach(h=>{
      L.marker([h.latitude,h.longitude]).addTo(hospMap).bindPopup(h.hospital);
      bounds.push([h.latitude,h.longitude]);
    });
    hospMap.fitBounds(bounds,{padding:[50,50]});

  }catch(e){
    console.error(e);
    list.innerHTML=`<p class="text-red-600">${e.message}</p>`;
  }
};

/*==== LEGEND INFO MODAL HANDLERS ====*/
const legendInfoBtn = document.getElementById('legend-info-btn');
const legendInfoModal = document.getElementById('legend-info-modal');
const closeLegendInfo = document.getElementById('close-legend-info');

legendInfoBtn.addEventListener('click', () => {
  legendInfoModal.classList.replace('hidden', 'flex');
});
closeLegendInfo.addEventListener('click', () => {
  legendInfoModal.classList.replace('flex', 'hidden');
});
legendInfoModal.addEventListener('click', e => {
  if (e.target === legendInfoModal) {
    legendInfoModal.classList.replace('flex', 'hidden');
  }
});

/*==== INIT ====*/
window.addEventListener('DOMContentLoaded',()=>{
  initUserMap();
  initAutocomplete();
  markStep(1);
});
</script>
