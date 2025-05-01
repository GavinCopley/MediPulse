---
layout: tailwind 
title: Hospital Data Analytics
description: Displaying hospital data from backend CSV
permalink: /analytics
hide: true
menu: nav/home.html
---


<style>
  html, body {
    overflow: hidden;
  }
</style>

<div class="min-h-screen bg-indigo-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <div class="flex flex-col min-h-screen">
    <header class="bg-white dark:bg-gray-800 p-4 shadow-sm">
      <h1 class="text-2xl font-bold text-center text-indigo-900">Hospital Data Analytics</h1>
    </header>

    <main class="flex-1 flex flex-col p-4 bg-indigo-50 dark:bg-gray-900 overflow-hidden">
      <div id="status-message" class="hidden p-4 mb-4 rounded-lg"></div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
        <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-end md:gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium mb-1 text-indigo-900">Filter By:</label>
            <select id="filter-category" class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-indigo-200 dark:border-gray-600 text-indigo-900">
              <option value="all">All Data</option>
              <option value="hospital">Hospital</option>
              <option value="procedure">Procedure</option>
            </select>
          </div>

          <div id="filter-value-container" class="flex-1 hidden">
            <label class="block text-sm font-medium mb-1 text-indigo-900">Value:</label>
            <select id="filter-value" class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-indigo-200 dark:border-gray-600 text-indigo-900">
            </select>
          </div>

          <div class="flex gap-2">
            <button id="apply-filter" class="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Apply</button>
            <button id="reset-filter" class="w-full md:w-auto px-4 py-2 border border-indigo-200 dark:border-gray-600 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors text-indigo-900">Reset</button>
          </div>
        </div>
      </div>

      <!-- Scrollable Table Container Only -->
      <div class="rounded-lg shadow bg-white dark:bg-gray-800 overflow-hidden">
        <div class="max-h-[60vh] overflow-y-auto overflow-x-auto">
          <table class="w-full table-auto" id="data-table">
            <thead class="bg-indigo-50 dark:bg-gray-700 sticky top-0 z-10"></thead>
            <tbody class="divide-y divide-indigo-100 dark:divide-gray-700"></tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</div>

<script type="module">
import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('status-message');
  const tableHead = document.querySelector("#data-table thead");
  const tableBody = document.querySelector("#data-table tbody");
  const filterCategory = document.getElementById('filter-category');
  const filterValue = document.getElementById('filter-value');
  const filterValueContainer = document.getElementById('filter-value-container');
  const applyFilter = document.getElementById('apply-filter');
  const resetFilter = document.getElementById('reset-filter');
  
  let allData = [];
  let filteredData = [];

  function showLoading(message) {
    statusEl.textContent = message;
    statusEl.className = "p-4 mb-4 text-indigo-800 bg-indigo-100 dark:bg-indigo-200 dark:text-indigo-800 rounded-lg";
    statusEl.classList.remove("hidden");
  }

  function showError(message) {
    statusEl.textContent = message;
    statusEl.className = "p-4 mb-4 text-red-800 bg-red-100 dark:bg-red-200 dark:text-red-800 rounded-lg";
    statusEl.classList.remove("hidden");
  }

  function hideStatus() {
    statusEl.classList.add("hidden");
  }

  async function fetchData() {
    showLoading("Loading hospital data...");
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    
    try {
      const response = await fetch(`${pythonURI}/api/analytics`, {
        ...fetchOptions,
        method: "GET"
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to load data");
      }
      
      if (result.data && result.data.length > 0) {
        allData = result.data;
        filteredData = [...allData];
        renderTable();
        setupFilters();
        hideStatus();
      } else {
        showError("No data available");
      }
    } catch (error) {
      console.error('Error:', error);
      showError(`Error loading data: ${error.message}`);
      tableBody.innerHTML = `
        <tr>
          <td colspan="100%" class="px-6 py-4 text-center text-gray-500">
            Failed to load data. Please try again later.
          </td>
        </tr>`;
    }
  }

  function renderTable(data = filteredData) {
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="100%" class="px-6 py-4 text-center text-gray-500">
            No matching data found
          </td>
        </tr>`;
      return;
    }

    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
      if (key.startsWith('_')) return;
      const th = document.createElement('th');
      th.className = 'px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-indigo-900 dark:text-indigo-300 uppercase tracking-wider whitespace-nowrap';
      th.textContent = formatHeader(key);
      headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

    data.forEach(item => {
      const row = document.createElement('tr');
      row.className = 'hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors';

      Object.entries(item).forEach(([key, value]) => {
        if (key.startsWith('_')) return;
        const td = document.createElement('td');
        const isHospitalName = key === 'HOSPITAL' || key === 'HOSPITAL_NAME';
        td.className = `px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-indigo-900 dark:text-indigo-300 ${isHospitalName ? 'max-w-[200px] truncate' : 'whitespace-nowrap'}`;
        td.textContent = value !== null ? value : '';
        row.appendChild(td);
      });

      tableBody.appendChild(row);
    });
  }

  function formatHeader(key) {
    return key
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, l => l.toUpperCase())
      .trim();
  }

  function setupFilters() {
    filterCategory.addEventListener('change', () => {
      const category = filterCategory.value;

      if (category === 'all') {
        filterValueContainer.classList.add('hidden');
        return;
      }

      filterValueContainer.classList.remove('hidden');

      const uniqueValues = [...new Set(allData.map(item => {
        if (category === 'hospital') return item.HOSPITAL || item.HOSPITAL_NAME;
        if (category === 'procedure') return item.PROCEDURE || item.PERFORMANCE_MEASURE;
        return item[category.toUpperCase()];
      }))].filter(Boolean).sort();

      filterValue.innerHTML = '';
      uniqueValues.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        filterValue.appendChild(option);
      });
    });

    applyFilter.addEventListener('click', () => {
      const category = filterCategory.value;
      const value = filterValue.value;

      if (category === 'all') {
        filteredData = [...allData];
        renderTable();
        return;
      }

      filteredData = allData.filter(item => {
        if (category === 'hospital') {
          return (item.HOSPITAL || item.HOSPITAL_NAME) === value;
        }
        if (category === 'procedure') {
          return (item.PROCEDURE || item.PERFORMANCE_MEASURE) === value;
        }
        return item[category.toUpperCase()] === value;
      });

      renderTable();
    });

    resetFilter.addEventListener('click', () => {
      filterCategory.value = 'all';
      filterValueContainer.classList.add('hidden');
      filteredData = [...allData];
      renderTable();
    });
  }

  await fetchData();
});
</script>
