---
layout: base
title: Best Hospital for You
permalink: /hospitalforyou
search_exclude: true
menu: nav/home.html 
---

<div class="bg-gradient-to-r from-indigo-600 to-blue-500 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-extrabold text-white text-center">Find the Best Hospital for Your Needs</h1>
    <p class="mt-3 text-xl text-indigo-100 text-center max-w-3xl mx-auto">Using AI and proprietary algorithms will recommend the perfect hospital based on your needs</p>
  </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- Selection Form -->
  <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Left Column (1/2 width) -->
      <div class="md:col-span-2">
        <div class="grid grid-cols-1 gap-10">
          <!-- Medical Issue Dropdown -->
          <div class="w-full">
            <label for="medical-issue" class="block text-lg font-medium text-gray-700 mb-1.5">What is your medical issue?</label>
            <select id="medical-issue" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500">
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
          <div class="w-full">
            <label for="priority" class="block text-lg font-medium text-gray-700 mb-1.5">What's most important to you?</label>
            <select id="priority" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="quality">Quality of Care</option>
              <option value="wait-time">Short Wait Times</option>
              <option value="cost">Affordability</option>
              <option value="technology">Advanced Technology</option>
              <option value="specialists">Specialist Availability</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Right Column (1/2 width) - Location Slider -->
      <div class="md:col-span-2 p-6 bg-gray-50 rounded-lg shadow-inner h-full flex flex-col justify-center">
        <div class="flex items-center mb-4">
          <label for="location-range" class="block text-xl font-medium text-gray-700">How far are you willing to travel?</label>
          <div class="relative ml-2 group">
            <div class="cursor-help w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white">
              <span class="text-xs font-bold">i</span>
            </div>
            <div class="absolute z-10 w-64 p-3 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-sm text-gray-700 -translate-x-1/2 left-1/2 bottom-full mb-2">
              We will only select the best hospitals within the area you select.
              <div class="absolute w-3 h-3 bg-white transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <input type="range" id="location-range" min="5" max="50" value="25" class="w-full h-6 bg-gray-200 rounded-lg appearance-none cursor-pointer">
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
            <span>5 miles</span>
            <span>All of San Diego</span>
          </div>
          <p class="text-lg text-gray-700 mt-4 font-semibold text-center">Current selection: <span id="range-value">25</span> miles</p>
        </div>
      </div>
    </div>
    
    <div class="mt-8 flex justify-center">
      <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition duration-150 ease-in-out">
        Find My Best Hospital Match
      </button>
    </div>
  </div>
  <!-- Results will appear here -->
  <div id="results" class="hidden">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Your Recommended Hospitals</h2>
    <div class="grid grid-cols-1 gap-6">
      <!-- Results will be populated by JavaScript -->
    </div>
  </div>
</div>

<script>
  // Update the range value display
  const rangeSlider = document.getElementById('location-range');
  const rangeValue = document.getElementById('range-value');
  
  rangeSlider.addEventListener('input', function() {
    rangeValue.textContent = this.value;
  });
  
  // Form submission would trigger hospital recommendations
  document.querySelector('button[type="submit"]').addEventListener('click', function() {
    // In a real implementation, this would call an API or process data
    // For now, just show the results section
    document.getElementById('results').classList.remove('hidden');
  }); 
</script>
