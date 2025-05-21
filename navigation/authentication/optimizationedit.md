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

    .header-container {
      padding: 2rem 0;
      text-align: center;
    }

    .title {
      color: var(--text-primary);
    }
    
    .subtitle {
      color: var(--text-secondary);
    }

    .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      padding: 1rem;
    }

    .video-card {
      background: var(--bg-card);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .video-card:hover {
      transform: translateY(-7px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
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
      color: var(--text-primary);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .video-meta {
      display: flex;
      align-items: center;
      color: var(--text-secondary);
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
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 0.3rem 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
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
      color: var(--text-secondary);
    }

    .spinner {
      margin-right: 0.5rem;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .dark-mode-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: var(--shadow);
      z-index: 100;
      transition: transform 0.3s ease;
    }

    .dark-mode-toggle:hover {
      transform: rotate(30deg);
    }

    .no-results {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary);
    }

    .pagination {
      margin: 2rem 0;
      display: flex;
      justify-content: center;
    }
  </style>
</head>

<body class="light-mode">
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

  <button id="dark-mode-toggle" class="dark-mode-toggle">
    <i class="fas fa-moon"></i>
  </button>

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
      const darkModeToggle = document.getElementById('dark-mode-toggle');
      
      // State
      let videos = [];
      let filteredVideos = [];
      let currentPage = 1;
      const videosPerPage = 9;
      let currentCategory = 'all';
      let searchQuery = '';
      
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        document.body.className = savedTheme === 'dark' ? 'dark-mode' : 'light-mode';
        updateThemeIcon();
      }
      
      // Initialize - fetch videos immediately
      fetchVideos();
      
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
      
      // Dark mode toggle
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
      
      // Fetch videos from channel
      async function fetchVideos() {
        try {
          const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50&type=video`);
          const data = await response.json();
          
          if (data.items && data.items.length > 0) {
            // Process and store videos
            videos = data.items.map(item => ({
              id: item.id.videoId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
              date: new Date(item.snippet.publishedAt),
              description: item.snippet.description,
              // Extract categories from description or title for filtering
              categories: extractCategories(item.snippet.title, item.snippet.description)
            }));
            
            // Generate category filters
            generateCategoryFilters();
            
            // Apply initial filtering
            filterVideos();
          } else {
            showError("No videos found for this channel.");
          }
        } catch (error) {
          console.error("Error fetching videos:", error);
          // Fallback to hardcoded videos in case of API failure
          useHardcodedVideos();
        }
      }
      
      // Fallback function to use hardcoded videos if API fails
      function useHardcodedVideos() {
        videos = [
          {
            id: "WfLmnkO_bkI",
            title: "Heart Health - Cardiovascular Health at Palomar Health",
            thumbnail: "https://img.youtube.com/vi/WfLmnkO_bkI/hqdefault.jpg",
            date: new Date("2023-02-14"),
            categories: ["Heart Health", "Cardiovascular"]
          },
          {
            id: "7wqCMr7eQIg",
            title: "Palomar Health - Orthopedic and Spine Care",
            thumbnail: "https://img.youtube.com/vi/7wqCMr7eQIg/hqdefault.jpg",
            date: new Date("2023-03-22"),
            categories: ["Orthopedic", "Spine Care"]
          },
          {
            id: "JJn3u9K3Tqc",
            title: "Emergency Services at Palomar Health",
            thumbnail: "https://img.youtube.com/vi/JJn3u9K3Tqc/hqdefault.jpg",
            date: new Date("2023-01-05"),
            categories: ["Emergency Services"]
          },
          {
            id: "H2Z--mE34v4",
            title: "Women's Health at Palomar Health",
            thumbnail: "https://img.youtube.com/vi/H2Z--mE34v4/hqdefault.jpg",
            date: new Date("2022-11-17"),
            categories: ["Women's Health"]
          },
          {
            id: "hT2V5bYMXN8",
            title: "Palomar Health Foundation - Making a Difference",
            thumbnail: "https://img.youtube.com/vi/hT2V5bYMXN8/hqdefault.jpg",
            date: new Date("2022-09-28"),
            categories: ["Foundation", "Community"]
          },
          {
            id: "0MdC8M5Jy-Q",
            title: "Cancer Care at Palomar Health",
            thumbnail: "https://img.youtube.com/vi/0MdC8M5Jy-Q/hqdefault.jpg",
            date: new Date("2022-08-15"),
            categories: ["Cancer Care", "Oncology"]
          },
          {
            id: "Yv-BpuYqUgU",
            title: "Neurosciences at Palomar Health",
            thumbnail: "https://img.youtube.com/vi/Yv-BpuYqUgU/hqdefault.jpg",
            date: new Date("2022-07-07"),
            categories: ["Neurosciences", "Brain Health"]
          },
          {
            id: "NzKFlOA0v90",
            title: "Pediatric Care at Palomar Health",
            thumbnail: "https://img.youtube.com/vi/NzKFlOA0v90/hqdefault.jpg",
            date: new Date("2022-06-12"),
            categories: ["Pediatric", "Children's Health"]
          },
          {
            id: "q4V7Qz3MVOI",
            title: "Mental Health Services at Palomar Health",
            thumbnail: "https://img.youtube.com/vi/q4V7Qz3MVOI/hqdefault.jpg",
            date: new Date("2022-05-20"),
            categories: ["Mental Health"]
          },
          {
            id: "bxrYcwjlXw0",
            title: "Palomar Health - Our Doctors Make the Difference",
            thumbnail: "https://img.youtube.com/vi/bxrYcwjlXw0/hqdefault.jpg",
            date: new Date("2022-04-03"),
            categories: ["Doctors", "Staff"]
          },
          {
            id: "_QKjCvw8QH0",
            title: "COVID-19 Updates from Palomar Health",
            thumbnail: "https://img.youtube.com/vi/_QKjCvw8QH0/hqdefault.jpg",
            date: new Date("2022-03-15"),
            categories: ["COVID-19", "Pandemic"]
          },
          {
            id: "mXI2D9Fpa24",
            title: "Rehabilitation Services at Palomar Health",
            thumbnail: "https://img.youtube.com/vi/mXI2D9Fpa24/hqdefault.jpg",
            date: new Date("2022-02-28"),
            categories: ["Rehabilitation"]
          }
        ];
        
        // Generate category filters
        generateCategoryFilters();
        
        // Apply initial filtering
        filterVideos();
      }
      
      // Extract categories from video title and description
      function extractCategories(title, description) {
        const combinedText = (title + ' ' + description).toLowerCase();
        const categories = [];
        
        const categoryKeywords = {
          'Heart Health': ['heart', 'cardio', 'cardiac'],
          'Cancer Care': ['cancer', 'oncology', 'tumor'],
          'Women\'s Health': ['women', 'maternal', 'gynecology'],
          'Mental Health': ['mental', 'psychiatric', 'psychology'],
          'Orthopedic': ['orthopedic', 'bone', 'joint', 'spine'],
          'Pediatric': ['pediatric', 'children', 'kids', 'baby'],
          'Emergency Services': ['emergency', 'trauma', 'urgent'],
          'COVID-19': ['covid', 'coronavirus', 'pandemic'],
          'Community': ['community', 'outreach', 'foundation'],
          'Wellness': ['wellness', 'prevention', 'healthy']
        };
        
        Object.entries(categoryKeywords).forEach(([category, keywords]) => {
          if (keywords.some(keyword => combinedText.includes(keyword))) {
            categories.push(category);
          }
        });
        
        // Add a default category if none are detected
        if (categories.length === 0) {
          categories.push('General');
        }
        
        return categories;
      }
      
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

