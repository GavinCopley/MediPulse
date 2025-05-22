---
layout: base
menu: nav/home.html
permalink: /make_post
---

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-2xl font-bold mb-4 text-center">Rate a Hospital</h2>
    <div class="space-y-4">
      <!-- Car Type Selection -->
      <div>
        <label for="car_type" class="block text-sm font-medium text-gray-700">Hospital name</label>
        <select id="car_type" name="car_type" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500">
          <option value="gas">UC San Diego Medical Center</option>
          <option value="electric">Rady Children's Hospital</option>
          <option value="hybrid">Scripps Memorial Hospital La Jolla</option>
          <option value="dream">Jacobs Medical Center</option>
        </select>
      </div>

      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Rating out of 5</label>
        <input type="text" id="title" name="title" placeholder="Enter title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500">
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" name="description" placeholder="Describe your car post" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"></textarea>
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button id="submit-btn" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Submit
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Section to display Hospital Ratings -->
<div class="flex items-center justify-center bg-gray-100 py-8">
  <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-2xl font-bold mb-4 text-center">All Hospital Ratings</h2>
    <div id="hospital-ratings-container" class="space-y-4">
      <!-- Ratings will be loaded here by JavaScript -->
      <p class="text-gray-500 text-center">Loading ratings...</p>
    </div>
  </div>
</div>

<script type="module">
  let pythonURI;
  if (location.hostname === "localhost") {
    pythonURI = "https://medipulse-832734119496.us-west2.run.app";
  } else if (location.hostname === "127.0.0.1") {
    pythonURI = "https://medipulse-832734119496.us-west2.run.app";
  } else {
    pythonURI = "https://medipulse-832734119496.us-west2.run.app";
  }

  async function createPost(post) {
    const postOptions = {
      method: "POST",
      mode: "cors",
      cache: "default",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-Origin": "client",
      },
      body: JSON.stringify({
        title: post.title,
        description: post.description,
        car_type: post.car_type,
        image_base64_table: [] // required field in API
      }),
    };

    const endpoint = pythonURI + "/api/carPost";

    try {
      const response = await fetch(endpoint, postOptions);
      if (!response.ok) {
        throw new Error(`Failed to create post: ${response.status}`);
      }
      const result = await response.json();
      return true;
    } catch (error) {
      console.error("Error creating post:", error.message);
      return false;
    }
  }

  const submitButton = document.getElementById('submit-btn');

  async function submit() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const carType = document.getElementById('car_type').value;

    if (!title || !description || !carType) {
      alert('All fields are required');
      return;
    }

    try {
      const created = await createPost({
        title: title,
        description: description,
        car_type: carType
      });

      if (created) {
        window.location.href = '{{site.baseurl}}/allPosts';
      } else {
        alert('Failed to create post. Please try again.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating your post. Please try again.');
    }
  }

  // Function to load and display hospital ratings
  async function loadHospitalRatings() {
    const endpoint = pythonURI + "/api/carPost"; // Use the carPost endpoint

    // Define fetchOptions if not already available
    const fetchOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
          'X-Origin': 'client' // Custom header
      },
    };

    try {
      const response = await fetch(endpoint, fetchOptions);

      if (!response.ok) {
        throw new Error(`Failed to fetch hospital ratings: ${response.status}`);
      }

      const ratings = await response.json();
      const container = document.getElementById('hospital-ratings-container');
      container.innerHTML = ''; // Clear loading message

      if (ratings.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center">No ratings found.</p>';
        return;
      }

      ratings.forEach(rating => {
        const ratingElement = document.createElement('div');
        ratingElement.classList.add('p-4', 'border', 'rounded-md', 'shadow-sm');
        ratingElement.innerHTML = `
          <h3 class="text-lg font-semibold text-gray-800">${rating.hospital || rating.title}</h3>
          <p class="text-sm text-gray-600 mb-2">Rating: ${rating.rating}/5</p>
          <p class="text-gray-700">${rating.description}</p>
          <div class="text-right text-sm text-gray-500 mt-2">
            Posted by ${rating.user ? rating.user.name : 'Unknown User'} on ${new Date(rating.date_posted).toLocaleDateString()}
          </div>
        `;
        container.appendChild(ratingElement);
      });

    } catch (error) {
      console.error('Error loading hospital ratings:', error);
      const container = document.getElementById('hospital-ratings-container');
      container.innerHTML = '<p class="text-red-600 text-center">Error loading ratings.</p>';
    }
  }

  submitButton.addEventListener('click', submit);

  // Load ratings when the page loads
  loadHospitalRatings();
</script>
