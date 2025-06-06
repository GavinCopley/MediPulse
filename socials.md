---
layout: tailwind
menu: nav/home.html
permalink: /socials
---

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Connect with Medipulse!</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6 space-y-10">

  <!-- Header -->
  <h2 class="text-3xl font-bold text-purple-600 text-center mb-16">Medipulse group members</h2>

  <!-- Member Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
    <div class="bg-white rounded-2xl border border-indigo-200 shadow-lg p-6 flex flex-col items-center space-y-4 hover:shadow-xl transition-shadow duration-300">
      <img src="{{site.baseurl}}/images/gavin.jpg" alt="Gavin" class="w-28 h-28 object-cover rounded-full border-4 border-indigo-200 shadow" />
      <h3 class="text-xl font-semibold text-indigo-600">Gavin Copley</h3>
      <p class="text-slate-600 text-center">Lead Developer and Scrum Master</p>
      <div class="mt-2 p-2 bg-indigo-50 rounded-lg">
        <img src="{{site.baseurl}}/images/gavin_vcard.png" alt="Gavin's QR Code" class="w-24 h-24" />
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-blue-200 shadow-lg p-6 flex flex-col items-center space-y-4 hover:shadow-xl transition-shadow duration-300">
      <img src="{{site.baseurl}}/images/johan.jpg" alt="Johan" class="w-28 h-28 object-cover rounded-full border-4 border-blue-200 shadow" />
      <h3 class="text-xl font-semibold text-blue-600">Johan Mascarenhas</h3>
      <p class="text-slate-600 text-center">Machine Learning Developer</p>
      <div class="mt-2 p-2 bg-blue-50 rounded-lg">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=placeholder-johan" alt="Johan's QR Code" class="w-24 h-24" />
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-violet-200 shadow-lg p-6 flex flex-col items-center space-y-4 hover:shadow-xl transition-shadow duration-300">
      <img src="{{site.baseurl}}/images/daksha.jpg" alt="Daksha" class="w-28 h-28 object-cover rounded-full border-4 border-violet-200 shadow" />
      <h3 class="text-xl font-semibold text-violet-600">Daksha Gowda</h3>
      <p class="text-slate-600 text-center">UX Designer and Front-end Developer</p>
      <div class="mt-2 p-2 bg-violet-50 rounded-lg">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=placeholder-daksha" alt="Daksha's QR Code" class="w-24 h-24" />
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-purple-200 shadow-lg p-6 flex flex-col items-center space-y-4 hover:shadow-xl transition-shadow duration-300">
      <img src="{{site.baseurl}}/images/thomas.jpg" alt="Thomas" class="w-28 h-28 object-cover rounded-full border-4 border-purple-200 shadow" />
      <h3 class="text-xl font-semibold text-purple-600">Thomas Bao</h3>
      <p class="text-slate-600 text-center">Full Stack Developer</p>
      <div class="mt-2 p-2 bg-purple-50 rounded-lg">
        <img src="{{site.baseurl}}/images/thomasqr1.png" alt="Thomas's QR Code" class="w-24 h-24" />
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-sky-200 shadow-lg p-6 flex flex-col items-center space-y-4 hover:shadow-xl transition-shadow duration-300">
      <img src="{{site.baseurl}}/images/jacob.JPG" alt="Jacob" class="w-28 h-28 object-cover rounded-full border-4 border-sky-200 shadow" />
      <h3 class="text-xl font-semibold text-sky-600">Jacob Zierolf</h3>
      <p class="text-slate-600 text-center">Deployment Manager</p>
      <div class="mt-2 p-2 bg-sky-50 rounded-lg">
        <img src="{{site.baseurl}}/images/jacobqr.png" alt="Jacob's QR Code" class="w-24 h-24" />
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-cyan-200 shadow-lg p-6 flex flex-col items-center space-y-4 hover:shadow-xl transition-shadow duration-300">
      <img src="{{site.baseurl}}/images/elliot.jpg" alt="Elliot" class="w-28 h-28 object-cover rounded-full border-4 border-cyan-200 shadow" />
      <h3 class="text-xl font-semibold text-cyan-600">Elliot Yang</h3>
      <p class="text-slate-600 text-center">Data Collection and Integration Specialist</p>
      <div class="mt-2 p-2 bg-cyan-50 rounded-lg">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=placeholder-elliot" alt="Elliot's QR Code" class="w-24 h-24" />
      </div>
    </div>
  </div>
</body>

