---
layout: base
title: Please Fill out the Following Information
permalink: /survey
search_exclude: true
menu: nav/home.html 
---

<div class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Survey Form</h2>
        <form id="surveyForm" class="space-y-4">
            <input type="text" id="name" placeholder="First and Last Name" required class="input-field">
            <input type="text" id="username" placeholder="Username" required class="input-field">
            <input type="email" id="email" placeholder="Email" required class="input-field">
            <input type="text" id="number" placeholder="Phone Number (Optional)" class="input-field">

            <hr>
            <input type="number" id="age" placeholder="Age" required class="input-field">
            <input type="number" id="weight" placeholder="Weight (lbs)" required class="input-field">
            <input type="number" id="height" placeholder="Height (ft'inches)" required class="input-field">
            <input type="text" id="allergies" placeholder="Allergies" class="input-field">
            <input type="text" id="conditions" placeholder="Medical Conditions" class="input-field">
            <input type="text" id="ethnicity" placeholder="Ethnicity" required class="input-field">

            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
        <p id="message" class="text-green-500 mt-2"></p>
    </div>

    <script>
        document.getElementById("surveyForm").addEventListener("submit", async function(event) {
            event.preventDefault();
            const formData = {
                name: document.getElementById("name").value,
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                number: document.getElementById("number").value,
                age: document.getElementById("age").value,
                weight: document.getElementById("weight").value,
                height: document.getElementById("height").value,
                allergies: document.getElementById("allergies").value,
                conditions: document.getElementById("conditions").value,
                ethnicity: document.getElementById("ethnicity").value,
            };

            const response = await fetch("/api/survey", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            document.getElementById("message").textContent = result.message;
        });
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
    </style>
</div>

