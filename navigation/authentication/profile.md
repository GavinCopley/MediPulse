---
layout: needsAuth
title: Profile Settings
permalink: /profile
menu: nav/home.html
search_exclude: true
show_reading_time: false
---

<div class="bg-gray-100 flex flex-col min-h-screen">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-md w-full py-4 px-6 flex justify-between items-center">
        <h1 class="text-xl font-bold">MediPulse</h1>
    </nav>
    
    <div class="flex justify-center items-center flex-col flex-grow">
        <div class="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
            <!-- Loading State -->
            <div id="loading-state" class="flex justify-center">
                <p class="text-lg">Loading profile...</p>
            </div>
            
            <!-- Profile Content (Hidden until loaded) -->
            <div id="profile-content" class="hidden">
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-8">
                        <img id="profile-picture" src="{{site.baseurl}}/assets/images/default-profile.jpg" alt="Profile Picture" class="w-36 h-36 rounded-full object-cover border-4 border-gray-300">
                        <div>
                            <h2 class="text-3xl font-bold" id="username">Username</h2>
                            <p class="text-gray-600">MediPulse User</p>
                            <button class="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-cyan-600 transition" onclick="location.href='{{site.baseurl}}/settings'">Edit Profile</button>
                        </div>
                    </div>
                    <div class="flex space-x-8 text-center">
                        <div>
                            <p class="text-2xl font-semibold" id="post-count">0</p>
                            <p class="text-gray-500">Posts</p>
                        </div>
                        <div>
                            <p class="text-2xl font-semibold">0</p>
                            <p class="text-gray-500">Followers</p>
                        </div>
                        <div>
                            <p class="text-2xl font-semibold">0</p>
                            <p class="text-gray-500">Following</p>
                        </div>
                    </div>
                </div>
                <div class="border-t pt-6">
                    <h3 class="text-center text-2xl font-semibold mb-4">User Posts</h3>
                    <div id="user-posts" class="grid grid-cols-3 gap-6"></div>
                </div>
            </div>
            
            <!-- Error State (Hidden by default) -->
            <div id="error-state" class="hidden flex flex-col items-center justify-center p-8">
                <p class="text-red-500 text-lg font-semibold mb-4">Unable to load profile</p>
                <button onclick="location.reload()" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Retry</button>
            </div>
        </div>
    </div>
</div>

<script type="module">
    import { getPostsByUser, getImagesByPostId } from "{{site.baseurl}}/assets/js/api/posts.js";
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";
    
    // Add anti-loop protection
    const MAX_RETRIES = 3;
    let retryCount = parseInt(localStorage.getItem('profileRetryCount') || '0');

    // Check if we're in a retry loop
    if (retryCount > MAX_RETRIES) {
        console.error("Too many retries, breaking potential infinite loop");
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('error-state').classList.remove('hidden');
        localStorage.setItem('profileRetryCount', '0');
        throw new Error("Breaking potential infinite loop");
    }
    
    // Increment retry counter
    localStorage.setItem('profileRetryCount', (retryCount + 1).toString());
    
    async function getUserData() {
        const endpoint = `${pythonURI}/api/user`;
        try {
            // Explicitly include credentials with every request
            const options = {
                ...fetchOptions,
                credentials: 'include'
            };
            
            const response = await fetch(endpoint, options);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch user: ${response.status}`);
            }
            
            const user = await response.json();
            return user;
        } catch (error) {
            console.error("Error fetching user:", error.message);
            return null;
        }
    }
    
    // Main function
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            // Try to get user data
            const userData = await getUserData();
            console.log("User data:", userData);
            
            // If successful, reset retry counter
            localStorage.setItem('profileRetryCount', '0');
            
            // If no data, show error
            if (!userData) {
                document.getElementById('loading-state').classList.add('hidden');
                document.getElementById('error-state').classList.remove('hidden');
                return;
            }
            
            // Hide loading, show content
            document.getElementById('loading-state').classList.add('hidden');
            document.getElementById('profile-content').classList.remove('hidden');
            
            // Update username
            const usernameElement = document.getElementById('username');
            if (usernameElement) {
                usernameElement.textContent = userData.name || userData.username || "User";
            }
            
            // IMPORTANT: ALWAYS use the default profile picture - don't try to fetch a custom one
            // This should prevent any issues with broken image URLs
            
            // Load posts
            const userPostsContainer = document.getElementById('user-posts');
            const postCountElement = document.getElementById('post-count');
            
            if (userData.id) {
                try {
                    const posts = await getPostsByUser(userData.id);
                    
                    if (posts && posts.length > 0) {
                        userPostsContainer.innerHTML = '';
                        postCountElement.textContent = posts.length;
                        
                        posts.forEach(async post => {
                            try {
                                const postElement = document.createElement('div');
                                postElement.className = 'border p-4 rounded-lg shadow-md bg-white';
                                postElement.innerHTML = `
                                    <h4 class="text-lg font-semibold">${post.title || 'Untitled Post'}</h4>
                                    <p class="text-gray-600">${post.description || 'No description'}</p>
                                    <p class="text-sm text-gray-500">${new Date(post.date_posted).toLocaleDateString()}</p>
                                `;
                                userPostsContainer.appendChild(postElement);
                                
                                // Load images separately to prevent blocking
                                try {
                                    const images = await getImagesByPostId(post.id);
                                    if (images && images.length > 0) {
                                        const imageContainer = document.createElement('div');
                                        imageContainer.className = 'mt-2';
                                        
                                        const formattedImages = images.map(image => 
                                            `<img src="data:image/jpeg;base64,${image}" alt="Post image" class="w-full mt-2">`
                                        ).join('');
                                        
                                        imageContainer.innerHTML = formattedImages;
                                        postElement.appendChild(imageContainer);
                                    }
                                } catch (imageError) {
                                    console.error("Error loading images:", imageError);
                                }
                            } catch (postError) {
                                console.error("Error processing post:", postError);
                            }
                        });
                    } else {
                        userPostsContainer.innerHTML = '<p class="text-gray-500 text-center col-span-3">No posts yet</p>';
                    }
                } catch (postsError) {
                    console.error("Error loading posts:", postsError);
                    userPostsContainer.innerHTML = '<p class="text-red-500 text-center col-span-3">Failed to load posts</p>';
                }
            }
        } catch (error) {
            console.error("Error in profile page initialization:", error);
            document.getElementById('loading-state').classList.add('hidden');
            document.getElementById('error-state').classList.remove('hidden');
        }
    });
</script>

