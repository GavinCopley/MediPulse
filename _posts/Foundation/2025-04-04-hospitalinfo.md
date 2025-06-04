---
layout: tailwind
title: Hospital Info Feature
description: Advanced hospital search and comparison tool
menu: nav/home.html
permalink: /notebooks/hospital-info/
---

<div class="max-w-4xl mx-auto px-4 py-8">
  <div class="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg shadow-lg p-6 mb-10">
    <h1 class="text-3xl md:text-4xl font-bold text-white mb-3">Hospital Search Feature</h1>
    <p class="text-indigo-100 text-lg">Find and compare healthcare facilities to make informed decisions</p>
  </div>

  <div class="prose prose-lg max-w-none mb-12">
    <p class="text-gray-700 leading-relaxed">
      The <span class="font-semibold text-indigo-600">MediPulse Hospital Info</span> feature enables users to search, filter, and compare hospitals based on location, specialty, insurance coverage, and more. This documentation provides an overview of the interface, features, and implementation details.
    </p>
  </div>

  <div class="mb-16 bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
      <h2 class="text-2xl font-bold text-indigo-800 flex items-center">
        <svg class="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
        Interface Overview
      </h2>
    </div>

    <div class="p-6">
      <div class="mb-6 border rounded-lg overflow-hidden shadow-sm">
        <img src="https://i.postimg.cc/mhdDc0jS/hospital-info-screenshot.png" alt="Hospital Info Page" class="w-full h-auto">
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-blue-50 rounded-lg p-5 border border-blue-100">
          <h3 class="text-xl font-semibold text-blue-800 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Key Components
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Advanced search form with multiple filter options</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Responsive hospital results with visual cards</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Detailed hospital modal with comprehensive information</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>AI-powered hospital insights via Gemini integration</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Pagination system for browsing multiple results</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-green-50 rounded-lg p-5 border border-green-100">
          <h3 class="text-xl font-semibold text-green-800 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            User Benefits
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Filter hospitals by multiple criteria including location, specialty, insurance, and treatment</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>View real-time, AI-generated information about hospital achievements and services</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Compare hospitals based on patient reviews and ratings</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Access detailed information about facilities, visiting hours, and contact details</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-16 bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
      <h2 class="text-2xl font-bold text-indigo-800 flex items-center">
        <svg class="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
        Implementation Details
      </h2>
    </div>

    <div class="p-6">
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-blue-50 rounded-lg p-5 border border-blue-100">
          <h3 class="text-xl font-semibold text-blue-800 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Frontend Components
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Search form with multiple input fields and filters</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Card-based hospital results with responsive grid layout</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Modal dialog for detailed hospital information</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Loading states with skeleton placeholders</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Gemini AI-powered insights section with color-coded categories</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-purple-50 rounded-lg p-5 border border-purple-100">
          <h3 class="text-xl font-semibold text-purple-800 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
            </svg>
            Backend Integration
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>REST API endpoints for searching and retrieving hospital data</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Gemini integration for real-time hospital information</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Local storage caching for better performance</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Fallback mechanisms to handle API failures</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="mt-8 bg-amber-50 rounded-lg p-5 border border-amber-100">
        <h3 class="text-xl font-semibold text-amber-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Key API Endpoints
        </h3>
        
        <div class="bg-white rounded-md shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-800">/api/hospital-search</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">GET</td>
                  <td class="px-6 py-4 text-sm text-gray-600">Search hospitals with multiple filter parameters</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-800">/api/hospital-search/:name</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">GET</td>
                  <td class="px-6 py-4 text-sm text-gray-600">Get detailed information about a specific hospital</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-800">/api/hospital-search/realtime/:name</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">GET</td>
                  <td class="px-6 py-4 text-sm text-gray-600">Get AI-generated insights about a hospital using Gemini</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-16 bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
      <h2 class="text-2xl font-bold text-indigo-800 flex items-center">
        <svg class="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
        Feature Highlights
      </h2>
    </div>

    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="p-2 bg-indigo-100 rounded-full mr-3">
              <svg class="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="font-bold text-lg text-gray-900">Advanced Filtering</h3>
          </div>
          <p class="text-gray-600 mb-3">Users can search for hospitals using multiple criteria including location, specialty, insurance coverage, treatments, and minimum rating.</p>
        </div>
        
        <div class="bg-white rounded-lg p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="p-2 bg-indigo-100 rounded-full mr-3">
              <svg class="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-bold text-lg text-gray-900">AI-Powered Insights</h3>
          </div>
          <p class="text-gray-600 mb-3">Integration with Google's Gemini AI provides up-to-date information about hospital achievements, technologies, programs, and community initiatives.</p>
        </div>
        
        <div class="bg-white rounded-lg p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="p-2 bg-indigo-100 rounded-full mr-3">
              <svg class="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
            <h3 class="font-bold text-lg text-gray-900">Responsive Design</h3>
          </div>
          <p class="text-gray-600 mb-3">The interface adapts seamlessly between desktop and mobile views, ensuring a consistent experience across all devices.</p>
        </div>
      </div>

      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-5 shadow-md border border-indigo-100">
          <h3 class="font-bold text-lg text-indigo-900 mb-3">Hospital Cards</h3>
          <p class="text-gray-700 mb-3">Each hospital result is displayed in a comprehensive card showing:</p>
          <ul class="space-y-2">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Hospital name, location, and distance</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Rating with visual stars</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Specialties with visual tags</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Emergency services badge (if available)</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 shadow-md border border-purple-100">
          <h3 class="font-bold text-lg text-purple-900 mb-3">Hospital Details Modal</h3>
          <p class="text-gray-700 mb-3">The detailed view provides comprehensive information:</p>
          <ul class="space-y-2">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Contact information and visiting hours</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Detailed department listings</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Patient reviews and testimonials</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>AI-generated insights with categorized information</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl shadow-lg p-8 mb-6">
    <h2 class="text-2xl font-bold text-indigo-800 mb-4">Future Enhancements</h2>
    <p class="text-gray-700 leading-relaxed mb-6">
      The Hospital Info feature will continue to evolve with the following planned enhancements:
    </p>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div class="bg-white rounded-lg p-4 shadow text-center">
        <div class="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
          </svg>
        </div>
        <h3 class="font-semibold text-indigo-900">User Reviews Integration</h3>
        <p class="text-gray-600 text-sm mt-2">Allow users to leave their own reviews and ratings for hospitals they've visited</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 shadow text-center">
        <div class="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
          </svg>
        </div>
        <h3 class="font-semibold text-indigo-900">Interactive Map View</h3>
        <p class="text-gray-600 text-sm mt-2">Enhanced map integration showing hospital locations with filtering options</p>
      </div>
    </div>
  </div>
  
  <div class="text-center text-gray-500 text-sm">
    <p>MediPulse Hospital Info Feature Documentation • Last Updated: June 4, 2025</p>
  </div>
</div>