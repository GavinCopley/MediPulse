---
layout: base
title: Palomar Health Video Gallery
permalink: /optimize/edit/
search_exclude: true
menu: nav/home.html
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Palomar Health Video Gallery</title>
  
  <!-- Bulma CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css" />
  <!-- FontAwesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    <style>
    /* Clean light mode styling - removed dark mode variables */
    :root {
      --bg-gradient-light: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      --text-primary-light: #333333;
      --text-secondary-light: #6b7280;
      --bg-card-light: #ffffff;
      --border-color-light: #e1e4e8;
      --primary-color: #4f46e5;
      --shadow-light: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    
    body {
      background-color: #ffffff;
      color: var(--text-primary-light);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    }
    
    html, body { 
      height: 100%; 
      background: var(--bg-gradient-light);
      color: var(--text-primary-light);
    }
    .header-container {
    padding: 2rem 0;
    text-align: center;
    }
    .title {
    color: #4f46e5; /* This is the Tailwind indigo-600 color */
    }
    .subtitle {
    color: var(--text-secondary-light);
    }
    .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
    }
    .video-card {
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow-light);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    border: 1px solid #eaedf1;
    cursor: pointer;
    position: relative;
    }
    .video-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
    }
    .video-card.selected {
    border: 2px solid var(--primary-color);
    box-shadow: 0 0 0 3px rgba(50, 115, 220, 0.2);
    }
    .video-card.selected:before {
    content: "\f058"; /* Font Awesome check-circle icon */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: var(--primary-color);
    color: white;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    }
    .thumbnail-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    overflow: hidden;
    }
    .thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    }
    .video-card:hover .thumbnail {
    transform: scale(1.05);
    }
    .play-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
    }
    .video-card:hover .play-overlay {
    opacity: 1;
    }
    .play-button {
    width: 60px;
    height: 60px;
    background: rgba(79, 70, 229, 0.8); /* Changed from red to indigo-600 (#4f46e5) */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    }
    .video-card:hover .play-button {
    transform: scale(1.1);
    }
    .video-info {
    padding: 1rem;
    }
    .video-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    line-height: 1.4;
    color: #333333;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    }
    .video-meta {
    display: flex;
    align-items: center;
    color: var(--text-secondary-light);
    font-size: 0.85rem;
    }
    .video-date {
    margin-left: auto;
    }
    .search-container {
    margin: 1rem auto 2rem;
    max-width: 600px;
    }
    .filter-container {
    margin: 0 auto 2rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    }
    .filter-tag {
    background: #ffffff;
    border: 1px solid var(--border-color-light);
    border-radius: 20px;
    padding: 0.3rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #333333;
    }
    .filter-tag:hover, .filter-tag.active {
    background: var(--primary-color);
    color: white;
    }
    .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 1.2rem;
    color: var(--text-secondary-light);
    }
    .spinner {
    margin-right: 0.5rem;
    animation: spin 1s linear infinite;
    }
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
    .no-results {
    text-align: center;
    padding: 3rem;
    color: var(--text-secondary-light);
    }
    .pagination {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    }
    .pagination-link.is-current {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: #ffffff;
    }

    .pagination-link:hover {
    border-color: var(--primary-color);
    }

    .pagination-previous:hover, .pagination-next:hover {
    background-color: #f5f5f5;
    }

    /* Add these styles to fix the button appearance */
.button-container {
  margin-bottom: 5rem;
  padding-bottom: 3rem;
}

.button.is-primary:disabled {
  background-color: #9ca3af; /* Gray color when disabled (no video selected) */
  opacity: 1; /* Full opacity */
  cursor: not-allowed;
}

.button.is-primary {
  background-color: #4f46e5; /* indigo-600 color when enabled */
  transition: background-color 0.3s ease;
}

.button.is-primary:hover:not(:disabled) {
  background-color: #4338ca; /* Darker indigo on hover */
}

/* Add these styles for the loading overlay */
#loadingOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(3px);
}

#loadingOverlay .text-center {
  text-align: center;
}

#loadingOverlay .fas.fa-circle-notch {
  color: #4f46e5;
  margin-bottom: 0.75rem;
}

#loadingOverlay .text-xl {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4f46e5;
}

#loadingOverlay .mt-2 {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
}
    </style>
</head>

<body>
  <!-- Loading overlay -->
  <div id="loadingOverlay" class="fixed inset-0 z-50 hidden items-center justify-center bg-white/90 backdrop-blur-sm">
    <div class="text-center">
      <i class="fas fa-circle-notch fa-spin fa-2x mb-3 text-blue-600"></i>
      <div class="text-xl font-semibold text-blue-600">Re-optimizing your content...</div>
      <div class="mt-2 text-xs text-gray-500">Processing with AI</div>
    </div>
  </div>

  <!-- Notification -->
  <div id="notification" class="fixed -top-20 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-md flex items-center space-x-2 transition-all duration-500 z-50">
    <i class="fas fa-exclamation-circle"></i>
    <span class="notification-message"></span>
  </div>

  <!-- Oval Navigation Bar -->
  <div class="has-text-centered my-4">
    <div style="display: inline-block; background-color: #f5f5f5; border-radius: 30px; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <div class="buttons has-addons" style="margin: 0; border-radius: 25px; overflow: hidden; position: relative;">
        <!-- Blue background overlay for active button -->
        <div style="position: absolute; top: 0; right: 0; bottom: 0; width: 38%; background-color: #4f46e5; border-radius: 25px; z-index: 1;"></div>
        <a href="{{site.baseurl}}/optimize" class="button is-rounded" style="margin: 0; border-color: transparent; background-color: transparent; position: relative; z-index: 2;">
          <span class="icon"><i class="fas fa-wand-magic-sparkles"></i></span>
          <span>Main</span>
        </a>
        <a href="{{site.baseurl}}/optimize/generate" class="button is-rounded" style="margin: 0; border-color: transparent; background-color: transparent; position: relative; z-index: 2;">
          <span class="icon"><i class="fas fa-plus-circle"></i></span>
          <span>Generate New</span>
        </a>
        <a href="{{site.baseurl}}/optimize/edit" class="button is-rounded" style="margin: 0; border-color: transparent; background-color: transparent; position: relative; z-index: 2; color: white;">
          <span class="icon"><i class="fas fa-edit"></i></span>
          <span>Edit Existing</span>
        </a>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="header-container">
      <h1 class="title is-2 font-bold" style="color: #4f46e5; font-weight: 700;">
        Optimize an Existing Video
      </h1>
      <p class="subtitle is-5">Select an existing Palomar Health video to optimize it</p>
    </div>

    <div class="search-container">
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input id="search-input" class="input is-medium" type="text" placeholder="Search videos...">
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
          <span class="icon is-small is-right" id="clear-search" style="display: none; cursor: pointer;">
            <i class="fas fa-times-circle"></i>
          </span>
        </div>
      </div>
    </div>

    <div class="filter-container" id="category-filters">
      <div class="filter-tag active" data-category="all">All</div>
      <!-- Tags will be populated dynamically -->
    </div>

    <div id="video-container">
      <div class="loading">
        <i class="fas fa-circle-notch spinner"></i>
        Loading videos...
      </div>
    </div>

    <div class="pagination" id="pagination"></div>

    <!-- Add an optimize button -->
    <div class="has-text-centered mt-5 mb-5 button-container">
      <button id="optimize-button" class="button is-primary is-large" disabled>
        <span class="icon">
          <i class="fas fa-magic"></i>
        </span>
        <span>Optimize Selected Video</span>
      </button>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // YouTube API Key - Get from environment or use a public data API approach
      const API_KEY = 'AIzaSyBNhAUgPNGVbN-5jYQJGkPXqgqMJcnL4TQ'; // Example key - you'll need to use your own valid key

      // Palomar Health Channel ID
      const CHANNEL_ID = 'UC6Q40pg5uRNk4rXm375-68w';
      
      // Elements
      const videoContainer = document.getElementById('video-container');
      const searchInput = document.getElementById('search-input');
      const clearSearch = document.getElementById('clear-search');
      const categoryFilters = document.getElementById('category-filters');
      const paginationEl = document.getElementById('pagination');
      
      // State
      let videos = [];
      let filteredVideos = [];
      let currentPage = 1;
      const videosPerPage = 9;
      let currentCategory = 'all';
      let searchQuery = '';
      let selectedVideoId = null; // Add a state variable to track the currently selected video
      let csvData = []; // Make csvData a global variable accessible to all functions
      
      // Initialize - fetch videos immediately
      // fetchVideos();
      loadVideosFromCSV();
      
      // Initialize search functionality
      searchInput.addEventListener('input', function(e) {
        searchQuery = e.target.value.trim();
        clearSearch.style.display = searchQuery ? 'flex' : 'none';
        filterVideos();
      });
      
      clearSearch.addEventListener('click', function() {
        searchInput.value = '';
        searchQuery = '';
        clearSearch.style.display = 'none';
        currentPage = 1;
        filterVideos();
      });
      
      // Load videos from CSV data
      function loadVideosFromCSV() {
        // CSV data from PalomarHealth.csv
        csvData = [ // Remove the 'const' declaration to update the global variable
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "7Pzsre3iQvw",
            publishedAt: "2023-04-18T00:47:17Z",
            videoTitle: "Palomar Health Birth Center",
            videoDescription: "Learn about our world-class birth center from one of our patients.",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "",
            viewCount: 170967
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "-MbUTIHaTm0",
            publishedAt: "2023-04-18T00:40:59Z",
            videoTitle: "Palomar Health NICU",
            videoDescription: "Take a tour of our state-of-the-art NICU.",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "",
            viewCount: 444
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "PG5iCvcBBdI",
            publishedAt: "2023-02-11T01:41:30Z",
            videoTitle: "Palomar Health Recovery Center",
            videoDescription: "Palomar Health's Recovery Center in Poway has reimagined the recovery journey. Each patient is treated with a customized plan based on individual needs to support the patient's goals. Each approach will help to empower both adolescents and adults to lead their lives to the fullest and feel comfortable in social, professional and personal settings.",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Society",
            viewCount: 61
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "Hdbxx8k4zGc",
            publishedAt: "2023-02-11T00:56:54Z",
            videoTitle: "Covid 19 Treatments At the Hospital and At Home",
            videoDescription: "Palomar Health is taking the fear out of healthcare with Dr. Ian Butler, medical director for the ICU. Dr. Butler talks about how patients with coronavirus are treated at Palomar Health and how you can take measures at home if you think you might have COVID-19. Learn what to expect if you or a loved one gets COVID-19.",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Society",
            viewCount: 49
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "y3rQmNYeBqw",
            publishedAt: "2023-02-11T00:55:40Z",
            videoTitle: "What's Your Passion? - Erin Messer",
            videoDescription: "The world-class team at Palomar Health shows their dedication, drive and passion with every patient. Learn what makes Palomar Health's team extraordinary by learning why they love what they do!",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Knowledge",
            viewCount: 64
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "OrKZECOqMxo",
            publishedAt: "2023-02-10T23:59:48Z",
            videoTitle: "Always Here. Always Safe. - Emergency Department Safety Measures",
            videoDescription: "Palomar Health is taking the fear out of healthcare. Emergency Room staff provide details on the safety measures they take throughout the Emergency Department. Use this in preparation for a surgery and to better understand the measures Palomar Health is taking to provide extraordinary care to each patient.",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health",
            viewCount: 83
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "Rmlumz95s3A",
            publishedAt: "2023-02-10T23:58:45Z",
            videoTitle: "Always Here. Always Safe. - Operating Room Safety Measures",
            videoDescription: "Palomar Health is taking the fear out of healthcare. Operating Room staff provide details on the safety measures they take in the operating room. Use this in preparation for a surgery and to better understand the measures Palomar Health is taking to provide extraordinary care to each patient.",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Knowledge",
            viewCount: 57
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "CdcLxX3QyvM",
            publishedAt: "2023-02-10T23:57:38Z",
            videoTitle: "What is Type 1 Diabetes?",
            videoDescription: "Learn about what Type 1 Diabetes is from an expert, Palomar Health's Dr. Tamarah Jennings.",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Knowledge",
            viewCount: 36
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "3-2WUmEh-Rk",
            publishedAt: "2023-02-07T18:21:06Z",
            videoTitle: "Patient Success Story - Brandy Gardner",
            videoDescription: "As a practicing doula, Brandy Gardner has worked in almost every hospital in San Diego County so when it came time to choose where to deliver her own baby she had the inside scoop. Brandy chose Palomar Medical Center Poway because of its homelike feel and personalized service which became even more critical when she went into labor two months early.",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health",
            viewCount: 149
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "WA3WlNGW500",
            publishedAt: "2023-02-07T18:04:08Z",
            videoTitle: "What's Your Passion? - MJ Erickson",
            videoDescription: "Learn more about ICU Nurse MJ Erickson and her passion for her role at Palomar Health.",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Knowledge",
            viewCount: 710
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "t5_7G08hlJs",
            publishedAt: "2023-02-07T17:57:58Z",
            videoTitle: "What's Your Passion? - Tyler Powell, Outpatient Rehab Services Supervisor",
            videoDescription: "Learn about our Poway Outpatient Rehab Services Supervisor, Tyler Powell.",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Society",
            viewCount: 45
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "5xrUjKWfKNE",
            publishedAt: "2023-02-03T00:51:34Z",
            videoTitle: "Palomar Health's Award-Winning Cardiovascular Team",
            videoDescription: "",
            videoCategoryLabel: "Nonprofits & Activism",
            topicCategories: "Health,Society",
            viewCount: 13146
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "LqY46x_tu4c",
            publishedAt: "2023-01-27T20:37:32Z",
            videoTitle: "Join The Best Team in Healthcare!",
            videoDescription: "",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Society",
            viewCount: 41
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "uHJ8SLTLVZY",
            publishedAt: "2023-01-27T20:36:44Z",
            videoTitle: "Palomar Health Has Been Named \"World's Best Hospitals\" 3 Years In a Row!",
            videoDescription: "",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Society",
            viewCount: 320
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "pLQKqEi2SOo",
            publishedAt: "2023-01-27T20:33:17Z",
            videoTitle: "Dr. Karen Muchowski, CBS Spotlight on Innovation: Primary Care",
            videoDescription: "",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Society",
            viewCount: 35
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "nN8DSBjqLPs",
            publishedAt: "2023-01-27T20:32:25Z",
            videoTitle: "Dr. Phull, CBS Spotlight on Innovation: Palomar Health Cancer Institute",
            videoDescription: "",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Society",
            viewCount: 104
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "EIgxAny5m8g",
            publishedAt: "2023-01-27T20:30:39Z",
            videoTitle: "Dr. Maletz, ABC10 The Doctor Is In: How Can You Find a Primary Care Doctor?",
            videoDescription: "",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Society",
            viewCount: 35
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "4BoGwASzgxI",
            publishedAt: "2023-01-27T20:29:25Z",
            videoTitle: "Dr. Maletz, ABC10 The Doctor Is In: What is the Importance of Primary Care?",
            videoDescription: "",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Society",
            viewCount: 33
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "sfGrDQma1A8",
            publishedAt: "2023-01-27T20:27:34Z",
            videoTitle: "San Diego Living - Palomar Health Prostate Treatment Options",
            videoDescription: "",
            videoCategoryLabel: "People & Blogs",
            topicCategories: "Health,Society",
            viewCount: 13
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "Fk27l_AKOtU",
            publishedAt: "2021-03-05T00:47:04Z",
            videoTitle: "Patient Success Story - Brigit Davis",
            videoDescription: "Watch how Bariatric Surgery changed the life and mindset of Escondido nurse and mother Brigit Davis. Read more: https://bit.ly/3uYtpOH",
            videoCategoryLabel: "Nonprofits & Activism",
            topicCategories: "Health",
            viewCount: 256
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "7iAoUqJz1R4",
            publishedAt: "2018-11-30T00:11:42Z",
            videoTitle: "Patient Success Story - Michael Bollas",
            videoDescription: "",
            videoCategoryLabel: "Nonprofits & Activism",
            topicCategories: "Health,Knowledge",
            viewCount: 158
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "KkwAghs9lMY",
            publishedAt: "2018-04-03T19:15:55Z",
            videoTitle: "Palomar Health Recipe - Beet-Apple Salad",
            videoDescription: "Learn how to prepare a beet-apple salad!",
            videoCategoryLabel: "Nonprofits & Activism",
            topicCategories: "Food,Lifestyle",
            viewCount: 1563
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "IZGBuZ8Ox4M",
            publishedAt: "2017-12-22T18:38:28Z",
            videoTitle: "Holiday Eating with a Gluten-Free Diet - Julie Vargas",
            videoDescription: "",
            videoCategoryLabel: "Nonprofits & Activism",
            topicCategories: "Health,Lifestyle",
            viewCount: 22
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "URH1FKqk0QE",
            publishedAt: "2017-12-13T18:10:20Z",
            videoTitle: "Food Preparation Tips by Executive Chef John Medall",
            videoDescription: "",
            videoCategoryLabel: "Nonprofits & Activism",
            topicCategories: "Food,Lifestyle",
            viewCount: 160
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "RJq2veoKZYs",
            publishedAt: "2017-11-08T19:11:23Z",
            videoTitle: "Living Well with Prediabetes - Jennifer Purdie, Digital Content Specialist",
            videoDescription: "Digital Content Specialist Jennifer Purdie talks about living well with prediabetes.",
            videoCategoryLabel: "Nonprofits & Activism",
            topicCategories: "Health,Knowledge",
            viewCount: 3274
          },
          {
            channelId: "UC6Q40pg5uRNk4rXm375-68w",
            channelTitle: "Palomar Health",
            videoId: "4paCiKsHu0k",
            publishedAt: "2017-05-05T18:00:01Z",
            videoTitle: "Patient Success Story - Jammin' Jimmy (Graphic Warning)",
            videoDescription: "",
            videoCategoryLabel: "Nonprofits & Activism",
            topicCategories: "Health",
            viewCount: 380
          }
        ];

        // Process the CSV data into our video format
        videos = csvData.map(item => {
          // Extract categories from the topicCategories field and process them
          let categories = [];
          if (item.topicCategories) {
            categories = item.topicCategories
              .split(',')
              .map(cat => cat.trim())
              .filter(cat => cat !== "Health")  // Filter out Health
              .map(cat => cat === "Lifestyle_(sociology)" ? "Lifestyle" : cat); // Convert Lifestyle_(sociology) to Lifestyle
          }
          
          return {
            id: item.videoId,
            title: item.videoTitle,
            thumbnail: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`,
            date: new Date(item.publishedAt),
            description: item.videoDescription || "",
            categories: categories,
            views: parseInt(item.viewCount) || 0
          };
        });
        
        // Generate category filters
        generateCategoryFilters();
        
        // Apply initial filtering
        filterVideos();
      }
      
      // Initialize search functionality
      searchInput.addEventListener('input', function(e) {
        searchQuery = e.target.value.trim();
        clearSearch.style.display = searchQuery ? 'flex' : 'none';
        currentPage = 1;
        filterVideos();
      });
      
      clearSearch.addEventListener('click', function() {
        searchInput.value = '';
        searchQuery = '';
        clearSearch.style.display = 'none';
        currentPage = 1;
        filterVideos();
      });
      
      // Generate category filter buttons
      function generateCategoryFilters() {
        const allCategories = new Set(['all']);
        
        videos.forEach(video => {
          if (video.categories) {
            video.categories.forEach(category => {
              // Skip "Health" category and convert "Lifestyle_(sociology)" to "Lifestyle"
              if (category === "Health") return;
              
              if (category === "Lifestyle_(sociology)") {
                allCategories.add("Lifestyle");
              } else {
                allCategories.add(category);
              }
            });
          }
        });
        
        categoryFilters.innerHTML = '';
        const allTag = document.createElement('div');
        allTag.className = 'filter-tag active';
        allTag.dataset.category = 'all';
        allTag.textContent = 'All';
        categoryFilters.appendChild(allTag);
        
        Array.from(allCategories)
          .filter(cat => cat !== 'all')
          .sort()
          .forEach(category => {
            const tag = document.createElement('div');
            tag.className = 'filter-tag';
            tag.dataset.category = category;
            tag.textContent = category;
            categoryFilters.appendChild(tag);
          });
        
        // Add event listeners to filter tags
        document.querySelectorAll('.filter-tag').forEach(tag => {
          tag.addEventListener('click', () => {
            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentCategory = tag.dataset.category;
            currentPage = 1;
            filterVideos();
          });
        });
      }
      
      // Filter videos based on search query and selected category
      function filterVideos() {
        filteredVideos = videos.filter(video => {
          const matchesSearch = searchQuery === '' || 
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (video.description && video.description.toLowerCase().includes(searchQuery.toLowerCase()));
          
          let matchesCategory = currentCategory === 'all';
          
          if (!matchesCategory && video.categories) {
            if (currentCategory === 'Lifestyle') {
              // Match both "Lifestyle" and any legacy "Lifestyle_(sociology)" values
              matchesCategory = video.categories.includes('Lifestyle') || 
                               video.categories.includes('Lifestyle_(sociology)');
            } else {
              matchesCategory = video.categories.includes(currentCategory);
            }
          }
          
          return matchesSearch && matchesCategory;
        });
        
        renderPagination();
        renderVideos();
      }
      
      // Render videos for current page
      function renderVideos() {
        videoContainer.innerHTML = '';
        
        if (filteredVideos.length === 0) {
          videoContainer.innerHTML = `
            <div class="no-results">
              <i class="fas fa-search fa-3x mb-3"></i>
              <h3 class="is-size-4 mb-2">No videos found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          `;
          return;
        }
        
        const startIndex = (currentPage - 1) * videosPerPage;
        const endIndex = startIndex + videosPerPage;
        const videosToShow = filteredVideos.slice(startIndex, endIndex);
        
        const videoGrid = document.createElement('div');
        videoGrid.className = 'video-grid';
        
        videosToShow.forEach(video => {
          const formattedDate = formatDate(video.date);
          
          const videoCard = document.createElement('div');
          videoCard.className = 'video-card';
          if (video.id === selectedVideoId) {
            videoCard.classList.add('selected');
          }
          videoCard.dataset.videoId = video.id; // Store the video ID in the dataset
          videoCard.innerHTML = `
            <div class="thumbnail-container">
              <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">
              <div class="play-overlay">
                <div class="play-button">
                  <i class="fas fa-check" style="color: white; font-size: 20px;"></i>
                </div>
              </div>
            </div>
            <div class="video-info">
              <h3 class="video-title">${video.title}</h3>
              <div class="video-meta">
                <span><i class="fas fa-play-circle"></i> YouTube</span>
                <span class="video-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
              </div>
            </div>
          `;
          
          // Add selection functionality with single select
          videoCard.addEventListener('click', () => {
            // First, remove selected class from all cards
            document.querySelectorAll('.video-card').forEach(card => {
              card.classList.remove('selected');
            });
            
            // Toggle selected state for this card
            if (selectedVideoId === video.id) {
              selectedVideoId = null; // Deselect if already selected
            } else {
              selectedVideoId = video.id; // Select this video
              videoCard.classList.add('selected');
            }
            
            console.log(`Selected video: ${selectedVideoId}`);
            
            // Enable optimize button if we have a selection
            const optimizeButton = document.getElementById('optimize-button');
            if (optimizeButton) {
              optimizeButton.disabled = !selectedVideoId;
            }
          });
          
          videoGrid.appendChild(videoCard);
        });
        
        videoContainer.appendChild(videoGrid);
      }
      
      // Format date helper
      function formatDate(date) {
        if (!(date instanceof Date) || isNaN(date)) {
          return 'Unknown date';
        }
        
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
      
      // Render pagination controls
      function renderPagination() {
        paginationEl.innerHTML = '';
        
        if (filteredVideos.length <= videosPerPage) {
          return;
        }
        
        const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
        
        const nav = document.createElement('nav');
        nav.className = 'pagination is-centered';
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'pagination');
        
        // Previous button
        const prevButton = document.createElement('a');
        prevButton.className = `pagination-previous ${currentPage === 1 ? 'is-disabled' : ''}`;
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
        if (currentPage > 1) {
          prevButton.addEventListener('click', () => {
            currentPage--;
            renderVideos();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
        
        // Next button
        const nextButton = document.createElement('a');
        nextButton.className = `pagination-next ${currentPage === totalPages ? 'is-disabled' : ''}`;
        nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        if (currentPage < totalPages) {
          nextButton.addEventListener('click', () => {
            currentPage++;
            renderVideos();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
        
        // Page numbers
        const pageList = document.createElement('ul');
        pageList.className = 'pagination-list';
        
        // Display limited page numbers for better UX
        const pagesToShow = [];
        
        // Always show first page
        pagesToShow.push(1);
        
        // Add ellipsis after first page if needed
        if (currentPage > 3) {
          pagesToShow.push('...');
        }
        
        // Add current page and surrounding pages
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
          if (!pagesToShow.includes(i)) {
            pagesToShow.push(i);
          }
        }
        
        // Add ellipsis before last page if needed
        if (currentPage < totalPages - 2) {
          pagesToShow.push('...');
        }
        
        // Always show last page if we have more than one page
        if (totalPages > 1) {
          pagesToShow.push(totalPages);
        }
        
        // Create page links
        pagesToShow.forEach(page => {
          if (page === '...') {
            const ellipsisItem = document.createElement('li');
            ellipsisItem.className = 'pagination-ellipsis';
            ellipsisItem.innerHTML = '<span>…</span>';
            pageList.appendChild(ellipsisItem);
          } else {
            const pageItem = document.createElement('li');
            pageItem.className = 'pagination-item';
            pageItem.innerHTML = `
              <a class="pagination-link ${page === currentPage ? 'is-current' : ''}" aria-label="Page ${page}">
                ${page}
              </a>
            `;
            pageItem.addEventListener('click', () => {
              currentPage = page;
              renderVideos();
              renderPagination();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pageList.appendChild(pageItem);
          }
        });
        
        nav.appendChild(prevButton);
        nav.appendChild(pageList);
        nav.appendChild(nextButton);
        paginationEl.appendChild(nav);
      }
      
      // Add optimize button click handler
      document.getElementById('optimize-button').addEventListener('click', function() {
        if (selectedVideoId) {
          // Show loading overlay
          document.getElementById('loadingOverlay').style.display = "flex";
          
          // Show loading state in button
          const optimizeButton = document.getElementById('optimize-button');
          optimizeButton.disabled = true;
          optimizeButton.innerHTML = '<span class="icon"><i class="fas fa-circle-notch fa-spin"></i></span><span>Processing...</span>';
          
          // Find the selected video data from the csvData
          const selectedVideoEntry = csvData.find(video => video.videoId === selectedVideoId);
          
          if (selectedVideoEntry) {
            // Extract and format the data for the API from the CSV entry
            const publishDate = new Date(selectedVideoEntry.publishedAt);
            
            // Prepare data for the optimization API using the format expected by the API
            const videoData = {
              title: selectedVideoEntry.videoTitle,
              description: selectedVideoEntry.videoDescription || "",
              duration_sec: parseInt(selectedVideoEntry.durationSec || "0"),
              tags: selectedVideoEntry.tags || "",
              category_id: parseInt(selectedVideoEntry.videoCategoryId || "22"), // Default to "People & Blogs" if not available
              is_hd: selectedVideoEntry.definition === 'hd' ? 1 : 0,
              has_captions: selectedVideoEntry.caption === 'true' ? 1 : 0,
              publish_dow: publishDate.getDay() === 0 ? 6 : publishDate.getDay() - 1,
              publish_hour: publishDate.getHours()
            };
            
            console.log("Sending data to optimization API:", videoData);
            
            // Make API request to the optimization service
            fetch("https://medipulse-832734119496.us-west2.run.app/api/optimize", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(videoData)
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('API request failed');
              }
              return response.text();
            })
            .then(rawText => {
              // Handle potential NaN values in the response
              const processedText = rawText.replace(/\bNaN\b/g, "null");
              return JSON.parse(processedText);
            })
            .then(result => {
              console.log("API response:", result);
              
              // Hide loading overlay
              document.getElementById('loadingOverlay').style.display = "none";
              
              // Replace current page content with optimization results
              renderOptimizationResults(result, selectedVideoEntry);
            })
            .catch(error => {
              console.error("Error optimizing video:", error);
              alert("There was an error optimizing this video. Please try again.");
              
              // Hide loading overlay
              document.getElementById('loadingOverlay').style.display = "none";
              
              // Reset button
              optimizeButton.disabled = false;
              optimizeButton.innerHTML = '<span class="icon"><i class="fas fa-magic"></i></span><span>Optimize Selected Video</span>';
            });
          } else {
            // Hide loading overlay
            document.getElementById('loadingOverlay').style.display = "none";
            
            alert("Could not find complete metadata for this video.");
            optimizeButton.disabled = false;
            optimizeButton.innerHTML = '<span class="icon"><i class="fas fa-magic"></i></span><span>Optimize Selected Video</span>';
          }
        }
      });
    });
  </script>
</body>
</html>

<!-- Add this script at the end of the file, outside the HTML document -->
<script>
  // Function to render optimization results similar to Optimization.md
  function renderOptimizationResults(result, videoData) {
    // Get container element
    const container = document.querySelector('.container');
    
    // Store current HTML to be able to go back
    const originalHTML = container.innerHTML;
    
    // Create new HTML based on Optimization.md template with improved structure
    const newHTML = `
      <!-- Loading overlay -->
      <div id="loadingOverlay" class="fixed inset-0 z-50 hidden items-center justify-center bg-white/90 backdrop-blur-sm">
        <div class="text-center">
          <i class="fas fa-circle-notch fa-spin fa-2x mb-3 text-blue-600"></i>
          <div class="text-xl font-semibold text-blue-600">Re-optimizing your content...</div>
          <div class="mt-2 text-xs text-gray-500">Processing with AI</div>
        </div>
      </div>

      <!-- Notification -->
      <div id="notification" class="fixed -top-20 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-md flex items-center space-x-2 transition-all duration-500 z-50">
        <i class="fas fa-exclamation-circle"></i>
        <span class="notification-message"></span>
      </div>

      <div class="py-12 px-6 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
        <div class="mx-auto max-w-5xl">
          
          <h1 class="mb-5 text-center text-4xl font-bold text-gray-800">
            <i class="fa-solid fa-chart-line text-blue-600 mr-2"></i>
            Video Optimization Results
          </h1>
          <p class="mb-10 text-center text-xl text-gray-600">
            AI-powered insights for "${videoData.videoTitle}"
          </p>

          <!-- Engagement Score Card -->
          <div class="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200">
            <h3 class="mb-4 font-semibold flex items-center text-gray-800">
              <i class="fas fa-gauge-high mr-2 text-blue-600"></i> 
              Predicted Engagement
            </h3>
            <div class="flex flex-col md:flex-row gap-6 items-center">
              <canvas id="engagementChart" class="w-full md:w-1/3"></canvas>
              <div class="w-full md:w-2/3">
                <div class="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                  <div id="engagementProgress" class="absolute inset-0 bg-blue-600 rounded-full transition-all duration-800" style="width:0%"></div>
                </div>
                <p class="mt-3 text-center">
                  Score: <strong id="engagementScore" class="text-2xl text-blue-600">${result.predicted_engagement ? result.predicted_engagement.toFixed(2) : 'N/A'}</strong> / 100
                </p>
                <p class="text-center text-xs text-gray-500">
                  Based on machine-learning analysis of similar content
                </p>
              </div>
            </div>
          </div>

          <!-- AI-Generated Outlines -->
          <div class="mb-8 rounded-xl bg-white p-8 shadow-md border border-gray-200">
            <h3 class="mb-4 font-semibold flex items-center text-gray-800">
              <i class="fas fa-clipboard-list mr-2 text-blue-600"></i> 
              AI-Generated Outlines
            </h3>

            <!-- Template chooser -->
            <div class="mb-6 flex space-x-4 justify-center">
              <button type="button" class="template-btn px-4 py-2 bg-blue-600 text-white rounded-lg" data-template="0">Outline 1</button>
              <button type="button" class="template-btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg" data-template="1">Outline 2</button>
              <button type="button" class="template-btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg" data-template="2">Outline 3</button>
            </div>

            <!-- Wrapper holding three outline cards -->
            <div id="templatesWrapper" class="flex flex-col gap-8">

              <!-- Outline 1 -->
              <div class="template-container" data-template="0">
                <div class="outline-card bg-white rounded-lg border border-gray-200 shadow hover:shadow-lg transition overflow-hidden">
                  <!-- Thumbnail -->
                  <div class="relative group">
                    <img src="https://img.youtube.com/vi/${videoData.videoId}/hqdefault.jpg" alt="thumbnail" class="thumbnail-img w-full aspect-video object-cover bg-black">
                    <div class="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                      <i class="fab fa-youtube text-red-600 text-6xl opacity-85"></i>
                    </div>
                    <div class="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded duration-text">0:00</div>
                    <button class="copy-btn absolute top-2 right-2 bg-white/75 backdrop-blur px-2 py-0.5 text-xs rounded cursor-pointer shadow">
                      <i class="fas fa-copy mr-1"></i> Copy
                    </button>
                  </div>
                  <div class="p-4">
                    <h4 class="title text-lg font-semibold text-gray-800 mb-1 break-words hover:bg-blue-50 focus:bg-blue-50 focus:outline-none p-1" contenteditable="true">${videoData.videoTitle}</h4>
                    <p class="description text-sm text-gray-600 whitespace-pre-wrap mb-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none p-1" contenteditable="true">${videoData.videoDescription || ""}</p>
                    <div class="tags space-x-1 text-xs text-blue-700 font-medium"></div>
                  </div>
                </div>
              </div>

              <!-- Outline 2 -->
              <div class="template-container hidden" data-template="1">
                <div class="outline-card bg-white rounded-lg border border-gray-200 shadow hover:shadow-lg transition overflow-hidden">
                  <div class="relative group">
                    <img src="https://img.youtube.com/vi/${videoData.videoId}/hqdefault.jpg" alt="thumbnail" class="thumbnail-img w-full aspect-video object-cover bg-black">
                    <div class="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                      <i class="fab fa-youtube text-red-600 text-6xl opacity-85"></i>
                    </div>
                    <div class="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded duration-text">0:00</div>
                    <button class="copy-btn absolute top-2 right-2 bg-white/75 backdrop-blur px-2 py-0.5 text-xs rounded cursor-pointer shadow">
                      <i class="fas fa-copy mr-1"></i> Copy
                    </button>
                  </div>
                  <div class="p-4">
                    <h4 class="title text-lg font-semibold text-gray-800 mb-1 break-words hover:bg-blue-50 focus:bg-blue-50 focus:outline-none p-1" contenteditable="true">${videoData.videoTitle}</h4>
                    <p class="description text-sm text-gray-600 whitespace-pre-wrap mb-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none p-1" contenteditable="true">${videoData.videoDescription || ""}</p>
                    <div class="tags space-x-1 text-xs text-blue-700 font-medium"></div>
                  </div>
                </div>
              </div>

              <!-- Outline 3 -->
              <div class="template-container hidden" data-template="2">
                <div class="outline-card bg-white rounded-lg border border-gray-200 shadow hover:shadow-lg transition overflow-hidden">
                  <div class="relative group">
                    <img src="https://img.youtube.com/vi/${videoData.videoId}/hqdefault.jpg" alt="thumbnail" class="thumbnail-img w-full aspect-video object-cover bg-black">
                    <div class="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                      <i class="fab fa-youtube text-red-600 text-6xl opacity-85"></i>
                    </div>
                    <div class="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded duration-text">0:00</div>
                    <button class="copy-btn absolute top-2 right-2 bg-white/75 backdrop-blur px-2 py-0.5 text-xs rounded cursor-pointer shadow">
                      <i class="fas fa-copy mr-1"></i> Copy
                    </button>
                  </div>
                  <div class="p-4">
                    <h4 class="title text-lg font-semibold text-gray-800 mb-1 break-words hover:bg-blue-50 focus:bg-blue-50 focus:outline-none p-1" contenteditable="true">${videoData.videoTitle}</h4>
                    <p class="description text-sm text-gray-600 whitespace-pre-wrap mb-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none p-1" contenteditable="true">${videoData.videoDescription || ""}</p>
                    <div class="tags space-x-1 text-xs text-blue-700 font-medium"></div>
                  </div>
                </div>
              </div>

            </div>

            <div class="flex justify-between items-center mt-6">
              <button id="undoBtn" class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg flex gap-2">
                <i class="fas fa-undo-alt"></i> Undo All
              </button>
              <button id="reEvalBtn" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex gap-2">
                <i class="fas fa-sync-alt"></i> Re-evaluate
              </button>
            </div>
          </div>

          <!-- Improvement Tips -->
          <div class="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
              <i class="fas fa-lightbulb mr-2 text-yellow-400"></i> 
              Improvement Tips 
              <span class="text-xs text-gray-500 ml-2">(click to expand)</span>
            </h3>
            <details id="allTipsDropdown" class="group">
              <summary class="cursor-pointer font-semibold text-amber-500 bg-amber-50 hover:bg-amber-100 rounded-md py-2 px-4 inline-flex items-center gap-2">
                <i class="fas fa-chevron-down transition-transform group-open:rotate-180"></i> 
                Show all tips
              </summary>
              <div id="tipsContainer" class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
            </details>
          </div>

          <!-- Similar High-Performing Videos -->
          <div class="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200">
            <h3 class="mb-4 font-semibold flex items-center text-gray-800">
              <i class="fas fa-film mr-2 text-blue-600"></i> 
              Similar High-Performing Videos
            </h3>
            <div class="mb-5 relative">
              <input id="videoFilter" type="text" placeholder="Filter by title or tag..." class="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-10" />
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
              </span>
              <span class="video-filter-clear absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                <i class="fas fa-times-circle text-gray-400"></i>
              </span>
            </div>
            <div id="videoCards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
          </div>
          
          <!-- Back button -->
          <div class="text-center mb-12">
            <button id="goBackBtn" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg flex items-center gap-2 mx-auto">
              <i class="fas fa-arrow-left"></i> Back to Video Selection
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Replace container content
    container.innerHTML = newHTML;
    
    // Initialize the optimization page with enhanced functionality
    if (typeof Chart === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => initializeOptimizationPage(result, videoData, originalHTML);
      document.head.appendChild(script);
    } else {
      initializeOptimizationPage(result, videoData, originalHTML);
    }
  }

  function initializeOptimizationPage(result, videoData, originalHTML) {
    // Constants and helpers from Optimization.md
    const clamp = x => Math.max(0, Math.min(x, 99)); // Cap at 99 instead of 100
    const formatTime = secs => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
    
    // Template and tip state
    let currentTemplate = 0;
    const originalContent = {};
    const activeTipBtn = {};

    // Initialize engagement chart
    const engagementChart = new Chart(document.getElementById("engagementChart"), {
      type: "doughnut",
      data: { 
        datasets: [{ 
          data: [0, 100], 
          backgroundColor: ["#3b82f6", "#e5e7eb"] 
        }] 
      },
      options: { 
        circumference: Math.PI, 
        rotation: -Math.PI, 
        cutout: "75%", 
        plugins: { legend: { display: false } } 
      }
    });

    // Set gauge function
    const setGauge = v => {
      const clampedValue = clamp(v);
      engagementChart.data.datasets[0].data = [clampedValue, 100 - clampedValue];
      engagementChart.update({ duration: 800 });
      document.getElementById("engagementProgress").style.width = clampedValue + "%";
      document.getElementById("engagementScore").textContent = clampedValue.toFixed(2);
    };

    // Notification helper
    const notify = (msg, type = 'error') => {
      const notificationEl = document.getElementById("notification");
      notificationEl.querySelector(".notification-message").textContent = msg;
      
      if (type === 'success') {
        notificationEl.classList.remove('bg-red-600');
        notificationEl.classList.add('bg-green-600');
      } else {
        notificationEl.classList.remove('bg-green-600');
        notificationEl.classList.add('bg-red-600');
      }
      
      notificationEl.style.top = "20px";
      setTimeout(() => (notificationEl.style.top = "-100px"), 3000);
    };

    // Set initial engagement score
    const pred = clamp(result.predicted_engagement || 0);
    setGauge(pred);

    // Template switcher functionality
    document.querySelectorAll(".template-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.template);
        currentTemplate = idx;
        document.querySelectorAll(".template-btn").forEach(b => {
          const on = b === btn;
          b.classList.toggle("bg-blue-600", on);
          b.classList.toggle("text-white", on);
          b.classList.toggle("bg-gray-200", !on);
          b.classList.toggle("text-gray-800", !on);
        });
        document.querySelectorAll(".template-container").forEach(div => {
          div.classList.toggle("hidden", Number(div.dataset.template) !== idx);
        });
      });
    });

    // Initialize original content for all templates
    document.querySelectorAll(".template-container").forEach(cont => {
      const idx = Number(cont.dataset.template);
      originalContent[idx] = {
        title: videoData.videoTitle,
        desc: videoData.videoDescription || "",
        tags: videoData.tags || "",
        length: formatTime(0) // Default duration
      };
      activeTipBtn[idx] = {};

      // Set up tags display
      const tagBox = cont.querySelector(".tags");
      if (videoData.tags) {
        tagBox.innerHTML = "";
        videoData.tags.split("|").forEach(t => {
          const span = document.createElement("span");
          span.textContent = "#" + t.trim();
          tagBox.appendChild(span);
        });
      }
    });

    // Copy functionality for outlines
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
        .then(() => notify('Outline copied to clipboard!', 'success'))
        .catch(err => notify('Failed to copy: ' + err));
    };

    // Add copy button functionality
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const templateIdx = btn.closest('.template-container').dataset.template;
        copyOutlineToClipboard(templateIdx);
      });
    });

    // Reset field helper
    const resetField = (templateIdx, cat) => {
      const cont = document.querySelector(`.template-container[data-template="${templateIdx}"]`);
      if (!cont) return;
      const orig = originalContent[templateIdx];
      if (cat === "title") cont.querySelector(".title").textContent = orig.title;
      if (cat === "description") cont.querySelector(".description").textContent = orig.desc;
      if (cat === "tags") {
        const tagBox = cont.querySelector(".tags");
        tagBox.innerHTML = "";
        orig.tags.split("|").forEach(t => {
          const span = document.createElement("span");
          span.textContent = "#" + t.trim();
          tagBox.appendChild(span);
        });
      }
      if (cat === "length") cont.querySelector(".duration-text").textContent = orig.length;
    };

    // Process and display tips
    const tipsContainer = document.getElementById("tipsContainer");
    tipsContainer.innerHTML = "";
    
    if (result.gemini_tips && typeof result.gemini_tips === 'object') {
      Object.entries(result.gemini_tips).forEach(([cat, data]) => {
        if (cat === 'tips' || cat === 'error') return; // Skip these keys
        
        const examples = data.examples || [];
        const suggestions = data.suggestions || [];
        
        const card = document.createElement("div");
        card.className = "tip-card bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all";
        card.innerHTML = `
          <h4 class="text-lg font-semibold mb-3 text-blue-700">${cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
          <ul class="space-y-2">
            ${examples.map(t => `
              <li class="flex justify-between items-start bg-blue-50/50 rounded p-2">
                <span class="flex-1 text-gray-800">
                  <i class="fas fa-quote-left mr-1 text-blue-400"></i>${t}
                </span>
                <button type="button" data-cat="${cat}" data-tip="${t.replace(/"/g,'&quot;')}" class="add-tip-btn ml-2 text-green-600 hover:text-green-800">
                  <i class="fas fa-plus-circle"></i>
                </button>
              </li>
            `).join("")}
          </ul>
          ${suggestions.length ? `
          <div class="mt-4 border-t border-gray-100 pt-3">
            <h5 class="font-medium mb-2 text-gray-700">Suggestions</h5>
            <ul class="space-y-2">
              ${suggestions.map(s => `
                <li class="text-sm text-gray-600 italic">
                  <i class="fas fa-lightbulb text-amber-400 mr-1"></i>${s}
                </li>
              `).join("")}
            </ul>
          </div>` : ""}
        `;
        tipsContainer.appendChild(card);
      });
    } else {
      // Fallback for simple tips format
      const tipsArray = result.gemini_tips && result.gemini_tips.tips
        ? result.gemini_tips.tips.split("\n").filter(l => l.trim())
        : [];
        
      if (tipsArray.length > 0) {
        const card = document.createElement("div");
        card.className = "tip-card bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all";
        card.innerHTML = `
          <h4 class="text-lg font-semibold mb-3 text-blue-700">General Tips</h4>
          <ul class="space-y-2">
            ${tipsArray.map(tip => `
              <li class="flex justify-between items-start bg-blue-50/50 rounded p-2">
                <span class="flex-1 text-gray-800">
                  <i class="fas fa-lightbulb mr-1 text-amber-400"></i>${tip}
                </span>
              </li>
            `).join("")}
          </ul>
        `;
        tipsContainer.appendChild(card);
      } else {
        tipsContainer.innerHTML = `
          <div class="col-span-full text-center text-gray-500 py-8">
            <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
            <p>No optimization tips available</p>
          </div>
        `;
      }
    }

    // Tips click delegation
    tipsContainer.addEventListener("click", e => {
      const addBtn = e.target.closest(".add-tip-btn");
      const remBtn = e.target.closest(".remove-tip-btn");
      if (!addBtn && !remBtn) return;

      const idx = currentTemplate;
      activeTipBtn[idx] = activeTipBtn[idx] || {};

      if (remBtn) {
        const cat = remBtn.dataset.cat;
        resetField(idx, cat);
        remBtn.classList.replace("fa-minus-circle", "fa-plus-circle");
        remBtn.classList.remove("text-red-600", "remove-tip-btn");
        remBtn.classList.add("text-green-600", "add-tip-btn");
        activeTipBtn[idx][cat] = null;
        return;
      }

      const cat = addBtn.dataset.cat;
      const tip = addBtn.dataset.tip;

      // If another tip of same category is active, revert it first
      const prev = activeTipBtn[idx][cat];
      if (prev) prev.click();

      const cont = document.querySelector(`.template-container[data-template="${idx}"]`);
      if (cat === "title") cont.querySelector(".title").textContent = tip;
      if (cat === "description") cont.querySelector(".description").textContent = tip;
      if (cat === "tags") {
        const tagBox = cont.querySelector(".tags");
        tagBox.innerHTML = "";
        tip.split("|").forEach(t => {
          const span = document.createElement("span");
          span.textContent = "#" + t.trim();
          tagBox.appendChild(span);
        });
      }
      if (cat === "length") cont.querySelector(".duration-text").textContent = formatTime(Number(tip));

      addBtn.classList.replace("fa-plus-circle", "fa-minus-circle");
      addBtn.classList.remove("text-green-600", "add-tip-btn");
      addBtn.classList.add("text-red-600", "remove-tip-btn");
      activeTipBtn[idx][cat] = addBtn;
    });

    // Undo All button
    document.getElementById("undoBtn").onclick = () => {
      const idx = currentTemplate;
      if (!originalContent[idx]) return;
      ["title", "description", "tags", "length"].forEach(cat => {
        if (activeTipBtn[idx] && activeTipBtn[idx][cat]) activeTipBtn[idx][cat].click();
      });
    };

    // Similar videos display
    const cards = document.getElementById("videoCards");
    cards.innerHTML = "";
    (result.reference_videos || []).forEach(v => {
      const div = document.createElement("div");
      div.className = "bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer";
      div.innerHTML = `
        <img src="https://img.youtube.com/vi/${v["video id"] || ""}/hqdefault.jpg" class="w-full h-48 object-cover">
        <div class="p-5">
          <h4 class="font-medium mb-2 line-clamp-2">${v["video title"] || ""}</h4>
          <p class="text-xs text-gray-500 mb-2">
            <i class="fas fa-eye mr-1"></i>${v["view count"] || "0"}
            <i class="fas fa-thumbs-up mr-1 ml-3"></i>${v["like count"] || "0"}
            <i class="fas fa-comment mr-1 ml-3"></i>${v["comment count"] || "0"}
          </p>
          <p class="text-xs text-gray-600 mb-3">
            <strong>Length:</strong> ${v["length_sec"] || "0"}s
          </p>
          <div class="flex flex-wrap gap-1">
            ${(v.tags || "").split("|").slice(0, 3).map(t => 
              `<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">#${t}</span>`
            ).join("")}
            ${(v.tags || "").split("|").length > 3 ? 
              `<span class="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">+${(v.tags || "").split("|").length - 3} more</span>` : ""}
          </div>
        </div>
      `;
      
      if (v["video id"]) {
        div.onclick = () => window.open(`https://www.youtube.com/watch?v=${v["video id"]}`, "_blank");
      }
      cards.appendChild(div);
    });

    // Filter functionality
    const videoFilter = document.getElementById("videoFilter");
    videoFilter.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll("#videoCards > div").forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });

    // Clear filter button
    document.querySelector('.video-filter-clear').addEventListener('click', () => {
      videoFilter.value = '';
      videoFilter.dispatchEvent(new Event('input'));
    });

    // Re-evaluate button
    document.getElementById("reEvalBtn").addEventListener('click', () => {
      document.getElementById('loadingOverlay').style.display = "flex";
      
      const reEvalBtn = document.getElementById("reEvalBtn");
      const originalText = reEvalBtn.innerHTML;
      reEvalBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
      reEvalBtn.disabled = true;
      
      // Prepare updated data
      const publishDate = new Date(videoData.publishedAt);
      const updatedData = {
        title: videoData.videoTitle,
        description: videoData.videoDescription || "",
        duration_sec: parseInt(videoData.durationSec || "0"),
        tags: videoData.tags || "",
        category_id: parseInt(videoData.videoCategoryId || "22"),
        is_hd: videoData.definition === 'hd' ? 1 : 0,
        has_captions: videoData.caption === 'true' ? 1 : 0,
        publish_dow: publishDate.getDay() === 0 ? 6 : publishDate.getDay() - 1,
        publish_hour: publishDate.getHours()
      };
      
      fetch("https://medipulse-832734119496.us-west2.run.app/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      })
      .then(response => {
        if (!response.ok) throw new Error('API request failed');
        return response.text();
      })
      .then(rawText => {
        const processedText = rawText.replace(/\bNaN\b/g, "null");
        return JSON.parse(processedText);
      })
      .then(newResult => {
        document.getElementById('loadingOverlay').style.display = "none";
        reEvalBtn.innerHTML = originalText;
        reEvalBtn.disabled = false;
        
        const improved = clamp(newResult.improved_engagement || newResult.predicted_engagement || 0);
        setGauge(improved);
        notify('Video re-optimized successfully!', 'success');
      })
      .catch(error => {
        console.error("Re-evaluation failed:", error);
        document.getElementById('loadingOverlay').style.display = "none";
        reEvalBtn.innerHTML = originalText;
        reEvalBtn.disabled = false;
        notify("Re-evaluation failed. Please try again.");
      });
    });
    
    // Back button functionality
    document.getElementById("goBackBtn").addEventListener('click', () => {
      window.location.reload();
    });
  }
</script>