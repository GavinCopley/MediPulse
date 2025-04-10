---
layout: base
title: Notebook Showcase
permalink: /notebooks/collection
menu: nav/home.html 
---

<div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-6">Notebook Collection</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Manually add each notebook card -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                    <a href="{{site.baseurl}}/notebooks/data-analytics/" class="hover:text-blue-600 transition-colors duration-300">
                        Analytics of Hospitals
                    </a>
                </h3>
                <p class="text-gray-600 mb-4">Description of data from hospitals we used.</p>
                <div class="flex items-center justify-between mt-4">
                    <span class="text-sm text-gray-500">
                        February 20, 2025
                    </span>
                    <a href="{{ site.baseurl }}/notebooks/pandas" 
                       class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                        View Notebook
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <!-- Hospital Recommendation System card -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                    <a href="{{site.baseurl}}/notebooks/hosp/" class="hover:text-blue-600 transition-colors duration-300">
                        Hospital Recommendation System
                    </a>
                </h3>
                <p class="text-gray-600 mb-4">ML algorithm to recommend hospitals based on user preferences for medical issues, priorities, and distance.</p>
                <div class="flex items-center justify-between mt-4">
                    <span class="text-sm text-gray-500">
                        February 20, 2025
                    </span>
                    <a href="{{ site.baseurl }}/notebooks/hosp" 
                       class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                        View Notebook
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <!-- Add more cards here as you add more notebooks -->
    </div>
</div>