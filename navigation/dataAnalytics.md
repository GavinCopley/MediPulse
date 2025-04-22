---
layout: base 
title: Hospital Data Analytics
description: Displaying hospital data from backend CSV
permalink: /analytics
hide: true
menu: nav/home.html
---


<div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <div class="grid grid-cols-1 md:grid-cols-[12rem_1fr] min-h-screen">
    <!-- Sidebar -->
    <!-- Sidebar -->
    <div class="bg-gray-200 dark:bg-gray-800 p-4 shadow-md">
      <div class="flex justify-center mb-6">
        <img class="w-24 h-24 rounded-full border-4 border-gray-800 dark:border-gray-100" src="{{site.baseurl}}/images/logo.png" alt="Profile Picture" />
      </div>
      <nav class="space-y-4 text-center md:text-left">
        <a href="#profile" class="block font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Profile</a>
        <a href="#messages" class="block font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Messages</a>
        <a href="#settings" class="block font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Settings</a>
      </nav>
    </div>
    <!-- Main Content Area -->
    <div class="flex flex-col h-screen">
      <!-- Header -->
      <header class="bg-white dark:bg-gray-800 p-4 shadow-sm">
        <h1 class="text-2xl font-bold text-center">Hospital Data Analytics</h1>
      </header>
<!-- Content -->
      <main class="flex-1 flex flex-col p-4 bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <!-- Status Message -->
        <div id="status-message" class="hidden p-4 mb-4 rounded-lg"></div>

  <!-- Filter Controls -->
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
          <div class="flex flex-col md:flex-row md:items-end gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Filter By:</label>
              <select id="filter-category" class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <option value="all">All Data</option>
                <option value="hospital">Hospital</option>
                <option value="procedure">Procedure</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div id="filter-value-container" class="flex-1 hidden">
              <label class="block text-sm font-medium mb-1">Value:</label>
              <select id="filter-value" class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <!-- Options populated dynamically -->
              </select>
            </div>

            <div class="flex gap-2">
              <button id="apply-filter" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Apply</button>
              <button id="reset-filter" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Reset</button>
            </div>
          </div>
        </div>

        <!-- Table Container -->
        <div class="flex-1 overflow-hidden flex flex-col">
          <!-- Table -->
          <div class="overflow-auto rounded-lg shadow bg-white dark:bg-gray-800 flex-1">
            <table class="min-w-full" id="data-table">
              <thead class="bg-gray-50 dark:bg-gray-700 sticky top-0">
                <!-- Headers -->
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <!-- Rows -->
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
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

  // Show loading state
  function showLoading(message) {
    statusEl.textContent = message;
    statusEl.className = "p-4 mb-4 text-blue-800 bg-blue-100 dark:bg-blue-200 dark:text-blue-800 rounded-lg";
    statusEl.classList.remove("hidden");
  }

  // Show error message
  function showError(message) {
    statusEl.textContent = message;
    statusEl.className = "p-4 mb-4 text-red-800 bg-red-100 dark:bg-red-200 dark:text-red-800 rounded-lg";
    statusEl.classList.remove("hidden");
  }

  // Hide status message
  function hideStatus() {
    statusEl.classList.add("hidden");
  }

  // Fetch data from backend API
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

  // Render the data table
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
    
    // Create headers from first item's keys
    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
      if (key.startsWith('_')) return; // Skip internal fields
      
      const th = document.createElement('th');
      th.className = 'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider';
      th.textContent = formatHeader(key);
      headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);
    
    // Create table rows
    data.forEach(item => {
      const row = document.createElement('tr');
      row.className = 'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors';
      
      Object.entries(item).forEach(([key, value]) => {
        if (key.startsWith('_')) return;
        
        const td = document.createElement('td');
        td.className = 'px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300';

        td.textContent = value !== null ? value : '';
        row.appendChild(td);
      });
      
      tableBody.appendChild(row);
    });
  }

  function formatHeader(key) {
    return key
      .replace(/_/g, ' ')                      // Replace underscores with spaces
      .replace(/([a-z])([A-Z])/g, '$1 $2')     // Add space before capital letters
      .replace(/\b\w/g, l => l.toUpperCase())  // Capitalize first letter of each word
      .trim();
  }

  // Set up filter controls
  function setupFilters() {
    filterCategory.addEventListener('change', () => {
      const category = filterCategory.value;
      
      if (category === 'all') {
        filterValueContainer.classList.add('hidden');
        return;
      }
      
      filterValueContainer.classList.remove('hidden');
      
      // Get unique values for the selected category
      const uniqueValues = [...new Set(allData.map(item => {
        if (category === 'hospital') return item.HOSPITAL || item.HOSPITAL_NAME;
        if (category === 'procedure') return item.PROCEDURE || item.PERFORMANCE_MEASURE;
        if (category === 'rating') return item.RATING;
        return item[category.toUpperCase()];
      }))].filter(Boolean).sort();
      
      // Populate value dropdown
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
      
      // Filter the data
      filteredData = allData.filter(item => {
        const itemValue = category === 'hospital' ? (item.HOSPITAL || item.HOSPITAL_NAME) :
                         category === 'procedure' ? (item.PROCEDURE || item.PERFORMANCE_MEASURE) :
                         item[category.toUpperCase()];
        return itemValue === value;
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

  // Initial data load
  await fetchData();
});
</script>