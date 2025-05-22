import { fetchOptions, pythonURI } from "./config.js";

export async function getPostsByHospital(hospitalName) {
  const endpoint = pythonURI + "/api/hospitalPost/hospital/" + encodeURIComponent(hospitalName);

  try {
    const response = await fetch(endpoint, fetchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch hospital reviews: ${response.status}`);
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching hospital reviews:", error.message);
    return null;
  }
}

export async function getPostsByUser(uid) {
  let endpoint = pythonURI + "/api/hospitalPost";

  try {
    const response = await fetch(endpoint, fetchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch user reviews: ${response.status}`);
    }
    const posts = await response.json();
    return posts.filter((post) => post.user.id === uid);
  } catch (error) {
    console.error("Error fetching user reviews:", error.message);
    return null;
  }
}

export async function getImagesByPostId(postId) {
  const endpoint = pythonURI + "/api/hospitalPost/" + postId + "/images";

  try {
    const response = await fetch(endpoint, fetchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch review images: ${response.status}`);
    }
    const images = await response.json();
    return images;
  } catch (error) {
    console.error("Error fetching review images:", error.message);
    return null;
  }
}

export async function createPost(post) {
  // Validate required fields
  if (!post.hospital || !post.rating || !post.description) {
    throw new Error("Missing required fields: hospital, rating, and description are required");
  }

  // Validate rating range
  if (post.rating < 1 || post.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const postOptions = {
    method: "POST",
    mode: "cors",
    cache: "default",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Origin": "client",
    },
    body: JSON.stringify({
      title: post.hospital, // Using hospital name as title
      description: post.description,
      hospital: post.hospital,
      rating: post.rating,
      image_base64_table: post.image_base64_table || [],
    }),
  };

  const endpoint = pythonURI + "/api/hospitalPost";

  try {
    const response = await fetch(endpoint, postOptions);
    if (!response.ok) {
      throw new Error(`Failed to create review: ${response.status}`);
    }
    const result = await response.json();
    return true;
  } catch (error) {
    console.error("Error creating review:", error.message);
    return false;
  }
}

export async function removePostById(id) {
  const postOptions = {
    method: "DELETE",
    mode: "cors",
    cache: "default",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Origin": "client",
    },
    body: JSON.stringify({
      id: id,
    }),
  };

  const endpoint = pythonURI + "/api/hospitalPost";

  try {
    const response = await fetch(endpoint, postOptions);
    if (!response.ok) {
      throw new Error(`Failed to delete review: ${response.status}`);
    }
    const data = await response.json();
    return data["deleted"];
  } catch (error) {
    console.error("Error deleting review:", error.message);
    return null;
  }
}

export async function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
