---
layout: tailwind
title: Safe Computing - 2a
description: Safe computing from Collegeboard's AP CSP curriculum
comments: true
permalink: /csp/teach/safe_computing/a
menu: nav/home.html
---
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Risks from Data Collection</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 text-gray-900">

    <!-- Container -->
    <div class="container mx-auto p-6">

        <!-- Header -->
        <div class="text-center mb-10">
            <h1 class="text-4xl font-bold text-blue-600">Privacy Risks from Data Collection</h1>
            <p class="mt-2 text-lg text-gray-700">Lesson Objective 2.A: Describe the risks to privacy from collecting and storing personal data on a computer system.</p>
        </div>

        <!-- Section: What is Personal Data? -->
        <section class="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">What is Personal Data? (IOC-2.A.1)</h2>
            <p class="text-gray-700">Personal data refers to information related to an individual that can be used to identify them, such as:</p>
            <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Names</li>
                <li>Addresses</li>
                <li>Phone numbers</li>
                <li>Email addresses</li>
                <li>Financial details</li>
                <li>Location</li>
                <li>Browsing history</li>
            </ul>
        </section>

        <!-- Section: How and When is Your Data Collected -->
        <section class="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">How and When is Your Data Collected?</h2>
            <ul class="list-disc list-inside text-gray-700 space-y-2">
                <li>Social media posts</li>
                <li>Creating an account on a website</li>
                <li>Buying an item</li>
                <li>Clicking on a link</li>
                <li>Making a Google search</li>
                <li>Inputting information anywhere</li>
            </ul>

            <div class="flex justify-center my-6">
                <img src="{{site.baseurl}}/images/Datacollection.webp" alt="Data Collection" class="w-1/2 h-auto rounded-lg shadow-md">
            </div>

            <p class="text-gray-700 mt-4">Your data is collected whenever you visit a website for purposes such as security, marketing, or analytics. This information is called <span class="font-bold">PII (Personally Identifiable Information)</span>. PII helps sites like Google create a personalized searching experience for you based on data such as:</p>

            <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Age</li>
                <li>Gender</li>
                <li>Location</li>
                <li>Past search history</li>
            </ul>

            <p class="text-gray-700 mt-4">While PII offers many benefits, it can also be manipulated, leading to potential privacy risks.</p>
        </section>

        <!-- Section: Risks of Collecting Personal Data -->
        <section class="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-bold text-red-600 mb-4">Risks of Collecting Personal Data</h2>
            <ul class="list-disc list-inside text-gray-700 space-y-2">
                <li><span class="font-bold">Unauthorized Access:</span> Hackers may gain access to personal data through security breaches, leading to identity theft or financial fraud.</li>
                <li><span class="font-bold">Data Breaches:</span> Poorly secured personal data can be leaked or stolen, impacting individuals and businesses.</li>
                <li><span class="font-bold">Misuse of Data:</span> Companies may misuse personal data, such as selling it without consent.</li>
                <li><span class="font-bold">Insider Threats:</span> Employees might intentionally or unintentionally misuse data.</li>
                <li><span class="font-bold">Loss of Privacy:</span> Excessive data collection can lead to increased surveillance.</li>
                <li><span class="font-bold">Phishing Attacks:</span> Cybercriminals may use personal data to craft convincing scams.</li>
                <li><span class="font-bold">Data Persistence:</span> Stored data can be difficult to delete, posing long-term risks.</li>
                <li><span class="font-bold">Identity Theft:</span> Criminals can use personal data to impersonate someone.</li>
            </ul>
        </section>

        <!-- Section: How Can I Prevent This? -->
        <section class="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-bold text-green-600 mb-4">How Can I Prevent This?</h2>
            <ul class="list-disc list-inside text-gray-700 space-y-2">
                <li><span class="font-bold">Encryption:</span> Secure data by encrypting stored and transmitted information.</li>
                <li><span class="font-bold">Strong Authentication:</span> Use multi-factor authentication (MFA) to prevent unauthorized access.</li>
                <li><span class="font-bold">Data Minimization:</span> Collect and store only the necessary data.</li>
                <li><span class="font-bold">Regular Security Updates:</span> Keep systems updated to avoid vulnerabilities.</li>
                <li><span class="font-bold">Access Control:</span> Limit access to personal data based on roles.</li>
                <li><span class="font-bold">Unique Passwords:</span> Avoid using the same password for multiple accounts.</li>
                <li><span class="font-bold">Compliance with Regulations:</span> Follow laws like GDPR, CCPA, and HIPAA for responsible data handling.</li>
            </ul>
        </section>

        <!-- Popcorn Hack: Quiz -->
        <section class="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-bold text-purple-600 mb-4">🎯 Popcorn Hack: Identify PII</h2>
            <p class="text-gray-700 mb-4">Which of the following is considered PII?</p>
            <div class="bg-gray-100 p-4 rounded-lg shadow">
                <ul class="list-none space-y-2">
                    <li class="text-gray-700"><span class="font-bold">A.</span> Fingerprint</li>
                    <li class="text-gray-700"><span class="font-bold">B.</span> Favorite Color</li>
                    <li class="text-gray-700"><span class="font-bold">C.</span> Zip Code</li>
                    <li class="text-gray-700"><span class="font-bold">D.</span> Job Title</li>
                </ul>
            </div>
        </section>

    </div>

</body>

</html>
