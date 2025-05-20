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
    html, body { 
      height: 100%; 
      background: linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%);
      color: #333;
    }
    
    .loading-overlay {
      position: fixed; top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(255,255,255,0.9);
      display: none; align-items: center; justify-content: center;
      font-size: 1.75rem; color: #3273dc; z-index: 1000; font-weight: 600;
      backdrop-filter: blur(3px);
    }
    
    .steps { 
      margin-bottom: 2rem; 
    }
    
    .accordion details {
      margin-bottom: 1rem; 
      border: 1px solid #e1e4e8;
      border-radius: 12px; 
      padding: 0.75rem 1rem; 
      background: #fff;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.03);
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
    }
    
    .video-card { 
      transition: all 0.3s ease; 
      height: 100%;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    
    .video-card:hover { 
      transform: translateY(-7px); 
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
    }
    
    .outline-box {
      background: #fff; 
      padding: 2rem; 
      border-radius: 12px; 
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    
    .upload-placeholder {
      border: 2px dashed #ccc; 
      border-radius: 12px;
      height: 150px; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      color: #888; 
      cursor: pointer; 
      margin-bottom: 0.5rem;
      transition: all 0.2s;
      background: rgba(250, 250, 250, 0.5);
    }
    
    .upload-placeholder:hover {
      border-color: #3273dc;
      background: rgba(240, 245, 255, 0.5);
    }
    
    .tabs.is-centered { 
      justify-content: center; 
      margin-bottom: 1rem; 
    }
    
    .tabs li.is-active a { 
      border-bottom-color: #3273dc; 
      color: #3273dc;
      font-weight: 600;
    }
    
    .box {
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .box:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }
    
    .title {
      color: #2c3e50;
    }
    
    .subtitle {
      color: #34495e;
    }
    
    .button.is-primary {
      background-color: #3273dc;
      transition: background-color 0.3s, transform 0.1s;
    }
    
    .button.is-primary:hover {
      background-color: #2366d1;
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
      border-bottom: 1px solid #f0f0f0;
      transition: background-color 0.2s;
    }
    
    #outlinesContainer ul li:hover {
      background-color: #f8f9fa;
      padding-left: 0.25rem;
    }
    
    #outlinesContainer ul li:focus {
      outline: none;
      background-color: #f0f7ff;
      padding-left: 0.5rem;
    }
    
    .card-content {
      padding: 1.25rem;
    }
    
    .progress.is-primary {
      height: 0.75rem;
    }
    
    input.input, select.select, textarea.textarea {
      border-radius: 8px;
      border-color: #e1e4e8;
      box-shadow: none;
      transition: all 0.2s;
    }
    
    input.input:focus, select.select:focus, textarea.textarea:focus {
      border-color: #3273dc;
      box-shadow: 0 0 0 2px rgba(50, 115, 220, 0.25);
    }
    
    .label {
      color: #34495e;
    }
    
    .help {
      font-style: italic;
    }
    
    .notification {
      border-radius: 8px;
    }
    
    /* Animated step indicator */
    .step-marker {
      transition: all 0.3s ease;
    }
    
    .step-item.is-active .step-marker {
      background-color: #3273dc;
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
      background: #f1f1f1;
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #bbb;
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #3273dc;
    }
  </style>
</head>

<body>
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
      <p class="subtitle has-text-centered is-5 mb-6">Enhance your hospital's video content with AI-powered insights</p>

      <!-- Step Wizard -->
      <div class="steps is-centered">
        <div class="step-item is-active" data-step="1">
          <div class="step-marker">1</div>
          <div class="step-details"><p class="step-title">Describe Video</p></div>
        </div>
        <div class="step-item" data-step="2">
          <div class="step-marker">2</div>
          <div class="step-details"><p class="step-title">See Results</p></div>
        </div>
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

      // Add clear filter functionality
      document.querySelector('.video-filter-clear').addEventListener('click', () => {
        const filterInput = document.getElementById('videoFilter');
        filterInput.value = '';
        filterInput.dispatchEvent(new Event('input'));
      });
      
      // Add back button functionality
      if (document.getElementById('goBackBtn')) {
        document.getElementById('goBackBtn').addEventListener('click', () => {
          step2.classList.add('is-hidden');
          steps[1].classList.remove('is-active');
          steps[0].classList.add('is-active');
          step1.classList.remove('is-hidden');
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
      outlineTabs.onclick = e => {
        if(!e.target.closest("li")) return;
        outlineTabs.querySelectorAll("li").forEach(li=>li.classList.remove("is-active"));
        e.target.closest("li").classList.add("is-active");
        const idx = e.target.closest("li").dataset.index;
        document.querySelectorAll("#outlinesContainer .content")
          .forEach(div=>div.style.display = div.dataset.index===idx?"block":"none");
      };

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
        steps[0].classList.remove("is-active");
        steps[1].classList.add("is-active");
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
          outlineUl.innerHTML = "";
          if(tipsArray[i]) {
            const parts = tipsArray[i].split(/[:\-–]/).slice(1).join("");
            const li = document.createElement("li");
            li.contentEditable="true";
            li.textContent = parts || tipsArray[i];
            outlineUl.appendChild(li);
          }
        }

        // tips accordion with "+"
        const acc = document.getElementById("tipsAccordion");
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
          acc.innerHTML = `<div class="notification is-danger">${result.gemini_tips.error}</div>`;
        }

        // video cards
        const cards = document.getElementById("videoCards");
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

        // filter
        document.getElementById("videoFilter").oninput = ev=>{
          const q = ev.target.value.toLowerCase();
          cards.childNodes.forEach(col=>{
            col.style.display = col.textContent.toLowerCase().includes(q) ? "" : "none";
          });
        };
      }

      // initial form submit
      form.addEventListener("submit", e=>{
        e.preventDefault();
        runOptimize();
      });

      // re-evaluate button
      document.getElementById("reEvalBtn").onclick = () => {
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
        });
      };
    });
  </script>
</body>
</html>
