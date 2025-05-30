---
layout: tailwind
title: Summary Dashboard
description: Dynamic metric visualization by hospital and YouTube data
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
            <select id="channel1" class="w-full p-2 border border-gray-300 rounded-md"></select>
        </div>
        <div>
            <label class="block text-sm font-medium mb-1 text-gray-700">Channel 2</label>
            <select id="channel2" class="w-full p-2 border border-gray-300 rounded-md"></select>
        </div>
    </div>
    
    <div class="bg-white p-4 rounded-lg shadow mt-6 w-full max-w-4xl mx-auto">
        <div class="relative w-full h-[400px]">
            <canvas id="videoChart"></canvas>
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

let allHospitalData = [];
let hospitalChart;

async function fetchHospitalData() {
  const res = await fetch(`${pythonURI}/api/comparison`, fetchOptions);
  const json = await res.json();
  if (!json.success || !json.data) {
    errorMsg.textContent = "Failed to load hospital data.";
    errorMsg.classList.remove("hidden");
    return;
  }
  allHospitalData = normalize(json.data);
  const hospitals = [...new Set(allHospitalData.map(d => d.HOSPITAL))].sort();
  hospital1Select.innerHTML = hospitals.map(h => `<option>${h}</option>`).join('');
  hospital2Select.innerHTML = hospitals.map(h => `<option>${h}</option>`).join('');
  hospital1Select.value = hospitals[0];
  hospital2Select.value = hospitals[1];
  const measures = [...new Set(allHospitalData.map(d => d.PERFORMANCE_MEASURE))];
  measureSelect.innerHTML = measures.map(m => `<option>${m}</option>`).join('');
  updateHospitalChart();
}

function normalize(data) {
  return data.map(row => {
    const clean = {};
    for (let key in row) {
      clean[key.trim().toUpperCase().replace(/ /g, "_")] = row[key];
    }
    return clean;
  });
}

function updateHospitalChart() {
  const h1 = hospital1Select.value;
  const h2 = hospital2Select.value;
  const measure = measureSelect.value;
  const h1Data = allHospitalData.find(d => d.HOSPITAL === h1 && d.PERFORMANCE_MEASURE === measure);
  const h2Data = allHospitalData.find(d => d.HOSPITAL === h2 && d.PERFORMANCE_MEASURE === measure);
  if (!h1Data || !h2Data) return;

  const metrics = ["#_OF_ADVERSE_EVENTS", "#_OF_CASES", "RISK-ADJUSTED_RATE"];
  const labels = ["Adverse Events", "Cases", "Risk-Adjusted Rate"];
  const h1Vals = metrics.map(m => parseFloat(h1Data[m]) || 0);
  const h2Vals = metrics.map(m => parseFloat(h2Data[m]) || 0);

  if (hospitalChart) hospitalChart.destroy();
  hospitalChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: h1, data: h1Vals, backgroundColor: '#4F46E5' },
        { label: h2, data: h2Vals, backgroundColor: '#60A5FA' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        datalabels: {
          anchor: 'end',
          align: 'top',
          formatter: v => v.toFixed(1)
        }
      },
      scales: {
        y: { beginAtZero: true }
      }
    },
    plugins: [ChartDataLabels]
  });
}

// Event Listeners
hospital1Select.addEventListener("change", updateHospitalChart);
hospital2Select.addEventListener("change", updateHospitalChart);
measureSelect.addEventListener("change", updateHospitalChart);

// --- YouTube Logic ---
const channel1Select = document.getElementById("channel1");
const channel2Select = document.getElementById("channel2");
const videoChartCtx = document.getElementById("videoChart").getContext("2d");
let videoChart;

async function fetchChannelFiles() {
  try {
    console.log("Fetching YouTube files from:", `${pythonURI}/api/youtube/files`);
    const res = await fetch(`${pythonURI}/api/youtube/files`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log("Raw response:", res);
    const json = await res.json();
    console.log("YouTube files response:", json);
    
    if (!json.success) {
      console.error("Error fetching files:", json.error);
      return;
    }

    const files = json.files;
    if (!files || files.length === 0) {
      console.log("No YouTube files found");
      return;
    }

    console.log("Found YouTube files:", files);

    // Update dropdowns
    channel1Select.innerHTML = files.map(f => `<option value="${f}">${f.replace('.csv','')}</option>`).join('');
    channel2Select.innerHTML = files.map(f => `<option value="${f}">${f.replace('.csv','')}</option>`).join('');
    channel1Select.value = files[0];
    channel2Select.value = files[1] || files[0];
    
    console.log("Selected initial files:", channel1Select.value, channel2Select.value);
    
    // Update chart with initial data
    await updateVideoChart();
  } catch (error) {
    console.error("Error in fetchChannelFiles:", error);
  }
}

async function fetchChannelData(filename) {
  try {
    console.log("Fetching data for file:", filename);
    const url = `${pythonURI}/api/youtube/data/${filename}`;
    console.log("Request URL:", url);
    const res = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log("Raw response:", res);
    const json = await res.json();
    console.log("Response data:", json);
    
    if (!json.success || !json.data) {
      console.error(`Error fetching data for ${filename}:`, json.error);
      return [];
    }
    return normalize(json.data);
  } catch (error) {
    console.error(`Error fetching channel data for ${filename}:`, error);
    return [];
  }
}

async function updateVideoChart() {
  try {
    const file1 = channel1Select.value;
    const file2 = channel2Select.value;
    
    if (!file1 || !file2) {
      console.error("No files selected for comparison");
      return;
    }
    
    console.log("Fetching data for:", file1, file2);
    
    const [data1, data2] = await Promise.all([
      fetchChannelData(file1),
      fetchChannelData(file2)
    ]);
    
    if (!data1.length || !data2.length) {
      console.error("No data available for comparison");
      return;
    }
    
    console.log("Channel data:", data1, data2);
    
    const extractStats = (data) => {
      const first = data[0] || {};
      const views = parseInt(first.VIEWCOUNT) || 0;
      const likes = parseInt(first.LIKECOUNT) || 0;
      const comments = parseInt(first.COMMENTCOUNT) || 0;
      const likesPerView = views > 0 ? (likes / views * 100).toFixed(2) : 0; // Convert to percentage
      const viewsPerComment = comments > 0 ? Math.round(views / comments) : 0;
      return [
        views,
        likes,
        comments,
        parseFloat(likesPerView),
        viewsPerComment
      ];
    };

    const labels = ["Views", "Likes", "Comments", "Likes/View (%)", "Views/Comment"];
    const stats1 = extractStats(data1);
    const stats2 = extractStats(data2);

    if (videoChart) videoChart.destroy();
    videoChart = new Chart(videoChartCtx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { 
            label: file1.replace('.csv',''), 
            data: stats1, 
            backgroundColor: '#4F46E5',
            borderColor: '#4338CA',
            borderWidth: 1
          },
          { 
            label: file2.replace('.csv',''), 
            data: stats2, 
            backgroundColor: '#60A5FA',
            borderColor: '#3B82F6',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            position: 'top',
            labels: {
              font: {
                size: 14
              }
            }
          },
          tooltip: { 
            mode: 'index', 
            intersect: false,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  const value = context.parsed.y;
                  if (context.dataIndex === 3) { // Likes/View
                    label += value.toFixed(2) + '%';
                  } else {
                    label += value.toLocaleString();
                  }
                }
                return label;
              }
            }
          },
          datalabels: {
            display: false
          }
        },
        scales: {
          y: { 
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                if (value >= 1000) {
                  return (value / 1000).toFixed(1) + 'k';
                }
                return value;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  } catch (error) {
    console.error("Error updating video chart:", error);
  }
}

// YouTube dropdown listeners
channel1Select.addEventListener("change", updateVideoChart);
channel2Select.addEventListener("change", updateVideoChart);

// Tab switching logic
const tabHospital = document.getElementById("tab-hospital");
const tabVideo = document.getElementById("tab-video");
const hospitalSection = document.getElementById("hospital-section");
const videoSection = document.getElementById("video-section");

tabHospital.addEventListener("click", () => {
  hospitalSection.classList.remove("hidden");
  videoSection.classList.add("hidden");
  tabHospital.classList.add("bg-indigo-600", "text-white");
  tabHospital.classList.remove("bg-white", "text-gray-800");
  tabVideo.classList.remove("bg-indigo-600", "text-white");
  tabVideo.classList.add("bg-white", "text-gray-800");
});

tabVideo.addEventListener("click", () => {
  videoSection.classList.remove("hidden");
  hospitalSection.classList.add("hidden");
  tabVideo.classList.add("bg-indigo-600", "text-white");
  tabVideo.classList.remove("bg-white", "text-gray-800");
  tabHospital.classList.remove("bg-indigo-600", "text-white");
  tabHospital.classList.add("bg-white", "text-gray-800");
});

// Init
await fetchHospitalData();
await fetchChannelFiles();
</script>
