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
      --primary-color: #3273dc;
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
    color: #333333;
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
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #eaedf1;
    }
    .video-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
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
    </style>
</head>

<body>
  <div class="container">
    <div class="header-container">
      <h1 class="title is-2">
        <img src="https://www.palomarhealthfoundation.org/wp-content/uploads/2022/03/Palomar-Health-logo.jpg" alt="Palomar Health Logo" height="60" style="vertical-align: middle; margin-right: 15px;">
        Palomar Health Video Gallery
      </h1>
      <p class="subtitle is-5">Explore the latest videos from Palomar Health's YouTube channel</p>
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
        const csvData = [
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
          videoCard.innerHTML = `
            <div class="thumbnail-container">
              <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">
              <div class="play-overlay">
                <div class="play-button">
                  <i class="fas fa-play" style="color: white; font-size: 20px;"></i>
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
          
          videoCard.addEventListener('click', () => {
            window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
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
            pageItem.className = `pagination-item ${page === currentPage ? 'is-current' : ''}`;
            pageItem.innerHTML = `<a class="pagination-link" aria-label="Page ${page}">${page}</a>`;
            
            // Page number click event
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
    });
  </script>
</body>
</html>

