---
layout: base
title: Optimization
permalink: /optimize/
search_exclude: true
menu: nav/home.html
---

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Hospital Video Optimizer</title>
</head>

<body class="light-mode">
  <section class="section mt-8">
    <div class="container">
      <h1 class="text-4xl font-bold text-center mb-5 text-indigo-700">
        <i class="fa-solid fa-chart-line text-indigo-600 mr-2"></i> Hospital Video Optimiser
      </h1>
      <p class="text-xl text-center text-gray-600 mb-12">Choose your optimization tool</p>
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-col md:flex-row gap-8 justify-center">
          <!-- Generate Tool Card -->
          <div class="w-full md:w-1/2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <a href="{{site.baseurl}}/optimize/generate/" class="block h-full">
              <div class="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <i class="fa-solid fa-wand-magic-sparkles text-white text-6xl"></i>
              </div>
              <div class="p-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Generate</h2>
                <p class="text-gray-600 mb-4">Create new optimized video content with AI-powered insights. Perfect for planning new videos.</p>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <i class="fa-solid fa-check text-green-500 mr-2"></i>
                    <span class="text-gray-700">Engagement predictions</span>
                  </div>
                  <div class="flex items-center">
                    <i class="fa-solid fa-check text-green-500 mr-2"></i>
                    <span class="text-gray-700">AI-generated outlines</span>
                  </div>
                  <div class="flex items-center">
                    <i class="fa-solid fa-check text-green-500 mr-2"></i>
                    <span class="text-gray-700">Compare with high-performing videos</span>
                  </div>
                </div>
                <div class="mt-8 text-center">
                  <span class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Start Creating
                    <i class="fa-solid fa-arrow-right ml-2"></i>
                  </span>
                </div>
              </div>
            </a>
          </div>
          <!-- Edit Tool Card -->
          <div class="w-full md:w-1/2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <a href="{{site.baseurl}}/optimize/edit/" class="block h-full">
              <div class="h-48 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <i class="fa-solid fa-pen-to-square text-white text-6xl"></i>
              </div>
              <div class="p-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Edit</h2>
                <p class="text-gray-600 mb-4">Improve existing video content with targeted optimization suggestions. Perfect for enhancing performance.</p>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <i class="fa-solid fa-check text-green-500 mr-2"></i>
                    <span class="text-gray-700">Analyze current performance</span>
                  </div>
                  <div class="flex items-center">
                    <i class="fa-solid fa-check text-green-500 mr-2"></i>  
                    <span class="text-gray-700">Receive targeted improvement tips</span>
                  </div>
                  <div class="flex items-center">
                    <i class="fa-solid fa-check text-green-500 mr-2"></i>
                    <span class="text-gray-700">Optimize metadata and keywords</span>
                  </div>
                </div>
                <div class="mt-8 text-center">
                  <span class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Start Editing
                    <i class="fa-solid fa-arrow-right ml-2"></i>
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</body>
</html>