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
    html, body { height: 100%; background: #f5f7fa; }
    .loading-overlay {
      position: fixed; top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(255,255,255,0.85);
      display: none; align-items: center; justify-content: center;
      font-size: 1.75rem; color: #3273dc; z-index: 1000; font-weight: 600;
    }
    .steps { margin-bottom: 2rem; }
    .accordion details {
      margin-bottom: 1rem; border: 1px solid #ddd;
      border-radius: 5px; padding: 0.5rem; background: #fff;
    }
    .accordion summary { cursor: pointer; font-weight: bold; }
    .video-card { transition: transform .2s; }
    .video-card:hover { transform: translateY(-5px); }
    .outline-box {
      background: #fff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;
    }
    .upload-placeholder {
      border: 2px dashed #ccc; border-radius: 6px;
      height: 150px; display: flex; align-items: center; justify-content: center;
      color: #888; cursor: pointer; margin-bottom: 0.5rem;
    }
    .tabs.is-centered { justify-content: center; margin-bottom: 1rem; }
    .tabs li.is-active a { border-bottom-color: #3273dc; }
  </style>
</head>

<body>
  <div class="loading-overlay" id="loadingOverlay">
    <i class="fas fa-circle-notch fa-spin"></i>&nbsp;Optimising...
  </div>

  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">
        <i class="fa-solid fa-chart-line"></i> Hospital Video Optimiser
      </h1>

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
          <form id="videoForm">
            <h2 class="subtitle">Step 1 – Describe your video</h2>
            <div class="columns is-multiline">
              <div class="column is-4">
                <label class="label">Platform</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select name="platform" disabled>
                      <option value="youtube" selected>YouTube</option>
                      <option value="tiktok">TikTok</option>
                      <option value="instagram">Instagram Reels</option>
                    </select>
                  </div>
                </div>
                <p class="help">Currently only YouTube is supported.</p>
              </div>
              <div class="column is-4">
                <label class="label">Category ID</label>
                <div class="control">
                  <input class="input" name="category_id" type="number" min="1" value="27" />
                </div>
                <p class="help">Leave default if unsure.</p>
              </div>
              <div class="column is-4">
                <label class="label">Duration (s)</label>
                <div class="control">
                  <input class="input" name="duration_sec" type="number" min="5" required />
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">Title</label>
              <div class="control"><input class="input" name="title" maxlength="100" required /></div>
            </div>

            <div class="field">
              <label class="label">Description</label>
              <div class="control"><textarea class="textarea" name="description" rows="4"></textarea></div>
            </div>

            <div class="field">
              <label class="label">Tags <span class="has-text-grey">(pipe-separated)</span></label>
              <div class="control">
                <textarea class="textarea" name="tags" rows="2" placeholder="cardiology|heart health|angioplasty"></textarea>
              </div>
            </div>

            <div class="columns">
              <div class="column is-3">
                <label class="checkbox"><input type="checkbox" name="is_hd" checked /> HD video</label>
              </div>
              <div class="column is-3">
                <label class="checkbox"><input type="checkbox" name="has_captions" /> Includes captions</label>
              </div>
              <div class="column is-6">
                <label class="label">Publish date/time</label>
                <input class="input" name="publish_datetime" type="datetime-local" />
              </div>
            </div>

            <div class="field has-text-right">
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
        <h2 class="subtitle">Step 2 – Results</h2>

        <!-- Engagement Score Card -->
        <div class="box">
          <h3 class="title is-5">Predicted Engagement</h3>
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
              <p class="mt-2">
                Score: <strong id="engagementScore">N/A</strong> / 100
              </p>
            </div>
          </div>
        </div>

        <!-- Sample Outlines Tabs -->
        <div class="outline-box">
          <h3 class="title is-5">📋 AI-Generated Outlines</h3>
          <div class="tabs is-centered">
            <ul id="outlineTabs">
              <li class="is-active" data-index="0"><a>Outline 1</a></li>
              <li data-index="1"><a>Outline 2</a></li>
              <li data-index="2"><a>Outline 3</a></li>
            </ul>
          </div>
          <div id="outlinesContainer">
            <div class="content" data-index="0" style="display:block;">
              <ul id="outlineList0"></ul>
            </div>
            <div class="content" data-index="1" style="display:none;">
              <ul id="outlineList1"></ul>
            </div>
            <div class="content" data-index="2" style="display:none;">
              <ul id="outlineList2"></ul>
            </div>
          </div>
          <button id="reEvalBtn" class="button is-link is-light">Re-evaluate</button>
        </div>

        <!-- Improvement Tips Accordion -->
        <div class="box">
          <h3 class="title is-5">Improvement Tips (click “+” to add to outline)</h3>
          <div class="accordion" id="tipsAccordion"></div>
        </div>

        <!-- Similar Videos Filter + Cards -->
        <div class="box">
          <h3 class="title is-5">Similar High-Performing Videos</h3>
          <div class="field">
            <div class="control has-icons-left">
              <input
                class="input"
                type="text"
                id="videoFilter"
                placeholder="Filter by title or tag..."
              />
              <span class="icon is-left"><i class="fas fa-search"></i></span>
            </div>
          </div>
          <div class="columns is-multiline" id="videoCards"></div>
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

      // add “+” to tip
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

        // tips accordion with “+”
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
                <p class="is-size-7"><strong>Tags:</strong> ${v["tags"]||"—"}</p>
              </div>
            </div>`;
          cards.appendChild(col);
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
