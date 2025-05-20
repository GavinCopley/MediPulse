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
      <h1 class="text-3xl font-bold text-gray-900">Hospital Performance Dashboard</h1>
      <p class="mt-2 text-sm text-gray-500">Interactive metrics based on your selected hospital</p>
    </div>

    <!-- Filter Controls -->
    <div class="bg-white p-6 rounded-lg shadow grid md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700">Select Hospital</label>
        <select id="hospital-select" class="w-full p-2 border border-gray-300 rounded-md"></select>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700">Select Metric</label>
        <select id="metric-select" class="w-full p-2 border border-gray-300 rounded-md">
          <option value="PATIENTS_SEEN">Patient Volume</option>
          <option value="PROCEDURE_COUNT">Procedure Count</option>
          <option value="SATISFACTION_SCORE">Satisfaction Score</option>
        </select>
      </div>
    </div>

    <!-- Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-sm text-gray-500">Video Views</p>
        <p id="card-views" class="text-2xl font-bold text-indigo-600">—</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-sm text-gray-500">Likes</p>
        <p id="card-likes" class="text-2xl font-bold text-indigo-600">—</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-sm text-gray-500">Avg Time Watched</p>
        <p id="card-watch" class="text-2xl font-bold text-indigo-600">—</p>
      </div>
    </div>

    <!-- Activity Bar Chart -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Monthly Activity</h2>
      <canvas id="mainChart" height="300"></canvas>
    </div>

    <!-- Error Message -->
    <div id="error-message" class="text-red-600 text-center hidden">Failed to load hospital data.</div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
<script type="module">
const csvURL = '/data/hospitaldatamodified.csv';

const hospitalSelect = document.getElementById("hospital-select");
const metricSelect = document.getElementById("metric-select");
const errorMsg = document.getElementById("error-message");
const cardViews = document.getElementById("card-views");
const cardLikes = document.getElementById("card-likes");
const cardWatch = document.getElementById("card-watch");

let allData = [];
let mainChart;
const ctx = document.getElementById("mainChart").getContext("2d");

function formatValue(val) {
  return val ? Number(val).toLocaleString() : '—';
}

function normalizeColumns() {
  allData = allData.map(row => {
    const newRow = {};
    for (let key in row) {
      const normalizedKey = key.trim().toUpperCase().replace(/ /g, "_");
      newRow[normalizedKey] = row[key];
    }
    return newRow;
  });
}

function renderCards(data) {
  const views = data.reduce((sum, d) => sum + (parseInt(d.VIEWS) || 0), 0);
  const likes = data.reduce((sum, d) => sum + (parseInt(d.LIKES) || 0), 0);
  const avgWatch = data.length ?
    data.reduce((sum, d) => sum + (parseFloat(d.AVG_TIME_WATCHED) || 0), 0) / data.length : 0;

  cardViews.textContent = formatValue(views);
  cardLikes.textContent = formatValue(likes);
  cardWatch.textContent = avgWatch ? `${avgWatch.toFixed(2)} min` : '—';
}

function renderChart(data, metricLabel) {
  const sorted = data.filter(d => d.DATE || d.TIMESTAMP)
    .sort((a, b) => new Date(a.DATE || a.TIMESTAMP) - new Date(b.DATE || b.TIMESTAMP));
  const labels = sorted.map(d => {
    const dt = new Date(d.DATE || d.TIMESTAMP);
    return dt.toLocaleDateString(undefined, { month: 'short' });
  });
  const values = sorted.map(d => parseFloat(d[metricLabel]) || 0);

  if (mainChart) mainChart.destroy();

  mainChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: metricLabel.replace(/_/g, " "),
        data: values,
        backgroundColor: "#6366F1"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
          title: { display: true, text: "Value" }
        },
        x: {
          title: { display: true, text: "Month" }
        }
      }
    }
  });
}

function updateDashboard() {
  const hospital = hospitalSelect.value;
  const metric = metricSelect.value;

  const data = allData.filter(d =>
    (d.HOSPITAL_NAME || d.HOSPITAL) === hospital
  );

  if (!data.length) {
    errorMsg.classList.remove("hidden");
    return;
  }

  errorMsg.classList.add("hidden");
  renderCards(data);
  renderChart(data, metric);
}

function fetchCSVData() {
  Papa.parse(csvURL, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      allData = results.data;
      normalizeColumns();

      const hospitals = [...new Set(allData.map(d => d.HOSPITAL_NAME || d.HOSPITAL))].sort();
      hospitalSelect.innerHTML = hospitals.map(h => `<option value="${h}">${h}</option>`).join('');

      updateDashboard();
    },
    error: function(err) {
      console.error("CSV Load Error:", err);
      errorMsg.classList.remove("hidden");
    }
  });
}

hospitalSelect.addEventListener("change", updateDashboard);
metricSelect.addEventListener("change", updateDashboard);
fetchCSVData();
</script>
