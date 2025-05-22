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

      <!-- Image Upload -->
      <div id="image-upload-container" class="space-y-2">
        <label for="images" class="block text-sm font-medium text-gray-700">Upload Images</label>
        <div class="flex items-center space-x-2">
          <input type="file" id="images" name="images[]" accept="image/*" class="img_file block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100">
          <button type="button" id="add-image" class="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700">+</button>
        </div>
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
  import { convertToBase64, createPost } from "{{site.baseurl}}/assets/js/api/posts.js";

  const imgContainer = document.getElementById('image-upload-container');
  const addImageButton = document.getElementById('add-image');
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

  addImageButton.addEventListener('click', () => {
    const newInput = document.createElement('div');
    newInput.classList.add('flex', 'items-center', 'space-x-2');
    newInput.innerHTML = `
      <input type="file" name="images[]" accept="image/*" class="img_file block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-blue-100">
      <button type="button" class="remove-image px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700">-</button>
    `;
    imgContainer.appendChild(newInput);

    // Add event listener to remove button
    newInput.querySelector('.remove-image').addEventListener('click', () => {
      imgContainer.removeChild(newInput);
    });
  });

  async function submit() {
    const imageDivs = document.getElementsByClassName('img_file')
    const imageBase64Table = []
    for (let i = 0; i < imageDivs.length; i++) {
      if (imageDivs[i].files.length == 0) {
        return
      }
      const img = await convertToBase64(imageDivs[i].files[0])
      imageBase64Table.push({
        "name": ""+i,
        "base64": img
      })
    }

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

    const created = await createPost({
      title: hospitalName,
      description: document.getElementById('description').value,
      hospital: hospitalName,
      rating: parseInt(ratingInput.value),
      image_base64_table: imageBase64Table
    })

    if (created) {
      window.location.href = '{{site.baseurl}}/allPosts'
    } else {
      console.log("ERROR WHEN MAKING POST")
    }
  }

  submitButton.addEventListener('click', submit)
</script>
