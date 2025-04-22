---
layout: base
title: Hospitals
permalink: /Hospital
search_exclude: true
menu: nav/home.html 
---

<div class="bg-gradient-to-r from-indigo-600 to-blue-500 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-extrabold text-white text-center">Find the Right Hospital</h1>
    <p class="mt-3 text-xl text-indigo-100 text-center max-w-3xl mx-auto">Search for hospitals based on location, specialty, or treatment</p>
  </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- Search Form -->
  <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input type="text" id="location" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="City, state, or zip code">
      </div>
      <div>
        <label for="specialty" class="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
        <select id="specialty" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="">All Specialties</option>
          <option value="cardiology">Cardiology</option>
          <option value="oncology">Oncology</option>
          <option value="neurology">Neurology</option>
          <option value="orthopedics">Orthopedics</option>
          <option value="pediatrics">Pediatrics</option>
          <option value="emergency">Emergency Medicine</option>
        </select>
      </div>
      <div>
        <label for="insurance" class="block text-sm font-medium text-gray-700 mb-1">Insurance</label>
        <select id="insurance" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="">All Insurance</option>
          <option value="medicare">Medicare</option>
          <option value="medicaid">Medicaid</option>
          <option value="bluecross">Blue Cross Blue Shield</option>
          <option value="aetna">Aetna</option>
          <option value="cigna">Cigna</option>
          <option value="unitedhealth">UnitedHealthcare</option>
        </select>
      </div>
    </div>
    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="treatment" class="block text-sm font-medium text-gray-700 mb-1">Treatment/Procedure</label>
        <input type="text" id="treatment" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Search for specific treatments">
      </div>
      <div>
        <label for="rating" class="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
        <select id="rating" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="1">Any Rating</option>
          <option value="2">2+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="5">5 Stars Only</option>
        </select>
      </div>
    </div>
    <div class="mt-6 flex justify-center">
      <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition duration-150 ease-in-out">
        Search Hospitals
      </button>
    </div>
  </div>

  <!-- Search Results -->
  <h2 class="text-2xl font-bold text-gray-900 mb-6">Top Hospitals Near You</h2>
  
  <!-- Hospital Cards Container -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
    <!-- Hospital 1 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img class="h-48 w-full object-cover md:w-48" src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Palomar Medical Center">
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">Palomar Medical Center</h3>
              <p class="text-sm text-gray-500">Escondido, CA • 2.3 miles away</p>
            </div>
            <div class="flex items-center">
              <span class="text-lg font-bold text-indigo-600">4.8</span>
              <svg class="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Trauma Center</span>
              <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Cardiology</span>
              <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Oncology</span>
            </div>
            <p class="mt-3 text-sm text-gray-600">A 288-bed hospital featuring the latest medical technology and nationally recognized care teams.</p>
            <div class="mt-4 flex justify-between items-center">
              <div class="text-xs text-green-600 font-medium">
                <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Accepting new patients
              </div>
              <a href="#" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View details →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Hospital 2 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img class="h-48 w-full object-cover md:w-48" src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sharp Memorial Hospital">
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">Sharp Memorial Hospital</h3>
              <p class="text-sm text-gray-500">San Diego, CA • 5.7 miles away</p>
            </div>
            <div class="flex items-center">
              <span class="text-lg font-bold text-indigo-600">4.5</span>
              <svg class="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Neurology</span>
              <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Orthopedics</span>
              <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Women's Health</span>
            </div>
            <p class="mt-3 text-sm text-gray-600">Leading the way with advanced technology and specialized care for complex medical conditions.</p>
            <div class="mt-4 flex justify-between items-center">
              <div class="text-xs text-green-600 font-medium">
                <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Accepting new patients
              </div>
              <a href="#" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View details →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Hospital 3 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img class="h-48 w-full object-cover md:w-48" src="https://images.unsplash.com/photo-1512678080530-7760d81faba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Scripps Mercy Hospital">
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">Scripps Mercy Hospital</h3>
              <p class="text-sm text-gray-500">La Jolla, CA • 8.2 miles away</p>
            </div>
            <div class="flex items-center">
              <span class="text-lg font-bold text-indigo-600">4.7</span>
              <svg class="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Cancer Care</span>
              <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Heart Care</span>
              <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Research</span>
            </div>
            <p class="mt-3 text-sm text-gray-600">Renowned for cancer treatment, cardiovascular care, and groundbreaking clinical research.</p>
            <div class="mt-4 flex justify-between items-center">
              <div class="text-xs text-green-600 font-medium">
                <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Accepting new patients
              </div>
              <a href="#" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View details →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Hospital 4 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img class="h-48 w-full object-cover md:w-48" src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="UC San Diego Health">
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">UC San Diego Health</h3>
              <p class="text-sm text-gray-500">San Diego, CA • 10.5 miles away</p>
            </div>
            <div class="flex items-center">
              <span class="text-lg font-bold text-indigo-600">4.9</span>
              <svg class="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Academic Medical Center</span>
              <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Transplant</span>
              <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Pediatrics</span>
            </div>
            <p class="mt-3 text-sm text-gray-600">Academic medical center providing cutting-edge treatments and pioneering medical research.</p>
            <div class="mt-4 flex justify-between items-center">
              <div class="text-xs text-green-600 font-medium">
                <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Accepting new patients
              </div>
              <a href="#" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View details →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Pagination -->
  <div class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
      <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing <span class="font-medium">1</span> to <span class="font-medium">4</span> of <span class="font-medium">23</span> results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a href="#" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#" aria-current="page" class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
          <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
          <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
          <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
          <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
          <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
          <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
          <a href="#" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  </div>
  
</div>

<!-- Featured Hospital Stats -->
<div class="bg-indigo-50 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">Hospital Quality Metrics</h2>
    <p class="text-lg text-gray-700 text-center mb-10 max-w-3xl mx-auto">Compare key performance data to find the hospital that meets your needs</p>
    
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6 text-center">
        <div class="text-indigo-600 text-5xl font-bold mb-2">92%</div>
        <p class="text-lg text-gray-600">Patient Satisfaction</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6 text-center">
        <div class="text-indigo-600 text-5xl font-bold mb-2">28</div>
        <p class="text-lg text-gray-600">Average Wait Time (min)</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6 text-center">
        <div class="text-indigo-600 text-5xl font-bold mb-2">98%</div>
        <p class="text-lg text-gray-600">Treatment Success Rate</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6 text-center">
        <div class="text-indigo-600 text-5xl font-bold mb-2">4.8</div>
        <p class="text-lg text-gray-600">Average Rating</p>
      </div>
    </div>
  </div>
</div>

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