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
      <!-- Add new search fields for emergency and department -->
      <input type="text" id="department" placeholder="Department" class="border p-2 rounded w-full">
      <select id="rating" class="border p-2 rounded w-full">
        <option value="1">Any Rating</option>
        <option value="2">2+ Stars</option>
        <option value="3">3+ Stars</option>
        <option value="4">4+ Stars</option>
        <option value="5">5 Stars Only</option>
      </select>
      <div class="flex items-center">
        <input type="checkbox" id="emergency" class="mr-2 h-4 w-4 text-indigo-600">
        <label for="emergency" class="text-gray-700">Emergency Services</label>
      </div>
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
    <template id="skeleton-loader">
      <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 animate-pulse">
        <div class="md:flex">
          <div class="md:flex-shrink-0">
            <div class="h-48 w-full md:w-48 bg-gray-200"></div>
          </div>
          <div class="p-6 w-full">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div class="flex flex-wrap gap-2 mb-4">
              <div class="h-6 bg-gray-200 rounded w-16"></div>
              <div class="h-6 bg-gray-200 rounded w-20"></div>
            </div>
            <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-full mb-4"></div>
            <div class="flex justify-between items-center mt-4">
              <div class="h-3 bg-gray-200 rounded w-24"></div>
              <div class="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <div id="pagination" class="flex justify-center mt-8 gap-2"></div>
  
  <!-- Hospital Details Modal -->
  <div id="hospital-modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen p-4">
      <!-- Modal Background Overlay -->
      <div id="modal-backdrop" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      
      <!-- Modal Content -->
      <div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10">
        <!-- Modal Header -->
        <div class="sticky top-0 z-10 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h3 id="modal-title" class="text-lg font-medium text-gray-900">Hospital Details</h3>
          <button id="close-modal" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Modal Body -->
        <div id="modal-content" class="p-6">
          <div class="flex justify-center">
            <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  const pythonURI = "http://127.0.0.1:8115/";
  
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('search-form');
    const resultsContainer = document.getElementById('hospital-results');
    const resultsCount = document.getElementById('results-count');
    const pagination = document.getElementById('pagination');
    const searchText = document.getElementById('search-text');
    const searchLoading = document.getElementById('search-loading');
    
    // Modal elements
    const hospitalModal = document.getElementById('hospital-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const closeModal = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    // Modal event listeners
    closeModal.addEventListener('click', hideModal);
    modalBackdrop.addEventListener('click', hideModal);
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !hospitalModal.classList.contains('hidden')) {
        hideModal();
      }
    });
    
    function showModal() {
      hospitalModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
    
    function hideModal() {
      hospitalModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      modalTitle.textContent = 'Hospital Details';
      modalContent.innerHTML = `
        <div class="flex justify-center">
          <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      `;
    }
    
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
        department: document.getElementById('department').value,
        page: page
      });
      
      // Add emergency services filter if checked
      if (document.getElementById('emergency').checked) {
        params.append('emergency', 'yes');
      }
      
      // Make API request
      fetch(`${pythonURI}/api/hospital-search?${params.toString()}`)
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
        
        // Check for emergency services
        const hasEmergency = hospital.emergency_services && hospital.emergency_services.toLowerCase().includes("24/7");
        const emergencyBadge = hasEmergency ? 
          `<span class="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl">24/7 Emergency</span>` : '';
        
        // Create hospital card
        const hospitalCard = `
          <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300 relative">
            ${emergencyBadge}
            <div class="md:flex">
              <div class="md:flex-shrink-0">
                <img class="h-48 w-full object-cover md:w-48" src="${hospital.image || `${pythonURI}/api/hospital-search/image/${encodeURIComponent(hospital.name)}`}" alt="${hospital.name}" onerror="this.src='https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
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
                    <div class="text-xs ${hospital.accepting === 'Yes' ? 'text-green-600' : 'text-orange-600'} font-medium">
                      <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${hospital.accepting === 'Yes' ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' : 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'}"></path>
                      </svg>
                      ${hospital.accepting === 'Yes' ? 'Accepting new patients' : 'Not accepting new patients'}
                    </div>
                    <button data-hospital-name="${hospital.name}" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium hospital-details">View details →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
        resultsContainer.innerHTML += hospitalCard;
      });
      
      // Add event listeners to hospital detail links
      document.querySelectorAll('.hospital-details').forEach(button => {
        button.addEventListener('click', function() {
          const hospitalName = this.getAttribute('data-hospital-name');
          if (hospitalName) {
            fetchHospitalDetails(hospitalName);
          }
        });
      });
      
      // Update pagination
      renderPagination(currentPage, totalPages);
    }
    
    function fetchHospitalDetails(hospitalName) {
      // Show modal with loading state
      showModal();
      modalTitle.textContent = hospitalName;
      
      // Make API request for hospital details with real-time info
      fetch(`${pythonURI}/api/hospital-search/${encodeURIComponent(hospitalName)}?real_time=true`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.status === 'success' && data.hospital) {
            displayHospitalDetails(data.hospital, data.real_time_info);
          } else {
            throw new Error('Hospital details not found');
          }
        })
        .catch(error => {
          console.error('Error fetching hospital details:', error);
          modalContent.innerHTML = `
            <div class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="mt-2 text-lg font-medium text-gray-900">Failed to load hospital details</h3>
              <p class="mt-1 text-sm text-gray-500">${error.message}</p>
              <button id="modal-retry-btn" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Retry
              </button>
            </div>
          `;
          
          document.getElementById('modal-retry-btn').addEventListener('click', () => {
            fetchHospitalDetails(hospitalName);
          });
        });
    }
    
    function displayHospitalDetails(hospital, realTimeInfo) {
      // Format departments as list items if available
      const departments = hospital.departments ? hospital.departments.split(',').map(d => d.trim()).filter(d => d.length > 0) : [];
      const departmentsHTML = departments.length > 0 ?
        `<div class="mb-6">
          <h4 class="font-medium text-gray-900 mb-2">Departments</h4>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
            ${departments.map(dept => `<li class="flex items-center">
              <svg class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ${dept}
            </li>`).join('')}
          </ul>
        </div>` : '';

      // Format visiting hours
      const visitingHours = hospital.visiting_hours || 'Not specified';
      
      // Format contact information
      const phoneNumber = hospital.phone || 'Not available';
      const email = hospital.email || 'Not available';
      const website = hospital.website ? `<a href="${hospital.website}" target="_blank" class="text-indigo-600 hover:underline">${hospital.website}</a>` : 'Not available';
      
      // Format accessibility information
      const accessibility = hospital.parking_accessibility || 'Information not available';
      
      // Format reviews if available
      const reviews = hospital.patient_review ? hospital.patient_review.split('|').map(r => r.trim()).filter(r => r.length > 0) : [];
      const reviewsHTML = reviews.length > 0 ?
        `<div class="mb-6 border-t border-gray-200 pt-6">
          <h4 class="font-medium text-gray-900 mb-4">Patient Reviews</h4>
          ${reviews.map(review => {
            // Parse review - assume format "Name: Comment" or just "Comment"
            const parts = review.includes('–') ? review.split('–', 2) : ['Anonymous', review];
            const name = parts[0].trim();
            const comment = parts[1].trim();
            
            return `<div class="mb-4 bg-gray-50 p-4 rounded">
              <p class="text-sm italic text-gray-600">"${comment}"</p>
              <p class="text-xs text-gray-500 mt-2">— ${name}</p>
            </div>`;
          }).join('')}
        </div>` : '';
      
      // Format real-time information if available
      let realTimeInfoHTML = '';
      if (realTimeInfo && !realTimeInfo.error) {
        realTimeInfoHTML = `
          <div class="mb-8 border-t border-gray-200 pt-8">
            <div class="flex items-center mb-6">
              <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-3 mr-4 shadow-md">
                <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-xl text-gray-800">AI-Powered Hospital Insights</h4>
                <p class="text-gray-500 text-sm">Up-to-date information about this hospital</p>
              </div>
              <span class="ml-auto px-3 py-1.5 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full shadow-sm border border-indigo-200">Powered by Gemini</span>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
              ${realTimeInfo.achievements && realTimeInfo.achievements.length > 0 ? `
                <div class="bg-gradient-to-b from-amber-50 to-white rounded-xl p-6 shadow-md border border-amber-100 transform transition-all hover:shadow-lg">
                  <div class="flex items-center mb-4">
                    <div class="p-2 bg-amber-100 rounded-lg mr-3 shadow-sm">
                      <svg class="h-5 w-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                    <h5 class="font-bold text-amber-900">Notable Achievements</h5>
                  </div>
                  <ul class="space-y-3">
                    ${Array.isArray(realTimeInfo.achievements) ? 
                      realTimeInfo.achievements.map(item => `
                        <li class="flex items-start rounded-lg p-2 hover:bg-amber-50 transition-colors">
                          <svg class="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                          <span class="text-gray-800 leading-relaxed">
                            ${typeof item === 'object' ? 
                              (item.name || item.title || '') + 
                              (item.year ? ` (${item.year})` : '') + 
                              (item.description ? `: ${item.description}` : '') : 
                              item}
                          </span>
                        </li>
                      `).join('') :
                      `<li class="flex items-start rounded-lg p-2 bg-amber-50">
                        <svg class="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-gray-800 leading-relaxed">
                          ${typeof realTimeInfo.achievements === 'object' ? 
                            (realTimeInfo.achievements.name || realTimeInfo.achievements.title || '') + 
                            (realTimeInfo.achievements.year ? ` (${realTimeInfo.achievements.year})` : '') + 
                            (realTimeInfo.achievements.description ? `: ${realTimeInfo.achievements.description}` : '') : 
                            realTimeInfo.achievements}
                        </span>
                      </li>`
                    }
                  </ul>
                </div>` : ''}
                
              ${realTimeInfo.technology && realTimeInfo.technology.length > 0 ? `
                <div class="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 shadow-md border border-blue-100 transform transition-all hover:shadow-lg">
                  <div class="flex items-center mb-4">
                    <div class="p-2 bg-blue-100 rounded-lg mr-3 shadow-sm">
                      <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h5 class="font-bold text-blue-900">Advanced Technology & Facilities</h5>
                  </div>
                  <ul class="space-y-3">
                    ${Array.isArray(realTimeInfo.technology) ? 
                      realTimeInfo.technology.map(item => `
                        <li class="flex items-start rounded-lg p-2 hover:bg-blue-50 transition-colors">
                          <svg class="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                          <span class="text-gray-800 leading-relaxed">${typeof item === 'object' ? (item.title || item.text || JSON.stringify(item)) : item}</span>
                        </li>
                      `).join('') :
                      `<li class="flex items-start rounded-lg p-2 bg-blue-50">
                        <svg class="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-gray-800 leading-relaxed">${typeof realTimeInfo.technology === 'object' ? (realTimeInfo.technology.title || realTimeInfo.technology.text || JSON.stringify(realTimeInfo.technology)) : realTimeInfo.technology}</span>
                      </li>`
                    }
                  </ul>
                </div>` : ''}
              
              ${realTimeInfo.programs && realTimeInfo.programs.length > 0 ? `
                <div class="bg-gradient-to-b from-green-50 to-white rounded-xl p-6 shadow-md border border-green-100 transform transition-all hover:shadow-lg">
                  <div class="flex items-center mb-4">
                    <div class="p-2 bg-green-100 rounded-lg mr-3 shadow-sm">
                      <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <h5 class="font-bold text-green-900">Special Programs</h5>
                  </div>
                  <ul class="space-y-3">
                    ${Array.isArray(realTimeInfo.programs) ? 
                      realTimeInfo.programs.map(item => `
                        <li class="flex items-start rounded-lg p-2 hover:bg-green-50 transition-colors">
                          <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                          <span class="text-gray-800 leading-relaxed">${typeof item === 'object' ? (item.title || item.text || JSON.stringify(item)) : item}</span>
                        </li>
                      `).join('') :
                      `<li class="flex items-start rounded-lg p-2 bg-green-50">
                        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-gray-800 leading-relaxed">${typeof realTimeInfo.programs === 'object' ? (realTimeInfo.programs.title || realTimeInfo.programs.text || JSON.stringify(realTimeInfo.programs)) : realTimeInfo.programs}</span>
                      </li>`
                    }
                  </ul>
                </div>` : ''}
                
              ${realTimeInfo.community_initiatives && realTimeInfo.community_initiatives.length > 0 ? `
                <div class="bg-gradient-to-b from-purple-50 to-white rounded-xl p-6 shadow-md border border-purple-100 transform transition-all hover:shadow-lg">
                  <div class="flex items-center mb-4">
                    <div class="p-2 bg-purple-100 rounded-lg mr-3 shadow-sm">
                      <svg class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h5 class="font-bold text-purple-900">Community Initiatives</h5>
                  </div>
                  <ul class="space-y-3">
                    ${Array.isArray(realTimeInfo.community_initiatives) ? 
                      realTimeInfo.community_initiatives.map(item => `
                        <li class="flex items-start rounded-lg p-2 hover:bg-purple-50 transition-colors">
                          <svg class="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                          <span class="text-gray-800 leading-relaxed">${typeof item === 'object' ? (item.title || item.text || JSON.stringify(item)) : item}</span>
                        </li>
                      `).join('') :
                      `<li class="flex items-start rounded-lg p-2 bg-purple-50">
                        <svg class="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-gray-800 leading-relaxed">${typeof realTimeInfo.community_initiatives === 'object' ? (realTimeInfo.community_initiatives.title || realTimeInfo.community_initiatives.text || JSON.stringify(realTimeInfo.community_initiatives)) : realTimeInfo.community_initiatives}</span>
                      </li>`
                    }
                  </ul>
                </div>` : ''}
            </div>

            <div class="mt-6 bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 rounded-xl p-4 text-sm border border-indigo-200 flex items-center shadow-sm">
              <svg class="h-6 w-6 text-indigo-700 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
              <div>
                <p class="font-semibold text-indigo-900 mb-1">AI-Generated Information</p>
                <p class="text-indigo-800">This information is automatically compiled from public sources and updated periodically. Last updated: ${new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</p>
              </div>
            </div>
          </div>
        `;
      } else if (realTimeInfo && realTimeInfo.error) {
        realTimeInfoHTML = `
          <div class="mb-6 border-t border-gray-200 pt-6">
            <div class="bg-yellow-50 rounded-xl p-5 text-sm flex items-center shadow-md border border-yellow-200">
              <svg class="h-8 w-8 text-yellow-500 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m-1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="font-bold text-yellow-800 text-lg mb-1">Additional hospital information temporarily unavailable</p>
                <p class="text-yellow-700">We're working to restore our AI-powered insights. Please check back later for up-to-date information about this hospital's achievements, technology, and community programs.</p>
              </div>
            </div>
          </div>
        `;
      }

      // Additional ratings
      let additionalRatingsHTML = '';
      if (hospital.additional_ratings) {
        additionalRatingsHTML = `
          <div class="mb-6">
            <h5 class="text-sm font-medium text-gray-800 mb-2">Awards & Recognitions</h5>
            <div class="bg-green-50 text-green-800 text-xs font-semibold px-3 py-2 rounded-md">
              ${hospital.additional_ratings}
            </div>
          </div>
        `;
      }
      
      // Build the complete modal content
      modalContent.innerHTML = `
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/2 pr-0 md:pr-6">
            <img src="${hospital.image || `${pythonURI}/api/hospital-search/image/${encodeURIComponent(hospital.name)}`}" 
                 alt="${hospital.name}" 
                 class="rounded-lg w-full h-64 object-cover mb-6"
                 onerror="this.src='https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
            
            <div class="mb-6">
              <h4 class="font-medium text-gray-900 mb-2">About</h4>
              <p class="text-gray-600">${hospital.description || 'No description available.'}</p>
            </div>
            
            ${additionalRatingsHTML}
            
            ${departmentsHTML}
            
            <div class="mb-6">
              <h4 class="font-medium text-gray-900 mb-2">Insurance Accepted</h4>
              <p class="text-gray-600">${hospital.insurance || 'Information not available'}</p>
            </div>
          </div>
          
          <div class="md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 pl-0 md:pl-6 pt-6 md:pt-0">
            <div class="flex items-center mb-4">
              <div class="bg-indigo-100 rounded-full p-2 mr-3">
                <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Location</p>
                <p class="text-sm text-gray-600">${hospital.location}</p>
              </div>
            </div>
            
            <div class="flex items-center mb-4">
              <div class="bg-indigo-100 rounded-full p-2 mr-3">
                <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Visiting Hours</p>
                <p class="text-sm text-gray-600">${visitingHours}</p>
              </div>
            </div>
            
            <div class="flex items-center mb-4">
              <div class="bg-indigo-100 rounded-full p-2 mr-3">
                <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Phone</p>
                <p class="text-sm text-gray-600">${phoneNumber}</p>
              </div>
            </div>
            
            <div class="flex items-center mb-4">
              <div class="bg-indigo-100 rounded-full p-2 mr-3">
                <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Email</p>
                <p class="text-sm text-gray-600">${email}</p>
              </div>
            </div>
            
            <div class="flex items-center mb-4">
              <div class="bg-indigo-100 rounded-full p-2 mr-3">
                <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c-1.657 0-3-4.03-3-9s1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Website</p>
                <p class="text-sm text-gray-600">${website}</p>
              </div>
            </div>
            
            <div class="flex items-center mb-4">
              <div class="bg-indigo-100 rounded-full p-2 mr-3">
                <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M13 16h-1v-4h-1m-1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Parking & Accessibility</p>
                <p class="text-sm text-gray-600">${accessibility}</p>
              </div>
            </div>
            
            <div class="mb-6">
              <h4 class="font-medium text-gray-900 mb-2">Emergency Services</h4>
              <p class="text-gray-600 flex items-center">
                ${hospital.emergency_services && hospital.emergency_services.includes("24/7") ? 
                  `<svg class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                   </svg> Available 24/7` : 
                  `<svg class="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                   </svg> Not available`
                }
              </p>
            </div>
            
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <div>
                <div class="flex items-center">
                  <span class="text-lg font-bold text-indigo-600">${hospital.rating}</span>
                  <svg class="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span class="ml-1 text-sm text-gray-500">Overall Rating</span>
                </div>
              </div>
              <div class="text-sm ${hospital.accepting === 'Yes' ? 'text-green-600' : 'text-orange-600'} font-medium">
                ${hospital.accepting === 'Yes' ? 'Accepting new patients' : 'Not accepting new patients'}
              </div>
            </div>
          </div>
        </div>
        
        ${realTimeInfoHTML}
        ${reviewsHTML}
        
        <div class="border-t border-gray-200 pt-6">
          <div class="flex justify-center">
            <a href="tel:${hospital.phone}" class="mx-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium">
              Call Hospital
            </a>
            <a href="https://maps.google.com/?q=${encodeURIComponent(hospital.name + ' ' + hospital.location)}" target="_blank" 
               class="mx-2 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded font-medium">
              Get Directions
            </a>
          </div>
        </div>
      `;
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
            description: "A 288-bed hospital featuring the latest medical technology and nationally recognized care teams.",
            emergency_services: "Yes",
            departments: "Cardiology,Oncology,Neurology,Orthopedics",
            visiting_hours: "9:00 AM - 8:00 PM Daily",
            phone: "(760) 739-3000",
            website: "https://www.palomarhealth.org",
            email: "info@palomarhealth.org"
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
            description: "Leading the way with advanced technology and specialized care for complex medical conditions.",
            emergency_services: "Yes",
            departments: "Neurology,Orthopedics,Women's Health,Cardiology"
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
            description: "Renowned for cancer treatment, cardiovascular care, and groundbreaking clinical research.",
            emergency_services: "Yes"
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
            description: "Academic medical center providing cutting-edge treatments and pioneering medical research.",
            emergency_services: "Yes"
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
  
  body.overflow-hidden {
    overflow: hidden;
  }
  
  #hospital-modal {
    transition: opacity 0.3s ease;
  }
  
  #hospital-modal.hidden {
    display: none;
    opacity: 0;
  }
</style>