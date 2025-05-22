---
layout: tailwind
title: Optimization
permalink: /optimize/generate/
search_exclude: true
menu: nav/home.html
---

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Hospital Video Optimiser</title>

  <!-- FontAwesome -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
  />
  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700&display=swap" rel="stylesheet">
</head>

<body class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 transition-all duration-300">
  <!-- Loading overlay -->
  <div id="loadingOverlay" class="fixed inset-0 z-50 hidden items-center justify-center bg-white/90 backdrop-blur-sm">
    <div class="text-center">
      <i class="fas fa-circle-notch fa-spin fa-2x mb-3 text-blue-600"></i>
      <div class="text-xl font-semibold text-blue-600">Optimising Your Content...</div>
      <div class="mt-2 text-xs text-gray-500">Processing with AI</div>
    </div>
  </div>

  <!-- Notification container - add after loadingOverlay div -->
  <div id="notification" class="fixed -top-20 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-500 z-50">
    <i class="fas fa-exclamation-circle"></i>
    <span class="notification-message"></span>
  </div>

  <section class="py-12 px-6">
    <div class="container mx-auto max-w-5xl">
      <h1 class="mb-5 text-center text-4xl font-bold text-gray-800">
        <i class="fa-solid fa-chart-line text-blue-600 mr-2"></i> Hospital Video Optimiser
      </h1>
      <p class="mb-10 text-center text-xl text-gray-600">
        Enhance your hospital's video content with AI-powered insights
      </p>
      
      <!-- Instructions Header -->
      <div class="relative mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200">
        <h3 class="mb-3 text-center text-lg font-semibold text-gray-800">How It Works</h3>
        
        <div class="my-4 flex justify-around items-center">
          <div id="instructionStep1" class="flex flex-col items-center relative flex-1 active">
            <div class="instruction-number w-16 h-16 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-xl font-bold text-blue-600 mb-4 relative z-10 active:bg-blue-600 active:text-white">1</div>
            <div class="font-semibold text-center text-gray-800">Describe Video</div>
          </div>
          <div class="w-1/3 h-0.5 bg-gray-200"></div>
          <div id="instructionStep2" class="flex flex-col items-center relative flex-1">
            <div class="instruction-number w-16 h-16 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-xl font-bold text-blue-600 mb-4 relative z-10 active:bg-blue-600 active:text-white">2</div>
            <div class="font-semibold text-center text-gray-800">See Results</div>
          </div>
        </div>
        
        <p class="mt-3 text-center">
          <span id="instructionDetail" class="text-gray-500">Enter the details of your hospital video to receive AI-powered optimization suggestions</span>
        </p>
      </div>

      <!-- Updated FORM (Step 1): Removed Category ID block and changed grid classes -->
      <div id="step1" class="block">
        <div class="rounded-xl bg-white p-6 shadow-md border border-gray-200 transition-all hover:shadow-lg">
          <h2 class="mb-6 font-bold text-gray-800 flex items-center">
            <i class="fas fa-pencil-alt mr-2 text-blue-600"></i>
            Step 1 – Describe your video
          </h2>
          
          <form id="videoForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block mb-2 text-gray-800 font-medium">Platform</label>
                <div class="relative">
                  <select name="platform" disabled class="w-full rounded-lg border border-gray-200 bg-white text-gray-800 py-2 pl-10 pr-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 transition-all">
                    <option value="youtube" selected>YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="instagram">Instagram Reels</option>
                  </select>
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i class="fab fa-youtube text-red-500"></i>
                  </div>
                </div>
                <p class="mt-1 text-sm text-gray-500 italic">Currently only YouTube is supported.</p>
              </div>
              
              <div>
                <label class="block mb-2 text-gray-800 font-medium">Duration (seconds)</label>
                <div class="relative">
                  <input name="duration_sec" type="number" min="5" required
                    class="w-full rounded-lg border border-gray-200 bg-white text-gray-800 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 transition-all" />
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i class="fas fa-clock text-gray-400"></i>
                  </div>
                </div>
                <p class="mt-1 text-sm text-gray-500 italic">Length of your video in seconds</p>
              </div>
            </div>

            <div>
              <label class="block mb-2 text-gray-800 font-medium">Title</label>
              <div class="relative">
                <input name="title" maxlength="100" required placeholder="Enter an engaging title for your video"
                  class="w-full rounded-lg border border-gray-200 bg-white text-gray-800 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 transition-all" />
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i class="fas fa-heading text-gray-400"></i>
                </div>
              </div>
              <p class="mt-1 text-sm text-gray-500 italic">Catchy titles improve click-through rates</p>
            </div>

            <div>
              <label class="block mb-2 text-gray-800 font-medium">Description</label>
              <!-- Added required attribute -->
              <textarea name="description" rows="4" required placeholder="Describe what your video is about..."
                class="w-full rounded-lg border border-gray-200 bg-white text-gray-800 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 transition-all"></textarea>
              <p class="mt-1 text-sm text-gray-500 italic">A thorough description helps with SEO and viewer understanding</p>
            </div>

            <div>
              <label class="block mb-2 text-gray-800 font-medium">Tags <span class="text-gray-500">(pipe-separated)</span></label>
              <div class="relative">
                <textarea name="tags" rows="2" placeholder="cardiology|heart health|angioplasty"
                  class="w-full rounded-lg border border-gray-200 bg-white text-gray-800 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 transition-all"></textarea>
                <div class="absolute top-3 left-0 flex items-center pl-3 pointer-events-none">
                  <i class="fas fa-hashtag text-gray-400"></i>
                </div>
              </div>
              <p class="mt-1 text-sm text-gray-500 italic">Tags help your video appear in searches</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="flex items-center">
                  <input type="checkbox" name="is_hd" checked class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span class="ml-2"><i class="fas fa-tv mr-1"></i> HD video</span>
                </label>
              </div>
              <div>
                <label class="flex items-center">
                  <input type="checkbox" name="has_captions" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span class="ml-2"><i class="fas fa-closed-captioning mr-1"></i> Includes captions</span>
                </label>
              </div>
              <div class="md:col-span-2">
                <label class="block mb-2 text-gray-800 font-medium">
                  <i class="fas fa-calendar-alt mr-1"></i> Publish date/time
                </label>
                <input name="publish_datetime" type="datetime-local"
                  class="w-full rounded-lg border border-gray-200 bg-white text-gray-800 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 transition-all" />
                <p class="mt-1 text-sm text-gray-500 italic">Timing affects viewership</p>
              </div>
            </div>

            <div class="flex justify-end mt-8">
              <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                <span>Optimise</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- RESULTS (Step 2) -->
      <div id="step2" class="hidden">
        <h2 class="mb-6 font-bold text-gray-800 flex items-center">
          <i class="fas fa-chart-line mr-2 text-blue-600"></i>
          Step 2 – Results
        </h2>

        <!-- Engagement Score Card -->
        <div class="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200 transition-all hover:shadow-lg">
          <h3 class="mb-4 font-semibold text-gray-800 flex items-center">
            <i class="fas fa-gauge-high mr-2 text-blue-600"></i> 
            Predicted Engagement
          </h3>
          <div class="w-full flex flex-col md:flex-row items-center gap-6">
            <div class="w-full md:w-1/3">
              <canvas id="engagementChart"></canvas>
            </div>
            <div class="w-full md:w-2/3">
              <div class="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                <div id="engagementProgress" class="absolute inset-0 bg-blue-600 rounded-full" style="width: 0%"></div>
              </div>
              <p class="mt-3 text-center">
                Engagement Score: <strong id="engagementScore" class="text-2xl text-blue-600">N/A</strong> / 100
              </p>
              <p class="text-center text-xs text-gray-500 mt-2">
                Based on machine learning analysis of similar content
              </p>
            </div>
          </div>
        </div>

        <!-- Sample Outlines Tabs -->
        <div class="mb-8 rounded-xl bg-white p-8 shadow-md border border-gray-200">
          <h3 class="mb-4 font-semibold text-gray-800 flex items-center">
            <i class="fas fa-clipboard-list mr-2 text-blue-600"></i> 
            AI-Generated Outlines
          </h3>
          <div class="border-b border-gray-200">
            <ul id="outlineTabs" class="flex flex-wrap justify-center -mb-px">
              <li data-index="0" class="mr-2">
                <a class="inline-block py-2 px-4 border-b-2 border-blue-600 text-blue-600 font-semibold">Outline 1</a>
              </li>
              <li data-index="1" class="mr-2">
                <a class="inline-block py-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700">Outline 2</a>
              </li>
              <li data-index="2">
                <a class="inline-block py-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700">Outline 3</a>
              </li>
            </ul>
          </div>
          <div id="outlinesContainer" class="px-4 py-4">
            <div class="block" data-index="0">
              <ul id="outlineList0" class="pl-5 space-y-2 list-disc"></ul>
            </div>
            <div class="hidden" data-index="1">
              <ul id="outlineList1" class="pl-5 space-y-2 list-disc"></ul>
            </div>
            <div class="hidden" data-index="2">
              <ul id="outlineList2" class="pl-5 space-y-2 list-disc"></ul>
            </div>
          </div>
          <div class="text-center mt-6">
            <button id="reEvalBtn" class="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-lg transition-all hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
              <i class="fas fa-sync-alt"></i>
              <span>Re-evaluate with these changes</span>
            </button>
          </div>
        </div>

        <!-- Improvement Tips Dropdown -->
        <div class="mb-8 bg-white rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4 flex items-center">
            <i class="fas fa-lightbulb mr-2 text-yellow-400"></i> 
            Improvement Tips <span class="text-xs text-gray-500 ml-2">(click to expand)</span>
          </h3>
          <details id="allTipsDropdown" class="group">
            <summary class="cursor-pointer font-semibold text-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 rounded-md py-2 px-4 inline-flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100">
              <span class="flex items-center">
                <span class="transform transition-transform duration-200 group-open:rotate-180 inline-block mr-2">
                  <i class="fas fa-chevron-down text-sm"></i>
                </span>
                Show All Tips
              </span>
            </summary>
            <ul id="allTipsList" class="mt-4 space-y-3 list-none pl-0"></ul>
          </details>
        </div>

        <!-- Similar Videos Filter + Cards -->
        <div class="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200 transition-all hover:shadow-lg">
          <h3 class="mb-4 font-semibold text-gray-800 flex items-center">
            <i class="fas fa-film mr-2 text-blue-600"></i> 
            Similar High-Performing Videos
          </h3>
          <div class="mb-5">
            <div class="relative">
              <input
                type="text"
                id="videoFilter"
                placeholder="Filter by title or tag..."
                class="w-full rounded-lg border border-gray-200 bg-white text-gray-800 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 transition-all"
              />
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
              </div>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer video-filter-clear">
                <i class="fas fa-times-circle text-gray-400 hover:text-gray-600"></i>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="videoCards"></div>
        </div>
        
        <!-- Add back button -->
        <div class="text-center mt-8">
          <button id="goBackBtn" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
            <i class="fas fa-arrow-left"></i>
            <span>Edit Video Details</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const API_BASE_URL = "https://medipulse-832734119496.us-west2.run.app";
      const form = document.getElementById("videoForm");
      const step1 = document.getElementById("step1");
      const step2 = document.getElementById("step2");
      const loading = document.getElementById("loadingOverlay");
      const instructionStep1 = document.getElementById("instructionStep1");
      const instructionStep2 = document.getElementById("instructionStep2");
      const instructionDetail = document.getElementById("instructionDetail");
      
      // Add clear filter functionality
      if (document.querySelector('.video-filter-clear')) {
        document.querySelector('.video-filter-clear').addEventListener('click', () => {
          const filterInput = document.getElementById('videoFilter');
          filterInput.value = '';
          filterInput.dispatchEvent(new Event('input'));
        });
      }
      
      // Add back button functionality
      if (document.getElementById('goBackBtn')) {
        document.getElementById('goBackBtn').addEventListener('click', () => {
          step2.classList.add('hidden');
          step1.classList.remove('hidden');
          
          // Update instruction steps
          instructionStep1.querySelector('.instruction-number').classList.add('bg-white', 'text-blue-600');
          instructionStep1.querySelector('.instruction-number').classList.remove('bg-blue-600', 'text-white');
          
          instructionStep2.querySelector('.instruction-number').classList.add('bg-white', 'text-blue-600');
          instructionStep2.querySelector('.instruction-number').classList.remove('bg-blue-600', 'text-white');
          
          instructionDetail.textContent = 'Enter the details of your hospital video to receive AI-powered optimization suggestions';
        });
      }

      // Chart.js gauge and helper function
      let engagementChart = new Chart(document.getElementById("engagementChart"), {
        type: "doughnut",
        data: {
          datasets: [{
            data: [0, 100],
            backgroundColor: ["#3b82f6","#e5e7eb"]
          }]
        },
        options: {
          circumference: Math.PI,
          rotation: -Math.PI,
          cutout: "75%",
          plugins: { legend: { display: false } }
        }
      });
      function clamp(x){ return Math.max(0, Math.min(x,100)); }

      // handle outline tabs
      const outlineTabs = document.getElementById("outlineTabs");
      if (outlineTabs) {
        outlineTabs.onclick = e => {
          if(!e.target.closest("li")) return;
          
          outlineTabs.querySelectorAll("li a").forEach(a => {
            a.classList.remove("border-blue-600", "text-blue-600", "font-semibold");
            a.classList.add("border-transparent", "text-gray-500");
          });
          
          const selected = e.target.closest("li");
          selected.querySelector("a").classList.remove("border-transparent", "text-gray-500");
          selected.querySelector("a").classList.add("border-blue-600", "text-blue-600", "font-semibold");
          
          const idx = selected.dataset.index;
          document.querySelectorAll("#outlinesContainer > div")
            .forEach(div => {
              if(div.dataset.index===idx) {
                div.classList.remove('hidden');
                div.classList.add('block');
              } else {
                div.classList.remove('block');
                div.classList.add('hidden');
              }
            });
        };
      }

      let currentPayload = null, tipsArray = [];

      function showNotification(message) {
        const notif = document.getElementById("notification");
        notif.querySelector('.notification-message').textContent = message;
        notif.style.top = "20px";
        setTimeout(() => {
          notif.style.top = "-100px";
        }, 3000);
      }

      async function runOptimize(){
        const fd = new FormData(form);
        const tags = fd.get("tags") || "";
        const pubDate = fd.get("publish_datetime") || "";
        
        let hasEmptyFields = false;
        
        if(tags.trim() === "" && !window.tagNotificationShown) {
          setTimeout(() => {
            showNotification("Tags aren't filled out");
            window.tagNotificationShown = true;
          }, 0);
          hasEmptyFields = true;
        }
        
        if(pubDate.trim() === "" && !window.dateNotificationShown) {
          setTimeout(() => {
            showNotification("Date isn't filled out");
            window.dateNotificationShown = true;
          }, 1000); // Changed from 500 to 1000ms for 1 second delay
          hasEmptyFields = true;
        }
        
        if(hasEmptyFields) return false;

        // Reset notification flags if fields are filled
        if(tags.trim() !== "") window.tagNotificationShown = false;
        if(pubDate.trim() !== "") window.dateNotificationShown = false;
        
        // Update instructions
        instructionStep1.querySelector('.instruction-number').classList.remove('bg-white', 'text-blue-600');
        instructionStep1.querySelector('.instruction-number').classList.add('bg-blue-600', 'text-white');
        
        instructionStep2.querySelector('.instruction-number').classList.remove('bg-white', 'text-blue-600');
        instructionStep2.querySelector('.instruction-number').classList.add('bg-blue-600', 'text-white');
        
        instructionDetail.textContent = 'View AI-powered suggestions and compare with similar high-performing videos';
        
        loading.style.display = "flex";
        const data = {
          title: fd.get("title"),
          description: fd.get("description"),
          duration_sec: +fd.get("duration_sec"),
          tags: tags,
          // Category ID removed; no longer sent
          is_hd: fd.get("is_hd") === "on" ? 1 : 0,
          has_captions: fd.get("has_captions") === "on" ? 1 : 0
        };
        const pd = fd.get("publish_datetime");
        if(pd){
          const dt = new Date(pd);
          data.publish_dow = dt.getDay() === 0 ? 6 : dt.getDay()-1;
          data.publish_hour = dt.getHours();
        } else {
          data.publish_dow = 0; data.publish_hour = 12;
        }
        currentPayload = data;

        try {
          const res = await fetch(`${API_BASE_URL}/api/optimize`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
          });
          const raw = await res.text();
          const result = JSON.parse(raw.replace(/\bNaN\b/g,"null"));
          loading.style.display = "none";

          // switch to step2
          step1.classList.add("hidden");
          step2.classList.remove("hidden");

          const pred = clamp(result.predicted_engagement);
          engagementChart.data.datasets[0].data = [pred, 100 - pred];
          engagementChart.update({ duration: 800 });
          document.getElementById("engagementScore").textContent = result.predicted_engagement.toFixed(2);
          document.getElementById("engagementProgress").style.width = pred + '%';

          // set up three outlines from tips (first 3 tips each)
          tipsArray = result.gemini_tips.tips
            ? result.gemini_tips.tips.split("\n").filter(l=>l.trim())
            : [];
            
          for(let i=0;i<3;i++){
            const outlineUl = document.getElementById("outlineList"+i);
            if (outlineUl) {
              outlineUl.innerHTML = "";
              if(tipsArray[i]) {
                const parts = tipsArray[i].split(/[:\-–]/).slice(1).join("");
                const li = document.createElement("li");
                li.contentEditable="true";
                li.className = "py-2 border-b border-gray-200 transition-all duration-200 text-gray-800 hover:bg-gray-50/30 hover:pl-1 focus:outline-none focus:bg-blue-500/10 focus:pl-2";
                li.textContent = parts || tipsArray[i];
                outlineUl.appendChild(li);
              }
            }
          }

          // Instead of rendering each tip as its own <details>, render all in one <ul>
          const tipsList = document.getElementById("allTipsList");
          if (tipsList) {
            tipsList.innerHTML = "";
            if (result.gemini_tips.tips) {
              tipsArray.forEach((tip, i) => {
                const li = document.createElement("li");
                li.className = "mb-3";
                
                // Process tip text to enhance typography
                const enhancedTip = tip.replace(/\*(.*?)\*/g, '<strong class="text-blue-600 font-semibold">$1</strong>');
                
                li.innerHTML = `
                  <div class="flex items-start gap-4 bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                    <div class="flex-1 text-gray-800 text-base leading-relaxed">
                      ${enhancedTip}
                    </div>
                    <button class="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white rounded-md p-2 transition-colors">
                      <i class="fas fa-plus text-sm"></i>
                    </button>
                  </div>
                `;
                
                tipsList.appendChild(li);
                
                // Add "+" button functionality
                li.querySelector("button").onclick = () => {
                  const active = outlineTabs.querySelector("li a.border-blue-600").closest('li').dataset.index;
                  const outlineLi = document.createElement("li");
                  outlineLi.contentEditable = "true";
                  outlineLi.className = "py-2 border-b border-gray-200 transition-all duration-200 text-gray-800 hover:bg-gray-50/30 hover:pl-1 focus:outline-none focus:bg-blue-500/10 focus:pl-2";
                  outlineLi.textContent = tip.replace(/\*(.*?)\*/g, '$1'); // Remove asterisks in outline
                  document.getElementById("outlineList" + active).appendChild(outlineLi);
                };
              });
            } else {
              tipsList.innerHTML = `
                <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                  ${result.gemini_tips.error || "Failed to generate tips"}
                </div>
              `;
            }
          }

          // video cards
          const cards = document.getElementById("videoCards");
          if (cards) {
            cards.innerHTML = "";
            (result.reference_videos||[]).forEach(v=>{
              const videoCard = document.createElement("div");
              videoCard.className="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white";
              videoCard.innerHTML=`
                <div class="overflow-hidden">
                  <img src="https://img.youtube.com/vi/${v["video id"] || ""}/hqdefault.jpg" alt="Thumbnail" class="w-full h-48 object-cover transition-transform duration-500 hover:scale-105">
                </div>
                <div class="p-5">
                  <h4 class="font-medium text-gray-800 mb-2">${v["video title"]}</h4>
                  <div class="flex items-center text-xs text-gray-500 mb-2">
                    <span class="mr-3"><i class="fas fa-eye mr-1"></i> ${v["view count"]}</span>
                    <span class="mr-3"><i class="fas fa-thumbs-up mr-1"></i> ${v["like count"]}</span>
                    ${v["tags"].split('|').length > 3 ? 
                      `<span class="mr-3"><i class="fas fa-comment mr-1"></i> ${v["comment count"]}</span>` : ''}
                  </div>
                  <p class="text-xs text-gray-600"><strong>Length:</strong> ${v["length_sec"]}s</p>
                  <div class="flex flex-wrap gap-1 mt-3">
                    ${(v["tags"] || "").split('|').slice(0,3).map(tag => 
                      `<span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">${tag}</span>`
                    ).join('')}
                    ${v["tags"] && v["tags"].split('|').length > 3 ? 
                      `<span class="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">+${v["tags"].split('|').length - 3} more</span>` : ''}
                  </div>
                </div>
              `;
              cards.appendChild(videoCard);
              
              // Make entire card clickable to YouTube
              if (v["video id"]) {
                videoCard.style.cursor = 'pointer';
                videoCard.addEventListener('click', () => {
                  window.open(`https://www.youtube.com/watch?v=${v["video id"]}`, '_blank');
                });
              }
            });
          }

          // filter
          const videoFilter = document.getElementById("videoFilter");
          if (videoFilter && cards) {
            videoFilter.oninput = ev => {
              const q = ev.target.value.toLowerCase();
              cards.childNodes.forEach(card => {
                card.style.display = card.textContent.toLowerCase().includes(q) ? "" : "none";
              });
            };
          }
        } catch (error) {
          console.error("Optimization failed:", error);
          loading.style.display = "none";
        }
      }

      // initial form submit
      form.addEventListener("submit", e=>{ 
        e.preventDefault();
        runOptimize();        
      });
      
      // re-evaluate button
      const reEvalBtn = document.getElementById("reEvalBtn");
      if (reEvalBtn) {
        reEvalBtn.onclick = () => {
          // animate from current predicted to improved
          loading.style.display = "flex";
          fetch(`${API_BASE_URL}/api/optimize`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(currentPayload)
          })
          .then(r=>r.json())
          .then(result=>{
            loading.style.display = "none";
            const imp = clamp(result.improved_engagement);
            engagementChart.data.datasets[0].data = [imp,100-imp];
            engagementChart.update({duration:800});
            document.getElementById("engagementScore").textContent = result.improved_engagement.toFixed(2);
            document.getElementById("engagementProgress").style.width = imp + '%';
          })
          .catch(error => {
            console.error("Re-evaluation failed:", error);
            loading.style.display = "none";
          });
        };
      }
    });
  </script>
</body>});
</html>
