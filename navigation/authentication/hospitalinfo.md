---
layout: tailwind
title: Hospitals
permalink: /Hospital
search_exclude: true
menu: nav/home.html 
---

<div class="max-w-7xl mx-auto px-4 py-10">
  <h1 class="text-4xl font-bold text-center text-indigo-700 mb-6">Find the Right Hospital</h1>

  <!-- Search Form -->
  <form id="search-form" class="bg-white p-6 rounded shadow-md mb-8">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <input type="text" id="location" placeholder="Location" class="border p-2 rounded w-full">
      <input type="text" id="specialty" placeholder="Specialty" class="border p-2 rounded w-full">
      <input type="text" id="insurance" placeholder="Insurance" class="border p-2 rounded w-full">
      <input type="text" id="treatment" placeholder="Treatment" class="border p-2 rounded w-full">
      <select id="rating" class="border p-2 rounded w-full">
        <option value="1">Any Rating</option>
        <option value="2">2+ Stars</option>
        <option value="3">3+ Stars</option>
        <option value="4">4+ Stars</option>
        <option value="5">5 Stars Only</option>
      </select>
      <button type="submit" class="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 flex justify-center items-center">
        <span id="search-text">Search</span>
        <svg id="search-loading" class="animate-spin ml-2 h-4 w-4 text-white hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>
    </div>
  </form>

  <!-- Results Section -->
  <div id="results-count" class="text-gray-600 mb-4 text-sm">Loading hospitals...</div>
  <div id="hospital-results" class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="col-span-2 flex justify-center">
      <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
  <div id="pagination" class="flex justify-center mt-8 gap-2"></div>
</div>

<script>
  const pythonURI = "http://127.0.0.1:8115";
  
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('search-form');
    const resultsContainer = document.getElementById('hospital-results');
    const resultsCount = document.getElementById('results-count');
    const pagination = document.getElementById('pagination');
    const searchText = document.getElementById('search-text');
    const searchLoading = document.getElementById('search-loading');
    
    // Initial load of hospitals
    fetchHospitals();
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      fetchHospitals();
    });
    
    function fetchHospitals(page = 1) {
      // Show loading state
      searchText.textContent = page === 1 ? "Searching..." : searchText.textContent;
      searchLoading.classList.remove('hidden');
      resultsContainer.innerHTML = `
        <div class="col-span-2 flex justify-center py-12">
          <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      `;
      resultsCount.textContent = 'Searching hospitals...';
      
      // Build API query parameters
      const params = new URLSearchParams({
        location: document.getElementById('location').value,
        specialty: document.getElementById('specialty').value,
        insurance: document.getElementById('insurance').value,
        treatment: document.getElementById('treatment').value,
        rating: document.getElementById('rating').value,
        page: page
      });
      
      // Make API request
      fetch(`${pythonURI}/api/hospitals?${params.toString()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Reset loading state
          searchText.textContent = "Search";
          searchLoading.classList.add('hidden');
          
          // Update results
          updateResults(data, page);
        })
        .catch(error => {
          console.error('Error fetching hospitals:', error);
          
          // Reset loading state
          searchText.textContent = "Search";
          searchLoading.classList.add('hidden');
          
          // Show error message
          resultsContainer.innerHTML = `
            <div class="col-span-2 bg-white p-8 text-center rounded-lg shadow">
              <svg class="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="mt-2 text-lg font-medium text-gray-900">Error connecting to API</h3>
              <p class="mt-1 text-sm text-gray-500">Please ensure the Flask server is running at ${pythonURI}</p>
              <div class="mt-4">
                <button type="button" id="retry-btn" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Retry Connection
                </button>
              </div>
              <p class="mt-3 text-xs text-gray-500">Error: ${error.message}</p>
            </div>
          `;
          resultsCount.textContent = 'Error loading hospitals';
          
          // Add retry button handler
          document.getElementById('retry-btn').addEventListener('click', () => fetchHospitals(page));
          
          // If API is unavailable, fall back to sample data after delay
          setTimeout(() => {
            if (resultsContainer.querySelector('#retry-btn')) {
              resultsContainer.innerHTML += `
                <div class="col-span-2 mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <p class="text-sm text-yellow-700">Loading sample data instead...</p>
                </div>
              `;
              
              // After another delay, show sample data
              setTimeout(() => loadSampleData(), 1500);
            }
          }, 3000);
        });
    }
    
    function updateResults(data, currentPage) {
      const hospitals = data.hospitals || [];
      const totalResults = data.total_results || 0;
      const totalPages = data.total_pages || 1;
      
      // Update results count
      resultsCount.textContent = `Showing ${hospitals.length} of ${totalResults} hospital${totalResults !== 1 ? 's' : ''}`;
      
      // Clear previous results
      resultsContainer.innerHTML = '';
      
      // If no results found
      if (hospitals.length === 0) {
        resultsContainer.innerHTML = `
          <div class="col-span-2 bg-white p-8 text-center rounded-lg shadow">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-2 text-lg font-medium text-gray-900">No hospitals found</h3>
            <p class="mt-1 text-sm text-gray-500">Try adjusting your search criteria</p>
            <button id="reset-search" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Clear all filters
            </button>
          </div>
        `;
        
        document.getElementById('reset-search').addEventListener('click', function() {
          // Reset all form fields
          form.reset();
          // Fetch all hospitals
          fetchHospitals();
        });
        
        pagination.innerHTML = '';
        return;
      }
      
      // Display hospitals
      hospitals.forEach(hospital => {
        // Generate specialties HTML
        const specialties = hospital.specialties ? hospital.specialties.split(',').map(s => s.trim()).filter(s => s.length > 0) : [];
        const specialtiesHTML = specialties.map(specialty => 
          `<span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">${specialty}</span>`
        ).join('');
        
        // Generate insurance HTML if available
        const insurances = hospital.insurance ? hospital.insurance.split(',').map(i => i.trim()).filter(i => i.length > 0) : [];
        const insurancesHTML = insurances.length > 0 ? 
          `<div class="mt-2">
            <span class="text-xs text-gray-500">Insurance:</span>
            <span class="ml-1 text-xs text-gray-700">${insurances.slice(0, 2).join(', ')}${insurances.length > 2 ? ', ...' : ''}</span>
          </div>` : '';
        
        // Create hospital card
        const hospitalCard = `
          <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
            <div class="md:flex">
              <div class="md:flex-shrink-0">
                <img class="h-48 w-full object-cover md:w-48" src="${hospital.image_url || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}" alt="${hospital.name}">
              </div>
              <div class="p-6">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-900">${hospital.name}</h3>
                    <p class="text-sm text-gray-500">${hospital.location}${hospital.distance ? ` • ${hospital.distance} miles away` : ''}</p>
                  </div>
                  <div class="flex items-center">
                    <span class="text-lg font-bold text-indigo-600">${hospital.rating}</span>
                    <svg class="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="flex flex-wrap gap-2">
                    ${specialtiesHTML}
                  </div>
                  <p class="mt-3 text-sm text-gray-600">${hospital.description || 'No description available.'}</p>
                  ${insurancesHTML}
                  <div class="mt-4 flex justify-between items-center">
                    <div class="text-xs ${hospital.accepting_new_patients ? 'text-green-600' : 'text-orange-600'} font-medium">
                      <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${hospital.accepting_new_patients ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' : 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'}"></path>
                      </svg>
                      ${hospital.accepting_new_patients ? 'Accepting new patients' : 'Not accepting new patients'}
                    </div>
                    <a href="#" data-hospital-id="${hospital.id || ''}" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium hospital-details">View details →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
        resultsContainer.innerHTML += hospitalCard;
      });
      
      // Add event listeners to hospital detail links
      document.querySelectorAll('.hospital-details').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const hospitalId = this.getAttribute('data-hospital-id');
          alert(`View details for hospital ID: ${hospitalId || 'N/A'}\nThis would navigate to a detailed hospital page in a full application.`);
        });
      });
      
      // Update pagination
      renderPagination(currentPage, totalPages);
    }
    
    function renderPagination(currentPage, totalPages) {
      pagination.innerHTML = '';
      
      if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
      }
      
      pagination.style.display = 'flex';
      
      // Previous page button
      if (currentPage > 1) {
        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.className = 'px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50';
        prevButton.innerHTML = 'Previous';
        prevButton.addEventListener('click', function(e) {
          e.preventDefault();
          fetchHospitals(currentPage - 1);
        });
        pagination.appendChild(prevButton);
      }
      
      // Page numbers
      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.className = i === currentPage
          ? 'px-3 py-1 bg-indigo-600 text-white rounded-md'
          : 'px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50';
        
        pageLink.addEventListener('click', function(e) {
          e.preventDefault();
          if (i !== currentPage) {
            fetchHospitals(i);
          }
        });
        
        pagination.appendChild(pageLink);
      }
      
      // Next page button
      if (currentPage < totalPages) {
        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.className = 'px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50';
        nextButton.innerHTML = 'Next';
        nextButton.addEventListener('click', function(e) {
          e.preventDefault();
          fetchHospitals(currentPage + 1);
        });
        pagination.appendChild(nextButton);
      }
    }
    
    // Fallback data for demonstration if API is not available
    function loadSampleData() {
      const sampleData = {
        page: 1,
        total_pages: 3,
        total_results: 8,
        hospitals: [
          {
            id: "1",
            name: "Palomar Medical Center",
            location: "Escondido, CA",
            distance: "2.3",
            specialties: "Trauma Center,Cardiology,Oncology",
            insurance: "Medicare,Blue Cross,Aetna",
            treatments: "Surgery,Physical Therapy,Radiation",
            rating: 4.8,
            accepting_new_patients: true,
            description: "A 288-bed hospital featuring the latest medical technology and nationally recognized care teams."
          },
          {
            id: "2",
            name: "Sharp Memorial Hospital",
            location: "San Diego, CA",
            distance: "5.7",
            specialties: "Neurology,Orthopedics,Women's Health",
            insurance: "Medicare,Cigna,UnitedHealthcare",
            treatments: "Surgery,Rehabilitation,Diagnostics",
            rating: 4.5,
            accepting_new_patients: true,
            description: "Leading the way with advanced technology and specialized care for complex medical conditions."
          },
          {
            id: "3",
            name: "Scripps Mercy Hospital",
            location: "La Jolla, CA",
            distance: "8.2",
            specialties: "Cancer Care,Heart Care,Research",
            insurance: "Blue Shield,Medicare,Kaiser",
            treatments: "Chemotherapy,Heart Surgery,Clinical Trials",
            rating: 4.7,
            accepting_new_patients: true,
            description: "Renowned for cancer treatment, cardiovascular care, and groundbreaking clinical research."
          },
          {
            id: "4",
            name: "UC San Diego Health",
            location: "San Diego, CA",
            distance: "10.5",
            specialties: "Academic Medical Center,Transplant,Pediatrics",
            insurance: "Medicare,Medicaid,Most Major Providers",
            treatments: "Organ Transplantation,Pediatric Services,Research",
            rating: 4.9,
            accepting_new_patients: true,
            description: "Academic medical center providing cutting-edge treatments and pioneering medical research."
          }
        ]
      };
      
      // Update the UI with sample data
      updateResults(sampleData, 1);
      
      // Show "Demo Mode" indicator
      const demoNotice = document.createElement('div');
      demoNotice.className = 'bg-yellow-50 border-yellow-100 border text-yellow-800 text-sm px-4 py-2 rounded-md mt-4 mb-2';
      demoNotice.innerHTML = '<strong>Demo Mode:</strong> Using sample data. API connection failed.';
      resultsContainer.parentNode.insertBefore(demoNotice, resultsContainer);
    }
  });
</script>

<!-- Help Section -->
<div class="bg-white py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="lg:flex lg:items-center lg:justify-between">
      <div class="lg:w-1/2">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Need Help Finding the Right Hospital?</h2>
        <p class="text-lg text-gray-600 mb-6">Our healthcare advisors can help you find the perfect match for your medical needs.</p>
        <div class="flex flex-wrap gap-4">
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call an Advisor
          </button>
          <a href="/MediPulse/hospital-chat" class="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-md font-medium flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Chat Now
          </a>
        </div>
      </div>
      <div class="lg:w-1/3 mt-10 lg:mt-0">
        <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Healthcare advisor" class="rounded-lg shadow-lg">
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
</style>
