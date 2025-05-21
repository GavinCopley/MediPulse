---
layout: base
title: Palomar Health Video Gallery
permalink: /optimize/edit
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
    background: rgba(255, 0, 0, 0.8);
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
  <div id="loadingOverlay" class="fixed inset-0 z-50 hidden items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
    <div class="text-center">
      <i class="fas fa-circle-notch fa-spin fa-2x mb-3 text-blue-600 dark:text-blue-400"></i>
      <div class="text-xl font-semibold text-blue-600 dark:text-blue-400">Optimising Your Content...</div>
      <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">Processing with AI</div>
    </div>
  </div>

  <div class="container">
    <div class="header-container">
      <h1 class="title is-2" style="color: #4f46e5;">
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
            topicCategories: "Health",
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
            topicCategories: "Health",
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
            topicCategories: "Food,Lifestyle_(sociology)",
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
            topicCategories: "Health,Lifestyle_(sociology)",
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
            topicCategories: "Food,Lifestyle_(sociology)",
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
          // Extract categories from the topicCategories field
          const categories = item.topicCategories ? 
            item.topicCategories.split(',').map(cat => cat.trim().replace('_', ' ')) : 
            ['General'];
          
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
            video.categories.forEach(category => allCategories.add(category));
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
          
          const matchesCategory = currentCategory === 'all' || 
            (video.categories && video.categories.includes(currentCategory));
          
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
    
    // Create new HTML based on Optimization.md template
    const newHTML = `
      <div class="header-container">
        <h1 class="title is-2" style="color: #4f46e5;">
          <i class="fas fa-chart-line mr-2"></i> Hospital Video Optimiser
        </h1>
        <p class="subtitle is-5">Enhance your hospital's video content with AI-powered insights</p>
      </div>
      
      <!-- Instructions Header -->
      <div class="box mb-6">
        <h3 class="has-text-centered is-size-5 has-text-weight-semibold mb-3">How It Works</h3>
        
        <div class="is-flex is-justify-content-space-around is-align-items-center my-4">
          <div class="is-flex is-flex-direction-column is-align-items-center is-relative" style="flex: 1">
            <div class="is-flex is-align-items-center is-justify-content-center has-background-primary has-text-white" 
                 style="width: 40px; height: 40px; border-radius: 50%; margin-bottom: 1rem;">1</div>
            <div class="has-text-weight-semibold has-text-centered">Describe Video</div>
          </div>
          <div style="width: 33%; height: 2px; background-color: #eaeaea;"></div>
          <div class="is-flex is-flex-direction-column is-align-items-center is-relative" style="flex: 1">
            <div class="is-flex is-align-items-center is-justify-content-center has-background-primary has-text-white" 
                 style="width: 40px; height: 40px; border-radius: 50%; margin-bottom: 1rem;">2</div>
            <div class="has-text-weight-semibold has-text-centered">See Results</div>
          </div>
        </div>
        
        <p class="has-text-centered has-text-grey-light mt-3">
          View AI-powered suggestions and compare with similar high-performing videos
        </p>
      </div>

      <!-- Engagement Score Card -->
      <div class="box mb-6">
        <h3 class="is-size-5 has-text-weight-semibold mb-4">
          <i class="fas fa-gauge-high mr-2 has-text-primary"></i> 
          Predicted Engagement
        </h3>
        <div class="columns is-vcentered">
          <div class="column is-one-third">
            <canvas id="engagementChart"></canvas>
          </div>
          <div class="column is-two-thirds">
            <progress id="engagementProgress" class="progress is-primary" value="0" max="100"></progress>
            <p class="has-text-centered">
              Engagement Score: <strong id="engagementScore" class="is-size-3 has-text-primary">${result.predicted_engagement ? result.predicted_engagement.toFixed(2) : 'N/A'}</strong> / 100
            </p>
            <p class="has-text-centered is-size-7 has-text-grey">
              Based on machine learning analysis of similar content
            </p>
          </div>
        </div>
      </div>

      <!-- Sample Outlines Tabs -->
      <div class="box mb-6 p-5">
        <h3 class="is-size-5 has-text-weight-semibold mb-4">
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
        <div id="outlinesContainer" class="px-4 py-4">
          <div class="is-active" data-index="0">
            <ul id="outlineList0" class="pl-5 ml-3"></ul>
          </div>
          <div class="is-hidden" data-index="1">
            <ul id="outlineList1" class="pl-5 ml-3"></ul>
          </div>
          <div class="is-hidden" data-index="2">
            <ul id="outlineList2" class="pl-5 ml-3"></ul>
          </div>
        </div>
        <div class="has-text-centered mt-5">
          <button id="reEvalBtn" class="button is-light is-info">
            <span class="icon">
              <i class="fas fa-sync-alt"></i>
            </span>
            <span>Re-evaluate with these changes</span>
          </button>
        </div>
      </div>

      <!-- Improvement Tips Dropdown -->
      <div class="box mb-6">
        <h3 class="is-size-5 has-text-weight-semibold mb-4">
          <i class="fas fa-lightbulb mr-2 has-text-warning"></i> 
          Improvement Tips <span class="is-size-7 has-text-grey ml-2">(click to expand)</span>
        </h3>
        <details id="allTipsDropdown">
          <summary class="has-text-warning has-text-weight-semibold has-background-warning-light p-3 is-clickable" 
                   style="border-radius: 6px; display: inline-block;">
            <span class="is-flex is-align-items-center">
              <i class="fas fa-chevron-down mr-2 is-size-7"></i>
              Show All Tips
            </span>
          </summary>
          <ul id="allTipsList" class="mt-4 space-y-3 pl-0" style="list-style: none;"></ul>
        </details>
      </div>

      <!-- Similar Videos Filter + Cards -->
      <div class="box mb-6">
        <h3 class="is-size-5 has-text-weight-semibold mb-4">
          <i class="fas fa-film mr-2 has-text-primary"></i> 
          Similar High-Performing Videos
        </h3>
        <div class="mb-5">
          <div class="control has-icons-left has-icons-right">
            <input
              type="text"
              id="videoFilter"
              class="input"
              placeholder="Filter by title or tag..."
            />
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
            <span class="icon is-small is-right video-filter-clear" style="pointer-events: all; cursor: pointer;">
              <i class="fas fa-times-circle"></i>
            </span>
          </div>
        </div>
        <div class="columns is-multiline" id="videoCards"></div>
      </div>
      
      <!-- Add back button with more bottom padding -->
      <div class="has-text-centered mt-6 mb-6" style="padding-bottom: 5rem; margin-bottom: 3rem;">
        <button id="goBackBtn" class="button is-light">
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span>Back to Video Selection</span>
        </button>
      </div>
    `;
    
    // Replace container content
    container.innerHTML = newHTML;
    
    // Now add all the JavaScript for the optimization results functionality
    
    // Initialize chart
    // Need to load Chart.js first if it's not already loaded
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
    // Initialize engagement chart
    const engagementChart = new Chart(document.getElementById("engagementChart"), {
      type: "doughnut",
      data: {
        datasets: [{
          data: [0, 100],
          backgroundColor: ["#4f46e5","#e5e7eb"]
        }]
      },
      options: {
        circumference: Math.PI,
        rotation: -Math.PI,
        cutout: "75%",
        plugins: { legend: { display: false } }
      }
    });
    
    // Helper function
    function clamp(x){ return Math.max(0, Math.min(x,100)); }
    
    // Animate engagement score
    const pred = clamp(result.predicted_engagement || 0);
    engagementChart.data.datasets[0].data = [pred, 100-pred];
    engagementChart.update({duration: 800});
    document.getElementById("engagementProgress").value = pred;
    
    // Handle outline tabs
    const outlineTabs = document.getElementById("outlineTabs");
    if (outlineTabs) {
      outlineTabs.addEventListener('click', (e) => {
        if (!e.target.closest("li")) return;
        
        // Remove active class from all tabs
        outlineTabs.querySelectorAll("li").forEach(li => {
          li.classList.remove("is-active");
        });
        
        // Add active class to clicked tab
        const selected = e.target.closest("li");
        selected.classList.add("is-active");
        
        // Show/hide corresponding content
        const idx = selected.dataset.index;
        document.querySelectorAll("#outlinesContainer > div").forEach(div => {
          if (div.dataset.index === idx) {
            div.classList.remove('is-hidden');
            div.classList.add('is-active');
          } else {
            div.classList.remove('is-active');
            div.classList.add('is-hidden');
          }
        });
      });
    }
    
    // Process tips
    const tipsArray = result.gemini_tips && result.gemini_tips.tips
      ? result.gemini_tips.tips.split("\n").filter(l => l.trim())
      : [];
      
    // Set up outlines from tips
    for (let i = 0; i < 3; i++) {
      const outlineUl = document.getElementById("outlineList" + i);
      if (outlineUl) {
        outlineUl.innerHTML = "";
        if (tipsArray[i]) {
          const parts = tipsArray[i].split(/[:\-–]/).slice(1).join("");
          const li = document.createElement("li");
          li.contentEditable = "true";
          li.className = "py-2 border-b";
          li.style.borderColor = "#eaeaea";
          li.textContent = parts || tipsArray[i];
          outlineUl.appendChild(li);
        }
      }
    }
    
    // All tips list
    const tipsList = document.getElementById("allTipsList");
    if (tipsList) {
      tipsList.innerHTML = "";
      if (result.gemini_tips && result.gemini_tips.tips) {
        tipsArray.forEach((tip, i) => {
          const li = document.createElement("li");
          li.className = "mb-3";
          
          // Process tip text to enhance typography
          const enhancedTip = tip.replace(/\*(.*?)\*/g, '<strong style="color: #4f46e5; font-weight: 600;">$1</strong>');
          
          li.innerHTML = `
            <div class="box p-4" style="border-left: 4px solid #48c774;">
              <div class="columns is-vcentered">
                <div class="column">
                  <p>${enhancedTip}</p>
                </div>
                <div class="column is-narrow">
                  <button class="button is-small is-success">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          `;
          
          // Add "+" button functionality
          li.querySelector("button").addEventListener('click', () => {
            const active = outlineTabs.querySelector("li.is-active").dataset.index;
            const outlineLi = document.createElement("li");
            outlineLi.contentEditable = "true";
            outlineLi.className = "py-2 border-b";
            outlineLi.style.borderColor = "#eaeaea";
            outlineLi.textContent = tip.replace(/\*(.*?)\*/g, '$1'); // Remove asterisks in outline
            document.getElementById("outlineList" + active).appendChild(outlineLi);
          });
          
          tipsList.appendChild(li);
        });
      } else {
        tipsList.innerHTML = `
          <div class="notification is-danger is-light">
            ${result.gemini_tips && result.gemini_tips.error ? result.gemini_tips.error : "Failed to generate tips"}
          </div>
        `;
      }
    }
    
    // Video cards
    const cards = document.getElementById("videoCards");
    if (cards) {
      cards.innerHTML = "";
      (result.reference_videos || []).forEach(v => {
        const videoCard = document.createElement("div");
        videoCard.className = "column is-4";
        
        videoCard.innerHTML = `
          <div class="card" style="height: 100%; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease;">
            <div class="card-image" style="position: relative;">
              <figure class="image is-16by9">
                <img src="https://img.youtube.com/vi/${v["video id"] || ""}/hqdefault.jpg" alt="Thumbnail">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                            width: 50px; height: 50px; background-color: rgba(255,0,0,0.8); 
                            border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <i class="fas fa-play has-text-white"></i>
                </div>
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-6">${v["video title"]}</p>
              <div class="is-flex is-size-7 has-text-grey mb-2">
                <span class="mr-3"><i class="fas fa-eye mr-1"></i> ${v["view count"]}</span>
                <span class="mr-3"><i class="fas fa-thumbs-up mr-1"></i> ${v["like count"]}</span>
                <span><i class="fas fa-comment mr-1"></i> ${v["comment count"]}</span>
              </div>
              <p class="is-size-7 has-text-grey-dark"><strong>Length:</strong> ${v["length_sec"]}s</p>
              <div class="tags mt-3">
                ${(v["tags"] || "").split('|').slice(0, 3).map(tag => 
                  `<span class="tag is-info is-light">${tag}</span>`
                ).join('')}
                ${v["tags"] && v["tags"].split('|').length > 3 ? 
                  `<span class="tag is-light">+${v["tags"].split('|').length - 3} more</span>` : ''}
              </div>
            </div>
          </div>
        `;
        
        cards.appendChild(videoCard);
        
        // Make card clickable to YouTube
        if (v["video id"]) {
          videoCard.addEventListener('click', () => {
            window.open(`https://www.youtube.com/watch?v=${v["video id"]}`, '_blank');
          });
        }
      });
    }
    
    // Filter functionality
    const videoFilter = document.getElementById("videoFilter");
    if (videoFilter && cards) {
      videoFilter.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        cards.querySelectorAll('.column').forEach(card => {
          card.style.display = card.textContent.toLowerCase().includes(q) ? "" : "none";
        });
      });
    }
    
    // Clear filter button
    const clearFilter = document.querySelector('.video-filter-clear');
    if (clearFilter) {
      clearFilter.addEventListener('click', () => {
        videoFilter.value = '';
        videoFilter.dispatchEvent(new Event('input'));
      });
    }
    
    // Re-evaluate button
    const reEvalBtn = document.getElementById("reEvalBtn");
    if (reEvalBtn) {
      reEvalBtn.addEventListener('click', () => {
        // Show loading overlay
        document.getElementById('loadingOverlay').style.display = "flex";
        
        // Show loading animation
        reEvalBtn.classList.add('is-loading');
        
        // Prepare updated data from outlines
        const updatedData = {
          title: videoData.videoTitle,
          description: videoData.videoDescription || "",
          duration_sec: parseInt(videoData.durationSec || "0"),
          tags: videoData.tags || "",
          category_id: parseInt(videoData.videoCategoryId || "22"),
          is_hd: videoData.definition === 'hd' ? 1 : 0,
          has_captions: videoData.caption === 'true' ? 1 : 0,
          publish_dow: new Date(videoData.publishedAt).getDay() === 0 ? 6 : new Date(videoData.publishedAt).getDay() - 1,
          publish_hour: new Date(videoData.publishedAt).getHours()
        };
        
        // Re-run optimization
        fetch("https://medipulse-832734119496.us-west2.run.app/api/optimize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData)
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
        .then(newResult => {
          // Hide loading overlay
          document.getElementById('loadingOverlay').style.display = "none";
          
          reEvalBtn.classList.remove('is-loading');
          
          // Update engagement score
          const imp = clamp(newResult.improved_engagement || newResult.predicted_engagement || 0);
          engagementChart.data.datasets[0].data = [imp, 100-imp];
          engagementChart.update({duration: 800});
          document.getElementById("engagementScore").textContent = (newResult.improved_engagement || newResult.predicted_engagement).toFixed(2);
          document.getElementById("engagementProgress").value = imp;
        })
        .catch(error => {
          console.error("Re-evaluation failed:", error);
          
          // Hide loading overlay
          document.getElementById('loadingOverlay').style.display = "none";
          
          reEvalBtn.classList.remove('is-loading');
          alert("Sorry, there was an error processing your request.");
        });
      });
    }
    
    // Back button functionality
    const goBackBtn = document.getElementById("goBackBtn");
    if (goBackBtn) {
      goBackBtn.addEventListener('click', () => {
        // Use window.location.reload() to refresh the page
        // This is the simplest and most reliable solution
        window.location.reload();
      });
    }
  }
</script>