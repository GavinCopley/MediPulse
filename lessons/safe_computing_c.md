---
layout: tailwind
title: Safe Computing - C
description: Safe computing (C) from Collegeboard's AP CSP curriculum
comments: true
permalink: /csp/teach/safe_computing/c
menu: nav/home.html
---

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-2xl">
    <h1 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Safe Computing - C</h1>
    <p class="mt-2 text-center text-sm text-gray-600">Safe computing from Collegeboard's AP CSP curriculum</p>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold text-gray-900">Key Topic - IOC-2.C</h3>
    <p class="mt-2 text-gray-700">Explain how unauthorized access to computing resources is gained.</p>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Phishing - IOC-2.C.1</h3>
    <p class="text-gray-700">Phishing is a technique that attempts to trick a user into providing personal information. That personal information can then be used to access sensitive online resources, such as bank accounts and emails.</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li>A lot of you have seen phishing before</li>
      <li>Common examples are email phishing or mobile phishing</li>
      <li>Below is a real example of mobile phishing that Jacob received</li>
      <li><strong>Prevention:</strong> Don't click on links from people you don't know or don't trust</li>
    </ul>
    <img class="mt-3 w-full rounded-lg shadow" src="{{site.baseurl}}/images/mobile_phishing.png" alt="mobile phishing example">
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Keylogging - IOC-2.C.2</h3>
    <p class="text-gray-700">Keylogging is the use of a program to record every keystroke...</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li>Keylogging does have a few benefits: parental controls or employee monitoring in a business setting</li>
      <li>Other than that, keylogging almost always happens when you install malware</li>
      <li>An application will record your keystrokes</li>
      <li>If you type in a password and username, it would be logged</li>
      <li><strong>Prevention:</strong> Don't install untrusted software or apps</li>
    </ul>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Data Interception - IOC-2.C.3</h3>
    <p class="text-gray-700">Data sent over public networks can be intercepted, analyzed, and modified. One way that this can happen is through a rogue access point.</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li>Examples of this can be seen when people set-up fake wifi networks and capture all data being transferred to it or DNS spoofing, which is when an attacker sends you to a unintended IP address after they hijack a DNS server.</li>
      <li><strong>Prevention:</strong> Connect to secure networks and verify the address of websites you connect to are legitimate.</li>
    </ul>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Rogue Access Point - IOC-2.C.3</h3>
    <p class="text-gray-700">A rogue access point is a wireless access point that gives unauthorized access to secure networks.</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li>This is part of data interception.</li>
      <li>It is when a access point is installed on a network without owner knowledge or permission.</li>
      <li>Passive interception: reads data but cannot manipulate</li>
      <li>Active interception: can read and manipulate data</li>
      <li><strong>Prevention:</strong> Connect to trusted networks and only send information via websites with HTTPS (Hypertext Transfer Protocol Secure), to ensure data is encrypted.</li>
    </ul>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Malicious Links - IOC-2.C.5</h3>
    <p class="text-gray-700">A malicious link can be disguised on a web page or in an email message. </p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li>These are links that send you to illegitimate websites or links that send you to a malware download.</li>
      <li>Seen in many places; websites, ads, emails, texts, etc.</li>
      <li><strong>Prevention:</strong> Don't click links that you don't know.</li>
    </ul>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Malicious Emails - IOC-2.C.6</h3>
    <p class="text-gray-700">Unsolicited emails, attachments, links, and forms in emails can be used to compromise the security of a computing system. These can come from unknown senders or from known senders whose security has been compromised.</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li>These emails can contain scams or malicious downloads/attachments.</li>
      <li>After downloading an these attachments, most of them send malicious emails from your account to other people you know</li>
      <li>Therefore, these emails can come from people you know</li>
      <li><strong>Prevention:</strong> Don't download files or click random links from emails. If you have to, make sure its someone you know and can verify if it was actually them.</li>
    </ul>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Freeware - IOC-2.C.7</h3>
    <p class="text-gray-700">Untrustworthy (often free) downloads from freeware or shareware sites can contain malware.</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li>Freeware is software that is free to install. Shareware is software where you get a free trial and are asked to pay later.</li>
      <li>Freeware and shareware aren't always malware, but a lot is</li>
      <li><strong>Prevention:</strong> Don't download software for free, especially if there is a popular paid version. If you have to, make sure it's from a trusted site that you know and can verify has no malware.</li>
    </ul>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Real Life Example</h3>
    <p class="text-gray-700">You connect to an unsecure free wifi at a coffee shop. You send private information on an unsecure http website (NOT https). What you don't know is that someone set up a rogue access point in the shop. They named their fake wifi "WiFi Coffee Shop Free" while the real WiFi was "Free Coffee Shop WiFi." They can read and even manipulate the packets you send via the network before they relay it to the real network. Or they can send you to a different website than the one you intended to go to, possibly injecting malware or stealing info.</p>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Popcorn Hack</h3>
    <p class="text-gray-700">Go to <a class="text-indigo-500 hover:text-indigo-700" href="https://www.security.org/how-secure-is-my-password/">security.org/how-secure-is-my-password</a> and make a secure password.</p>
    <p class="text-gray-700">Remember: secure passwords have capitalized letters, numbers, and special characters</p>
  </div>
</div>