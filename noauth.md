---
layout: tailwind
title: MediPulse
search_exclude: true
menu: nav/home.html
---

<div class="relative isolate px-6 pt-14 lg:px-8">
  <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
    <div class="text-center">
      <h1 class="fade-in text-gradient font-extrabold tracking-tight sm:text-7xl">Find the Best Care for You</h1>
      <p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Access comprehensive hospital performance data, compare success rates, and make informed decisions about your healthcare journey.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a href="signup" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign Up</a>
        <a href="login" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-lg font-bold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Log In</a>
      </div>
    </div>
  </div>
</div>

<style>
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.text-gradient {
    background: linear-gradient(90deg, #4f46e5, #7c3aed, #4f46e5);
    background-size: 200% auto;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    animation: gradient 8s linear infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.visible {
    opacity: 1;
    transform: translate(0);
}
</style>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});
</script>
