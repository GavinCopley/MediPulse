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
    </div>

    <!-- Stylish Button -->
    <div class="text-center mt-8 mb-8">
        <a href="{{site.baseurl}}/comment" class="custom-button">Comment Test</a>
    </div>
</div>

<style>
    /* Styling for the button */
    .custom-button {
        display: inline-block;
        padding: 12px 24px;
        font-size: 18px;
        font-weight: bold;
        color: white;
        background: linear-gradient(45deg, #007bff, #00d4ff);
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        text-decoration: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .custom-button:hover {
        background: linear-gradient(45deg, #0056b3, #0094cc);
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .custom-button:active {
        transform: scale(0.98);
    }
</style>

<script type="module">
    import { getPostsByUser, getImagesByPostId } from "{{site.baseurl}}/assets/js/api/posts.js";
    import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js"
    
    async function getUserData() {
        const endpoint = `${pythonURI}/api/user`
        try {
            const response = await fetch(endpoint, fetchOptions);
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
    
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            // Get the username element early to avoid errors if it doesn't exist
            const usernameElement = document.getElementById('username');
            if (!usernameElement) {
                console.error("Username element not found in the DOM");
                return;
            }
            
            // Set a default value immediately to prevent flickering
            usernameElement.textContent = "Loading...";
            
            // Default the profile image to avoid any loading issues
            const profileImg = document.getElementById('profile-picture');
            if (profileImg) {
                // Set default image right away
                profileImg.src = "{{site.baseurl}}/assets/images/default-profile.jpg";
            }
            
            // Now try to get user data
            const userData = await getUserData();
            console.log("User data:", userData);
            
            // Early exit if userData is null - but don't reload or throw errors
            if (!userData) {
                console.error("No user data available");
                if (usernameElement) usernameElement.textContent = "User Not Found";
                return;
            }
            
            // Update username - keep it simple
            if (usernameElement) {
                usernameElement.textContent = userData.name || userData.username || "User";
            }
            
            // VERY simple profile picture handling - don't use testImg which could trigger reloads
            if (profileImg && userData.pfp && (userData.uid || userData.id)) {
                try {
                    const userIdValue = userData.uid || userData.id;
                    profileImg.onerror = () => {
                        console.warn("Profile image failed to load, using default");
                        profileImg.src = "{{site.baseurl}}/assets/images/default-profile.jpg";
                    };
                    profileImg.src = `${pythonURI}/uploads/${userIdValue}/${userData.pfp}`;
                } catch (error) {
                    console.error("Error setting profile picture:", error);
                    // Already set default image above, no need to do it again
                }
            }
            
            const userPostsContainer = document.getElementById('user-posts');
            const postCountElement = document.getElementById('post-count');
            
            // Only try to get posts if we have a valid user ID
            if (userData.id) {
                const posts = await getPostsByUser(userData.id);
                
                if (posts && posts.length > 0) {
                    userPostsContainer.innerHTML = '';
                    postCountElement.textContent = posts.length;
                    
                    posts.forEach(async post => {
                        try {
                            const images = await getImagesByPostId(post.id);
                            const formattedImages = images.map(image => `data:image/jpeg;base64,${image}`);
                            
                            const postElement = document.createElement('div');
                            postElement.className = 'border p-4 rounded-lg shadow-md bg-white';
                            postElement.innerHTML = `
                                <h4 class="text-lg font-semibold">${post.title || 'Untitled Post'}</h4>
                                <p class="text-gray-600">${post.description || 'No description'}</p>
                                <p class="text-sm text-gray-500">${new Date(post.date_posted).toLocaleDateString()}</p>
                                ${formattedImages.length > 0 ? `
                                <div class="relative flex w-full overflow-hidden">
                                    <div class="carousel relative flex w-full">
                                        ${formattedImages.map(image => 
                                            `<img src="${image}" alt="Post image" class="carousel-item w-full">`
                                        ).join('')}
                                    </div>
                                </div>` : ''}
                            `;
                            userPostsContainer.appendChild(postElement);
                        } catch (error) {
                            console.error("Error processing post:", error);
                        }
                    });
                } else {
                    userPostsContainer.innerHTML = '<p class="text-gray-500 text-center col-span-3">No posts yet</p>';
                }
            }
        } catch (error) {
            console.error("Error in profile page initialization:", error);
            // Don't reload or throw additional errors
        }
    });
</script>

