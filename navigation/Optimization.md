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

  <style>
    /* make each outline card fill the row */
    #templatesWrapper {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .outline-card {
      width: 100%;
    }
  </style>
</head>

<body class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
  <!-- Oval Navigation Bar (centered with decreased top padding) -->
    <div class="flex justify-center mb-2 mt-2">
      <div style="display: inline-block; background-color: #f5f5f5; border-radius: 30px; padding: 1px 3px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); width: 420px;">
        <div class="buttons has-addons" style="margin: 0; border-radius: 25px; overflow: hidden; position: relative; display: flex; height: 36px;">
          <!-- Blue background overlay for active button (moved to Generate New) -->
          <div style="position: absolute; top: 0; left: 33%; bottom: 0; width: 34%; background-color: #4f46e5; border-radius: 25px; z-index: 1;"></div>
          <a href="{{site.baseurl}}/optimize" class="button is-rounded" style="margin: 0; border-color: transparent; background-color: transparent; position: relative; z-index: 2; flex: 1; padding: 0 4px; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; white-space: nowrap;">
            <span class="icon"><i class="fas fa-wand-magic-sparkles"></i></span>
            <span>&nbsp;Main</span>
          </a>
          <a href="{{site.baseurl}}/optimize/generate" class="button is-rounded" style="margin: 0; border-color: transparent; background-color: transparent; position: relative; z-index: 2; color: white; flex: 1; padding: 0 4px; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; white-space: nowrap;">
            <span class="icon"><i class="fas fa-plus-circle"></i></span>
            <span>&nbsp;Generate New</span>
          </a>
          <a href="{{site.baseurl}}/optimize/edit" class="button is-rounded" style="margin: 0; border-color: transparent; background-color: transparent; position: relative; z-index: 2; flex: 1; padding: 0 4px; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; white-space: nowrap;">
            <span class="icon"><i class="fas fa-edit"></i></span>
            <span>&nbsp;Edit Existing</span>
          </a>
        </div>
      </div>
    </div>
  <!-- ▒▒ Loading overlay ▒▒ -->
  <div id="loadingOverlay" class="fixed inset-0 z-50 hidden items-center justify-center bg-white/90 backdrop-blur-sm">
    <div class="text-center">
      <i class="fas fa-circle-notch fa-spin fa-2x mb-3 text-blue-600"></i>
      <div class="text-xl font-semibold text-blue-600">Optimising your content…</div>
      <div class="mt-2 text-xs text-gray-500">Processing with AI</div>
    </div>
  </div>

  <!-- ▒▒ Notification ▒▒ -->
  <div id="notification" class="fixed -top-20 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-md flex items-center space-x-2 transition-all duration-500 z-50">
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
            <div class="instruction-number w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">1</div>
            <div class="font-semibold text-center text-gray-800">Describe video</div>
          </div>
          <div class="w-1/3 h-0.5 bg-gray-200"></div>
          <div id="instructionStep2" class="flex flex-col items-center flex-1">
            <div class="instruction-number w-16 h-16 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-xl font-bold text-blue-600 mb-4">2</div>
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
              <!-- Platform -->
              <div>
                <label class="block mb-2 font-medium">Platform</label>
                <div class="relative">
                  <select disabled class="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4">
                    <option>YouTube</option>
                  </select>
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3"><i class="fab fa-youtube text-red-500"></i></span>
                </div>
                <p class="mt-1 text-sm text-gray-500 italic">Only YouTube supported.</p>
              </div>
              <!-- Duration -->
              <div>
                <label class="block mb-2 font-medium">Duration (seconds)</label>
                <div class="relative">
                  <input name="duration_sec" type="number" min="5" required class="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4" />
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3"><i class="fas fa-clock text-gray-400"></i></span>
                </div>
              </div>
            </div>

            <!-- Title -->
            <div>
              <label class="block mb-2 font-medium">Title</label>
              <div class="relative">
                <input name="title" maxlength="100" required placeholder="Enter an engaging title" class="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4" />
                <span class="absolute inset-y-0 left-0 flex items-center pl-3"><i class="fas fa-heading text-gray-400"></i></span>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block mb-2 font-medium">Description</label>
              <textarea name="description" rows="4" required placeholder="Describe what your video is about…" class="w-full rounded-lg border border-gray-200 py-2 px-4"></textarea>
            </div>

            <!-- Tags -->
            <div>
              <label class="block mb-2 font-medium">Tags <span class="text-gray-500">(pipe-separated)</span></label>
              <div class="relative">
                <textarea name="tags" rows="2" placeholder="cardiology|heart health|angioplasty" class="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4"></textarea>
                <span class="absolute top-3 left-0 flex items-center pl-3"><i class="fas fa-hashtag text-gray-400"></i></span>
              </div>
            </div>

            <!-- Checkboxes + Category -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label class="flex items-center">
                <input type="checkbox" name="is_hd" checked class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span class="ml-2"><i class="fas fa-tv mr-1"></i> HD video</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" name="has_captions" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span class="ml-2"><i class="fas fa-closed-captioning mr-1"></i> Includes captions</span>
              </label>
              <div class="md:col-span-2">
                <label class="block mb-2 font-medium">YouTube Category</label>
                <select name="category_id" class="w-full rounded-lg border border-gray-200 py-2 px-4">
                  <option value="27" selected>27 – Education</option>
                  <option value="22">22 – People & Blogs</option>
                  <option value="26">26 – How-to & Style</option>
                  <option value="24">24 – Entertainment</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="block mb-2 font-medium"><i class="fas fa-calendar-alt mr-1"></i> Publish date/time</label>
                <input name="publish_datetime" type="datetime-local" class="w-full rounded-lg border border-gray-200 py-2 px-4" />
              </div>
            </div>

            <div class="flex justify-end mt-8">
              <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm flex items-center gap-2">
                <i class="fa-solid fa-wand-magic-sparkles"></i> Optimise
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ══ STEP 2 – Results -->
      <div id="step2" class="hidden">

        <h2 class="mb-6 font-bold text-gray-800 flex items-center"><i class="fas fa-chart-line mr-2 text-blue-600"></i> Step&nbsp;2 – Results</h2>

        <!-- Engagement Card -->
        <div class="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200">
          <h3 class="mb-4 font-semibold flex items-center text-gray-800"><i class="fas fa-gauge-high mr-2 text-blue-600"></i> Predicted engagement</h3>
          <div class="flex flex-col md:flex-row gap-6 items-center">
            <canvas id="engagementChart" class="w-full md:w-1/3"></canvas>
            <div class="w-full md:w-2/3">
              <div class="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                <div id="engagementProgress" class="absolute inset-0 bg-blue-600 rounded-full" style="width:0%"></div>
              </div>
              <p class="mt-3 text-center">Score: <strong id="engagementScore" class="text-2xl text-blue-600">–</strong></p>
              <p class="text-center text-xs text-gray-500">Based on machine-learning analysis of similar content</p>
            </div>
          </div>
        </div>

        <!-- Outlines -->
        <div class="mb-8 rounded-xl bg-white p-8 shadow-md border border-gray-200">
          <h3 class="mb-4 font-semibold flex items-center text-gray-800"><i class="fas fa-clipboard-list mr-2 text-blue-600"></i> AI-generated outlines</h3>

          <!-- Template chooser -->
          <div class="mb-6 flex space-x-4 justify-center">
            <button type="button" class="template-btn px-4 py-2 bg-blue-600 text-white rounded-lg" data-template="0">Outline&nbsp;1</button>
            <button type="button" class="template-btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg" data-template="1">Outline&nbsp;2</button>
            <button type="button" class="template-btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg" data-template="2">Outline&nbsp;3</button>
          </div>

          <!-- Wrapper holding three outline cards -->
          <div id="templatesWrapper">

            <!-- Outline 1 -->
            <div class="template-container" data-template="0">
              <div class="outline-card bg-white rounded-lg border border-gray-200 shadow hover:shadow-lg transition overflow-hidden">
                <!-- Thumbnail -->
                <div class="relative group">
                  <img src="" alt="thumbnail" class="thumbnail-img w-full aspect-video object-cover bg-black">
                  <div class="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/40 transition-colors"><i class="fab fa-youtube text-red-600 text-6xl opacity-85"></i></div>
                  <div class="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded duration-text">0:00</div>
                  <label class="absolute top-2 left-2 bg-white/75 backdrop-blur px-2 py-0.5 text-xs rounded cursor-pointer shadow">
                    <i class="fas fa-image mr-1"></i> Change
                    <input type="file" accept="image/*" class="sr-only thumb-input">
                  </label>
                </div>
                <div class="p-4">
                  <h4 class="title text-lg font-semibold text-gray-800 mb-1 break-words">(Title)</h4>
                  <p class="description text-sm text-gray-600 whitespace-pre-wrap mb-2">(Description)</p>
                  <p class="tags space-x-1 text-xs text-blue-700 font-medium"></p>
                </div>
              </div>
            </div>

            <!-- Outline 2 -->
            <div class="template-container hidden" data-template="1">
              <div class="outline-card bg-white rounded-lg border border-gray-200 shadow hover:shadow-lg transition overflow-hidden">
                <div class="relative group">
                  <img src="" alt="thumbnail" class="thumbnail-img w-full aspect-video object-cover bg-black">
                  <div class="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/40 transition-colors"><i class="fab fa-youtube text-red-600 text-6xl opacity-85"></i></div>
                  <div class="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded duration-text">0:00</div>
                  <label class="absolute top-2 left-2 bg-white/75 backdrop-blur px-2 py-0.5 text-xs rounded cursor-pointer shadow">
                    <i class="fas fa-image mr-1"></i> Change
                    <input type="file" accept="image/*" class="sr-only thumb-input">
                  </label>
                </div>
                <div class="p-4">
                  <h4 class="title text-lg font-semibold text-gray-800 mb-1 break-words">(Title)</h4>
                  <p class="description text-sm text-gray-600 whitespace-pre-wrap mb-2">(Description)</p>
                  <p class="tags space-x-1 text-xs text-blue-700 font-medium"></p>
                </div>
              </div>
            </div>

            <!-- Outline 3 -->
            <div class="template-container hidden" data-template="2">
              <div class="outline-card bg-white rounded-lg border border-gray-200 shadow hover:shadow-lg transition overflow-hidden">
                <div class="relative group">
                  <img src="" alt="thumbnail" class="thumbnail-img w-full aspect-video object-cover bg-black">
                  <div class="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/40 transition-colors"><i class="fab fa-youtube text-red-600 text-6xl opacity-85"></i></div>
                  <div class="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded duration-text">0:00</div>
                  <label class="absolute top-2 left-2 bg-white/75 backdrop-blur px-2 py-0.5 text-xs rounded cursor-pointer shadow">
                    <i class="fas fa-image mr-1"></i> Change
                    <input type="file" accept="image/*" class="sr-only thumb-input">
                  </label>
                </div>
                <div class="p-4">
                  <h4 class="title text-lg font-semibold text-gray-800 mb-1 break-words">(Title)</h4>
                  <p class="description text-sm text-gray-600 whitespace-pre-wrap mb-2">(Description)</p>
                  <p class="tags space-x-1 text-xs text-blue-700 font-medium"></p>
                </div>
              </div>
            </div>

          </div>

          <div class="flex justify-between items-center mt-6">
            <button id="undoBtn" class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg flex gap-2"><i class="fas fa-undo-alt"></i> Undo All</button>
          </div>
        </div>

        <!-- Tips -->
        <div class="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold mb-4 flex items-center"><i class="fas fa-lightbulb mr-2 text-yellow-400"></i> Improvement tips <span class="text-xs text-gray-500 ml-2">(click to expand)</span></h3>
          <details id="allTipsDropdown" class="group">
            <summary class="cursor-pointer font-semibold text-amber-500 bg-amber-50 hover:bg-amber-100 rounded-md py-2 px-4 inline-flex items-center gap-2">
              <i class="fas fa-chevron-down transition-transform group-open:rotate-180"></i> Show all tips
            </summary>
            <div id="tipsContainer" class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
          </details>
        </div>

        <!-- Similar Videos -->
        <div class="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200">
          <h3 class="mb-4 font-semibold flex items-center text-gray-800"><i class="fas fa-film mr-2 text-blue-600"></i> Similar high-performing videos</h3>
          <div class="mb-5 relative">
            <input id="videoFilter" type="text" placeholder="Filter by title or tag…" class="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-10" />
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><i class="fas fa-search text-gray-400"></i></span>
            <span class="video-filter-clear absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"><i class="fas fa-times-circle text-gray-400"></i></span>
          </div>
          <div id="videoCards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </div>

        <!-- Back button -->
        <div class="text-center">
          <button id="goBackBtn" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg flex items-center gap-2 mx-auto"><i class="fas fa-arrow-left"></i> Edit video details</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ Script -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      /* ══ Constants & helpers ═════════════════════════════ */
      const API_BASE_URL = "http://localhost:8115";
      const clamp = x => Math.max(0, Math.min(x, 99)); // Cap at 99 instead of 100
      const formatTime = secs => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;

      /* ══ DOM refs ═══════════════════════════════════════ */
      const form = document.getElementById("videoForm");
      const step1 = document.getElementById("step1");
      const step2 = document.getElementById("step2");
      const loading = document.getElementById("loadingOverlay");
      const notif = document.getElementById("notification");
      const templatesWrapper = document.getElementById("templatesWrapper");

      /* ══ Template + tip state ═══════════════════════════ */
      let currentTemplate = 0;
      const originalContent = {};   // { templateIdx: { title, desc, tags, length } }
      const activeTipBtn   = {};   // { templateIdx: { cat: btnEl } }
      
      // Helper function to copy outline to clipboard
      const copyOutlineToClipboard = (templateIdx) => {
        const container = document.querySelector(`.template-container[data-template="${templateIdx}"]`);
        if (!container) return;
        
        const title = container.querySelector('.title').textContent;
        const description = container.querySelector('.description').textContent;
        const tags = Array.from(container.querySelector('.tags').children)
          .map(el => el.textContent.replace('#', ''))
          .join('|');
        const duration = container.querySelector('.duration-text').textContent;
        
        const text = `TITLE: ${title}\n\nDESCRIPTION: ${description}\n\nTAGS: ${tags}\n\nDURATION: ${duration}`;
        
        navigator.clipboard.writeText(text)
          .then(() => notify('Outline copied to clipboard!'))
          .catch(err => notify('Failed to copy: ' + err));
      };

      /* ══ Template switcher buttons ══════════════════════ */
      document.querySelectorAll(".template-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.dataset.template);
          currentTemplate = idx;
          document.querySelectorAll(".template-btn").forEach(b => {
            const on = b === btn;
            b.classList.toggle("bg-blue-600", on);
            b.classList.toggle("text-white",   on);
            b.classList.toggle("bg-gray-200", !on);
            b.classList.toggle("text-gray-800", !on);
          });
          document.querySelectorAll(".template-container").forEach(div => {
            div.classList.toggle("hidden", Number(div.dataset.template) !== idx);
          });
        });
      });

      /* ══ Thumbnail replace ══════════════════════════════ */
      templatesWrapper.addEventListener("change", e => {
        const inp = e.target;
        if (!inp.classList.contains("thumb-input")) return;
        const file = inp.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        inp.closest(".template-container").querySelector(".thumbnail-img").src = url;
      });

      /* ══ Gauge setup ═══════════════════════════════════ */
      const engagementChart = new Chart(document.getElementById("engagementChart"), {
        type: "doughnut",
        data: { datasets: [{ data: [0, 100], backgroundColor: ["#3b82f6", "#e5e7eb"] }] },
        options: { circumference: Math.PI, rotation: -Math.PI, cutout: "75%", plugins: { legend: { display: false } } }
      });
      const setGauge = v => {
        engagementChart.data.datasets[0].data = [clamp(v), 100 - clamp(v)];
        engagementChart.update({ duration: 800 });
        document.getElementById("engagementProgress").style.width = clamp(v) + "%";
        document.getElementById("engagementScore").textContent = v.toFixed(2);
      };

      /* ══ Notification helper ═══════════════════════════ */
      const notify = msg => {
        notif.querySelector(".notification-message").textContent = msg;
        notif.style.top = "20px";
        setTimeout(() => (notif.style.top = "-100px"), 3000);
      };

      /* ══ Reset field helper ═════════════════════════════ */
      const resetField = (templateIdx, cat) => {
        const cont = document.querySelector(`.template-container[data-template="${templateIdx}"]`);
        if (!cont) return;
        const orig = originalContent[templateIdx];
        if (cat === "title") cont.querySelector(".title").textContent = orig.title;
        if (cat === "description") cont.querySelector(".description").textContent = orig.desc;
        if (cat === "tags") {
          const tagBox = cont.querySelector(".tags"); tagBox.innerHTML = "";
          orig.tags.split("|").forEach(t => {
            const span = document.createElement("span"); span.textContent = "#" + t.trim(); tagBox.appendChild(span);
          });
        }
        if (cat === "length") cont.querySelector(".duration-text").textContent = orig.length;
      };

      /* ══ Tips click delegation ═════════════════════════ */
      document.getElementById("tipsContainer").addEventListener("click", e => {
        const addBtn = e.target.closest(".add-tip-btn");
        const remBtn = e.target.closest(".remove-tip-btn");
        if (!addBtn && !remBtn) return;

        const idx = currentTemplate;
        activeTipBtn[idx] = activeTipBtn[idx] || {};

        /* ── REMOVE tip ── */
        if (remBtn) {
          const cat = remBtn.dataset.cat;
          resetField(idx, cat);
          remBtn.classList.replace("fa-minus-circle", "fa-plus-circle");
          remBtn.classList.remove("text-red-600", "remove-tip-btn");
          remBtn.classList.add("text-green-600", "add-tip-btn");
          activeTipBtn[idx][cat] = null;
          return;
        }

        /* ── ADD / REPLACE tip ── */
        const cat = addBtn.dataset.cat;
        const tip = addBtn.dataset.tip;

        // if another tip of same cat is active, revert it first
        const prev = activeTipBtn[idx][cat];
        if (prev) prev.click();

        const cont = document.querySelector(`.template-container[data-template="${idx}"]`);
        if (cat === "title") cont.querySelector(".title").textContent = tip;
        if (cat === "description") cont.querySelector(".description").textContent = tip;
        if (cat === "tags") {
          const tagBox = cont.querySelector(".tags"); tagBox.innerHTML = "";
          tip.split("|").forEach(t => {
            const span = document.createElement("span"); span.textContent = "#" + t.trim(); tagBox.appendChild(span);
          });
        }
        if (cat === "length") cont.querySelector(".duration-text").textContent = formatTime(Number(tip));

        addBtn.classList.replace("fa-plus-circle", "fa-minus-circle");
        addBtn.classList.remove("text-green-600", "add-tip-btn");
        addBtn.classList.add("text-red-600", "remove-tip-btn");
        activeTipBtn[idx][cat] = addBtn;
      });

      /* ══ Undo All button ═══════════════════════════════ */
      document.getElementById("undoBtn").onclick = () => {
        const idx = currentTemplate;
        if (!originalContent[idx]) return;
        ["title", "description", "tags", "length"].forEach(cat => {
          if (activeTipBtn[idx] && activeTipBtn[idx][cat]) activeTipBtn[idx][cat].click();
        });
      };

      /* ══ Form submit (Step 1) ═══════════════════════════ */
      form.addEventListener("submit", async ev => {
        ev.preventDefault();
        const fd = new FormData(form);

        const tagsRaw = (fd.get("tags") || "").replace(/#/g, "").replace(/[,;]/g, "|");
        if (!tagsRaw.trim()) return notify("Please enter at least one tag.");
        if (!fd.get("publish_datetime")) return notify("Please choose a publish date.");

        const dt = fd.get("publish_datetime") ? new Date(fd.get("publish_datetime")) : null;

        const payload = {
          title: fd.get("title"),
          description: fd.get("description"),
          duration_sec: Number(fd.get("duration_sec")),
          tags: tagsRaw,
          is_hd: fd.get("is_hd") ? 1 : 0,
          has_captions: fd.get("has_captions") ? 1 : 0,
          category_id: Number(fd.get("category_id")) || 0,
          publish_dow: dt ? (dt.getDay() === 0 ? 6 : dt.getDay() - 1) : 0,
          publish_hour: dt ? dt.getHours() : 12
        };

        loading.style.display = "flex";
        try {
          const r = await fetch(`${API_BASE_URL}/api/optimize`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
          const resTxt = await r.text();
          const res = JSON.parse(resTxt.replace(/\bNaN\b/g, "null"));
          loading.style.display = "none";
          step1.classList.add("hidden"); step2.classList.remove("hidden");
          setGauge(res.predicted_engagement);

          /* store originals and populate all outlines */
          document.querySelectorAll(".template-container").forEach(cont => {
            const idx = Number(cont.dataset.template);
            originalContent[idx] = {
              title: payload.title,
              desc: payload.description,
              tags: payload.tags,
              length: formatTime(payload.duration_sec)
            };
            activeTipBtn[idx] = {};

            cont.querySelector(".thumbnail-img").src = res.thumbnail || "";
            cont.querySelector(".title").textContent       = payload.title;
            cont.querySelector(".description").textContent = payload.description;
            cont.querySelector(".duration-text").textContent = formatTime(payload.duration_sec);
            const tagBox = cont.querySelector(".tags"); tagBox.innerHTML = "";
            payload.tags.split("|").forEach(t => {
              const span = document.createElement("span"); span.textContent = "#" + t.trim(); tagBox.appendChild(span);
            });
          });

          /* Tips cards */
          const tipsContainer = document.getElementById("tipsContainer");
          tipsContainer.innerHTML = "";
          const tips = res.gemini_tips || {};
          Object.entries(tips).forEach(([cat, { examples, suggestions }]) => {
            const card = document.createElement("div");
            card.className = "tip-card bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all";
            card.innerHTML = `
              <h4 class="text-lg font-semibold mb-3 text-blue-700">${cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
              <ul class="space-y-2">
                ${examples.map(t=>`
                  <li class="flex justify-between items-start bg-blue-50/50 rounded p-2">
                    <span class="flex-1 text-gray-800"><i class="fas fa-quote-left mr-1 text-blue-400"></i>${t}</span>
                    <button type="button" data-cat="${cat}" data-tip="${t.replace(/"/g,'&quot;')}" class="add-tip-btn ml-2 text-green-600 hover:text-green-800">
                      <i class="fas fa-plus-circle"></i>
                    </button>
                  </li>`).join("")}
              </ul>
              ${suggestions.length?`
              <div class="mt-4 border-t border-gray-100 pt-3">
                <h5 class="font-medium mb-2 text-gray-700">Suggestions</h5>
                <ul class="space-y-2">
                  ${suggestions.map(s=>`<li class="text-sm text-gray-600 italic"><i class="fas fa-lightbulb text-amber-400 mr-1"></i>${s}</li>`).join("")}
                </ul>
              </div>`:""}
            `;
            tipsContainer.appendChild(card);
          });

          /* Similar videos (unchanged from earlier) */
          const cards = document.getElementById("videoCards"); cards.innerHTML = "";
          (res.reference_videos || []).forEach(v => {
            const div = document.createElement("div");
            div.className = "bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden";
            div.innerHTML = `
              <img src="https://img.youtube.com/vi/${v["video id"]}/hqdefault.jpg" class="w-full h-48 object-cover">
              <div class="p-5">
                <h4 class="font-medium mb-2">${v["video title"]}</h4>
                <p class="text-xs text-gray-500 mb-2"><i class="fas fa-eye mr-1"></i>${v["view count"]}&nbsp;<i class="fas fa-thumbs-up mr-1"></i>${v["like count"]}</p>
                <p class="text-xs text-gray-600 mb-3"><strong>Length:</strong> ${v["length_sec"]} s</p>
                ${(v.tags||"").split("|").slice(0,3).map(t=>`<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">#${t}</span>`).join(" ")}
              </div>`;
            if (v["video id"]) div.onclick = () => window.open(`https://www.youtube.com/watch?v=${v["video id"]}`, "_blank");
            div.style.cursor = "pointer";
            cards.appendChild(div);
          });

        } catch (err) {
          console.error(err); loading.style.display = "none"; notify("Optimisation failed – check console.");
        }
      });

      /* ══ Make outline templates editable once loaded ══ */
      document.querySelectorAll('.template-container').forEach(container => {
        // Make title and description editable
        const titleEl = container.querySelector('.title');
        const descEl = container.querySelector('.description');
        titleEl.setAttribute('contenteditable', 'true');
        descEl.setAttribute('contenteditable', 'true');
        
        // Add styling hints for editable elements
        titleEl.classList.add('hover:bg-blue-50', 'focus:bg-blue-50', 'focus:outline-none', 'p-1');
        descEl.classList.add('hover:bg-blue-50', 'focus:bg-blue-50', 'focus:outline-none', 'p-1');
        
        // Add copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'absolute top-2 right-2 bg-white/75 backdrop-blur px-2 py-0.5 text-xs rounded cursor-pointer shadow';
        copyBtn.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy';
        copyBtn.addEventListener('click', (e) => {
          e.preventDefault();
          copyOutlineToClipboard(container.dataset.template);
        });
        
        const thumbnailContainer = container.querySelector('.relative.group');
        thumbnailContainer.appendChild(copyBtn);
      });
      
      /* ══ Misc: back button, filter ════════════════ */
      document.getElementById("goBackBtn").onclick = () => { step2.classList.add("hidden"); step1.classList.remove("hidden"); };
      document.querySelector(".video-filter-clear").onclick = () => { const f=document.getElementById("videoFilter"); f.value=""; f.dispatchEvent(new Event("input")); };
      document.getElementById("videoFilter").oninput = ev => {
        const q = ev.target.value.toLowerCase(); document.querySelectorAll("#videoCards > div").forEach(c=>c.style.display=c.textContent.toLowerCase().includes(q)?"":"none");
      };
    });
  </script>
</body>
</html>
