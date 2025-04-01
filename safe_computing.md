---
layout: base
title: Safe Computing
description: Safe computing from Collegeboard's AP CSP curriculum
comments: true
permalink: /csp/teach/safe_computing/all
menu: nav/home.html
---
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Safe Computing</title>
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

<body class="bg-gray-100 text-gray-900">
    <!-- Lesson 2.B Container -->
    <div class="container mx-auto p-6">
        <!-- Header -->
        <div class="text-center mb-10">
            <h1 class="text-4xl font-bold text-blue-600">Safe Computing - B</h1>
            <p class="mt-2 text-lg text-gray-700">Safe computing from Collegeboard's AP CSP curriculum</p>
        </div>
        <!-- Main Content -->
        <section class="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Key Topic - IOC-2.B</h2>
            <p class="text-gray-700">Explain how computing resources can be protected and misused.</p>
            <!-- Authentication Measures -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Authentication Measures - IOC-2.B.1</h3>
                <p class="text-gray-700">Authentication measures protect devices and information from unauthorized access.</p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li><span class="font-bold">Multi-Factor Authentication (MFA):</span> Requires users to verify their identity using multiple authentication factors.</li>
                    <li>Example: Logging into an account with a password and a code sent to a mobile device.</li>
                </ul>
            </section>
            <!-- Strong Passwords -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Strong Passwords - IOC-2.B.2</h3>
                <p class="text-gray-700">A strong password is easy for the user to remember but difficult for others to guess.</p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li>Example: <span class="font-bold">Q3!xT@9$z</span> is a strong password, while <span class="font-bold">John123</span> is weak because it can be easily guessed.</li>
                    <li>Use at least <span class="font-bold">8 characters</span> whenever possible.</li>
                    <li>Create a <span class="font-bold">passphrase</span> using 4-7 random words.</li>
                    <li>Use <span class="font-bold">different passwords</span> for different websites and accounts to prevent one breach from compromising all accounts.</li>
                </ul>
            </section>
            <!-- MFA & Security Layers -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Multifactor Authentication & Security Layers - IOC-2.B.3 & IOC-2.B.4</h3>
                <p class="text-gray-700">Multifactor authentication (MFA) requires users to provide multiple pieces of evidence to verify their identity.</p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li><span class="font-bold">Knowledge (something you know):</span> Example: A password used to log into an account.</li>
                    <li><span class="font-bold">Possession (something you have):</span> Example: A verification code sent to a mobile phone.</li>
                    <li><span class="font-bold">Inherence (something you are):</span> Example: Biometric authentication like fingerprint or facial recognition.</li>
                    <li><span class="font-bold">Why MFA is important:</span> Even if one authentication factor is compromised, unauthorized access is still prevented.</li>
                </ul>
                <div class="flex justify-center my-6">
                    <img src="{{site.baseurl}}/images/mfa.png" alt="Multi-Factor Authentication" class="w-1/2 h-auto rounded-lg shadow-md">
                </div>
            </section>
            <!-- Popcorn Hack: Quiz -->
            <section class="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 class="text-2xl font-bold text-purple-600 mb-4">🎯 Pop Quiz: Multifactor Authentication</h2>
                <p class="text-gray-700 mb-4">Which of the following is NOT an example of a multifactor authentication (MFA) factor?</p>
                <div class="bg-gray-100 p-4 rounded-lg shadow">
                    <ul class="list-none space-y-2">
                        <li class="text-gray-700"><span class="font-bold">A.</span> A password used to log into an email account.</li>
                        <li class="text-gray-700"><span class="font-bold">B.</span> A verification code sent to a user's phone.</li>
                        <li class="text-gray-700"><span class="font-bold">C.</span> A fingerprint scan on a smartphone.</li>
                        <li class="text-gray-700"><span class="font-bold">D.</span> A username required to log in.</li>
                    </ul>
                </div>
                <p class="mt-4 text-gray-700 group">
                    <span class="font-bold cursor-pointer">Answer:</span> 
                    <span class="text-indigo-500 hidden group-hover:inline">D. A username required to log in.</span>
                    <span class="hidden group-hover:inline text-gray-700"> (Usernames are identifiers, not authentication factors.)</span>
                </p>
            </section>
            <!-- Encryption -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Encryption - IOC-2.B.5</h3>
                <p class="text-gray-700">Encryption encodes data to prevent unauthorized access, while decryption restores it to a readable format.</p>
                <div class="flex justify-center my-6">
                    <img src="{{site.baseurl}}/images/symmetricencryption.png" alt="Symmetric Encryption" class="w-1/2 h-auto rounded-lg shadow-md">
                </div>
                <ul class="list-disc list-inside text-gray-700 space-y-2">
                    <li><span class="font-bold">Symmetric Encryption:</span> Uses the same key for encryption and decryption.</li>
                </ul>
                <div class="flex justify-center my-6">
                    <img src="{{site.baseurl}}/images/publickey.png" alt="Public Key Encryption" class="w-1/2 h-auto rounded-lg shadow-md">
                </div>
                <ul class="list-disc list-inside text-gray-700 space-y-2">
                    <li><span class="font-bold">Public Key Encryption:</span> Uses a public key for encryption and a private key for decryption.</li>
                </ul>
            </section>
            <!-- Popcorn Hack: Encryption Question -->
            <section class="bg-white shadow-lg rounded-lg p-6 mb-8 mt-8">
                <h2 class="text-2xl font-bold text-purple-600 mb-4">🔒 Popcorn Hack: Encryption Quiz</h2>
                <div class="bg-gray-100 p-4 rounded-lg shadow">
                    <ul class="space-y-4 p-4 bg-gray-100 rounded-lg shadow-lg">
                        <li class="text-lg font-bold text-gray-900">
                            Popcorn Hack (MC question from College Board)
                        </li>
                        <li class="text-gray-800 font-medium">
                            Which of the following is an example of symmetric encryption?
                        </li>
                        <ul class="space-y-2 mt-2">
                            <li class="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50">
                                <span class="font-bold">A.</span> Evy buys a locked box that operates using two different codes. When the first code is entered, a slot opens that allows a message to be put in the box. When the second code is entered, the door to the box opens. Evy gives the first code to her friends so they can leave messages for her and keeps the second code to herself so that she is the only one who can retrieve the messages.
                            </li>
                            <li class="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50">
                                <span class="font-bold">B.</span> Finn and Gwen develop a system that maps each letter of the alphabet to a unique symbol using a secret key. Finn uses the key to write a message to Gwen where each letter is replaced with the corresponding symbol. Gwen uses the key to map each symbol back to the original letter.
                            </li>
                            <li class="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50">
                                <span class="font-bold">C.</span> Hannah writes a message to send to Isabel and hides the message under a rock behind the soccer field. Hannah gives Isabel the exact location of the rock so that only Isabel can find the message.
                            </li>
                            <li class="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50">
                                <span class="font-bold">D.</span> Juan writes a message to send to Kelly and slides the message through a slot in the front of Kelly’s locker. Juan knows that Kelly has not shared her locker combination with anyone, so no one other than Kelly will be able to read the message.
                            </li>
                        </ul>
                    </ul>
                </div>
            </section>
            <!-- Certificate Authorities -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Certificate Authorities - IOC-2.B.6</h3>
                <p class="text-gray-700">Certificate authorities (CAs) are trusted entities that issue digital certificates to verify the authenticity of websites and enable secure encrypted communications.</p>
                <p class="text-gray-700 mt-4">One widely used tool for obtaining and managing certificates is <span class="font-bold">Certbot</span>, an open-source client developed by the Electronic Frontier Foundation (EFF).</p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li><span class="font-bold">Certbot</span> automates the process of obtaining, installing, and renewing SSL/TLS certificates from Let’s Encrypt.</li>
                    <li>It simplifies the setup of HTTPS by handling domain validation and configuring web servers like Apache and Nginx.</li>
                    <li>Certbot helps website owners maintain security by automatically renewing certificates before they expire, reducing the risk of downtime or security lapses.</li>
                    <li>Its user-friendly command-line interface makes it accessible for both beginners and experienced administrators.</li>
                </ul>
            </section>
            <!-- Antivirus -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Antivirus and Malware Protection - IOC-2.B.7</h3>
                <p class="text-gray-700">Antivirus software detects, prevents, and removes malicious programs from computing systems.</p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li>Uses <span class="font-bold">signature-based detection, heuristic analysis, and real-time monitoring</span> to identify threats.</li>
                    <li>Blocks suspicious activity, quarantines infected files, and prevents malware execution.</li>
                    <li><span class="font-bold">Best Practices:</span> Keep antivirus software updated, enable real-time protection, and avoid unknown downloads.</li>
                </ul>
            </section>
            <!-- Privacy -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Privacy and Permissions - IOC-2.B.11</h3>
                <p class="text-gray-700">Users should control the permissions that applications have to protect their privacy.</p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li>Review the permission settings of apps before granting access to personal data.</li>
                    <li>Be cautious of apps requesting unnecessary permissions (e.g., a flashlight app asking for microphone access).</li>
                    <li>Limit access to the camera, microphone, and location services when not needed.</li>
                </ul>
            </section>
        </section>
    </div>
    <!-- Lesson 2.C Container -->
    <div class="container mx-auto p-6">
        <!-- Header -->
        <div class="text-center mb-10">
            <h1 class="text-4xl font-bold text-blue-600">Safe Computing - C</h1>
            <p class="mt-2 text-lg text-gray-700">Safe computing from Collegeboard's AP CSP curriculum</p>
        </div>
        <!-- Main Content -->
        <section class="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Key Topic - IOC-2.C</h2>
            <p class="text-gray-700">Explain how unauthorized access to computing resources is gained.</p>
            <!-- Phishing -->
            <section class="mt-8">
                <div class="flex justify-center">
                    <div class="aspect-[9/16] w-[250px]">
                        <iframe 
                            class="w-full h-full rounded-lg shadow-lg" 
                            src="https://www.youtube.com/embed/xp2pEjViQ1s" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Phishing - IOC-2.C.1</h3>
                <p class="text-gray-700">Phishing is a technique that attempts to trick a user into providing personal information. That personal information can then be used to access sensitive online resources, such as bank accounts and emails.</p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li>A lot of you have seen phishing before</li>
                    <li>Common examples are email phishing or mobile phishing</li>
                    <li>Below is a real example of mobile phishing that Jacob received</li>
                    <li><span class="font-bold">Prevention:</span> Don't click on links from people you don't know or don't trust</li>
                </ul>
                <div class="flex justify-center my-6">
                    <img src="{{site.baseurl}}/images/mobile_phishing.png" alt="Phishing Example" class="w-1/2 h-auto rounded-lg shadow-md">
                </div>
            </section>
            <!-- Keylogging -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Keylogging - IOC-2.C.2</h3>
                <p class="text-gray-700">Keylogging is the use of a program to record every keystroke made by a computer user in order to gain fraudulent access to passwords and other confidential information.</p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li>Keylogging does have a few benefits: parental controls or employee monitoring in a business setting</li>
                    <li>Other than that, keylogging almost always happens when you install malware</li>
                    <li>An application will record your keystrokes</li>
                    <li>If you type in a password and username, it would be logged</li>
                    <li><span class="font-bold">Prevention:</span> Don't install untrusted software or apps</li>
                </ul>
            </section>
            <!-- Data Interception -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Data Interception - IOC-2.C.3</h3>
                <p class="text-gray-700">Data sent over public networks can be intercepted, analyzed, and modified. One way that this can happen is through a rogue access point.</p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li>Examples of this can be seen when people set-up fake wifi networks and capture all data being transferred to it or DNS spoofing, which is when an attacker sends you to a unintended IP address after they hijack a DNS server.</li>
                    <li><span class="font-bold">Prevention:</span> Connect to secure networks and verify the address of websites you connect to are legitimate.</li>
                </ul>
            </section>
            <!-- Rogue Access Point -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Rogue Access Point - IOC-2.C.3</h3>
                <p class="text-gray-700">A rogue access point is a wireless access point that gives unauthorized access to secure networks.</p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li>This is part of data interception.</li>
                    <li>It is when a access point is installed on a network without owner knowledge or permission.</li>
                    <li>Passive interception: reads data but cannot manipulate</li>
                    <li>Active interception: can read and manipulate data</li>
                    <li><span class="font-bold">Prevention:</span> Connect to trusted networks and only send information via websites with HTTPS (Hypertext Transfer Protocol Secure), to ensure data is encrypted.</li>
                </ul>
            </section>
            <!-- Malicious Links -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Malicious Links - IOC-2.C.5</h3>
                <p class="text-gray-700">A malicious link can be disguised on a web page or in an email message. </p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li>These are links that send you to illegitimate websites or links that send you to a malware download.</li>
                    <li>Seen in many places; websites, ads, emails, texts, etc.</li>
                    <li><span class="font-bold">Prevention:</span> Don't click links that you don't know.</li>
                </ul>
            </section>
            <!-- Malicious Emails -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Malicious Emails - IOC-2.C.6</h3>
                <p class="text-gray-700">Unsolicited emails, attachments, links, and forms in emails can be used to compromise the security of a computing system. These can come from unknown senders or from known senders whose security has been compromised.</p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li>These emails can contain scams or malicious downloads/attachments.</li>
                    <li>After downloading an these attachments, most of them send malicious emails from your account to other people you know</li>
                    <li>Therefore, these emails can come from people you know</li>
                    <li><span class="font-bold">Prevention:</span> Don't download files or click random links from emails. If you have to, make sure its someone you know and can verify if it was actually them.</li>
                </ul>
            </section>
            <!-- Freeware -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Freeware - IOC-2.C.7</h3>
                <p class="text-gray-700">Untrustworthy (often free) downloads from freeware or shareware sites can contain malware.</p>
                <ul class="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li>Freeware is software that is free to install. Shareware is software where you get a free trial and are asked to pay later.</li>
                    <li>Freeware and shareware aren't always malware, but a lot is</li>
                    <li><span class="font-bold">Prevention:</span> Don't download software for free, especially if there is a popular paid version. If you have to, make sure it's from a trusted site that you know and can verify has no malware.</li>
                </ul>
            </section>
            <!-- Real Life Example -->
            <section class="mt-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Real Life Example</h3>
                <p class="text-gray-700">You connect to an unsecure free wifi at a coffee shop. You send private information on an unsecure http website (NOT https). What you don't know is that someone set up a rogue access point in the shop. They named their fake wifi "WiFi Coffee Shop Free" while the real WiFi was "Free Coffee Shop WiFi." They can read and even manipulate the packets you send via the network before they relay it to the real network. Or they can send you to a different website than the one you intended to go to, possibly injecting malware or stealing info.</p>
            </section>
            <!-- Popcorn Hack -->
            <section class="bg-white shadow-lg rounded-lg p-6 mb-8 mt-8">
                <h2 class="text-2xl font-bold text-purple-600 mb-4">🔑 Popcorn Hack: Password Security</h2>
                <p class="text-gray-700">Go to <a href="https://www.security.org/how-secure-is-my-password/" class="text-indigo-500 hover:text-indigo-700">security.org/how-secure-is-my-password</a> and make a secure password.</p>
                <p class="text-gray-700 mt-2">Write and discuss with the people around you about what makes a good password.</p>
            </section>
            <!-- Homework -->
            <section class="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Lesson Homework</h2>
                <p class="text-gray-700">Answer the multiple choice questions on this <a href="https://docs.google.com/forms/d/e/1FAIpQLSeelbZF4chgYZLIyDe2uTnH7mSem1tUBnwqUcKTQtgEQYzqJA/viewform?usp=dialog" class="text-indigo-500 hover:text-indigo-700">Google Form</a></p>
            </section>
        </section>
    </div>
</body>