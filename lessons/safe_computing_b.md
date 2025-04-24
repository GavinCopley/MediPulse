---
layout: tailwind
title: Safe Computing - B
description: Safe computing (B) from Collegeboard's AP CSP curriculum
comments: true
permalink: /csp/teach/safe_computing/b
menu: nav/home.html
---


<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-2xl">
    <h1 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Safe Computing - B</h1>
    <p class="mt-2 text-center text-sm text-gray-600">Safe computing from Collegeboard's AP CSP curriculum</p>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold text-gray-900">Key Topic - IOC-2.B</h3>
    <p class="mt-2 text-gray-700">Explain how computing resources can be protected and misused.</p>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Authentication Measures - IOC-2.B.1</h3>
    <p class="text-gray-700">Authentication measures protect devices and information from unauthorized access.</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li><strong>Strong Passwords:</strong> Should be at least 10 characters long and include symbols, numbers, and uppercase/lowercase letters.</li>
      <li>Avoid using easily guessed passwords like birthdays or common words.</li>
      <li><strong>Multi-Factor Authentication (MFA):</strong> Requires users to verify their identity using multiple authentication factors.</li>
      <li>Example: Logging into an account with a password and a code sent to a mobile device.</li>
    </ul>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Strong Passwords - IOC-2.B.2</h3>
    <p class="text-gray-700">A strong password is easy for the user to remember but difficult for others to guess.</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li>Example: <strong>Q3!xT@9$z</strong> is a strong password, while <strong>John123</strong> is weak because it can be easily guessed.</li>
      <li>Use at least <strong>16 characters</strong> whenever possible.</li>
      <li>Create a **passphrase** using 4-7 random words.</li>
      <li>Use **different passwords** for different websites and accounts to prevent one breach from compromising all accounts.</li>
    </ul>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Multifactor Authentication & Security Layers - IOC-2.B.3 & IOC-2.B.4</h3>
    <p class="text-gray-700">Multifactor authentication (MFA) requires users to provide multiple pieces of evidence to verify their identity.</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li><strong>Knowledge (something you know):</strong> Example: A password used to log into an account.</li>
      <li><strong>Possession (something you have):</strong> Example: A verification code sent to a mobile phone.</li>
      <li><strong>Inherence (something you are):</strong> Example: Biometric authentication like fingerprint or facial recognition.</li>
      <li><strong>Why MFA is important:</strong> Even if one authentication factor is compromised, unauthorized access is still prevented.</li>
    </ul>
    <img class="mt-3 w-full rounded-lg shadow" src="{{site.baseurl}}/images/mfa.png" alt="Multi-Factor Authentication">
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Pop Quiz: Multifactor Authentication</h3>
    <p class="text-gray-700">Which of the following is NOT an example of a multifactor authentication (MFA) factor?</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
    <li>A. A password used to log into an email account.</li>
    <li>B. A verification code sent to a user’s phone.</li>
    <li>C. A fingerprint scan on a smartphone.</li>
    <li>D. A username required to log in.</li>
</ul>
<p class="mt-2 text-gray-900 group relative">
  <strong class="cursor-pointer">Answer:</strong> 
  <span class="text-indigo-500 hidden group-hover:inline"> D. A username required to log in.</span> 
  <span class="hidden group-hover:inline text-gray-700"> (Usernames are identifiers, not authentication factors.)</span>
</p>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Encryption - IOC-2.B.5</h3>
    <p class="text-gray-700">Encryption encodes data to prevent unauthorized access, while decryption restores it to a readable format.</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <img class="mt-3 w-full rounded-lg shadow" src="{{site.baseurl}}/images/symmetricencryption.png" alt="Multi-Factor Authentication">
      <li><strong>Symmetric Encryption:</strong> Uses the same key for encryption and decryption.</li>
      <img class="mt-3 w-full rounded-lg shadow" src="{{site.baseurl}}/images/publickey.png" alt="Public Key Encryption">
      <li><strong>Public Key Encryption:</strong> Uses a public key for encryption and a private key for decryption.</li>
    </ul>
    <img class="mt-3 w-full rounded-lg shadow" src="{{site.baseurl}}/images/exclusionstatement.png" alt="Public Key Encryption">
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Certificate Authorities - IOC-2.B.6</h3>
    <p class="text-gray-700">Certificate authorities (CAs) issue digital certificates to validate encryption keys and enable secure communications.</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li>Users can obtain certificates manually by submitting a Certificate Signing Request (CSR) to a CA like DigiCert or GlobalSign.</li>
      <li>Automated tools like <strong>Certbot</strong> streamline the certificate issuance and renewal process for HTTPS security.</li>
    </ul>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Antivirus and Malware Protection - IOC-2.B.7</h3>
    <p class="text-gray-700">Antivirus software detects, prevents, and removes malicious programs from computing systems.</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li>Uses <strong>signature-based detection, heuristic analysis, and real-time monitoring</strong> to identify threats.</li>
      <li>Blocks suspicious activity, quarantines infected files, and prevents malware execution.</li>
      <li><strong>Best Practices:</strong> Keep antivirus software updated, enable real-time protection, and avoid unknown downloads.</li>
    </ul>
    <h3 class="mt-6 text-lg font-semibold text-gray-900">Privacy and Permissions - IOC-2.B.11</h3>
    <p class="text-gray-700">Users should control the permissions that applications have to protect their privacy.</p>
    <ul class="mt-2 list-disc list-inside text-gray-700">
      <li>Review the permission settings of apps before granting access to personal data.</li>
      <li>Be cautious of apps requesting unnecessary permissions (e.g., a flashlight app asking for microphone access).</li>
      <li>Limit access to the camera, microphone, and location services when not needed.</li>
    </ul>
  </div>
</div>