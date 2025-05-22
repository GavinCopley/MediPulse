---
layout: base
menu: nav/home.html
permalink: /make_post
---

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-2xl font-bold mb-4 text-center">Rate A Hospital</h2>
    <div class="space-y-4">
      <!-- Hospital Selection -->
      <div>
        <label for="hospital" class="block text-sm font-medium text-gray-700">Hospital</label>
        <select id="hospital" name="hospital" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500">
          <option value="">Select a hospital</option>
          <option value="palomar">Palomar Medical Center</option>
          <option value="scripps">Scripps Memorial Hospital</option>
          <option value="sharp">Sharp Memorial Hospital</option>
          <option value="ucsd">UCSD Medical Center</option>
          <option value="other">Other</option>
        </select>
      </div>

      <!-- Other Hospital Input (hidden by default) -->
      <div id="other-hospital-container" class="hidden">
        <label for="other-hospital" class="block text-sm font-medium text-gray-700">Other Hospital Name</label>
        <input type="text" id="other-hospital" name="other-hospital" placeholder="Enter hospital name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500">
      </div>

      <!-- Rating -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Hospital Rating</label>
        <div class="flex items-center space-x-2">
          <div class="flex-1">
            <input type="range" id="rating" name="rating" min="1" max="5" step="1" value="3" 
                   class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
          </div>
          <div class="w-12 text-center">
            <span id="rating-value" class="text-lg font-semibold">3</span>
            <span class="text-sm text-gray-500">/5</span>
          </div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
      </div>

      <!-- Feedback -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Feedback</label>
        <textarea id="description" name="description" placeholder="Share your experience and feedback about the hospital" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"></textarea>
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

<script type="module">
  // Define pythonURI here since we are not importing from config.js
  let pythonURI;
  if (location.hostname === "localhost") {
          pythonURI = "https://medipulse-832734119496.us-west2.run.app";
  } else if (location.hostname === "127.0.0.1") {
          pythonURI = "https://medipulse-832734119496.us-west2.run.app";
  } else {
          pythonURI =  "https://medipulse-832734119496.us-west2.run.app";
  }

  // Functions from posts.js (excluding image functions)
  async function getPostsByHospital(hospitalName) {
    const endpoint = pythonURI + "/api/hospitalPost/hospital/" + encodeURIComponent(hospitalName);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch hospital reviews: ${response.status}`);
      }
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error("Error fetching hospital reviews:", error.message);
      return null;
    }
  }

  async function getPostsByUser(uid) {
    let endpoint = pythonURI + "/api/hospitalPost";

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch user reviews: ${response.status}`);
      }
      const posts = await response.json();
      return posts.filter((post) => post.user.id === uid);
    } catch (error) {
      console.error("Error fetching user reviews:", error.message);
      return null;
    }
  }

  async function createPost(post) {
    // Validate required fields
    if (!post.hospital || !post.rating || !post.description) {
      throw new Error("Missing required fields: hospital, rating, and description are required");
    }

    // Validate rating range
    if (post.rating < 1 || post.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

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
        title: post.hospital, // Using hospital name as title
        description: post.description,
        hospital: post.hospital,
        rating: post.rating,
      }),
    };

    const endpoint = pythonURI + "/api/hospitalPost";

    try {
      const response = await fetch(endpoint, postOptions);
      if (!response.ok) {
        throw new Error(`Failed to create review: ${response.status}`);
      }
      const result = await response.json();
      return true;
    } catch (error) {
      console.error("Error creating review:", error.message);
      return false;
    }
  }

  async function removePostById(id) {
    const postOptions = {
      method: "DELETE",
      mode: "cors",
      cache: "default",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-Origin": "client",
      },
      body: JSON.stringify({
        id: id,
      }),
    };

    const endpoint = pythonURI + "/api/hospitalPost";

    try {
      const response = await fetch(endpoint, postOptions);
      if (!response.ok) {
        throw new Error(`Failed to delete review: ${response.status}`);
      }
      const data = await response.json();
      return data["deleted"];
    } catch (error) {
      console.error("Error deleting review:", error.message);
      return null;
    }
  }

  // Original script logic (cleaned)
  const submitButton = document.getElementById('submit-btn');
  const hospitalSelect = document.getElementById('hospital');
  const otherHospitalContainer = document.getElementById('other-hospital-container');
  const ratingInput = document.getElementById('rating');
  const ratingValue = document.getElementById('rating-value');

  // Handle hospital selection
  hospitalSelect.addEventListener('change', () => {
    if (hospitalSelect.value === 'other') {
      otherHospitalContainer.classList.remove('hidden');
    } else {
      otherHospitalContainer.classList.add('hidden');
    }
  });

  // Handle rating display
  ratingInput.addEventListener('input', () => {
    ratingValue.textContent = ratingInput.value;
  });

  async function submit() {
    // Get hospital name
    let hospitalName = hospitalSelect.value;
    if (hospitalName === 'other') {
      hospitalName = document.getElementById('other-hospital').value;
    }

    // Validate hospital name
    if (!hospitalName) {
      alert('Please select or enter a hospital name');
      return;
    }

    // Validate rating
    const rating = parseInt(ratingInput.value);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      alert('Please select a valid rating between 1 and 5');
      return;
    }

    try {
      const created = await createPost({
        title: hospitalName,
        description: document.getElementById('description').value,
        hospital: hospitalName,
        rating: rating,
      })

      if (created) {
        window.location.href = '{{site.baseurl}}/allPosts'
      } else {
        alert('Failed to create post. Please try again.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating your post. Please try again.');
    }
  }

  submitButton.addEventListener('click', submit)
</script>
