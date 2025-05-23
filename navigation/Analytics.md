---
layout: tailwind
title: Summary Dashboard
description: Dynamic metric visualization by hospital and procedure
permalink: /summary
hide: true
menu: nav/home.html
---

<div class="min-h-screen bg-gray-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900">Summary Dashboard</h1>
      <p class="mt-2 text-sm text-gray-500">Select a dataset to explore insights.</p>
    </div>

    <!-- Tabs -->
    <div class="flex space-x-4 justify-center">
      <button id="tab-hospital" class="tab-btn bg-indigo-600 text-white px-4 py-2 rounded">Hospital Data</button>
      <button id="tab-video" class="tab-btn bg-white text-gray-800 border px-4 py-2 rounded">YouTube Data</button>
    </div>

    <!-- Hospital Section -->
    <div id="hospital-section" class="section-panel block">
      <h2 class="text-xl font-semibold text-gray-700 mt-8 mb-4">Compare Hospitals</h2>

      <div class="bg-white p-6 rounded-lg shadow grid md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Hospital 1</label>
          <select id="hospital1-select" class="w-full p-2 border border-gray-300 rounded-md"></select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Hospital 2</label>
          <select id="hospital2-select" class="w-full p-2 border border-gray-300 rounded-md"></select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Performance Measure</label>
          <select id="measure-select" class="w-full p-2 border border-gray-300 rounded-md"></select>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow mt-6 w-full max-w-4xl mx-auto">
        <div class="relative w-full h-[400px]">
          <canvas id="compareChart" class="w-full h-full"></canvas>
        </div>
      </div>

      <div id="error-message" class="text-red-600 text-center hidden mt-4">Failed to load hospital data.</div>
    </div>

    <!-- YouTube Section -->
    <div id="video-section" class="section-panel hidden">
      <h2 class="text-xl font-semibold text-gray-700 mt-8 mb-4">YouTube Channel Comparison</h2>

      <div class="bg-white p-6 rounded-lg shadow grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Channel 1</label>
          <select id="channel1" class="w-full p-2 border border-gray-300 rounded-md">
            <option value="Palomar Health">Palomar Health</option>
            <option value="UCSD Health">UCSD Health</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Channel 2</label>
          <select id="channel2" class="w-full p-2 border border-gray-300 rounded-md">
            <option value="UCSD Health">UCSD Health</option>
            <option value="Palomar Health">Palomar Health</option>
          </select>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow mt-6 w-full max-w-4xl mx-auto">
        <div class="relative w-full h-[400px]">
          <canvas id="videoChart" class="w-full h-full"></canvas>
        </div>
      </div>
    </div>

  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0"></script>
<script type="module">
import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

const hospital1Select = document.getElementById("hospital1-select");
const hospital2Select = document.getElementById("hospital2-select");
const measureSelect = document.getElementById("measure-select");
const errorMsg = document.getElementById("error-message");
const ctx = document.getElementById("compareChart").getContext("2d");

let allData = [];
let chart;

// Fetch data
async function fetchData() {
  try {
    const res = await fetch(`${pythonURI}/api/comparison`, {
      ...fetchOptions,
      method: "GET"
    });
    const json = await res.json();
    if (!json.success || !json.data) throw new Error("Failed to load hospital data.");

    allData = normalizeColumns(json.data);

    const hospitals = [...new Set(allData.map(d => d.HOSPITAL))].filter(Boolean).sort();
    hospital1Select.innerHTML = hospitals.map(h => `<option value="${h}">${h}</option>`).join('');
    hospital2Select.innerHTML = hospitals.map(h => `<option value="${h}">${h}</option>`).join('');
    hospital1Select.value = hospitals[0];
    hospital2Select.value = hospitals[1] || hospitals[0];

    const measures = [...new Set(allData.map(d => d.PERFORMANCE_MEASURE))].filter(Boolean).sort();
    measureSelect.innerHTML = measures.map(m => `<option value="${m}">${m}</option>`).join('');
    measureSelect.value = measures[0];

    updateChart();
  } catch (err) {
    console.error(err);
    errorMsg.textContent = err.message;
    errorMsg.classList.remove("hidden");
  }
}

function normalizeColumns(data) {
  return data.map(row => {
    const newRow = {};
    for (let key in row) {
      const normalized = key.trim().toUpperCase().replace(/ /g, "_");
      newRow[normalized] = row[key];
    }
    return newRow;
  });
}

function getHospitalData(hospital, measure) {
  return allData.find(d =>
    (d.HOSPITAL === hospital || d.HOSPITAL_NAME === hospital) &&
    d.PERFORMANCE_MEASURE === measure
  );
}

function updateChart() {
  const h1 = hospital1Select.value;
  const h2 = hospital2Select.value;
  const measure = measureSelect.value;

  const h1Data = getHospitalData(h1, measure);
  const h2Data = getHospitalData(h2, measure);

  if (!h1Data || !h2Data) {
    errorMsg.textContent = "Data not found for selected inputs.";
    errorMsg.classList.remove("hidden");
    return;
  }
  errorMsg.classList.add("hidden");

  const metrics = ["#_OF_ADVERSE_EVENTS", "#_OF_CASES", "RISK-ADJUSTED_RATE"];
  const labels = ["Adverse Events", "Cases", "Risk-Adjusted Rate"];
  const h1Values = metrics.map(m => parseFloat(h1Data[m]) || 0);
  const h2Values = metrics.map(m => parseFloat(h2Data[m]) || 0);

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: `**${h1}**`, data: h1Values, backgroundColor: '#4F46E5' },
        { label: `**${h2}**`, data: h2Values, backgroundColor: '#60A5FA' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { font: { weight: 'bold' } } },
        tooltip: { mode: 'index', intersect: false },
        datalabels: {
          anchor: 'end',
          align: 'top',
          color: '#374151',
          font: { weight: 'bold' },
          formatter: v => v.toFixed(1)
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Value' }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
}

// Event listeners
hospital1Select.addEventListener("change", updateChart);
hospital2Select.addEventListener("change", updateChart);
measureSelect.addEventListener("change", updateChart);
await fetchData();

// Tab switching
const tabHospital = document.getElementById("tab-hospital");
const tabVideo = document.getElementById("tab-video");
const hospitalSection = document.getElementById("hospital-section");
const videoSection = document.getElementById("video-section");

function switchTab(toHospital) {
  hospitalSection.classList.toggle("hidden", !toHospital);
  videoSection.classList.toggle("hidden", toHospital);
  tabHospital.classList.toggle("bg-indigo-600", toHospital);
  tabHospital.classList.toggle("text-white", toHospital);
  tabHospital.classList.toggle("bg-white", !toHospital);
  tabVideo.classList.toggle("bg-indigo-600", !toHospital);
  tabVideo.classList.toggle("text-white", !toHospital);
  tabVideo.classList.toggle("bg-white", toHospital);
}
tabHospital.addEventListener("click", () => switchTab(true));
tabVideo.addEventListener("click", () => switchTab(false));

// YouTube section
const videoChartCtx = document.getElementById("videoChart").getContext("2d");
let videoChart;
const videoData = {
  "Palomar Health": { views: 27000, likes: 3298, comments: 400 },
  "UCSD Health": { views: 32000, likes: 3100, comments: 480 }
};
function updateVideoChart() {
  const c1 = document.getElementById("channel1").value;
  const c2 = document.getElementById("channel2").value;
  const metrics = ["Views", "Likes", "Comments", "Likes/View", "Views/Comment"];
  const d1 = videoData[c1], d2 = videoData[c2];

  const v1 = [d1.views, d1.likes, d1.comments, d1.likes / d1.views, d1.views / d1.comments];
  const v2 = [d2.views, d2.likes, d2.comments, d2.likes / d2.views, d2.views / d2.comments];

  if (videoChart) videoChart.destroy();

  videoChart = new Chart(videoChartCtx, {
    type: 'bar',
    data: {
      labels: metrics,
      datasets: [
        { label: c1, data: v1, backgroundColor: '#4F46E5' },
        { label: c2, data: v2, backgroundColor: '#60A5FA' }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Value" }
        }
      }
    }
  });
}
document.getElementById("channel1").addEventListener("change", updateVideoChart);
document.getElementById("channel2").addEventListener("change", updateVideoChart);
updateVideoChart();
</script>
