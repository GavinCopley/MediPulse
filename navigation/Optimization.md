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
  <title>Generate an Optimal Video</title>
  <meta charset="utf-8" />
  <title>Hospital Video Optimiser</title>

  <!-- FontAwesome & Chart.js -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700&display=swap" rel="stylesheet">
</head>

<body class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">

  <!-- ▒▒ Loading overlay ▒▒ -->
  <div id="loadingOverlay"
       class="fixed inset-0 z-50 hidden items-center justify-center bg-white/90 backdrop-blur-sm">
    <div class="text-center">
      <i class="fas fa-circle-notch fa-spin fa-2x mb-3 text-blue-600"></i>
      <div class="text-xl font-semibold text-blue-600">Optimising your content…</div>
      <div class="mt-2 text-xs text-gray-500">Processing with AI</div>
    </div>
  </div>

  <!-- ▒▒ Notification ▒▒ -->
  <div id="notification"
       class="fixed -top-20 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-md flex items-center space-x-2 transition-all duration-500 z-50">
    <i class="fas fa-exclamation-circle"></i>
    <span class="notification-message"></span>
  </div>

  <!-- ╔══ Main content ═══════════════════════════════════════════════════ -->
  <section class="py-12 px-6">
    <div class="mx-auto max-w-5xl">

      <h1 class="mb-5 text-center text-4xl font-bold text-gray-800">
        <i class="fa-solid fa-chart-line text-blue-600 mr-2"></i>
        Hospital&nbsp;Video&nbsp;Optimiser
      </h1>
      <p class="mb-10 text-center text-xl text-gray-600">
        Enhance your hospital’s video content with AI-powered insights
      </p>

      <!-- ══ Instructions header -->
      <div class="relative mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200">
        <h3 class="mb-3 text-center text-lg font-semibold text-gray-800">How it works</h3>

        <div class="my-4 flex justify-around items-center">
          <div id="instructionStep1" class="flex flex-col items-center flex-1">
            <div
              class="instruction-number w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">
              1
            </div>
            <div class="font-semibold text-center text-gray-800">Describe video</div>
          </div>
          <div class="w-1/3 h-0.5 bg-gray-200"></div>
          <div id="instructionStep2" class="flex flex-col items-center flex-1">
            <div
              class="instruction-number w-16 h-16 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-xl font-bold text-blue-600 mb-4">
              2
            </div>
            <div class="font-semibold text-center text-gray-800">See results</div>
          </div>
        </div>

        <p id="instructionDetail" class="mt-3 text-center text-gray-500">
          Enter video details to receive AI suggestions.
        </p>
      </div>

      <!-- ══ STEP 1 – Form -->
      <div id="step1">
        <div class="rounded-xl bg-white p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h2 class="mb-6 font-bold text-gray-800 flex items-center">
            <i class="fas fa-pencil-alt mr-2 text-blue-600"></i>
            Step&nbsp;1 – Describe your video
          </h2>

          <form id="videoForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

              <!-- Platform (disabled) -->
              <div>
                <label class="block mb-2 font-medium">Platform</label>
                <div class="relative">
                  <select disabled class="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4">
                    <option>YouTube</option>
                  </select>
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3"><i
                      class="fab fa-youtube text-red-500"></i></span>
                </div>
                <p class="mt-1 text-sm text-gray-500 italic">Only YouTube supported.</p>
              </div>

              <!-- Duration -->
              <div>
                <label class="block mb-2 font-medium">Duration (seconds)</label>
                <div class="relative">
                  <input name="duration_sec" type="number" min="5" required
                         class="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4" />
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3"><i
                      class="fas fa-clock text-gray-400"></i></span>
                </div>
              </div>
            </div>

            <!-- Title -->
            <div>
              <label class="block mb-2 font-medium">Title</label>
              <div class="relative">
                <input name="title" maxlength="100" required placeholder="Enter an engaging title"
                       class="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4" />
                <span class="absolute inset-y-0 left-0 flex items-center pl-3"><i
                    class="fas fa-heading text-gray-400"></i></span>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block mb-2 font-medium">Description</label>
              <textarea name="description" rows="4" required placeholder="Describe what your video is about…"
                        class="w-full rounded-lg border border-gray-200 py-2 px-4"></textarea>
            </div>

            <!-- Tags -->
            <div>
              <label class="block mb-2 font-medium">Tags <span class="text-gray-500">(pipe-separated)</span></label>
              <div class="relative">
                <textarea name="tags" rows="2" placeholder="cardiology|heart health|angioplasty"
                          class="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4"></textarea>
                <span class="absolute top-3 left-0 flex items-center pl-3"><i
                    class="fas fa-hashtag text-gray-400"></i></span>
              </div>
            </div>

            <!-- Checkboxes + Category -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label class="flex items-center">
                <input type="checkbox" name="is_hd" checked
                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span class="ml-2"><i class="fas fa-tv mr-1"></i> HD video</span>
              </label>

              <label class="flex items-center">
                <input type="checkbox" name="has_captions"
                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span class="ml-2"><i class="fas fa-closed-captioning mr-1"></i> Includes captions</span>
              </label>

              <!-- Category selector -->
              <div class="md:col-span-2">
                <label class="block mb-2 font-medium">YouTube Category</label>
                <select name="category_id"
                        class="w-full rounded-lg border border-gray-200 py-2 px-4">
                  <option value="27" selected>27 – Education</option>
                  <option value="22">22 – People &amp; Blogs</option>
                  <option value="26">26 – How-to &amp; Style</option>
                  <option value="24">24 – Entertainment</option>
                  <!-- add more if you like -->
                </select>
              </div>

              <!-- Publish date/time -->
              <div class="md:col-span-2">
                <label class="block mb-2 font-medium"><i class="fas fa-calendar-alt mr-1"></i> Publish date/time</label>
                <input name="publish_datetime" type="datetime-local"
                       class="w-full rounded-lg border border-gray-200 py-2 px-4" />
              </div>
            </div>

            <div class="flex justify-end mt-8">
              <button type="submit"
                      class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm flex items-center gap-2">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                Optimise
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ══ STEP 2 – Results -->
      <div id="step2" class="hidden">

        <h2 class="mb-6 font-bold text-gray-800 flex items-center">
          <i class="fas fa-chart-line mr-2 text-blue-600"></i>
          Step&nbsp;2 – Results
        </h2>

        <!-- Engagement Card -->
        <div class="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200">
          <h3 class="mb-4 font-semibold flex items-center text-gray-800">
            <i class="fas fa-gauge-high mr-2 text-blue-600"></i> Predicted engagement
          </h3>
          <div class="flex flex-col md:flex-row gap-6 items-center">
            <canvas id="engagementChart" class="w-full md:w-1/3"></canvas>
            <div class="w-full md:w-2/3">
              <div class="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                <div id="engagementProgress" class="absolute inset-0 bg-blue-600 rounded-full" style="width:0%"></div>
              </div>
              <p class="mt-3 text-center">
                Score: <strong id="engagementScore" class="text-2xl text-blue-600">–</strong>
              </p>
              <p class="text-center text-xs text-gray-500">Based on machine-learning analysis of similar content</p>
            </div>
          </div>
        </div>

        <!-- Outlines -->
        <div class="mb-8 rounded-xl bg-white p-8 shadow-md border border-gray-200">
          <h3 class="mb-4 font-semibold flex items-center text-gray-800">
            <i class="fas fa-clipboard-list mr-2 text-blue-600"></i> AI-generated outlines
          </h3>
          
          <!-- Template chooser -->
          <div class="mb-6 flex space-x-4 justify-center">
            <button type="button" class="template-btn px-4 py-2 bg-blue-600 text-white rounded-lg" data-template="0">
              Overview
            </button>
            <button type="button" class="template-btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg" data-template="1">
              Educational
            </button>
            <button type="button" class="template-btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg" data-template="2">
              Case Study
            </button>
          </div>

          <!-- Three video+outline containers -->
          <div id="templatesWrapper">
            <!-- Overview template -->
            <div class="template-container" data-template="0">
              <div class="video-player mb-4 bg-gray-100 rounded-lg p-4">
                <div class="aspect-video bg-gray-200 rounded flex items-center justify-center">
                  <i class="fas fa-play-circle text-4xl text-gray-400"></i>
                </div>
                <p class="mt-2 text-sm text-gray-600 text-center">Quick, engaging overview</p>
              </div>
              <ul id="outlineList0" class="pl-5 list-disc space-y-2"></ul>
            </div>

            <!-- Educational template -->
            <div class="template-container hidden" data-template="1">
              <div class="video-player mb-4 bg-gray-100 rounded-lg p-4">
                <div class="aspect-video bg-gray-200 rounded flex items-center justify-center">
                  <i class="fas fa-chalkboard-teacher text-4xl text-gray-400"></i>
                </div>
                <p class="mt-2 text-sm text-gray-600 text-center">Detailed educational content</p>
              </div>
              <ul id="outlineList1" class="pl-5 list-disc space-y-2"></ul>
            </div>

            <!-- Case Study template -->
            <div class="template-container hidden" data-template="2">
              <div class="video-player mb-4 bg-gray-100 rounded-lg p-4">
                <div class="aspect-video bg-gray-200 rounded flex items-center justify-center">
                  <i class="fas fa-user-md text-4xl text-gray-400"></i>
                </div>
                <p class="mt-2 text-sm text-gray-600 text-center">Patient story format</p>
              </div>
              <ul id="outlineList2" class="pl-5 list-disc space-y-2"></ul>
            </div>
          </div>

          <div class="text-center mt-6">
            <button id="reEvalBtn" class="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-lg flex gap-2 mx-auto">
              <i class="fas fa-sync-alt"></i> Re-evaluate
            </button>
          </div>
        </div>

        <!-- Tips -->
        <div class="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold mb-4 flex items-center">
            <i class="fas fa-lightbulb mr-2 text-yellow-400"></i> Improvement tips
            <span class="text-xs text-gray-500 ml-2">(click to expand)</span>
          </h3>
          <details id="allTipsDropdown" class="group">
            <summary
              class="cursor-pointer font-semibold text-amber-500 bg-amber-50 hover:bg-amber-100 rounded-md py-2 px-4 inline-flex items-center gap-2">
              <i class="fas fa-chevron-down transition-transform group-open:rotate-180"></i> Show all tips
            </summary>
            <div id="tipsContainer" class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- JS will inject tip cards here -->
            </div>
          </details>
        </div>

        <!-- Similar Videos -->
        <div class="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200">
          <h3 class="mb-4 font-semibold flex items-center text-gray-800">
            <i class="fas fa-film mr-2 text-blue-600"></i> Similar high-performing videos
          </h3>
          <div class="mb-5 relative">
            <input id="videoFilter" type="text" placeholder="Filter by title or tag…"
                   class="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-10" />
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><i
                class="fas fa-search text-gray-400"></i></span>
            <span
              class="video-filter-clear absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"><i
                class="fas fa-times-circle text-gray-400"></i></span>
          </div>
          <div id="videoCards"
               class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </div>

        <!-- Back button -->
        <div class="text-center">
          <button id="goBackBtn"
                  class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg flex items-center gap-2 mx-auto">
            <i class="fas fa-arrow-left"></i> Edit video details
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ Script -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      /* ══ Constants & template management ════════════════════ */
      const API_BASE_URL = "http://localhost:8115";
      const clamp = x => Math.max(0, Math.min(x, 100));

      /* ══ DOM refs ═════════════════════════════════════════ */
      const form = document.getElementById("videoForm");
      const step1 = document.getElementById("step1");
      const step2 = document.getElementById("step2");
      const loading = document.getElementById("loadingOverlay");
      const notif = document.getElementById("notification");
      const instructionStep1 = document.getElementById("instructionStep1");
      const instructionStep2 = document.getElementById("instructionStep2");
      const instructionDetail = document.getElementById("instructionDetail");

      // Template state
      const outlinesPerTemplate = { 0: [], 1: [], 2: [] };
      let currentTemplate = 0;

      function renderOutlines(templateIdx) {
        const ul = document.getElementById("outlineList" + templateIdx);
        ul.innerHTML = "";
        
        outlinesPerTemplate[templateIdx].forEach((text, index) => {
          // Calculate simulated timestamp (3 min per section)
          const mins = Math.floor((index + 1) * 3);
          const secs = "00";
          const timestamp = `${mins}:${secs}`;
          
          const li = document.createElement("li");
          li.className = "mb-6 list-none"; // Remove bullet points
          
          li.innerHTML = `
            <div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
              <!-- Thumbnail with play icon and timestamp -->
              <div class="relative">
                <div class="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <i class="fab fa-youtube text-red-600 text-6xl opacity-75 hover:opacity-100 transition-opacity"></i>
                </div>
                <div class="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-1.5 py-0.5 rounded">
                  ${timestamp}
                </div>
              </div>
              
              <!-- Content -->
              <div class="p-4">
                <!-- Title (editable) -->
                <div class="mb-2 text-lg font-semibold text-gray-800" 
                     contenteditable="true" 
                     spellcheck="false">
                  ${text}
                </div>
                
                <!-- Metadata -->
                <div class="flex items-center gap-3 text-xs text-gray-500">
                  <span class="flex items-center">
                    <i class="fas fa-clock mr-1 text-gray-400"></i>
                    Section ${index + 1}
                  </span>
                  <span class="flex items-center">
                    <i class="fas fa-pen mr-1 text-gray-400"></i>
                    Click to edit
                  </span>
                </div>
              </div>
            </div>
          `;
          
          ul.appendChild(li);
        });
      }

      // Wire up template switcher
      document.querySelectorAll(".template-btn").forEach(btn => {
        btn.addEventListener("click", e => {
          document.querySelectorAll(".template-btn").forEach(b => {
            b.classList.toggle("bg-blue-600", b === btn);
            b.classList.toggle("text-white", b === btn);
            b.classList.toggle("bg-gray-200", b !== btn);
            b.classList.toggle("text-gray-800", b !== btn);
          });

          const newIdx = Number(btn.dataset.template);
          document.querySelectorAll(".template-container").forEach(div => {
            div.classList.toggle("hidden", Number(div.dataset.template) !== newIdx);
          });

          currentTemplate = newIdx;
          renderOutlines(currentTemplate);
        });
      });

      /* ══ Gauge setup ══════════════════════════════════════ */
      const engagementChart = new Chart(document.getElementById("engagementChart"), {
        type: "doughnut",
        data: { datasets: [{ data: [0, 100], backgroundColor: ["#3b82f6", "#e5e7eb"] }] },
        options: { circumference: Math.PI, rotation: -Math.PI, cutout: "75%", plugins: { legend: { display: false } } }
      });

      const setGauge = val => {
        engagementChart.data.datasets[0].data = [clamp(val), 100 - clamp(val)];
        engagementChart.update({ duration: 800 });
        document.getElementById("engagementProgress").style.width = clamp(val) + "%";
        document.getElementById("engagementScore").textContent = val.toFixed(2);
      };

      /* ══ Notification util ════════════════════════════════ */
      const showNotification = msg => {
        notif.querySelector(".notification-message").textContent = msg;
        notif.style.top = "20px";
        setTimeout(() => (notif.style.top = "-100px"), 3000);
      };

      /* ══ State ════════════════════════════════════════════ */
      let currentPayload = null;

      /* ══ Form submit – Step 1 ═════════════════════════════ */
      form.addEventListener("submit", async evt => {
        evt.preventDefault();

        // ─ Collect & validate fields
        const fd = new FormData(form);

        // normalise tags → pipe-sep
        const rawTags = (fd.get("tags") || "").replace(/#/g, "").replace(/[,;]/g, "|");
        if (!rawTags.trim()) return showNotification("Please enter at least one tag.");
        if (!fd.get("publish_datetime")) return showNotification("Please choose a publish date.");

        // build payload
        const dt = fd.get("publish_datetime") ? new Date(fd.get("publish_datetime")) : null;
        currentPayload = {
          title: fd.get("title"),
          description: fd.get("description"),
          duration_sec: Number(fd.get("duration_sec")),
          tags: rawTags,
          is_hd: fd.get("is_hd") ? 1 : 0,
          has_captions: fd.get("has_captions") ? 1 : 0,
          category_id: Number(fd.get("category_id")) || 0,
          publish_dow: dt ? (dt.getDay() === 0 ? 6 : dt.getDay() - 1) : 0,
          publish_hour: dt ? dt.getHours() : 12
        };

        /* UI: switches */
        loading.style.display = "flex";

        try {
          const r = await fetch(`${API_BASE_URL}/api/optimize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentPayload)
          });
          const resTxt = await r.text();
          const res = JSON.parse(resTxt.replace(/\bNaN\b/g, "null"));

          /* UI – show Step 2 */
          loading.style.display = "none";
          step1.classList.add("hidden");
          step2.classList.remove("hidden");
          
          /* Gauge */
          setGauge(res.predicted_engagement);

          // ── Tips & "Add to outline" buttons ─────────────────────────
          const tips = res.gemini_tips || {};
          const tipsContainer = document.getElementById("tipsContainer");
          tipsContainer.innerHTML = "";

          // For each category, make a card
          Object.entries(tips).forEach(([category, { examples, suggestions }]) => {
            const card = document.createElement("div");
            card.className = "tip-card bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all";
            card.innerHTML = `
              <h4 class="text-lg font-semibold mb-3 text-blue-700">${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
              <ul class="space-y-2">
                ${examples.map(t =>
                  `<li class="flex justify-between items-start bg-blue-50/50 rounded p-2">
                     <span class="flex-1 text-gray-800">
                       <i class="fas fa-quote-left mr-1 text-blue-400"></i>${t}
                     </span>
                     <button type="button" data-tip="${t.replace(/"/g,'&quot;')}"
                             class="add-tip-btn ml-2 text-green-600 hover:text-green-800">
                       <i class="fas fa-plus-circle"></i>
                     </button>
                   </li>`
                ).join("")}
              </ul>
              ${suggestions.length
                ? `<div class="mt-4 border-t border-gray-100 pt-3">
                     <h5 class="font-medium mb-2 text-gray-700">Suggestions</h5>
                     <ul class="space-y-2">
                       ${suggestions.map(s =>
                         `<li class="text-sm text-gray-600 italic">
                            <i class="fas fa-lightbulb text-amber-400 mr-1"></i>${s}
                          </li>`
                       ).join("")}
                     </ul>
                   </div>`
                : ""
              }
            `;
            tipsContainer.appendChild(card);
          });

          // Hook up the "Add" buttons with delegated handler
          tipsContainer.addEventListener("click", e => {
            if (!e.target.closest(".add-tip-btn")) return;
            
            const btn = e.target.closest(".add-tip-btn");
            const tipText = btn.getAttribute("data-tip");
            
            // Add to current template's array and re-render
            outlinesPerTemplate[currentTemplate].push(tipText);
            renderOutlines(currentTemplate);
          });

          /* Similar video cards */
          const cards = document.getElementById("videoCards"); cards.innerHTML = "";
          (res.reference_videos || []).forEach(v => {
            const div = document.createElement("div");
            div.className = "bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden";
            div.innerHTML = `
              <img src="https://img.youtube.com/vi/${v["video id"]}/hqdefault.jpg"
                   class="w-full h-48 object-cover">
              <div class="p-5">
                <h4 class="font-medium mb-2">${v["video title"]}</h4>
                <p class="text-xs text-gray-500 mb-2">
                  <i class="fas fa-eye mr-1"></i>${v["view count"]} &nbsp;
                  <i class="fas fa-thumbs-up mr-1"></i>${v["like count"]}
                </p>
                <p class="text-xs text-gray-600 mb-3"><strong>Length:</strong> ${v["length_sec"]} s</p>
                ${(v.tags || "").split("|").slice(0, 3).map(t =>
                  `<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${t}</span>`
                ).join(" ")}
              </div>`;
            if (v["video id"]) div.onclick = () =>
              window.open(`https://www.youtube.com/watch?v=${v["video id"]}`, "_blank");
            div.style.cursor = "pointer";
            cards.appendChild(div);
          });

        } catch (e) {
          console.error(e); loading.style.display = "none";
          showNotification("Optimisation failed – check console.");
        }
      });

      /* Back button */
      document.getElementById("goBackBtn").onclick = () => {
        step2.classList.add("hidden");
        step1.classList.remove("hidden");
        instructionStep2.querySelector(".instruction-number").classList.add("bg-white", "text-blue-600");
        instructionStep2.querySelector(".instruction-number").classList.remove("bg-blue-600", "text-white");
        instructionDetail.textContent = "Enter video details to receive AI suggestions.";
      };

      /* Clear-filter button */
      document.querySelector(".video-filter-clear").onclick =
        () => { const f = document.getElementById("videoFilter"); f.value = ""; f.dispatchEvent(new Event("input")); };

      /* Filter live */
      document.getElementById("videoFilter").oninput = ev => {
        const q = ev.target.value.toLowerCase();
        document.querySelectorAll("#videoCards > div").forEach(card => {
          card.style.display = card.textContent.toLowerCase().includes(q) ? "" : "none";
        });
      };

      /* Re-evaluate button (improved score) */
      document.getElementById("reEvalBtn").onclick = async () => {
        if (!currentPayload) return;
        loading.style.display = "flex";
        try {
          const r = await fetch(`${API_BASE_URL}/api/optimize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentPayload)
          });
          const res = await r.json();
          loading.style.display = "none";
          setGauge(res.improved_engagement);
        } catch (e) {
          console.error(e); loading.style.display = "none";
          showNotification("Re-evaluation failed.");
        }
      };
    });
  </script>
</body>
</html>
