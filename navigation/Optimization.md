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
  <title>Hospital Video Optimiser</title>

  <!-- Bulma CSS -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css"
  />
  <!-- FontAwesome -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
  />
  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <style>
    :root {
      --bg-gradient-light: linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%);
      --bg-gradient-dark: linear-gradient(135deg, #1a1d21 0%, #111827 100%);
      --text-primary-light: #333;
      --text-primary-dark: #e2e8f0;
      --text-secondary-light: #6b7280;
      --text-secondary-dark: #9ca3af;
      --bg-card-light: #fff;
      --bg-card-dark: #1e293b;
      --border-color-light: #e1e4e8;
      --border-color-dark: #2d3748;
      --primary-color: #3273dc;
      --primary-color-dark: #4e7dd9;
      --shadow-light: 0 4px 20px rgba(0, 0, 0, 0.05);
      --shadow-dark: 0 4px 20px rgba(0, 0, 0, 0.25);
    }
    
    body.dark-mode {
      --bg-gradient: var(--bg-gradient-dark);
      --text-primary: var(--text-primary-dark);
      --text-secondary: var(--text-secondary-dark);
      --bg-card: var(--bg-card-dark);
      --border-color: var(--border-color-dark);
      --shadow: var(--shadow-dark);
      color-scheme: dark;
    }
    
    body.light-mode {
      --bg-gradient: var(--bg-gradient-light);
      --text-primary: var(--text-primary-light);
      --text-secondary: var(--text-secondary-light);
      --bg-card: var(--bg-card-light);
      --border-color: var(--border-color-light);
      --shadow: var(--shadow-light);
      color-scheme: light;
    }
    
    html, body { 
      height: 100%; 
      background: var(--bg-gradient);
      color: var(--text-primary);
      transition: background 0.3s ease, color 0.3s ease;
    }
    
    .loading-overlay {
      position: fixed; top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(var(--bg-card-rgb, 255, 255, 255), 0.9);
      display: none; align-items: center; justify-content: center;
      font-size: 1.75rem; color: var(--primary-color); z-index: 1000; font-weight: 600;
      backdrop-filter: blur(3px);
    }
    
    /* Instructions header */
    .instructions-header {
      background: var(--bg-card);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: var(--shadow);
      border: 1px solid var(--border-color);
      position: relative;
    }
    
    .instructions-steps {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 1rem 0;
    }
    
    .instruction-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      flex: 1;
    }
    
    .instruction-step:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 2rem;
      right: -45%;
      width: 90%;
      height: 2px;
      background: var(--border-color);
    }
    
    .instruction-number {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      background: var(--bg-card);
      border: 2px solid var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-color);
      margin-bottom: 1rem;
      position: relative;
      z-index: 2;
    }
    
    .instruction-step.active .instruction-number {
      background: var(--primary-color);
      color: white;
    }
    
    .instruction-text {
      font-weight: 600;
      text-align: center;
      color: var(--text-primary);
    }
    
    .dark-mode-toggle {
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-size: 1.5rem;
      transition: transform 0.3s ease;
    }
    
    .dark-mode-toggle:hover {
      transform: rotate(30deg);
    }
    
    /* Other styles from previous version */
    .steps { 
      margin-bottom: 2rem; 
    }
    
    .accordion details {
      margin-bottom: 1rem; 
      border: 1px solid var(--border-color);
      border-radius: 12px; 
      padding: 0.75rem 1rem; 
      background: var(--bg-card);
      box-shadow: var(--shadow);
      transition: box-shadow 0.3s, transform 0.2s;
    }
    
    .accordion details:hover {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    }
    
    .accordion summary { 
      cursor: pointer; 
      font-weight: bold; 
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--text-primary);
    }
    
    .video-card { 
      transition: all 0.3s ease; 
      height: 100%;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: var(--shadow);
      background: var(--bg-card);
    }
    
    .video-card:hover { 
      transform: translateY(-7px); 
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
    }
    
    .outline-box {
      background: var(--bg-card); 
      padding: 2rem; 
      border-radius: 12px; 
      margin-bottom: 1.5rem;
      box-shadow: var(--shadow);
      border: 1px solid var(--border-color);
    }
    
    .upload-placeholder {
      border: 2px dashed var(--border-color);
      border-radius: 12px;
      height: 150px; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      color: var(--text-secondary); 
      cursor: pointer; 
      margin-bottom: 0.5rem;
      transition: all 0.2s;
      background: rgba(250, 250, 250, 0.5);
    }
    
    .upload-placeholder:hover {
      border-color: var(--primary-color);
    }
    
    .tabs.is-centered { 
      justify-content: center; 
      margin-bottom: 1rem; 
    }
    
    .tabs li.is-active a { 
      border-bottom-color: var(--primary-color); 
      color: var(--primary-color);
      font-weight: 600;
    }
    
    .tabs li a {
      color: var(--text-primary);
    }
    
    .box {
      border-radius: 12px;
      box-shadow: var(--shadow);
      transition: transform 0.2s, box-shadow 0.2s;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
    }
    
    .box:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }
    
    .title {
      color: var(--text-primary);
    }
    
    .subtitle {
      color: var(--text-secondary);
    }
    
    .button.is-primary {
      background-color: var(--primary-color);
      transition: background-color 0.3s, transform 0.1s;
    }
    
    .button.is-primary:hover {
      background-color: var(--primary-color-dark);
      transform: translateY(-2px);
    }
    
    .button.is-primary:active {
      transform: translateY(0);
    }
    
    .button.is-link {
      transition: all 0.2s;
    }
    
    .button.is-link:hover {
      transform: translateY(-2px);
    }
    
    #outlinesContainer ul li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border-color);
      transition: background-color 0.2s;
      color: var(--text-primary);
    }
    
    #outlinesContainer ul li:hover {
      background-color: rgba(0, 0, 0, 0.03);
      padding-left: 0.25rem;
    }
    
    #outlinesContainer ul li:focus {
      outline: none;
      background-color: rgba(50, 115, 220, 0.1);
      padding-left: 0.5rem;
    }
    
    .card-content {
      padding: 1.25rem;
      color: var(--text-primary);
    }
    
    .progress.is-primary {
      height: 0.75rem;
    }
    
    input.input, select.select, textarea.textarea {
      border-radius: 8px;
      border-color: var(--border-color);
      box-shadow: none;
      transition: all 0.2s;
      background-color: var(--bg-card);
      color: var(--text-primary);
    }
    
    input.input:focus, select.select:focus, textarea.textarea:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(50, 115, 220, 0.25);
    }
    
    .label {
      color: var(--text-primary);
    }
    
    .help {
      font-style: italic;
      color: var(--text-secondary);
    }
    
    .notification {
      border-radius: 8px;
    }
    
    /* Animated step indicator */
    .step-marker {
      transition: all 0.3s ease;
    }
    
    .step-item.is-active .step-marker {
      background-color: var(--primary-color);
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(50, 115, 220, 0.7);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(50, 115, 220, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(50, 115, 220, 0);
      }
    }
    
    /* Custom section padding */
    .section {
      padding: 3rem 1.5rem;
    }
    
    /* Card image hover effect */
    .card-image {
      overflow: hidden;
    }
    
    .card-image img {
      transition: transform 0.5s ease;
    }
    
    .card-image:hover img {
      transform: scale(1.05);
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: var(--border-color);
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: var(--text-secondary);
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: var(--primary-color);
    }
  </style>
</head>

<body class="light-mode">
  <div class="loading-overlay" id="loadingOverlay">
    <div class="has-text-centered">
      <i class="fas fa-circle-notch fa-spin fa-2x mb-3"></i>
      <div>Optimising Your Content...</div>
      <div class="is-size-7 mt-2">Processing with AI</div>
    </div>
  </div>

  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered is-2 mb-5">
        <i class="fa-solid fa-chart-line has-text-primary"></i> Hospital Video Optimiser
      </h1>
      <p class="subtitle has-text-centered is-5 mb-5">Enhance your hospital's video content with AI-powered insights</p>
      
      <!-- New Instructions Header -->
      <div class="instructions-header">
        <button id="darkModeToggle" class="dark-mode-toggle">
          <i class="fas fa-moon"></i>
        </button>
        <h3 class="title is-5 has-text-centered mb-3">How It Works</h3>
        <div class="instructions-steps">
          <div class="instruction-step active" id="instructionStep1">
            <div class="instruction-number">1</div>
            <div class="instruction-text">Describe Video</div>
          </div>
          <div class="instruction-step" id="instructionStep2">
            <div class="instruction-number">2</div>
            <div class="instruction-text">See Results</div>
          </div>
        </div>
        <p class="has-text-centered mt-3">
          <span id="instructionDetail" class="has-text-grey">Enter the details of your hospital video to receive AI-powered optimization suggestions</span>
        </p>
      </div>

      <!-- FORM (Step 1) -->
      <div id="step1">
        <div class="box">
          <h2 class="subtitle has-text-weight-bold">
            <i class="fas fa-pencil-alt mr-2 has-text-primary"></i>
            Step 1 – Describe your video
          </h2>
          <form id="videoForm">
            <div class="columns is-multiline">
              <div class="column is-4">
                <label class="label">Platform</label>
                <div class="control has-icons-left">
                  <div class="select is-fullwidth">
                    <select name="platform" disabled>
                      <option value="youtube" selected>YouTube</option>
                      <option value="tiktok">TikTok</option>
                      <option value="instagram">Instagram Reels</option>
                    </select>
                  </div>
                  <span class="icon is-small is-left">
                    <i class="fab fa-youtube has-text-danger"></i>
                  </span>
                </div>
                <p class="help">Currently only YouTube is supported.</p>
              </div>
              <div class="column is-4">
                <label class="label">Category ID</label>
                <div class="control has-icons-left">
                  <input class="input" name="category_id" type="number" min="1" value="27" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-tag"></i>
                  </span>
                </div>
                <p class="help">Leave default if unsure.</p>
              </div>
              <div class="column is-4">
                <label class="label">Duration (seconds)</label>
                <div class="control has-icons-left">
                  <input class="input" name="duration_sec" type="number" min="5" required />
                  <span class="icon is-small is-left">
                    <i class="fas fa-clock"></i>
                  </span>
                </div>
                <p class="help">Length of your video in seconds</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Title</label>
              <div class="control has-icons-left">
                <input class="input" name="title" maxlength="100" required placeholder="Enter an engaging title for your video" />
                <span class="icon is-small is-left">
                  <i class="fas fa-heading"></i>
                </span>
              </div>
              <p class="help">Catchy titles improve click-through rates</p>
            </div>

            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea class="textarea" name="description" rows="4" placeholder="Describe what your video is about..."></textarea>
              </div>
              <p class="help">A thorough description helps with SEO and viewer understanding</p>
            </div>

            <div class="field">
              <label class="label">Tags <span class="has-text-grey">(pipe-separated)</span></label>
              <div class="control has-icons-left">
                <textarea class="textarea" name="tags" rows="2" placeholder="cardiology|heart health|angioplasty"></textarea>
                <span class="icon is-small is-left" style="top: 0.75rem;">
                  <i class="fas fa-hashtag"></i>
                </span>
              </div>
              <p class="help">Tags help your video appear in searches</p>
            </div>

            <div class="columns">
              <div class="column is-3">
                <div class="field">
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox" name="is_hd" checked /> 
                      <span class="ml-2"><i class="fas fa-tv mr-1"></i> HD video</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="column is-3">
                <div class="field">
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox" name="has_captions" /> 
                      <span class="ml-2"><i class="fas fa-closed-captioning mr-1"></i> Includes captions</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <label class="label"><i class="fas fa-calendar-alt mr-1"></i> Publish date/time</label>
                <div class="control">
                  <input class="input" name="publish_datetime" type="datetime-local" />
                </div>
                <p class="help">Timing affects viewership</p>
              </div>
            </div>

            <div class="field has-text-right mt-5">
              <button type="submit" class="button is-primary is-medium">
                <span class="icon"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
                <span>Optimise</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- RESULTS (Step 2) -->
      <div id="step2" class="is-hidden">
        <h2 class="subtitle has-text-weight-bold mb-4">
          <i class="fas fa-chart-line mr-2 has-text-primary"></i>
          Step 2 – Results
        </h2>

        <!-- Engagement Score Card -->
        <div class="box">
          <h3 class="title is-5 mb-4">
            <i class="fas fa-gauge-high mr-2 has-text-primary"></i> 
            Predicted Engagement
          </h3>
          <div class="columns is-vcentered">
            <div class="column is-4">
              <canvas id="engagementChart"></canvas>
            </div>
            <div class="column">
              <progress
                id="engagementProgress"
                class="progress is-primary is-medium"
                value="0"
                max="100"
              ></progress>
              <p class="mt-3 has-text-centered">
                Engagement Score: <strong id="engagementScore" class="is-size-4 has-text-primary">N/A</strong> / 100
              </p>
              <p class="has-text-grey has-text-centered is-size-7 mt-2">
                Based on machine learning analysis of similar content
              </p>
            </div>
          </div>
        </div>

        <!-- Sample Outlines Tabs -->
        <div class="outline-box">
          <h3 class="title is-5 mb-4">
            <i class="fas fa-clipboard-list mr-2 has-text-primary"></i> 
            AI-Generated Outlines
          </h3>
          <div class="tabs is-centered">
            <ul id="outlineTabs">
              <li class="is-active" data-index="0"><a>Outline 1</a></li>
              <li data-index="1"><a>Outline 2</a></li>
              <li data-index="2"><a>Outline 3</a></li>
            </ul>
          </div>
          <div id="outlinesContainer" class="px-4">
            <div class="content" data-index="0" style="display:block;">
              <ul id="outlineList0" class="pl-5"></ul>
            </div>
            <div class="content" data-index="1" style="display:none;">
              <ul id="outlineList1" class="pl-5"></ul>
            </div>
            <div class="content" data-index="2" style="display:none;">
              <ul id="outlineList2" class="pl-5"></ul>
            </div>
          </div>
          <div class="has-text-centered mt-5">
            <button id="reEvalBtn" class="button is-link">
              <span class="icon"><i class="fas fa-sync-alt"></i></span>
              <span>Re-evaluate with these changes</span>
            </button>
          </div>
        </div>

        <!-- Improvement Tips Accordion -->
        <div class="box">
          <h3 class="title is-5 mb-4">
            <i class="fas fa-lightbulb mr-2 has-text-warning"></i> 
            Improvement Tips <span class="is-size-7 has-text-grey">(click "+" to add to outline)</span>
          </h3>
          <div class="accordion" id="tipsAccordion"></div>
        </div>

        <!-- Similar Videos Filter + Cards -->
        <div class="box">
          <h3 class="title is-5 mb-4">
            <i class="fas fa-film mr-2 has-text-primary"></i> 
            Similar High-Performing Videos
          </h3>
          <div class="field mb-5">
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="text"
                id="videoFilter"
                placeholder="Filter by title or tag..."
              />
              <span class="icon is-left"><i class="fas fa-search"></i></span>
              <span class="icon is-right video-filter-clear" style="pointer-events: all; cursor: pointer;">
                <i class="fas fa-times-circle"></i>
              </span>
            </div>
          </div>
          <div class="columns is-multiline" id="videoCards"></div>
        </div>
        
        <!-- Add back button -->
        <div class="has-text-centered mt-5">
          <button id="goBackBtn" class="button is-light">
            <span class="icon"><i class="fas fa-arrow-left"></i></span>
            <span>Edit Video Details</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const API_BASE_URL = "http://127.0.0.1:8115";
      const form = document.getElementById("videoForm");
      const step1 = document.getElementById("step1");
      const step2 = document.getElementById("step2");
      const steps = document.querySelectorAll(".step-item");
      const loading = document.getElementById("loadingOverlay");
      const instructionStep1 = document.getElementById("instructionStep1");
      const instructionStep2 = document.getElementById("instructionStep2");
      const instructionDetail = document.getElementById("instructionDetail");
      
      // Dark mode toggle
      const darkModeToggle = document.getElementById("darkModeToggle");
      
      // Check for saved preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        document.body.className = savedTheme === 'dark' ? 'dark-mode' : 'light-mode';
        updateThemeIcon();
      }
      
      darkModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
          document.body.classList.remove('dark-mode');
          document.body.classList.add('light-mode');
          localStorage.setItem('theme', 'light');
        } else {
          document.body.classList.remove('light-mode');
          document.body.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark');
        }
        updateThemeIcon();
      });
      
      function updateThemeIcon() {
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
          icon.className = 'fas fa-sun';
        } else {
          icon.className = 'fas fa-moon';
        }
      }

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
          step2.classList.add('is-hidden');
          step1.classList.remove('is-hidden');
          
          // Update instruction steps
          instructionStep1.classList.add('active');
          instructionStep2.classList.remove('active');
          instructionDetail.textContent = 'Enter the details of your hospital video to receive AI-powered optimization suggestions';
        });
      }

      // Chart.js gauge
      let engagementChart = new Chart(document.getElementById("engagementChart"), {
        type: "doughnut",
        data: {
          datasets: [{
            data: [0, 100],
            backgroundColor: ["#3273dc","#eee"]
          }]
        },
        options: {
          circumference: Math.PI,
          rotation: -Math.PI,
          cutout: "75%",
          plugins: { legend: { display: false } }
        }
      });

      // helper: clamp 0–100
      function clamp(x){ return Math.max(0, Math.min(x,100)); }

      // handle outline tabs
      const outlineTabs = document.getElementById("outlineTabs");
      if (outlineTabs) {
        outlineTabs.onclick = e => {
          if(!e.target.closest("li")) return;
          outlineTabs.querySelectorAll("li").forEach(li=>li.classList.remove("is-active"));
          e.target.closest("li").classList.add("is-active");
          const idx = e.target.closest("li").dataset.index;
          document.querySelectorAll("#outlinesContainer .content")
            .forEach(div=>div.style.display = div.dataset.index===idx?"block":"none");
        };
      }

      // add "+" to tip
      function makePlusBtn(tipIndex){
        const btn = document.createElement("button");
        btn.className = "button is-small is-success";
        btn.innerHTML = "<i class='fas fa-plus'></i>";
        btn.onclick = () => {
          const active = outlineTabs.querySelector("li.is-active").dataset.index;
          const li = document.createElement("li");
          li.contentEditable = "true";
          li.textContent = tipsArray[tipIndex];
          document.getElementById("outlineList"+active).appendChild(li);
        };
        return btn;
      }

      let currentPayload = null, tipsArray = [];

      async function runOptimize(){
        // Update instructions
        instructionStep1.classList.remove('active');
        instructionStep2.classList.add('active');
        instructionDetail.textContent = 'View AI-powered suggestions and compare with similar high-performing videos';
        
        // same as submit logic
        loading.style.display = "flex";
        const fd = new FormData(form);
        const data = {
          title: fd.get("title"),
          description: fd.get("description"),
          duration_sec: +fd.get("duration_sec"),
          tags: fd.get("tags"),
          category_id: +fd.get("category_id"),
          is_hd: fd.get("is_hd")==="on"?1:0,
          has_captions: fd.get("has_captions")==="on"?1:0
        };
        const pd = fd.get("publish_datetime");
        if(pd){
          const dt=new Date(pd);
          data.publish_dow = dt.getDay()===0?6:dt.getDay()-1;
          data.publish_hour = dt.getHours();
        } else {
          data.publish_dow = 0; data.publish_hour = 12;
        }
        currentPayload = data;

        try {
          const res = await fetch(`${API_BASE_URL}/api/optimize`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
          });
          
          const raw = await res.text();
          const result = JSON.parse(raw.replace(/\bNaN\b/g,"null"));
          loading.style.display = "none";

          // switch to step2
          step1.classList.add("is-hidden");
          step2.classList.remove("is-hidden");

          // predicted engagement animate
          const pred = clamp(result.predicted_engagement);
          engagementChart.data.datasets[0].data = [pred,100-pred];
          engagementChart.update({duration:800});
          document.getElementById("engagementScore").textContent = result.predicted_engagement.toFixed(2);
          document.getElementById("engagementProgress").value = pred;

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
                li.textContent = parts || tipsArray[i];
                outlineUl.appendChild(li);
              }
            }
          }

          // tips accordion with "+"
          const acc = document.getElementById("tipsAccordion");
          if (acc) {
            acc.innerHTML = "";
            if(result.gemini_tips.tips){
              tipsArray.forEach((tip, i)=>{
                const detail = document.createElement("details");
                if(i===0) detail.open=true;
                detail.innerHTML = `<summary>Tip ${i+1}</summary><p class="mt-2">${tip}</p>`;
                detail.querySelector("summary").appendChild(makePlusBtn(i));
                acc.appendChild(detail);
              });
            } else {
              acc.innerHTML = `<div class="notification is-danger">${result.gemini_tips.error || "Failed to generate tips"}</div>`;
            }
          }

          // video cards
          const cards = document.getElementById("videoCards");
          if (cards) {
            cards.innerHTML = "";
            (result.reference_videos||[]).forEach(v=>{
              const col = document.createElement("div");
              col.className="column is-4";
              col.innerHTML=`
                <div class="card video-card">
                  <div class="card-image">
                    <figure class="image is-16by9">
                      <img src="https://img.youtube.com/vi/${v["video id"] || ""}/hqdefault.jpg" alt="Thumbnail">
                      <div class="play-button" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:50px; height:50px; background:rgba(255,0,0,0.8); border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;">
                        <i class="fas fa-play" style="color:white; font-size:20px;"></i>
                      </div>
                    </figure>
                  </div>
                  <div class="card-content">
                    <p class="title is-6">${v["video title"]}</p>
                    <p class="subtitle is-7">
                      <i class="fas fa-eye"></i> ${v["view count"]} &nbsp;
                      <i class="fas fa-thumbs-up"></i> ${v["like count"]} &nbsp;
                      <i class="fas fa-comment"></i> ${v["comment count"]}
                    </p>
                    <p class="is-size-7"><strong>Length:</strong> ${v["length_sec"]}s</p>
                    <div class="tags are-small mt-2">
                      ${(v["tags"] || "").split('|').slice(0,3).map(tag => 
                        `<span class="tag is-info is-light">${tag}</span>`
                      ).join('')}
                      ${v["tags"] && v["tags"].split('|').length > 3 ? 
                        `<span class="tag is-light">+${v["tags"].split('|').length - 3} more</span>` : ''}
                    </div>
                  </div>
                </div>`;
              cards.appendChild(col);
              
              // Make entire card clickable to YouTube
              if (v["video id"]) {
                const videoCard = col.querySelector('.video-card');
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
              cards.childNodes.forEach(col => {
                col.style.display = col.textContent.toLowerCase().includes(q) ? "" : "none";
              });
            };
          }
        } catch (error) {
          console.error("Optimization failed:", error);
          loading.style.display = "none";
          alert("Sorry, there was an error connecting to the optimization service. Please try again later.");
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
            document.getElementById("engagementProgress").value = imp;
          })
          .catch(error => {
            console.error("Re-evaluation failed:", error);
            loading.style.display = "none";
            alert("Sorry, there was an error processing your request.");
          });
        };
      }
    });
  </script>
</body>
</html>
