---
layout: base
title: Please Fill out the Following Information
permalink: /survey
search_exclude: true
menu: nav/home.html 
---

<div class="bg-gray-100 flex items-center justify-center h-screen">
  <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Required Health Information</h2>
    <form id="surveyForm" class="space-y-4">
      <input type="text" id="name" placeholder="First and Last Name" required class="input-field">
      <input type="text" id="username" placeholder="Username" required class="input-field">
      <input type="email" id="email" placeholder="Email" required class="input-field">
      <input type="text" id="number" placeholder="Phone Number (Optional)" class="input-field">

      <hr>
      <input type="number" id="age" placeholder="Age" required min="0" max="120" class="input-field">
      <input type="number" id="weight" placeholder="Weight (lbs)" required min="0" max="1000" class="input-field">
      <input type="number" id="height" placeholder="Height (Inches)" required min="0" max="120" class="input-field">
      <input type="text" id="allergies" placeholder="Allergies" class="input-field">
      <input type="text" id="conditions" placeholder="Medical Conditions" class="input-field">
      <input type="text" id="ethnicity" placeholder="Ethnicity" required class="input-field">

      <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors w-full">Submit</button>
    </form>
    <div id="message" class="mt-4 p-4 rounded hidden"></div>
  </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  document.getElementById("surveyForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const form = event.target;
    const messageDiv = document.getElementById("message");

    const age = parseInt(document.getElementById("age").value);
    const weight = parseInt(document.getElementById("weight").value);
    const height = parseInt(document.getElementById("height").value);

    if (age < 0 || age > 120) return showMessage("Please enter a valid age between 0 and 120", "error");
    if (weight < 0 || weight > 1000) return showMessage("Please enter a valid weight between 0 and 1000 lbs", "error");
    if (height < 0 || height > 120) return showMessage("Please enter a valid height between 0 and 120 inches", "error");

    const formData = {
        name: document.getElementById("name").value.trim(),
        username: document.getElementById("username").value.trim(),
        email: document.getElementById("email").value.trim(),
        number: document.getElementById("number").value.trim(),
        age,
        weight,
        height,
        allergies: document.getElementById("allergies").value.trim(),
        conditions: document.getElementById("conditions").value.trim(),
        ethnicity: document.getElementById("ethnicity").value.trim(),
        survey_completed: true
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name || !formData.username || !formData.email || !formData.ethnicity)
        return showMessage("Please fill in all required fields", "error");

    if (!emailRegex.test(formData.email))
        return showMessage("Please enter a valid email address", "error");

    try {
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        console.log("Form Data:", formData); // Log the form data before sending

        // Send the POST request with JSON data
        const response = await fetch(`${pythonURI}/api/survey`, {
            ...fetchOptions,
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Ensure the server knows it's JSON
                ...fetchOptions.headers // Include any additional headers from fetchOptions
            },
            body: JSON.stringify(formData) // Convert formData to JSON
        });

        if (!response.ok) {
            const errorDetails = await response.text(); // Get error details from the server
            console.error("Server Response:", errorDetails);
            throw new Error(`Survey submission failed: ${response.status}`);
        }

        const result = await response.json();
        console.log("Server Response:", result); // Log the server's response
        showMessage("Survey completed successfully! Redirecting...", "success");

        setTimeout(() => {
            window.location.href = '{{site.baseurl}}/';
        }, 1500);
    } catch (error) {
        console.error("Survey Error:", error);
        showMessage(`Error: ${error.message}`, "error");

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
    }
  });

  function showMessage(message, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = `mt-4 p-4 rounded ${type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`;
    messageDiv.classList.remove("hidden");
  }
</script>

<style>
.input-field {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.input-field:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
}
</style>
